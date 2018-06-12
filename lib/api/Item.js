var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box item API
 * @author Box
 */

import noop from 'lodash/noop';
import setProp from 'lodash/set';
import Base from './Base';
import { getBadItemError } from '../util/error';
import { ACCESS_NONE, CACHE_PREFIX_SEARCH, CACHE_PREFIX_FOLDER, TYPE_FOLDER } from '../constants';

var Item = function (_Base) {
    _inherits(Item, _Base);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.deleteSuccessHandler = function () {
            if (_this.isDestroyed()) {
                return;
            }

            // When fetching the parent folder from the cache
            // we have no guarantees that it will be there since
            // search results happen across folders and we only
            // add those folders to cache that have been navigated to.
            var parentKey = _this.getParentCacheKey(_this.parentId);
            var folder = _this.getCache().get(parentKey);
            if (!folder) {
                _this.postDeleteCleanup();
                return;
            }

            // Same logic as above but in this case we may have the parent
            // folders meta data in cache but not its contents.
            var item_collection = folder.item_collection;

            if (!item_collection) {
                _this.postDeleteCleanup();
                return;
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            var childKey = _this.getCacheKey(_this.id);
            var oldCount = entries.length;
            var newEntries = entries.filter(function (entry) {
                return entry !== childKey;
            });
            var newCount = newEntries.length;

            var updatedObject = _this.merge(parentKey, 'item_collection', Object.assign(item_collection, {
                entries: newEntries,
                total_count: total_count - (oldCount - newCount)
            }));

            _this.successCallback(updatedObject);
            _this.postDeleteCleanup();
        }, _this.renameSuccessHandler = function (_ref2) {
            var data = _ref2.data;

            if (!_this.isDestroyed()) {
                // Get rid of all searches
                _this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
                var updatedObject = _this.merge(_this.getCacheKey(_this.id), 'name', data.name);
                _this.successCallback(updatedObject);
            }
        }, _this.shareSuccessHandler = function (_ref3) {
            var data = _ref3.data;

            if (!_this.isDestroyed()) {
                var updatedObject = _this.merge(_this.getCacheKey(_this.id), 'shared_link', data.shared_link);
                _this.successCallback(updatedObject);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Item, [{
        key: 'getParentCacheKey',


        /**
         * Creates a key for the item's parent
         * This is always a folder
         *
         * @param {string} Id - folder id
         * @return {string} Key
         */


        /**
         * @property {Function}
         */

        /**
         * @property {string}
         */
        value: function getParentCacheKey(id) {
            return '' + CACHE_PREFIX_FOLDER + id;
        }

        /**
         * Creates a key for the cache
         *
         * @param {string} Id - Folder id
         * @return {string} Key
         */


        /**
         * @property {Function}
         */


        /**
         * @property {string}
         */

    }, {
        key: 'getCacheKey',
        value: function getCacheKey(id) {
            return 'getCacheKey(' + id + ') should be overriden';
        }

        /**
         * API URL for items
         *
         * @param {string} id - Item id
         * @protected
         * @return {string} Base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            return 'getUrl(' + id + ') should be overriden';
        }

        /**
         * Merges new data with old data and returns new data
         *
         * @param {String} cacheKey - The cache key of item to merge
         * @param {String} key - The attribute to merge
         * @param {Object} value - The value to merge
         * @return {BoxItem} The newly updated object from the cache
         */

    }, {
        key: 'merge',
        value: function merge(cacheKey, key, value) {
            var cache = this.getCache();
            cache.merge(cacheKey, setProp({}, key, value));
            return cache.get(cacheKey);
        }

        /**
         * Steps to do after deletion
         *
         * @return {void}
         */

    }, {
        key: 'postDeleteCleanup',
        value: function postDeleteCleanup() {
            if (this.isDestroyed()) {
                return;
            }

            // Get rid of all searches
            this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
            this.successCallback();
        }

        /**
         * Handles response for deletion
         *
         * @return {void}
         */

    }, {
        key: 'deleteItem',


        /**
         * API to delete an Item
         *
         * @param {Object} item - Item to delete
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */
        value: function deleteItem(item, successCallback) {
            var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions,
                parent = item.parent,
                type = item.type;

            if (!id || !permissions || !parent || !type) {
                errorCallback();
                return Promise.reject();
            }

            var parentId = parent.id;
            var can_delete = permissions.can_delete;

            if (!can_delete || !parentId) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.parentId = parentId;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            var url = '' + this.getUrl(id) + (type === TYPE_FOLDER ? '?recursive=true' : '');
            return this.xhr.delete({ url: url }).then(this.deleteSuccessHandler).catch(this.errorHandler);
        }

        /**
         * Handles response for rename
         *
         * @param {BoxItem} data - The updated item
         * @return {void}
         */

    }, {
        key: 'rename',


        /**
         * API to rename an Item
         *
         * @param {Object} item - Item to rename
         * @param {string} name - Item new name
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */
        value: function rename(item, name, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions;

            if (!id || !permissions) {
                errorCallback();
                return Promise.reject();
            }

            var can_rename = permissions.can_rename;

            if (!can_rename) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            return this.xhr.put({ url: '' + this.getUrl(id), data: { name: name } }).then(this.renameSuccessHandler).catch(this.errorHandler);
        }

        /**
         * Handles response for shared link
         *
         * @param {BoxItem} data - The updated item
         * @return {void}
         */

    }, {
        key: 'share',


        /**
         * API to create or remove a shared link
         *
         * @param {Object} item - Item to share
         * @param {string} access - Shared access level
         * @param {Function} successCallback - Success callback
         * @param {Function|void} errorCallback - Error callback
         * @return {void}
         */
        value: function share(item, access, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var id = item.id,
                permissions = item.permissions;

            if (!id || !permissions) {
                errorCallback();
                return Promise.reject();
            }

            var can_share = permissions.can_share,
                can_set_share_access = permissions.can_set_share_access;

            if (!can_share || !can_set_share_access) {
                errorCallback();
                return Promise.reject();
            }

            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;

            // We use the parent folder's auth token since use case involves
            // only content explorer or picker which works onf folder tokens
            return this.xhr.put({
                url: this.getUrl(this.id),
                data: {
                    shared_link: access === ACCESS_NONE ? null : { access: access }
                }
            }).then(this.shareSuccessHandler).catch(this.errorHandler);
        }
    }]);

    return Item;
}(Base);

export default Item;