/**
 * 
 * @file Function to render the table cell
 * @author Box
 */

import React from 'react';
import Button from 'box-react-ui/lib/components/button/Button';
import iconCellRenderer from '../Item/iconCellRenderer';
import ItemName from '../Item/ItemName';
import ItemSubDetails from '../Item/ItemSubDetails';
import { TYPE_FOLDER, VIEW_FOLDER } from '../../constants';

export default (function (onExpanderClick, onItemClick) {
    var isSmall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isLoading = arguments[3];
    return function (_ref) {
        var rowData = _ref.rowData;
        var path_collection = rowData.path_collection,
            selected = rowData.selected;

        if (!path_collection) {
            throw new Error('Bad Item!');
        }

        var paddingLeft = (path_collection.total_count - 1) * (isSmall ? 22 : 34) + 'px';
        var onClick = function onClick() {
            return onExpanderClick(rowData);
        };

        return React.createElement(
            'div',
            { className: 'bft-cell-node', style: { paddingLeft: paddingLeft } },
            rowData.type === TYPE_FOLDER ? React.createElement(
                Button,
                { type: 'button', onClick: onClick, className: 'bft-cell-node-btn', isDisabled: isLoading },
                selected ? '-' : '+'
            ) : React.createElement('div', { className: 'bft-cell-node-btn' }),
            iconCellRenderer(isSmall ? 24 : 32)({ rowData: rowData }),
            React.createElement(
                'div',
                { className: 'be-item-name' },
                React.createElement(ItemName, { isTouch: false, item: rowData, canPreview: true, onClick: onItemClick }),
                isSmall ? null : React.createElement(
                    'div',
                    { className: 'be-item-details' },
                    React.createElement(ItemSubDetails, { view: VIEW_FOLDER, item: rowData })
                )
            )
        );
    };
});