var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Faces Skill Card component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import IconEdit from 'box-react-ui/lib/icons/general/IconEdit';
import Face from './Face';
import Timeline from '../Timeline';
import SkillsBusyIndicator from '../SkillsBusyIndicator';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';

var Faces = function (_React$PureComponent) {
    _inherits(Faces, _React$PureComponent);

    /**
     * [constructor]
     *
     * @public
     * @return {Faces}
     */
    function Faces(props) {
        _classCallCheck(this, Faces);

        var _this = _possibleConstructorReturn(this, (Faces.__proto__ || Object.getPrototypeOf(Faces)).call(this, props));

        _this.toggleIsEditing = function () {
            _this.setState(function (prevState) {
                return {
                    isEditing: !prevState.isEditing
                };
            });
        };

        _this.onSelect = function (face) {
            var selected = _this.state.selected;

            _this.setState({
                selected: selected === face ? undefined : face
            });
        };

        _this.onDelete = function (face) {
            var removes = _this.state.removes;

            removes.push(face);
            _this.setState({ removes: removes.slice(0) });
        };

        _this.onSave = function () {
            var onSkillChange = _this.props.onSkillChange;
            var removes = _this.state.removes;

            _this.toggleIsEditing();
            if (removes.length > 0) {
                _this.setState({ isLoading: true });
                onSkillChange(removes);
            }
        };

        _this.onCancel = function () {
            _this.resetState(_this.props);
        };

        _this.state = {
            faces: props.card.entries,
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


    _createClass(Faces, [{
        key: 'resetState',
        value: function resetState(props) {
            this.setState({
                faces: props.card.entries,
                removes: [],
                isEditing: false,
                selected: undefined,
                isLoading: false
            });
        }

        /**
         * Called when faces gets new properties
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
         * Toggles face selection
         *
         * @private
         * @return {void}
         */


        /**
         * Deletes a face
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
         * Renders the faces
         *
         * @private
         * @return {void}
         */
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                card = _props.card,
                isEditable = _props.isEditable,
                getPreviewer = _props.getPreviewer;
            var _state = this.state,
                selected = _state.selected,
                faces = _state.faces,
                removes = _state.removes,
                isEditing = _state.isEditing,
                isLoading = _state.isLoading;
            var duration = card.duration;

            var hasFaces = faces.length > 0;
            var entries = faces.filter(function (face) {
                return !removes.includes(face);
            });
            var editClassName = classNames('be-faces', {
                'be-faces-is-editing': isEditing
            });

            return React.createElement(
                'div',
                { className: editClassName },
                hasFaces && isEditable && !isLoading && React.createElement(
                    PlainButton,
                    {
                        type: 'button',
                        className: 'be-face-edit',
                        onClick: this.toggleIsEditing,
                        'data-resin-target': SKILLS_TARGETS.FACES.EDIT
                    },
                    React.createElement(IconEdit, null)
                ),
                hasFaces ? entries.map(function (face, index) {
                    return (
                        /* eslint-disable react/no-array-index-key */
                        React.createElement(Face, {
                            key: index,
                            face: face,
                            selected: selected,
                            isEditing: isEditing,
                            onDelete: _this2.onDelete,
                            onSelect: _this2.onSelect
                        })
                        /* eslint-enable react/no-array-index-key */

                    );
                }) : React.createElement(FormattedMessage, messages.skillNoInfoFoundError),
                !!selected && !isEditing && Array.isArray(selected.appears) && selected.appears.length > 0 && React.createElement(Timeline, {
                    timeslices: selected.appears,
                    duration: duration,
                    getPreviewer: getPreviewer,
                    interactionTarget: SKILLS_TARGETS.FACES.TIMELINE
                }),
                isEditing && React.createElement(
                    'div',
                    { className: 'be-faces-buttons' },
                    React.createElement(
                        Button,
                        {
                            type: 'button',
                            onClick: this.onCancel,
                            'data-resin-target': SKILLS_TARGETS.FACES.EDIT_CANCEL
                        },
                        React.createElement(FormattedMessage, messages.cancel)
                    ),
                    React.createElement(
                        PrimaryButton,
                        {
                            type: 'button',
                            onClick: this.onSave,
                            'data-resin-target': SKILLS_TARGETS.FACES.EDIT_SAVE
                        },
                        React.createElement(FormattedMessage, messages.save)
                    )
                ),
                isLoading && React.createElement(SkillsBusyIndicator, null)
            );
        }
    }]);

    return Faces;
}(React.PureComponent);

export default Faces;