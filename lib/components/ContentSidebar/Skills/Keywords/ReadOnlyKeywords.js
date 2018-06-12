var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Read Only Keywords Card component
 * @author Box
 */

import * as React from 'react';
import PillCloud from 'box-react-ui/lib/components/pill-cloud/PillCloud';
import Timeline from '../Timeline';
import getPills from './keywordUtils';
import { SKILLS_TARGETS } from '../../../../interactionTargets';

var ReadOnlyselecteds = function (_React$PureComponent) {
    _inherits(ReadOnlyselecteds, _React$PureComponent);

    function ReadOnlyselecteds() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ReadOnlyselecteds);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReadOnlyselecteds.__proto__ || Object.getPrototypeOf(ReadOnlyselecteds)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            selectedIndex: -1
        }, _this.onSelect = function (pill) {
            var selectedIndex = _this.state.selectedIndex;

            var newIndex = pill.value;
            _this.setState({ selectedIndex: selectedIndex === newIndex ? -1 : newIndex });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Shows the time line by selecting the keyword
     *
     * @private
     * @param {Object} pill - keyword
     * @return {void}
     */


    _createClass(ReadOnlyselecteds, [{
        key: 'render',


        /**
         * Renders the keywords
         *
         * @private
         * @return {void}
         */
        value: function render() {
            var _props = this.props,
                keywords = _props.keywords,
                getPreviewer = _props.getPreviewer,
                duration = _props.duration;
            var selectedIndex = this.state.selectedIndex;

            var options = getPills(keywords);
            var selected = keywords[selectedIndex];
            var pillCloudProps = selected ? { selectedOptions: [options[selectedIndex]] } : {};

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(PillCloud, _extends({ options: options, onSelect: this.onSelect }, pillCloudProps)),
                !!selected && Array.isArray(selected.appears) && selected.appears.length > 0 && React.createElement(Timeline, {
                    text: selected.text,
                    timeslices: selected.appears,
                    duration: duration,
                    getPreviewer: getPreviewer,
                    interactionTarget: SKILLS_TARGETS.KEYWORDS.TIMELINE
                })
            );
        }
    }]);

    return ReadOnlyselecteds;
}(React.PureComponent);

export default ReadOnlyselecteds;