var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box web link api
 * @author Box
 */

import Item from './Item';
import { CACHE_PREFIX_WEBLINK } from '../constants';

var WebLink = function (_Item) {
  _inherits(WebLink, _Item);

  function WebLink() {
    _classCallCheck(this, WebLink);

    return _possibleConstructorReturn(this, (WebLink.__proto__ || Object.getPrototypeOf(WebLink)).apply(this, arguments));
  }

  _createClass(WebLink, [{
    key: 'getCacheKey',

    /**
     * Creates a key for the cache
     *
     * @param {string} id folder id
     * @return {string} key
     */
    value: function getCacheKey(id) {
      return '' + CACHE_PREFIX_WEBLINK + id;
    }

    /**
     * URL for weblink api
     *
     * @param {string} [id] optional file id
     * @return {string} base url for files
     */

  }, {
    key: 'getUrl',
    value: function getUrl(id) {
      var suffix = id ? '/' + id : '';
      return this.getBaseApiUrl() + '/web_links' + suffix;
    }
  }]);

  return WebLink;
}(Item);

export default WebLink;