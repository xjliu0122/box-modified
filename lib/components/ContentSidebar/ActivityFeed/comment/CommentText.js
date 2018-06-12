var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Comment Text component used by Comment component
 */

import * as React from 'react';

import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator';

import formatTaggedMessage from '../utils/formatTaggedMessage';
import ShowOriginalButton from './ShowOriginalButton';
import TranslateButton from './TranslateButton';

var CommentText = function (_React$Component) {
    _inherits(CommentText, _React$Component);

    function CommentText() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CommentText);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommentText.__proto__ || Object.getPrototypeOf(CommentText)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isLoading: false,
            isTranslation: false
        }, _this.handleTranslate = function (event) {
            var _this$props = _this.props,
                id = _this$props.id,
                tagged_message = _this$props.tagged_message,
                onTranslate = _this$props.onTranslate,
                translatedTaggedMessage = _this$props.translatedTaggedMessage;

            if (!translatedTaggedMessage) {
                _this.setState({ isLoading: true });
                onTranslate({ id: id, tagged_message: tagged_message });
            }
            _this.setState({ isTranslation: true });
            event.preventDefault();
        }, _this.handleShowOriginal = function (event) {
            _this.setState({ isTranslation: false });
            event.preventDefault();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CommentText, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var translatedTaggedMessage = nextProps.translatedTaggedMessage,
                translationFailed = nextProps.translationFailed;

            if (translatedTaggedMessage || translationFailed) {
                this.setState({ isLoading: false });
            }
        }
    }, {
        key: 'getButton',
        value: function getButton(isTranslation) {
            var button = null;
            if (isTranslation) {
                button = React.createElement(ShowOriginalButton, { handleShowOriginal: this.handleShowOriginal });
            } else {
                button = React.createElement(TranslateButton, { handleTranslate: this.handleTranslate });
            }
            return button;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                tagged_message = _props.tagged_message,
                translatedTaggedMessage = _props.translatedTaggedMessage,
                translationEnabled = _props.translationEnabled,
                getUserProfileUrl = _props.getUserProfileUrl;
            var _state = this.state,
                isLoading = _state.isLoading,
                isTranslation = _state.isTranslation;

            var commentToDisplay = translationEnabled && isTranslation && translatedTaggedMessage ? translatedTaggedMessage : tagged_message;
            return isLoading ? React.createElement(
                'div',
                { className: 'bcs-comment-text-loading' },
                React.createElement(LoadingIndicator, { size: 'small' })
            ) : React.createElement(
                'div',
                { className: 'bcs-comment-text' },
                formatTaggedMessage(commentToDisplay, id, false, getUserProfileUrl),
                translationEnabled ? this.getButton(isTranslation) : null
            );
        }
    }]);

    return CommentText;
}(React.Component);

CommentText.defaultProps = {
    translationEnabled: false
};


export default CommentText;