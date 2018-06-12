var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file avatar component
 * @author Box
 */
import * as React from 'react';
import AvatarComponent from 'box-react-ui/lib/components/avatar';

var Avatar = function (_React$PureComponent) {
    _inherits(Avatar, _React$PureComponent);

    function Avatar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Avatar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            avatarUrl: null
        }, _this.getAvatarUrlHandler = function (avatarUrl) {
            _this.setState({
                avatarUrl: avatarUrl
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Success handler for getting avatar url
     *
     * @param {string} avatarUrl the user avatar url
     */


    _createClass(Avatar, [{
        key: 'getAvatarUrl',


        /**
         * Gets the avatar URL for the user from the getAvatarUrl prop
         *
         * @return {Promise} a promise which resolves with the avatarUrl string
         */
        value: function getAvatarUrl() {
            var _props = this.props,
                user = _props.user,
                getAvatarUrl = _props.getAvatarUrl;

            return getAvatarUrl(user.id).then(this.getAvatarUrlHandler);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getAvatarUrl();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                user = _props2.user,
                className = _props2.className;
            var avatarUrl = this.state.avatarUrl;


            if (!avatarUrl) {
                return null;
            }

            var id = user.id,
                name = user.name;


            return React.createElement(AvatarComponent, { className: className, id: id, name: name, avatarUrl: avatarUrl });
        }
    }]);

    return Avatar;
}(React.PureComponent);

export default Avatar;