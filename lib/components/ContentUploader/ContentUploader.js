var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Uploader component
 * @author Box
 */

import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import uniqueid from 'lodash/uniqueId';
import cloneDeep from 'lodash/cloneDeep';
import API from '../../api';
import DroppableContent from './DroppableContent';
import UploadsManager from './UploadsManager';
import Footer from './Footer';
import makeResponsive from '../makeResponsive';
import Internationalize from '../Internationalize';
import { DEFAULT_ROOT, CLIENT_NAME_CONTENT_UPLOADER, DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR, ERROR_CODE_UPLOAD_FILE_LIMIT, TYPED_ID_FOLDER_PREFIX, TYPED_ID_FILE_PREFIX } from '../../constants';


var CHUNKED_UPLOAD_MIN_SIZE_BYTES = 52428800; // 50MB
var FILE_LIMIT_DEFAULT = 100; // Upload at most 100 files at once by default
var HIDE_UPLOAD_MANAGER_DELAY_MS_DEFAULT = 8000;
var EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD = 5;
var UPLOAD_CONCURRENCY = 6;

var ContentUploader = function (_Component) {
    _inherits(ContentUploader, _Component);

    /**
     * [constructor]
     *
     * @return {ContentUploader}
     */
    function ContentUploader(props) {
        _classCallCheck(this, ContentUploader);

        var _this = _possibleConstructorReturn(this, (ContentUploader.__proto__ || Object.getPrototypeOf(ContentUploader)).call(this, props));

        _this.numItemsUploading = 0;

        _this.getNewFiles = function (files) {
            var itemIds = _this.state.itemIds;


            return [].filter.call(files, function (file) {
                return !(_this.getFileId(file) in itemIds);
            });
        };

        _this.addFilesToUploadQueue = function (files, withApiOptions, itemUpdateCallback) {
            var _this$props = _this.props,
                fileLimit = _this$props.fileLimit,
                useUploadsManager = _this$props.useUploadsManager;
            var _this$state = _this.state,
                view = _this$state.view,
                items = _this$state.items;


            clearTimeout(_this.resetItemsTimeout);

            // Convert files from the file API to upload items
            var newItems = _this.getNewFiles(files).map(function (file) {
                var uploadFile = file;
                var uploadAPIOptions = {};

                if (withApiOptions) {
                    uploadFile = file.file;
                    uploadAPIOptions = file.options;
                }
                var _uploadFile = uploadFile,
                    name = _uploadFile.name,
                    size = _uploadFile.size;

                // Extract extension or use empty string if file has no extension

                var extension = name.substr(name.lastIndexOf('.') + 1);
                if (extension.length === name.length) {
                    extension = '';
                }

                var api = _this.getUploadAPI(uploadFile, uploadAPIOptions);
                var uploadItem = {
                    api: api,
                    extension: extension,
                    file: uploadFile,
                    name: name,
                    progress: 0,
                    size: size,
                    status: STATUS_PENDING
                };

                if (uploadAPIOptions) {
                    uploadItem.options = uploadAPIOptions;
                }

                return uploadItem;
            });

            if (newItems.length <= 0) {
                return;
            }

            var updatedItems = [];
            var prevItemsNum = items.length;
            var totalNumOfItems = prevItemsNum + newItems.length;

            // Don't add more than fileLimit # of items
            if (totalNumOfItems > fileLimit) {
                updatedItems = items.concat(newItems.slice(0, fileLimit - items.length));
                _this.setState({
                    errorCode: ERROR_CODE_UPLOAD_FILE_LIMIT
                });
            } else {
                updatedItems = items.concat(newItems);
                _this.setState({ errorCode: '' });

                // If the number of items being uploaded passes the threshold, expand the upload manager
                if (prevItemsNum < EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD && totalNumOfItems >= EXPAND_UPLOADS_MANAGER_ITEMS_NUM_THRESHOLD && useUploadsManager) {
                    _this.expandUploadsManager();
                }
            }

            _this.updateViewAndCollection(updatedItems, itemUpdateCallback);

            // Automatically start upload if other files are being uploaded
            if (view === VIEW_UPLOAD_IN_PROGRESS) {
                _this.upload();
            }
        };

        _this.cancel = function () {
            var items = _this.state.items;

            items.forEach(function (uploadItem) {
                var api = uploadItem.api,
                    status = uploadItem.status;

                if (status === STATUS_IN_PROGRESS) {
                    api.cancel();
                }
            });

            // Reset upload collection
            _this.updateViewAndCollection([]);
        };

        _this.upload = function () {
            var items = _this.state.items;

            items.forEach(function (uploadItem) {
                if (uploadItem.status === STATUS_PENDING) {
                    _this.uploadFile(uploadItem);
                }
            });
        };

        _this.handleUploadSuccess = function (item, entries) {
            var _this$props2 = _this.props,
                onUpload = _this$props2.onUpload,
                useUploadsManager = _this$props2.useUploadsManager;


            item.progress = 100;
            item.status = STATUS_COMPLETE;
            _this.numItemsUploading -= 1;

            // Cache Box File object of successfully uploaded item
            if (entries && entries.length === 1) {
                var _entries = _slicedToArray(entries, 1),
                    boxFile = _entries[0];

                item.boxFile = boxFile;
            }

            var items = _this.state.items;

            items[items.indexOf(item)] = item;

            // Broadcast that a file has been uploaded
            if (useUploadsManager) {
                onUpload(item);
                _this.hideUploadsManager();
            } else {
                onUpload(item.boxFile);
            }

            _this.updateViewAndCollection(items);
            _this.upload();
        };

        _this.handleUploadError = function (item, error) {
            var _this$props3 = _this.props,
                onError = _this$props3.onError,
                useUploadsManager = _this$props3.useUploadsManager;
            var file = item.file;


            item.status = STATUS_ERROR;
            item.error = error;
            _this.numItemsUploading -= 1;

            var items = _this.state.items;

            items[items.indexOf(item)] = item;

            // Broadcast that there was an error uploading a file
            var errorData = useUploadsManager ? {
                item: item,
                error: error
            } : {
                file: file,
                error: error
            };

            onError(errorData);

            _this.updateViewAndCollection(items);

            if (useUploadsManager) {
                _this.expandUploadsManager();
            }

            _this.upload();
        };

        _this.handleUploadProgress = function (item, event) {
            if (!event.total || item.status === STATUS_COMPLETE) {
                return;
            }

            item.progress = Math.min(Math.round(event.loaded / event.total * 100), 100);
            item.status = STATUS_IN_PROGRESS;

            var items = _this.state.items;

            items[items.indexOf(item)] = item;

            _this.updateViewAndCollection(items);
        };

        _this.onClick = function (item) {
            var status = item.status;

            switch (status) {
                case STATUS_IN_PROGRESS:
                case STATUS_COMPLETE:
                case STATUS_PENDING:
                    _this.removeFileFromUploadQueue(item);
                    break;
                case STATUS_ERROR:
                    _this.resetFile(item);
                    _this.uploadFile(item);
                    break;
                default:
                    break;
            }
        };

        _this.expandUploadsManager = function () {
            var useUploadsManager = _this.props.useUploadsManager;


            if (!useUploadsManager) {
                return;
            }

            clearTimeout(_this.resetItemsTimeout);

            _this.setState({ isUploadsManagerExpanded: true });
        };

        _this.minimizeUploadsManager = function () {
            var _this$props4 = _this.props,
                useUploadsManager = _this$props4.useUploadsManager,
                onMinimize = _this$props4.onMinimize;


            if (!useUploadsManager || !onMinimize) {
                return;
            }

            onMinimize();
            _this.setState({ isUploadsManagerExpanded: false });

            _this.hideUploadsManager();
        };

        _this.hideUploadsManager = function () {
            _this.resetItemsTimeout = setTimeout(_this.resetUploadsManagerItemsWhenUploadsComplete, HIDE_UPLOAD_MANAGER_DELAY_MS_DEFAULT);
        };

        _this.toggleUploadsManager = function () {
            var isUploadsManagerExpanded = _this.state.isUploadsManagerExpanded;


            if (isUploadsManagerExpanded) {
                _this.minimizeUploadsManager();
            } else {
                _this.expandUploadsManager();
            }
        };

        _this.resetUploadsManagerItemsWhenUploadsComplete = function () {
            var _this$state2 = _this.state,
                view = _this$state2.view,
                items = _this$state2.items,
                isUploadsManagerExpanded = _this$state2.isUploadsManagerExpanded;
            var _this$props5 = _this.props,
                useUploadsManager = _this$props5.useUploadsManager,
                onCancel = _this$props5.onCancel;

            // Do not reset items when upload manger is expanded or there're uploads in progress

            if (isUploadsManagerExpanded && useUploadsManager && !!items.length || view === VIEW_UPLOAD_IN_PROGRESS) {
                return;
            }

            onCancel(items);

            _this.setState({
                items: [],
                itemIds: {}
            });
        };

        _this.addFilesWithOptionsToUploadQueueAndStartUpload = function (files) {
            _this.addFilesToUploadQueue(files, true, _this.upload);
        };

        var rootFolderId = props.rootFolderId,
            token = props.token;

        _this.state = {
            view: rootFolderId && token ? VIEW_UPLOAD_EMPTY : VIEW_ERROR,
            items: [],
            errorCode: '',
            itemIds: {},
            isUploadsManagerExpanded: false
        };
        _this.id = uniqueid('bcu_');
        return _this;
    }

    /**
     * Fetches the root folder on load
     *
     * @private
     * @inheritdoc
     * @return {void}
     */


    _createClass(ContentUploader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.rootElement = document.getElementById(this.id);
            this.appElement = this.rootElement;
        }

        /**
         * Adds new items to the queue when files prop gets updated in window view
         *
         * @param {Props} nextProps
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var files = nextProps.files,
                useUploadsManager = nextProps.useUploadsManager;


            if (!useUploadsManager || !files || !files.length) {
                return;
            }

            this.addFilesWithOptionsToUploadQueueAndStartUpload(files);
        }

        /**
         * Create and return new instance of API creator
         *
         * @param {UploadItemAPIOptions} [uploadAPIOptions]
         * @return {API}
         */

    }, {
        key: 'createAPIFactory',
        value: function createAPIFactory(uploadAPIOptions) {
            var _props = this.props,
                rootFolderId = _props.rootFolderId,
                token = _props.token,
                sharedLink = _props.sharedLink,
                sharedLinkPassword = _props.sharedLinkPassword,
                apiHost = _props.apiHost,
                uploadHost = _props.uploadHost,
                clientName = _props.clientName,
                requestInterceptor = _props.requestInterceptor,
                responseInterceptor = _props.responseInterceptor;


            var itemFolderId = uploadAPIOptions && uploadAPIOptions.folderId ? '' + TYPED_ID_FOLDER_PREFIX + uploadAPIOptions.folderId : '' + TYPED_ID_FOLDER_PREFIX + rootFolderId;
            var itemFileId = uploadAPIOptions && uploadAPIOptions.fileId ? '' + TYPED_ID_FILE_PREFIX + uploadAPIOptions.fileId : null;

            var options = _extends({
                token: token,
                sharedLink: sharedLink,
                sharedLinkPassword: sharedLinkPassword,
                apiHost: apiHost,
                uploadHost: uploadHost,
                clientName: clientName,
                requestInterceptor: requestInterceptor,
                responseInterceptor: responseInterceptor,
                id: itemFileId || itemFolderId
            }, uploadAPIOptions);
            return new API(options);
        }

        /**
         * Given an array of files, return the files that are new to the Content Uploader
         *
         * @param {Array<UploadFileWithAPIOptions | File>} files
         */

    }, {
        key: 'getFileId',


        /**
         * Generates file id based on file properties
         *
         * @param {UploadFileWithAPIOptions | File} file
         */
        value: function getFileId(file) {
            if (!file.options) {
                return file.name;
            }

            if (!file.options.folderId || !file.options.uploadInitTimestamp) {
                return file.file.name;
            }

            return file.file.name + '_' + file.options.folderId + '_' + file.options.uploadInitTimestamp;
        }

        /**
         * Converts File API to upload items and adds to upload queue.
         *
         * @private
         * @param {Array<UploadFileWithAPIOptions | File>} files - Files to be added to upload queue
         * @param {boolean} withApiOptions - whether file objects contain Api options
         * @param {Function} itemUpdateCallback - function to be invoked after items status are updated
         * @return {void}
         */

    }, {
        key: 'getUploadAPI',


        /**
         * Returns a new API instance for the given file.
         *
         * @private
         * @param {File} file - File to get a new API instance for
         * @param {UploadItemAPIOptions} [uploadAPIOptions]
         * @return {UploadAPI} - Instance of Upload API
         */
        value: function getUploadAPI(file, uploadAPIOptions) {
            var chunked = this.props.chunked;
            var size = file.size;

            var factory = this.createAPIFactory(uploadAPIOptions);

            if (chunked && size > CHUNKED_UPLOAD_MIN_SIZE_BYTES) {
                return factory.getChunkedUploadAPI();
            }

            return factory.getPlainUploadAPI();
        }

        /**
         * Removes an item from the upload queue. Cancels upload if in progress.
         *
         * @param {UploadItem} item - Item to remove
         * @return {void}
         */

    }, {
        key: 'removeFileFromUploadQueue',
        value: function removeFileFromUploadQueue(item) {
            var onCancel = this.props.onCancel;
            // Clear any error errorCode in footer

            this.setState({ errorCode: '' });

            var api = item.api;

            api.cancel();

            var items = this.state.items;

            items.splice(items.indexOf(item), 1);

            // Minimize uploads manager if there are no more items
            var callback = this.props.useUploadsManager && !items.length ? this.minimizeUploadsManager : noop;

            onCancel([item]);
            this.updateViewAndCollection(items, callback);
        }

        /**
         * Aborts uploads in progress and clears upload list.
         *
         * @private
         * @return {void}
         */


        /**
         * Uploads all items in the upload collection.
         *
         * @private
         * @return {void}
         */

    }, {
        key: 'uploadFile',


        /**
         * Helper to upload a single file.
         *
         * @param {UploadItem} item - Upload item object
         * @return {void}
         */
        value: function uploadFile(item) {
            var _this2 = this;

            var rootFolderId = this.props.rootFolderId;
            var api = item.api,
                file = item.file,
                options = item.options;


            if (this.numItemsUploading >= UPLOAD_CONCURRENCY) {
                return;
            }

            this.numItemsUploading += 1;

            var uploadOptions = {
                file: file,
                folderId: options && options.folderId ? options.folderId : rootFolderId,
                errorCallback: function errorCallback(error) {
                    return _this2.handleUploadError(item, error);
                },
                progressCallback: function progressCallback(event) {
                    return _this2.handleUploadProgress(item, event);
                },
                successCallback: function successCallback(entries) {
                    return _this2.handleUploadSuccess(item, entries);
                },
                overwrite: true,
                fileId: options && options.fileId ? options.fileId : null
            };

            api.upload(uploadOptions);

            item.status = STATUS_IN_PROGRESS;
            var items = this.state.items;

            items[items.indexOf(item)] = item;

            this.updateViewAndCollection(items);
        }

        /**
         * Helper to reset a file. Cancels any current upload and resets progress.
         *
         * @param {UploadItem} item - Upload item to reset
         * @return {void}
         */

    }, {
        key: 'resetFile',
        value: function resetFile(item) {
            var api = item.api,
                file = item.file,
                options = item.options;

            if (api && typeof api.cancel === 'function') {
                api.cancel();
            }

            // Reset API, progress & status
            item.api = this.getUploadAPI(file, options);
            item.progress = 0;
            item.status = STATUS_PENDING;

            var items = this.state.items;

            items[items.indexOf(item)] = item;

            this.updateViewAndCollection(items);
        }

        /**
         * Handles a successful upload.
         *
         * @private
         * @param {UploadItem} item - Upload item corresponding to success event
         * @param {BoxItem[]} entries - Successfully uploaded Box File objects
         * @return {void}
         */

    }, {
        key: 'updateViewAndCollection',


        /**
         * Updates view and internal upload collection with provided items.
         *
         * @private
         * @param {UploadItem[]} item - Itmes to update collection with
         * @return {void}
         */
        value: function updateViewAndCollection(items, callback) {
            var _this3 = this;

            var _props2 = this.props,
                onComplete = _props2.onComplete,
                useUploadsManager = _props2.useUploadsManager;

            var someUploadIsInProgress = items.some(function (uploadItem) {
                return uploadItem.status !== STATUS_COMPLETE;
            });
            var someUploadHasFailed = items.some(function (uploadItem) {
                return uploadItem.status === STATUS_ERROR;
            });
            var allFilesArePending = !items.some(function (uploadItem) {
                return uploadItem.status !== STATUS_PENDING;
            });
            var noFileIsPendingOrInProgress = items.every(function (uploadItem) {
                return uploadItem.status !== STATUS_PENDING && uploadItem.status !== STATUS_IN_PROGRESS;
            });

            var view = '';
            if (items && items.length === 0 || allFilesArePending) {
                view = VIEW_UPLOAD_EMPTY;
            } else if (someUploadHasFailed && useUploadsManager) {
                view = VIEW_ERROR;
            } else if (someUploadIsInProgress) {
                view = VIEW_UPLOAD_IN_PROGRESS;
            } else {
                view = VIEW_UPLOAD_SUCCESS;

                if (!useUploadsManager) {
                    onComplete(cloneDeep(items.map(function (item) {
                        return item.boxFile;
                    })));
                    // Reset item collection after successful upload
                    items = []; // eslint-disable-line
                }
            }

            if (noFileIsPendingOrInProgress && useUploadsManager) {
                onComplete(items);
            }

            var itemIds = {};
            items.forEach(function (item) {
                itemIds[_this3.getFileId(item)] = true;
            });

            var state = {
                items: items,
                itemIds: itemIds,
                view: view,
                isUploadsManagerExpanded: this.state.isUploadsManagerExpanded
            };

            if (items.length === 0) {
                state.errorCode = '';
            }

            this.setState(state, callback);
        }

        /**
         * Handles an upload error.
         *
         * @private
         * @param {UploadItem} item - Upload item corresponding to error
         * @param {Error} error - Upload error
         * @return {void}
         */


        /**
         * Handles an upload progress event.
         *
         * @private
         * @param {UploadItem} item - Upload item corresponding to progress event
         * @param {ProgressEvent} event - Progress event
         * @return {void}
         */


        /**
         * Updates item based on its status.
         *
         * @private
         * @param {UploadItem} item - The upload item to update
         * @return {void}
         */


        /**
         * Expands the upload manager
         *
         * @return {void}
         */


        /**
         * Minimizes the upload manager
         *
         * @return {void}
         */


        /**
         * Hides the upload manager
         *
         * @return {void}
         */


        /**
         * Toggles the upload manager
         *
         * @return {void}
         */


        /**
         * Empties the items queue
         *
         * @return {void}
         */


        /**
         * Adds file to the upload queue and starts upload immediately
         *
         * @param {Array<UploadFileWithAPIOptions | File>} files - Files to be added to upload queue
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the content uploader
         *
         * @inheritdoc
         * @return {Component}
         */
        value: function render() {
            var _props3 = this.props,
                language = _props3.language,
                messages = _props3.messages,
                onClose = _props3.onClose,
                className = _props3.className,
                measureRef = _props3.measureRef,
                isTouch = _props3.isTouch,
                fileLimit = _props3.fileLimit,
                useUploadsManager = _props3.useUploadsManager;
            var _state = this.state,
                view = _state.view,
                items = _state.items,
                errorCode = _state.errorCode,
                isUploadsManagerExpanded = _state.isUploadsManagerExpanded;


            var hasFiles = items.length !== 0;
            var isLoading = items.some(function (item) {
                return item.status === STATUS_IN_PROGRESS;
            });

            var styleClassName = classNames('bcu', className, {
                'be-app-element': !useUploadsManager,
                be: !useUploadsManager
            });

            return React.createElement(
                Internationalize,
                { language: language, messages: messages },
                useUploadsManager ? React.createElement(
                    'div',
                    { className: styleClassName, id: this.id, ref: measureRef },
                    React.createElement(UploadsManager, {
                        isExpanded: isUploadsManagerExpanded,
                        items: items,
                        onItemActionClick: this.onClick,
                        toggleUploadsManager: this.toggleUploadsManager,
                        view: view
                    })
                ) : React.createElement(
                    'div',
                    { className: styleClassName, id: this.id, ref: measureRef },
                    React.createElement(DroppableContent, {
                        addFiles: this.addFilesToUploadQueue,
                        allowedTypes: ['Files'],
                        items: items,
                        isTouch: isTouch,
                        view: view,
                        onClick: this.onClick
                    }),
                    React.createElement(Footer, {
                        hasFiles: hasFiles,
                        isLoading: isLoading,
                        errorCode: errorCode,
                        fileLimit: fileLimit,
                        onCancel: this.cancel,
                        onClose: onClose,
                        onUpload: this.upload
                    })
                )
            );
        }
    }]);

    return ContentUploader;
}(Component);

ContentUploader.defaultProps = {
    rootFolderId: DEFAULT_ROOT,
    apiHost: DEFAULT_HOSTNAME_API,
    chunked: true,
    className: '',
    clientName: CLIENT_NAME_CONTENT_UPLOADER,
    fileLimit: FILE_LIMIT_DEFAULT,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    onClose: noop,
    onComplete: noop,
    onError: noop,
    onUpload: noop,
    useUploadsManager: false,
    files: [],
    onMinimize: noop,
    onCancel: noop
};


export default makeResponsive(ContentUploader);