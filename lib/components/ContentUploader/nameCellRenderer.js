/**
 * 
 * @file Function to render the name table cell
 */

import React from 'react';
import IconName from './IconName';

export default (function () {
  return function (_ref) {
    var rowData = _ref.rowData;
    return React.createElement(IconName, rowData);
  };
});