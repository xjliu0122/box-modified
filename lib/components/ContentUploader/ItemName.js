/**
 * 
 * @file Item name component
 */

import React from 'react';


var ItemName = function ItemName(_ref) {
  var name = _ref.name;
  return React.createElement(
    'span',
    { className: 'bcu-item-label' },
    name
  );
};

export default ItemName;