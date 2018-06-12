/**
 * 
 * @file RejectedAssignment component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconClose from 'box-react-ui/lib/icons/general/IconClose';

import messages from '../../../messages';

var RejectedAssignment = function RejectedAssignment(_ref) {
    var name = _ref.name;
    return React.createElement(
        'div',
        { className: 'bcs-task-rejected-assignment' },
        React.createElement(
            'div',
            { className: 'bcs-task-assignment-name' },
            name
        ),
        React.createElement(
            'div',
            { className: 'bcs-task-assignment-actions' },
            React.createElement(IconClose, {
                className: 'bcs-task-x-icon',
                height: 18,
                title: React.createElement(FormattedMessage, messages.rejectedAssignment),
                width: 18
            })
        )
    );
};

export default RejectedAssignment;