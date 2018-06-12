/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'box-react-ui/lib/components/button/Button';
import DropdownMenu from 'box-react-ui/lib/components/dropdown-menu/DropdownMenu';
import Menu from 'box-react-ui/lib/components/menu/Menu';
import MenuItem from 'box-react-ui/lib/components/menu/MenuItem';
import IconAddThin from 'box-react-ui/lib/icons/general/IconAddThin';
import messages from '../messages';


var Add = function Add(_ref) {
    var onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        isLoaded = _ref.isLoaded,
        _ref$showUpload = _ref.showUpload,
        showUpload = _ref$showUpload === undefined ? true : _ref$showUpload,
        _ref$showCreate = _ref.showCreate,
        showCreate = _ref$showCreate === undefined ? true : _ref$showCreate;
    return React.createElement(
        DropdownMenu,
        { isRightAligned: true, constrainToScrollParent: true },
        React.createElement(
            Button,
            { type: 'button', className: 'be-btn-add', isDisabled: !isLoaded },
            React.createElement(IconAddThin, null)
        ),
        React.createElement(
            Menu,
            null,
            showUpload && React.createElement(
                MenuItem,
                { onClick: onUpload },
                React.createElement(FormattedMessage, messages.upload)
            ),
            showCreate && React.createElement(
                MenuItem,
                { onClick: onCreate },
                React.createElement(FormattedMessage, messages.newFolder)
            )
        )
    );
};

export default Add;