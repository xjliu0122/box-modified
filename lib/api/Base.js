var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Base class with utility methods for API calls
 * @author Box
 */

import noop from 'lodash/noop';
import Xhr from '../util/Xhr';
import Cache from '../util/Cache';
import { getTypedFileId } from '../util/file';
import { getBadItemError, getBadPermissionsError } from '../util/error';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_UPLOAD, HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE } from '../constants';

var Base = function () {

    /**
     * [constructor]
     *
     * @param {Object} [options]
     * @param {string} [options.token] - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.apiHost] - Api host
     * @param {string} [options.uploadHost] - Upload host name
     * @return {Base} Base instance
     */


    /**
     * @property {Function}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {string}
     */


    /**
     * @property {Xhr}
     */

    /**
     * @property {Cache}
     */
    function Base(options) {
        var _this = this;

        _classCallCheck(this, Base);

        this.successHandler = function (data) {
            if (!_this.isDestroyed() && typeof _this.successCallback === 'function') {
                _this.successCallback(data);
            }
        };

        this.errorHandler = function (error) {
            if (!_this.isDestroyed() && typeof _this.errorCallback === 'function') {
                var response = error.response;


                if (response) {
                    _this.errorCallback(response.data);
                } else {
                    _this.errorCallback(error);
                }
            }
        };

        this.cache = options.cache || new Cache();
        this.apiHost = options.apiHost || DEFAULT_HOSTNAME_API;
        this.uploadHost = options.uploadHost || DEFAULT_HOSTNAME_UPLOAD;
        // @TODO: avoid keeping another copy of data in this.options
        this.options = Object.assign({}, options, {
            apiHost: this.apiHost,
            uploadHost: this.uploadHost,
            cache: this.cache
        });
        this.xhr = new Xhr(this.options);
        this.destroyed = false;
        this.consoleLog = !!options.consoleLog && !!window.console ? window.console.log || noop : noop;
        this.consoleError = !!options.consoleError && !!window.console ? window.console.error || noop : noop;
    }

    /**
     * [destructor]
     *
     * @return {void}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {Function}
     */


    /**
     * @property {*}
     */


    /**
     * @property {string}
     */


    /**
     * @property {boolean}
     */


    _createClass(Base, [{
        key: 'destroy',
        value: function destroy() {
            this.xhr.abort();
            this.destroyed = true;
        }

        /**
         * Asks the API if its destructor has been called
         *
         * @return {void}
         */

    }, {
        key: 'isDestroyed',
        value: function isDestroyed() {
            return this.destroyed;
        }

        /**
         * Checks that our desired API call has sufficient permissions and an item ID
         *
         * @param {string} permissionToCheck - Permission to check
         * @param {Object} permissions - Permissions object
         * @param {string} id - Item id
         * @return {void}
         */

    }, {
        key: 'checkApiCallValidity',
        value: function checkApiCallValidity(permissionToCheck, permissions, id) {
            if (!id || !permissions) {
                throw getBadItemError();
            }

            var permission = permissions[permissionToCheck];
            if (!permission) {
                throw getBadPermissionsError();
            }
        }

        /**
         * Base URL for api
         *
         * @return {string} base url
         */

    }, {
        key: 'getBaseApiUrl',
        value: function getBaseApiUrl() {
            var suffix = this.apiHost.endsWith('/') ? '2.0' : '/2.0';
            return '' + this.apiHost + suffix;
        }

        /**
         * Base URL for api uploads
         *
         * @return {string} base url
         */

    }, {
        key: 'getBaseUploadUrl',
        value: function getBaseUploadUrl() {
            var suffix = this.uploadHost.endsWith('/') ? 'api/2.0' : '/api/2.0';
            return '' + this.uploadHost + suffix;
        }

        /**
         * Gets the cache instance
         *
         * @return {Cache} cache instance
         */

    }, {
        key: 'getCache',
        value: function getCache() {
            return this.cache;
        }

        /**
         * Generic success handler
         *
         * @param {Object} data - The response data
         */


        /**
         * Generic error handler
         *
         * @param {Object} data - The response data
         * @param {Function} errorCallback the error callback
         */

    }, {
        key: 'getUrl',


        /**
         * Gets the URL for the API, meant to be overridden
         * @param {string} id - The item id
         */
        /* eslint-disable no-unused-vars */
        value: function getUrl(id) {
            /* eslint-enable no-unused-vars */
            throw new Error('Implement me!');
        }

        /**
         * Formats an API entry for use in components
         * @param {string} entry - an API response entry
         */
        /* eslint-disable no-unused-vars */

    }, {
        key: 'format',
        value: function format(entry) {
            /* eslint-enable no-unused-vars */
            throw new Error('Implement me!');
        }

        /**
         * Generic API GET
         *
         * @param {string} id - The file id
         * @param {Function} successCallback - The success callback
         * @param {Function} errorCallback - The error callback
         * @param {Object} params request params
         */

    }, {
        key: 'get',
        value: function get(id, successCallback, errorCallback, params) {
            var url = this.getUrl(id);
            this.makeRequest(HTTP_GET, id, url, successCallback, errorCallback, params);
        }

        /**
         * Generic API POST
         *
         * @param {string} id - The file id
         * @param {string} url - The url to post to
         * @param {Object} data - The data to post
         * @param {Function} successCallback - The success callback
         * @param {Function} errorCallback - The error callback
         */

    }, {
        key: 'post',
        value: function post(id, url, data, successCallback, errorCallback) {
            this.makeRequest(HTTP_POST, id, url, successCallback, errorCallback, data);
        }

        /**
         * Generic API PUT
         *
         * @param {string} id - The file id
         * @param {string} url - The url to put to
         * @param {Object} data - The data to put
         * @param {Function} successCallback - The success callback
         * @param {Function} errorCallback - The error callback
         */

    }, {
        key: 'put',
        value: function put(id, url, data, successCallback, errorCallback) {
            this.makeRequest(HTTP_PUT, id, url, successCallback, errorCallback, data);
        }

        /**
         * Generic API DELETE
         *
         * @param {string} id - The file id
         * @param {string} url - The url of the item to delete
         * @param {Function} successCallback - The success callback
         * @param {Function} errorCallback - The error callback
         * @param {Object} data optional data to delete
         */

    }, {
        key: 'delete',
        value: function _delete(id, url, successCallback, errorCallback) {
            var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

            this.makeRequest(HTTP_DELETE, id, url, successCallback, errorCallback, data);
        }

        /**
         * Generic API CRUD operations
         *
         * @param {string} method - which REST method to execute (GET, POST, PUT, DELETE)
         * @param {string} id - The file id
         * @param {string} url - The url of the item to operate on
         * @param {Function} successCallback - The success callback
         * @param {Function} errorCallback - The error callback
         * @param {Object} requestData - Optional info to be added to the API call such as params or request body data
         */

    }, {
        key: 'makeRequest',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(method, id, url, successCallback, errorCallback) {
                var requestData = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

                var xhrMethod, _ref2, _data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.isDestroyed()) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 2:

                                this.successCallback = successCallback;
                                this.errorCallback = errorCallback;

                                // $FlowFixMe
                                xhrMethod = this.xhr[method].bind(this.xhr);
                                _context.prev = 5;
                                _context.next = 8;
                                return xhrMethod(_extends({ id: getTypedFileId(id), url: url }, requestData));

                            case 8:
                                _ref2 = _context.sent;
                                _data = _ref2.data;

                                this.successHandler(_data);
                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](5);

                                this.errorHandler(_context.t0);

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 13]]);
            }));

            function makeRequest(_x2, _x3, _x4, _x5, _x6) {
                return _ref.apply(this, arguments);
            }

            return makeRequest;
        }()
    }]);

    return Base;
}();

export default Base;