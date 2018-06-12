var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the content uploader ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentUploaderPopup from '../components/ContentUploader/ContentUploaderPopup';
import ContentUploaderComponent from '../components/ContentUploader/ContentUploader';

var ContentUploader = function (_ES6Wrapper) {
    _inherits(ContentUploader, _ES6Wrapper);

    function ContentUploader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentUploader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentUploader.__proto__ || Object.getPrototypeOf(ContentUploader)).call.apply(_ref, [this].concat(args))), _this), _this.onClose = function () {
            _this.emit('close');
        }, _this.onComplete = function (data) {
            _this.emit('complete', data);
        }, _this.onError = function (data) {
            _this.emit('error', data);
        }, _this.onUpload = function (data) {
            _this.emit('upload', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback on closing uploader. Emits 'close' event.
     *
     * @return {void}
     */


    /**
     * Callback when all files finish uploading. Emits 'complete' event with Box File objects of uploaded items as data.
     *
     * @param {Array} data - Completed upload items
     * @return {void}
     */


    /**
     * Callback on a single upload error. Emits 'uploaderror' event with information about the failed upload.
     *
     * @param {Object} data - File and error info about failed upload
     * @return {void}
     */


    /**
     * Callback on a single successful upload. Emits 'uploadsuccess' event with Box File object of uploaded item.
     *
     * @param {BoxItem} data - Successfully uploaded item
     * @return {void}
     */


    _createClass(ContentUploader, [{
        key: 'render',


        /** @inheritdoc */
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                _options$useUploadsMa = _options.useUploadsManager,
                useUploadsManager = _options$useUploadsMa === undefined ? false : _options$useUploadsMa,
                rest = _objectWithoutProperties(_options, ['modal', 'useUploadsManager']);

            var UploaderComponent = modal ? ContentUploaderPopup : ContentUploaderComponent;

            _render(React.createElement(UploaderComponent, _extends({
                language: this.language,
                messages: this.messages,
                componentRef: this.setComponent,
                rootFolderId: this.id,
                token: this.token,
                onClose: this.onClose,
                onComplete: this.onComplete,
                onError: this.onError,
                onUpload: this.onUpload,
                useUploadsManager: useUploadsManager,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentUploader;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentUploader = ContentUploader;
export default ContentUploader;