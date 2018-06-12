var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file HOC to make popup-able Box UI Elements
 * @author Box
 */

import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

import { CLIENT_NAME_CONTENT_PICKER, CLIENT_NAME_CONTENT_UPLOADER, CLIENT_NAME_CONTENT_TREE } from '../constants';

var makePopup = function makePopup(kit) {
    return function (Wrapped) {
        return function (_PureComponent) {
            _inherits(Wrapper, _PureComponent);

            /**
             * [constructor]
             *
             * @param {*} props
             * @return {Wrapper}
             */
            function Wrapper(props) {
                _classCallCheck(this, Wrapper);

                var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

                _this.onClick = function (data) {
                    var _this$props$onClick = _this.props.onClick,
                        onClick = _this$props$onClick === undefined ? noop : _this$props$onClick;

                    _this.close(onClick, data);
                };

                _this.onClose = function (data) {
                    var _this$props$onClose = _this.props.onClose,
                        onClose = _this$props$onClose === undefined ? noop : _this$props$onClose;

                    _this.close(onClose, data);
                };

                _this.onCancel = function (data) {
                    var _this$props$onCancel = _this.props.onCancel,
                        onCancel = _this$props$onCancel === undefined ? noop : _this$props$onCancel;

                    _this.close(onCancel, data);
                };

                _this.onChoose = function (data) {
                    var _this$props$onChoose = _this.props.onChoose,
                        onChoose = _this$props$onChoose === undefined ? noop : _this$props$onChoose;

                    _this.close(onChoose, data);
                };

                _this.onButtonClick = function () {
                    _this.setState({ isOpen: true });
                };

                _this.state = {
                    isOpen: false
                };
                return _this;
            }

            /**
             * Hides the modal and call the callback
             *
             * @param {Function} callback - function to call
             * @return {void}
             */


            _createClass(Wrapper, [{
                key: 'close',
                value: function close(callback, data) {
                    this.setState({ isOpen: false }, function () {
                        return callback(data);
                    });
                }

                /**
                 * Callback for clicking
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing close
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing cancel
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Callback for pressing choose
                 *
                 * @param {*} data - any callback data
                 * @return {void}
                 */


                /**
                 * Button click handler
                 *
                 * @return {void}
                 */

            }, {
                key: 'render',


                /**
                 * Renders the component
                 *
                 * @return {void}
                 */
                value: function render() {
                    var isOpen = this.state.isOpen;

                    var _props = this.props,
                        modal = _props.modal,
                        rest = _objectWithoutProperties(_props, ['modal']);

                    var wrappedProps = omit(rest, ['onCancel', 'onChoose', 'onClose', 'modal']);
                    var _modal$buttonLabel = modal.buttonLabel,
                        buttonLabel = _modal$buttonLabel === undefined ? 'Missing modal.buttonLabel in options' : _modal$buttonLabel,
                        _modal$buttonClassNam = modal.buttonClassName,
                        buttonClassName = _modal$buttonClassNam === undefined ? 'btn btn-primary' : _modal$buttonClassNam,
                        _modal$modalClassName = modal.modalClassName,
                        modalClassName = _modal$modalClassName === undefined ? 'be-modal-wrapper-content' : _modal$modalClassName,
                        _modal$overlayClassNa = modal.overlayClassName,
                        overlayClassName = _modal$overlayClassNa === undefined ? 'be-modal-wrapper-overlay' : _modal$overlayClassNa;


                    switch (kit) {
                        case CLIENT_NAME_CONTENT_PICKER:
                            wrappedProps.onCancel = this.onCancel;
                            wrappedProps.onChoose = this.onChoose;
                            break;
                        case CLIENT_NAME_CONTENT_UPLOADER:
                            wrappedProps.onClose = this.onClose;
                            break;
                        case CLIENT_NAME_CONTENT_TREE:
                            wrappedProps.onClick = this.onClick;
                            break;
                        default:
                            throw new Error('Unknown kit type');
                    }

                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'button',
                            { type: 'button', onClick: this.onButtonClick, className: buttonClassName },
                            buttonLabel
                        ),
                        React.createElement(
                            Modal,
                            {
                                isOpen: isOpen,
                                contentLabel: kit,
                                className: modalClassName,
                                overlayClassName: overlayClassName
                            },
                            React.createElement(Wrapped, wrappedProps)
                        )
                    );
                }
            }]);

            return Wrapper;
        }(PureComponent);
    };
};

export default makePopup;