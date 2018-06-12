/**
 * 
 * @file CommentInlineError component used by Comment component.
 */

import * as React from 'react';

import InlineError from 'box-react-ui/lib/components/inline-error';
import PlainButton from 'box-react-ui/lib/components/plain-button';

var CommentInlineError = function CommentInlineError(_ref) {
    var action = _ref.action,
        message = _ref.message,
        title = _ref.title;
    return React.createElement(
        InlineError,
        { className: 'bcs-comment-error', title: title },
        React.createElement(
            'div',
            null,
            message
        ),
        action ? React.createElement(
            PlainButton,
            { className: 'lnk bcs-comment-error-action', onClick: action.onAction, type: 'button' },
            action.text
        ) : null
    );
};

export default CommentInlineError;