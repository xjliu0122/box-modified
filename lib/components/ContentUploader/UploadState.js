/**
 * 
 * @file Upload state component
 */

import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ErrorEmptyState from 'box-react-ui/lib/icons/states/ErrorEmptyState';
import UploadStartState from 'box-react-ui/lib/icons/states/UploadStartState';
import UploadSuccessState from 'box-react-ui/lib/icons/states/UploadSuccessState';
import messages from '../messages';
import UploadStateContent from './UploadStateContent';
import { VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../constants';

var UploadState = function UploadState(_ref) {
    var canDrop = _ref.canDrop,
        hasItems = _ref.hasItems,
        isOver = _ref.isOver,
        isTouch = _ref.isTouch,
        view = _ref.view,
        onSelect = _ref.onSelect;

    var icon = void 0;
    var content = void 0;
    /* eslint-disable jsx-a11y/label-has-for */
    switch (view) {
        case VIEW_ERROR:
            icon = React.createElement(ErrorEmptyState, null);
            content = React.createElement(UploadStateContent, { message: React.createElement(FormattedMessage, messages.uploadError) });
            break;
        case VIEW_UPLOAD_EMPTY:
            icon = React.createElement(UploadStartState, null);
            /* eslint-disable no-nested-ternary */
            content = canDrop && hasItems ? React.createElement(UploadStateContent, { message: React.createElement(FormattedMessage, messages.uploadInProgress) }) : isTouch ? React.createElement(UploadStateContent, {
                inputLabel: React.createElement(FormattedMessage, messages.uploadNoDragDrop),
                useButton: true,
                onChange: onSelect
            }) : React.createElement(UploadStateContent, {
                inputLabel: React.createElement(FormattedMessage, messages.uploadEmptyInput),
                message: React.createElement(FormattedMessage, messages.uploadEmpty),
                onChange: onSelect
            });
            /* eslint-enable no-nested-ternary */
            break;
        case VIEW_UPLOAD_IN_PROGRESS:
            icon = React.createElement(UploadStartState, null);
            content = React.createElement(UploadStateContent, { message: React.createElement(FormattedMessage, messages.uploadInProgress) });
            break;
        case VIEW_UPLOAD_SUCCESS:
            icon = React.createElement(UploadSuccessState, null);
            content = React.createElement(UploadStateContent, {
                inputLabel: React.createElement(FormattedMessage, messages.uploadSuccessInput),
                message: React.createElement(FormattedMessage, messages.uploadSuccess),
                useButton: isTouch,
                onChange: onSelect
            });
            break;
        default:
            break;
        /* eslint-enable jsx-a11y/label-has-for */
    }

    var className = classNames('bcu-upload-state', {
        'bcu-is-droppable': isOver && canDrop,
        'bcu-is-not-droppable': isOver && !canDrop,
        'bcu-has-items': hasItems
    });

    return React.createElement(
        'div',
        { className: className },
        React.createElement(
            'div',
            null,
            icon,
            content
        ),
        React.createElement('div', { className: 'bcu-drag-drop-overlay' })
    );
};

export default UploadState;