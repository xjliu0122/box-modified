/**
 * 
 * @file Empty state component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ErrorEmptyState from 'box-react-ui/lib/icons/states/ErrorEmptyState';
import FolderEmptyState from 'box-react-ui/lib/icons/states/FolderEmptyState';
import SelectedItemsEmptyState from 'box-react-ui/lib/icons/states/SelectedItemsEmptyState';
import SearchEmptyState from 'box-react-ui/lib/icons/states/SearchEmptyState';
import messages from '../messages';
import { VIEW_ERROR, VIEW_FOLDER, VIEW_SEARCH, VIEW_SELECTED } from '../../constants';

var EmptyState = function EmptyState(_ref) {
    var view = _ref.view,
        isLoading = _ref.isLoading;

    var type = void 0;
    var message = isLoading && view === VIEW_FOLDER ? React.createElement(FormattedMessage, messages.loadingState) : React.createElement(FormattedMessage, messages[view + 'State']);

    switch (view) {
        case VIEW_ERROR:
            type = React.createElement(ErrorEmptyState, null);
            break;
        case VIEW_SELECTED:
            type = React.createElement(SelectedItemsEmptyState, null);
            break;
        case VIEW_SEARCH:
            type = React.createElement(SearchEmptyState, null);
            break;
        default:
            type = React.createElement(FolderEmptyState, null);
            break;
    }
    return React.createElement(
        'div',
        { className: 'be-empty' },
        type,
        React.createElement(
            'div',
            null,
            message
        )
    );
};

export default EmptyState;