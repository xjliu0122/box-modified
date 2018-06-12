/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import Sort from './Sort';
import Add from './Add';
import { VIEW_SEARCH, VIEW_FOLDER, VIEW_RECENTS } from '../../constants';

var SubHeaderRight = function SubHeaderRight(_ref) {
    var view = _ref.view,
        onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        canUpload = _ref.canUpload,
        canCreateNewFolder = _ref.canCreateNewFolder,
        currentCollection = _ref.currentCollection,
        onSortChange = _ref.onSortChange;
    var sortBy = currentCollection.sortBy,
        sortDirection = currentCollection.sortDirection,
        percentLoaded = currentCollection.percentLoaded,
        _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it;

    var isRecents = view === VIEW_RECENTS;
    var isFolder = view === VIEW_FOLDER;
    var isSearch = view === VIEW_SEARCH;
    var showSort = (isRecents || isFolder || isSearch) && items.length > 0;
    var showAdd = (!!canUpload || !!canCreateNewFolder) && isFolder;
    var isLoaded = percentLoaded === 100;

    return React.createElement(
        'div',
        { className: 'be-sub-header-right' },
        showSort && !!sortBy && !!sortDirection && React.createElement(Sort, {
            isRecents: isRecents,
            isLoaded: isLoaded,
            sortBy: sortBy,
            sortDirection: sortDirection,
            onSortChange: onSortChange
        }),
        showAdd && React.createElement(Add, {
            showUpload: canUpload,
            showCreate: canCreateNewFolder,
            onUpload: onUpload,
            onCreate: onCreate,
            isDisabled: !isFolder,
            isLoaded: isLoaded
        })
    );
};

export default SubHeaderRight;