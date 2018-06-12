var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Component for Activity feed
 */

import * as React from 'react';
import getProp from 'lodash/get';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';

import ActiveState from './ActiveState';
import ApprovalCommentForm from '../approval-comment-form';
import EmptyState from './EmptyState';
import { collapseFeedState, shouldShowEmptyState } from './activityFeedUtils';

var ActivityFeed = function (_React$Component) {
    _inherits(ActivityFeed, _React$Component);

    function ActivityFeed() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ActivityFeed);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActivityFeed.__proto__ || Object.getPrototypeOf(ActivityFeed)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isInputOpen: false,
            feedItems: []
        }, _this.onKeyDown = function (event) {
            var nativeEvent = event.nativeEvent;

            nativeEvent.stopImmediatePropagation();
        }, _this.approvalCommentFormFocusHandler = function () {
            return _this.setState({ isInputOpen: true });
        }, _this.approvalCommentFormCancelHandler = function () {
            return _this.setState({ isInputOpen: false });
        }, _this.approvalCommentFormSubmitHandler = function () {
            return _this.setState({ isInputOpen: false });
        }, _this.addPendingItem = function (itemBase) {
            var currentUser = _this.props.currentUser;

            var date = new Date().toISOString();
            var feedItem = _extends({
                created_at: date,
                created_by: currentUser,
                modified_at: date,
                isPending: true
            }, itemBase);

            var feedItems = _this.state.feedItems;

            _this.setState({ feedItems: [feedItem].concat(_toConsumableArray(feedItems)) });
        }, _this.updateFeedItem = function (feedItem, id) {
            _this.setState({
                feedItems: _this.state.feedItems.map(function (item) {
                    if (item.id === id) {
                        // $FlowFixMe
                        return _extends({}, item, feedItem);
                    }
                    return item;
                })
            });
        }, _this.createCommentSuccessCallback = function (commentData, id) {
            var _commentData$message = commentData.message,
                message = _commentData$message === undefined ? '' : _commentData$message,
                _commentData$tagged_m = commentData.tagged_message,
                tagged_message = _commentData$tagged_m === undefined ? '' : _commentData$tagged_m;
            // Comment component uses tagged_message only

            commentData.tagged_message = tagged_message || message;

            _this.updateFeedItem(_extends({}, commentData, {
                isPending: false
            }), id);
        }, _this.createCommentErrorCallback = function (error, id) {
            _this.feedItemErrorCallback(error, id);
        }, _this.createComment = function (_ref2) {
            var text = _ref2.text,
                hasMention = _ref2.hasMention;

            var uuid = uniqueId('comment_');
            var comment = {
                id: uuid,
                tagged_message: text,
                type: 'comment'
            };

            _this.addPendingItem(comment);

            var createComment = getProp(_this.props, 'handlers.comments.create', noop);

            createComment(text, hasMention, function (commentData) {
                _this.createCommentSuccessCallback(commentData, uuid);
            }, function (error) {
                _this.createCommentErrorCallback(error, uuid);
            });

            _this.approvalCommentFormSubmitHandler();
        }, _this.deleteComment = function (_ref3) {
            var id = _ref3.id,
                permissions = _ref3.permissions;

            // remove comment from list of comments
            // removeItemByTypeAndId('comment', args.id);
            // delete the comment via V2 API
            // call user passed in handlers.comments.delete, if it exists
            var deleteComment = getProp(_this.props, 'handlers.comments.delete', noop);
            _this.updateFeedItemPendingStatus(id, true);
            deleteComment(id, permissions, _this.deleteFeedItem, _this.feedItemErrorCallback);
        }, _this.createTask = function (_ref4) {
            var text = _ref4.text,
                assignees = _ref4.assignees,
                dueAt = _ref4.dueAt;

            var uuid = uniqueId('task_');
            var dueAtString = void 0;
            if (dueAt) {
                var dueAtDate = new Date(dueAt);
                dueAtString = dueAtDate.toISOString();
            }

            var task = {
                due_at: dueAtString,
                id: uuid,
                is_completed: false,
                message: text,
                task_assignment_collection: [],
                type: 'task'
            };

            _this.addPendingItem(task);

            // create a placeholder pending task
            // create actual task and send to Box V2 api
            // call user passed in handlers.tasks.create, if it exists
            var createTask = getProp(_this.props, 'handlers.tasks.create', noop);
            createTask(text, assignees, dueAtString, function (taskData) {
                _this.createTaskSuccessCallback(taskData, uuid);
            }, function (error) {
                _this.createTaskErrorCallback(error, uuid);
            });

            _this.approvalCommentFormSubmitHandler();
        }, _this.updateTaskSuccessCallback = function (task) {
            var id = task.id;


            _this.updateFeedItem(_extends({}, task, {
                isPending: false
            }), id);
        }, _this.feedItemErrorCallback = function (e, id) {
            _this.updateFeedItemPendingStatus(id, false);
        }, _this.updateFeedItemPendingStatus = function (id, isPending) {
            _this.setState({
                feedItems: _this.state.feedItems.map(function (feedItem) {
                    if (feedItem.id === id) {
                        // $FlowFixMe
                        return _extends({}, feedItem, {
                            isPending: isPending
                        });
                    }
                    return feedItem;
                })
            });
        }, _this.deleteFeedItem = function (id) {
            _this.setState({
                feedItems: _this.state.feedItems.filter(function (feedItem) {
                    return feedItem.id !== id;
                })
            });
        }, _this.updateTask = function (_ref5) {
            var text = _ref5.text,
                id = _ref5.id;

            // get previous task assignment state
            // update the task via v2 api
            // update task state OR
            // if it fails, revert to previous task state
            // call user passed in handlers.tasks.edit, if it exists
            var updateTask = getProp(_this.props, 'handlers.tasks.edit', noop);
            _this.updateFeedItemPendingStatus(id, true);
            updateTask(id, text, _this.updateTaskSuccessCallback, _this.feedItemErrorCallback);
        }, _this.deleteTask = function (_ref6) {
            var id = _ref6.id;

            // remove task from task list
            // removeItemByTypeAndId('task', args.id);
            // delete the task via v2 api
            // call user passed in handlers.tasks.delete, if it exists
            var deleteTask = getProp(_this.props, 'handlers.tasks.delete', noop);
            _this.updateFeedItemPendingStatus(id, true);
            deleteTask(id, _this.deleteFeedItem, _this.feedItemErrorCallback);
        }, _this.updateTaskAssignment = function (taskId, taskAssignmentId, status) {
            // Determine fixedStatus from status. 'approved' === 'complete', 'rejected' === 'done'
            // get previous task state
            // add task to state
            // update assignment via V2 API
            // failure? revert to previous task state
            // call user passed in handlers.tasks.onTaskAssignmentUpdate, if it exists
            var updateTaskAssignment = getProp(_this.props, 'handlers.tasks.onTaskAssignmentUpdate', noop);
            updateTaskAssignment(taskId, taskAssignmentId, status);
        }, _this.openVersionHistoryPopup = function (data) {
            // get version number from data
            // open the pop for version history
            // call user passed in handlers.versions.info, if it exists
            var versionInfoHandler = getProp(_this.props, 'handlers.versions.info', noop);
            versionInfoHandler(data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Add a placeholder pending feed item.
     *
     * @param {Object} itemBase - Base properties for item to be added to the feed as pending.
     * @return {void}
     */


    /**
     * Replace a feed item with new feed item data.
     *
     * @param {Comment | Task} feedItem - API returned feed item data.
     * @param {string} id - ID of the feed item to replace.
     * @return {void}
     */


    /**
     * Callback for successful creation of a Comment.
     *
     * @param {Comment} commentData - API returned Comment
     * @param {string} id - ID of the feed item to update with the new comment data
     * @return {void}
     */


    /**
     * Callback for error while creating a Comment.
     *
     * @param {Error} error - Error thrown while creating the Comment
     * @param {string} id - ID of the feed item to update as no longer pending
     * @return {void}
     */


    /**
     * Create a comment, and make a pending item to be replaced once the API is successful.
     *
     * @param {any} args - Data returned by the Comment component on comment creation.
     * @return {void}
     */


    /**
     * Deletes a comment
     *
     * @param {string} id - Comment id
     * @param {BoxItemPermission} permissions - Permissions for the comment
     * @return {void}
     */


    _createClass(ActivityFeed, [{
        key: 'createTaskSuccessCallback',


        /**
         * Callback for successful creation of a Task.
         *
         * @param {Task} task - API returned task
         * @param {string} id - ID of the feed item to update with the new task data
         * @return {void}
         */
        value: function createTaskSuccessCallback(task, id) {
            this.updateFeedItem(_extends({}, task, {
                isPending: false
            }), id);
        }

        /**
         * Callback for error while creating a Task.
         *
         * @param {Error} error - Error thrown while creating the Task
         * @param {string} id - ID of the feed item to update as no longer pending
         * @return {void}
         */

    }, {
        key: 'createTaskErrorCallback',
        value: function createTaskErrorCallback(error, id) {
            this.feedItemErrorCallback(error, id);
        }

        /**
         * Creates a task
         *
         * @param {string} text - Task text
         * @param {Array} assignees - List of assignees
         * @param {number} dueAt - Task's due date
         * @return {void}
         */


        /**
         * Called on successful update of a task
         *
         * @param {Object} task the updated task
         */


        /**
         * Called on failed update/delete of a feed item
         *
         * @param {Object} e the error
         * @param {string} id the feed item's id
         */


        /**
         * Updates a feed item's pending status
         *
         * @param {Object} item the feed item to update
         * @param {boolean} isPending true if the feed item is to be updated to pending=true
         */


        /**
         * Deletes a feed item from the state
         *
         * @param {Object} item the item to be deleted
         */


        /**
         * Updates a task in the state
         *
         * @param {Object} args a subset of the task
         */


        /**
         * Updates a task in the state
         *
         * @param {Object} args a subset of the task
         */

    }, {
        key: 'shouldSortFeedItems',


        /**
         * Determine whether or not a sort should occur, based on new comments, tasks, versions.
         *
         * @param {Comments} - [comments] - Object containing comments for the file.
         * @param {Tasks} - [tasks] - Object containing tasks for the file.
         * @param {FileVersions} - [versions] Object containing versions of the file.
         * @return {boolean} True if the feed should be sorted with new items.
         */
        value: function shouldSortFeedItems(comments, tasks, versions) {
            return !!(comments && tasks && versions);
        }

        /**
         *  If the file has changed, clear out the feed state.
         *
         * @param {BoxItem} [file] The box file that comments, tasks, and versions belong to.
         * @return {boolean} - True if the feedItems were emptied.
         */

    }, {
        key: 'clearFeedItems',
        value: function clearFeedItems(file) {
            var oldFile = this.props.file;

            if (file && file.id !== oldFile.id) {
                this.setState({ feedItems: [] });
                return true;
            }

            return false;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                comments = _props.comments,
                tasks = _props.tasks,
                versions = _props.versions,
                file = _props.file;

            this.updateFeedItems(comments, tasks, versions, file);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var comments = nextProps.comments,
                tasks = nextProps.tasks,
                versions = nextProps.versions,
                file = nextProps.file;

            this.updateFeedItems(comments, tasks, versions, file);
        }

        /**
         * Checks to see if feed items should be added to the feed, and invokes the add and sort.
         *
         * @param {Comments} comments - API returned comments for this file
         * @param {Tasks} tasks - API returned tasks for this file
         * @param {FileVersions} versions - API returned file versions for this file
         * @param {BoxItem} file - The file that owns all of the activity feed items
         * @return {void}
         */

    }, {
        key: 'updateFeedItems',
        value: function updateFeedItems(comments, tasks, versions, file) {
            var isFeedEmpty = this.clearFeedItems(file);
            var shouldSort = this.shouldSortFeedItems(comments, tasks, versions);
            var feedItems = this.state.feedItems;


            if (shouldSort && (isFeedEmpty || !feedItems.length)) {
                // $FlowFixMe
                this.sortFeedItems(comments, tasks, versions);
            }
        }

        /**
         * Sort valid feed items, descending by created_at time
         *
         * @param args Array<?Comments | ?Tasks | ?FileVersions> - Arguments list of each item container
         * type that is allowed in the feed.
         */

    }, {
        key: 'sortFeedItems',
        value: function sortFeedItems() {
            var feedItems = [];

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            args.forEach(function (itemContainer) {
                // $FlowFixMe
                feedItems.push.apply(feedItems, _toConsumableArray(itemContainer.entries));
            });

            feedItems.sort(function (a, b) {
                return Date.parse(b.created_at) - Date.parse(a.created_at);
            });

            this.setState({ feedItems: feedItems });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                handlers = _props2.handlers,
                isLoading = _props2.isLoading,
                translations = _props2.translations,
                approverSelectorContacts = _props2.approverSelectorContacts,
                mentionSelectorContacts = _props2.mentionSelectorContacts,
                currentUser = _props2.currentUser,
                isDisabled = _props2.isDisabled,
                getAvatarUrl = _props2.getAvatarUrl,
                getUserProfileUrl = _props2.getUserProfileUrl,
                file = _props2.file;
            var _state = this.state,
                isInputOpen = _state.isInputOpen,
                feedItems = _state.feedItems;

            var hasCommentPermission = getProp(file, 'permissions.can_comment', false);
            var showApprovalCommentForm = !!(currentUser && hasCommentPermission && getProp(handlers, 'comments.create', false));
            var getApproverWithQuery = getProp(handlers, 'contacts.approver', noop);
            var getMentionWithQuery = getProp(handlers, 'contacts.mention', noop);

            return (
                // eslint-disable-next-line
                React.createElement(
                    'div',
                    { className: 'bcs-activity-feed', onKeyDown: this.onKeyDown },
                    React.createElement(
                        'div',
                        {
                            ref: function ref(_ref7) {
                                _this2.feedContainer = _ref7;
                            },
                            className: 'bcs-activity-feed-items-container'
                        },
                        shouldShowEmptyState(feedItems) ? React.createElement(EmptyState, { isLoading: isLoading, showCommentMessage: showApprovalCommentForm }) : React.createElement(ActiveState, {
                            handlers: handlers,
                            items: collapseFeedState(feedItems),
                            isDisabled: isDisabled,
                            currentUser: currentUser,
                            onTaskAssignmentUpdate: this.updateTaskAssignment,
                            onCommentDelete: hasCommentPermission ? this.deleteComment : noop
                            // We don't know task edit/delete specific permissions,
                            // but you must at least be able to comment to do these operations.
                            , onTaskDelete: hasCommentPermission ? this.deleteTask : noop,
                            onTaskEdit: hasCommentPermission ? this.updateTask : noop,
                            onVersionInfo: this.openVersionHistoryPopup,
                            translations: translations,
                            getAvatarUrl: getAvatarUrl,
                            getUserProfileUrl: getUserProfileUrl
                        })
                    ),
                    showApprovalCommentForm ? React.createElement(ApprovalCommentForm, {
                        onSubmit: function onSubmit() {
                            if (_this2.feedContainer) {
                                _this2.feedContainer.scrollTop = 0;
                            }
                        },
                        isDisabled: isDisabled,
                        approverSelectorContacts: approverSelectorContacts,
                        mentionSelectorContacts: mentionSelectorContacts,
                        className: classNames('bcs-activity-feed-comment-input', {
                            'bcs-is-disabled': isDisabled
                        }),
                        createComment: hasCommentPermission ? this.createComment : noop,
                        createTask: hasCommentPermission ? this.createTask : noop,
                        getApproverContactsWithQuery: getApproverWithQuery,
                        getMentionContactsWithQuery: getMentionWithQuery,
                        isOpen: isInputOpen,
                        user: currentUser,
                        onCancel: this.approvalCommentFormCancelHandler,
                        onFocus: this.approvalCommentFormFocusHandler,
                        getAvatarUrl: getAvatarUrl
                    }) : null
                )
            );
        }
    }]);

    return ActivityFeed;
}(React.Component);

ActivityFeed.defaultProps = {
    isLoading: false
};


export default ActivityFeed;