/**
 * 
 * @file CompletedAssignment component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconCheck from 'box-react-ui/lib/icons/general/IconCheck';

import messages from '../../../messages';

var CompletedAssignment = function CompletedAssignment(_ref) {
    var name = _ref.name;
    return React.createElement(
        'div',
        { className: 'bcs-task-completed-assignment' },
        React.createElement(
            'div',
            { className: 'bcs-task-assignment-name' },
            name
        ),
        React.createElement(
            'div',
            { className: 'bcs-task-assignment-actions' },
            React.createElement(IconCheck, {
                className: 'bcs-task-check-icon',
                height: 18,
                title: React.createElement(FormattedMessage, messages.completedAssignment),
                width: 18
            })
        )
    );
};

export default CompletedAssignment;