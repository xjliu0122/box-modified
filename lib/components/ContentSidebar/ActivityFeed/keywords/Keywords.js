/**
 * 
 * @file Keywords components
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Info from './Info';
import messages from '../../../messages';

function getMessageForAction(action) {
    switch (action) {
        case 'applied':
            return React.createElement(FormattedMessage, messages.keywordsApplied);
        default:
            return null;
    }
}

var Keywords = function Keywords(_ref) {
    var action = _ref.action,
        words = _ref.words;
    return React.createElement(
        'div',
        { className: 'bcs-keywords' },
        React.createElement(
            'span',
            { className: 'bcs-keywords-message' },
            getMessageForAction(action)
        ),
        words ? React.createElement(Info, { words: words }) : null
    );
};

export default Keywords;