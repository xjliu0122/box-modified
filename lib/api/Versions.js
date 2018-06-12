var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box versions API
 * @author Box
 */

import OffsetBasedAPI from './OffsetBasedAPI';

var ACTION = {
    upload: 'upload',
    delete: 'delete',
    restore: 'restore'
};

var Versions = function (_OffsetBasedAPI) {
    _inherits(Versions, _OffsetBasedAPI);

    function Versions() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Versions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Versions.__proto__ || Object.getPrototypeOf(Versions)).call.apply(_ref, [this].concat(args))), _this), _this.successHandler = function (data) {
            if (_this.isDestroyed() || typeof _this.successCallback !== 'function') {
                return;
            }

            var entries = data.entries;

            var versions = entries.reverse().map(function (version, index) {
                return _extends({}, version, {
                    action: version.trashed_at ? ACTION.delete : ACTION.upload,
                    version_number: index + 1 // adjust for offset
                });
            });

            _this.successCallback(_extends({}, data, { entries: versions }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Versions, [{
        key: 'getUrl',

        /**
         * API URL for versions
         *
         * @param {string} [id] - a box file id
         * @return {string} base url for files
         */
        value: function getUrl(id) {
            if (!id) {
                throw new Error('Missing file id!');
            }
            return this.getBaseApiUrl() + '/files/' + id + '/versions';
        }

        /**
         * Formats the versions api response to usable data
         * @param {Object} data the api response data
         */

    }]);

    return Versions;
}(OffsetBasedAPI);

export default Versions;