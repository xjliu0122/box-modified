function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Multiput upload base class
 * @author Box
 */
import BaseUpload from './BaseUpload';

var DEFAULT_MULTIPUT_CONFIG = {
    digestReadahead: 5, // How many parts past those currently uploading to precompute digest for
    initialRetryDelayMs: 5000, // Base for exponential backoff on retries
    maxRetryDelayMs: 60000, // Upper bound for time between retries
    parallelism: 5, // Maximum number of parts to upload at a time
    requestTimeoutMs: 120000, // Idle timeout on part upload, overall request timeout on other requests
    // eslint-disable-next-line max-len
    retries: 5 // How many times to retry requests such as upload part or commit. Note that total number of attempts will be retries + 1 in worst case where all attempts fail.
};

var BaseMultiput = function (_BaseUpload) {
    _inherits(BaseMultiput, _BaseUpload);

    /**
     * [constructor]
     *
     * @param {Options} options
     * @param {Object} sessionEndpoints
     * @param {MultiputConfig} [config]
     * @return {void}
     */
    function BaseMultiput(options, sessionEndpoints, config) {
        _classCallCheck(this, BaseMultiput);

        var _this = _possibleConstructorReturn(this, (BaseMultiput.__proto__ || Object.getPrototypeOf(BaseMultiput)).call(this, options));

        _this.logEvent = function (eventType, eventInfo) {
            var data = {
                event_type: eventType
            };

            if (eventInfo) {
                data.event_info = eventInfo;
            }

            return _this.xhr.post({
                url: _this.sessionEndpoints.logEvent,
                data: data
            });
        };

        _this.config = config || DEFAULT_MULTIPUT_CONFIG;
        _this.sessionEndpoints = sessionEndpoints;
        return _this;
    }

    /**
     * POST log event
     *
     * @param {string} eventType
     * @param {string} [eventInfo]
     * @return {Promise}
     */


    return BaseMultiput;
}(BaseUpload);

export default BaseMultiput;