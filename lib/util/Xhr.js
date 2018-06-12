var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Network utilities
 * @author Box
 */

import axios from 'axios';
import getProp from 'lodash/get';
import TokenService from './TokenService';
import { HEADER_ACCEPT, HEADER_CLIENT_NAME, HEADER_CLIENT_VERSION, HEADER_CONTENT_TYPE, HTTP_POST, HTTP_PUT, HTTP_DELETE, HTTP_OPTIONS } from '../constants';

var DEFAULT_UPLOAD_TIMEOUT_MS = 120000;

var Xhr = function () {

    /**
     * [constructor]
     *
     * @param {Object} options
     * @param {string} options.id - item id
     * @param {string} options.clientName - Client Name
     * @param {string|function} options.token - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.requestInterceptor] - Request interceptor
     * @param {string} [options.responseInterceptor] - Response interceptor
     * @return {Xhr} Cache instance
     */
    function Xhr() {
        var _this = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            id = _ref.id,
            clientName = _ref.clientName,
            token = _ref.token,
            version = _ref.version,
            sharedLink = _ref.sharedLink,
            sharedLinkPassword = _ref.sharedLinkPassword,
            responseInterceptor = _ref.responseInterceptor,
            requestInterceptor = _ref.requestInterceptor;

        _classCallCheck(this, Xhr);

        this.errorInterceptor = function (error) {
            var errorObject = getProp(error, 'response.data', error);
            if (typeof _this.responseInterceptor === 'function') {
                _this.responseInterceptor(errorObject);
            }

            return Promise.reject(error);
        };

        this.id = id;
        this.token = token;
        this.clientName = clientName;
        this.version = version;
        this.sharedLink = sharedLink;
        this.sharedLinkPassword = sharedLinkPassword;
        this.responseInterceptor = responseInterceptor;
        this.axios = axios.create();
        this.axiosSource = axios.CancelToken.source();

        if (typeof responseInterceptor === 'function') {
            // Called on any non 2xx response
            this.axios.interceptors.response.use(responseInterceptor, this.errorInterceptor);
        }

        if (typeof requestInterceptor === 'function') {
            this.axios.interceptors.request.use(requestInterceptor);
        }
    }

    /**
     * Error interceptor that wraps the passed in responseInterceptor
     *
     * @param {Object} error - Error object from axios
     * @return {Promise} rejected promise with error info
     */


    _createClass(Xhr, [{
        key: 'getParsedUrl',


        /**
         * Utility to parse a URL.
         *
         * @param {string} url - Url to parse
         * @return {Object} parsed url
         */
        value: function getParsedUrl(url) {
            var a = document.createElement('a');
            a.href = url;
            return {
                api: url.replace(a.origin + '/2.0', ''),
                host: a.host,
                hostname: a.hostname,
                pathname: a.pathname,
                origin: a.origin,
                protocol: a.protocol,
                hash: a.hash,
                port: a.port
            };
        }

        /**
         * Builds a list of required XHR headers.
         *
         * @param {string} [id] - Optional box item id
         * @param {Object} [args] - Optional existing headers
         * @return {Object} Headers
         */

    }, {
        key: 'getHeaders',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var headers, itemId, token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                headers = Object.assign(_defineProperty({
                                    Accept: 'application/json'
                                }, HEADER_CONTENT_TYPE, 'application/json'), args);


                                if (this.sharedLink) {
                                    headers.BoxApi = 'shared_link=' + this.sharedLink;

                                    if (this.sharedLinkPassword) {
                                        headers.BoxApi = headers.BoxApi + '&shared_link_password=' + this.sharedLinkPassword;
                                    }
                                }
                                if (this.clientName) {
                                    headers[HEADER_CLIENT_NAME] = this.clientName;
                                }
                                if (this.version) {
                                    headers[HEADER_CLIENT_VERSION] = this.version;
                                }

                                // If id is passed in, use that, otherwise default to this.id
                                itemId = id || this.id || '';
                                _context.next = 7;
                                return TokenService.getWriteToken(itemId, this.token);

                            case 7:
                                token = _context.sent;

                                if (token) {
                                    // Only add a token when there was one found
                                    headers.Authorization = 'Bearer ' + token;
                                }

                                return _context.abrupt('return', headers);

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getHeaders(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getHeaders;
        }()

        /**
         * HTTP GETs a URL
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} [headers] - Key-value map of headers
         * @param {Object} [params] - Key-value map of querystring params
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'get',
        value: function get(_ref3) {
            var _this2 = this;

            var url = _ref3.url,
                id = _ref3.id,
                _ref3$params = _ref3.params,
                params = _ref3$params === undefined ? {} : _ref3$params,
                _ref3$headers = _ref3.headers,
                headers = _ref3$headers === undefined ? {} : _ref3$headers;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return _this2.axios.get(url, {
                    cancelToken: _this2.axiosSource.token,
                    params: params,
                    headers: hdrs,
                    parsedUrl: _this2.getParsedUrl(url)
                });
            });
        }

        /**
         * HTTP POSTs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} params - Optional query params for the request
         * @param {Object} [headers] - Key-value map of headers
         * @param {string} [method] - xhr type
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'post',
        value: function post(_ref4) {
            var _this3 = this;

            var url = _ref4.url,
                id = _ref4.id,
                data = _ref4.data,
                params = _ref4.params,
                _ref4$headers = _ref4.headers,
                headers = _ref4$headers === undefined ? {} : _ref4$headers,
                _ref4$method = _ref4.method,
                method = _ref4$method === undefined ? HTTP_POST : _ref4$method;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return _this3.axios({
                    url: url,
                    data: data,
                    params: params,
                    method: method,
                    parsedUrl: _this3.getParsedUrl(url),
                    headers: hdrs
                });
            });
        }

        /**
         * HTTP PUTs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} params - Optional query params for the request
         * @param {Object} [headers] - Key-value map of headers
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'put',
        value: function put(_ref5) {
            var url = _ref5.url,
                id = _ref5.id,
                data = _ref5.data,
                params = _ref5.params,
                _ref5$headers = _ref5.headers,
                headers = _ref5$headers === undefined ? {} : _ref5$headers;

            return this.post({ id: id, url: url, data: data, params: params, headers: headers, method: HTTP_PUT });
        }

        /**
         * HTTP DELETEs a URL with JSON data
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to fetch
         * @param {Object} data - JS Object representation of JSON data to send
         * @param {Object} [headers] - Key-value map of headers
         * @return {Promise} - HTTP response
         */

    }, {
        key: 'delete',
        value: function _delete(_ref6) {
            var url = _ref6.url,
                id = _ref6.id,
                _ref6$data = _ref6.data,
                data = _ref6$data === undefined ? {} : _ref6$data,
                _ref6$headers = _ref6.headers,
                headers = _ref6$headers === undefined ? {} : _ref6$headers;

            return this.post({ id: id, url: url, data: data, headers: headers, method: HTTP_DELETE });
        }

        /**
         * HTTP OPTIONs a URL with JSON data.
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to post to
         * @param {Object} data - The non-file post data that should accompany the post
         * @param {Object} [headers] - Key-value map of headers
         * @param {Function} successHandler - Load success handler
         * @param {Function} errorHandler - Error handler
         * @return {void}
         */

    }, {
        key: 'options',
        value: function options(_ref7) {
            var _this4 = this;

            var id = _ref7.id,
                url = _ref7.url,
                data = _ref7.data,
                _ref7$headers = _ref7.headers,
                headers = _ref7$headers === undefined ? {} : _ref7$headers,
                successHandler = _ref7.successHandler,
                errorHandler = _ref7.errorHandler;

            return this.getHeaders(id, headers).then(function (hdrs) {
                return _this4.axios({
                    url: url,
                    data: data,
                    method: HTTP_OPTIONS,
                    headers: hdrs
                }).then(successHandler).catch(errorHandler);
            }).catch(errorHandler);
        }

        /**
         * HTTP POST or PUT a URL with File data. Uses native XHR for progress event.
         *
         * @param {string} id - Box item id
         * @param {string} url - The URL to post to
         * @param {Object} [data] - File data and attributes
         * @param {Object} [headers] - Key-value map of headers
         * @param {string} [method] - XHR method, supports 'POST' and 'PUT'
         * @param {Function} successHandler - Load success handler
         * @param {Function} errorHandler - Error handler
         * @param {Function} progressHandler - Progress handler
         * @param {boolean} [withIdleTimeout] - enable idle timeout
         * @param {number} [idleTimeoutDuration] - idle timeout duration
         * @param {Function} [idleTimeoutHandler]
         * @return {void}
         */

    }, {
        key: 'uploadFile',
        value: function uploadFile(_ref8) {
            var _this5 = this;

            var id = _ref8.id,
                url = _ref8.url,
                data = _ref8.data,
                _ref8$headers = _ref8.headers,
                headers = _ref8$headers === undefined ? {} : _ref8$headers,
                _ref8$method = _ref8.method,
                method = _ref8$method === undefined ? HTTP_POST : _ref8$method,
                successHandler = _ref8.successHandler,
                errorHandler = _ref8.errorHandler,
                progressHandler = _ref8.progressHandler,
                _ref8$withIdleTimeout = _ref8.withIdleTimeout,
                withIdleTimeout = _ref8$withIdleTimeout === undefined ? false : _ref8$withIdleTimeout,
                _ref8$idleTimeoutDura = _ref8.idleTimeoutDuration,
                idleTimeoutDuration = _ref8$idleTimeoutDura === undefined ? DEFAULT_UPLOAD_TIMEOUT_MS : _ref8$idleTimeoutDura,
                idleTimeoutHandler = _ref8.idleTimeoutHandler;

            return this.getHeaders(id, headers).then(function (hdrs) {
                var idleTimeout = void 0;
                var progressHandlerToUse = progressHandler;

                if (withIdleTimeout) {
                    // Func that aborts upload and executes timeout callback
                    var idleTimeoutFunc = function idleTimeoutFunc() {
                        _this5.abort();

                        if (idleTimeoutHandler) {
                            idleTimeoutHandler();
                        }
                    };

                    idleTimeout = setTimeout(idleTimeoutFunc, idleTimeoutDuration);

                    // Progress handler that aborts upload if there has been no progress for >= timeoutMs
                    progressHandlerToUse = function progressHandlerToUse(event) {
                        clearTimeout(idleTimeout);
                        idleTimeout = setTimeout(idleTimeoutFunc, idleTimeoutDuration);
                        progressHandler(event);
                    };
                }

                _this5.axios({
                    url: url,
                    data: data,
                    transformRequest: function transformRequest(reqData, reqHeaders) {
                        // Remove Accept & Content-Type added by getHeaders()
                        delete reqHeaders[HEADER_ACCEPT];
                        delete reqHeaders[HEADER_CONTENT_TYPE];

                        if (headers[HEADER_CONTENT_TYPE]) {
                            reqHeaders[HEADER_CONTENT_TYPE] = headers[HEADER_CONTENT_TYPE];
                        }

                        // Convert to FormData if needed
                        if (reqData && !(reqData instanceof Blob) && reqData.attributes) {
                            var formData = new FormData();
                            Object.keys(reqData).forEach(function (key) {
                                formData.append(key, reqData[key]);
                            });

                            return formData;
                        }

                        return reqData;
                    },
                    method: method,
                    headers: hdrs,
                    onUploadProgress: progressHandlerToUse,
                    cancelToken: _this5.axiosSource.token
                }).then(function (response) {
                    clearTimeout(idleTimeout);
                    successHandler(response);
                }).catch(function (error) {
                    clearTimeout(idleTimeout);
                    errorHandler(error);
                });
            }).catch(errorHandler);
        }

        /**
         * Aborts an axios request.
         *
         * @return {void}
         */

    }, {
        key: 'abort',
        value: function abort() {
            if (this.axiosSource) {
                this.axiosSource.cancel();
            }
        }
    }]);

    return Xhr;
}();

export default Xhr;