/**
 * 
 * @file Clickable breadcrumb component
 * @author Box
 */

import React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import BreadcrumbDelimiter from './BreadcrumbDelimiter';


var Breadcrumb = function Breadcrumb(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        onClick = _ref.onClick,
        isLast = _ref.isLast,
        delimiter = _ref.delimiter;

    var title = onClick ? React.createElement(
        PlainButton,
        { type: 'button', onClick: onClick },
        name
    ) : React.createElement(
        'span',
        null,
        name
    );
    return React.createElement(
        'span',
        { className: 'be-breadcrumb' },
        title,
        isLast ? null : React.createElement(BreadcrumbDelimiter, { delimiter: delimiter })
    );
};

export default Breadcrumb;