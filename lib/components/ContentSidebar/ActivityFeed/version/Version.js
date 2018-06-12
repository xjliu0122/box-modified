var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Version component
 */

import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import PlainButton from 'box-react-ui/lib/components/plain-button';
import IconInfoInverted from 'box-react-ui/lib/icons/general/IconInfoInverted';

import messages from '../../../messages';

function getMessageForAction(name, action, version_number) {
    switch (action) {
        case 'upload':
            return React.createElement(FormattedMessage, _extends({}, messages.versionUploaded, {
                values: {
                    name: React.createElement(
                        'strong',
                        null,
                        name
                    ),
                    version_number: version_number
                }
            }));
        case 'delete':
            return React.createElement(FormattedMessage, _extends({}, messages.versionDeleted, {
                values: {
                    name: React.createElement(
                        'strong',
                        null,
                        name
                    ),
                    version_number: version_number
                }
            }));
        case 'restore':
            return React.createElement(FormattedMessage, _extends({}, messages.versionRestored, {
                values: {
                    name: React.createElement(
                        'strong',
                        null,
                        name
                    ),
                    version_number: version_number
                }
            }));
        default:
            return null;
    }
}

var Version = function Version(_ref) {
    var action = _ref.action,
        modified_by = _ref.modified_by,
        id = _ref.id,
        intl = _ref.intl,
        onInfo = _ref.onInfo,
        version_number = _ref.version_number;
    return React.createElement(
        'div',
        { className: 'bcs-version' },
        React.createElement(
            'span',
            { className: 'bcs-version-message' },
            getMessageForAction(modified_by.name, action, version_number)
        ),
        onInfo ? React.createElement(
            'span',
            { className: 'bcs-version-actions' },
            React.createElement(
                PlainButton,
                {
                    'aria-label': intl.formatMessage(messages.getVersionInfo),
                    className: 'bcs-version-info',
                    onClick: function onClick() {
                        onInfo({ id: id, version_number: version_number });
                    },
                    type: 'button'
                },
                React.createElement(IconInfoInverted, { height: 16, width: 16 })
            )
        ) : null
    );
};

export { Version as VersionBase };
export default injectIntl(Version);