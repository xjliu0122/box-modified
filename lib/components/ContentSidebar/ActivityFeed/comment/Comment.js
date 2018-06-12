var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Comment component
 */

import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import getProp from 'lodash/get';

import { Link } from 'box-react-ui/lib/components/link';
import { ReadableTime } from 'box-react-ui/lib/components/time';
import Tooltip from 'box-react-ui/lib/components/tooltip';

import InlineDelete from './InlineDelete';
import InlineEdit from './InlineEdit';
import CommentInlineError from './CommentInlineError';
import CommentText from './CommentText';
import ApprovalCommentForm from '../approval-comment-form';
import formatTaggedMessage from '../utils/formatTaggedMessage';
import Avatar from '../Avatar';
import messages from '../../../messages';

var ONE_HOUR_MS = 3600000; // 60 * 60 * 1000

var Comment = function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Comment);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Comment, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                created_by = _props.created_by,
                created_at = _props.created_at,
                permissions = _props.permissions,
                id = _props.id,
                _props$inlineDeleteMe = _props.inlineDeleteMessage,
                inlineDeleteMessage = _props$inlineDeleteMe === undefined ? messages.commentDeletePrompt : _props$inlineDeleteMe,
                isPending = _props.isPending,
                error = _props.error,
                onDelete = _props.onDelete,
                onEdit = _props.onEdit,
                _props$tagged_message = _props.tagged_message,
                tagged_message = _props$tagged_message === undefined ? '' : _props$tagged_message,
                translatedTaggedMessage = _props.translatedTaggedMessage,
                translations = _props.translations,
                handlers = _props.handlers,
                currentUser = _props.currentUser,
                isDisabled = _props.isDisabled,
                approverSelectorContacts = _props.approverSelectorContacts,
                mentionSelectorContacts = _props.mentionSelectorContacts,
                getAvatarUrl = _props.getAvatarUrl,
                getUserProfileUrl = _props.getUserProfileUrl;
            var toEdit = this.toEdit;
            var _state = this.state,
                isEditing = _state.isEditing,
                isFocused = _state.isFocused,
                isInputOpen = _state.isInputOpen;

            var createdAtTimestamp = new Date(created_at).getTime();
            var canDelete = getProp(permissions, 'can_delete', false);
            var canEdit = getProp(permissions, 'can_edit', false);

            return React.createElement(
                'div',
                { className: 'bcs-comment-container' },
                React.createElement(
                    'div',
                    {
                        className: classNames('bcs-comment', {
                            'bcs-is-pending': isPending || error,
                            'bcs-is-focused': isFocused
                        }),
                        onBlur: this.handleCommentBlur,
                        onFocus: this.handleCommentFocus
                    },
                    React.createElement(Avatar, { className: 'bcs-comment-avatar', getAvatarUrl: getAvatarUrl, user: created_by }),
                    React.createElement(
                        'div',
                        { className: 'bcs-comment-content' },
                        React.createElement(
                            'div',
                            { className: 'bcs-comment-headline' },
                            getUserProfileUrl ? React.createElement(
                                Link,
                                { className: 'bcs-comment-user-name', href: getUserProfileUrl(created_by.id) },
                                created_by.name
                            ) : React.createElement(
                                'div',
                                { className: 'bcs-comment-user-name' },
                                created_by.name
                            ),
                            React.createElement(
                                Tooltip,
                                {
                                    text: React.createElement(FormattedMessage, _extends({}, messages.commentPostedFullDateTime, {
                                        values: { time: createdAtTimestamp }
                                    }))
                                },
                                React.createElement(
                                    'small',
                                    { className: 'bcs-comment-created-at' },
                                    React.createElement(ReadableTime, { timestamp: createdAtTimestamp, relativeThreshold: ONE_HOUR_MS })
                                )
                            ),
                            onEdit && canEdit ? React.createElement(InlineEdit, { id: id, toEdit: toEdit }) : null,
                            onDelete && canDelete ? React.createElement(InlineDelete, {
                                id: id,
                                permissions: permissions,
                                message: React.createElement(FormattedMessage, inlineDeleteMessage),
                                onDelete: onDelete
                            }) : null
                        ),
                        isEditing ? React.createElement(ApprovalCommentForm, {
                            onSubmit: function onSubmit() {},
                            isDisabled: isDisabled,
                            approverSelectorContacts: approverSelectorContacts,
                            mentionSelectorContacts: mentionSelectorContacts,
                            className: classNames('bcs-activity-feed-comment-input', {
                                'bcs-is-disabled': isDisabled
                            })
                            // createComment={this.createCommentHandler}
                            , updateTask: this.updateTaskHandler,
                            getApproverContactsWithQuery: handlers && handlers.contacts ? handlers.contacts.getApproverWithQuery : null,
                            getMentionContactsWithQuery: handlers && handlers.contacts ? handlers.contacts.getMentionWithQuery : null,
                            isOpen: isInputOpen,
                            user: currentUser,
                            onCancel: this.approvalCommentFormCancelHandler,
                            onFocus: this.approvalCommentFormFocusHandler,
                            isEditing: isEditing,
                            entityId: id,
                            tagged_message: formatTaggedMessage(tagged_message, id, true, getUserProfileUrl)
                        }) : null,
                        !isEditing ? React.createElement(CommentText, _extends({
                            id: id,
                            tagged_message: tagged_message,
                            translatedTaggedMessage: translatedTaggedMessage
                        }, translations, {
                            translationFailed: error ? true : null,
                            getUserProfileUrl: getUserProfileUrl
                        })) : null
                    )
                ),
                error ? React.createElement(CommentInlineError, error) : null
            );
        }
    }]);

    return Comment;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {
        isEditing: false,
        isFocused: false,
        isInputOpen: false
    };

    this.onKeyDown = function (event) {
        var nativeEvent = event.nativeEvent;

        nativeEvent.stopImmediatePropagation();
    };

    this.approvalCommentFormFocusHandler = function () {
        return _this2.setState({ isInputOpen: true });
    };

    this.approvalCommentFormCancelHandler = function () {
        return _this2.setState({ isInputOpen: false, isEditing: false });
    };

    this.approvalCommentFormSubmitHandler = function () {
        return _this2.setState({ isInputOpen: false, isEditing: false });
    };

    this.updateTaskHandler = function (args) {
        var onEdit = _this2.props.onEdit;

        onEdit(args);
        _this2.approvalCommentFormSubmitHandler();
    };

    this.toEdit = function () {
        return _this2.setState({ isEditing: true, isInputOpen: true });
    };

    this.handleCommentFocus = function () {
        _this2.setState({ isFocused: true });
    };

    this.handleCommentBlur = function () {
        _this2.setState({ isFocused: false });
    };
};

export default Comment;