var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box recents api
 * @author Box
 */

import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from '../api/WebLink';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import { getBadItemError } from '../util/error';
import { getFieldsAsString } from '../util/fields';
import { DEFAULT_ROOT, CACHE_PREFIX_RECENTS, SORT_DESC, FIELD_INTERACTED_AT, X_REP_HINTS } from '../constants';

var Recents = function (_Base) {
    _inherits(Recents, _Base);

    function Recents() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Recents);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recents.__proto__ || Object.getPrototypeOf(Recents)).call.apply(_ref, [this].concat(args))), _this), _this.recentsSuccessHandler = function (_ref2) {
            var data = _ref2.data;

            if (_this.isDestroyed()) {
                return;
            }

            var entries = data.entries,
                _data$order = data.order,
                by = _data$order.by,
                direction = _data$order.direction;

            var items = [];

            entries.forEach(function (_ref3) {
                var item = _ref3.item,
                    interacted_at = _ref3.interacted_at;
                var path_collection = item.path_collection;

                var shouldInclude = _this.id === DEFAULT_ROOT || !!path_collection && path_collection.entries.findIndex(function (crumb) {
                    return crumb.id === _this.id;
                }) !== -1;
                if (shouldInclude) {
                    items.push(Object.assign(item, { interacted_at: interacted_at }));
                }
            });

            var flattenedItems = flatten(items, new FolderAPI(_this.options), new FileAPI(_this.options), new WebLinkAPI(_this.options));

            _this.getCache().set(_this.key, {
                item_collection: {
                    isLoaded: true,
                    entries: flattenedItems,
                    order: [{
                        by: by,
                        direction: direction
                    }]
                }
            });
            _this.finish();
        }, _this.recentsErrorHandler = function (error) {
            if (_this.isDestroyed()) {
                return;
            }
            _this.errorCallback(error);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Recents, [{
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
         * @property {string}
         */


        /**
         * @property {Function}
         */

        /**
         * @property {string}
         */
        value: function getCacheKey(id) {
            return '' + CACHE_PREFIX_RECENTS + id;
        }

        /**
         * URL for recents api
         *
         * @return {string} base url for files
         */


        /**
         * @property {boolean}
         */


        /**
         * @property {string}
         */


        /**
         * @property {Function}
         */


        /**
         * @property {string}
         */

    }, {
        key: 'getUrl',
        value: function getUrl() {
            return this.getBaseApiUrl() + '/recent_items';
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
            var recents = cache.get(this.key);
            var sortedRecents = sort(recents, this.sortBy, this.sortDirection, cache);
            var item_collection = sortedRecents.item_collection;

            if (!item_collection) {
                throw getBadItemError();
            }

            var entries = item_collection.entries;

            if (!Array.isArray(entries)) {
                throw getBadItemError();
            }

            var collection = {
                percentLoaded: 100,
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
         * Handles the folder Recents response
         *
         * @param {Object} response
         * @return {void}
         */


        /**
         * Handles the Recents error
         *
         * @param {Error} error fetch error
         * @return {void}
         */

    }, {
        key: 'recentsRequest',


        /**
         * Does the network request
         *
         * @return {Promise}
         */
        value: function recentsRequest() {
            if (this.isDestroyed()) {
                return Promise.reject();
            }
            return this.xhr.get({
                url: this.getUrl(),
                params: {
                    fields: getFieldsAsString(this.includePreviewFields, this.includePreviewSidebarFields)
                },
                headers: { 'X-Rep-Hints': X_REP_HINTS }
            }).then(this.recentsSuccessHandler).catch(this.recentsErrorHandler);
        }

        /**
         * Gets recent files
         *
         * @param {string} id - parent folder id
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
        key: 'recents',
        value: function recents(id, sortBy, sortDirection, successCallback, errorCallback) {
            var forceFetch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var includePreviewFields = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
            var includePreviewSidebarFields = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

            if (this.isDestroyed()) {
                return;
            }

            // Save references
            this.id = id;
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            this.sortBy = sortBy;
            this.sortDirection = sortDirection;
            this.includePreviewFields = includePreviewFields;
            this.includePreviewSidebarFields = includePreviewSidebarFields;

            var cache = this.getCache();
            this.key = this.getCacheKey(this.id);

            // Clear the cache if needed
            if (forceFetch) {
                cache.unset(this.key);
            }

            // Return the Cache value if it exists
            if (cache.has(this.key)) {
                this.finish();
                return;
            }

            // Recents should always be sorted with date desc
            // on non cached loads, aka newest to oldest
            this.sortBy = FIELD_INTERACTED_AT;
            this.sortDirection = SORT_DESC;

            // Make the XHR request
            this.recentsRequest();
        }
    }]);

    return Recents;
}(Base);

export default Recents;