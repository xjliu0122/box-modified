/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import getSize from '../../util/size';

export default (function () {
  return function (_ref) {
    var cellData = _ref.cellData;
    return React.createElement(
      'span',
      null,
      getSize(cellData)
    );
  };
});