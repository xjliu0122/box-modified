/**
 * 
 * @file Preview sidebar nav component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import IconMagicWand from 'box-react-ui/lib/icons/general/IconMagicWand';
import IconMetadataThick from 'box-react-ui/lib/icons/general/IconMetadataThick';
import IconDocInfo from 'box-react-ui/lib/icons/general/IconDocInfo';
import IconChatRound from 'box-react-ui/lib/icons/general/IconChatRound';
import SidebarNavButton from './SidebarNavButton';
import messages from '../messages';
import { SIDEBAR_NAV_TARGETS } from '../../interactionTargets';
import { SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_METADATA } from '../../constants';

var SidebarNav = function SidebarNav(_ref) {
    var hasSkills = _ref.hasSkills,
        hasMetadata = _ref.hasMetadata,
        hasActivityFeed = _ref.hasActivityFeed,
        hasDetails = _ref.hasDetails,
        onToggle = _ref.onToggle,
        selectedView = _ref.selectedView;
    return React.createElement(
        'nav',
        null,
        hasSkills && React.createElement(
            SidebarNavButton,
            {
                tooltip: React.createElement(FormattedMessage, messages.sidebarSkillsTitle),
                onClick: function onClick() {
                    return onToggle(SIDEBAR_VIEW_SKILLS);
                },
                interactionTarget: SIDEBAR_NAV_TARGETS.SKILLS,
                isSelected: SIDEBAR_VIEW_SKILLS === selectedView
            },
            React.createElement(IconMagicWand, null)
        ),
        hasActivityFeed && React.createElement(
            SidebarNavButton,
            {
                tooltip: React.createElement(FormattedMessage, messages.sidebarActivityTitle),
                onClick: function onClick() {
                    return onToggle(SIDEBAR_VIEW_ACTIVITY);
                },
                interactionTarget: SIDEBAR_NAV_TARGETS.ACTIVITY,
                isSelected: SIDEBAR_VIEW_ACTIVITY === selectedView
            },
            React.createElement(IconChatRound, null)
        ),
        hasMetadata && React.createElement(
            SidebarNavButton,
            {
                tooltip: React.createElement(FormattedMessage, messages.sidebarMetadataTitle),
                onClick: function onClick() {
                    return onToggle(SIDEBAR_VIEW_METADATA);
                },
                interactionTarget: SIDEBAR_NAV_TARGETS.METADATA,
                isSelected: SIDEBAR_VIEW_METADATA === selectedView
            },
            React.createElement(IconMetadataThick, null)
        ),
        hasDetails && React.createElement(
            SidebarNavButton,
            {
                tooltip: React.createElement(FormattedMessage, messages.sidebarDetailsTitle),
                onClick: function onClick() {
                    return onToggle(SIDEBAR_VIEW_DETAILS);
                },
                interactionTarget: SIDEBAR_NAV_TARGETS.DETAILS,
                isSelected: SIDEBAR_VIEW_DETAILS === selectedView
            },
            React.createElement(IconDocInfo, null)
        )
    );
};

export default SidebarNav;