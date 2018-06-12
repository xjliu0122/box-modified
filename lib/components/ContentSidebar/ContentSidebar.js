var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Preview Component
 * @author Box
 */

import 'regenerator-runtime/runtime';
import React, { PureComponent } from 'react';
import uniqueid from 'lodash/uniqueId';
import getProp from 'lodash/get';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';
import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator/LoadingIndicator';
import Sidebar from './Sidebar';
import API from '../../api';
import Internationalize from '../Internationalize';
import { DEFAULT_HOSTNAME_API, CLIENT_NAME_CONTENT_SIDEBAR, FIELD_METADATA_SKILLS, DEFAULT_COLLAB_DEBOUNCE, DEFAULT_MAX_COLLABORATORS } from '../../constants';
import { COMMENTS_FIELDS_TO_FETCH, TASKS_FIELDS_TO_FETCH, VERSIONS_FIELDS_TO_FETCH } from '../../util/fields';
import messages from '../messages';
import { shouldRenderSidebar } from './sidebarUtil';

import { getBadItemError } from '../../util/error';

var ContentSidebar = function (_PureComponent) {
    _inherits(ContentSidebar, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentSidebar}
     */


    /* @property {State} - Initial state of the component */
    function ContentSidebar(props) {
        var _this2 = this;

        _classCallCheck(this, ContentSidebar);

        var _this = _possibleConstructorReturn(this, (ContentSidebar.__proto__ || Object.getPrototypeOf(ContentSidebar)).call(this, props));

        _this.state = {
            file: undefined,
            accessStats: undefined,
            versions: undefined,
            comments: undefined,
            tasks: undefined,
            currentUser: undefined,
            approverSelectorContacts: undefined,
            mentionSelectorContacts: undefined,
            fileError: undefined,
            versionError: undefined,
            commentsError: undefined,
            tasksError: undefined,
            accessStatsError: undefined,
            currentUserError: undefined
        };

        _this.getAvatarUrl = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
                var fileId;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                fileId = _this.props.fileId;

                                if (fileId) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt('return', null);

                            case 3:
                                return _context.abrupt('return', _this.api.getUsersAPI(false).getAvatarUrlWithAccessToken(userId, fileId));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.onDescriptionChange = function (newDescription) {
            var file = _this.state.file;

            if (!file) {
                return;
            }

            var description = file.description,
                id = file.id;

            if (newDescription === description || !id) {
                return;
            }

            _this.api.getFileAPI().setFileDescription(file, newDescription, _this.setFileDescriptionSuccessCallback, _this.setFileDescriptionErrorCallback);
        };

        _this.setFileDescriptionSuccessCallback = function (file) {
            _this.setState({ file: file, fileError: undefined });
        };

        _this.setFileDescriptionErrorCallback = function (e, file) {
            // Reset the state back to the original description since the API call failed
            _this.setState({
                file: file,
                fileError: {
                    inlineError: {
                        title: messages.fileDescriptionInlineErrorTitleMessage,
                        content: messages.defaultInlineErrorContentMessage
                    }
                }
            });
            _this.errorCallback(e);
        };

        _this.fetchVersionsErrorCallback = function (e) {
            _this.setState({
                versions: undefined,
                versionError: {
                    maskError: {
                        errorHeader: messages.versionHistoryErrorHeaderMessage,
                        errorSubHeader: messages.defaultErrorMaskSubHeaderMessage
                    }
                }
            });
            _this.errorCallback(e);
        };

        _this.fetchCommentsErrorCallback = function (e) {
            _this.setState({
                comments: undefined,
                commentsError: e
            });
            _this.errorCallback(e);
        };

        _this.fetchTasksErrorCallback = function (e) {
            _this.setState({
                tasks: undefined,
                tasksError: e
            });
        };

        _this.fetchFileAccessStatsErrorCallback = function (e) {
            _this.setState({
                accessStats: undefined,
                accessStatsError: {
                    maskError: {
                        errorHeader: messages.fileAccessStatsErrorHeaderMessage,
                        errorSubHeader: messages.defaultErrorMaskSubHeaderMessage
                    }
                }
            });
            _this.errorCallback(e);
        };

        _this.fetchCurrentUserErrorCallback = function (e) {
            _this.setState({
                currentUser: undefined,
                currentUserError: {
                    maskError: {
                        errorHeader: messages.currentUserErrorHeaderMessage,
                        errorSubHeader: messages.defaultErrorMaskSubHeaderMessage
                    }
                }
            });
            _this.errorCallback(e);
        };

        _this.errorCallback = function (error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        };

        _this.fetchFileSuccessCallback = function (file) {
            _this.setState({ file: file });
        };

        _this.fetchVersionsSuccessCallback = function (versions) {
            _this.setState({ versions: versions, versionError: undefined });
        };

        _this.fetchCommentsSuccessCallback = function (comments) {
            _this.setState({ comments: comments, commentsError: undefined });
        };

        _this.fetchTasksSuccessCallback = function (tasks) {
            _this.setState({ tasks: tasks, tasksError: undefined });
        };

        _this.fetchFileAccessStatsSuccessCallback = function (accessStats) {
            _this.setState({ accessStats: accessStats, accessStatsError: undefined });
        };

        _this.fetchCurrentUserSuccessCallback = function (user) {
            _this.setState({ currentUser: user, currentUserError: undefined });
        };

        _this.getApproverContactsSuccessCallback = function (collaborators) {
            var entries = collaborators.entries;

            _this.setState({ approverSelectorContacts: entries });
        };

        _this.getMentionContactsSuccessCallback = function (collaborators) {
            var entries = collaborators.entries;

            _this.setState({ mentionSelectorContacts: entries });
        };

        _this.createComment = function (text, hasMention) {
            var _successCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            var _errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            var file = _this.state.file;


            if (!file) {
                throw getBadItemError();
            }

            var message = {};

            if (hasMention) {
                message.taggedMessage = text;
            } else {
                message.message = text;
            }

            _this.api.getCommentsAPI(false).createComment(_extends({
                file: file
            }, message, {
                successCallback: function successCallback(comment) {
                    _this.createCommentSuccessCallback(comment);
                    _successCallback(comment);
                },
                errorCallback: function errorCallback(e) {
                    _this.errorCallback(e);
                    _errorCallback(e);
                }
            }));
        };

        _this.createTask = function (text, assignees, dueAt) {
            var _successCallback2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            var _errorCallback2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : noop;

            var file = _this.state.file;


            if (!file) {
                throw getBadItemError();
            }

            _this.api.getTasksAPI(false).createTask({
                file: file,
                message: text,
                dueAt: dueAt,
                successCallback: function successCallback(task) {
                    _this.createTaskSuccessCallback(task);
                    _successCallback2(task);
                },
                errorCallback: function errorCallback(e) {
                    _this.errorCallback(e);
                    _errorCallback2(e);
                }
            });
        };

        _this.updateTask = function (taskId, message) {
            var _successCallback3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            var _errorCallback3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            var dueAt = arguments[4];
            var file = _this.state.file;
            var _this$props$onTaskUpd = _this.props.onTaskUpdate,
                onTaskUpdate = _this$props$onTaskUpd === undefined ? noop : _this$props$onTaskUpd;


            if (!file) {
                throw getBadItemError();
            }

            _this.api.getTasksAPI(false).updateTask({
                file: file,
                taskId: taskId,
                message: message,
                dueAt: dueAt,
                successCallback: function successCallback(task) {
                    onTaskUpdate(task);
                    _successCallback3(task);
                    _this.updateTaskSuccessCallback(task);
                },
                errorCallback: function errorCallback(e) {
                    _errorCallback3(e);
                    _this.errorCallback(e);
                }
            });
        };

        _this.deleteTask = function (taskId) {
            var _successCallback4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

            var _errorCallback4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            var file = _this.state.file;
            var _this$props$onTaskDel = _this.props.onTaskDelete,
                onTaskDelete = _this$props$onTaskDel === undefined ? noop : _this$props$onTaskDel;


            if (!file) {
                throw getBadItemError();
            }

            _this.api.getTasksAPI(false).deleteTask({
                file: file,
                taskId: taskId,
                successCallback: function successCallback() {
                    onTaskDelete(taskId);
                    _successCallback4(taskId);
                    _this.deleteTaskSuccessCallback(taskId);
                },
                errorCallback: function errorCallback(e) {
                    _errorCallback4(e, taskId);
                    _this.errorCallback(e);
                }
            });
        };

        _this.deleteTaskSuccessCallback = function (taskId) {
            var tasks = _this.state.tasks;


            if (tasks) {
                var entries = tasks.entries;


                var newEntries = entries.filter(function (task) {
                    return task.id !== taskId;
                });

                _this.setState({
                    tasks: {
                        entries: newEntries,
                        total_count: newEntries.length
                    }
                });
            }
        };

        _this.deleteComment = function (commentId, permissions) {
            var _successCallback5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            var _errorCallback5 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            var file = _this.state.file;
            var _this$props$onComment = _this.props.onCommentDelete,
                onCommentDelete = _this$props$onComment === undefined ? noop : _this$props$onComment;


            if (!file) {
                throw getBadItemError();
            }

            _this.api.getCommentsAPI(false).deleteComment({
                file: file,
                commentId: commentId,
                permissions: permissions,
                successCallback: function successCallback() {
                    onCommentDelete(commentId);
                    _successCallback5(commentId);
                    _this.deleteCommentSuccessCallback(commentId);
                },
                errorCallback: function errorCallback(e) {
                    _errorCallback5(e, commentId);
                    _this.errorCallback(e);
                }
            });
        };

        _this.deleteCommentSuccessCallback = function (commentId) {
            var comments = _this.state.comments;


            if (comments) {
                var entries = comments.entries;


                var newEntries = entries.filter(function (comment) {
                    return comment.id !== commentId;
                });

                _this.setState({
                    comments: {
                        entries: newEntries,
                        total_count: newEntries.length
                    }
                });
            }
        };

        _this.onSkillChange = function (index) {
            var removes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var adds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var replaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
            var hasSkills = _this.props.hasSkills;
            var file = _this.state.file;

            if (!hasSkills || !file) {
                return;
            }

            var metadata = file.metadata,
                permissions = file.permissions;

            if (!metadata || !permissions || !permissions.can_upload) {
                return;
            }

            var cards = getProp(file, 'metadata.global.boxSkillsCards.cards');
            if (!cards || cards.length === 0 || !cards[index]) {
                return;
            }

            var card = cards[index];
            var path = '/cards/' + index;
            var ops = [];

            if (Array.isArray(replaces)) {
                replaces.forEach(function (_ref2) {
                    var replaced = _ref2.replaced,
                        replacement = _ref2.replacement;

                    var idx = card.entries.findIndex(function (entry) {
                        return entry === replaced;
                    });
                    if (idx > -1) {
                        ops.push({
                            op: 'replace',
                            path: path + '/entries/' + idx,
                            value: replacement
                        });
                    }
                });
            }

            if (Array.isArray(removes)) {
                removes.forEach(function (removed) {
                    var idx = card.entries.findIndex(function (entry) {
                        return entry === removed;
                    });
                    if (idx > -1) {
                        ops.push({
                            op: 'remove',
                            path: path + '/entries/' + idx
                        });
                    }
                });
            }

            if (Array.isArray(adds)) {
                adds.forEach(function (added) {
                    ops.push({
                        op: 'add',
                        path: path + '/entries/-',
                        value: added
                    });
                });
            }

            // If no ops, don't proceed
            if (ops.length === 0) {
                return;
            }

            // Add test ops before any other ops
            ops.splice(0, 0, {
                op: 'test',
                path: path,
                value: card
            });

            _this.api.getMetadataAPI(false).patch(file, FIELD_METADATA_SKILLS, ops, function (updatedFile) {
                _this.setState({ file: updatedFile });
            }, _this.errorCallback);
        };

        _this.getApproverWithQuery = debounce(function (searchStr) {
            // Do not fetch without filter
            var fileId = _this.props.fileId;

            if (!searchStr || searchStr.trim() === '' || !fileId) {
                return;
            }

            _this.api.getFileCollaboratorsAPI(true).markerGet({
                id: fileId,
                limit: DEFAULT_MAX_COLLABORATORS,
                params: {
                    filter_term: searchStr
                },
                successCallback: _this.getApproverContactsSuccessCallback,
                errorCallback: _this.errorCallback
            });
        }, DEFAULT_COLLAB_DEBOUNCE);
        _this.getMentionWithQuery = debounce(function (searchStr) {
            // Do not fetch without filter
            var fileId = _this.props.fileId;

            if (!searchStr || searchStr.trim() === '' || !fileId) {
                return;
            }

            _this.api.getFileCollaboratorsAPI(true).markerGet({
                id: fileId,
                limit: DEFAULT_MAX_COLLABORATORS,
                params: {
                    filter_term: searchStr
                },
                successCallback: _this.getMentionContactsSuccessCallback,
                errorCallback: _this.errorCallback
            });
        }, DEFAULT_COLLAB_DEBOUNCE);
        var cache = props.cache,
            token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            clientName = props.clientName,
            requestInterceptor = props.requestInterceptor,
            responseInterceptor = props.responseInterceptor;


        _this.id = uniqueid('bcs_');
        _this.api = new API({
            cache: cache,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            clientName: clientName,
            requestInterceptor: requestInterceptor,
            responseInterceptor: responseInterceptor
        });

        // Clone initial state to allow for state reset on new files
        _this.initialState = cloneDeep(_this.state);
        return _this;
    }

    /**
     * Gets the user avatar URL
     *
     * @param {string} userId the user id
     * @param {string} fileId the file id
     *
     * @return the user avatar URL string for a given user with access token attached
     */


    _createClass(ContentSidebar, [{
        key: 'clearCache',


        /**
         * Destroys api instances
         *
         * @private
         * @return {void}
         */
        value: function clearCache() {
            this.api.destroy(true);
        }

        /**
         * Cleanup
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearCache();
        }

        /**
         * Fetches the root folder on load
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.rootElement = document.getElementById(this.id);
            this.appElement = this.rootElement.firstElementChild;

            this.fetchData(this.props);
        }

        /**
         * Called when sidebar gets new properties
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var fileId = this.props.fileId;
            var newFileId = nextProps.fileId;


            var hasFileIdChanged = newFileId !== fileId;

            if (hasFileIdChanged) {
                this.setState(this.initialState);
                this.fetchData(nextProps);
            }
        }

        /**
         * Fetches the data for the sidebar
         *
         * @param {Object} Props the component props
         * @param {boolean} hasFileIdChanged true if the file id has changed
         */

    }, {
        key: 'fetchData',
        value: function fetchData(_ref3) {
            var fileId = _ref3.fileId,
                hasActivityFeed = _ref3.hasActivityFeed,
                hasAccessStats = _ref3.hasAccessStats,
                currentUser = _ref3.currentUser;

            if (fileId) {
                this.fetchFile(fileId);
                if (hasAccessStats) {
                    this.fetchFileAccessStats(fileId);
                }
                if (hasActivityFeed) {
                    this.fetchComments({
                        id: fileId,
                        fields: COMMENTS_FIELDS_TO_FETCH
                    });
                    this.fetchTasks(fileId);
                    this.fetchVersions({
                        id: fileId,
                        fields: VERSIONS_FIELDS_TO_FETCH
                    });
                    this.fetchCurrentUser(currentUser);
                }
            }
        }

        /**
         * Function to update file description
         *
         * @private
         * @param {string} newDescription - New file description
         * @return {void}
         */


        /**
         * File update description callback
         *
         * @private
         * @param {BoxItem} file - Updated file object
         * @return {void}
         */


        /**
         * Handles a failed file description update
         *
         * @private
         * @param {Error} e - API error
         * @param {BoxItem} file - Original file description
         * @return {void}
         */


        /**
         * Handles a failed file version fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */


        /**
         * Handles a failed file comment fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */


        /**
         * Handles a failed file task fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */


        /**
         * Handles a failed file access stats fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */


        /**
         * Handles a failed file user info fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */


        /**
         * Network error callback
         *
         * @private
         * @param {Error} error - Error object
         * @return {void}
         */


        /**
         * File fetch success callback
         *
         * @private
         * @param {Object} file - Box file
         * @return {void}
         */


        /**
         * File versions fetch success callback
         *
         * @private
         * @param {Object} versions - Box file versions
         * @return {void}
         */


        /**
         * File versions fetch success callback
         *
         * @private
         * @param {Object} file - Box file
         * @return {void}
         */


        /**
         * File tasks fetch success callback
         *
         * @private
         * @param {Object} tasks - Box task
         * @return {void}
         */


        /**
         * File access stats fetch success callback
         *
         * @private
         * @param {Object} accessStats - access stats for a file
         * @return {void}
         */


        /**
         * User fetch success callback
         *
         * @private
         * @param {Object} currentUser - User info object
         * @return {void}
         */


        /**
         * File approver contacts fetch success callback
         *
         * @private
         * @param {BoxItemCollection} data - Collaborators response data
         * @return {void}
         */


        /**
         * File @mention contacts fetch success callback
         *
         * @private
         * @param {BoxItemCollection} data - Collaborators response data
         * @return {void}
         */

    }, {
        key: 'fetchFile',


        /**
         * Fetches a file
         *
         * @private
         * @param {string} id - File id
         * @param {Boolean|void} [forceFetch] - To void cache
         * @return {void}
         */
        value: function fetchFile(id) {
            var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (shouldRenderSidebar(this.props)) {
                this.api.getFileAPI().file(id, this.fetchFileSuccessCallback, this.errorCallback, forceFetch, true);
            }
        }

        /**
         * Fetches the versions for a file
         *
         * @private
         * @param {string} id - File id
         * @param {boolean} shouldDestroy true if the apiFactory should be destroyed
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {array} fields the fields to fetch
         * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
         * @return {void}
         */

    }, {
        key: 'fetchVersions',
        value: function fetchVersions(_ref4) {
            var id = _ref4.id,
                _ref4$shouldDestroy = _ref4.shouldDestroy,
                shouldDestroy = _ref4$shouldDestroy === undefined ? false : _ref4$shouldDestroy,
                _ref4$offset = _ref4.offset,
                offset = _ref4$offset === undefined ? 0 : _ref4$offset,
                _ref4$limit = _ref4.limit,
                limit = _ref4$limit === undefined ? 1000 : _ref4$limit,
                fields = _ref4.fields,
                _ref4$shouldFetchAll = _ref4.shouldFetchAll,
                shouldFetchAll = _ref4$shouldFetchAll === undefined ? true : _ref4$shouldFetchAll;

            if (shouldRenderSidebar(this.props)) {
                this.api.getVersionsAPI(shouldDestroy).offsetGet(id, this.fetchVersionsSuccessCallback, this.fetchVersionsErrorCallback, offset, limit, fields, shouldFetchAll);
            }
        }

        /**
         * Fetches the comments for a file
         *
         * @private
         * @param {string} id - File id
         * @param {boolean} shouldDestroy true if the apiFactory should be destroyed
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {array} fields the fields to fetch
         * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
         * @return {void}
         */

    }, {
        key: 'fetchComments',
        value: function fetchComments(_ref5) {
            var id = _ref5.id,
                _ref5$shouldDestroy = _ref5.shouldDestroy,
                shouldDestroy = _ref5$shouldDestroy === undefined ? false : _ref5$shouldDestroy,
                _ref5$offset = _ref5.offset,
                offset = _ref5$offset === undefined ? 0 : _ref5$offset,
                _ref5$limit = _ref5.limit,
                limit = _ref5$limit === undefined ? 1000 : _ref5$limit,
                fields = _ref5.fields,
                _ref5$shouldFetchAll = _ref5.shouldFetchAll,
                shouldFetchAll = _ref5$shouldFetchAll === undefined ? true : _ref5$shouldFetchAll;

            if (shouldRenderSidebar(this.props)) {
                this.api.getCommentsAPI(shouldDestroy).offsetGet(id, this.fetchCommentsSuccessCallback, this.fetchCommentsErrorCallback, offset, limit, fields, shouldFetchAll);
            }
        }

        /**
         * Adds a comment to the comments state and increases total_count.
         *
         * @param {Comment} comment - The newly created comment from the API
         * @return {void}
         */

    }, {
        key: 'createCommentSuccessCallback',
        value: function createCommentSuccessCallback(comment) {
            var comments = this.state.comments;

            if (comments && comments.entries) {
                this.setState({
                    comments: {
                        entries: [].concat(_toConsumableArray(comments.entries), [comment]),
                        total_count: comments.total_count + 1
                    }
                });
            }
        }

        /**
         * Posts a new comment to the API
         *
         * @private
         * @param {string} text - The comment's text
         * @param {boolean} hasMention - The comment's text
         * @param {Function} successCallback - Called on successful comment creation
         * @param {Function} errorCallback - Called on failure to create comment
         * @return {void}
         */

    }, {
        key: 'createTaskSuccessCallback',


        /**
         * Adds a task to the tasks state and increases total_count.
         *
         * @param {Task} task - The newly created task from the API
         * @return {void}
         */
        value: function createTaskSuccessCallback(task) {
            var tasks = this.state.tasks;

            if (tasks && tasks.entries) {
                this.setState({
                    tasks: {
                        entries: [].concat(_toConsumableArray(tasks.entries), [task]),
                        total_count: tasks.total_count + 1
                    }
                });
            }
        }

        /**
         * Posts a new task to the API
         *
         * @private
         * @param {string} text - The task's text
         * @param {Array} assignees - Array of assignees
         * @param {string} dueAt - The comment's text
         * @param {Function} successCallback - Called on successful task creation
         * @param {Function} errorCallback - Called on failure to create task
         * @return {void}
         */


        /**
         * Updates a task
         *
         * @private
         * @param {string} taskId - The task's id
         * @param {Array} message - The task's text
         * @param {Function} successCallback - the function which will be called on success
         * @param {Function} errorCallback - the function which will be called on error
         * @param {string} dueAt - The date the task is due
         * @return {void}
         */

    }, {
        key: 'updateTaskSuccessCallback',


        /**
         * Task update success callback
         *
         * @private
         * @param {Object} task - Box task
         * @return {void}
         */
        value: function updateTaskSuccessCallback(task) {
            var tasks = this.state.tasks;
            var id = task.id;


            if (tasks) {
                var entries = tasks.entries,
                    total_count = tasks.total_count;


                this.setState({
                    tasks: {
                        entries: entries.map(function (item) {
                            if (item.id === id) {
                                return _extends({}, task);
                            }
                            return item;
                        }),
                        total_count: total_count
                    }
                });
            }
        }

        /**
         * Deletes a task
         *
         * @private
         * @param {string} taskId - The task's id
         * @param {Function} successCallback - the function which will be called on success
         * @param {Function} errorCallback - the function which will be called on error
         * @return {void}
         */


        /**
         * Task update success callback
         *
         * @private
         * @param {Object} task - Box task
         * @return {void}
         */


        /**
         * Deletes a comment
         *
         * @private
         * @param {string} commentId - The comment's id
         * @param {BoxItemPermission} permissions - The comment's permissions
         * @param {Function} successCallback - the function which will be called on success
         * @param {Function} errorCallback - the function which will be called on error
         * @return {void}
         */


        /**
         * Comment delete success callback
         *
         * @private
         * @param {string} commentId - The comment's id
         * @return {void}
         */

    }, {
        key: 'fetchTasks',


        /**
         * Fetches the tasks for a file
         *
         * @private
         * @param {string} id - File id
         * @return {void}
         */
        value: function fetchTasks(id) {
            var shouldDestroy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var requestData = {
                params: {
                    fields: TASKS_FIELDS_TO_FETCH.toString()
                }
            };

            if (shouldRenderSidebar(this.props)) {
                this.api.getTasksAPI(shouldDestroy).get(id, this.fetchTasksSuccessCallback, this.fetchTasksErrorCallback, requestData);
            }
        }

        /**
         * Fetches the access stats for a file
         *
         * @private
         * @param {string} id - File id
         * @return {void}
         */

    }, {
        key: 'fetchFileAccessStats',
        value: function fetchFileAccessStats(id) {
            var shouldDestroy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (shouldRenderSidebar(this.props)) {
                this.api.getFileAccessStatsAPI(shouldDestroy).get(id, this.fetchFileAccessStatsSuccessCallback, this.fetchFileAccessStatsErrorCallback);
            }
        }

        /**
         * Fetches a Users info
         *
         * @private
         * @param {string} [id] - User id. If missing, gets user that the current token was generated for.
         * @return {void}
         */

    }, {
        key: 'fetchCurrentUser',
        value: function fetchCurrentUser(user) {
            var shouldDestroy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (shouldRenderSidebar(this.props)) {
                if (typeof user === 'undefined') {
                    this.api.getUsersAPI(shouldDestroy).get('', this.fetchCurrentUserSuccessCallback, this.fetchCurrentUserErrorCallback);
                } else {
                    this.setState({ currentUser: user, currentUserError: undefined });
                }
            }
        }

        /**
         * Patches skill metadata
         *
         * @private
         * @param {string} id - File id
         * @return {void}
         */


        /**
         * File @mention contacts fetch success callback
         *
         * @private
         * @param {API} api - Box API instance
         * @param {string} searchStr - Search string to filter file collaborators by
         * @param {Function} successCallback - Fetch success callback
         * @return {void}
         */


        /**
         * File @mention contacts fetch success callback
         *
         * @private
         * @param {string} searchStr - Search string to filter file collaborators by
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the file preview
         *
         * @private
         * @inheritdoc
         * @return {Element}
         */
        value: function render() {
            var _props = this.props,
                language = _props.language,
                intlMessages = _props.messages,
                getPreviewer = _props.getPreviewer,
                hasSkills = _props.hasSkills,
                hasProperties = _props.hasProperties,
                hasMetadata = _props.hasMetadata,
                hasNotices = _props.hasNotices,
                hasAccessStats = _props.hasAccessStats,
                hasClassification = _props.hasClassification,
                hasActivityFeed = _props.hasActivityFeed,
                hasVersions = _props.hasVersions,
                className = _props.className,
                onVersionHistoryClick = _props.onVersionHistoryClick,
                onAccessStatsClick = _props.onAccessStatsClick,
                onClassificationClick = _props.onClassificationClick,
                onTaskAssignmentUpdate = _props.onTaskAssignmentUpdate,
                getUserProfileUrl = _props.getUserProfileUrl;
            var _state = this.state,
                file = _state.file,
                accessStats = _state.accessStats,
                versions = _state.versions,
                comments = _state.comments,
                tasks = _state.tasks,
                currentUser = _state.currentUser,
                accessStatsError = _state.accessStatsError,
                fileError = _state.fileError,
                versionError = _state.versionError,
                commentsError = _state.commentsError,
                tasksError = _state.tasksError,
                approverSelectorContacts = _state.approverSelectorContacts,
                mentionSelectorContacts = _state.mentionSelectorContacts,
                currentUserError = _state.currentUserError;


            var shouldRender = shouldRenderSidebar(this.props) && !!file;

            return React.createElement(
                Internationalize,
                { language: language, messages: intlMessages },
                React.createElement(
                    'aside',
                    { id: this.id, className: 'be bcs ' + className },
                    React.createElement(
                        'div',
                        { className: 'be-app-element' },
                        shouldRender ? React.createElement(Sidebar, {
                            file: file,
                            versions: versions,
                            getPreviewer: getPreviewer,
                            hasSkills: hasSkills,
                            hasProperties: hasProperties,
                            hasMetadata: hasMetadata,
                            hasNotices: hasNotices,
                            hasAccessStats: hasAccessStats,
                            hasClassification: hasClassification,
                            hasActivityFeed: hasActivityFeed,
                            onDescriptionChange: this.onDescriptionChange,
                            accessStats: accessStats,
                            onAccessStatsClick: onAccessStatsClick,
                            onClassificationClick: onClassificationClick,
                            onVersionHistoryClick: onVersionHistoryClick,
                            onSkillChange: this.onSkillChange,
                            hasVersions: hasVersions,
                            accessStatsError: accessStatsError,
                            fileError: fileError,
                            versionError: versionError,
                            tasks: tasks,
                            tasksError: tasksError,
                            comments: comments,
                            commentsError: commentsError,
                            currentUser: currentUser,
                            currentUserError: currentUserError,
                            onCommentCreate: this.createComment,
                            onCommentDelete: this.deleteComment,
                            onTaskCreate: this.createTask,
                            onTaskDelete: this.deleteTask,
                            onTaskUpdate: this.updateTask,
                            onTaskAssignmentUpdate: onTaskAssignmentUpdate,
                            getUserProfileUrl: getUserProfileUrl,
                            getApproverWithQuery: this.getApproverWithQuery,
                            getMentionWithQuery: this.getMentionWithQuery,
                            approverSelectorContacts: approverSelectorContacts,
                            mentionSelectorContacts: mentionSelectorContacts,
                            getAvatarUrl: this.getAvatarUrl
                        }) : React.createElement(
                            'div',
                            { className: 'bcs-loading' },
                            React.createElement(LoadingIndicator, null)
                        )
                    )
                )
            );
        }
    }]);

    return ContentSidebar;
}(PureComponent);

ContentSidebar.defaultProps = {
    className: '',
    isSmall: false,
    clientName: CLIENT_NAME_CONTENT_SIDEBAR,
    apiHost: DEFAULT_HOSTNAME_API,
    getPreviewer: noop,
    currentUser: undefined,
    hasSkills: false,
    hasProperties: false,
    hasMetadata: false,
    hasNotices: false,
    hasAccessStats: false,
    hasClassification: false,
    hasActivityFeed: false,
    hasVersions: false
};

export default ContentSidebar;