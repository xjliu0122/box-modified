var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box file API
 * @author Box
 */

import Item from './Item';
import { getFieldsAsString } from '../util/fields';
import { getTypedFileId } from '../util/file';
import { FIELD_DOWNLOAD_URL, CACHE_PREFIX_FILE, X_REP_HINTS } from '../constants';
import { getBadItemError, getBadPermissionsError } from '../util/error';

var File = function (_Item) {
    _inherits(File, _Item);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
    }

    _createClass(File, [{
        key: 'getCacheKey',

        /**
         * Creates a key for the cache
         *
         * @param {string} id - Folder id
         * @return {string} key
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_FILE + id;
        }

        /**
         * API URL for files
         *
         * @param {string} [id] - Optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            var suffix = id ? '/' + id : '';
            return this.getBaseApiUrl() + '/files' + suffix;
        }

        /**
         * API for getting download URL for files
         *
         * @param {string} id - File id
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'getDownloadUrl',
        value: function getDownloadUrl(id, successCallback, errorCallback) {
            var _this2 = this;

            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            return this.xhr.get({
                url: this.getUrl(id),
                params: {
                    fields: FIELD_DOWNLOAD_URL
                }
            }).then(function (_ref) {
                var data = _ref.data;

                _this2.successHandler(data[FIELD_DOWNLOAD_URL]);
            }).catch(this.errorHandler);
        }

        /**
         * API for setting the description of a file
         *
         * @param {BoxItem} file - File object for which we are changing the description
         * @param {string} description - New file description
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {Promise}
         */

    }, {
        key: 'setFileDescription',
        value: function setFileDescription(file, description, successCallback, errorCallback) {
            var _this3 = this;

            var id = file.id,
                permissions = file.permissions;


            if (!id || !permissions) {
                errorCallback(getBadItemError());
                return Promise.reject();
            }

            if (!permissions.can_rename) {
                errorCallback(getBadPermissionsError());
                return Promise.reject();
            }

            return this.xhr.put({
                id: getTypedFileId(id),
                url: this.getUrl(id),
                data: { description: description }
            }).then(function (_ref2) {
                var data = _ref2.data;

                if (!_this3.isDestroyed()) {
                    var updatedFile = _this3.merge(_this3.getCacheKey(id), 'description', data.description);
                    successCallback(updatedFile);
                }
            }).catch(function (e) {
                if (!_this3.isDestroyed()) {
                    var originalFile = _this3.merge(_this3.getCacheKey(id), 'description', file.description);
                    errorCallback(e, originalFile);
                }
            });
        }

        /**
         * Gets a box file
         *
         * @param {string} id - File id
         * @param {Function} successCallback - Function to call with results
         * @param {Function} errorCallback - Function to call with errors
         * @param {boolean|void} [forceFetch] - Bypasses the cache
         * @param {boolean|void} [includePreviewSidebar] - Optionally include preview sidebar fields
         * @return {Promise}
         */

    }, {
        key: 'file',
        value: function file(id, successCallback, errorCallback) {
            var _this4 = this;

            var forceFetch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var includePreviewSidebarFields = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var cache = this.getCache();
            var key = this.getCacheKey(id);

            // Clear the cache if needed
            if (forceFetch) {
                cache.unset(key);
            }

            // Return the Cache value if it exists
            if (cache.has(key)) {
                successCallback(cache.get(key));
                return Promise.resolve();
            }

            // Make the XHR request
            // We use per file auth tokens for file
            // as thats what needed by preview.
            return this.xhr.get({
                id: getTypedFileId(id),
                url: this.getUrl(id),
                params: {
                    fields: getFieldsAsString(true, includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(function (_ref3) {
                var data = _ref3.data;

                if (!_this4.isDestroyed()) {
                    cache.set(key, data);
                    successCallback(data);
                }
            }).catch(errorCallback);
        }
    }]);

    return File;
}(Item);

export default File;