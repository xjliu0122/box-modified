var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC for drag drop
 * @author Box
 */

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

/* eslint-disable no-plusplus */
var makeDroppable = function makeDroppable(_ref) {
    var dropValidator = _ref.dropValidator,
        onDrop = _ref.onDrop;
    return function (Wrapped) {
        var _class, _temp;

        return _temp = _class = function (_PureComponent) {
            _inherits(DroppableComponent, _PureComponent);

            /**
             * [constructor]
             *
             * @param {*} props
             * @return {DroppableComponent}
             */
            function DroppableComponent(props) {
                _classCallCheck(this, DroppableComponent);

                var _this = _possibleConstructorReturn(this, (DroppableComponent.__proto__ || Object.getPrototypeOf(DroppableComponent)).call(this, props));

                _this.handleDragEnter = function (event) {
                    // This allows onDrop to be fired
                    event.preventDefault();

                    // Use this to track the number of drag enters and leaves.
                    // This is used to normalize enters/leaves between parent/child elements

                    // we only want to do things in dragenter when the counter === 1
                    if (++_this.enterLeaveCounter === 1) {
                        var dataTransfer = event.dataTransfer;

                        // if we don't have a dropValidator, we just default canDrop to true

                        var _canDrop = dropValidator ? dropValidator(_this.props, dataTransfer) : true;

                        _this.setState({
                            isOver: true,
                            canDrop: _canDrop
                        });
                    }
                };

                _this.handleDragOver = function (event) {
                    // This allows onDrop to be fired
                    event.preventDefault();

                    var canDrop = _this.state.canDrop;
                    var dataTransfer = event.dataTransfer;


                    if (!dataTransfer) {
                        return;
                    }

                    if (!canDrop) {
                        dataTransfer.dropEffect = 'none';
                    } else if (dataTransfer.effectAllowed) {
                        // Set the drop effect if it was defined
                        dataTransfer.dropEffect = dataTransfer.effectAllowed;
                    }
                };

                _this.handleDrop = function (event) {
                    event.preventDefault();

                    // reset enterLeaveCounter
                    _this.enterLeaveCounter = 0;

                    var canDrop = _this.state.canDrop;


                    _this.setState({
                        canDrop: false,
                        isDragging: false,
                        isOver: false
                    });

                    if (canDrop && onDrop) {
                        onDrop(event, _this.props);
                    }
                };

                _this.handleDragLeave = function (event) {
                    event.preventDefault();

                    // if enterLeaveCounter is zero, it means that we're actually leaving the item
                    if (--_this.enterLeaveCounter > 0) {
                        return;
                    }

                    _this.setState({
                        canDrop: false,
                        isDragging: false,
                        isOver: false
                    });
                };

                _this.enterLeaveCounter = 0;
                _this.state = {
                    canDrop: false,
                    isDragging: false,
                    isOver: false
                };
                return _this;
            }

            /**
             * Adds event listeners once the component mounts@inheritdoc
             * @inheritdoc
             */


            _createClass(DroppableComponent, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var droppableEl = findDOMNode(this); // eslint-disable-line react/no-find-dom-node
                    if (!droppableEl || !(droppableEl instanceof Element)) {
                        throw new Error('Bad mount in makeDroppable');
                    }

                    // add event listeners directly on the element
                    droppableEl.addEventListener('dragenter', this.handleDragEnter);
                    droppableEl.addEventListener('dragover', this.handleDragOver);
                    droppableEl.addEventListener('dragleave', this.handleDragLeave);
                    droppableEl.addEventListener('drop', this.handleDrop);

                    this.droppableEl = droppableEl;
                }

                /**
                 * Removes event listeners when the component is going to unmount
                 * @inheritdoc
                 */

            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.droppableEl.removeEventListener('dragenter', this.handleDragEnter);
                    this.droppableEl.removeEventListener('dragover', this.handleDragOver);
                    this.droppableEl.removeEventListener('dragleave', this.handleDragLeave);
                    this.droppableEl.removeEventListener('drop', this.handleDrop);
                }

                /**
                 * Function that gets called when an item is dragged into the drop zone
                 *
                 * @param {SyntheticEvent} event - The dragenter event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is dragged over the drop zone
                 *
                 * @param {DragEvent} event - The dragover event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is drop onto the drop zone
                 *
                 * @param {DragEvent} event - The drop event
                 * @return {void}
                 */


                /**
                 * Function that gets called when an item is dragged out of the drop zone
                 *
                 * @param {DragEvent} event - The dragleave event
                 * @return {void}
                 */

            }, {
                key: 'render',


                /**
                 * Renders the HOC
                 *
                 * @private
                 * @inheritdoc
                 * @return {Element}
                 */
                value: function render() {
                    var _props = this.props,
                        className = _props.className,
                        rest = _objectWithoutProperties(_props, ['className']);

                    var _state = this.state,
                        canDrop = _state.canDrop,
                        isOver = _state.isOver;


                    var classes = classNames(className, {
                        'is-droppable': canDrop,
                        'is-over': isOver
                    });

                    var mergedProps = _extends({}, rest, this.state, {
                        className: classes
                    });

                    return React.createElement(Wrapped, mergedProps);
                }
            }]);

            return DroppableComponent;
        }(PureComponent), _class.defaultProps = {
            className: ''
        }, _temp;
    };
};

export default makeDroppable;