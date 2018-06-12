/**
 * 
 * @file Busy indicator for skill cards
 * @author Box
 */

import * as React from 'react';
import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator';


var SkillsBusyIndicator = function SkillsBusyIndicator() {
    return React.createElement(
        'div',
        { className: 'bcs-skills-is-busy' },
        React.createElement(LoadingIndicator, null)
    );
};

export default SkillsBusyIndicator;