/**
 * 
 * @file Preview header component
 * @author Box
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconClose from 'box-react-ui/lib/icons/general/IconClose';
import IconPrint from 'box-react-ui/lib/icons/general/IconPrint';
import IconDownload from 'box-react-ui/lib/icons/general/IconDownloadSolid';
import messages from '../messages';
import { getIcon } from '../Item/iconCellRenderer';
import { COLOR_999 } from '../../constants';

var Header = function Header(_ref) {
    var file = _ref.file,
        onClose = _ref.onClose,
        onPrint = _ref.onPrint,
        canDownload = _ref.canDownload,
        onDownload = _ref.onDownload,
        intl = _ref.intl;

    var name = file ? file.name : '';
    var closeMsg = intl.formatMessage(messages.close);
    var printMsg = intl.formatMessage(messages.print);
    var downloadMsg = intl.formatMessage(messages.download);

    return React.createElement(
        'div',
        { className: 'bcpr-header' },
        React.createElement(
            'div',
            { className: 'bcpr-name' },
            file ? getIcon(24, file) : null,
            React.createElement(
                'span',
                null,
                name
            )
        ),
        React.createElement(
            'div',
            { className: 'bcpr-btns' },
            canDownload && React.createElement(
                PlainButton,
                {
                    type: 'button',
                    className: 'bcpr-btn',
                    onClick: onPrint,
                    title: printMsg,
                    'aria-label': printMsg
                },
                React.createElement(IconPrint, { color: COLOR_999, width: 22, height: 22 })
            ),
            canDownload && React.createElement(
                PlainButton,
                {
                    type: 'button',
                    className: 'bcpr-btn',
                    onClick: onDownload,
                    title: downloadMsg,
                    'aria-label': downloadMsg
                },
                React.createElement(IconDownload, { color: COLOR_999, width: 18, height: 18 })
            ),
            onClose && React.createElement(
                PlainButton,
                {
                    type: 'button',
                    className: 'bcpr-btn',
                    onClick: onClose,
                    title: closeMsg,
                    'aria-label': closeMsg
                },
                React.createElement(IconClose, { color: COLOR_999, width: 24, height: 24 })
            )
        )
    );
};

export default injectIntl(Header);