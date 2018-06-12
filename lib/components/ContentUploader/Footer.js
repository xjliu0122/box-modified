var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Footer component
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { ERROR_CODE_UPLOAD_FILE_LIMIT } from '../../constants';


var Footer = function Footer(_ref) {
    var isLoading = _ref.isLoading,
        hasFiles = _ref.hasFiles,
        errorCode = _ref.errorCode,
        onCancel = _ref.onCancel,
        onClose = _ref.onClose,
        onUpload = _ref.onUpload,
        fileLimit = _ref.fileLimit;

    var message = void 0;
    switch (errorCode) {
        case ERROR_CODE_UPLOAD_FILE_LIMIT:
            message = React.createElement(FormattedMessage, _extends({}, messages.uploadErrorTooManyFiles, { values: { fileLimit: fileLimit } }));
            break;
        default:
        // ignore
    }

    return React.createElement(
        'div',
        { className: 'bcu-footer' },
        React.createElement(
            'div',
            { className: 'bcu-footer-left' },
            onClose ? React.createElement(
                Button,
                { type: 'button', isDisabled: hasFiles, onClick: onClose },
                React.createElement(FormattedMessage, messages.close)
            ) : null
        ),
        message && React.createElement(
            'div',
            { className: 'bcu-footer-message' },
            message
        ),
        React.createElement(
            'div',
            { className: 'bcu-footer-right' },
            React.createElement(
                Button,
                { type: 'button', isDisabled: !hasFiles, onClick: onCancel },
                React.createElement(FormattedMessage, messages.cancelUploads)
            ),
            React.createElement(
                PrimaryButton,
                { type: 'button', isDisabled: !hasFiles, isLoading: isLoading, onClick: onUpload },
                React.createElement(FormattedMessage, messages.upload)
            )
        )
    );
};

export default Footer;