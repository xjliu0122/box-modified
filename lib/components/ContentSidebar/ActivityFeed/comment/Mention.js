var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Mention component
 */

import * as React from 'react';

var Mention = function (_React$PureComponent) {
    _inherits(Mention, _React$PureComponent);

    function Mention() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mention);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mention.__proto__ || Object.getPrototypeOf(Mention)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.getProfileUrlHandler = function (profileUrl) {
            _this.setState({
                profileUrl: profileUrl
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Success handler for getting avatar url
     *
     * @param {string} avatarUrl the user avatar url
     */


    _createClass(Mention, [{
        key: 'getUserProfileUrl',


        /**
         * Gets the avatar URL for the user from the getAvatarUrl prop
         *
         * @return {Promise} a promise which resolves with the avatarUrl string
         */
        value: function getUserProfileUrl() {
            var _props = this.props,
                id = _props.id,
                getUserProfileUrl = _props.getUserProfileUrl;

            if (!getUserProfileUrl) {
                return Promise.resolve();
            }
            return getUserProfileUrl(id).then(this.getProfileUrlHandler);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getUserProfileUrl();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                rest = _objectWithoutProperties(_props2, ['children']);

            var profileUrl = this.state.profileUrl;


            return profileUrl ? React.createElement(
                'a',
                _extends({}, rest, { style: { display: 'inline-block' }, href: profileUrl }),
                children
            ) : children;
        }
    }]);

    return Mention;
}(React.PureComponent);

export default Mention;