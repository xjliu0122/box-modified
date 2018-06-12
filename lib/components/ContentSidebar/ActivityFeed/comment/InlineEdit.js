var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Inline Edit component
 */

import * as React from 'react';
import { injectIntl } from 'react-intl';

import PlainButton from 'box-react-ui/lib/components/plain-button';
import IconPencil from 'box-react-ui/lib/icons/general/IconPencil';

import messages from '../../../messages';

var InlineEdit = function (_React$Component) {
    _inherits(InlineEdit, _React$Component);

    function InlineEdit() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InlineEdit);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InlineEdit.__proto__ || Object.getPrototypeOf(InlineEdit)).call.apply(_ref, [this].concat(args))), _this), _this.onEdit = function () {
            var _this$props = _this.props,
                id = _this$props.id,
                toEdit = _this$props.toEdit;

            toEdit({ id: id });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InlineEdit, [{
        key: 'render',
        value: function render() {
            var onEdit = this.onEdit;

            return React.createElement(
                'div',
                { className: 'bcs-comment-edit-container' },
                React.createElement(
                    PlainButton,
                    {
                        'aria-label': this.props.intl.formatMessage(messages.editLabel),
                        className: 'bcs-comment-edit',
                        onClick: onEdit,
                        type: 'button'
                    },
                    React.createElement(IconPencil, null)
                )
            );
        }
    }]);

    return InlineEdit;
}(React.Component);

export { InlineEdit as InlineEditBase };
export default injectIntl(InlineEdit);