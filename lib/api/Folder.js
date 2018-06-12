var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box folder api
 * @author Box
 */

import noop from 'lodash/noop';
import Item from './Item';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import FileAPI from '../api/File';
import WebLinkAPI from '../api/WebLink';
import { getFieldsAsString } from '../util/fields';
import { CACHE_PREFIX_FOLDER, X_REP_HINTS } from '../constants';
import { getBadItemError } from '../util/error';

var LIMIT_ITEM_FETCH = 1000;

var Folder = function (_Item) {
    _inherits(Folder, _Item);

    function Folder() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Folder);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Folder.__proto__ || Object.getPrototypeOf(Folder)).call.apply(_ref, [this].concat(args))), _this), _this.folderSuccessHandler = function (_ref2) {
            var data = _ref2.data;

            if (_this.isDestroyed()) {
                return;
            }

            var item_collection = data.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count,
                limit = item_collection.limit,
                offset = item_collection.offset;

            if (!Array.isArray(entries) || typeof total_count !== 'number' || typeof limit !== 'number' || typeof offset !== 'number') {
                throw getBadItemError();
            }

            var flattened = flatten(entries, new Folder(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));
            _this.itemCache = (_this.itemCache || []).concat(flattened);

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var isLoaded = offset + limit >= total_count;

            _this.getCache().set(_this.key, Object.assign({}, data, {
                item_collection: Object.assign({}, item_collection, {
                    isLoaded: isLoaded,
                    entries: _this.itemCache
                })
            }));

            if (!isLoaded) {
                _this.offset += limit;
                _this.folderRequest();
            }

            _this.finish();
        }, _this.createSuccessHandler = function (_ref3) {
            var data = _ref3.data;
            var childId = data.id;

            if (_this.isDestroyed() || !childId) {
                return;
            }
            var childKey = _this.getCacheKey(childId);
            var cache = _this.getCache();
            var parent = cache.get(_this.key);

            var item_collection = parent.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var total_count = item_collection.total_count,
                entries = item_collection.entries;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            cache.set(childKey, data);
            item_collection.entries = [childKey].concat(entries);
            item_collection.total_count = total_count + 1;
            _this.successCallback(data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Folder, [{
        key: 'getCacheKey',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @return {string} key
         */


        /**
         * @property {boolean}
         */


        /**
         * @property {Function}
         */


        /**
         * @property {string}
         */


        /**
         * @property {string}
         */

        /**
         * @property {number}
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_FOLDER + id;
        }

        /**
         * Base URL for folder api
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */


        /**
         * @property {boolean}
         */


        /**
         * @property {Function}
         */


        /**
         * @property {Array}
         */


        /**
         * @property {string}
         */


        /**
         * @property {string}
         */

    }, {
        key: 'getUrl',
        value: function getUrl(id) {
            var suffix = id ? '/' + id : '';
            return this.getBaseApiUrl() + '/folders' + suffix;
        }

        /**
         * Tells if a folder has its items all loaded
         *
         * @return {boolean} if items are loaded
         */

    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            var cache = this.getCache();
            if (!cache.has(this.key)) {
                return false;
            }

            var _cache$get = cache.get(this.key),
                _cache$get$item_colle = _cache$get.item_collection,
                item_collection = _cache$get$item_colle === undefined ? {} : _cache$get$item_colle;

            return !!item_collection.isLoaded;
        }

        /**
         * Sorts and returns the results
         *
         * @return {void}
         */

    }, {
        key: 'finish',
        value: function finish() {
            if (this.isDestroyed()) {
                return;
            }

            var cache = this.getCache();
            var folder = cache.get(this.key);
            var sortedFolder = sort(folder, this.sortBy, this.sortDirection, cache);

            var id = sortedFolder.id,
                name = sortedFolder.name,
                permissions = sortedFolder.permissions,
                path_collection = sortedFolder.path_collection,
                item_collection = sortedFolder.item_collection;

            if (!item_collection || !path_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries,
                total_count = item_collection.total_count;

            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var percentLoaded = !!item_collection.isLoaded || total_count === 0 ? 100 : entries.length * 100 / total_count;

            var collection = {
                id: id,
                name: name,
                percentLoaded: percentLoaded,
                permissions: permissions,
                boxItem: sortedFolder,
                breadcrumbs: path_collection.entries,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
                items: entries.map(function (key) {
                    return cache.get(key);
                })
            };
            this.successCallback(collection);
        }

        /**
         * Handles the folder fetch response
         *
         * @param {Object} response
         * @return {void}
         */

    }, {
        key: 'folderRequest',


        /**
         * Does the network request for fetching a folder
         *
         * @return {void}
         */
        value: function folderRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            return this.xhr.get({
                url: this.getUrl(this.id),
                params: {
                    offset: this.offset,
                    limit: LIMIT_ITEM_FETCH,
                    fields: getFieldsAsString(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.folderSuccessHandler).catch(this.errorHandler);
        }

        /**
         * Gets a box folder and its items
         *
         * @param {string} id - Folder id
         * @param {string} sortBy - sort by field
         * @param {string} sortDirection - sort direction
         * @param {Function} successCallback - Function to call with results
         * @param {Function} errorCallback - Function to call with errors
         * @param {boolean|void} [forceFetch] - Bypasses the cache
         * @param {boolean|void} [includePreview] - Optionally include preview fields
         * @param {boolean|void} [includePreviewSidebar] - Optionally include preview sidebar fields
         * @return {void}
         */

    }, {
        key: 'folder',
        value: function folder(id, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var includePreviewFields = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewSidebarFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.offset = 0;
            this.id = id;
            this.key = this.getCacheKey(id);
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields; // implies preview

            // Clear the cache if needed
            if (forceFetch) {
                this.getCache().unset(this.key);
            }

            // Return the Cache value if it exists
            if (this.isLoaded()) {
                this.finish();
                return;
            }

            // Make the XHR request
            this.folderRequest();
        }

        /**
         * API to rename an Item
         *
         * @param {string} id - parent folder id
         * @param {string} name - new folder name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */

    }, {
        key: 'folderCreateRequest',


        /**
         * Does the network request for fetching a folder
         *
         * @return {void}
         */
        value: function folderCreateRequest(name) {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            var url = this.getUrl() + '?fields=' + getFieldsAsString();
            return this.xhr.post({
                url: url,
                data: {
                    name: name,
                    parent: {
                        id: this.id
                    }
                }
            }).then(this.createSuccessHandler).catch(this.errorHandler);
        }

        /**
         * API to rename an Item
         *
         * @param {string} id - parent folder id
         * @param {string} name - new folder name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */

    }, {
        key: 'create',
        value: function create(id, name, successCallback) {
            var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

            if (this.isDestroyed()) {
                return;
            }

            this.id = id;
            this.key = this.getCacheKey(id);
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.folderCreateRequest(name);
        }
    }]);

    return Folder;
}(Item);

export default Folder;