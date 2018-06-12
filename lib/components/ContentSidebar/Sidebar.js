var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Preview sidebar component
 * @author Box
 */

import * as React from 'react';
import DetailsSidebar from './DetailsSidebar';
import SkillsSidebar from './SkillsSidebar';
import ActivitySidebar from './ActivitySidebar';
import { hasSkills as hasSkillsData } from './Skills/skillUtils';
import { shouldRenderDetailsSidebar } from './sidebarUtil';
import SidebarNav from './SidebarNav';
import { SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_DETAILS } from '../../constants';

var Sidebar = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    /**
     * [constructor]
     *
     * @private
     * @return {Sidebar}
     */
    function Sidebar(props) {
        _classCallCheck(this, Sidebar);

        var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

        _this.onToggle = function (view) {
            _this.setState({ view: view === _this.state.view ? undefined : view });
        };

        _this.state = { view: _this.getDefaultView(props) };
        return _this;
    }

    /**
     * Should update the view if the view isn't applicable
     *
     * @private
     * @return {void}
     */


    _createClass(Sidebar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var view = this.state.view;

            if (view === SIDEBAR_VIEW_SKILLS && !this.canHaveSkillsSidebar(nextProps) || view === SIDEBAR_VIEW_ACTIVITY && !this.canHaveActivitySidebar(nextProps)) {
                this.setState({ view: this.getDefaultView(nextProps) });
            }
        }

        /**
         * Determines if skills sidebar is allowed
         *
         * @private
         * @return {string} default view
         */

    }, {
        key: 'canHaveSkillsSidebar',
        value: function canHaveSkillsSidebar(props) {
            var hasSkills = props.hasSkills,
                file = props.file;

            return hasSkills && hasSkillsData(file);
        }

        /**
         * Determines if activity sidebar is allowed
         *
         * @private
         * @return {string} default view
         */

    }, {
        key: 'canHaveActivitySidebar',
        value: function canHaveActivitySidebar(props) {
            var hasActivityFeed = props.hasActivityFeed;

            return hasActivityFeed;
        }

        /**
         * Determines the default view
         *
         * @private
         * @return {string} default view
         */

    }, {
        key: 'getDefaultView',
        value: function getDefaultView(props) {
            if (this.canHaveSkillsSidebar(props)) {
                return SIDEBAR_VIEW_SKILLS;
            } else if (this.canHaveActivitySidebar(props)) {
                return SIDEBAR_VIEW_ACTIVITY;
            }
            return SIDEBAR_VIEW_DETAILS;
        }

        /**
         * Toggle the sidebar view state
         *
         * @param {string} view - the selected view
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                currentUser = _props.currentUser,
                file = _props.file,
                getPreviewer = _props.getPreviewer,
                hasSkills = _props.hasSkills,
                hasProperties = _props.hasProperties,
                hasMetadata = _props.hasMetadata,
                hasNotices = _props.hasNotices,
                hasAccessStats = _props.hasAccessStats,
                hasClassification = _props.hasClassification,
                hasActivityFeed = _props.hasActivityFeed,
                hasVersions = _props.hasVersions,
                onAccessStatsClick = _props.onAccessStatsClick,
                onDescriptionChange = _props.onDescriptionChange,
                onSkillChange = _props.onSkillChange,
                onClassificationClick = _props.onClassificationClick,
                onVersionHistoryClick = _props.onVersionHistoryClick,
                onCommentCreate = _props.onCommentCreate,
                onCommentDelete = _props.onCommentDelete,
                onTaskCreate = _props.onTaskCreate,
                onTaskDelete = _props.onTaskDelete,
                onTaskUpdate = _props.onTaskUpdate,
                onTaskAssignmentUpdate = _props.onTaskAssignmentUpdate,
                getApproverWithQuery = _props.getApproverWithQuery,
                getMentionWithQuery = _props.getMentionWithQuery,
                accessStats = _props.accessStats,
                accessStatsError = _props.accessStatsError,
                fileError = _props.fileError,
                tasks = _props.tasks,
                tasksError = _props.tasksError,
                comments = _props.comments,
                commentsError = _props.commentsError,
                versions = _props.versions,
                approverSelectorContacts = _props.approverSelectorContacts,
                mentionSelectorContacts = _props.mentionSelectorContacts,
                getAvatarUrl = _props.getAvatarUrl,
                getUserProfileUrl = _props.getUserProfileUrl;
            var view = this.state.view;

            var hasSidebarSkills = this.canHaveSkillsSidebar(this.props);
            var hasDetails = shouldRenderDetailsSidebar({
                hasProperties: hasProperties,
                hasAccessStats: hasAccessStats,
                hasClassification: hasClassification,
                hasNotices: hasNotices,
                hasVersions: hasVersions
            });

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(SidebarNav, {
                    onToggle: this.onToggle,
                    selectedView: view,
                    hasSkills: hasSkills && hasSkillsData(file),
                    hasMetadata: hasMetadata,
                    hasActivityFeed: hasActivityFeed,
                    hasDetails: hasDetails
                }),
                view === SIDEBAR_VIEW_DETAILS && hasDetails && React.createElement(DetailsSidebar, {
                    file: file,
                    hasProperties: hasProperties,
                    hasMetadata: hasMetadata,
                    hasNotices: hasNotices,
                    hasAccessStats: hasAccessStats,
                    hasClassification: hasClassification,
                    hasVersions: hasVersions,
                    onSkillChange: onSkillChange,
                    onAccessStatsClick: onAccessStatsClick,
                    onClassificationClick: onClassificationClick,
                    onDescriptionChange: onDescriptionChange,
                    onVersionHistoryClick: onVersionHistoryClick,
                    accessStats: accessStats,
                    accessStatsError: accessStatsError,
                    fileError: fileError
                }),
                view === SIDEBAR_VIEW_SKILLS && hasSidebarSkills && React.createElement(SkillsSidebar, { file: file, getPreviewer: getPreviewer, onSkillChange: onSkillChange }),
                view === SIDEBAR_VIEW_ACTIVITY && hasActivityFeed && React.createElement(ActivitySidebar, {
                    currentUser: currentUser,
                    file: file,
                    tasks: tasks,
                    tasksError: tasksError,
                    comments: comments,
                    approverSelectorContacts: approverSelectorContacts,
                    mentionSelectorContacts: mentionSelectorContacts,
                    commentsError: commentsError,
                    versions: versions,
                    onCommentCreate: onCommentCreate,
                    onCommentDelete: onCommentDelete,
                    onTaskCreate: onTaskCreate,
                    onTaskDelete: onTaskDelete,
                    onTaskUpdate: onTaskUpdate,
                    onTaskAssignmentUpdate: onTaskAssignmentUpdate,
                    getUserProfileUrl: getUserProfileUrl,
                    getApproverWithQuery: getApproverWithQuery,
                    getMentionWithQuery: getMentionWithQuery,
                    getAvatarUrl: getAvatarUrl
                })
            );
        }
    }]);

    return Sidebar;
}(React.Component);

export default Sidebar;