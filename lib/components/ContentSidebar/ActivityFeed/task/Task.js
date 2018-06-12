var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Tasks component
 */

import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Comment from '../comment';
import CompletedAssignment from './CompletedAssignment';
import messages from '../../../messages';
import PendingAssignment from './PendingAssignment';
import RejectedAssignment from './RejectedAssignment';

var TASK_APPROVED = 'approved';
var TASK_REJECTED = 'rejected';
var TASK_COMPLETED = 'completed';
var TASK_INCOMPLETE = 'incomplete';

// eslint-disable-next-line
var Task = function (_React$Component) {
    _inherits(Task, _React$Component);

    function Task() {
        _classCallCheck(this, Task);

        return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
    }

    _createClass(Task, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                task_assignment_collection = _props.task_assignment_collection,
                created_at = _props.created_at,
                created_by = _props.created_by,
                currentUser = _props.currentUser,
                due_at = _props.due_at,
                error = _props.error,
                handlers = _props.handlers,
                id = _props.id,
                isPending = _props.isPending,
                onDelete = _props.onDelete,
                onEdit = _props.onEdit,
                onTaskAssignmentUpdate = _props.onTaskAssignmentUpdate,
                permissions = _props.permissions,
                message = _props.message,
                translatedTaggedMessage = _props.translatedTaggedMessage,
                translations = _props.translations,
                approverSelectorContacts = _props.approverSelectorContacts,
                mentionSelectorContacts = _props.mentionSelectorContacts,
                getAvatarUrl = _props.getAvatarUrl,
                getUserProfileUrl = _props.getUserProfileUrl;

            return React.createElement(
                'div',
                { className: classNames('bcs-task', { 'bcs-is-pending': isPending || error }) },
                React.createElement(Comment, {
                    created_at: created_at,
                    created_by: created_by,
                    currentUser: currentUser,
                    error: error,
                    handlers: handlers,
                    id: id,
                    inlineDeleteMessage: messages.taskDeletePrompt,
                    isPending: isPending,
                    onDelete: onDelete,
                    onEdit: onEdit,
                    permissions: permissions,
                    tagged_message: message,
                    translatedTaggedMessage: translatedTaggedMessage,
                    translations: translations,
                    approverSelectorContacts: approverSelectorContacts,
                    mentionSelectorContacts: mentionSelectorContacts,
                    getAvatarUrl: getAvatarUrl,
                    getUserProfileUrl: getUserProfileUrl
                }),
                React.createElement(
                    'div',
                    { className: 'bcs-task-approvers-container' },
                    React.createElement(
                        'div',
                        { className: 'bcs-task-approvers-header' },
                        React.createElement(
                            'strong',
                            null,
                            React.createElement(FormattedMessage, messages.tasksForApproval)
                        ),
                        due_at ? React.createElement(
                            'span',
                            { className: 'bcs-task-due-date' },
                            React.createElement(FormattedMessage, messages.taskDueDate),
                            React.createElement(FormattedDate, { value: due_at, day: 'numeric', month: 'long', year: 'numeric' })
                        ) : null
                    ),
                    React.createElement(
                        'div',
                        { className: 'bcs-task-assignees' },
                        task_assignment_collection.map(function (_ref) {
                            var taskAssignmentId = _ref.id,
                                assigneeUser = _ref.user,
                                status = _ref.status;

                            switch (status) {
                                case TASK_INCOMPLETE:
                                    return React.createElement(PendingAssignment, _extends({}, assigneeUser, {
                                        key: assigneeUser.id,
                                        onTaskApproval: function onTaskApproval() {
                                            return onTaskAssignmentUpdate(id, taskAssignmentId, TASK_APPROVED);
                                        },
                                        onTaskReject: function onTaskReject() {
                                            return onTaskAssignmentUpdate(id, taskAssignmentId, TASK_REJECTED);
                                        },
                                        shouldShowActions: onTaskAssignmentUpdate && assigneeUser.id === currentUser.id
                                    }));
                                case TASK_COMPLETED:
                                case TASK_APPROVED:
                                    return React.createElement(CompletedAssignment, _extends({}, assigneeUser, { key: assigneeUser.id }));
                                case TASK_REJECTED:
                                    return React.createElement(RejectedAssignment, _extends({}, assigneeUser, { key: assigneeUser.id }));
                                default:
                                    return null;
                            }
                        })
                    )
                )
            );
        }
    }]);

    return Task;
}(React.Component);

export default Task;