/**
 * 
 * @file Overall uploads progress bar
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import ProgressBar from './ProgressBar';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, VIEW_ERROR, VIEW_UPLOAD_EMPTY } from '../../constants';

/**
 * Get upload status
 *
 * @param {View} view
 * @return {FormattedMessage|string}
 */
var getUploadStatus = function getUploadStatus(view) {
    switch (view) {
        case VIEW_UPLOAD_IN_PROGRESS:
            return React.createElement(FormattedMessage, messages.uploadsManagerUploadInProgress);
        case VIEW_UPLOAD_SUCCESS:
        case VIEW_UPLOAD_EMPTY:
            return React.createElement(FormattedMessage, messages.uploadsManagerUploadComplete);
        case VIEW_ERROR:
            return React.createElement(FormattedMessage, messages.uploadsManagerUploadFailed);
        default:
            return '';
    }
};

var getPercent = function getPercent(view, percent) {
    if (view === VIEW_UPLOAD_SUCCESS || view === VIEW_UPLOAD_EMPTY) {
        return 100;
    } else if (view === VIEW_ERROR) {
        return 0;
    }

    return percent;
};

var OverallUploadsProgressBar = function OverallUploadsProgressBar(_ref) {
    var percent = _ref.percent,
        view = _ref.view,
        onClick = _ref.onClick,
        onKeyDown = _ref.onKeyDown,
        isVisible = _ref.isVisible;
    return React.createElement(
        'div',
        {
            className: 'bcu-overall-progress-bar',
            onClick: onClick,
            onKeyDown: onKeyDown,
            role: 'button',
            tabIndex: isVisible ? '0' : '-1'
        },
        React.createElement(
            'span',
            { className: 'bcu-upload-status' },
            getUploadStatus(view)
        ),
        React.createElement(ProgressBar, { percent: getPercent(view, percent) }),
        React.createElement('span', { className: 'bcu-uploads-manager-toggle' })
    );
};

export default OverallUploadsProgressBar;