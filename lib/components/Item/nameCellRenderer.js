/**
 * 
 * @file Function to render the name table cell
 * @author Box
 */

import React from 'react';
import ItemName from './ItemName';
import ItemDetails from './ItemDetails';
import { VIEW_SEARCH } from '../../constants';

export default (function (rootId, view, onItemClick, onItemSelect) {
    var canPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var showDetails = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var isTouch = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(
            'div',
            { className: 'be-item-name' },
            React.createElement(ItemName, {
                isTouch: isTouch,
                item: rowData,
                canPreview: canPreview,
                onClick: onItemClick,
                onFocus: onItemSelect
            }),
            view === VIEW_SEARCH || showDetails ? React.createElement(ItemDetails, { item: rowData, view: view, rootId: rootId, onItemClick: onItemClick }) : null
        );
    };
});