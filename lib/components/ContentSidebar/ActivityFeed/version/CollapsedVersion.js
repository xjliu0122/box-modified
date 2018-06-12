var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Collapsed Version component
 */

import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import PlainButton from 'box-react-ui/lib/components/plain-button';
import IconInfoInverted from 'box-react-ui/lib/icons/general/IconInfoInverted';

import messages from '../../../messages';

function getMessageForAction(action, collaborators, version_start, version_end) {
    // We only support collapsing for multiple upload versions
    if (action !== 'upload') {
        return null;
    }
    var collaboratorIDs = Object.keys(collaborators);
    var numberOfCollaborators = collaboratorIDs.length;

    var versionRange = React.createElement(
        'span',
        { className: 'bcs-version-range' },
        version_start,
        ' - ',
        version_end
    );

    if (numberOfCollaborators === 1) {
        var collaborator = collaborators[collaboratorIDs[0]];
        return React.createElement(FormattedMessage, _extends({}, messages.versionUploadCollapsed, {
            values: {
                name: React.createElement(
                    'strong',
                    null,
                    collaborator.name
                ),
                versions: versionRange
            }
        }));
    }

    return React.createElement(FormattedMessage, _extends({}, messages.versionMultipleUsersUploaded, {
        values: {
            numberOfCollaborators: numberOfCollaborators,
            versions: versionRange
        }
    }));
}

var CollapsedVersion = function CollapsedVersion(_ref) {
    var action = _ref.action,
        collaborators = _ref.collaborators,
        intl = _ref.intl,
        onInfo = _ref.onInfo,
        versions = _ref.versions,
        version_start = _ref.version_start,
        version_end = _ref.version_end;
    return React.createElement(
        'div',
        { className: 'bcs-collapsed-version' },
        React.createElement(
            'span',
            { className: 'bcs-version-message' },
            getMessageForAction(action, collaborators, version_start, version_end)
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
                        onInfo({ versions: versions });
                    },
                    type: 'button'
                },
                React.createElement(IconInfoInverted, { height: 16, width: 16 })
            )
        ) : null
    );
};

export { CollapsedVersion as CollapsedVersionBase };
export default injectIntl(CollapsedVersion);