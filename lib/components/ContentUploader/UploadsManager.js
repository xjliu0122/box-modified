/**
 * 
 * @file Uploads manager
 */

import React from 'react';
import classNames from 'classnames';
import ItemList from './ItemList';
import OverallUploadsProgressBar from './OverallUploadsProgressBar';


import { STATUS_ERROR } from '../../constants';

var UploadsManager = function UploadsManager(_ref) {
    var items = _ref.items,
        view = _ref.view,
        onItemActionClick = _ref.onItemActionClick,
        toggleUploadsManager = _ref.toggleUploadsManager,
        isExpanded = _ref.isExpanded;

    var isVisible = items.length > 0;

    /**
     * Keydown handler for progress bar
     *
     * @param {SyntheticKeyboardEvent} event
     * @return {void}
     */
    var handleProgressBarKeyDown = function handleProgressBarKeyDown(event) {
        switch (event.key) {
            case 'Enter':
            case 'Space':
                toggleUploadsManager();
                break;
            default:
            // noop
        }
    };

    var totalSize = items.reduce(function (updatedSize, item) {
        return item.status === STATUS_ERROR ? updatedSize : updatedSize + item.size;
    }, 0);
    var totalUploaded = items.reduce(function (updatedSize, item) {
        return item.status === STATUS_ERROR ? updatedSize : updatedSize + item.size * item.progress / 100.0;
    }, 0);
    var percent = totalUploaded / totalSize * 100;

    return React.createElement(
        'div',
        {
            className: classNames('be bcu-uploads-manager-container', {
                'bcu-is-expanded': isExpanded,
                'bcu-is-visible': isVisible
            })
        },
        React.createElement(OverallUploadsProgressBar, {
            isVisible: isVisible,
            percent: percent,
            onClick: toggleUploadsManager,
            onKeyDown: handleProgressBarKeyDown,
            view: view
        }),
        React.createElement(
            'div',
            { className: 'bcu-uploads-manager-item-list' },
            React.createElement(ItemList, { items: items, view: view, onClick: onItemActionClick })
        )
    );
};

export default UploadsManager;