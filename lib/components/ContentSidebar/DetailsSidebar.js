var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Details sidebar component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { SECTION_TARGETS } from '../../interactionTargets';
import SidebarAccessStats from './SidebarAccessStats';
import SidebarSection from './SidebarSection';
import SidebarContent from './SidebarContent';
import SidebarVersions from './SidebarVersions';
import SidebarNotices from './SidebarNotices';
import SidebarFileProperties from './SidebarFileProperties';

var DetailsSidebar = function DetailsSidebar(_ref) {
    var accessStats = _ref.accessStats,
        file = _ref.file,
        hasProperties = _ref.hasProperties,
        hasNotices = _ref.hasNotices,
        hasAccessStats = _ref.hasAccessStats,
        hasClassification = _ref.hasClassification,
        hasVersions = _ref.hasVersions,
        onAccessStatsClick = _ref.onAccessStatsClick,
        onDescriptionChange = _ref.onDescriptionChange,
        onClassificationClick = _ref.onClassificationClick,
        onVersionHistoryClick = _ref.onVersionHistoryClick,
        versions = _ref.versions,
        accessStatsError = _ref.accessStatsError,
        fileError = _ref.fileError,
        versionError = _ref.versionError;
    return React.createElement(
        SidebarContent,
        { title: React.createElement(FormattedMessage, messages.sidebarDetailsTitle) },
        (hasVersions || hasNotices) && React.createElement(
            'div',
            { className: 'bcs-details-content' },
            hasVersions && React.createElement(SidebarVersions, _extends({
                onVersionHistoryClick: onVersionHistoryClick,
                versions: versions,
                file: file
            }, versionError)),
            hasNotices && React.createElement(SidebarNotices, { file: file })
        ),
        hasProperties && React.createElement(
            SidebarSection,
            {
                interactionTarget: SECTION_TARGETS.FILE_PROPERTIES,
                title: React.createElement(FormattedMessage, messages.sidebarProperties)
            },
            React.createElement(SidebarFileProperties, _extends({
                onDescriptionChange: onDescriptionChange,
                file: file
            }, fileError, {
                hasClassification: hasClassification,
                onClassificationClick: onClassificationClick
            }))
        ),
        hasAccessStats && React.createElement(SidebarAccessStats, _extends({
            accessStats: accessStats,
            onAccessStatsClick: onAccessStatsClick,
            file: file
        }, accessStatsError))
    );
};

export default DetailsSidebar;