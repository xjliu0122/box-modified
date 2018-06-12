/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import SubHeaderLeft from './SubHeaderLeft';
import SubHeaderRight from './SubHeaderRight';

var SubHeader = function SubHeader(_ref) {
    var rootId = _ref.rootId,
        rootName = _ref.rootName,
        onItemClick = _ref.onItemClick,
        onSortChange = _ref.onSortChange,
        currentCollection = _ref.currentCollection,
        onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        canUpload = _ref.canUpload,
        canCreateNewFolder = _ref.canCreateNewFolder,
        view = _ref.view,
        isSmall = _ref.isSmall;
    return React.createElement(
        'div',
        { className: 'be-sub-header' },
        React.createElement(SubHeaderLeft, {
            rootId: rootId,
            rootName: rootName,
            onItemClick: onItemClick,
            currentCollection: currentCollection,
            view: view,
            isSmall: isSmall
        }),
        React.createElement(SubHeaderRight, {
            view: view,
            currentCollection: currentCollection,
            canUpload: canUpload,
            canCreateNewFolder: canCreateNewFolder,
            onUpload: onUpload,
            onCreate: onCreate,
            onSortChange: onSortChange
        })
    );
};

export default SubHeader;