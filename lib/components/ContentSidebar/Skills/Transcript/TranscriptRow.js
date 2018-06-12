/**
 * 
 * @file Transcript row component
 * @author Box
 */

import React from 'react';
import { formatTime } from 'box-react-ui/lib/utils/datetime';
import ReadOnlyTranscriptRow from './ReadOnlyTranscriptRow';
import EditingTranscriptRow from './EditingTranscriptRow';
import { isValidTimeSlice } from './timeSliceUtils';

var TranscriptRow = function TranscriptRow(_ref) {
    var appears = _ref.appears,
        text = _ref.text,
        isEditing = _ref.isEditing,
        onClick = _ref.onClick,
        onSave = _ref.onSave,
        onCancel = _ref.onCancel,
        onChange = _ref.onChange,
        interactionTarget = _ref.interactionTarget;

    var isValid = isValidTimeSlice(appears) && Array.isArray(appears) && appears.length === 1;
    var timeSlice = appears;
    var start = isValid ? formatTime(timeSlice[0].start) : undefined;

    return isEditing ? React.createElement(EditingTranscriptRow, { onSave: onSave, onCancel: onCancel, onChange: onChange, time: start, text: text }) : React.createElement(ReadOnlyTranscriptRow, { interactionTarget: interactionTarget, onClick: onClick, time: start, text: text });
};

export default TranscriptRow;