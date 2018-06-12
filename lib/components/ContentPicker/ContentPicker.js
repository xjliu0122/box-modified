var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Picker Component
 * @author Box
 */

import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import uniqueid from 'lodash/uniqueId';
import noop from 'lodash/noop';
import Footer from './Footer';
import Content from './Content';
import Header from '../Header';
import SubHeader from '../SubHeader/SubHeader';
import UploadDialog from '../UploadDialog';
import CreateFolderDialog from '../CreateFolderDialog';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import { isFocusableElement, isInputElement, focus } from '../../util/dom';
import Internationalize from '../Internationalize';
import { DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, DEFAULT_SEARCH_DEBOUNCE, SORT_ASC, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, DEFAULT_ROOT, VIEW_SEARCH, VIEW_FOLDER, VIEW_SELECTED, VIEW_ERROR, VIEW_RECENTS, TYPE_FILE, TYPE_FOLDER, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER, DEFAULT_VIEW_FILES, DEFAULT_VIEW_RECENTS, ERROR_CODE_ITEM_NAME_INVALID, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE, TYPED_ID_FOLDER_PREFIX } from '../../constants';


var defaultType = TYPE_FILE + ',' + TYPE_WEBLINK;

var ContentPicker = function (_Component) {
    _inherits(ContentPicker, _Component);

    /**
     * [constructor]
     *
     * @private
     * @return {ContentPicker}
     */
    function ContentPicker(props) {
        _classCallCheck(this, ContentPicker);

        var _this = _possibleConstructorReturn(this, (ContentPicker.__proto__ || Object.getPrototypeOf(ContentPicker)).call(this, props));

        _initialiseProps.call(_this);

        var token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            uploadHost = props.uploadHost,
            sortBy = props.sortBy,
            sortDirection = props.sortDirection,
            clientName = props.clientName,
            requestInterceptor = props.requestInterceptor,
            responseInterceptor = props.responseInterceptor,
            rootFolderId = props.rootFolderId;


        _this.api = new API({
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            clientName: clientName,
            requestInterceptor: requestInterceptor,
            responseInterceptor: responseInterceptor,
            id: '' + TYPED_ID_FOLDER_PREFIX + rootFolderId
        });

        _this.id = uniqueid('bcp_');

        _this.state = {
            sortBy: sortBy,
            sortDirection: sortDirection,
            rootName: '',
            currentCollection: {},
            selected: {},
            searchQuery: '',
            view: VIEW_FOLDER,
            isCreateFolderModalOpen: false,
            isUploadModalOpen: false,
            focusedRow: 0,
            isLoading: false,
            errorCode: ''
        };
        return _this;
    }

    /**
     * Destroys api instances
     *
     * @private
     * @return {void}
     */
    // Keeps track of very 1st load

    _createClass(ContentPicker, [{
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
            var _props = this.props,
                defaultView = _props.defaultView,
                currentFolderId = _props.currentFolderId;

            this.rootElement = document.getElementById(this.id);
            this.appElement = this.rootElement.firstElementChild;

            if (defaultView === DEFAULT_VIEW_RECENTS) {
                this.showRecents();
            } else {
                this.fetchFolder(currentFolderId);
            }
        }

        /**
         * Fetches the current folder if different
         * from what was already fetched before.
         *
         * @private
         * @inheritdoc
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var currentFolderId = nextProps.currentFolderId;
            var id = this.state.currentCollection.id;


            if (typeof currentFolderId === 'string' && id !== currentFolderId) {
                this.fetchFolder(currentFolderId);
            }
        }

        /**
         * Choose button action.
         * Clones values before returning so that
         * object references are broken. Also cleans
         * up the selected attribute since it was
         * added by the file picker.
         *
         * @private
         * @fires choose
         * @return {void}
         */


        /**
         * Cancel button action
         *
         * @private
         * @fires cancel
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
         * Refreshing the item collection depending
         * upon the view. Collection is gotten from cache.
         * Navigation event is prevented.
         *
         * @private
         * @return {void}
         */


        /**
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */


        /**
         * Action performed when clicking on an item
         *
         * @private
         * @param {Object|string} item - the clicked box item
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

            // If loading for the very first time, only allow focus if autoFocus is true

            if (this.firstLoad && !autoFocus) {
                this.firstLoad = false;
                return;
            }

            // Don't focus the grid until its loaded and user is not already on an interactable element
            if (percentLoaded === 100 && !isFocusableElement(document.activeElement)) {
                focus(this.rootElement, '.bcp-item-row');
                this.setState({ focusedRow: 0 });
            }

            this.firstLoad = false;
        }

        /**
         * Folder fetch success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @param {Boolean|void} triggerNavigationEvent - To focus the grid
         * @return {void}
         */

    }, {
        key: 'fetchFolderSuccessCallback',
        value: function fetchFolderSuccessCallback(collection, triggerNavigationEvent) {
            var rootFolderId = this.props.rootFolderId;
            var id = collection.id,
                name = collection.name;

            // New folder state

            var newState = {
                currentCollection: collection,
                rootName: id === rootFolderId ? name : ''
            };

            // Close any open modals
            this.closeModals();

            if (triggerNavigationEvent) {
                // Fire folder navigation event
                this.setState(newState, this.finishNavigation);
            } else {
                this.setState(newState);
            }
        }

        /**
         * Fetches a folder, defaults to fetching root folder
         *
         * @private
         * @param {string|void} [id] folder id
         * @param {Boolean|void} [triggerNavigationEvent] - To focus the grid
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */

    }, {
        key: 'recentsSuccessCallback',


        /**
         * Recents fetch success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @param {Boolean|void} [triggerNavigationEvent] To trigger navigate event
         * @return {void}
         */
        value: function recentsSuccessCallback(collection, triggerNavigationEvent) {
            var newState = { currentCollection: collection };
            if (triggerNavigationEvent) {
                this.setState(newState, this.finishNavigation);
            } else {
                this.setState(newState);
            }
        }

        /**
         * Shows recents.
         * We always try to force fetch recents.
         *
         * @private
         * @param {Boolean|void} [triggerNavigationEvent] To trigger navigate event
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */

    }, {
        key: 'showRecents',
        value: function showRecents() {
            var _this2 = this;

            var triggerNavigationEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var rootFolderId = this.props.rootFolderId;
            var _state = this.state,
                sortBy = _state.sortBy,
                sortDirection = _state.sortDirection;

            // Recents are sorted by a different date field than the rest

            var by = sortBy === FIELD_MODIFIED_AT ? FIELD_INTERACTED_AT : sortBy;

            // Reset search state, the view and show busy indicator
            this.setState({
                searchQuery: '',
                view: VIEW_RECENTS,
                currentCollection: this.currentUnloadedCollection()
            });

            // Fetch the folder using folder API
            this.api.getRecentsAPI().recents(rootFolderId, by, sortDirection, function (collection) {
                _this2.recentsSuccessCallback(collection, triggerNavigationEvent);
            }, this.errorCallback, forceFetch);
        }

        /**
         * Shows the selected items
         *
         * @private
         * @return {void}
         */


        /**
         * Search success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */


        /**
         * Debounced searching
         *
         * @private
         * @param {string} id folder id
         * @param {string} query search string
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Searches
         *
         * @private
         * @param {string} query search string
         * @param {Boolean|void} [forceFetch] To void cache
         * @return {void}
         */


        /**
         * Uploads
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */


        /**
         * Upload success handler
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */


        /**
         * Creates a new folder
         *
         * @private
         * @return {void}
         */


        /**
         * New folder callback
         *
         * @private
         * @param {string} name - folder name
         * @return {void}
         */


        /**
         * Selects or unselects an item
         *
         * @private
         * @param {Object} item file or folder object
         * @return {void}
         */


        /**
         * Changes the share access of an item
         *
         * @private
         * @param {string} access share access
         * @param {Object} item file or folder object
         * @return {void}
         */


        /**
         * Chages the sort by and sort direction
         *
         * @private
         * @param {string} sortBy - field to sorty by
         * @param {string} sortDirection - sort direction
         * @return {void}
         */


        /**
         * Saves reference to table component
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */


        /**
         * Closes the modal dialogs that may be open
         *
         * @private
         * @return {void}
         */


        /**
         * Keyboard events
         *
         * @private
         * @inheritdoc
         * @return {void}
         */


        /**
         * Updates the focused row based on key binder
         *
         * @private
         * @param {number} focusedRow - the row index thats focused
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
            var _props2 = this.props,
                language = _props2.language,
                messages = _props2.messages,
                rootFolderId = _props2.rootFolderId,
                logoUrl = _props2.logoUrl,
                canUpload = _props2.canUpload,
                canSetShareAccess = _props2.canSetShareAccess,
                canCreateNewFolder = _props2.canCreateNewFolder,
                extensions = _props2.extensions,
                maxSelectable = _props2.maxSelectable,
                type = _props2.type,
                token = _props2.token,
                sharedLink = _props2.sharedLink,
                sharedLinkPassword = _props2.sharedLinkPassword,
                apiHost = _props2.apiHost,
                uploadHost = _props2.uploadHost,
                isSmall = _props2.isSmall,
                className = _props2.className,
                measureRef = _props2.measureRef,
                chooseButtonLabel = _props2.chooseButtonLabel,
                cancelButtonLabel = _props2.cancelButtonLabel,
                requestInterceptor = _props2.requestInterceptor,
                responseInterceptor = _props2.responseInterceptor;
            var _state2 = this.state,
                view = _state2.view,
                rootName = _state2.rootName,
                selected = _state2.selected,
                currentCollection = _state2.currentCollection,
                searchQuery = _state2.searchQuery,
                isCreateFolderModalOpen = _state2.isCreateFolderModalOpen,
                isUploadModalOpen = _state2.isUploadModalOpen,
                isLoading = _state2.isLoading,
                errorCode = _state2.errorCode,
                focusedRow = _state2.focusedRow;
            var id = currentCollection.id,
                permissions = currentCollection.permissions;

            var _ref = permissions || {},
                can_upload = _ref.can_upload;

            var selectedCount = Object.keys(selected).length;
            var hasHitSelectionLimit = selectedCount === maxSelectable && maxSelectable !== 1;
            var allowUpload = canUpload && !!can_upload;
            var allowCreate = canCreateNewFolder && !!can_upload;
            var styleClassName = classNames('be bcp', className);

            /* eslint-disable jsx-a11y/no-static-element-interactions */
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            return React.createElement(
                Internationalize,
                { language: language, messages: messages },
                React.createElement(
                    'div',
                    { id: this.id, className: styleClassName, ref: measureRef },
                    React.createElement(
                        'div',
                        { className: 'be-app-element', onKeyDown: this.onKeyDown, tabIndex: 0 },
                        React.createElement(Header, {
                            view: view,
                            isSmall: isSmall,
                            searchQuery: searchQuery,
                            logoUrl: logoUrl,
                            onSearch: this.search
                        }),
                        React.createElement(SubHeader, {
                            view: view,
                            rootId: rootFolderId,
                            isSmall: isSmall,
                            rootName: rootName,
                            currentCollection: currentCollection,
                            canUpload: allowUpload,
                            canCreateNewFolder: allowCreate,
                            onUpload: this.upload,
                            onCreate: this.createFolder,
                            onItemClick: this.fetchFolder,
                            onSortChange: this.sort
                        }),
                        React.createElement(Content, {
                            view: view,
                            isSmall: isSmall,
                            rootId: rootFolderId,
                            rootElement: this.rootElement,
                            focusedRow: focusedRow,
                            selectableType: type,
                            canSetShareAccess: canSetShareAccess,
                            extensionsWhitelist: extensions,
                            hasHitSelectionLimit: hasHitSelectionLimit,
                            currentCollection: currentCollection,
                            tableRef: this.tableRef,
                            onItemSelect: this.select,
                            onItemClick: this.onItemClick,
                            onFocusChange: this.onFocusChange,
                            onShareAccessChange: this.changeShareAccess
                        }),
                        React.createElement(Footer, {
                            selectedCount: selectedCount,
                            hasHitSelectionLimit: hasHitSelectionLimit,
                            onSelectedClick: this.showSelected,
                            onChoose: this.choose,
                            onCancel: this.cancel,
                            chooseButtonLabel: chooseButtonLabel,
                            cancelButtonLabel: cancelButtonLabel
                        })
                    ),
                    allowUpload && !!this.appElement ? React.createElement(UploadDialog, {
                        isOpen: isUploadModalOpen,
                        currentFolderId: id,
                        token: token,
                        sharedLink: sharedLink,
                        sharedLinkPassword: sharedLinkPassword,
                        apiHost: apiHost,
                        uploadHost: uploadHost,
                        onClose: this.uploadSuccessHandler,
                        parentElement: this.rootElement,
                        appElement: this.appElement,
                        requestInterceptor: requestInterceptor,
                        responseInterceptor: responseInterceptor
                    }) : null,
                    allowCreate && !!this.appElement ? React.createElement(CreateFolderDialog, {
                        isOpen: isCreateFolderModalOpen,
                        onCreate: this.createFolderCallback,
                        onCancel: this.closeModals,
                        isLoading: isLoading,
                        errorCode: errorCode,
                        parentElement: this.rootElement,
                        appElement: this.appElement
                    }) : null
                )
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
        }
    }]);

    return ContentPicker;
}(Component);

