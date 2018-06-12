/**
 * 
 * @file Preview sidebar content component
 * @author Box
 */

import React from 'react';


var SidebarContent = function SidebarContent(_ref) {
    var title = _ref.title,
        children = _ref.children;
    return React.createElement(
        'div',
        { className: 'bcs-content' },
        React.createElement(
            'h3',
            { className: 'bcs-title' },
            title
        ),
        React.createElement(
            'div',
            { className: 'bcs-scroll-content-wrapper' },
            React.createElement(
                'div',
                { className: 'bcs-scroll-content' },
                children
            )
        )
    );
};

export default SidebarContent;