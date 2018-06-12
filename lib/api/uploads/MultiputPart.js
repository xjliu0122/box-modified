var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Multiput upload part
 * @author Box
 */
import noop from 'lodash/noop';
import BaseMultiput from './BaseMultiput';
import { updateQueryParameters } from '../../util/url';
import { HTTP_PUT } from '../../constants';
import { getBoundedExpBackoffRetryDelay } from '../../util/uploads';

var PART_STATE_NOT_STARTED = 0;
var PART_STATE_COMPUTING_DIGEST = 1;
var PART_STATE_DIGEST_READY = 2;
var PART_STATE_UPLOADING = 3;
var PART_STATE_UPLOADED = 4;

var MultiputPart = function (_BaseMultiput) {
    _inherits(MultiputPart, _BaseMultiput);

    /**
     * [constructor]
     *
     * @param {Options} options
     * @param {number} index - 0-based index of this part in array of all parts
     * @param {number} offset - Starting byte offset of this part's range
     * @param {number} partSize - Size of this part in bytes
     * @param {number} sessionId
     * @param {Object} sessionEndpoints
     * @param {MultiputConfig} config
     * @param {Function} getNumPartsUploading
     * @param {Function} [onSuccess]
     * @param {Function} [onProgress]
     * @param {Function} [onError]
     * @return {void}
     */
    function MultiputPart(options, index, offset, partSize, fileSize, sessionId, sessionEndpoints, config, getNumPartsUploading, onSuccess, onProgress, onError) {
        var _this2 = this;

        _classCallCheck(this, MultiputPart);

        var _this = _possibleConstructorReturn(this, (MultiputPart.__proto__ || Object.getPrototypeOf(MultiputPart)).call(this, options, sessionEndpoints, config));

        _this.toJSON = function () {
            return JSON.stringify({
                index: _this.index,
                offset: _this.offset,
                partSize: _this.partSize,
                state: _this.state,
                uploadedBytes: _this.uploadedBytes,
                numUploadRetriesPerformed: _this.numUploadRetriesPerformed,
                numDigestRetriesPerformed: _this.numDigestRetriesPerformed,
                sha256: _this.sha256,
                timing: _this.timing
            });
        };

        _this.getPart = function () {
            return _this.data.part || {};
        };

        _this.upload = function () {
            if (_this.isDestroyed()) {
                return;
            }

            if (!_this.sha256) {
                throw new Error('Part SHA-256 unavailable');
            }

            if (!_this.blob) {
                throw new Error('Part blob unavailable');
            }

            var clientEventInfo = {
                documentHidden: document.hidden,
                digest_retries: _this.numDigestRetriesPerformed,
                timing: _this.timing,
                parts_uploading: _this.getNumPartsUploading()
            };

            var headers = {
                'Content-Type': 'application/octet-stream',
                Digest: 'sha-256=' + _this.sha256,
                'Content-Range': 'bytes ' + _this.offset + '-' + _this.rangeEnd + '/' + _this.fileSize,
                'X-Box-Client-Event-Info': JSON.stringify(clientEventInfo)
            };

            _this.state = PART_STATE_UPLOADING;

            _this.startTimestamp = Date.now();

            _this.xhr.uploadFile({
                url: _this.sessionEndpoints.uploadPart,
                data: _this.blob,
                headers: headers,
                method: HTTP_PUT,
                successHandler: _this.uploadSuccessHandler,
                errorHandler: _this.uploadErrorHandler,
                progressHandler: _this.uploadProgressHandler,
                withIdleTimeout: true,
                idleTimeoutDuration: _this.config.requestTimeoutMs
            });
        };

        _this.uploadSuccessHandler = function (_ref) {
            var data = _ref.data;

            if (_this.isDestroyed()) {
                return;
            }

            _this.state = PART_STATE_UPLOADED;
            _this.consoleLog('Upload completed: ' + _this.toJSON() + '.');
            _this.data = data;
            _this.blob = null;
            _this.timing.uploadTime = Date.now() - _this.startTimestamp;

            _this.onSuccess(_this);

            _this.uploadedBytes = _this.partSize;
        };

        _this.uploadProgressHandler = function (event) {
            if (_this.isDestroyed()) {
                return;
            }

            var newUploadedBytes = parseInt(event.loaded, 10);
            var prevUploadedBytes = _this.uploadedBytes;
            _this.uploadedBytes = newUploadedBytes;

            _this.onProgress(prevUploadedBytes, newUploadedBytes);
        };

        _this.uploadErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            _this.consoleLog('Upload failure ' + error.message + ' for part ' + _this.toJSON() + '. XHR state: ' + _this.xhr.xhr.readyState + '.');
            var eventInfo = {
                message: error.message,
                part: {
                    uploadedBytes: _this.uploadedBytes,
                    id: _this.id,
                    index: _this.index,
                    offset: _this.offset
                },
                xhr_ready_state: _this.xhr.xhr.readyState,
                xhr_status_text: _this.xhr.xhr.statusText
            };
            var eventInfoString = JSON.stringify(eventInfo);
            _this.logEvent('part_failure', eventInfoString);

            if (_this.numUploadRetriesPerformed >= _this.config.retries) {
                _this.onError(error, eventInfoString);
                return;
            }

            var retryDelayMs = getBoundedExpBackoffRetryDelay(_this.config.initialRetryDelayMs, _this.config.maxRetryDelayMs, _this.numUploadRetriesPerformed);

            _this.numUploadRetriesPerformed += 1;
            _this.consoleLog('Retrying uploading part ' + _this.toJSON() + ' in ' + retryDelayMs + ' ms');
            _this.retryTimeout = setTimeout(_this.retryUpload, retryDelayMs);
        };

        _this.retryUpload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var parts, response;
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
                            _context.prev = 2;

                            if (!(_this.uploadedBytes < _this.partSize)) {
                                _context.next = 5;
                                break;
                            }

                            throw new Error('Incomplete part.');

                        case 5:
                            _context.next = 7;
                            return _this.listParts(_this.index, 1);

                        case 7:
                            parts = _context.sent;

                            if (!(parts && parts.length === 1 && parts[0].offset === _this.offset && parts[0].part_id)) {
                                _context.next = 13;
                                break;
                            }

                            _this.consoleLog('Part ' + _this.toJSON() + ' is available on server. Not re-uploading.');
                            _this.id = parts[0].part_id;
                            _this.uploadSuccessHandler({
                                data: {
                                    part: parts[0]
                                }
                            });
                            return _context.abrupt('return');

                        case 13:
                            _this.consoleLog('Part ' + _this.toJSON() + ' is not available on server. Re-uploading.');
                            throw new Error('Part not found on the server');

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context['catch'](2);
                            response = _context.t0.response;

                            if (response && response.status) {
                                _this.consoleLog('Error ' + response.status + ' while listing part ' + _this.toJSON() + '. Re-uploading.');
                            }
                            _this.numUploadRetriesPerformed += 1;
                            _this.upload();

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[2, 17]]);
        }));

        _this.listParts = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(partIndex, limit) {
                var params, endpoint, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                params = {
                                    offset: partIndex,
                                    limit: limit
                                };
                                endpoint = updateQueryParameters(_this.sessionEndpoints.listParts, params);
                                _context2.next = 4;
                                return _this.xhr.get({
                                    url: endpoint
                                });

                            case 4:
                                response = _context2.sent;
                                return _context2.abrupt('return', response.entries);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x, _x2) {
                return _ref3.apply(this, arguments);
            };
        }();

        _this.index = index;
        _this.numDigestRetriesPerformed = 0;
        _this.numUploadRetriesPerformed = 0;
        _this.offset = offset;
        _this.partSize = partSize;
        _this.fileSize = fileSize;
        _this.state = PART_STATE_NOT_STARTED;
        _this.timing = {};
        _this.uploadedBytes = 0;
        _this.data = {};
        _this.config = config;
        _this.rangeEnd = offset + partSize - 1;
        if (_this.rangeEnd > fileSize - 1) {
            _this.rangeEnd = fileSize - 1;
        }
        _this.onSuccess = onSuccess || noop;
        _this.onError = onError || noop;
        _this.onProgress = onProgress || noop;
        _this.getNumPartsUploading = getNumPartsUploading;
        return _this;
    }

    /**
     * Returns file part information from the server after part upload is successful
     *
     * @return {Object}
     */


    /**
     * Uploads this Part via the API. Will retry on network failures.
     *
     * @return {void}
     */


    /**
     * Handler for upload part success
     *
     * @param {Object} data
     * @return {void}
     */


    /**
     * Handler for upload part progress event
     *
     * @param {ProgressEvent} data
     * @return {void}
     */


    /**
     * Handler for upload part error
     *
     * @param {Error} error
     * @return {void}
     */


    /**
     * Retry uploading part
     *
     * @return {Promise}
     */


    _createClass(MultiputPart, [{
        key: 'cancel',


        /**
         * Cancels upload for this Part.
         *
         * @return {void}
         */
        value: function cancel() {
            if (this.xhr && typeof this.xhr.abort === 'function') {
                this.xhr.abort();
            }

            clearTimeout(this.retryTimeout);
            this.blob = null;
            this.data = {};
            this.destroy();
        }

        /**
         * List specified parts
         *
         * @param {number} partIndex - Index of starting part. Optional.
         * @param {number} limit - Number of parts to be listed. Optional.
         * @return {Promise<Array<Object>>} Array of parts
         */

    }]);

    return MultiputPart;
}(BaseMultiput);

export default MultiputPart;
export { PART_STATE_NOT_STARTED, PART_STATE_COMPUTING_DIGEST, PART_STATE_DIGEST_READY, PART_STATE_UPLOADING, PART_STATE_UPLOADED };