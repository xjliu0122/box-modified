var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Active state component for Activity Feed
 */
import * as React from 'react';
import getProp from 'lodash/get';
import Comment from '../comment';
import Task from '../task';
import Version, { CollapsedVersion, VersionError } from '../version';
import Keywords from '../keywords';


var ActiveState = function ActiveState(_ref) {
    var currentUser = _ref.currentUser,
        items = _ref.items,
        onCommentDelete = _ref.onCommentDelete,
        onTaskDelete = _ref.onTaskDelete,
        onTaskEdit = _ref.onTaskEdit,
        onTaskAssignmentUpdate = _ref.onTaskAssignmentUpdate,
        onVersionInfo = _ref.onVersionInfo,
        translations = _ref.translations,
        handlers = _ref.handlers,
        approverSelectorContacts = _ref.approverSelectorContacts,
        mentionSelectorContacts = _ref.mentionSelectorContacts,
        getAvatarUrl = _ref.getAvatarUrl,
        getUserProfileUrl = _ref.getUserProfileUrl;
    return React.createElement(
        'ul',
        { className: 'bcs-activity-feed-active-state' },
        items.map(function (item) {
            var type = item.type,
                id = item.id,
                errorCode = item.errorCode,
                versions = item.versions,
                permissions = item.permissions;


            switch (type) {
                case 'comment':
                    return React.createElement(
                        'li',
                        { className: 'bcs-activity-feed-comment', key: type + id },
                        React.createElement(Comment, _extends({}, item, {
                            currentUser: currentUser,
                            onDelete: onCommentDelete,
                            translations: translations,
                            handlers: handlers,
                            approverSelectorContacts: approverSelectorContacts,
                            mentionSelectorContacts: mentionSelectorContacts,
                            getAvatarUrl: getAvatarUrl,
                            getUserProfileUrl: getUserProfileUrl,
                            permissions: {
                                can_delete: getProp(permissions, 'can_delete', false),
                                can_edit: getProp(permissions, 'can_edit', false)
                            }
                        }))
                    );
                case 'task':
                    return React.createElement(
                        'li',
                        { className: 'bcs-activity-feed-task', key: type + id },
                        React.createElement(Task, _extends({}, item, {
                            currentUser: currentUser,
                            onDelete: onTaskDelete,
                            onEdit: onTaskEdit,
                            onTaskAssignmentUpdate: onTaskAssignmentUpdate,
                            translations: translations,
                            handlers: handlers,
                            approverSelectorContacts: approverSelectorContacts,
                            mentionSelectorContacts: mentionSelectorContacts,
                            getAvatarUrl: getAvatarUrl,
                            getUserProfileUrl: getUserProfileUrl
                            // permissions are not part of task API so hard code to true
                            , permissions: {
                                can_delete: true,
                                can_edit: true
                            }
                        }))
                    );
                case 'file_version':
                    return React.createElement(
                        'li',
                        { className: 'bcs-version-item', key: type + id },
                        versions ? React.createElement(CollapsedVersion, _extends({}, item, { onInfo: onVersionInfo })) : React.createElement(Version, _extends({}, item, { onInfo: onVersionInfo }))
                    );
                case 'file_version_error':
                    // we currently only display this if errorCode is tooManyVersions
                    if (errorCode !== 'tooManyVersions') {
                        return null;
                    }
                    return React.createElement(
                        'li',
                        { className: 'bcs-version-item', key: type + errorCode },
                        React.createElement(VersionError, item)
                    );
                case 'keywords':
                    return React.createElement(
                        'li',
                        { className: 'bcs-keywords-item', key: type + id },
                        React.createElement(Keywords, item)
                    );
                default:
                    return null;
            }
        })
    );
};

export default ActiveState;