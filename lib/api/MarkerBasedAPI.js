var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file class for Box marker based API's to inherit common functionality from
 * @author Box
 */
import { getTypedFileId } from '../util/file';
import Base from './Base';

var MarkerBasedApi = function (_Base) {
    _inherits(MarkerBasedApi, _Base);

    function MarkerBasedApi() {
        _classCallCheck(this, MarkerBasedApi);

        return _possibleConstructorReturn(this, (MarkerBasedApi.__proto__ || Object.getPrototypeOf(MarkerBasedApi)).apply(this, arguments));
    }

    _createClass(MarkerBasedApi, [{
        key: 'hasMoreItems',


        /**
         * Determines if the API has more items to fetch
         *
         * @param {string} marker the marker from the start to start fetching at
         * @return {boolean} true if there are more items
         */
        value: function hasMoreItems(marker) {
            return marker !== null && marker !== '';
        }

        /**
         * Helper for get
         *
         * @param {string} id the file id
         * @param {string} marker the marker from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {Object} params the request query params
         * @param {boolean} shouldFetchAll true if should get all the pages before calling
         * @private
         */

        /**
         * @property {Data}
         */

    }, {
        key: 'markerGetRequest',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, marker, limit, shouldFetchAll, params) {
                var url, queryParams, _ref2, data, _entries, nextMarker;

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
                                url = this.getUrl(id);
                                queryParams = _extends({}, params, {
                                    marker: marker,
                                    limit: limit
                                });
                                _context.next = 7;
                                return this.xhr.get({ url: url, id: getTypedFileId(id), params: queryParams });

                            case 7:
                                _ref2 = _context.sent;
                                data = _ref2.data;
                                _entries = this.data ? this.data.entries : [];

                                this.data = _extends({}, data, {
                                    entries: _entries.concat(data.entries)
                                });
                                nextMarker = data.next_marker;

                                if (!(shouldFetchAll && this.hasMoreItems(nextMarker))) {
                                    _context.next = 15;
                                    break;
                                }

                                this.markerGetRequest(id, nextMarker, limit, shouldFetchAll, params);
                                return _context.abrupt('return');

                            case 15:

                                this.successHandler(this.data);
                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](2);

                                this.errorHandler(_context.t0);

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 18]]);
            }));

            function markerGetRequest(_x, _x2, _x3, _x4, _x5) {
                return _ref.apply(this, arguments);
            }

            return markerGetRequest;
        }()

        /**
         * Marker based API get
         *
         * @param {string} id the file id
         * @param {Function} successCallback the success callback
         * @param {Function} errorCallback the error callback
         * @param {string} marker the marker from the start to start fetching at
         * @param {number} limit the number of items to fetch
         * @param {Object} params the request query params
         * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
         */

    }, {
        key: 'markerGet',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
                var id = _ref4.id,
                    successCallback = _ref4.successCallback,
                    errorCallback = _ref4.errorCallback,
                    _ref4$marker = _ref4.marker,
                    marker = _ref4$marker === undefined ? '' : _ref4$marker,
                    _ref4$limit = _ref4.limit,
                    limit = _ref4$limit === undefined ? 1000 : _ref4$limit,
                    params = _ref4.params,
                    _ref4$shouldFetchAll = _ref4.shouldFetchAll,
                    shouldFetchAll = _ref4$shouldFetchAll === undefined ? true : _ref4$shouldFetchAll;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.successCallback = successCallback;
                                this.errorCallback = errorCallback;

                                return _context2.abrupt('return', this.markerGetRequest(id, marker, limit, shouldFetchAll, params));

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function markerGet(_x6) {
                return _ref3.apply(this, arguments);
            }

            return markerGet;
        }()
    }]);

    return MarkerBasedApi;
}(Base);

export default MarkerBasedApi;