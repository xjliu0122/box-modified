/**
 * 
 * @file Skills sidebar component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import SidebarContent from './SidebarContent';
import SidebarSkills from './Skills/SidebarSkills';

var SkillsSidebar = function SkillsSidebar(_ref) {
    var file = _ref.file,
        getPreviewer = _ref.getPreviewer,
        onSkillChange = _ref.onSkillChange;
    return React.createElement(
        SidebarContent,
        { title: React.createElement(FormattedMessage, messages.sidebarSkillsTitle) },
        React.createElement(SidebarSkills, { file: file, getPreviewer: getPreviewer, onSkillChange: onSkillChange })
    );
};

export default SkillsSidebar;