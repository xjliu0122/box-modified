var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file An example of a token managing service
 * @author Box
 */

import { TYPED_ID_FOLDER_PREFIX, TYPED_ID_FILE_PREFIX } from '../constants';

var error = new Error('Bad id or auth token. ID should be typed id like file_123 or folder_123! Token should be a string or function.');

var TokenService = function () {
    function TokenService() {
        _classCallCheck(this, TokenService);
    }

    _createClass(TokenService, null, [{
        key: 'getToken',

        /**
         * Function to fetch a single token. The user supplied token can either
         * itself be a simple token or instead be a function that returns a promise.
         * This promise then resolves to either a string/null/undefined token or
         * a read/write token pair.
         *
         * @private
         * @param {string} id - box item typed id
         * @param {string} tokenOrTokenFunction - Optional token or token function
         * @return {Promise} that resolves to a token
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, tokenOrTokenFunction) {
                var token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(tokenOrTokenFunction !== null && tokenOrTokenFunction !== undefined && typeof tokenOrTokenFunction !== 'string' && typeof tokenOrTokenFunction !== 'function' || !id.startsWith(TYPED_ID_FOLDER_PREFIX) && !id.startsWith(TYPED_ID_FILE_PREFIX))) {
                                    _context.next = 2;
                                    break;
                                }

                                throw error;

                            case 2:
                                if (!(!tokenOrTokenFunction || typeof tokenOrTokenFunction === 'string')) {
                                    _context.next = 4;
                                    break;
                                }

                                return _context.abrupt('return', tokenOrTokenFunction);

                            case 4:
                                _context.next = 6;
                                return tokenOrTokenFunction(id);

                            case 6:
                                token = _context.sent;

                                if (!(!token || typeof token === 'string' || (typeof token === 'undefined' ? 'undefined' : _typeof(token)) === 'object' && (token.read || token.write))) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return', token);

                            case 9:
                                throw error;

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getToken(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return getToken;
        }()

        /**
         * Gets a string read token.
         * Defaults to a simple token string.
         *
         * @public
         * @param {string} id - box item typed id
         * @param {string} tokenOrTokenFunction - Optional token or token function
         * @return {Promise} that resolves to a token
         */

    }, {
        key: 'getReadToken',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, tokenOrTokenFunction) {
                var token;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return TokenService.getToken(id, tokenOrTokenFunction);

                            case 2:
                                token = _context2.sent;

                                if (!(token && (typeof token === 'undefined' ? 'undefined' : _typeof(token)) === 'object')) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('return', token.read);

                            case 5:
                                return _context2.abrupt('return', token);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getReadToken(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return getReadToken;
        }()

        /**
         * Gets a string write token.
         * Defaults to either the read token or a simple token string.
         *
         * @public
         * @param {string} id - box item typed id
         * @param {string} tokenOrTokenFunction - Optional token or token function
         * @return {Promise} that resolves to a token
         */

    }, {
        key: 'getWriteToken',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, tokenOrTokenFunction) {
                var token;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return TokenService.getToken(id, tokenOrTokenFunction);

                            case 2:
                                token = _context3.sent;

                                if (!(token && (typeof token === 'undefined' ? 'undefined' : _typeof(token)) === 'object')) {
                                    _context3.next = 5;
                                    break;
                                }

                                return _context3.abrupt('return', token.write || token.read);

                            case 5:
                                return _context3.abrupt('return', token);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getWriteToken(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return getWriteToken;
        }()

        /**
         * Function to fetch and cache multiple tokens. The user supplied token can either
         * itself be a simple token or instead be a function that returns a promise.
         * This promise then resolves signifying requested tokens were cached.
         *
         * This function however does not return tokens as it is expected to only be used
         * by the token generator to cache all tokens that may be needed in the future.
         *
         * @public
         * @param {Array<string>} idd - box item typed ids
         * @param {string} tokenOrTokenFunction - Optional token or token function
         * @return {Promise<TokenMap>} that resolves to a token map
         */

    }, {
        key: 'cacheTokens',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ids, tokenOrTokenFunction) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(tokenOrTokenFunction !== null && tokenOrTokenFunction !== undefined && typeof tokenOrTokenFunction !== 'string' && typeof tokenOrTokenFunction !== 'function' || !ids.every(function (itemId) {
                                    return itemId.startsWith(TYPED_ID_FOLDER_PREFIX) || itemId.startsWith(TYPED_ID_FILE_PREFIX);
                                }))) {
                                    _context4.next = 2;
                                    break;
                                }

                                throw error;

                            case 2:
                                if (!(typeof tokenOrTokenFunction === 'function')) {
                                    _context4.next = 5;
                                    break;
                                }

                                _context4.next = 5;
                                return tokenOrTokenFunction(ids);

                            case 5:
                                return _context4.abrupt('return', Promise.resolve());

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function cacheTokens(_x7, _x8) {
                return _ref4.apply(this, arguments);
            }

            return cacheTokens;
        }()
    }]);

    return TokenService;
}();

export default TokenService;