ContentPicker.defaultProps = {
    type: defaultType,
    rootFolderId: DEFAULT_ROOT,
    onChoose: noop,
    onCancel: noop,
    sortBy: FIELD_NAME,
    sortDirection: SORT_ASC,
    extensions: [],
    maxSelectable: Infinity,
    canUpload: true,
    canSetShareAccess: true,
    canCreateNewFolder: true,
    autoFocus: false,
    className: '',
    apiHost: DEFAULT_HOSTNAME_API,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    clientName: CLIENT_NAME_CONTENT_PICKER,
    defaultView: DEFAULT_VIEW_FILES
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.firstLoad = true;

    this.choose = function () {
        var selected = _this3.state.selected;
        var onChoose = _this3.props.onChoose;

        var results = Object.keys(selected).map(function (key) {
            var clone = Object.assign({}, selected[key]);
            delete clone.selected;
            return clone;
        });
        onChoose(results);
    };

    this.cancel = function () {
        var onCancel = _this3.props.onCancel;
        var selected = _this3.state.selected;

        // Clear out the selected field

        Object.keys(selected).forEach(function (key) {
            return delete selected[key].selected;
        });

        // Reset the selected state
        _this3.setState({ selected: {} }, function () {
            return onCancel();
        });
    };

    this.refreshCollection = function () {
        var _state3 = _this3.state,
            id = _state3.currentCollection.id,
            view = _state3.view,
            searchQuery = _state3.searchQuery;

        if (view === VIEW_FOLDER && id) {
            _this3.fetchFolder(id, false);
        } else if (view === VIEW_RECENTS) {
            _this3.showRecents(false, false);
        } else if (view === VIEW_SEARCH && searchQuery) {
            _this3.search(searchQuery);
        } else if (view === VIEW_SELECTED) {
            _this3.showSelected();
        } else {
            throw new Error('Cannot refresh incompatible view!');
        }
    };

    this.errorCallback = function (error) {
        _this3.setState({ view: VIEW_ERROR });
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.onItemClick = function (item) {
        // If the id was passed in, just use that
        if (typeof item === 'string') {
            _this3.fetchFolder(item);
            return;
        }

        // If the item was passed in
        var id = item.id,
            type = item.type;

        if (type === TYPE_FOLDER) {
            _this3.fetchFolder(id);
        }
    };

    this.fetchFolder = function (id) {
        var triggerNavigationEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var forceFetch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var rootFolderId = _this3.props.rootFolderId;
        var _state4 = _this3.state,
            sortBy = _state4.sortBy,
            sortDirection = _state4.sortDirection;

        var folderId = typeof id === 'string' ? id : rootFolderId;

        // If we are navigating around, aka not first load
        // then reset the focus to the root so that after
        // the collection loads the activeElement is not the
        // button that was clicked to fetch the folder
        if (!_this3.firstLoad) {
            _this3.rootElement.focus();
        }

        // Reset search state, the view and show busy indicator
        _this3.setState({
            searchQuery: '',
            view: VIEW_FOLDER,
            currentCollection: _this3.currentUnloadedCollection()
        });

        // Fetch the folder using folder API
        _this3.api.getFolderAPI().folder(folderId, sortBy, sortDirection, function (collection) {
            _this3.fetchFolderSuccessCallback(collection, triggerNavigationEvent);
        }, _this3.errorCallback, forceFetch);
    };

    this.showSelected = function () {
        var _state5 = _this3.state,
            selected = _state5.selected,
            sortBy = _state5.sortBy,
            sortDirection = _state5.sortDirection;

        _this3.setState({
            searchQuery: '',
            view: VIEW_SELECTED,
            currentCollection: {
                sortBy: sortBy,
                sortDirection: sortDirection,
                percentLoaded: 100,
                items: Object.keys(selected).map(function (key) {
                    return _this3.api.getCache().get(key);
                })
            }
        }, _this3.finishNavigation);
    };

    this.searchSuccessCallback = function (collection) {
        var currentCollection = _this3.state.currentCollection;

        _this3.setState({
            currentCollection: Object.assign(currentCollection, collection)
        });
    };

    this.debouncedSearch = debounce(function (id, query, forceFetch) {
        var _state6 = _this3.state,
            sortBy = _state6.sortBy,
            sortDirection = _state6.sortDirection;

        _this3.api.getSearchAPI().search(id, query, sortBy, sortDirection, _this3.searchSuccessCallback, _this3.errorCallback, forceFetch);
    }, DEFAULT_SEARCH_DEBOUNCE);

    this.search = function (query) {
        var forceFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rootFolderId = _this3.props.rootFolderId;
        var id = _this3.state.currentCollection.id;

        var folderId = typeof id === 'string' ? id : rootFolderId;
        var trimmedQuery = query.trim();

        if (!query) {
            // Query was cleared out, load the prior folder
            // The prior folder is always the parent folder for search
            _this3.fetchFolder(folderId);
            return;
        }

        if (!trimmedQuery) {
            // Query now only has bunch of spaces
            // do nothing and but update prior state
            _this3.setState({
                searchQuery: query
            });
            return;
        }

        _this3.setState({
            searchQuery: query,
            view: VIEW_SEARCH,
            currentCollection: _this3.currentUnloadedCollection()
        });

        _this3.debouncedSearch(folderId, query, forceFetch);
    };

    this.upload = function () {
        var _state$currentCollect = _this3.state.currentCollection,
            id = _state$currentCollect.id,
            permissions = _state$currentCollect.permissions;
        var canUpload = _this3.props.canUpload;

        if (!id || !permissions) {
            return;
        }

        var canUploadPermission = permissions.can_upload;

        if (!canUpload || !canUploadPermission) {
            return;
        }

        _this3.setState({ isUploadModalOpen: true });
    };

    this.uploadSuccessHandler = function () {
        var id = _this3.state.currentCollection.id;

        _this3.fetchFolder(id, false, true);
    };

    this.createFolder = function () {
        _this3.createFolderCallback();
    };

    this.createFolderCallback = function (name) {
        var _state7 = _this3.state,
            isCreateFolderModalOpen = _state7.isCreateFolderModalOpen,
            currentCollection = _state7.currentCollection;
        var canCreateNewFolder = _this3.props.canCreateNewFolder;

        if (!canCreateNewFolder) {
            return;
        }

        var id = currentCollection.id,
            permissions = currentCollection.permissions;

        if (!id || !permissions) {
            return;
        }

        var can_upload = permissions.can_upload;

        if (!can_upload) {
            return;
        }

        if (!isCreateFolderModalOpen || !name) {
            _this3.setState({ isCreateFolderModalOpen: true, errorCode: '' });
            return;
        }

        if (!name) {
            _this3.setState({ errorCode: ERROR_CODE_ITEM_NAME_INVALID, isLoading: false });
            return;
        }

        if (name.length > 255) {
            _this3.setState({ errorCode: ERROR_CODE_ITEM_NAME_TOO_LONG, isLoading: false });
            return;
        }

        _this3.setState({ isLoading: true });
        _this3.api.getFolderAPI().create(id, name, function () {
            _this3.fetchFolder(id);
        }, function (_ref2) {
            var status = _ref2.response.status;

            _this3.setState({
                errorCode: status === 409 ? ERROR_CODE_ITEM_NAME_IN_USE : ERROR_CODE_ITEM_NAME_INVALID,
                isLoading: false
            });
        });
    };

    this.select = function (item) {
        var _props3 = _this3.props,
            selectableType = _props3.type,
            maxSelectable = _props3.maxSelectable;
        var _state8 = _this3.state,
            view = _state8.view,
            selected = _state8.selected,
            _state8$currentCollec = _state8.currentCollection.items,
            items = _state8$currentCollec === undefined ? [] : _state8$currentCollec;
        var id = item.id,
            type = item.type;


        if (!id || !type || selectableType.indexOf(type) === -1) {
            return;
        }

        var selectedKeys = Object.keys(selected);
        var selectedCount = selectedKeys.length;
        var hasHitSelectionLimit = selectedCount === maxSelectable;
        var isSingleFileSelection = maxSelectable === 1;
        var cacheKey = _this3.api.getAPI(type).getCacheKey(id);
        var existing = selected[cacheKey];
        var existingFromCache = _this3.api.getCache().get(cacheKey);

        // Existing object could have mutated and we just need to update the
        // reference in the selected map. In that case treat it like a new selection.
        if (existing && existing === existingFromCache) {
            // We are selecting the same item that was already
            // selected. Unselect it in this case. Toggle case.
            delete existing.selected;
            delete selected[cacheKey];
        } else {
            // We are selecting a new item that was never
            // selected before. However if we are in a single
            // item selection mode, we should also unselect any
            // prior item that was item that was selected.

            // Check if we hit the selection limit
            // Ignore when in single file selection mode.
            if (hasHitSelectionLimit && !isSingleFileSelection) {
                return;
            }

            // Clear out the prior item for single file selection mode
            if (selectedCount > 0 && isSingleFileSelection) {
                var prior = selectedKeys[0]; // only one item
                delete selected[prior].selected;
                delete selected[prior];
            }

            // Select the new item
            item.selected = true;
            selected[cacheKey] = item;
        }

        var focusedRow = items.findIndex(function (i) {
            return i.id === item.id;
        });
        _this3.setState({ selected: selected, focusedRow: focusedRow }, function () {
            if (view === VIEW_SELECTED) {
                // Need to refresh the selected view
                _this3.showSelected();
            }
        });
    };

    this.changeShareAccess = function (access, item) {
        var canSetShareAccess = _this3.props.canSetShareAccess;

        if (!item || !canSetShareAccess) {
            return;
        }

        var permissions = item.permissions,
            type = item.type;

        if (!permissions || !type) {
            return;
        }

        var can_set_share_access = permissions.can_set_share_access;

        if (!can_set_share_access) {
            return;
        }

        _this3.api.getAPI(type).share(item, access, function (updatedItem) {
            _this3.refreshCollection();
            if (item.selected) {
                _this3.select(updatedItem);
            }
        });
    };

    this.sort = function (sortBy, sortDirection) {
        var id = _this3.state.currentCollection.id;

        if (id) {
            _this3.setState({ sortBy: sortBy, sortDirection: sortDirection }, _this3.refreshCollection);
        }
    };

    this.tableRef = function (table) {
        _this3.table = table;
    };

    this.closeModals = function () {
        var focusedRow = _this3.state.focusedRow;


        _this3.setState({
            isLoading: false,
            isCreateFolderModalOpen: false,
            isUploadModalOpen: false
        });

        var _state9 = _this3.state,
            selected = _state9.selected,
            _state9$currentCollec = _state9.currentCollection.items,
            items = _state9$currentCollec === undefined ? [] : _state9$currentCollec;

        if (selected && items.length > 0) {
            focus(_this3.rootElement, '.bcp-item-row-' + focusedRow);
        }
    };

    this.onKeyDown = function (event) {
        if (isInputElement(event.target)) {
            return;
        }

        var rootFolderId = _this3.props.rootFolderId;

        var key = event.key.toLowerCase();

        switch (key) {
            case '/':
                focus(_this3.rootElement, '.be-search input[type="search"]', false);
                event.preventDefault();
                break;
            case 'arrowdown':
                focus(_this3.rootElement, '.bcp-item-row', false);
                _this3.setState({ focusedRow: 0 });
                event.preventDefault();
                break;
            case 'g':
                break;
            case 'b':
                if (_this3.globalModifier) {
                    focus(_this3.rootElement, '.be-breadcrumb button', false);
                    event.preventDefault();
                }
                break;
            case 'f':
                if (_this3.globalModifier) {
                    _this3.fetchFolder(rootFolderId);
                    event.preventDefault();
                }
                break;
            case 'c':
                if (_this3.globalModifier) {
                    _this3.choose();
                    event.preventDefault();
                }
                break;
            case 'x':
                if (_this3.globalModifier) {
                    _this3.cancel();
                    event.preventDefault();
                }
                break;
            case 's':
                if (_this3.globalModifier) {
                    _this3.showSelected();
                    event.preventDefault();
                }
                break;
            case 'u':
                if (_this3.globalModifier) {
                    _this3.upload();
                    event.preventDefault();
                }
                break;
            case 'r':
                if (_this3.globalModifier) {
                    _this3.showRecents();
                    event.preventDefault();
                }
                break;
            case 'n':
                if (_this3.globalModifier) {
                    _this3.createFolder();
                    event.preventDefault();
                }
                break;
            default:
                _this3.globalModifier = false;
                return;
        }

        _this3.globalModifier = key === 'g';
    };

    this.onFocusChange = function (focusedRow) {
        _this3.setState({ focusedRow: focusedRow });
    };
};

export default makeResponsive(ContentPicker);