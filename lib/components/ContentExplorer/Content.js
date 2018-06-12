/**
 * 
 * @file File picker header and list component
 * @author Box
 */

import React from 'react';
import ItemList from './ItemList';
import EmptyState from '../EmptyState';
import ProgressBar from '../ProgressBar';
import { VIEW_ERROR, VIEW_SELECTED } from '../../constants';


/**
 * Determines if we should show the empty state
 *
 * @param {string} view the current view
 * @param {Object} currentCollection the current collection
 * @return {boolean} empty or not
 */
function isEmpty(view, currentCollection) {
    var _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it;

    return view === VIEW_ERROR || items.length === 0;
}

var Content = function Content(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        isMedium = _ref.isMedium,
        isTouch = _ref.isTouch,
        rootId = _ref.rootId,
        rootElement = _ref.rootElement,
        currentCollection = _ref.currentCollection,
        tableRef = _ref.tableRef,
        focusedRow = _ref.focusedRow,
        canDownload = _ref.canDownload,
        canDelete = _ref.canDelete,
        canRename = _ref.canRename,
        canShare = _ref.canShare,
        canPreview = _ref.canPreview,
        onItemClick = _ref.onItemClick,
        onItemSelect = _ref.onItemSelect,
        onItemDelete = _ref.onItemDelete,
        onItemDownload = _ref.onItemDownload,
        onItemRename = _ref.onItemRename,
        onItemShare = _ref.onItemShare,
        onItemPreview = _ref.onItemPreview,
        onSortChange = _ref.onSortChange;
    return React.createElement(
        'div',
        { className: 'bce-content' },
        view === VIEW_ERROR || view === VIEW_SELECTED ? null : React.createElement(ProgressBar, { percent: currentCollection.percentLoaded }),
        isEmpty(view, currentCollection) ? React.createElement(EmptyState, { view: view, isLoading: currentCollection.percentLoaded !== 100 }) : React.createElement(ItemList, {
            view: view,
            isSmall: isSmall,
            isMedium: isMedium,
            isTouch: isTouch,
            rootId: rootId,
            rootElement: rootElement,
            focusedRow: focusedRow,
            currentCollection: currentCollection,
            tableRef: tableRef,
            canShare: canShare,
            canPreview: canPreview,
            canDelete: canDelete,
            canRename: canRename,
            canDownload: canDownload,
            onItemClick: onItemClick,
            onItemSelect: onItemSelect,
            onItemDelete: onItemDelete,
            onItemDownload: onItemDownload,
            onItemRename: onItemRename,
            onItemShare: onItemShare,
            onItemPreview: onItemPreview,
            onSortChange: onSortChange
        })
    );
};

export default Content;