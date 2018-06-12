/**
 * 
 * @file Droppable area containing upload item list
 */

import React from 'react';
import ItemList from './ItemList';
import UploadState from './UploadState';
import makeDroppable from '../Droppable';

/**
 * Definition for drag and drop behavior.
 */
var dropDefinition = {
    /**
     * Validates whether a file can be dropped or not.
     */
    dropValidator: function dropValidator(props, dataTransfer) {
        var allowedTypes = props.allowedTypes;

        return [].some.call(dataTransfer.types, function (type) {
            return allowedTypes.indexOf(type) > -1;
        });
    },

    /**
     * Determines what happens after a file is dropped
     */
    onDrop: function onDrop(event, props) {
        var files = event.dataTransfer.files;

        // This filters out all files without an extension since there is no other
        // good way to filter out folders
        /* eslint-disable no-redeclare */

        files = [].filter.call(files, function (file) {
            var name = file.name;

            var extension = name.substr(name.lastIndexOf('.') + 1);
            return extension.length !== name.length;
        });
        /* eslint-enable no-redeclare */

        props.addFiles(files);
    }
};

var DroppableContent = makeDroppable(dropDefinition)(function (_ref) {
    var canDrop = _ref.canDrop,
        isOver = _ref.isOver,
        isTouch = _ref.isTouch,
        view = _ref.view,
        items = _ref.items,
        addFiles = _ref.addFiles,
        onClick = _ref.onClick;

    var handleSelectFiles = function handleSelectFiles(_ref2) {
        var files = _ref2.target.files;
        return addFiles(files);
    };
    var hasItems = items.length > 0;

    return React.createElement(
        'div',
        { className: 'bcu-droppable-content' },
        React.createElement(ItemList, { items: items, view: view, onClick: onClick }),
        React.createElement(UploadState, {
            canDrop: canDrop,
            hasItems: hasItems,
            isOver: isOver,
            isTouch: isTouch,
            view: view,
            onSelect: handleSelectFiles
        })
    );
});

export default DroppableContent;