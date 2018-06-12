/**
 * 
 * @file Timeline line component
 * @author Box
 */

import React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import { COLOR_BOX_BLUE } from '../../../../constants';


var LENGTH_TEXT_ITEMLINE = 295; // match with css

var Timeslice = function Timeslice(_ref) {
    var start = _ref.start,
        end = _ref.end,
        duration = _ref.duration,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? COLOR_BOX_BLUE : _ref$color,
        onClick = _ref.onClick,
        index = _ref.index,
        interactionTarget = _ref.interactionTarget;

    if (typeof start !== 'number' || !duration || start >= duration) {
        return null;
    }
    var barLength = LENGTH_TEXT_ITEMLINE;
    var startLeft = Math.round(start * barLength / duration);
    var minEnding = startLeft + 6; // Need at least some width to be clickable
    var ending = typeof end === 'number' ? Math.max(minEnding, end * barLength / duration) : minEnding;
    var endLeft = Math.round(Math.min(barLength, ending));
    var styles = {
        backgroundColor: color,
        left: startLeft + 'px',
        width: endLeft - startLeft + 'px'
    };
    return React.createElement(PlainButton, {
        type: 'button',
        className: 'be-timeline-time',
        style: styles,
        onClick: function (_onClick) {
            function onClick() {
                return _onClick.apply(this, arguments);
            }

            onClick.toString = function () {
                return _onClick.toString();
            };

            return onClick;
        }(function () {
            return onClick(index);
        }),
        'data-resin-target': interactionTarget
    });
};

export default Timeslice;