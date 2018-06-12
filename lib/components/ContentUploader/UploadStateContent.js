/**
 * 
 * @file Upload state content component
 */

import React from 'react';

/* eslint-disable jsx-a11y/label-has-for */
var UploadStateContent = function UploadStateContent(_ref) {
    var message = _ref.message,
        inputLabel = _ref.inputLabel,
        _ref$useButton = _ref.useButton,
        useButton = _ref$useButton === undefined ? false : _ref$useButton,
        onChange = _ref.onChange;

    var messageContent = message ? React.createElement(
        'div',
        { className: 'bcu-upload-state-message' },
        message
    ) : null;
    var inputLabelClass = useButton ? 'btn btn-primary be-input-btn' : 'be-input-link';

    var handleChange = function handleChange(event) {
        if (!onChange) {
            return;
        }

        onChange(event);

        var currentTarget = event.currentTarget;
        // resets the file input selection
        currentTarget.value = '';
    };

    var inputContent = React.createElement(
        'label',
        { className: inputLabelClass },
        inputLabel,
        React.createElement('input', { className: 'be-input', multiple: true, type: 'file', onChange: handleChange })
    );

    return React.createElement(
        'div',
        null,
        messageContent,
        inputLabel ? inputContent : null
    );
};
/* eslint-enable jsx-a11y/label-has-for */

export default UploadStateContent;