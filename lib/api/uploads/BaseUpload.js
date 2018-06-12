function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Base helper for the Box Upload APIs
 * @author Box
 */

import Base from '../Base';
import { DEFAULT_RETRY_DELAY_MS, MS_IN_S } from '../../constants';

var MAX_RETRY = 5;

var BaseUpload = function (_Base) {
    _inherits(BaseUpload, _Base);

    function BaseUpload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BaseUpload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseUpload.__proto__ || Object.getPrototypeOf(BaseUpload)).call.apply(_ref, [this].concat(args))), _this), _this.retryCount = 0, _this.makePreflightRequest = function () {
            if (_this.isDestroyed()) {
                return;
            }

            var url = _this.getBaseApiUrl() + '/files/content';
            if (_this.fileId) {
                url = url.replace('content', _this.fileId + '/content');
            }

            var _this$file = _this.file,
                size = _this$file.size,
                name = _this$file.name;

            var attributes = {
                name: _this.fileName || name,
                parent: { id: _this.folderId },
                size: size
            };

            _this.xhr.options({
                url: url,
                data: attributes,
                successHandler: _this.preflightSuccessHandler,
                errorHandler: _this.preflightErrorHandler
            });
        }, _this.preflightErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }

            _this.fileName = _this.file ? _this.file.name : '';

            // TODO(tonyjin): Normalize error object and clean up error handling
            var errorData = error;
            var response = error.response;

            if (response && response.data) {
                errorData = response.data;
            }

            if (_this.retryCount >= MAX_RETRY) {
                _this.errorCallback(errorData);
                // Automatically handle name conflict errors
            } else if (errorData && errorData.status === 409) {
                if (_this.overwrite) {
                    var conflictFileId = errorData.context_info.conflicts.id;
                    if (!_this.fileId && !!conflictFileId) {
                        _this.fileId = conflictFileId;
                    }
                    // Error response contains file ID to upload a new file version for
                    _this.makePreflightRequest();
                } else {
                    // Otherwise, reupload and append timestamp
                    // 'test.jpg' becomes 'test-TIMESTAMP.jpg'
                    var extension = _this.fileName.substr(_this.fileName.lastIndexOf('.')) || '';
                    _this.fileName = _this.fileName.substr(0, _this.fileName.lastIndexOf('.')) + '-' + Date.now() + extension;
                    _this.makePreflightRequest();
                }
                _this.retryCount += 1;
                // When rate limited, retry after interval defined in header
            } else if (errorData && (errorData.status === 429 || errorData.code === 'too_many_requests')) {
                var retryAfterMs = DEFAULT_RETRY_DELAY_MS;

                if (errorData.headers) {
                    var retryAfterSec = parseInt(errorData.headers['retry-after'] || errorData.headers.get('Retry-After'), 10);

                    if (!Number.isNaN(retryAfterSec)) {
                        retryAfterMs = retryAfterSec * MS_IN_S;
                    }
                }

                _this.retryTimeout = setTimeout(_this.makePreflightRequest, retryAfterMs);
                _this.retryCount += 1;

                // If another error status that isn't name conflict or rate limiting, fail upload
            } else if (errorData && (errorData.status || errorData.message === 'Failed to fetch') && typeof _this.errorCallback === 'function') {
                _this.errorCallback(errorData);
                // Retry with exponential backoff for other failures since these are likely to be network errors
            } else {
                _this.retryTimeout = setTimeout(_this.makePreflightRequest, Math.pow(2, _this.retryCount) * MS_IN_S);
                _this.retryCount += 1;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Sends an upload pre-flight request. If a file ID is available,
     * send a pre-flight request to that file version.
     *
     * @private
     * @return {void}
     */


    /**
     * Handles a preflight error
     *
     * @param {Object} error - preflight error
     * @return {void}
     */


    return BaseUpload;
}(Base);

export default BaseUpload;