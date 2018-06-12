/**
 * 
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import { InlineBreadcrumbs } from '../Breadcrumbs';
import { VIEW_SEARCH, VIEW_SELECTED } from '../../constants';
import ItemSubDetails from './ItemSubDetails';

var ItemDetails = function ItemDetails(_ref) {
    var view = _ref.view,
        rootId = _ref.rootId,
        item = _ref.item,
        onItemClick = _ref.onItemClick;
    return React.createElement(
        'div',
        { className: 'be-item-details' },
        view === VIEW_SELECTED || view === VIEW_SEARCH ? React.createElement(InlineBreadcrumbs, { rootId: rootId, item: item, onItemClick: onItemClick }) : React.createElement(ItemSubDetails, { view: view, item: item })
    );
};

export default ItemDetails;