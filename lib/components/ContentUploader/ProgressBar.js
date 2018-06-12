var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Component for a progress bar
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

        var percent = props.percent;

        _this.state = { percent: percent };
        return _this;
    }

    /**
     * Updates state from new props
     *
     * @return {void}
     */


    _createClass(ProgressBar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var percent = nextProps.percent;

            this.setState({ percent: percent });
        }

        /**
         * Renders the progress bar
         *
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var percent = this.state.percent;

            var containerStyle = {
                transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s'
            };
            return React.createElement(
                'div',
                { className: 'bcu-progress-container', style: containerStyle },
                React.createElement('div', { className: 'bcu-progress', style: { width: percent + '%' } })
            );
        }
    }]);

    return ProgressBar;
}(PureComponent);

ProgressBar.defaultProps = {
    percent: 0
};


export default ProgressBar;