var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Info component used by Keywords component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconInfoInverted from 'box-react-ui/lib/icons/general/IconInfoInverted';
import Tooltip from 'box-react-ui/lib/components/tooltip';

import messages from '../../../messages';

var Info = function Info(_ref) {
    var words = _ref.words;
    return React.createElement(
        'span',
        { className: 'bcs-keywords-actions' },
        React.createElement(
            Tooltip,
            {
                className: 'bcs-keywords-actions-tooltip',
                position: 'bottom-left',
                text: React.createElement(FormattedMessage, _extends({}, messages.keywordsList, { values: { words: words } }))
            },
            React.createElement(
                'div',
                { className: 'bcs-keywords-info' },
                React.createElement(IconInfoInverted, { height: 16, width: 16 })
            )
        )
    );
};

export default Info;