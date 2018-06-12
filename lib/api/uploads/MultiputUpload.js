var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Multiput upload
 * @author Box
 */

import noop from 'lodash/noop';
import BaseMultiput from './BaseMultiput';
import { getFileLastModifiedAsISONoMSIfPossible, getBoundedExpBackoffRetryDelay } from '../../util/uploads';
import { retryNumOfTimes } from '../../util/function';
import { digest } from '../../util/webcrypto';
import hexToBase64 from '../../util/base64';
import { DEFAULT_RETRY_DELAY_MS } from '../../constants';
import MultiputPart, { PART_STATE_UPLOADED, PART_STATE_DIGEST_READY, PART_STATE_NOT_STARTED } from './MultiputPart';
import createWorker from '../../util/uploadsSHA1Worker';

// Constants used for specifying log event types.

// This type is a catch-all for create session errors that aren't 5xx's (for which we'll do
// retries) and aren't specific 4xx's we know how to specifically handle (e.g. out of storage).
var LOG_EVENT_TYPE_CREATE_SESSION_MISC_ERROR = 'create_session_misc_error';
var LOG_EVENT_TYPE_CREATE_SESSION_RETRIES_EXCEEDED = 'create_session_retries_exceeded';
var LOG_EVENT_TYPE_FILE_CHANGED_DURING_UPLOAD = 'file_changed_during_upload';
var LOG_EVENT_TYPE_PART_UPLOAD_RETRIES_EXCEEDED = 'part_upload_retries_exceeded';
var LOG_EVENT_TYPE_COMMIT_RETRIES_EXCEEDED = 'commit_retries_exceeded';
var LOG_EVENT_TYPE_WEB_WORKER_ERROR = 'web_worker_error';
var LOG_EVENT_TYPE_FILE_READER_RECEIVED_NOT_FOUND_ERROR = 'file_reader_received_not_found_error';
var LOG_EVENT_TYPE_PART_DIGEST_RETRIES_EXCEEDED = 'part_digest_retries_exceeded';

