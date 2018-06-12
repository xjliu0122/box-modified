var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Progress Bar component
 * @author Box
 */

import React, { PureComponent } from 'react';

var ProgressBar = function (_PureComponent) {
    _inherits(ProgressBar, _PureComponent);

    /**
     * [constructor]
     *
     * @return {ProgressBar}
     */
    function ProgressBar(props) {
        _classCallCheck(this, ProgressBar);

        var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

        _initialiseProps.call(_this);

        var percent = props.percent;

        _this.state = { percent: percent };
        return _this;
    }

    /**
     * Clears any timeouts and intervals
     *
     * @return {void}
     */


    _createClass(ProgressBar, [{
        key: 'clearTimeoutAndInterval',
        value: function clearTimeoutAndInterval() {
            clearInterval(this.interval);
            clearTimeout(this.timeout);
        }

        /**
         * Updates state from new props
         *
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.clearTimeoutAndInterval();
            var percent = nextProps.percent;

            this.setState({ percent: percent }, this.startProgress);
        }

        /**
         * Clears time out
         *
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimeoutAndInterval();
        }

        /**
         * Increaments the progress or resets it
         * depending upon the edge conditions.
         *
         * @return {void}
         */


        /**
         * Increaments the progress very slowly
         *
         * @return {void}
         */


        /**
         * Resets the progress to 0
         *
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the progress bar
         *
         * @return {void}
         */
        value: function render() {
            var percent = this.state.percent;

            var containerStyle = {
                opacity: percent > 0 && percent < 100 ? 1 : 0,
                transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s'
            };
            return React.createElement(
                'div',
                { className: 'be-progress-container', style: containerStyle },
                React.createElement('div', { className: 'be-progress', style: { width: percent + '%' } })
            );
        }
    }]);

    return ProgressBar;
}(PureComponent);

ProgressBar.defaultProps = { percent: 0 };

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.startProgress = function () {
        var percent = _this2.state.percent;

        if (percent === 0) {
            _this2.interval = setInterval(_this2.incrementProgress, 100);
        } else if (percent === 100) {
            // Timeout helps transition of hiding the bar to finish
            _this2.timeout = setTimeout(_this2.resetProgress, 600);
        }
    };

    this.incrementProgress = function () {
        var percent = _this2.state.percent;

        _this2.setState({
            percent: percent + 2 / (percent || 1)
        });
    };

    this.resetProgress = function () {
        _this2.setState(ProgressBar.defaultProps);
    };
};

export default ProgressBar;