var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Transcript component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconEdit from 'box-react-ui/lib/icons/general/IconEdit';
import IconCopy from 'box-react-ui/lib/icons/general/IconCopy';
import IconExpand from 'box-react-ui/lib/icons/general/IconExpand';
import IconCollapse from 'box-react-ui/lib/icons/general/IconCollapse';
import { formatTime } from 'box-react-ui/lib/utils/datetime';
import TranscriptRow from './TranscriptRow';
import SkillsBusyIndicator from '../SkillsBusyIndicator';
import { isValidTimeSlice } from './timeSliceUtils';
import { COLOR_999 } from '../../../../constants';
import { copy } from '../../../../util/download';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import messages from '../../../messages';

var Transcript = function (_React$PureComponent) {
    _inherits(Transcript, _React$PureComponent);

    function Transcript() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Transcript);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Transcript.__proto__ || Object.getPrototypeOf(Transcript)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isEditingIndex: undefined,
            newTranscriptText: '',
            isCollapsed: true,
            isLoading: false
        }, _this.transcriptReducer = function (accumulator, _ref2) {
            var appears = _ref2.appears,
                text = _ref2.text;

            var start = isValidTimeSlice(appears) && Array.isArray(appears) ? formatTime(appears[0].start) : '0:00';
            return '' + accumulator + start + ': ' + (text || '') + '\r\n';
        }, _this.transcriptMapper = function (_ref3, index) {
            var appears = _ref3.appears,
                text = _ref3.text;
            var _this$state = _this.state,
                isEditingIndex = _this$state.isEditingIndex,
                newTranscriptText = _this$state.newTranscriptText;

            var isEditingRow = isEditingIndex === index;
            var transcriptText = isEditingRow ? newTranscriptText || text : text;
            var interactionTarget = isEditingRow ? SKILLS_TARGETS.TRANSCRIPTS.EDIT_TEXT : SKILLS_TARGETS.TRANSCRIPTS.TRANSCRIPT;
            return React.createElement(TranscriptRow, {
                key: index,
                isEditing: isEditingRow,
                appears: appears,
                text: transcriptText,
                onClick: function onClick() {
                    return _this.onClick(index);
                },
                onSave: _this.onSave,
                onCancel: _this.onCancel,
                onChange: _this.onChange,
                interactionTarget: interactionTarget
            });
        }, _this.toggleIsEditing = function () {
            _this.setState(function (prevState) {
                return {
                    isEditingIndex: typeof prevState.isEditingIndex === 'number' ? undefined : -1
                };
            });
        }, _this.onSave = function () {
            var _this$props = _this.props,
                entries = _this$props.card.entries,
                onSkillChange = _this$props.onSkillChange;
            var _this$state2 = _this.state,
                isEditingIndex = _this$state2.isEditingIndex,
                newTranscriptText = _this$state2.newTranscriptText;


            if (typeof isEditingIndex !== 'number') {
                return;
            }

            var entry = entries[isEditingIndex];
            if (entry.text === newTranscriptText) {
                _this.onCancel();
            } else {
                _this.setState({ isLoading: true, isEditingIndex: -1 });
                onSkillChange(null, null, [{
                    replacement: _extends({}, entry, { text: newTranscriptText }),
                    replaced: entry
                }]);
            }
        }, _this.onCancel = function () {
            _this.setState({ isEditingIndex: -1, newTranscriptText: '' });
        }, _this.onChange = function (event) {
            var currentTarget = event.currentTarget;
            _this.setState({
                newTranscriptText: currentTarget.value
            });
        }, _this.onClick = function (index) {
            var entries = _this.props.card.entries;
            var isEditingIndex = _this.state.isEditingIndex;

            if (typeof isEditingIndex === 'number') {
                _this.setState({
                    isEditingIndex: index,
                    newTranscriptText: entries[index].text
                });
            } else {
                _this.previewSegment(index);
            }
        }, _this.copyTranscript = function () {
            var entries = _this.props.card.entries;

            var copiedClass = 'be-transcript-copied';
            copy(entries.reduce(_this.transcriptReducer, ''));

            // Animate the button by adding a class
            if (_this.copyBtn) {
                _this.copyBtn.classList.add(copiedClass);
            }

            // Remove the animation class
            setTimeout(function () {
                if (_this.copyBtn) {
                    _this.copyBtn.classList.remove(copiedClass);
                }
            }, 1000);
        }, _this.copyBtnRef = function (btn) {
            _this.copyBtn = btn;
        }, _this.toggleExpandCollapse = function () {
            _this.setState(function (prevState) {
                return {
                    isCollapsed: !prevState.isCollapsed
                };
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Transcript, [{
        key: 'componentWillReceiveProps',


        /**
         * Called when transcripts gets new properties
         *
         * @private
         * @return {void}
         */
        value: function componentWillReceiveProps() {
            var wasEditing = typeof this.state.isEditingIndex === 'number';
            this.setState({
                isEditingIndex: wasEditing ? -1 : undefined,
                newTranscriptText: '',
                isLoading: false
            });
        }

        /**
         * Reducer to accumulate all transcript entries for copying
         *
         * @param {Object} accumulator - reducer accumulator
         * @return {string} accumulated transcript entries
         */


        /**
         * Mapper to accumulate all transcript entries for displaying
         *
         * @param {Object} accumulator - reducer accumulator
         * @param {number} index - mapper index
         * @return {string} accumulated transcript entries
         */


        /**
         * Toggles the edit mode
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'previewSegment',


        /**
         * Previews a transcript segment
         *
         * @private
         * @param {number|void} [index] - row index to edit
         * @return {void}
         */
        value: function previewSegment(index) {
            var _props = this.props,
                entries = _props.card.entries,
                getPreviewer = _props.getPreviewer;
            var appears = entries[index].appears;

            var viewer = getPreviewer ? getPreviewer() : null;
            var isValid = isValidTimeSlice(appears) && Array.isArray(appears) && appears.length === 1;
            var timeSlice = appears;
            var start = isValid ? timeSlice[0].start : 0;

            if (isValid && viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function') {
                viewer.play(start);
            }
        }

        /**
         * Saves the new card data
         *
         * @private
         * @return {void}
         */


        /**
         * Cancels editing
         *
         * @private
         * @return {void}
         */


        /**
         * Reflects changes of editing
         *
         * @private
         * @param {Event} event - keyboard event
         * @return {void}
         */


        /**
         * Click handler for transcript
         *
         * @private
         * @return {void}
         */


        /**
         * Copies the transcript.
         * Also animates the copy button.
         *
         * @private
         * @return {void}
         */


        /**
         * Copy button reference
         *
         * @private
         * @return {void}
         */


        /**
         * Toggles transcript exapand and collapse
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the transcript
         *
         * @private
         * @return {Object}
         */
        value: function render() {
            var _props2 = this.props,
                entries = _props2.card.entries,
                isEditable = _props2.isEditable;
            var _state = this.state,
                isEditingIndex = _state.isEditingIndex,
                isCollapsed = _state.isCollapsed,
                isLoading = _state.isLoading;

            var hasEntries = entries.length > 0;
            var hasManyEntries = entries.length > 5;
            var isEditing = typeof isEditingIndex === 'number';
            var editBtnClassName = classNames('be-transcript-edit', {
                'be-transcript-is-editing': isEditing
            });
            var contentClassName = classNames({
                'be-transcript-content-collapsed': isCollapsed
            });

            return React.createElement(
                'div',
                { className: 'be-transcript' },
                hasEntries && !isLoading && React.createElement(
                    'div',
                    { className: 'be-transcript-actions' },
                    React.createElement(
                        PlainButton,
                        {
                            type: 'button',
                            className: 'be-transcript-copy',
                            getDOMRef: this.copyBtnRef,
                            onClick: this.copyTranscript
                        },
                        React.createElement(IconCopy, { color: COLOR_999 })
                    ),
                    hasManyEntries && React.createElement(
                        PlainButton,
                        {
                            type: 'button',
                            className: 'be-transcript-expand',
                            onClick: this.toggleExpandCollapse
                        },
                        isCollapsed ? React.createElement(IconExpand, { color: COLOR_999 }) : React.createElement(IconCollapse, { color: COLOR_999 })
                    ),
                    isEditable && React.createElement(
                        PlainButton,
                        {
                            type: 'button',
                            className: editBtnClassName,
                            onClick: this.toggleIsEditing,
                            'data-resin-target': SKILLS_TARGETS.TRANSCRIPTS.EDIT
                        },
                        React.createElement(IconEdit, null)
                    )
                ),
                isEditing ? React.createElement(
                    'div',
                    { className: 'be-transcript-edit-message' },
                    React.createElement(FormattedMessage, messages.transcriptEdit)
                ) : null,
                hasEntries ? React.createElement(
                    'div',
                    { className: contentClassName },
                    entries.map(this.transcriptMapper)
                ) : React.createElement(FormattedMessage, messages.skillNoInfoFoundError),
                isLoading && React.createElement(SkillsBusyIndicator, null)
            );
        }
    }]);

    return Transcript;
}(React.PureComponent);

export default Transcript;