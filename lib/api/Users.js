var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box Users API
 * @author Box
 */

import Base from './Base';
import TokenService from '../util/TokenService';
import { getTypedFileId } from '../util/file';

var Users = function (_Base) {
    _inherits(Users, _Base);

    function Users() {
        _classCallCheck(this, Users);

        return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
    }

    _createClass(Users, [{
        key: 'getUrl',

        /**
         * API URL for Users
         *
         * @param {string} [id] - A box user id. Defaults to 'me' if empty.
         * @return {string} base url for users
         */
        value: function getUrl(id) {
            var userId = id || 'me';
            return this.getBaseApiUrl() + '/users/' + userId;
        }

        /**
         * API URL for Users avatar
         *
         * @param {string} [id] - A box user id.
         * @return {string} base url for users
         */

    }, {
        key: 'getAvatarUrl',
        value: function getAvatarUrl(id) {
            if (!id) {
                throw new Error('Missing user id');
            }
            return this.getUrl(id) + '/avatar';
        }

        /**
         * Gets the user avatar URL
         *
         * @param {string} userId the user id
         * @param {string} fileId the file id
         * @return {string} the user avatar URL string for a given user with access token attached
         */

    }, {
        key: 'getAvatarUrlWithAccessToken',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, fileId) {
                var accessToken;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return TokenService.getReadToken(getTypedFileId(fileId), this.options.token);

                            case 2:
                                accessToken = _context.sent;

                                if (!(typeof accessToken === 'string')) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', this.getAvatarUrl(userId) + '?access_token=' + accessToken);

                            case 5:
                                return _context.abrupt('return', null);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getAvatarUrlWithAccessToken(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return getAvatarUrlWithAccessToken;
        }()
    }]);

    return Users;
}(Base);

export default Users;