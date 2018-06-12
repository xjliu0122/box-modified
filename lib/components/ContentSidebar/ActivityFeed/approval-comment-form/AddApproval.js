/**
 * 
 * @file AddApproval component for ApprovalCommentForm component
 */

import * as React from 'react';
import { injectIntl } from 'react-intl';

import Checkbox from 'box-react-ui/lib/components/checkbox/Checkbox';

import AddApprovalFields from './AddApprovalFields';
import messages from '../../../messages';

var AddApproval = function AddApproval(_ref) {
    var approvalDate = _ref.approvalDate,
        approvers = _ref.approvers,
        approverSelectorContacts = _ref.approverSelectorContacts,
        approverSelectorError = _ref.approverSelectorError,
        isAddApprovalVisible = _ref.isAddApprovalVisible,
        onApprovalDateChange = _ref.onApprovalDateChange,
        onApproverSelectorInput = _ref.onApproverSelectorInput,
        onApproverSelectorRemove = _ref.onApproverSelectorRemove,
        onApproverSelectorSelect = _ref.onApproverSelectorSelect,
        intl = _ref.intl;
    return React.createElement(
        'div',
        { className: 'bcs-comment-add-approver' },
        React.createElement(Checkbox, {
            className: 'bcs-comment-add-approver-checkbox',
            label: intl.formatMessage(messages.approvalAddTask),
            name: 'addApproval',
            isChecked: isAddApprovalVisible,
            tooltip: intl.formatMessage(messages.approvalAddTaskTooltip)
        }),
        isAddApprovalVisible ? React.createElement(AddApprovalFields, {
            approvalDate: approvalDate,
            approvers: approvers,
            approverSelectorContacts: approverSelectorContacts,
            approverSelectorError: approverSelectorError,
            onApproverSelectorInput: onApproverSelectorInput,
            onApproverSelectorRemove: onApproverSelectorRemove,
            onApproverSelectorSelect: onApproverSelectorSelect,
            onApprovalDateChange: onApprovalDateChange
        }) : null
    );
};

export default injectIntl(AddApproval);