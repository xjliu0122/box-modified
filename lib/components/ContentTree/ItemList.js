/**
 * 
 * @file Item list component
 * @author Box
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import cellRenderer from './cellRenderer';
import { FIELD_NAME } from '../../constants';


var ItemList = function ItemList(_ref) {
    var isSmall = _ref.isSmall,
        isLoading = _ref.isLoading,
        onItemClick = _ref.onItemClick,
        onExpanderClick = _ref.onExpanderClick,
        _ref$items = _ref.items,
        items = _ref$items === undefined ? [] : _ref$items,
        tableRef = _ref.tableRef;
    return React.createElement(
        AutoSizer,
        null,
        function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;
            return React.createElement(
                Table,
                {
                    width: width,
                    height: height,
                    disableHeader: true,
                    headerHeight: 0,
                    rowHeight: isSmall ? 30 : 50,
                    rowCount: items.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return items[index];
                    },
                    ref: tableRef
                },
                React.createElement(Column, {
                    dataKey: FIELD_NAME,
                    cellRenderer: cellRenderer(onExpanderClick, onItemClick, isSmall, isLoading),
                    width: 300,
                    flexGrow: 1
                })
            );
        }
    );
};

export default ItemList;