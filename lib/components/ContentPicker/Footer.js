/**
 * 
 * @file Footer list component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import messages from '../messages';


var Footer = function Footer(_ref) {
    var selectedCount = _ref.selectedCount,
        onSelectedClick = _ref.onSelectedClick,
        hasHitSelectionLimit = _ref.hasHitSelectionLimit,
        onCancel = _ref.onCancel,
        onChoose = _ref.onChoose,
        chooseButtonLabel = _ref.chooseButtonLabel,
        cancelButtonLabel = _ref.cancelButtonLabel;
    return React.createElement(
        'div',
        { className: 'bcp-footer' },
        React.createElement(
            'div',
            { className: 'bcp-footer-left' },
            React.createElement(
                PlainButton,
                { type: 'button', onClick: onSelectedClick },
                React.createElement(
                    'span',
                    { className: 'bcp-selected-count' },
                    selectedCount
                ),
                '\xA0',
                React.createElement(FormattedMessage, messages.selected)
            ),
            '\xA0',
            hasHitSelectionLimit ? React.createElement(
                'span',
                { className: 'bcp-selected-max' },
                React.createElement(FormattedMessage, messages.max)
            ) : null
        ),
        React.createElement(
            'div',
            { className: 'bcp-footer-right' },
            React.createElement(
                Button,
                { type: 'button', onClick: onCancel },
                cancelButtonLabel || React.createElement(FormattedMessage, messages.cancel)
            ),
            React.createElement(
                PrimaryButton,
                { type: 'button', onClick: onChoose },
                chooseButtonLabel || React.createElement(FormattedMessage, messages.choose)
            )
        )
    );
};

export default Footer;