/**
 * 
 * @file Show Original button component used by Comment Text component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import PlainButton from 'box-react-ui/lib/components/plain-button';

import messages from '../../../messages';

var ShowOriginalButton = function ShowOriginalButton(_ref) {
    var handleShowOriginal = _ref.handleShowOriginal;
    return React.createElement(
        PlainButton,
        { className: 'bcs-comment-translate', onClick: handleShowOriginal },
        React.createElement(FormattedMessage, messages.commentShowOriginal)
    );
};

export default ShowOriginalButton;