/**
 * 
 * @file Component for Activity feed empty state
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator/LoadingIndicator';
import IconActivityFeedEmptyState from '../icons';

import messages from '../../../messages';

var EmptyState = function EmptyState(_ref) {
    var isLoading = _ref.isLoading,
        showCommentMessage = _ref.showCommentMessage;
    return React.createElement(
        'div',
        { className: 'bcs-activity-feed-empty-state' },
        React.createElement(IconActivityFeedEmptyState, null),
        isLoading ? React.createElement(LoadingIndicator, null) : React.createElement(
            'div',
            { className: 'bcs-empty-state-cta' },
            React.createElement(FormattedMessage, messages.noActivity),
            showCommentMessage ? React.createElement(FormattedMessage, messages.noActivityCommentPrompt) : null
        )
    );
};

export default EmptyState;