/**
 * 
 * @file Function to render the progress table cell
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ItemProgress from './ItemProgress';
import { STATUS_ERROR, STATUS_IN_PROGRESS } from '../../constants';

import messages from '../messages';

/**
 * Get error message for a specific error code
 *
 * @param {string} [errorCode]
 * @returns {FormattedMessage}
 */
var getErrorMessage = function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'file_size_limit_exceeded':
            return React.createElement(FormattedMessage, messages.uploadsFileSizeLimitExceededErrorMessage);
        case 'storage_limit_exceeded':
            return React.createElement(FormattedMessage, messages.uploadsStorageLimitErrorMessage);
        case 'pending_app_folder_size_limit':
            return React.createElement(FormattedMessage, messages.uploadsPendingFolderSizeLimitErrorMessage);
        default:
            return React.createElement(FormattedMessage, messages.uploadsDefaultErrorMessage);
    }
};

export default (function () {
    return function (_ref) {
        var rowData = _ref.rowData;
        var status = rowData.status,
            _rowData$error = rowData.error,
            error = _rowData$error === undefined ? {} : _rowData$error;
        var code = error.code;


        switch (status) {
            case STATUS_IN_PROGRESS:
                return React.createElement(ItemProgress, rowData);
            case STATUS_ERROR:
                return getErrorMessage(code);
            default:
                return null;
        }
    };
});