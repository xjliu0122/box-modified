/**
 * 
 * @file Item list component
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import nameCellRenderer from './nameCellRenderer';
import progressCellRenderer from './progressCellRenderer';
import actionCellRenderer from './actionCellRenderer';


var ItemList = function ItemList(_ref) {
    var items = _ref.items,
        onClick = _ref.onClick;
    return React.createElement(
        AutoSizer,
        null,
        function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;

            var nameCell = nameCellRenderer();
            var progressCell = progressCellRenderer();
            var actionCell = actionCellRenderer(onClick);

            return React.createElement(
                Table,
                {
                    className: 'bcu-item-list',
                    disableHeader: true,
                    headerHeight: 0,
                    height: height,
                    rowClassName: 'bcu-item-row',
                    rowCount: items.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return items[index];
                    },
                    rowHeight: 50,
                    width: width
                },
                React.createElement(Column, { cellRenderer: nameCell, dataKey: 'name', flexGrow: 1, flexShrink: 1, width: 300 }),
                React.createElement(Column, {
                    cellRenderer: progressCell,
                    dataKey: 'progress',
                    flexGrow: 1,
                    flexShrink: 1,
                    width: 300,
                    style: { textAlign: 'right' }
                }),
                React.createElement(Column, {
                    cellRenderer: actionCell,
                    dataKey: 'status',
                    flexShrink: 0,
                    width: 25,
                    style: { marginRight: 18 }
                })
            );
        }
    );
};

export default ItemList;