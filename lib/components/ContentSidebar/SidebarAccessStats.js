function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 
 * @file Versions sidebar component
 * @author Box
 */

import React from 'react';
import AccessStats from 'box-react-ui/lib/features/access-stats/AccessStats';
import { FormattedMessage } from 'react-intl';
import SidebarSection from './SidebarSection';

import messages from '../messages';
import { INTERACTION_TARGET, SECTION_TARGETS, DETAILS_TARGETS } from '../../interactionTargets';
import { isBoxNote } from '../../util/file';
import withErrorHandling from './withErrorHandling';

var SidebarAccessStats = function SidebarAccessStats(_ref) {
    var onAccessStatsClick = _ref.onAccessStatsClick,
        _ref$accessStats = _ref.accessStats,
        accessStats = _ref$accessStats === undefined ? {
        preview_count: 0,
        comment_count: 0,
        download_count: 0,
        edit_count: 0,
        has_count_overflowed: false
    } : _ref$accessStats,
        file = _ref.file;
    var preview_count = accessStats.preview_count,
        comment_count = accessStats.comment_count,
        download_count = accessStats.download_count,
        edit_count = accessStats.edit_count;


    if (!preview_count && !comment_count && !download_count && !edit_count) {
        return null;
    }

    return React.createElement(
        SidebarSection,
        {
            interactionTarget: SECTION_TARGETS.ACCESS_STATS,
            title: React.createElement(FormattedMessage, messages.sidebarAccessStats)
        },
        React.createElement(AccessStats, {
            commentCount: comment_count,
            commentStatButtonProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.ACCESS_STATS.COMMENTS),
            downloadCount: download_count,
            downloadStatButtonProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.ACCESS_STATS.DOWNLOADS),
            previewCount: preview_count,
            previewStatButtonProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.ACCESS_STATS.PREVIEWS),
            editCount: edit_count,
            editStatButtonProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.ACCESS_STATS.EDITS),
            openAccessStatsModal: onAccessStatsClick,
            isBoxNote: isBoxNote(file),
            viewStatButtonProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.ACCESS_STATS.VIEW_DETAILS)
        })
    );
};

export { SidebarAccessStats as SidebarAccessStatsComponent };
export default withErrorHandling(SidebarAccessStats);