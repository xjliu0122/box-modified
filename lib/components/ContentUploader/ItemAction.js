/**
 * 
 * @file Item action component
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import Tooltip from 'box-react-ui/lib/components/tooltip';
import IconCheck from 'box-react-ui/lib/icons/general/IconCheck';
import IconClose from 'box-react-ui/lib/icons/general/IconClose';
import IconRetry from 'box-react-ui/lib/icons/general/IconRetry';
import IconInProgress from './IconInProgress';
import messages from '../messages';
import { STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR } from '../../constants';

var ICON_CHECK_COLOR = '#26C281';

var ItemAction = function ItemAction(_ref) {
    var status = _ref.status,
        onClick = _ref.onClick,
        intl = _ref.intl;

    var icon = React.createElement(IconClose, null);
    var tooltip = intl.formatMessage(messages.uploadsCancelButtonTooltip);

    switch (status) {
        case STATUS_COMPLETE:
            icon = React.createElement(IconCheck, { color: ICON_CHECK_COLOR });
            tooltip = intl.formatMessage(messages.remove);
            break;
        case STATUS_ERROR:
            icon = React.createElement(IconRetry, null);
            tooltip = intl.formatMessage(messages.retry);
            break;
        case STATUS_IN_PROGRESS:
            icon = React.createElement(IconInProgress, null);
            break;
        case STATUS_PENDING:
        default:
        // empty
    }

    return React.createElement(
        'div',
        { className: 'bcu-item-action' },
        React.createElement(
            Tooltip,
            { text: tooltip, position: 'top-left' },
            React.createElement(
                PlainButton,
                { type: 'button', onClick: onClick },
                icon
            )
        )
    );
};

export default injectIntl(ItemAction);