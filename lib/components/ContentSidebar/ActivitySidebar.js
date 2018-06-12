/**
 * 
 * @file Activity feed sidebar component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ActivityFeed from './ActivityFeed/activity-feed/ActivityFeed';
import SidebarContent from './SidebarContent';
import messages from '../messages';

var ActivitySidebar = function ActivitySidebar(_ref) {
    var file = _ref.file,
        comments = _ref.comments,
        tasks = _ref.tasks,
        versions = _ref.versions,
        currentUser = _ref.currentUser,
        _ref$isDisabled = _ref.isDisabled,
        isDisabled = _ref$isDisabled === undefined ? false : _ref$isDisabled,
        approverSelectorContacts = _ref.approverSelectorContacts,
        mentionSelectorContacts = _ref.mentionSelectorContacts,
        onCommentCreate = _ref.onCommentCreate,
        onCommentDelete = _ref.onCommentDelete,
        onTaskCreate = _ref.onTaskCreate,
        onTaskDelete = _ref.onTaskDelete,
        onTaskUpdate = _ref.onTaskUpdate,
        onTaskAssignmentUpdate = _ref.onTaskAssignmentUpdate,
        getApproverWithQuery = _ref.getApproverWithQuery,
        getMentionWithQuery = _ref.getMentionWithQuery,
        onVersionHistoryClick = _ref.onVersionHistoryClick,
        getAvatarUrl = _ref.getAvatarUrl,
        getUserProfileUrl = _ref.getUserProfileUrl;
    return React.createElement(
        SidebarContent,
        { title: React.createElement(FormattedMessage, messages.sidebarActivityTitle) },
        React.createElement(ActivityFeed, {
            file: file,
            comments: comments,
            tasks: tasks,
            versions: versions,
            approverSelectorContacts: approverSelectorContacts,
            mentionSelectorContacts: mentionSelectorContacts,
            currentUser: currentUser,
            isDisabled: isDisabled,
            handlers: {
                comments: {
                    create: onCommentCreate,
                    delete: onCommentDelete
                },
                tasks: {
                    create: onTaskCreate,
                    delete: onTaskDelete,
                    edit: onTaskUpdate,
                    onTaskAssignmentUpdate: onTaskAssignmentUpdate
                },
                contacts: {
                    approver: getApproverWithQuery,
                    mention: getMentionWithQuery
                },
                versions: {
                    info: onVersionHistoryClick
                }
            },
            getAvatarUrl: getAvatarUrl,
            getUserProfileUrl: getUserProfileUrl
        })
    );
};

export default ActivitySidebar;