var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box versions API
 * @author Box
 */

import Base from './Base';

var FileAccessStats = function (_Base) {
    _inherits(FileAccessStats, _Base);

    function FileAccessStats() {
        _classCallCheck(this, FileAccessStats);

        return _possibleConstructorReturn(this, (FileAccessStats.__proto__ || Object.getPrototypeOf(FileAccessStats)).apply(this, arguments));
    }

    _createClass(FileAccessStats, [{
        key: 'getUrl',

        /**
         * API URL for access stats
         *
         * @param {string} [id] - a box file id
         * @return {string} base url for files
         */
        value: function getUrl(id) {
            if (!id) {
                throw new Error('Missing file id!');
            }
            return this.getBaseApiUrl() + '/file_access_stats/' + id;
        }
    }]);

    return FileAccessStats;
}(Base);

export default FileAccessStats;