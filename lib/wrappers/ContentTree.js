var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the folder tree ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentTreePopup from '../components/ContentTree/ContentTreePopup';
import ContentTreeComponent from '../components/ContentTree/ContentTree';
import { CLIENT_NAME_CONTENT_TREE } from '../constants';

var ContentTree = function (_ES6Wrapper) {
    _inherits(ContentTree, _ES6Wrapper);

    function ContentTree() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContentTree);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentTree.__proto__ || Object.getPrototypeOf(ContentTree)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (data) {
            _this.emit('click', data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Callback for clicking an item
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */


    _createClass(ContentTree, [{
        key: 'getClientName',


        /**
         * Returns the name for folder tree
         *
         * @return {void}
         */
        value: function getClientName() {
            return CLIENT_NAME_CONTENT_TREE;
        }

        /** @inheritdoc */

    }, {
        key: 'render',
        value: function render() {
            var _options = this.options,
                modal = _options.modal,
                rest = _objectWithoutProperties(_options, ['modal']);

            var TreeComponent = modal ? ContentTreePopup : ContentTreeComponent;
            _render(React.createElement(TreeComponent, _extends({
                language: this.language,
                messages: this.messages,
                clientName: this.getClientName(),
                componentRef: this.setComponent,
                rootFolderId: this.id,
                token: this.token,
                onClick: this.onClick,
                modal: modal
            }, rest)), this.container);
        }
    }]);

    return ContentTree;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentTree = ContentTree;
export default ContentTree;