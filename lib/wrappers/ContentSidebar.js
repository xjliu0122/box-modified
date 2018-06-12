var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base class for the content preview ES6 wrapper, only used for testing
 * @author Box
 */

import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentSidebarComponent from '../components/ContentSidebar/ContentSidebar';

var ContentSidebar = function (_ES6Wrapper) {
    _inherits(ContentSidebar, _ES6Wrapper);

    function ContentSidebar() {
        _classCallCheck(this, ContentSidebar);

        return _possibleConstructorReturn(this, (ContentSidebar.__proto__ || Object.getPrototypeOf(ContentSidebar)).apply(this, arguments));
    }

    _createClass(ContentSidebar, [{
        key: 'render',

        /** @inheritdoc */
        value: function render() {
            _render(React.createElement(ContentSidebarComponent, _extends({
                language: this.language,
                messages: this.messages,
                fileId: this.id,
                token: this.token,
                componentRef: this.setComponent,
                onInteraction: this.onInteraction
            }, this.options)), this.container);
        }
    }]);

    return ContentSidebar;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentSidebar = ContentSidebar;
export default ContentSidebar;