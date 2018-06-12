var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Content Explorer Create Folder Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var CreateFolderDialog = function CreateFolderDialog(_ref) {
    var isOpen = _ref.isOpen,
        onCreate = _ref.onCreate,
        onCancel = _ref.onCancel,
        isLoading = _ref.isLoading,
        errorCode = _ref.errorCode,
        parentElement = _ref.parentElement,
        appElement = _ref.appElement,
        intl = _ref.intl;

    var textInput = null;
    var error = void 0;

    /**
     * Appends the extension and calls rename function
     */
    var create = function create() {
        if (textInput && textInput.value) {
            onCreate(textInput.value);
        }
    };

    /**
     * Grabs reference to the input element
     */
    var ref = function ref(input) {
        textInput = input;
        if (textInput instanceof HTMLInputElement) {
            textInput.focus();
            textInput.select();
        }
    };

    /**
     * Handles enter key down
     */
    var onKeyDown = function onKeyDown(_ref2) {
        var key = _ref2.key;

        switch (key) {
            case 'Enter':
                create();
                break;
            default:
                break;
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = messages.createDialogErrorInUse;
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = messages.createDialogErrorTooLong;
            break;
        default:
            error = errorCode ? messages.createDialogErrorInvalid : null;
            break;
    }

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
            contentLabel: intl.formatMessage(messages.createDialogLabel),
            appElement: appElement
        },
        React.createElement(
            'label',
            null,
            error ? React.createElement(
                'div',
                { className: 'be-modal-error' },
                React.createElement(FormattedMessage, error)
            ) : null,
            React.createElement(FormattedMessage, _extends({ tagName: 'div' }, messages.createDialogText)),
            React.createElement('input', { type: 'text', required: true, ref: ref, onKeyDown: onKeyDown })
        ),
        React.createElement(
            'div',
            { className: 'be-modal-btns' },
            React.createElement(
                PrimaryButton,
                { type: 'button', onClick: create, isLoading: isLoading },
                React.createElement(FormattedMessage, messages.create)
            ),
            React.createElement(
                Button,
                { type: 'button', onClick: onCancel, isDisabled: isLoading },
                React.createElement(FormattedMessage, messages.cancel)
            )
        )
    );
};

export default injectIntl(CreateFolderDialog);