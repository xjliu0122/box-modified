var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Component for the sub details for the item name
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import getSize from '../../util/size';
import Datefield from '../Date';
import messages from '../messages';
import { VIEW_RECENTS } from '../../constants';

var ItemSubDetails = function ItemSubDetails(_ref) {
    var view = _ref.view,
        item = _ref.item;
    var _item$modified_at = item.modified_at,
        modified_at = _item$modified_at === undefined ? '' : _item$modified_at,
        _item$interacted_at = item.interacted_at,
        interacted_at = _item$interacted_at === undefined ? '' : _item$interacted_at,
        modified_by = item.modified_by;

    var modifiedBy = modified_by ? modified_by.name || '' : '';
    var isRecents = view === VIEW_RECENTS;
    var date = isRecents ? interacted_at || modified_at : modified_at;
    var size = item.size;

    var DateValue = React.createElement(Datefield, { date: date, omitCommas: true });

    var message = messages.modifiedDateBy;
    if (isRecents) {
        message = messages.interactedDate;
    } else if (!modifiedBy) {
        message = messages.modifiedDate;
    }

    return React.createElement(
        'span',
        null,
        React.createElement(FormattedMessage, _extends({}, message, {
            values: {
                date: DateValue,
                name: modifiedBy
            }
        })),
        React.createElement(
            'span',
            null,
            '\xA0-\xA0',
            getSize(size)
        )
    );
};

export default ItemSubDetails;