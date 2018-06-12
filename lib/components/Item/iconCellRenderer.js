/**
 * 
 * @file Function to render the icon table cell
 * @author Box
 */

import React from 'react';
import FileIcon from 'box-react-ui/lib/icons/file-icon/FileIcon';
import FolderIcon from 'box-react-ui/lib/icons/folder-icon/FolderIcon';
import BookmarkIcon from 'box-react-ui/lib/icons/bookmark-icon/BookmarkIcon';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../../constants';

export function getIcon(dimension, rowData) {
    var type = rowData.type,
        extension = rowData.extension,
        has_collaborations = rowData.has_collaborations,
        is_externally_owned = rowData.is_externally_owned;

    switch (type) {
        case TYPE_FOLDER:
            return React.createElement(FolderIcon, { dimension: dimension, isCollab: has_collaborations, isExternal: is_externally_owned });
        case TYPE_FILE:
            return React.createElement(FileIcon, { dimension: dimension, extension: extension });
        case TYPE_WEBLINK:
            return React.createElement(BookmarkIcon, { width: dimension });
        default:
            throw new Error('Unsupported item type!');
    }
}

export default (function () {
    var dimension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(
            'div',
            { className: 'be-item-icon' },
            getIcon(dimension, rowData)
        );
    };
});