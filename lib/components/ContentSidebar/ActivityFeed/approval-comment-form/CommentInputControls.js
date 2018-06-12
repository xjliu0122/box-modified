/**
 * 
 * @file Comment Input Controls components for ApprovalCommentForm
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'box-react-ui/lib/components/button/Button';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';

import messages from '../../../messages';

var CommentInputControls = function CommentInputControls(_ref) {
    var onCancel = _ref.onCancel;
    return React.createElement(
        'div',
        { className: 'bcs-comment-input-controls' },
        React.createElement(
            Button,
            { className: 'bcs-comment-input-cancel-btn', onClick: onCancel, type: 'button' },
            React.createElement(FormattedMessage, messages.commentCancel)
        ),
        React.createElement(
            PrimaryButton,
            { className: 'bcs-comment-input-submit-btn' },
            React.createElement(FormattedMessage, messages.commentPost)
        )
    );
};

export default CommentInputControls;