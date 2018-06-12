/**
 * 
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import { TYPE_FOLDER, TYPE_WEBLINK } from '../../constants';

var ItemName = function ItemName(_ref) {
    var item = _ref.item,
        onClick = _ref.onClick,
        onFocus = _ref.onFocus,
        canPreview = _ref.canPreview,
        isTouch = _ref.isTouch;
    var name = item.name,
        type = item.type;

    var onItemFocus = onFocus ? function () {
        return onFocus(item);
    } : null;
    var onItemClick = function onItemClick() {
        return onClick(item);
    };

    return type === TYPE_FOLDER || !isTouch && (type === TYPE_WEBLINK || canPreview) ? React.createElement(
        PlainButton,
        { type: 'button', className: 'be-item-label', onFocus: onItemFocus, onClick: onItemClick },
        name
    ) : React.createElement(
        'span',
        { className: 'be-item-label' },
        name
    );
};

export default ItemName;