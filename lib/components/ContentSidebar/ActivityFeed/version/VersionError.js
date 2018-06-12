/**
 * 
 * @file Version Error component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../../../messages';

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'tooManyVersions':
            return React.createElement(FormattedMessage, messages.versionTooManyVersions);
        default:
            return null;
    }
}

var VersionError = function VersionError(_ref) {
    var errorCode = _ref.errorCode;
    return React.createElement(
        'div',
        { className: 'bcs-version error' },
        React.createElement(
            'span',
            { className: 'bcs-version-message' },
            getErrorMessage(errorCode)
        )
    );
};

export default VersionError;