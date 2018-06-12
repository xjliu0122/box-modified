/**
 * 
 * @file Upload item progress component
 */

import React from 'react';
import ProgressBar from './ProgressBar';


var ItemProgress = function ItemProgress(_ref) {
    var progress = _ref.progress;
    return React.createElement(
        'div',
        { className: 'bcu-item-progress' },
        React.createElement(ProgressBar, { percent: progress }),
        React.createElement(
            'div',
            { className: 'bcu-progress-label' },
            progress,
            '%'
        )
    );
};

export default ItemProgress;