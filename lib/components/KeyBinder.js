var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Item List Key bindings
 * @author Box
 */

import React, { PureComponent } from 'react';
import noop from 'lodash/noop';
import { isInputElement } from '../util/dom';

var KeyBinder = function (_PureComponent) {
    _inherits(KeyBinder, _PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {KeyBinder}
     */
    function KeyBinder(props) {
        _classCallCheck(this, KeyBinder);

        var _this = _possibleConstructorReturn(this, (KeyBinder.__proto__ || Object.getPrototypeOf(KeyBinder)).call(this, props));

        _this.onKeyDown = function (event) {
            if (isInputElement(event.target)) {
                return;
            }
            var _this$props = _this.props,
                columnCount = _this$props.columnCount,
                rowCount = _this$props.rowCount,
                onSelect = _this$props.onSelect,
                onRename = _this$props.onRename,
                onDownload = _this$props.onDownload,
                onShare = _this$props.onShare,
                onDelete = _this$props.onDelete,
                onOpen = _this$props.onOpen,
                items = _this$props.items;
            var _this$state = _this.state,
                scrollToColumnPrevious = _this$state.scrollToColumn,
                scrollToRowPrevious = _this$state.scrollToRow;
            var _this$state2 = _this.state,
                scrollToColumn = _this$state2.scrollToColumn,
                scrollToRow = _this$state2.scrollToRow;

            var currentItem = items[scrollToRow];
            var ctrlMeta = event.metaKey || event.ctrlKey;

            // The above cases all prevent default event event behavior.
            // This is to keep the grid from scrolling after the snap-to update.
            switch (event.key) {
                case 'ArrowDown':
                    scrollToRow = ctrlMeta ? rowCount - 1 : Math.min(scrollToRow + 1, rowCount - 1);
                    event.stopPropagation(); // To prevent the arrow down capture of parent
                    break;
                case 'ArrowLeft':
                    scrollToColumn = ctrlMeta ? 0 : Math.max(scrollToColumn - 1, 0);
                    break;
                case 'ArrowRight':
                    scrollToColumn = ctrlMeta ? columnCount - 1 : Math.min(scrollToColumn + 1, columnCount - 1);
                    break;
                case 'ArrowUp':
                    scrollToRow = ctrlMeta ? 0 : Math.max(scrollToRow - 1, 0);
                    break;
                case 'Enter':
                    onOpen(currentItem);
                    event.preventDefault();
                    break;
                case 'Delete':
                    onDelete(currentItem);
                    event.preventDefault();
                    break;
                case 'X':
                    onSelect(currentItem);
                    event.preventDefault();
                    break;
                case 'D':
                    onDownload(currentItem);
                    event.preventDefault();
                    break;
                case 'S':
                    onShare(currentItem);
                    event.preventDefault();
                    break;
                case 'R':
                    onRename(currentItem);
                    event.preventDefault();
                    break;
                default:
                    return;
            }

            if (scrollToColumn !== scrollToColumnPrevious || scrollToRow !== scrollToRowPrevious) {
                event.preventDefault();
                _this.updateScrollState({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow });
            }
        };

        _this.onSectionRendered = function (_ref) {
            var columnStartIndex = _ref.columnStartIndex,
                columnStopIndex = _ref.columnStopIndex,
                rowStartIndex = _ref.rowStartIndex,
                rowStopIndex = _ref.rowStopIndex;

            _this.columnStartIndex = columnStartIndex;
            _this.columnStopIndex = columnStopIndex;
            _this.rowStartIndex = rowStartIndex;
            _this.rowStopIndex = rowStopIndex;
        };

        _this.state = {
            scrollToColumn: props.scrollToColumn,
            scrollToRow: props.scrollToRow,
            focusOnRender: false
        };

        _this.columnStartIndex = 0;
        _this.columnStopIndex = 0;
        _this.rowStartIndex = 0;
        _this.rowStopIndex = 0;
        return _this;
    }

    /**
     * Resets scroll states and sets new states if
     * needed specially when collection changes
     *
     * @private
     * @inheritdoc
     * @return {void}
     */


    _createClass(KeyBinder, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var id = nextProps.id,
                scrollToColumn = nextProps.scrollToColumn,
                scrollToRow = nextProps.scrollToRow;
            var prevId = this.props.id;
            var _state = this.state,
                prevScrollToColumn = _state.scrollToColumn,
                prevScrollToRow = _state.scrollToRow;

            var newState = {};

            if (id !== prevId) {
                // Only when the entire collection changes
                // like folder navigate, reset the scroll states
                newState.scrollToColumn = 0;
                newState.scrollToRow = 0;
                newState.focusOnRender = false;
            } else if (prevScrollToColumn !== scrollToColumn && prevScrollToRow !== scrollToRow) {
                newState.scrollToColumn = scrollToColumn;
                newState.scrollToRow = scrollToRow;
            } else if (prevScrollToColumn !== scrollToColumn) {
                newState.scrollToColumn = scrollToColumn;
            } else if (prevScrollToRow !== scrollToRow) {
                newState.scrollToRow = scrollToRow;
            }

            // Only update the state if there is something to set
            if (Object.keys(newState).length) {
                this.setState(newState);
            }
        }

        /**
         * Keyboard events
         *
         * @private
         * @inheritdoc
         * @return {void}
         */


        /**
         * Callback for set of rows rendered
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'updateScrollState',


        /**
         * Updates the scroll states
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        value: function updateScrollState(_ref2) {
            var scrollToColumn = _ref2.scrollToColumn,
                scrollToRow = _ref2.scrollToRow;
            var onScrollToChange = this.props.onScrollToChange;

            onScrollToChange({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow });
            this.setState({ scrollToColumn: scrollToColumn, scrollToRow: scrollToRow, focusOnRender: true });
        }

        /**
         * Renders the HOC
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children;
            var _state2 = this.state,
                scrollToColumn = _state2.scrollToColumn,
                scrollToRow = _state2.scrollToRow,
                focusOnRender = _state2.focusOnRender;

            /* eslint-disable jsx-a11y/no-static-element-interactions */

            return React.createElement(
                'div',
                { className: className, onKeyDown: this.onKeyDown },
                children({
                    onSectionRendered: this.onSectionRendered,
                    scrollToColumn: scrollToColumn,
                    scrollToRow: scrollToRow,
                    focusOnRender: focusOnRender
                })
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        }
    }]);

    return KeyBinder;
}(PureComponent);

KeyBinder.defaultProps = {
    scrollToColumn: 0,
    scrollToRow: 0,
    onRename: noop,
    onShare: noop,
    onDownload: noop,
    onOpen: noop,
    onSelect: noop,
    onDelete: noop
};


export default KeyBinder;