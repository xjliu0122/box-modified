var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file File Keywords SkillCard component
 * @author Box
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconEdit from 'box-react-ui/lib/icons/general/IconEdit';
import EditableKeywords from './EditableKeywords';
import ReadOnlyKeywords from './ReadOnlyKeywords';
import SkillsBusyIndicator from '../SkillsBusyIndicator';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';

var Keywords = function (_PureComponent) {
    _inherits(Keywords, _PureComponent);

    /**
     * [constructor]
     *
     * @public
     * @return {Keywords}
     */
    function Keywords(props) {
        _classCallCheck(this, Keywords);

        var _this = _possibleConstructorReturn(this, (Keywords.__proto__ || Object.getPrototypeOf(Keywords)).call(this, props));

        _this.toggleIsEditing = function () {
            _this.setState(function (prevState) {
                return {
                    isEditing: !prevState.isEditing
                };
            });
        };

        _this.onAdd = function (keyword) {
            var transcript = _this.props.transcript;
            var adds = _this.state.adds;

            var locations = [];

            if (transcript && Array.isArray(transcript.entries)) {
                transcript.entries.forEach(function (_ref) {
                    var text = _ref.text,
                        appears = _ref.appears;

                    if (text && text.includes(keyword.text) && Array.isArray(appears) && appears.length > 0) {
                        locations.push(appears[0]);
                    }
                });
            }

            keyword.appears = locations;
            adds.push(keyword);
            _this.setState({ adds: adds.slice(0) });
        };

        _this.onDelete = function (keyword) {
            var _this$state = _this.state,
                adds = _this$state.adds,
                removes = _this$state.removes;

            var addedIndex = adds.findIndex(function (added) {
                return added === keyword;
            });
            if (addedIndex > -1) {
                adds.splice(addedIndex, 1);
                _this.setState({ adds: adds.slice(0) });
            } else {
                removes.push(keyword);
                _this.setState({ removes: removes.slice(0) });
            }
        };

        _this.onSave = function () {
            var onSkillChange = _this.props.onSkillChange;
            var _this$state2 = _this.state,
                removes = _this$state2.removes,
                adds = _this$state2.adds;

            _this.toggleIsEditing();
            if (removes.length > 0 || adds.length > 0) {
                _this.setState({ isLoading: true });
                onSkillChange(removes, adds);
            }
        };

        _this.onCancel = function () {
            _this.resetState(_this.props);
        };

        _this.state = {
            keywords: props.card.entries,
            adds: [],
            removes: [],
            isEditing: false,
            isLoading: false
        };
        return _this;
    }

    /**
     * Helper to reset the state
     *
     * @private
     * @param {Object} props - component props
     * @return {void}
     */


    _createClass(Keywords, [{
        key: 'resetState',
        value: function resetState(props) {
            this.setState({
                keywords: props.card.entries,
                adds: [],
                removes: [],
                isEditing: false,
                isLoading: false
            });
        }

        /**
         * Called when keywords gets new properties
         *
         * @private
         * @param {Object} nextProps - component props
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.resetState(nextProps);
        }

        /**
         * Toggles the edit mode
         *
         * @private
         * @return {void}
         */


        /**
         * Adds a new keyword.
         * Iterates over the transcript to find locations
         *
         * @private
         * @return {void}
         */


        /**
         * Deletes a keyword
         *
         * @private
         * @return {void}
         */


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
                card = _props.card,
                getPreviewer = _props.getPreviewer,
                isEditable = _props.isEditable;
            var duration = card.duration;
            var _state = this.state,
                isEditing = _state.isEditing,
                isLoading = _state.isLoading,
                keywords = _state.keywords,
                removes = _state.removes,
                adds = _state.adds;

            var hasKeywords = keywords.length > 0;
            var entries = keywords.filter(function (face) {
                return !removes.includes(face);
            }).concat(adds);
            var editClassName = classNames('be-keyword-edit', {
                'be-keyword-is-editing': isEditing
            });

            return React.createElement(
                'div',
                { className: 'be-keywords' },
                hasKeywords && isEditable && !isLoading && React.createElement(
                    PlainButton,
                    {
                        type: 'button',
                        className: editClassName,
                        onClick: this.toggleIsEditing,
                        'data-resin-target': SKILLS_TARGETS.KEYWORDS.EDIT
                    },
                    React.createElement(IconEdit, null)
                ),
                isEditing && React.createElement(EditableKeywords, {
                    keywords: entries,
                    onSave: this.onSave,
                    onAdd: this.onAdd,
                    onDelete: this.onDelete,
                    onCancel: this.onCancel
                }),
                !isEditing && hasKeywords && React.createElement(ReadOnlyKeywords, { keywords: entries, duration: duration, getPreviewer: getPreviewer }),
                !isEditing && !hasKeywords && React.createElement(FormattedMessage, messages.skillNoInfoFoundError),
                isLoading && React.createElement(SkillsBusyIndicator, null)
            );
        }
    }]);

    return Keywords;
}(PureComponent);

export default Keywords;