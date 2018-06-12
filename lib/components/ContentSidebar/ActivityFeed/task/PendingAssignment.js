/**
 * 
 * @file PendingAssignment component
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import IconCheck from 'box-react-ui/lib/icons/general/IconCheck';
import IconClose from 'box-react-ui/lib/icons/general/IconClose';
import PlainButton from 'box-react-ui/lib/components/plain-button';
import Tooltip from 'box-react-ui/lib/components/tooltip';

import messages from '../../../messages';

var PendingAssignment = function PendingAssignment(_ref) {
    var name = _ref.name,
        onTaskApproval = _ref.onTaskApproval,
        onTaskReject = _ref.onTaskReject,
        shouldShowActions = _ref.shouldShowActions;
    return React.createElement(
        'div',
        { className: 'bcs-task-pending-assignment' },
        React.createElement(
            'div',
            { className: 'bcs-task-assignment-name' },
            name
        ),
        shouldShowActions ? React.createElement(
            'div',
            { className: 'bcs-task-assignment-actions' },
            React.createElement(
                Tooltip,
                { position: 'bottom-center', text: React.createElement(FormattedMessage, messages.taskApprove) },
                React.createElement(
                    PlainButton,
                    { className: 'bcs-task-check-btn', onClick: onTaskApproval },
                    React.createElement(IconCheck, { className: 'bcs-task-check-icon', height: 18, width: 18 })
                )
            ),
            React.createElement(
                Tooltip,
                { position: 'bottom-center', text: React.createElement(FormattedMessage, messages.taskReject) },
                React.createElement(
                    PlainButton,
                    { className: 'bcs-task-x-btn', onClick: onTaskReject },
                    React.createElement(IconClose, { className: 'bcs-task-x-icon', height: 18, width: 18 })
                )
            )
        ) : null
    );
};

export default PendingAssignment;