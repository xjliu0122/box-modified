/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { injectIntl } from 'react-intl';
import ContentUploader from '../ContentUploader';
import messages from '../messages';
import { CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var UploadDialog = function UploadDialog(_ref) {
    var isOpen = _ref.isOpen,
        currentFolderId = _ref.currentFolderId,
        token = _ref.token,
        sharedLink = _ref.sharedLink,
        sharedLinkPassword = _ref.sharedLinkPassword,
        apiHost = _ref.apiHost,
        uploadHost = _ref.uploadHost,
        onClose = _ref.onClose,
        parentElement = _ref.parentElement,
        appElement = _ref.appElement,
        onUpload = _ref.onUpload,
        requestInterceptor = _ref.requestInterceptor,
        responseInterceptor = _ref.responseInterceptor,
        intl = _ref.intl;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' be-modal-upload',
            className: CLASS_MODAL_CONTENT_FULL_BLEED,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onClose,
            contentLabel: intl.formatMessage(messages.upload),
            appElement: appElement
        },
        React.createElement(ContentUploader, {
            rootFolderId: currentFolderId,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            onClose: onClose,
            onComplete: onUpload,
            requestInterceptor: requestInterceptor,
            responseInterceptor: responseInterceptor
        })
    );
};

export default injectIntl(UploadDialog);