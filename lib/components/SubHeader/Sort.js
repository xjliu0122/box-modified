/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'box-react-ui/lib/components/button/Button';
import DropdownMenu from 'box-react-ui/lib/components/dropdown-menu/DropdownMenu';
import Menu from 'box-react-ui/lib/components/menu/Menu';
import MenuItem from 'box-react-ui/lib/components/menu/MenuItem';
import IconCheck from 'box-react-ui/lib/icons/general/IconCheck';
import IconSort from 'box-react-ui/lib/icons/general/IconSort';
import messages from '../messages';
import { SORT_ASC, SORT_DESC, SORT_NAME, SORT_DATE, SORT_SIZE, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, FIELD_SIZE } from '../../constants';

function getMenuItem(sort, by, direction, sortBy, sortDirection, onSortChange) {
    var isSame = by === sortBy && direction === sortDirection;
    return React.createElement(
        MenuItem,
        { onClick: function onClick() {
                return onSortChange(by, direction);
            } },
        React.createElement(
            'div',
            { className: 'be-sort-selected' },
            isSame ? React.createElement(IconCheck, { width: 16, height: 16 }) : null
        ),
        React.createElement(FormattedMessage, messages['' + sort + direction])
    );
}

var Sort = function Sort(_ref) {
    var isRecents = _ref.isRecents,
        isLoaded = _ref.isLoaded,
        sortBy = _ref.sortBy,
        sortDirection = _ref.sortDirection,
        onSortChange = _ref.onSortChange;
    return React.createElement(
        DropdownMenu,
        { isRightAligned: true, constrainToScrollParent: true },
        React.createElement(
            Button,
            { type: 'button', isDisabled: !isLoaded, className: 'be-btn-sort' },
            React.createElement(IconSort, null)
        ),
        React.createElement(
            Menu,
            { className: 'be-menu-sort' },
            getMenuItem(SORT_NAME, FIELD_NAME, SORT_ASC, sortBy, sortDirection, onSortChange),
            getMenuItem(SORT_NAME, FIELD_NAME, SORT_DESC, sortBy, sortDirection, onSortChange),
            getMenuItem(SORT_DATE, isRecents ? FIELD_INTERACTED_AT : FIELD_MODIFIED_AT, SORT_ASC, sortBy, sortDirection, onSortChange),
            getMenuItem(SORT_DATE, isRecents ? FIELD_INTERACTED_AT : FIELD_MODIFIED_AT, SORT_DESC, sortBy, sortDirection, onSortChange),
            getMenuItem(SORT_SIZE, FIELD_SIZE, SORT_ASC, sortBy, sortDirection, onSortChange),
            getMenuItem(SORT_SIZE, FIELD_SIZE, SORT_DESC, sortBy, sortDirection, onSortChange)
        )
    );
};

export default Sort;