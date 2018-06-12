/**
 * 
 * @file Versions sidebar component
 * @author Box
 */

import React from 'react';
import VersionHistoryLink from 'box-react-ui/lib/features/item-details/VersionHistoryLink';

import { DETAILS_TARGETS } from '../../interactionTargets';
import { isBoxNote } from '../../util/file';

var SidebarVersions = function SidebarVersions(_ref) {
    var onVersionHistoryClick = _ref.onVersionHistoryClick,
        file = _ref.file;
    var version_number = file.version_number;


    var versionNumber = parseInt(version_number, 10);

    if (isBoxNote(file) || !versionNumber || versionNumber <= 1) {
        return null;
    }

    return React.createElement(VersionHistoryLink, {
        'data-resin-target': DETAILS_TARGETS.VERSION_HISTORY,
        onClick: onVersionHistoryClick,
        versionCount: versionNumber
    });
};

export default SidebarVersions;