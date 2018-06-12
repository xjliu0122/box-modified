var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Inline Delete component
 */

import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

import PlainButton from 'box-react-ui/lib/components/plain-button';
import { Flyout, Overlay } from 'box-react-ui/lib/components/flyout';
import IconTrash from 'box-react-ui/lib/icons/general/IconTrash';

import messages from '../../../messages';

var InlineDelete = function (_React$Component) {
    _inherits(InlineDelete, _React$Component);

    function InlineDelete() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InlineDelete);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InlineDelete.__proto__ || Object.getPrototypeOf(InlineDelete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isConfirming: false
        }, _this.onDeleteConfirmedHandler = function () {
            var _this$props = _this.props,
                id = _this$props.id,
                onDelete = _this$props.onDelete,
                permissions = _this$props.permissions;

            onDelete({ id: id, permissions: permissions });
        }, _this.handleFlyoutOpen = function () {
            _this.setState({ isConfirming: true });
        }, _this.handleFlyoutClose = function () {
            _this.setState({ isConfirming: false });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InlineDelete, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                intl = _props.intl,
                message = _props.message;

            return React.createElement(
                'div',
                {
                    className: classNames('bcs-comment-delete-container', {
                        'bcs-is-confirming': this.state.isConfirming
                    })
                },
                React.createElement(
                    Flyout,
                    { onClose: this.handleFlyoutClose, onOpen: this.handleFlyoutOpen, position: 'middle-left' },
                    React.createElement(
                        PlainButton,
                        { 'aria-label': intl.formatMessage(messages.deleteLabel), className: 'bcs-comment-delete' },
                        React.createElement(IconTrash, null)
                    ),
                    React.createElement(
                        Overlay,
                        null,
                        React.createElement(
                            'b',
                            null,
                            message
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                PlainButton,
                                {
                                    className: 'lnk bcs-comment-delete-yes',
                                    onClick: this.onDeleteConfirmedHandler,
                                    type: 'button'
                                },
                                React.createElement(FormattedMessage, messages.commentDeleteConfirm)
                            ),
                            ' / ',
                            React.createElement(
                                PlainButton,
                                { className: 'lnk bcs-comment-delete-no', type: 'button' },
                                React.createElement(FormattedMessage, messages.commentDeleteCancel)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return InlineDelete;
}(React.Component);

export { InlineDelete as InlineDeleteBase };
export default injectIntl(InlineDelete);