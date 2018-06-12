var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the content picker ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentExplorerComponent from '../components/ContentExplorer/ContentExplorer';

var ContentExplorer = function (_ES6Wrapper) {
    _inherits(ContentExplorer, _ES6Wrapper);

    function ContentExplorer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentExplorer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentExplorer.__proto__ || Object.getPrototypeOf(ContentExplorer)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function (data) {
            _this.emit('select', data);
        }, _this.onNavigate = function (data) {
            _this.emit('navigate', data);
        }, _this.onRename = function (data) {
            _this.emit('rename', data);
        }, _this.onPreview = function (data) {
            _this.emit('preview', data);
        }, _this.onDownload = function (data) {
            _this.emit('download', data);
        }, _this.onDelete = function (data) {
            _this.emit('delete', data);
        }, _this.onUpload = function (data) {
            _this.emit('upload', data);
        }, _this.onCreate = function (data) {
            _this.emit('create', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for selecting files
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for navigating into a folder
     *
     * @param {Object} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for renaming file
     *
     * @return {void}
     */


    /**
     * Callback for previewing a file
     *
     * @return {void}
     */


    /**
     * Callback for downloading a file
     *
     * @return {void}
     */


    /**
     * Callback for deleting a file
     *
     * @return {void}
     */


    /**
     * Callback for uploading a file
     *
     * @return {void}
     */


    /**
     * Callback for creating a folder
     *
     * @return {void}
     */


    _createClass(ContentExplorer, [{
        key: 'navigateTo',


        /**
         * Helper to programatically navigate
         *
         * @param {string} id - string folder id
         * @return {void}
         */
        value: function navigateTo(id) {
            var component = this.getComponent();
            if (component && typeof component.clearCache === 'function') {
                component.fetchFolder(id);
            }
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            _render(React.createElement(ContentExplorerComponent, _extends({
                language: this.language,
                messages: this.messages,
                rootFolderId: this.id,
                token: this.token,
                componentRef: this.setComponent,
                onDelete: this.onDelete,
                onDownload: this.onDownload,
                onPreview: this.onPreview,
                onRename: this.onRename,
                onSelect: this.onSelect,
                onUpload: this.onUpload,
                onCreate: this.onCreate,
                onNavigate: this.onNavigate,
                onInteraction: this.onInteraction
            }, this.options)), this.container);
        }
    }]);

    return ContentExplorer;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentExplorer = ContentExplorer;
export default ContentExplorer;