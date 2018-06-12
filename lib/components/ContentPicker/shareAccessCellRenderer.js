/**
 * 
 * @file Function to render the share access table cell
 * @author Box
 */

import React from 'react';
import isRowSelectable from './cellRendererHelper';
import ShareAccessSelect from '../ShareAccessSelect';

export default (function (onChange, canSetShareAccess, selectableType, extensionsWhitelist, hasHitSelectionLimit) {
    return function (_ref) {
        var rowData = _ref.rowData;

        if (!isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, rowData)) {
            return React.createElement('span', null);
        }

        return React.createElement(ShareAccessSelect, {
            className: 'bcp-shared-access-select',
            canSetShareAccess: canSetShareAccess,
            onChange: onChange,
            item: rowData
        });
    };
});