var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import noop from 'lodash/noop';
import { injectIntl, FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import ShareAccessSelect from '../ShareAccessSelect';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';

var ShareDialog = function ShareDialog(_ref) {
    var isOpen = _ref.isOpen,
        canSetShareAccess = _ref.canSetShareAccess,
        onShareAccessChange = _ref.onShareAccessChange,
        onCancel = _ref.onCancel,
        item = _ref.item,
        isLoading = _ref.isLoading,
        parentElement = _ref.parentElement,
        appElement = _ref.appElement,
        intl = _ref.intl;

    var textInput = null;

    var copy = function copy() {
        if (textInput instanceof HTMLInputElement) {
            textInput.select();
            document.execCommand('copy');
        }
    };

    var sharedLink = item.shared_link;

    var _ref2 = sharedLink || {
        url: intl.formatMessage(messages.shareDialogNone)
    },
        url = _ref2.url;

    /* eslint-disable jsx-a11y/label-has-for */


    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' be-modal-share',
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: intl.formatMessage(messages.shareDialogLabel),
            appElement: appElement
        },
        React.createElement(
            'div',
            { className: 'be-modal-content' },
            React.createElement(
                'label',
                null,
                React.createElement(FormattedMessage, _extends({ tagName: 'div' }, messages.shareDialogText)),
                React.createElement(
                    'span',
                    null,
                    React.createElement('input', {
                        type: 'text',
                        onChange: noop,
                        ref: function ref(input) {
                            textInput = input;
                        },
                        value: url
                    }),
                    React.createElement(
                        PrimaryButton,
                        { type: 'button', className: 'be-modal-button-copy', onClick: copy, autoFocus: true },
                        React.createElement(FormattedMessage, messages.copy)
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'be-modal-btns' },
            React.createElement(ShareAccessSelect, {
                className: 'bce-shared-access-select',
                canSetShareAccess: canSetShareAccess,
                onChange: onShareAccessChange,
                item: item
            }),
            React.createElement(
                Button,
                { type: 'button', onClick: onCancel, isLoading: isLoading },
                React.createElement(FormattedMessage, messages.close)
            )
        )
    );
};

export default injectIntl(ShareDialog);