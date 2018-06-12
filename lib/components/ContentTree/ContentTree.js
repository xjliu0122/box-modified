var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Tree Component
 * @author Box
 */

import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import uniqueid from 'lodash/uniqueId';
import noop from 'lodash/noop';
import Content from './Content';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import { isFocusableElement } from '../../util/dom';
import Internationalize from '../Internationalize';
import { DEFAULT_HOSTNAME_API, DEFAULT_ROOT, VIEW_FOLDER, VIEW_ERROR, TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_TREE, SORT_NAME, SORT_ASC, TYPED_ID_FOLDER_PREFIX } from '../../constants';

var ContentTree = function (_Component) {
    _inherits(ContentTree, _Component);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPicker}
     */
    function ContentTree(props) {
        _classCallCheck(this, ContentTree);

        var _this = _possibleConstructorReturn(this, (ContentTree.__proto__ || Object.getPrototypeOf(ContentTree)).call(this, props));

        _initialiseProps.call(_this);

        var rootFolderId = props.rootFolderId,
            token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            clientName = props.clientName,
            requestInterceptor = props.requestInterceptor,
            responseInterceptor = props.responseInterceptor;


        _this.api = new API({
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            clientName: clientName,
            requestInterceptor: requestInterceptor,
            responseInterceptor: responseInterceptor,
            id: '' + TYPED_ID_FOLDER_PREFIX + rootFolderId
        });

        _this.id = uniqueid('bct_');

        _this.state = {
            currentCollection: {},
            view: VIEW_FOLDER
        };
        return _this;
    }

    /**
     * Destroys api instances
     *
     * @private
     * @return {void}
     */


    _createClass(ContentTree, [{
        key: 'clearCache',
        value: function clearCache() {
            this.api.destroy(true);
        }

        /**
         * Cleanup
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearCache();
        }

        /**
         * Fetches the root folder on load
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchFolder();
        }

        /**
         * Calls the passed on onClick funcsion
         *
         * @private
         * @param {Object} item - clicked item
         * @return {void}
         */

    }, {
        key: 'currentUnloadedCollection',


        /**
         * Resets the percentLoaded in the collection
         * so that the loading bar starts showing
         *
         * @private
         * @fires cancel
         * @return {void}
         */
        value: function currentUnloadedCollection() {
            var currentCollection = this.state.currentCollection;

            return Object.assign(currentCollection, {
                percentLoaded: 0
            });
        }

        /**
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */


        /**
         * Action performed when clicking on an item expand button
         *
         * @private
         * @param {Object} item - the clicked box item
         * @return {void}
         */

    }, {
        key: 'finishNavigation',


        /**
         * Focuses the grid
         *
         * @private
         * @return {void}
         */
        value: function finishNavigation() {
            var autoFocus = this.props.autoFocus;
            var percentLoaded = this.state.currentCollection.percentLoaded;

            // Don't focus the grid until its loaded and user is not already on an interactable element

            if (!autoFocus || percentLoaded !== 100 || !this.table || !this.table.Grid || isFocusableElement(document.activeElement)) {
                return;
            }
            var grid = findDOMNode(this.table.Grid); // eslint-disable-line react/no-find-dom-node
            grid.focus();
        }

        /**
         * Folder fetch success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */


        /**
         * Fetches a folder, defaults to fetching root folder
         *
         * @private
         * @param {string|void} [id] folder id
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Saves reference to table component
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the file picker
         *
         * @private
         * @inheritdoc
         * @return {Element}
         */
        value: function render() {
            var _props = this.props,
                language = _props.language,
                messages = _props.messages,
                rootFolderId = _props.rootFolderId,
                type = _props.type,
                isSmall = _props.isSmall,
                className = _props.className,
                measureRef = _props.measureRef;
            var _state = this.state,
                view = _state.view,
                currentCollection = _state.currentCollection;

            var styleClassName = classNames('be bct be-app-element', className);

            return React.createElement(
                Internationalize,
                { language: language, messages: messages },
                React.createElement(
                    'div',
                    { id: this.id, className: styleClassName, ref: measureRef },
                    React.createElement(Content, {
                        view: view,
                        isSmall: isSmall,
                        rootId: rootFolderId,
                        selectableType: type,
                        currentCollection: currentCollection,
                        tableRef: this.tableRef,
                        onItemClick: this.onItemClick,
                        onExpanderClick: this.onExpanderClick
                    })
                )
            );
        }
    }]);

    return ContentTree;
}(Component);

ContentTree.defaultProps = {
    type: TYPE_FILE + ',' + TYPE_WEBLINK + ',' + TYPE_FOLDER,
    rootFolderId: DEFAULT_ROOT,
    onClick: noop,
    className: '',
    autoFocus: false,
    apiHost: DEFAULT_HOSTNAME_API,
    clientName: CLIENT_NAME_CONTENT_TREE
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onItemClick = function (item) {
        var onClick = _this2.props.onClick;

        delete item.selected;
        onClick(item);
    };

    this.errorCallback = function (error) {
        _this2.setState({
            view: VIEW_ERROR
        });
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.onExpanderClick = function (folder) {
        var currentCollection = _this2.state.currentCollection;
        var id = folder.id,
            path_collection = folder.path_collection,
            _folder$selected = folder.selected,
            selected = _folder$selected === undefined ? false : _folder$selected;


        if (!path_collection || !currentCollection.items) {
            throw new Error('Bad state!');
        }

        if (selected) {
            folder.selected = false;
            var length = path_collection.total_count;
            var newItems = currentCollection.items.filter(function (item) {
                if (item.path_collection && item.path_collection.total_count > length) {
                    return item.path_collection.entries[length].id !== id;
                }
                return true;
            });
            currentCollection.items = newItems;
            _this2.setState({ currentCollection: currentCollection });
        } else {
            _this2.fetchFolder(id);
        }
    };

    this.fetchFolderSuccessCallback = function (collection) {
        var _collection$items = collection.items,
            newItems = _collection$items === undefined ? [] : _collection$items,
            percentLoaded = collection.percentLoaded;
        var type = _this2.props.type;


        var filteredItems = newItems.filter(function (item) {
            if (item.type) {
                return type.indexOf(item.type) > -1;
            }
            return false;
        });
        var currentCollection = _this2.state.currentCollection;
        var _currentCollection = currentCollection,
            items = _currentCollection.items;


        if (items) {
            var parentIndex = items.findIndex(function (item) {
                return item.type === TYPE_FOLDER && item.id === collection.id;
            });
            items[parentIndex].selected = true;
            items.splice.apply(items, [parentIndex + 1, 0].concat(_toConsumableArray(filteredItems)));
            currentCollection.percentLoaded = percentLoaded;
        } else {
            currentCollection = collection;
            currentCollection.items = filteredItems;
        }

        // Set the new state and focus the grid for tabbing
        _this2.setState({ currentCollection: currentCollection }, _this2.finishNavigation);
    };

    this.fetchFolder = function (id) {
        var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rootFolderId = _this2.props.rootFolderId;

        var folderId = typeof id === 'string' ? id : rootFolderId;

        // Reset the view and show busy indicator
        _this2.setState({
            view: VIEW_FOLDER,
            currentCollection: _this2.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this2.api.getFolderAPI().folder(folderId, SORT_NAME, SORT_ASC, _this2.fetchFolderSuccessCallback, _this2.errorCallback, forceFetch);
    };

    this.tableRef = function (table) {
        _this2.table = table;
    };
};

export default makeResponsive(ContentTree);