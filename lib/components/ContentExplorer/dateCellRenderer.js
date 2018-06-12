var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Datefield from '../Date';
import messages from '../messages';
import { FIELD_INTERACTED_AT } from '../../constants';

export default (function () {
    return function (_ref) {
        var dataKey = _ref.dataKey,
            rowData = _ref.rowData;
        var _rowData$modified_at = rowData.modified_at,
            modified_at = _rowData$modified_at === undefined ? '' : _rowData$modified_at,
            _rowData$interacted_a = rowData.interacted_at,
            interacted_at = _rowData$interacted_a === undefined ? '' : _rowData$interacted_a,
            modified_by = rowData.modified_by;

        var modifiedBy = modified_by ? modified_by.name || '' : '';
        var isRecents = dataKey === FIELD_INTERACTED_AT;
        var date = isRecents ? interacted_at || modified_at : modified_at;
        var DateValue = React.createElement(Datefield, { date: date, capitalize: true, omitCommas: true });

        if (isRecents || !modifiedBy) {
            return DateValue;
        }

        return React.createElement(FormattedMessage, _extends({}, messages.nameDate, {
            values: {
                date: DateValue,
                name: modifiedBy
            }
        }));
    };
});