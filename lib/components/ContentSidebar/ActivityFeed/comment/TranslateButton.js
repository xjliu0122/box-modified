/**
 * 
 * @file Translate button component used by Comment Text component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import PlainButton from 'box-react-ui/lib/components/plain-button';

import messages from '../../../messages';

var TranslateButton = function TranslateButton(_ref) {
    var handleTranslate = _ref.handleTranslate;
    return React.createElement(
        PlainButton,
        { className: 'bcs-comment-translate', onClick: handleTranslate },
        React.createElement(FormattedMessage, messages.commentTranslate)
    );
};

export default TranslateButton;