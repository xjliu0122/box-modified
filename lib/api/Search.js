var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box search api
 * @author Box
 */

import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from '../api/WebLink';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import { getFieldsAsString } from '../util/fields';
import { CACHE_PREFIX_SEARCH, X_REP_HINTS } from '../constants';
import { getBadItemError } from '../util/error';

var LIMIT_ITEM_FETCH = 200;

var Search = function (_Base) {
    _inherits(Search, _Base);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.searchSuccessHandler = function (_ref2) {
            var data = _ref2.data;

            if (_this.isDestroyed()) {
                return;
            }

            var entries = data.entries,
                total_count = data.total_count,
                limit = data.limit,
                offset = data.offset;

            if (!Array.isArray(entries) || typeof total_count !== 'number' || typeof limit !== 'number' || typeof offset !== 'number') {
                throw getBadItemError();
            }

            var flattened = flatten(entries, new FolderAPI(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));
            _this.itemCache = (_this.itemCache || []).concat(flattened);

            // Total count may be more than the actual number of entries, so don't rely
            // on it on its own. Good for calculating percentatge, but not good for
            // figuring our when the collection is done loading.
            var isLoaded = offset + limit >= total_count;

            _this.getCache().set(_this.key, {
                item_collection: Object.assign({}, data, {
                    isLoaded: isLoaded,
                    entries: _this.itemCache
                })
            });

            if (!isLoaded) {
                _this.offset += limit;
                _this.searchRequest();
            }

            _this.finish();
        }, _this.searchErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            _this.errorCallback(error);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: 'getEncodedQuery',


        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @param {string} query search string
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
         * @property {string}
         */
        value: function getEncodedQuery(query) {
            return encodeURIComponent(query);
        }

        /**
         * Creates a key for the cache
         *
         * @param {string} id folder id
         * @param {string} query search string
         * @return {string} key
         */


        /**
         * @property {boolean}
         */


        /**
         * @property {Array}
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

    }, {
        key: 'getCacheKey',
        value: function getCacheKey(id, query) {
            return '' + CACHE_PREFIX_SEARCH + id + '|' + query;
        }

        /**
         * URL for search api
         *
         * @param {string} [id] optional file id
         * @return {string} base url for files
         */

    }, {
        key: 'getUrl',
        value: function getUrl() {
            return this.getBaseApiUrl() + '/search';
        }

        /**
         * Tells if a search results has its items all loaded
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
            var search = cache.get(this.key);
            var sortedSearch = sort(search, this.sortBy, this.sortDirection, cache);
            var item_collection = sortedSearch.item_collection;

            if (!item_collection) {
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
                percentLoaded: percentLoaded,
                id: this.id,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
                items: entries.map(function (key) {
                    return cache.get(key);
                })
            };
            this.successCallback(collection);
        }

        /**
         * Handles the folder search response
         *
         * @param {Object} response
         * @return {void}
         */


        /**
         * Handles the search error
         *
         * @param {Error} error fetch error
         * @return {void}
         */

    }, {
        key: 'searchRequest',


        /**
         * Does the network request
         *
         * @return {void}
         */
        value: function searchRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }

            return this.xhr.get({
                url: this.getUrl(),
                params: {
                    offset: this.offset,
                    query: this.query,
                    ancestor_folder_ids: this.id,
                    limit: LIMIT_ITEM_FETCH,
                    fields: getFieldsAsString(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.searchSuccessHandler).catch(this.searchErrorHandler);
        }

        /**
         * Gets search results
         *
         * @param {string} id - folder id
         * @param {string} query - search string
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
        key: 'search',
        value: function search(id, query, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
            var includePreviewSidebarFields = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.offset = 0;
            this.query = query;
            this.id = id;
            this.key = this.getCacheKey(id, this.getEncodedQuery(this.query));
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields;

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
            this.searchRequest();
        }
    }]);

    return Search;
}(Base);

export default Search;