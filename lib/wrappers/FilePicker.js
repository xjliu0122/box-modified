var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Main entry point for the File Picker ES6 wrapper
 * @author Box
 */

import ContentPicker from './ContentPicker';
import { TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_FILE_PICKER } from '../constants';

var FilePicker = function (_ContentPicker) {
    _inherits(FilePicker, _ContentPicker);

    function FilePicker() {
        _classCallCheck(this, FilePicker);

        return _possibleConstructorReturn(this, (FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).apply(this, arguments));
    }

    _createClass(FilePicker, [{
        key: 'getType',

        /** @inheritdoc */
        value: function getType() {
            return TYPE_FILE + ',' + TYPE_WEBLINK;
        }

        /** @inheritdoc */

    }, {
        key: 'getClientName',
        value: function getClientName() {
            return CLIENT_NAME_FILE_PICKER;
        }
    }]);

    return FilePicker;
}(ContentPicker);

export default FilePicker;