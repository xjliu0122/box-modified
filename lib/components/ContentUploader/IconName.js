/**
 * 
 * @file Component for file icon and name
 */

import React from 'react';
import FileIcon from 'box-react-ui/lib/icons/file-icon/FileIcon';
import ItemName from './ItemName';


var IconName = function IconName(_ref) {
    var name = _ref.name,
        extension = _ref.extension;
    return React.createElement(
        'div',
        { className: 'bcu-item-icon-name' },
        React.createElement(
            'div',
            { className: 'bcu-item-icon' },
            React.createElement(FileIcon, { extension: extension })
        ),
        React.createElement(
            'div',
            { className: 'bcu-item-name' },
            React.createElement(ItemName, { name: name })
        )
    );
};

export default IconName;