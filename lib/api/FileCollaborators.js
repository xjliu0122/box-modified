var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box collaborators API
 * @author Box
 */

import MarkerBasedAPI from './MarkerBasedAPI';

var FileCollaborators = function (_MarkerBasedAPI) {
    _inherits(FileCollaborators, _MarkerBasedAPI);

    function FileCollaborators() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FileCollaborators);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileCollaborators.__proto__ || Object.getPrototypeOf(FileCollaborators)).call.apply(_ref, [this].concat(args))), _this), _this.successHandler = function (data) {
            if (_this.isDestroyed() || typeof _this.successCallback !== 'function') {
                return;
            }

            var entries = data.entries;

            var collaborators = entries.map(function (collab) {
                var id = collab.id,
                    name = collab.name,
                    login = collab.login;

                return {
                    id: id,
                    name: name,
                    item: { id: id, name: name, email: login }
                };
            });

            _this.successCallback(_extends({}, data, { entries: collaborators }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FileCollaborators, [{
        key: 'getUrl',

        /**
         * API URL for comments
         *
         * @param {string} [id] - a box file id
         * @return {string} base url for files
         */
        value: function getUrl(id) {
            if (!id) {
                throw new Error('Missing file id!');
            }
            return this.getBaseApiUrl() + '/files/' + id + '/collaborators';
        }

        /**
         * Generic success handler
         *
         * @param {Object} data the response data
         */

    }]);

    return FileCollaborators;
}(MarkerBasedAPI);

export default FileCollaborators;