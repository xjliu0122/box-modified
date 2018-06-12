var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Editable Skill Keywords card component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import PillSelector from 'box-react-ui/lib/components/pill-selector-dropdown/PillSelector';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../../../messages';
import getPills from './keywordUtils';
import { SKILLS_TARGETS } from '../../../../interactionTargets';

var EditableKeywords = function (_React$PureComponent) {
    _inherits(EditableKeywords, _React$PureComponent);

    /**
     * [constructor]
     *
     * @public
     * @return {EditableKeywords}
     */
    function EditableKeywords(props) {
        _classCallCheck(this, EditableKeywords);

        var _this = _possibleConstructorReturn(this, (EditableKeywords.__proto__ || Object.getPrototypeOf(EditableKeywords)).call(this, props));

        _this.onRemove = function (option, index) {
            var _this$props = _this.props,
                onDelete = _this$props.onDelete,
                keywords = _this$props.keywords;

            onDelete(keywords[index]);
        };

        _this.onKeyDown = function (_ref) {
            var key = _ref.key;

            if (key === 'Enter') {
                _this.onBlur();
            }
        };

        _this.onBlur = function () {
            var onAdd = _this.props.onAdd;
            var keyword = _this.state.keyword;


            if (keyword) {
                onAdd({
                    type: 'text',
                    text: keyword
                });
            }
        };

        _this.onInput = function (event) {
            var currentTarget = event.currentTarget;
            _this.setState({
                keyword: currentTarget.value
            });
        };

        _this.state = { pills: getPills(props.keywords), keyword: '' };
        return _this;
    }

    /**
     * Called when keywords gets new properties.
     * Should reset to original state.
     *
     * @private
     * @param {Object} nextProps - component props
     * @return {void}
     */


    _createClass(EditableKeywords, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ pills: getPills(nextProps.keywords), keyword: '' });
        }

        /**
         * Called when keywords gets new properties.
         * Should reset to original state.
         *
         * @private
         * @param {Object} option - pill
         * @param {number} index - pill index
         * @return {void}
         */


        /**
         * When pressing enter in the pill input box
         *
         * @private
         * @param {Event} event - keyboard event
         * @return {void}
         */


        /**
         * Called when pill selector is blurred.
         * Adds a new pill if needed.
         *
         * @private
         * @return {void}
         */


        /**
         * Called when pill selector gets new input value.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the keywords
         *
         * @private
         * @return {void}
         */
        value: function render() {
            var _props = this.props,
                onSave = _props.onSave,
                onCancel = _props.onCancel;
            var _state = this.state,
                pills = _state.pills,
                keyword = _state.keyword;

            return React.createElement(
                'span',
                { className: 'pill-selector-wrapper' },
                React.createElement(PillSelector, {
                    onBlur: this.onBlur,
                    onInput: this.onInput,
                    onKeyDown: this.onKeyDown,
                    onPaste: this.onInput,
                    onRemove: this.onRemove,
                    selectedOptions: pills,
                    value: keyword
                }),
                React.createElement(
                    'div',
                    { className: 'be-keywords-buttons' },
                    React.createElement(
                        Button,
                        { type: 'button', onClick: onCancel },
                        React.createElement(FormattedMessage, _extends({}, messages.cancel, {
                            'data-resin-target': SKILLS_TARGETS.KEYWORDS.EDIT_CANCEL
                        }))
                    ),
                    React.createElement(
                        PrimaryButton,
                        { type: 'button', onClick: onSave },
                        React.createElement(FormattedMessage, _extends({}, messages.save, { 'data-resin-target': SKILLS_TARGETS.KEYWORDS.EDIT_SAVE }))
                    )
                )
            );
        }
    }]);

    return EditableKeywords;
}(React.PureComponent);

export default EditableKeywords;