/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';
import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator/LoadingIndicator';
import IconClose from 'box-react-ui/lib/icons/general/IconClose';

var IconInProgress = function IconInProgress() {
    return React.createElement(
        'div',
        { className: 'be-icon-in-progress' },
        React.createElement(IconClose, null),
        React.createElement(LoadingIndicator, null)
    );
};

export default IconInProgress;