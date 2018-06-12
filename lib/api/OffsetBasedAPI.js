var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file class for Box offset based API's to inherit common functionality from
 * @author Box
 */
import { getTypedFileId } from '../util/file';
import Base from './Base';

var OffsetBasedApi = function (_Base) {
    _inherits(OffsetBasedApi, _Base);

    function OffsetBasedApi() {
        _classCallCheck(this, OffsetBasedApi);

        return _possibleConstructorReturn(this, (OffsetBasedApi.__proto__ || Object.getPrototypeOf(OffsetBasedApi)).apply(this, arguments));
    }

    _createClass(OffsetBasedApi, [{
        key: 'getQueryParameters',


        /**
         * Gets query params for the API
         *
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {array} fields the fields to fetch
         * @return the query params object
         */
        value: function getQueryParameters(offset, limit, fields) {
            var queryParams = {
                offset: offset,
                limit: limit
            };

            if (fields && fields.length > 0) {
                queryParams.fields = fields.toString();
            }

            return queryParams;
        }

        /**
         * Determines if the API has more items to fetch
         *
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} totalCount the total number of items
         * @return {boolean} true if there are more items
         */

        /**
         * @property {Data}
         */

    }, {
        key: 'hasMoreItems',
        value: function hasMoreItems(offset, totalCount) {
            return totalCount === undefined || offset < totalCount;
        }

        /**
         * Helper for get
         *
         * @param {string} id the file id
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {array} fields the fields to fetch
         * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
         * @private
         */

    }, {
        key: 'offsetGetRequest',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, offset, limit, shouldFetchAll, fields) {
                var params, url, _ref2, data, _entries, totalCount, nextOffset;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.isDestroyed()) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 2:
                                _context.prev = 2;
                                params = this.getQueryParameters(offset, limit, fields);
                                url = this.getUrl(id);
                                _context.next = 7;
                                return this.xhr.get({ url: url, id: getTypedFileId(id), params: params });

                            case 7:
                                _ref2 = _context.sent;
                                data = _ref2.data;
                                _entries = this.data ? this.data.entries : [];

                                this.data = _extends({}, data, {
                                    entries: _entries.concat(data.entries)
                                });
                                totalCount = data.total_count;
                                nextOffset = offset + limit;

                                if (!(shouldFetchAll && this.hasMoreItems(nextOffset, totalCount))) {
                                    _context.next = 16;
                                    break;
                                }

                                this.offsetGetRequest(id, nextOffset, limit, shouldFetchAll, fields);
                                return _context.abrupt('return');

                            case 16:

                                this.successHandler(this.data);
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](2);

                                this.errorHandler(_context.t0);

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 19]]);
            }));

            function offsetGetRequest(_x, _x2, _x3, _x4, _x5) {
                return _ref.apply(this, arguments);
            }

            return offsetGetRequest;
        }()

        /**
         * Offset based API get
         *
         * @param {string} id the file id
         * @param {Function} successCallback the success callback
         * @param {Function} errorCallback the error callback
         * @param {number} offset the offset from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {array} fields the fields to fetch
         * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
         */

    }, {
        key: 'offsetGet',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, successCallback, errorCallback) {
                var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
                var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
                var fields = arguments[5];
                var shouldFetchAll = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.successCallback = successCallback;
                                this.errorCallback = errorCallback;

                                return _context2.abrupt('return', this.offsetGetRequest(id, offset, limit, shouldFetchAll, fields));

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function offsetGet(_x6, _x7, _x8) {
                return _ref3.apply(this, arguments);
            }

            return offsetGet;
        }()
    }]);

    return OffsetBasedApi;
}(Base);

export default OffsetBasedApi;