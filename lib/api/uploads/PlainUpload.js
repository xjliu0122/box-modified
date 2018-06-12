var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the plain Box Upload API
 * @author Box
 */

import noop from 'lodash/noop';
import BaseUpload from './BaseUpload';

var PlainUpload = function (_BaseUpload) {
    _inherits(PlainUpload, _BaseUpload);

    function PlainUpload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PlainUpload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PlainUpload.__proto__ || Object.getPrototypeOf(PlainUpload)).call.apply(_ref, [this].concat(args))), _this), _this.uploadSuccessHandler = function (_ref2) {
            var entries = _ref2.entries;

            if (_this.isDestroyed()) {
                return;
            }

            if (typeof _this.successCallback === 'function') {
                // Response entries are the successfully created Box File objects
                _this.successCallback(entries);
            }
        }, _this.uploadProgressHandler = function (event) {
            if (_this.isDestroyed()) {
                return;
            }

            if (typeof _this.progressCallback === 'function') {
                _this.progressCallback(event);
            }
        }, _this.preflightSuccessHandler = function (_ref3) {
            var data = _ref3.data;

            if (_this.isDestroyed()) {
                return;
            }

            // Use provided upload URL if passed in, otherwise construct
            var uploadUrl = data.upload_url;
            if (!uploadUrl) {
                uploadUrl = _this.getBaseUploadUrl() + '/files/content';

                if (_this.fileId) {
                    uploadUrl = uploadUrl.replace('content', _this.fileId + '/content');
                }
            }

            var attributes = JSON.stringify({
                name: _this.file.name,
                parent: { id: _this.folderId }
            });

            _this.xhr.uploadFile({
                url: uploadUrl,
                data: {
                    attributes: attributes,
                    file: _this.file
                },
                successHandler: _this.uploadSuccessHandler,
                errorHandler: _this.preflightErrorHandler,
                progressHandler: _this.uploadProgressHandler
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Handles an upload success response
     *
     * @param {Object} data - Upload success data
     * @return {void}
     */


    /**
     * Handles an upload progress event
     *
     * @param {Object} event - Progress event
     * @return {void}
     */


    /**
     * Uploads a file. If a file ID is supplied, use the Upload File
     * Version API to replace the file.
     *
     * @param {Object} - Request options
     * @param {boolean} [options.url] - Upload URL to use
     * @return {void}
     */


    _createClass(PlainUpload, [{
        key: 'upload',


        /**
         * Uploads a file. If there is a conflict and overwrite is true, replace the file.
         * Otherwise, re-upload with a different name.
         *
         * @param {Object} options - Upload options
         * @param {string} options.folderId - untyped folder id
         * @param {string} [options.fileId] - Untyped file id (e.g. no "file_" prefix)
         * @param {File} options.file - File blob object
         * @param {Function} [options.successCallback] - Function to call with response
         * @param {Function} [options.errorCallback] - Function to call with errors
         * @param {Function} [options.progressCallback] - Function to call with progress
         * @param {boolean} [overwrite] - Should upload overwrite file with same name
         * @return {void}
         */
        value: function upload(_ref4) {
            var folderId = _ref4.folderId,
                fileId = _ref4.fileId,
                file = _ref4.file,
                _ref4$successCallback = _ref4.successCallback,
                successCallback = _ref4$successCallback === undefined ? noop : _ref4$successCallback,
                _ref4$errorCallback = _ref4.errorCallback,
                errorCallback = _ref4$errorCallback === undefined ? noop : _ref4$errorCallback,
                _ref4$progressCallbac = _ref4.progressCallback,
                progressCallback = _ref4$progressCallbac === undefined ? noop : _ref4$progressCallbac,
                _ref4$overwrite = _ref4.overwrite,
                overwrite = _ref4$overwrite === undefined ? true : _ref4$overwrite;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.folderId = folderId;
            this.fileId = fileId;
            this.file = file;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.progressCallback = progressCallback;
            this.overwrite = overwrite;

            this.makePreflightRequest();
        }

        /**
         * Cancels upload of a file.
         *
         * @return {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            if (this.isDestroyed()) {
                return;
            }

            if (this.xhr && typeof this.xhr.abort === 'function') {
                this.xhr.abort();
            }

            clearTimeout(this.retryTimeout);
        }
    }]);

    return PlainUpload;
}(BaseUpload);

export default PlainUpload;