/**
 * 
 * @file Read only transcript row component
 * @author Box
 */

import * as React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';

var ReadOnlyTranscriptRow = function ReadOnlyTranscriptRow(_ref) {
    var time = _ref.time,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        onClick = _ref.onClick,
        interactionTarget = _ref.interactionTarget;
    return React.createElement(
        PlainButton,
        { type: 'button', className: 'be-transcript-row', 'data-resin-target': interactionTarget, onClick: onClick },
        time && React.createElement(
            'div',
            { className: 'be-transcript-time' },
            time
        ),
        React.createElement(
            'div',
            { className: 'be-transcript-text' },
            text
        )
    );
};

export default ReadOnlyTranscriptRow;