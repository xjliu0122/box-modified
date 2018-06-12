/**
 * 
 * @file Add Approval Fields component for ApprovalComment component
 */

import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import ContactDatalistItem from 'box-react-ui/lib/components/contact-datalist-item/ContactDatalistItem';
import DatePicker from 'box-react-ui/lib/components/date-picker/DatePicker';
import PillSelectorDropdown from 'box-react-ui/lib/components/pill-selector-dropdown/PillSelectorDropdown';

import messages from '../../../messages';

var AddApprovalFields = function AddApprovalFields(_ref) {
    var approvalDate = _ref.approvalDate,
        approvers = _ref.approvers,
        _ref$approverSelector = _ref.approverSelectorContacts,
        approverSelectorContacts = _ref$approverSelector === undefined ? [] : _ref$approverSelector,
        approverSelectorError = _ref.approverSelectorError,
        onApprovalDateChange = _ref.onApprovalDateChange,
        onApproverSelectorInput = _ref.onApproverSelectorInput,
        onApproverSelectorRemove = _ref.onApproverSelectorRemove,
        onApproverSelectorSelect = _ref.onApproverSelectorSelect,
        intl = _ref.intl;

    var approverOptions = approverSelectorContacts
    // filter selected approvers
    .filter(function (_ref2) {
        var id = _ref2.id;
        return !approvers.find(function (_ref3) {
            var value = _ref3.value;
            return value === id;
        });
    })
    // map to datalist item format
    .map(function (_ref4) {
        var id = _ref4.id,
            item = _ref4.item;
        return {
            login: item.login,
            text: item.name,
            value: id
        };
    });

    return React.createElement(
        'div',
        { className: 'bcs-comment-add-approver-fields-container' },
        React.createElement(
            PillSelectorDropdown,
            {
                error: approverSelectorError,
                label: React.createElement(FormattedMessage, messages.approvalAssignees),
                onInput: onApproverSelectorInput,
                onRemove: onApproverSelectorRemove,
                onSelect: onApproverSelectorSelect,
                placeholder: intl.formatMessage(messages.approvalAddAssignee),
                selectedOptions: approvers,
                selectorOptions: approverOptions
            },
            approverOptions.map(function (_ref5) {
                var login = _ref5.login,
                    text = _ref5.text,
                    value = _ref5.value;
                return React.createElement(ContactDatalistItem, { key: value, name: text, subtitle: login });
            })
        ),
        React.createElement(DatePicker, {
            className: 'bcs-comment-add-approver-date-input',
            label: React.createElement(FormattedMessage, messages.approvalDueDate),
            minDate: new Date(),
            name: 'approverDateInput',
            placeholder: intl.formatMessage(messages.approvalSelectDate),
            onChange: onApprovalDateChange,
            value: approvalDate
        })
    );
};

export default injectIntl(AddApprovalFields);