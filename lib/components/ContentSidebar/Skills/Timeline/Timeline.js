/**
 * 
 * @file Timeline component
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconTrackNext from 'box-react-ui/lib/icons/general/IconTrackNext';
import IconTrackPrevious from 'box-react-ui/lib/icons/general/IconTrackPrevious';
import Timeslice from './Timeslice';
import { isValidStartTime } from '../Transcript/timeSliceUtils';
import messages from '../../../messages';

var Timeline = function Timeline(_ref) {
    var color = _ref.color,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 0 : _ref$duration,
        _ref$timeslices = _ref.timeslices,
        timeslices = _ref$timeslices === undefined ? [] : _ref$timeslices,
        getPreviewer = _ref.getPreviewer,
        interactionTarget = _ref.interactionTarget;

    var timeSliceIndex = -1;

    var playSegment = function playSegment(index) {
        var incr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var newIndex = incr > 0 ? Math.min(timeslices.length - 1, index + incr) : Math.max(0, index + incr);
        var viewer = getPreviewer ? getPreviewer() : null;
        var timeslice = timeslices[newIndex];
        var validTime = isValidStartTime(timeslice);

        if (validTime && viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function') {
            viewer.play(timeslice.start);
            timeSliceIndex = newIndex;
        }
    };

    return React.createElement(
        'div',
        { className: 'be-timeline' },
        text && React.createElement(
            'div',
            { className: 'be-timeline-label' },
            text
        ),
        React.createElement(
            'div',
            { className: 'be-timeline-line-wrapper' },
            React.createElement('div', { className: 'be-timeline-line', style: { backgroundColor: color } }),
            timeslices.map(function (_ref2, index) {
                var start = _ref2.start,
                    end = _ref2.end;
                return (
                    /* eslint-disable react/no-array-index-key */
                    React.createElement(Timeslice, {
                        key: index,
                        index: index,
                        color: color,
                        start: start,
                        end: end,
                        duration: duration,
                        onClick: playSegment,
                        interactionTarget: interactionTarget
                    })
                );
            }
            /* eslint-enable react/no-array-index-key */
            )
        ),
        React.createElement(
            'div',
            { className: 'be-timeline-btns' },
            React.createElement(
                PlainButton,
                { type: 'button', onClick: function onClick() {
                        return playSegment(timeSliceIndex, -1);
                    } },
                React.createElement(IconTrackPrevious, { title: React.createElement(FormattedMessage, messages.previousSegment) })
            ),
            React.createElement(
                PlainButton,
                { type: 'button', onClick: function onClick() {
                        return playSegment(timeSliceIndex, 1);
                    } },
                React.createElement(IconTrackNext, { title: React.createElement(FormattedMessage, messages.nextSegment) })
            )
        )
    );
};

export default Timeline;