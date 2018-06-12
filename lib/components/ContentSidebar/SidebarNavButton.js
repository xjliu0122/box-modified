/**
 * 
 * @file Preview sidebar nav button component
 * @author Box
 */

import * as React from 'react';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import Tooltip from 'box-react-ui/lib/components/tooltip/Tooltip';


var SidebarNavButton = function SidebarNavButton(_ref) {
    var tooltip = _ref.tooltip,
        isSelected = _ref.isSelected,
        onClick = _ref.onClick,
        interactionTarget = _ref.interactionTarget,
        children = _ref.children;
    return React.createElement(
        Tooltip,
        { text: tooltip, position: 'middle-left' },
        React.createElement(
            PlainButton,
            {
                type: 'button',
                className: classNames('bcs-nav-btn', {
                    'bcs-nav-btn-is-selected': isSelected
                }),
                onClick: onClick,
                'data-resin-target': interactionTarget
            },
            children
        )
    );
};

export default SidebarNavButton;