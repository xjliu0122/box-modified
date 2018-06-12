var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Preview sidebar section component
 * @author Box
 */

import * as React from 'react';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconCaretDown from 'box-react-ui/lib/icons/general/IconCaretDown';
import { COLOR_999 } from '../../constants';

var SidebarSection = function (_React$PureComponent) {
    _inherits(SidebarSection, _React$PureComponent);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPreview}
     */
    function SidebarSection(props) {
        _classCallCheck(this, SidebarSection);

        var _this = _possibleConstructorReturn(this, (SidebarSection.__proto__ || Object.getPrototypeOf(SidebarSection)).call(this, props));

        _this.toggleVisibility = function () {
            _this.setState(function (prevState) {
                return {
                    isOpen: !prevState.isOpen
                };
            });
        };

        _this.state = {
            isOpen: props.isOpen
        };
        return _this;
    }

    /**
     * Click handler for toggling the section
     *
     * @private
     * @param {Event} event - click event
     * @return {void}
     */


    _createClass(SidebarSection, [{
        key: 'render',


        /**
         * Renders the section
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        value: function render() {
            var isOpen = this.state.isOpen;
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                title = _props.title,
                interactionTarget = _props.interactionTarget;


            var sectionClassName = classNames('bcs-section', {
                'bcs-section-open': isOpen
            }, className);

            return React.createElement(
                'div',
                { className: sectionClassName },
                title && React.createElement(
                    PlainButton,
                    {
                        type: 'button',
                        onClick: this.toggleVisibility,
                        className: 'bcs-section-title',
                        'data-resin-target': interactionTarget
                    },
                    title,
                    React.createElement(IconCaretDown, { color: COLOR_999, width: 8 })
                ),
                (isOpen || !title) && React.createElement(
                    'div',
                    { className: 'bcs-section-content' },
                    children
                )
            );
        }
    }]);

    return SidebarSection;
}(React.PureComponent);

SidebarSection.defaultProps = {
    className: '',
    isOpen: true
};


export default SidebarSection;