var MultiputUpload = function (_BaseMultiput) {
    _inherits(MultiputUpload, _BaseMultiput);

    /**
     * [constructor]
     *
     * @param {Options} options
     * @param {MultiputConfig} [config]
     */
    function MultiputUpload(options, config) {
        var _this2 = this;

        _classCallCheck(this, MultiputUpload);

        var _this = _possibleConstructorReturn(this, (MultiputUpload.__proto__ || Object.getPrototypeOf(MultiputUpload)).call(this, options, {
            createSession: null,
            uploadPart: null,
            listParts: null,
            commit: null,
            abort: null,
            logEvent: null
        }, config));

        _this.getBaseUploadUrlFromPreflightResponse = function (_ref) {
            var data = _ref.data;

            if (!data || !data.upload_url) {
                return _this.getBaseUploadUrl();
            }

            var splitUrl = data.upload_url.split('/');
            // splitUrl[0] is the protocol (e.g., https:), splitUrl[2] is hostname (e.g., www.box.com)
            _this.uploadHost = splitUrl[0] + '//' + splitUrl[2];
            return _this.getBaseUploadUrl();
        };

        _this.preflightSuccessHandler = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(preflightResponse) {
                var uploadUrl, createSessionUrl, postData, response, errorData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!_this.isDestroyed()) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 2:
                                uploadUrl = _this.getBaseUploadUrlFromPreflightResponse(preflightResponse);
                                createSessionUrl = uploadUrl + '/files/upload_sessions';

                                // Set up post body

                                postData = {
                                    file_size: _this.file.size,
                                    file_name: _this.fileName
                                };


                                if (_this.fileId) {
                                    createSessionUrl = createSessionUrl.replace('upload_sessions', _this.fileId + '/upload_sessions');
                                } else {
                                    postData.folder_id = _this.folderId;
                                }

                                _context.prev = 6;
                                _context.next = 9;
                                return _this.xhr.post({ url: createSessionUrl, data: postData });

                            case 9:
                                response = _context.sent;

                                _this.createSessionSuccessHandler(response.data);
                                _context.next = 30;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](6);
                                errorData = _this.getErrorResponse(_context.t0);

                                if (!(errorData && errorData.status >= 500 && errorData.status < 600)) {
                                    _context.next = 19;
                                    break;
                                }

                                _this.createSessionErrorHandler(_context.t0);
                                return _context.abrupt('return');

                            case 19:
                                if (!(errorData && errorData.status === 409 && errorData.code === 'session_conflict')) {
                                    _context.next = 22;
                                    break;
                                }

                                _this.createSessionSuccessHandler(errorData.context_info.session);
                                return _context.abrupt('return');

                            case 22:
                                if (!(errorData && errorData.status === 403 && errorData.code === 'storage_limit_exceeded' || errorData.status === 403 && errorData.code === 'access_denied_insufficient_permissions')) {
                                    _context.next = 25;
                                    break;
                                }

                                _this.errorCallback(errorData);
                                return _context.abrupt('return');

                            case 25:
                                if (!(errorData && errorData.status === 409)) {
                                    _context.next = 29;
                                    break;
                                }

                                _this.resolveConflict(errorData);
                                _this.createSessionRetry();
                                return _context.abrupt('return');

                            case 29:

                                // All other cases get treated as an upload failure.
                                _this.sessionErrorHandler(_context.t0, LOG_EVENT_TYPE_CREATE_SESSION_MISC_ERROR, JSON.stringify(_context.t0));

                            case 30:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[6, 13]]);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }();

        _this.createSessionErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            if (_this.createSessionNumRetriesPerformed < _this.config.retries) {
                _this.createSessionRetry();
                return;
            }

            _this.consoleLog('Too many create session failures, failing upload');
            _this.sessionErrorHandler(error, LOG_EVENT_TYPE_CREATE_SESSION_RETRIES_EXCEEDED, JSON.stringify(error));
        };

        _this.partUploadSuccessHandler = function (part) {
            _this.numPartsUploading -= 1;
            _this.numPartsUploaded += 1;
            _this.updateProgress(part.uploadedBytes, _this.partSize);
            _this.processNextParts();
        };

        _this.partUploadErrorHandler = function (error, eventInfo) {
            _this.sessionErrorHandler(error, LOG_EVENT_TYPE_PART_UPLOAD_RETRIES_EXCEEDED, eventInfo);
        };

        _this.updateProgress = function (prevUploadedBytes, newUploadedBytes) {
            if (_this.isDestroyed()) {
                return;
            }

            _this.totalUploadedBytes += newUploadedBytes - prevUploadedBytes;
            _this.progressCallback({
                loaded: _this.totalUploadedBytes,
                total: _this.file.size
            });
        };

        _this.processNextParts = function () {
            if (_this.failSessionIfFileChangeDetected()) {
                return;
            }

            if (_this.numPartsUploaded === _this.parts.length && _this.fileSha1) {
                _this.commitSession();
                return;
            }

            _this.updateFirstUnuploadedPartIndex();

            while (_this.canStartMorePartUploads()) {
                _this.uploadNextPart();
            }

            if (_this.shouldComputeDigestForNextPart()) {
                _this.computeDigestForNextPart();
            }
        };

        _this.onWorkerMessage = function (event) {
            if (_this.isDestroyed()) {
                return;
            }

            var data = event.data;

            if (data.type === 'partDone') {
                _this.numPartsDigestComputing -= 1;
                var part = data.part;

                _this.parts[part.index].timing.fileDigestTime = data.duration;
                _this.processNextParts();
            } else if (data.type === 'done') {
                _this.fileSha1 = hexToBase64(data.sha1);
                _this.sha1Worker.terminate();
                if (_this.partsUploaded === _this.parts.length) {
                    _this.commitSession();
                }
            } else if (data.type === 'error') {
                _this.sessionErrorHandler(null, LOG_EVENT_TYPE_WEB_WORKER_ERROR, JSON.stringify(data));
            }
        };

        _this.sendPartToWorker = function (part, buffer) {
            if (_this.isDestroyed()) {
                return;
            }
            // Don't send entire part since XHR can't be cloned
            var partInformation = { index: part.index, offset: part.offset, size: part.partSize };
            _this.sha1Worker.postMessage({ part: partInformation, fileSize: _this.file.size, partContents: buffer }, [buffer] // This transfers the ArrayBuffer to the worker context without copying contents.
            );
            _this.consoleLog('Part sent to worker: ' + JSON.stringify(part) + '.}');
        };

        _this.onPartDigestError = function (error, part) {
            _this.consoleLog('Error computing digest for part ' + JSON.stringify(part) + ': ' + JSON.stringify(error));

            // When a FileReader is processing a file that changes on disk, Chrome reports a 'NotFoundError'
            // and Safari reports a 'NOT_FOUND_ERR'. (Other browsers seem to allow the reader to keep
            // going, either with the old version of the new file or the new one.) Since the error name
            // implies that retrying will not help, we fail the session.
            if (error.name === 'NotFoundError' || error.name === 'NOT_FOUND_ERR') {
                _this.sessionErrorHandler(null, LOG_EVENT_TYPE_FILE_READER_RECEIVED_NOT_FOUND_ERROR, JSON.stringify(error));
                return;
            }

            if (_this.failSessionIfFileChangeDetected()) {
                return;
            }

            if (part.numDigestRetriesPerformed >= _this.config.retries) {
                _this.sessionErrorHandler(null, LOG_EVENT_TYPE_PART_DIGEST_RETRIES_EXCEEDED, JSON.stringify(error));
                return;
            }

            var retryDelayMs = getBoundedExpBackoffRetryDelay(_this.config.initialRetryDelayMs, _this.config.maxRetryDelayMs, part.numDigestRetriesPerformed);
            part.numDigestRetriesPerformed += 1;
            _this.consoleLog('Retrying digest work for part ' + JSON.stringify(part) + ' in ' + retryDelayMs + ' ms');

            setTimeout(function () {
                _this.computeDigestForPart(part);
            }, retryDelayMs);
        };

        _this.commitSession = function () {
            if (_this.isDestroyed()) {
                return;
            }

            var stats = {
                totalPartReadTime: 0,
                totalPartDigestTime: 0,
                totalFileDigestTime: 0,
                totalPartUploadTime: 0
            };

            var data = {
                parts: _this.parts.map(function (part) {
                    stats.totalPartReadTime += part.timing.readTime;
                    stats.totalPartDigestTime += part.timing.subtleCryptoTime;
                    stats.totalFileDigestTime += part.timing.fileDigestTime;
                    stats.totalPartUploadTime += part.timing.uploadTime;
                    return part.getPart();
                }).sort(function (part1, part2) {
                    return part1.offset - part2.offset;
                }),
                attributes: {}
            };

            var fileLastModified = getFileLastModifiedAsISONoMSIfPossible(_this.file);
            if (fileLastModified) {
                data.attributes.content_modified_at = fileLastModified;
            }

            var clientEventInfo = {
                avg_part_read_time: Math.round(stats.totalPartReadTime / _this.parts.length),
                avg_part_digest_time: Math.round(stats.totalPartDigestTime / _this.parts.length),
                avg_file_digest_time: Math.round(stats.totalFileDigestTime / _this.parts.length),
                avg_part_upload_time: Math.round(stats.totalPartUploadTime / _this.parts.length)
            };

            // To make flow stop complaining about this.fileSha1 could potentially be undefined/null
            var fileSha1 = _this.fileSha1;
            var headers = {
                Digest: 'sha=' + fileSha1,
                'X-Box-Client-Event-Info': JSON.stringify(clientEventInfo)
            };

            _this.xhr.post({ url: _this.sessionEndpoints.commit, data: data, headers: headers }).then(_this.commitSessionSuccessHandler).catch(_this.commitSessionErrorHandler);
        };

        _this.commitSessionSuccessHandler = function (response) {
            if (_this.isDestroyed()) {
                return;
            }

            var status = response.status,
                data = response.data;


            if (status === 202) {
                _this.commitSessionRetry(response);
                return;
            }

            var entries = data.entries;


            _this.destroy();

            if (_this.successCallback && entries) {
                _this.successCallback(entries);
            }
        };

        _this.commitSessionErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            var response = error.response;


            if (!response) {
                // Some random error happened
                _this.consoleError(error);
                return;
            }

            if (_this.commitRetryCount >= _this.config.retries) {
                _this.consoleLog('Too many commit failures, failing upload');
                _this.sessionErrorHandler(error, LOG_EVENT_TYPE_COMMIT_RETRIES_EXCEEDED, JSON.stringify(error));
                return;
            }

            _this.commitSessionRetry(response);
        };

        _this.getNumPartsUploading = function () {
            return _this.numPartsUploading;
        };

        _this.parts = [];
        _this.options = options;
        _this.fileSha1 = null;
        _this.totalUploadedBytes = 0;
        _this.numPartsNotStarted = 0; // # of parts yet to be processed
        _this.numPartsDigestComputing = 0; // # of parts sent to the digest worker
        _this.numPartsDigestReady = 0; // # of parts with digest finished that are waiting to be uploaded.
        _this.numPartsUploading = 0; // # of parts with upload requests currently inflight
        _this.numPartsUploaded = 0; // # of parts successfully uploaded
        _this.firstUnuploadedPartIndex = 0; // Index of first part that hasn't been uploaded yet.
        _this.createSessionNumRetriesPerformed = 0;
        _this.partSize = 0;
        _this.commitRetryCount = 0;
        _this.clientId = null;
        return _this;
    }

    /**
     * Upload a given file
     *
     *
     * @param {Object} options
     * @param {File} options.file
     * @param {string} options.folderId - Untyped folder id (e.g. no "folder_" prefix)
     * @param {string} [options.fileId] - Untyped file id (e.g. no "file_" prefix)
     * @param {Function} [options.errorCallback]
     * @param {Function} [options.progressCallback]
     * @param {Function} [options.successCallback]
     * @return {void}
     */


    _createClass(MultiputUpload, [{
        key: 'upload',
        value: function upload(_ref3) {
            var file = _ref3.file,
                folderId = _ref3.folderId,
                errorCallback = _ref3.errorCallback,
                progressCallback = _ref3.progressCallback,
                successCallback = _ref3.successCallback,
                _ref3$overwrite = _ref3.overwrite,
                overwrite = _ref3$overwrite === undefined ? true : _ref3$overwrite,
                fileId = _ref3.fileId;

            this.file = file;
            this.fileName = this.file.name;
            // These values are used as part of our (best effort) attempt to abort uploads if we detect
            // a file change during the upload.
            this.initialFileSize = this.file.size;
            this.initialFileLastModified = getFileLastModifiedAsISONoMSIfPossible(this.file);
            this.folderId = folderId;
            this.errorCallback = errorCallback || noop;
            this.progressCallback = progressCallback || noop;
            this.successCallback = successCallback || noop;

            this.sha1Worker = createWorker();
            this.sha1Worker.addEventListener('message', this.onWorkerMessage);

            this.overwrite = overwrite;
            this.fileId = fileId;

            this.makePreflightRequest();
        }

        /**
         * Update uploadHost with preflight response and return the base uploadUrl
         *
         * @private
         * @param {Object} response
         * @param {Object} [response.data]
         * @return {string}
         */


        /**
         * Creates upload session. If a file ID is supplied, use the Chunked Upload File Version
         * API to replace the file.
         *
         * @private
         * @return {void}
         */


        /**
         * Create session error handler.
         * Retries the create session request or fails the upload.
         *
         * @private
         * @param {Error} error
         * @return {void}
         */

    }, {
        key: 'createSessionRetry',


        /**
         * Schedule a retry for create session request upon failure
         *
         * @private
         * @return {void}
         */
        value: function createSessionRetry() {
            var retryDelayMs = getBoundedExpBackoffRetryDelay(this.config.initialRetryDelayMs, this.config.maxRetryDelayMs, this.createSessionNumRetriesPerformed);
            this.createSessionNumRetriesPerformed += 1;
            this.consoleLog('Retrying create session in ' + retryDelayMs + ' ms');
            this.createSessionTimeout = setTimeout(this.makePreflightRequest, retryDelayMs);
        }

        /**
         * Handles a upload session success response
         *
         * @private
         * @param {Object} data - Upload session creation success data
         * @return {void}
         */

    }, {
        key: 'createSessionSuccessHandler',
        value: function createSessionSuccessHandler(data) {
            if (this.isDestroyed()) {
                return;
            }

            var id = data.id,
                part_size = data.part_size,
                session_endpoints = data.session_endpoints;


            this.sessionId = id;
            this.partSize = part_size;
            this.sessionEndpoints = _extends({}, this.sessionEndpoints, {
                uploadPart: session_endpoints.upload_part,
                listParts: session_endpoints.list_parts,
                commit: session_endpoints.commit,
                abort: session_endpoints.abort,
                logEvent: session_endpoints.log_event
            });

            this.populateParts();
            this.processNextParts();
        }

        /**
         * Session error handler.
         * Retries the create session request or fails the upload.
         *
         * @private
         * @param {?Error} error
         * @param {string} logEventType
         * @param {string} [logMessage]
         * @return {Promise}
         */

    }, {
        key: 'sessionErrorHandler',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error, logEventType, logMessage) {
                var _this3 = this;

                var errorData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.destroy();
                                errorData = this.getErrorResponse(error);

                                this.errorCallback(errorData);

                                _context2.prev = 3;

                                if (this.sessionEndpoints.logEvent) {
                                    _context2.next = 6;
                                    break;
                                }

                                throw new Error('logEvent endpoint not found');

                            case 6:
                                _context2.next = 8;
                                return retryNumOfTimes(function (resolve, reject) {
                                    _this3.logEvent(logEventType, logMessage).then(resolve).catch(reject);
                                }, this.config.retries, this.config.initialRetryDelayMs);

                            case 8:

                                this.abortSession();
                                _context2.next = 14;
                                break;

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2['catch'](3);

                                this.abortSession();

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 11]]);
            }));

            function sessionErrorHandler(_x2, _x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return sessionErrorHandler;
        }()

        /**
         * Aborts the upload session
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'abortSession',
        value: function abortSession() {
            if (this.sha1Worker) {
                this.sha1Worker.terminate();
            }

            if (this.sessionEndpoints.abort) {
                this.xhr.delete({
                    url: this.sessionEndpoints.abort
                });
            }
        }

        /**
         * Part upload success handler
         *
         * @private
         * @param {MultiputPart} part
         * @return {void}
         */


        /**
         * Part upload error handler
         *
         * @private
         * @param {Error} error
         * @param {string} eventInfo
         * @return {void}
         */


        /**
         * Update upload progress
         *
         * @private
         * @param {number} prevUploadedBytes
         * @param {number} newUploadedBytes
         * @return {void}
         */


        /**
         * Attempts to process more parts, except in the case where everything is done or we detect
         * a file change (in which case we want to abort and not process more parts).
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'shouldComputeDigestForNextPart',


        /**
         * We compute digest for parts one at a time.  This is done for simplicity and also to guarantee that
         * we send parts in order to the web sha1Worker (which is computing the digest for the entire file).
         *
         * @private
         * @return {boolean} true if there is work to do, false otherwise.
         */
        value: function shouldComputeDigestForNextPart() {
            return !this.isDestroyed() && this.numPartsDigestComputing === 0 && this.numPartsNotStarted > 0 && this.numPartsDigestReady < this.config.digestReadahead;
        }

        /**
         * Find first part in parts array that doesn't have a digest, and compute its digest.
          * @private
         * @return {void}
         */

    }, {
        key: 'computeDigestForNextPart',
        value: function computeDigestForNextPart() {
            for (var i = this.firstUnuploadedPartIndex; i < this.parts.length; i += 1) {
                var part = this.parts[i];
                if (part.state === PART_STATE_NOT_STARTED) {
                    // Update the counters here instead of computeDigestForPart because computeDigestForPart
                    // can get called on retries
                    this.numPartsNotStarted -= 1;
                    this.numPartsDigestComputing += 1;
                    this.computeDigestForPart(part);
                    return;
                }
            }
        }

        /**
         * Read a blob with FileReader
         *
         * @param {FileReader} reader
         * @param {Blob} blob
         * @return {Promise}
         */

    }, {
        key: 'readFile',
        value: function readFile(reader, blob) {
            return new Promise(function (resolve, reject) {
                reader.readAsArrayBuffer(blob);
                reader.onload = function () {
                    resolve({
                        buffer: reader.result,
                        readCompleteTimestamp: Date.now()
                    });
                };
                reader.onerror = reject;
            });
        }

        /**
         * Compute digest for this part
         *
         * @private
         * @param {MultiputPart} part
         * @return {Promise}
         */

    }, {
        key: 'computeDigestForPart',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(part) {
                var blob, reader, startTimestamp, _ref6, buffer, readCompleteTimestamp, sha256ArrayBuffer, sha256, digestCompleteTimestamp;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                blob = this.file.slice(part.offset, part.offset + this.partSize);
                                reader = new window.FileReader();
                                startTimestamp = Date.now();
                                _context3.prev = 3;
                                _context3.next = 6;
                                return this.readFile(reader, blob);

                            case 6:
                                _ref6 = _context3.sent;
                                buffer = _ref6.buffer;
                                readCompleteTimestamp = _ref6.readCompleteTimestamp;
                                _context3.next = 11;
                                return digest('SHA-256', buffer);

                            case 11:
                                sha256ArrayBuffer = _context3.sent;
                                sha256 = btoa(Array.prototype.reduce.call(new Uint8Array(sha256ArrayBuffer), function (data, byte) {
                                    return data + String.fromCharCode(byte);
                                }, ''));

                                this.sendPartToWorker(part, buffer);

                                part.sha256 = sha256;
                                part.state = PART_STATE_DIGEST_READY;
                                part.blob = blob;

                                this.numPartsDigestReady += 1;
                                digestCompleteTimestamp = Date.now();


                                part.timing = {
                                    partDigestTime: digestCompleteTimestamp - startTimestamp,
                                    readTime: readCompleteTimestamp - startTimestamp,
                                    subtleCryptoTime: digestCompleteTimestamp - readCompleteTimestamp
                                };

                                this.processNextParts();
                                _context3.next = 26;
                                break;

                            case 23:
                                _context3.prev = 23;
                                _context3.t0 = _context3['catch'](3);

                                this.onPartDigestError(_context3.t0, part);

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 23]]);
            }));

            function computeDigestForPart(_x5) {
                return _ref5.apply(this, arguments);
            }

            return computeDigestForPart;
        }()

        /**
         * Deal with a message from the worker (either a part sha-1 ready, file sha-1 ready, or error).
         *
         * @private
         * @param {object} event
         * @return {void}
         */


        /**
         * Sends a part to the sha1Worker
         *
         * @private
         * @param {MultiputPart} part
         * @param {ArrayBuffer} buffer
         * @return {void}
         */


        /**
         * Error handler for part digest computation
         *
         * @private
         * @param {Error} error
         * @param {MultiputPart} part
         * @return {void}
         */


        /**
         * Send a request to commit the upload.
         *
         * @private
         * @return {void}
         */


        /**
         * Commit response handler.  Succeeds the upload, retries the commit on 202
         *
         * @private
         * @param {Object} response
         * @return {void}
         */


        /**
         * Commit error handler.
         * Retries the commit or fails the multiput session.
         *
         * @private
         * @param {Object} error
         * @return {void}
         */

    }, {
        key: 'commitSessionRetry',


        /**
         * Retry commit.
         * Retries the commit or fails the multiput session.
         *
         * @private
         * @param {Object} response
         * @return {void}
         */
        value: function commitSessionRetry(response) {
            var status = response.status,
                headers = response.headers;

            var retryAfterMs = DEFAULT_RETRY_DELAY_MS;

            if (headers) {
                var retryAfterSec = parseInt(headers['retry-after'], 10);

                if (!Number.isNaN(retryAfterSec)) {
                    retryAfterMs = retryAfterSec * 1000;
                }
            }

            var defaultRetryDelayMs = getBoundedExpBackoffRetryDelay(this.config.initialRetryDelayMs, this.config.maxRetryDelayMs, this.commitRetryCount);
            // If status is 202 then don't increment the retry count.
            // In this case, frontend will keep retrying until it gets another status code.
            // Retry interval = value specified for the Retry-After header in 202 response.
            if (status !== 202) {
                this.commitRetryCount += 1;
            }
            var retryDelayMs = retryAfterMs || defaultRetryDelayMs;
            this.consoleLog('Retrying commit in ' + retryDelayMs + ' ms');
            this.commitSessionTimeout = setTimeout(this.commitSession, retryDelayMs);
        }

        /**
         * Find first part in parts array that we can upload, and upload it.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'uploadNextPart',
        value: function uploadNextPart() {
            for (var i = this.firstUnuploadedPartIndex; i < this.parts.length; i += 1) {
                var part = this.parts[i];

                if (part.state === PART_STATE_DIGEST_READY) {
                    // Update the counters here instead of uploadPart because uploadPart
                    // can get called on retries
                    this.numPartsDigestReady -= 1;
                    this.numPartsUploading += 1;
                    part.upload();
                    break;
                }
            }
        }

        /**
         * Checks if upload pipeline is full
         *
         * @private
         * @return {boolean}
         */

    }, {
        key: 'canStartMorePartUploads',
        value: function canStartMorePartUploads() {
            return !this.isDestroyed() && this.numPartsUploading < this.config.parallelism && this.numPartsDigestReady > 0;
        }

        /**
         * Functions that walk the parts array get called a lot, so we cache which part we should
         * start work at to avoid always iterating through entire parts list.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'updateFirstUnuploadedPartIndex',
        value: function updateFirstUnuploadedPartIndex() {
            var part = this.parts[this.firstUnuploadedPartIndex];
            while (part && part.state === PART_STATE_UPLOADED) {
                this.firstUnuploadedPartIndex += 1;
                part = this.parts[this.firstUnuploadedPartIndex];
            }
        }

        /**
         * Get number of parts being uploaded
         *
         * @return {number}
         */

    }, {
        key: 'populateParts',


        /**
         * After session is created and we know the part size, populate the parts
         * array.
         *
         * @private
         * @return {void}
         */
        value: function populateParts() {
            this.numPartsNotStarted = Math.ceil(this.file.size / this.partSize);

            for (var i = 0; i < this.numPartsNotStarted; i += 1) {
                var offset = i * this.partSize;
                var currentPartSize = Math.min(offset + this.partSize, this.file.size) - offset;
                var part = new MultiputPart(this.options, i, offset, currentPartSize, this.file.size, this.sessionId, this.sessionEndpoints, this.config, this.getNumPartsUploading, this.partUploadSuccessHandler, this.updateProgress, this.partUploadErrorHandler);
                this.parts.push(part);
            }
        }

        /**
         * Fails the session if the file's size or last modified has changed since the upload process
         * began.
         *
         * This ensures that we don't upload a file that has parts from one file version and parts from
         * another file version.
         *
         * This logic + the "not found" error logic in onWorkerError() is best effort and will not
         * detect all possible file changes. This is because of browser differences. For example,
         * -- In Safari, size and last modified will update when a file changes, and workers will
         * get "not found" errors.
         * -- In Chrome, size and last modified will update, but not in legacy drag and drop (that
         * code path constructs a different file object). Workers will still get "not found" errors,
         * though, so we can still detect changes even in legacy drag and drop.
         * -- In IE 11/Edge, size will update but last modified will not. Workers will not get
         * "not found" errors, but they may get a generic error saying that some bytes failed to be
         * read.
         * -- In Firefox, neither last modified nor size will update. Workers don't seem to get errors.
         * (Not a whole lot we can do here...)
         *
         * Unfortunately, alternative solutions to catch more cases don't have a clear ROI (for
         * example, doing a SHA-1 of the file before and after the upload is very expensive), so
         * this is the best solution we have. We can revisit this if data shows that we need a better
         * solution.
         *
         * @private
         * @return {boolean} True if the session was failed, false if no action was taken
         */

    }, {
        key: 'failSessionIfFileChangeDetected',
        value: function failSessionIfFileChangeDetected() {
            var currentFileSize = this.file.size;
            var currentFileLastModified = getFileLastModifiedAsISONoMSIfPossible(this.file);

            if (currentFileSize !== this.initialFileSize || currentFileLastModified !== this.initialFileLastModified) {
                this.sessionErrorHandler(null, LOG_EVENT_TYPE_FILE_CHANGED_DURING_UPLOAD, JSON.stringify({
                    oldSize: this.initialFileSize,
                    newSize: currentFileSize,
                    oldLastModified: this.initialFileLastModified,
                    newLastModified: currentFileLastModified
                }));
                return true;
            }

            return false;
        }

        /**
         * Cancels an upload in progress by cancelling all upload parts.
         * This cannot be undone or resumed.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.isDestroyed()) {
                return;
            }

            // Cancel individual upload parts
            this.parts.forEach(function (part) {
                part.cancel();
            });

            this.parts = [];
            clearTimeout(this.createSessionTimeout);
            clearTimeout(this.commitSessionTimeout);
            this.abortSession();
            this.destroy();
        }

        /**
         * Resolves upload conflict by overwriting or renaming
         *
         * @param {Object} response data
         * @return {Promise}
         */

    }, {
        key: 'resolveConflict',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
                var extension;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(this.overwrite && data.context_info)) {
                                    _context4.next = 3;
                                    break;
                                }

                                this.fileId = data.context_info.conflicts.id;
                                return _context4.abrupt('return');

                            case 3:
                                extension = this.fileName.substr(this.fileName.lastIndexOf('.')) || '';
                                // foo.txt => foo-1513385827917.txt

                                this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.')) + '-' + Date.now() + extension;

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function resolveConflict(_x6) {
                return _ref7.apply(this, arguments);
            }

            return resolveConflict;
        }()

        /**
         * Returns detailed error response
         *
         * @param {Object} error
         * @return {Object}
         */

    }, {
        key: 'getErrorResponse',
        value: function getErrorResponse(error) {
            if (!error) {
                return {};
            }

            var response = error.response;

            if (!response) {
                return {};
            }

            if (response.status === 401) {
                return response;
            }

            return response.data;
        }
    }]);

    return MultiputUpload;
}(BaseMultiput);

export default MultiputUpload;