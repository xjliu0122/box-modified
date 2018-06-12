var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Editable transcript row component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';


var EditingTranscriptRow = function EditingTranscriptRow(_ref) {
    var time = _ref.time,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        onSave = _ref.onSave,
        onCancel = _ref.onCancel,
        onChange = _ref.onChange;
    return React.createElement(
        'div',
        { className: 'be-transcript-row be-transcript-editing-row' },
        time && React.createElement(
            'div',
            { className: 'be-transcript-time' },
            time
        ),
        React.createElement(
            'div',
            { className: 'be-transcript-text' },
            React.createElement(TextareaAutosize, { maxRows: 10, onChange: onChange, value: text }),
            React.createElement(
                'div',
                { className: 'be-transcript-buttons' },
                React.createElement(
                    Button,
                    { type: 'button', onClick: onCancel },
                    React.createElement(FormattedMessage, _extends({}, messages.cancel, { 'data-resin-target': SKILLS_TARGETS.TRANSCRIPTS.EDIT_CANCEL }))
                ),
                React.createElement(
                    PrimaryButton,
                    { type: 'button', onClick: onSave },
                    React.createElement(FormattedMessage, _extends({}, messages.save, { 'data-resin-target': SKILLS_TARGETS.TRANSCRIPTS.EDIT_SAVE }))
                )
            )
        )
    );
};

export default EditingTranscriptRow;