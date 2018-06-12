var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
import ContentPickerPopup from '../components/ContentPicker/ContentPickerPopup';
import ContentPickerComponent from '../components/ContentPicker/ContentPicker';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER } from '../constants';

var ContentPicker = function (_ES6Wrapper) {
    _inherits(ContentPicker, _ES6Wrapper);

    function ContentPicker() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentPicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentPicker.__proto__ || Object.getPrototypeOf(ContentPicker)).call.apply(_ref, [this].concat(args))), _this), _this.onChoose = function (data) {
            _this.emit('choose', data);
        }, _this.onCancel = function () {
            _this.emit('cancel');
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for pressing choose
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    /**
     * Callback for pressing cancel
     *
     * @return {void}
     */


    _createClass(ContentPicker, [{
        key: 'getType',


        /**
         * Returns the type of content picker
         *
         * @return {void}
         */
        value: function getType() {
            var _ref2 = this.options || {},
                type = _ref2.type;

            return type || TYPE_FOLDER + ',' + TYPE_FILE + ',' + TYPE_WEBLINK;
        }

        /**
         * Returns the name for content picker
         *
         * @return {void}
         */

    }, {
        key: 'getClientName',
        value: function getClientName() {
            return CLIENT_NAME_CONTENT_PICKER;
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                rest = _objectWithoutProperties(_options, ['modal']);

            var PickerComponent = modal ? ContentPickerPopup : ContentPickerComponent;
            _render(React.createElement(PickerComponent, _extends({
                language: this.language,
                messages: this.messages,
                clientName: this.getClientName(),
                componentRef: this.setComponent,
                rootFolderId: this.id,
                token: this.token,
                type: this.getType(),
                onCancel: this.onCancel,
                onChoose: this.onChoose,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentPicker;
}(ES6Wrapper);

export default ContentPicker;