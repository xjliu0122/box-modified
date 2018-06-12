var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Content Explorer Rename Dialog
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
var RenameDialog = function RenameDialog(_ref) {
    var isOpen = _ref.isOpen,
        onRename = _ref.onRename,
        onCancel = _ref.onCancel,
        item = _ref.item,
        isLoading = _ref.isLoading,
        errorCode = _ref.errorCode,
        parentElement = _ref.parentElement,
        appElement = _ref.appElement,
        intl = _ref.intl;

    var textInput = null;
    var error = void 0;

    var _item$name = item.name,
        name = _item$name === undefined ? '' : _item$name,
        extension = item.extension;

    var ext = extension ? '.' + extension : '';
    var nameWithoutExt = extension ? name.replace(ext, '') : name;

    /**
     * Appends the extension and calls rename function
     */
    var rename = function rename() {
        if (textInput && textInput.value) {
            if (textInput.value === nameWithoutExt) {
                onCancel();
            } else {
                onRename(textInput.value, ext);
            }
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
                rename();
                break;
            default:
                break;
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = messages.renameDialogErrorInUse;
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = messages.renameDialogErrorTooLong;
            break;
        default:
            error = errorCode ? messages.renameDialogErrorInvalid : null;
            break;
    }

    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' be-modal-rename',
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: intl.formatMessage(messages.renameDialogLabel),
            appElement: appElement
        },
        React.createElement(
            'label',
            null,
            error ? React.createElement(
                'div',
                { className: 'be-modal-error' },
                React.createElement(FormattedMessage, _extends({}, error, { values: { name: nameWithoutExt } }))
            ) : null,
            React.createElement(FormattedMessage, _extends({ tagName: 'div' }, messages.renameDialogText, { values: { name: nameWithoutExt } })),
            React.createElement('input', { type: 'text', required: true, ref: ref, defaultValue: nameWithoutExt, onKeyDown: onKeyDown })
        ),
        React.createElement(
            'div',
            { className: 'be-modal-btns' },
            React.createElement(
                PrimaryButton,
                { type: 'button', onClick: rename, isLoading: isLoading },
                React.createElement(FormattedMessage, messages.rename)
            ),
            React.createElement(
                Button,
                { type: 'button', onClick: onCancel, isDisabled: isLoading },
                React.createElement(FormattedMessage, messages.cancel)
            )
        )
    );
};

export default injectIntl(RenameDialog);