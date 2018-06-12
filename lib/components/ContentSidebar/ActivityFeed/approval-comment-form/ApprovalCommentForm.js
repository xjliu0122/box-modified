var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Component for Approval comment form
 */

import * as React from 'react';
import classNames from 'classnames';
import { EditorState } from 'draft-js';
import { FormattedMessage, injectIntl } from 'react-intl';

import Form from 'box-react-ui/lib/components/form-elements/form/Form';
import DraftJSMentionSelector, { DraftMentionDecorator } from 'box-react-ui/lib/components/form-elements/draft-js-mention-selector';
import commonMessages from 'box-react-ui/lib/common/messages';

import AddApproval from './AddApproval';
import CommentInputControls from './CommentInputControls';
import Avatar from '../Avatar';
import messages from '../../../messages';

var ApprovalCommentForm = function (_React$Component) {
    _inherits(ApprovalCommentForm, _React$Component);

    function ApprovalCommentForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ApprovalCommentForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApprovalCommentForm.__proto__ || Object.getPrototypeOf(ApprovalCommentForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            approvalDate: null,
            approvers: [],
            approverSelectorError: '',
            commentEditorState: EditorState.createEmpty(DraftMentionDecorator),
            isAddApprovalVisible: false
        }, _this.onFormChangeHandler = function (formData) {
            return _this.setState({ isAddApprovalVisible: formData.addApproval === 'on' });
        }, _this.onFormValidSubmitHandler = function (formData) {
            var _this$props = _this.props,
                createComment = _this$props.createComment,
                createTask = _this$props.createTask,
                intl = _this$props.intl,
                updateTask = _this$props.updateTask,
                onSubmit = _this$props.onSubmit,
                entityId = _this$props.entityId;

            var _this$getFormattedCom = _this.getFormattedCommentText(),
                text = _this$getFormattedCom.text,
                hasMention = _this$getFormattedCom.hasMention;

            if (!text) {
                return;
            }

            if (formData.addApproval === 'on') {
                var _this$state = _this.state,
                    _approvers = _this$state.approvers,
                    _approvalDate = _this$state.approvalDate;

                if (_approvers.length === 0) {
                    _this.setState({
                        approverSelectorError: intl.formatMessage(commonMessages.requiredFieldError)
                    });
                    return;
                }
                createTask({
                    text: text,
                    assignees: _approvers.map(function (_ref2) {
                        var value = _ref2.value;
                        return value;
                    }),
                    dueAt: _approvalDate
                });
            } else if (entityId) {
                updateTask({ text: text, id: entityId });
            } else {
                createComment({ text: text, hasMention: hasMention });
            }

            if (onSubmit) {
                onSubmit();
            }

            _this.setState({
                commentEditorState: EditorState.createEmpty(DraftMentionDecorator),
                isAddApprovalVisible: false,
                approvalDate: null,
                approvers: []
            });
        }, _this.onMentionSelectorChangeHandler = function (nextEditorState) {
            return _this.setState({ commentEditorState: nextEditorState });
        }, _this.onApprovalDateChangeHandler = function (date) {
            _this.setState({ approvalDate: date });
        }, _this.getFormattedCommentText = function () {
            var commentEditorState = _this.state.commentEditorState;


            var contentState = commentEditorState.getCurrentContent();
            var blockMap = contentState.getBlockMap();

            var resultStringArr = [];

            // The API needs to explicitly know if a message contains a mention.
            var hasMention = false;

            // For all ContentBlocks in the ContentState:
            blockMap.forEach(function (block) {
                var text = block.getText();
                var blockMapStringArr = [];

                // Break down the ContentBlock into ranges
                block.findEntityRanges(function () {
                    return true;
                }, function (start, end) {
                    var entityKey = block.getEntityAt(start);
                    // If the range is an Entity, format its text eg "@[1:Username]"
                    // Otherwise append its text to the block result as-is
                    if (entityKey) {
                        var entity = contentState.getEntity(entityKey);
                        var stringToAdd = '@[' + entity.getData().id + ':' + text.substring(start + 1, end) + ']';
                        blockMapStringArr.push(stringToAdd);
                        hasMention = true;
                    } else {
                        blockMapStringArr.push(text.substring(start, end));
                    }
                });
                resultStringArr.push(blockMapStringArr.join(''));
            });

            // Concatentate the array of block strings with newlines
            // (Each block represents a paragraph)
            return { text: resultStringArr.join('\n'), hasMention: hasMention };
        }, _this.handleApproverSelectorInput = function (value) {
            _this.props.getApproverContactsWithQuery(value);
            _this.setState({ approverSelectorError: '' });
        }, _this.handleApproverSelectorSelect = function (pills) {
            _this.setState({ approvers: _this.state.approvers.concat(pills) });
        }, _this.handleApproverSelectorRemove = function (option, index) {
            var approvers = _this.state.approvers.slice();
            approvers.splice(index, 1);
            _this.setState({ approvers: approvers });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ApprovalCommentForm, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var isOpen = nextProps.isOpen;


            if (isOpen !== this.props.isOpen && !isOpen) {
                this.setState({
                    commentEditorState: EditorState.createEmpty(DraftMentionDecorator),
                    isAddApprovalVisible: false
                });
            }
        }

        /**
         * Formats the comment editor's text such that it will be accepted by the server.
         *
         * @returns {Object}
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                approverSelectorContacts = _props.approverSelectorContacts,
                className = _props.className,
                createTask = _props.createTask,
                getMentionContactsWithQuery = _props.getMentionContactsWithQuery,
                formatMessage = _props.intl.formatMessage,
                isDisabled = _props.isDisabled,
                isOpen = _props.isOpen,
                _props$mentionSelecto = _props.mentionSelectorContacts,
                mentionSelectorContacts = _props$mentionSelecto === undefined ? [] : _props$mentionSelecto,
                onCancel = _props.onCancel,
                onFocus = _props.onFocus,
                user = _props.user,
                isEditing = _props.isEditing,
                tagged_message = _props.tagged_message,
                getAvatarUrl = _props.getAvatarUrl;
            var _state = this.state,
                approvalDate = _state.approvalDate,
                approvers = _state.approvers,
                approverSelectorError = _state.approverSelectorError,
                commentEditorState = _state.commentEditorState,
                isAddApprovalVisible = _state.isAddApprovalVisible;

            var inputContainerClassNames = classNames('bcs-comment-input-container', className, {
                'bcs-comment-input-is-open': isOpen
            });

            return React.createElement(
                'div',
                { className: inputContainerClassNames },
                !isEditing && React.createElement(
                    'div',
                    { className: 'bcs-avatar-container' },
                    React.createElement(Avatar, { getAvatarUrl: getAvatarUrl, user: user })
                ),
                React.createElement(
                    'div',
                    { className: 'bcs-comment-input-form-container' },
                    React.createElement(
                        Form,
                        { onChange: this.onFormChangeHandler, onValidSubmit: this.onFormValidSubmitHandler },
                        React.createElement(DraftJSMentionSelector, {
                            className: 'bcs-comment-input',
                            contacts: isOpen ? mentionSelectorContacts : [],
                            editorState: commentEditorState,
                            hideLabel: true,
                            isDisabled: isDisabled,
                            isRequired: isOpen,
                            name: 'commentText',
                            label: 'Comment',
                            onChange: this.onMentionSelectorChangeHandler,
                            onFocus: onFocus,
                            onMention: getMentionContactsWithQuery,
                            placeholder: tagged_message || formatMessage(messages.commentWrite),
                            validateOnBlur: false
                        }),
                        React.createElement(
                            'aside',
                            {
                                className: classNames('bcs-at-mention-tip', {
                                    'accessibility-hidden': isOpen
                                })
                            },
                            React.createElement(FormattedMessage, messages.atMentionTip)
                        ),
                        createTask ? React.createElement(AddApproval, {
                            approvalDate: approvalDate,
                            approvers: approvers,
                            approverSelectorContacts: approverSelectorContacts,
                            approverSelectorError: approverSelectorError,
                            formatMessage: formatMessage,
                            isAddApprovalVisible: isAddApprovalVisible,
                            onApprovalDateChange: this.onApprovalDateChangeHandler,
                            onApproverSelectorInput: this.handleApproverSelectorInput,
                            onApproverSelectorRemove: this.handleApproverSelectorRemove,
                            onApproverSelectorSelect: this.handleApproverSelectorSelect
                        }) : null,
                        React.createElement(CommentInputControls, { onCancel: onCancel })
                    )
                )
            );
        }
    }]);

    return ApprovalCommentForm;
}(React.Component);

// For testing only


ApprovalCommentForm.defaultProps = {
    isOpen: false
};
export { ApprovalCommentForm as ApprovalCommentFormUnwrapped };

export default injectIntl(ApprovalCommentForm);