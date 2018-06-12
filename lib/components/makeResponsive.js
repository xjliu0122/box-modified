var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC to make responsive Box UI Elements
 * @author Box
 */

import * as React from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';
import { SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL, CLASS_IS_SMALL, CLASS_IS_TOUCH, CLASS_IS_MEDIUM } from '../constants';

var CROSS_OVER_WIDTH_SMALL = 600;
var CROSS_OVER_WIDTH_MEDIUM = 800;
var HAS_TOUCH = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

function makeResponsive(Wrapped) {
    var _class, _temp;

    return _temp = _class = function (_React$PureComponent) {
        _inherits(_class, _React$PureComponent);

        /**
         * [constructor]
         *
         * @param {*} data
         * @return {void}
         */
        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this.onResize = function (_ref) {
                var width = _ref.bounds.width;

                var size = SIZE_LARGE;
                if (width <= CROSS_OVER_WIDTH_SMALL) {
                    size = SIZE_SMALL;
                } else if (width <= CROSS_OVER_WIDTH_MEDIUM) {
                    size = SIZE_MEDIUM;
                }
                _this.setState({ size: size });
            };

            _this.state = {
                size: props.size || SIZE_LARGE
            };
            return _this;
        }

        /**
         * Resizing function
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */


        _createClass(_class, [{
            key: 'render',


            /**
             * Renders the Box UI Element
             *
             * @private
             * @inheritdoc
             * @return {Element}
             */
            value: function render() {
                var _classNames;

                var _props = this.props,
                    isTouch = _props.isTouch,
                    size = _props.size,
                    className = _props.className,
                    componentRef = _props.componentRef,
                    rest = _objectWithoutProperties(_props, ['isTouch', 'size', 'className', 'componentRef']);

                var isSmall = size === SIZE_SMALL;
                var isLarge = size === SIZE_LARGE;
                var isMedium = size === SIZE_MEDIUM;
                var isResponsive = !isSmall && !isLarge && !isMedium;

                if (isSmall && isLarge || isSmall && isMedium || isMedium && isLarge) {
                    throw new Error('Box UI Element cannot be small or large or medium at the same time');
                }

                if (!isResponsive) {
                    return React.createElement(Wrapped, _extends({
                        ref: componentRef,
                        isTouch: isTouch,
                        isSmall: isSmall,
                        isLarge: isLarge,
                        isMedium: isMedium,
                        className: className
                    }, rest));
                }

                var sizeFromState = this.state.size;

                isSmall = sizeFromState === SIZE_SMALL;
                isMedium = sizeFromState === SIZE_MEDIUM;
                isLarge = sizeFromState === SIZE_LARGE;
                var styleClassName = classNames((_classNames = {}, _defineProperty(_classNames, CLASS_IS_SMALL, isSmall), _defineProperty(_classNames, CLASS_IS_MEDIUM, isMedium), _defineProperty(_classNames, CLASS_IS_TOUCH, isTouch), _classNames), className);

                return React.createElement(
                    Measure,
                    { bounds: true, onResize: this.onResize },
                    function (_ref2) {
                        var measureRef = _ref2.measureRef;
                        return React.createElement(Wrapped, _extends({
                            ref: componentRef,
                            isTouch: isTouch,
                            isSmall: isSmall,
                            isLarge: isLarge,
                            isMedium: isMedium,
                            measureRef: measureRef,
                            className: styleClassName
                        }, rest));
                    }
                );
            }
        }]);

        return _class;
    }(React.PureComponent), _class.defaultProps = {
        className: '',
        isTouch: HAS_TOUCH
    }, _temp;
}

export default makeResponsive;