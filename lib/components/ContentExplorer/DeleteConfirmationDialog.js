var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, TYPE_FOLDER } from '../../constants';

var DeleteConfirmationDialog = function DeleteConfirmationDialog(_ref) {
    var isOpen = _ref.isOpen,
        onDelete = _ref.onDelete,
        onCancel = _ref.onCancel,
        item = _ref.item,
        isLoading = _ref.isLoading,
        parentElement = _ref.parentElement,
        appElement = _ref.appElement,
        intl = _ref.intl;

    var message = item.type === TYPE_FOLDER ? messages.deleteDialogFolderText : messages.deleteDialogFileText;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL,
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: intl.formatMessage(messages.deleteDialogLabel),
            appElement: appElement
        },
        React.createElement(FormattedMessage, _extends({}, message, { values: { name: item.name } })),
        React.createElement(
            'div',
            { className: 'be-modal-btns' },
            React.createElement(
                PrimaryButton,
                { type: 'button', onClick: onDelete, isLoading: isLoading },
                React.createElement(FormattedMessage, messages.delete)
            ),
            React.createElement(
                Button,
                { type: 'button', onClick: onCancel, isDisabled: isLoading, autoFocus: true },
                React.createElement(FormattedMessage, messages.cancel)
            )
        )
    );
};

export default injectIntl(DeleteConfirmationDialog);