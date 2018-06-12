var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box metadata related API
 * @author Box
 */

import File from './File';
import { HEADER_CONTENT_TYPE } from '../constants';
import { getBadItemError, getBadPermissionsError } from '../util/error';
import { getTypedFileId } from '../util/file';

var Metadata = function (_File) {
    _inherits(Metadata, _File);

    function Metadata() {
        _classCallCheck(this, Metadata);

        return _possibleConstructorReturn(this, (Metadata.__proto__ || Object.getPrototypeOf(Metadata)).apply(this, arguments));
    }

    _createClass(Metadata, [{
        key: 'getMetadataUrl',

        /**
         * API URL metadata
         *
         * @param {string} id - a box file id
         * @param {string} field - metadata field
         * @return {string} base url for files
         */
        value: function getMetadataUrl(id, field) {
            if (!field.startsWith('metadata')) {
                throw new Error('Metadata field should start with metadata');
            }
            return this.getUrl(id) + '/' + field.replace(/\./g, '/');
        }

        /**
         * API for patching metadata on file
         *
         * @param {BoxItem} file - File object for which we are changing the description
         * @param {string} field - Metadata field to patch
         * @param {Array} operations - Array of JSON patch operations
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {Promise}
         */

    }, {
        key: 'patch',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, field, operations, successCallback, errorCallback) {
                var id, permissions, metadata, updatedFile;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                id = file.id, permissions = file.permissions;

                                if (!(!id || !permissions)) {
                                    _context.next = 4;
                                    break;
                                }

                                errorCallback(getBadItemError());
                                return _context.abrupt('return');

                            case 4:
                                if (permissions.can_upload) {
                                    _context.next = 7;
                                    break;
                                }

                                errorCallback(getBadPermissionsError());
                                return _context.abrupt('return');

                            case 7:

                                this.successCallback = successCallback;
                                this.errorCallback = errorCallback;

                                _context.prev = 9;
                                _context.next = 12;
                                return this.xhr.put({
                                    url: this.getMetadataUrl(id, field),
                                    headers: _defineProperty({}, HEADER_CONTENT_TYPE, 'application/json-patch+json'),
                                    id: getTypedFileId(id),
                                    data: operations
                                });

                            case 12:
                                metadata = _context.sent;

                                if (!this.isDestroyed()) {
                                    updatedFile = this.merge(this.getCacheKey(id), field, metadata.data);

                                    this.successHandler(updatedFile);
                                }
                                _context.next = 19;
                                break;

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context['catch'](9);

                                this.errorHandler(_context.t0);

                            case 19:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 16]]);
            }));

            function patch(_x, _x2, _x3, _x4, _x5) {
                return _ref.apply(this, arguments);
            }

            return patch;
        }()
    }]);

    return Metadata;
}(File);

export default Metadata;