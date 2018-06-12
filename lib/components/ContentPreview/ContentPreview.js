var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Content Preview Component
 * @author Box
 */

import 'regenerator-runtime/runtime';
import React, { PureComponent } from 'react';
import uniqueid from 'lodash/uniqueId';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import getProp from 'lodash/get';
import noop from 'lodash/noop';
import Measure from 'react-measure';
import { decode } from 'box-react-ui/lib/utils/keys';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconNavigateLeft from 'box-react-ui/lib/icons/general/IconNavigateLeft';
import IconNavigateRight from 'box-react-ui/lib/icons/general/IconNavigateRight';
import ContentSidebar from '../ContentSidebar';
import Header from './Header';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import Internationalize from '../Internationalize';
import TokenService from '../../util/TokenService';
import { isValidBoxFile } from '../../util/fields';
import { isInputElement, focus } from '../../util/dom';
import { getTypedFileId } from '../../util/file';
import { shouldRenderSidebar } from '../ContentSidebar/sidebarUtil';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_APP, DEFAULT_HOSTNAME_STATIC, DEFAULT_PREVIEW_VERSION, DEFAULT_PREVIEW_LOCALE, DEFAULT_PATH_STATIC_PREVIEW, CLIENT_NAME_CONTENT_PREVIEW } from '../../constants';


var InvalidIdError = new Error('Invalid id for Preview!');

var ContentPreview = function (_PureComponent) {
    _inherits(ContentPreview, _PureComponent);

    /**
     * [constructor]
     *
     * @return {ContentPreview}
     */
    function ContentPreview(props) {
        _classCallCheck(this, ContentPreview);

        var _this = _possibleConstructorReturn(this, (ContentPreview.__proto__ || Object.getPrototypeOf(ContentPreview)).call(this, props));

        _initialiseProps.call(_this);

        var cache = props.cache,
            token = props.token,
            sharedLink = props.sharedLink,
            sharedLinkPassword = props.sharedLinkPassword,
            apiHost = props.apiHost,
            requestInterceptor = props.requestInterceptor,
            responseInterceptor = props.responseInterceptor;


        _this.id = uniqueid('bcpr_');
        _this.api = new API({
            cache: cache,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            clientName: CLIENT_NAME_CONTENT_PREVIEW,
            requestInterceptor: requestInterceptor,
            responseInterceptor: responseInterceptor
        });
        return _this;
    }

    /**
     * Cleanup
     *
     * @return {void}
     */


    _createClass(ContentPreview, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.preview) {
                this.preview.removeAllListeners();
                this.preview.destroy();
                this.preview = undefined;
            }
        }

        /**
         * If new file ID or token is received, destroy preview and fetch file info for new file.
         *
         * @return {void}
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                fileId = _props.fileId,
                token = _props.token;

            var hasTokenChanged = nextProps.token !== token;
            var hasFileIdChanged = nextProps.fileId !== fileId;

            if (hasTokenChanged || hasFileIdChanged) {
                this.fetchFile(nextProps.fileId);
            }
        }

        /**
         * Once the component mounts, load Preview assets and fetch file info.
         *
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props2 = this.props,
                fileId = _props2.fileId,
                previewInstance = _props2.previewInstance;


            if (previewInstance) {
                this.setPreviewInstance(previewInstance);
            } else {
                this.loadStylesheet();
                this.loadScript();
            }

            this.fetchFile(fileId);
            this.rootElement = document.getElementById(this.id);
            this.focusPreview();
        }

        /**
         * After component updates, load Preview if appropriate.
         *
         * @return {void}
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.shouldLoadPreview(prevProps, prevState)) {
                this.loadPreview();
            }
        }

        /**
         * Returns whether or not preview should be loaded.
         *
         * @param {Props} prevProps - Previous props
         * @param {State} prevState - Previous state
         * @return {boolean}
         */

    }, {
        key: 'shouldLoadPreview',
        value: function shouldLoadPreview(prevProps, prevState) {
            var file = this.state.file;
            var prevFile = prevState.file;

            var loadPreview = false;

            // Load preview if file version ID has changed
            if (file && file.file_version && prevFile && prevFile.file_version) {
                loadPreview = file.file_version.id !== prevFile.file_version.id;
            } else {
                // Load preview if file object has newly been popuplated in state
                loadPreview = !prevFile && !!file;
            }

            return loadPreview;
        }

        /**
         * Returns preview asset urls
         *
         * @return {string} base url
         */

    }, {
        key: 'getBasePath',
        value: function getBasePath(asset) {
            var _props3 = this.props,
                staticHost = _props3.staticHost,
                staticPath = _props3.staticPath,
                language = _props3.language,
                version = _props3.version;

            var path = staticPath + '/' + version + '/' + language + '/' + asset;
            var suffix = staticHost.endsWith('/') ? path : '/' + path;
            return '' + staticHost + suffix;
        }

        /**
         * Determines if preview assets are loaded
         *
         * @return {boolean} true if preview is loaded
         */

    }, {
        key: 'isPreviewLibraryLoaded',
        value: function isPreviewLibraryLoaded() {
            return !!global.Box && !!global.Box.Preview;
        }

        /**
         * Loads external css by appending a <link> element
         *
         * @return {void}
         */

    }, {
        key: 'loadStylesheet',
        value: function loadStylesheet() {
            var _document = document,
                head = _document.head;

            var url = this.getBasePath('preview.css');

            if (!head || head.querySelector('link[rel="stylesheet"][href="' + url + '"]')) {
                return;
            }

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            head.appendChild(link);
        }

        /**
         * Loads external script by appending a <script> element
         *
         * @return {void}
         */

    }, {
        key: 'loadScript',
        value: function loadScript() {
            var _document2 = document,
                head = _document2.head;

            var url = this.getBasePath('preview.js');

            if (!head || this.isPreviewLibraryLoaded()) {
                return;
            }

            var previewScript = head.querySelector('script[src="' + url + '"]');
            if (previewScript) {
                return;
            }

            var script = document.createElement('script');
            script.src = url;
            script.addEventListener('load', this.loadPreview);
            head.appendChild(script);
        }

        /**
         * Focuses the preview on load.
         *
         * @return {void}
         */

    }, {
        key: 'focusPreview',
        value: function focusPreview() {
            var autoFocus = this.props.autoFocus;

            if (autoFocus && !isInputElement(document.activeElement)) {
                focus(this.rootElement);
            }
        }

        /**
         * Updates preview cache and prefetches a file
         *
         * @param {BoxItem>} file - file to prefetch
         * @return {void}
         */

    }, {
        key: 'updatePreviewCacheAndPrefetch',
        value: function updatePreviewCacheAndPrefetch(file, token) {
            if (!this.preview || !file || !file.id) {
                return;
            }

            this.preview.updateFileCache([file]);
            this.preview.prefetch({ fileId: file.id, token: token });
        }

        /**
         * Gets the file id
         *
         * @param {string|BoxItem} file - box file or file id
         * @return {string} file id
         */

    }, {
        key: 'getFileId',
        value: function getFileId(file) {
            if (typeof file === 'string') {
                return file;
            }

            if ((typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object' && !!file.id) {
                return file.id;
            }

            throw InvalidIdError;
        }

        /**
         * Prefetches the next few preview files if any
         *
         * @param {Array<string|BoxItem>} files - files to prefetch
         * @return {void}
         */

    }, {
        key: 'prefetch',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(files) {
                var _this2 = this;

                var token, typedIds;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                token = this.props.token;
                                typedIds = files.map(function (file) {
                                    return getTypedFileId(_this2.getFileId(file));
                                });
                                _context.next = 4;
                                return TokenService.cacheTokens(typedIds, token);

                            case 4:
                                files.forEach(function (file) {
                                    var fileId = _this2.getFileId(file);
                                    _this2.fetchFile(fileId, noop, noop);
                                });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function prefetch(_x) {
                return _ref.apply(this, arguments);
            }

            return prefetch;
        }()

        /**
         * onLoad function for preview
         *
         * @return {void}
         */

    }, {
        key: 'canDownload',


        /**
         * Returns whether file can be downloaded based on file properties, permissions, and user-defined options.
         *
         * @return {boolean}
         */
        value: function canDownload() {
            // showDownload is a prop that preview library uses and can be passed by the user
            var _props4 = this.props,
                showDownload = _props4.showDownload,
                canDownload = _props4.canDownload;
            var file = this.state.file;

            var isFileDownloadable = getProp(file, 'permissions.can_download', false) && getProp(file, 'is_download_available', false);
            return isFileDownloadable && !!canDownload && !!showDownload;
        }

        /**
         * Sets a preview instance and adds event listeners.
         *
         * @param {Object} preview - Preview instance
         * @return {void}
         */

    }, {
        key: 'addPreviewListeners',


        /**
         * Adds preview event listeners.
         *
         * @return {void}
         */
        value: function addPreviewListeners() {
            if (!this.preview || typeof this.preview.addListener !== 'function') {
                return;
            }

            var _props5 = this.props,
                onError = _props5.onError,
                onMetric = _props5.onMetric;


            this.preview.addListener('load', this.onPreviewLoad);
            this.preview.addListener('preview_error', onError);
            this.preview.addListener('preview_metric', onMetric);
        }

        /**
         * Loads preview in the component using the preview library.
         *
         * @return {void}
         */


        /**
         * Tells the preview to resize
         *
         * @return {void}
         */


        /**
         * Network error callback
         *
         * @param {Error} error error object
         * @return {void}
         */


        /**
         * File fetch success callback
         *
         * @param {Object} file - Box file
         * @return {void}
         */

    }, {
        key: 'fetchFile',


        /**
         * Fetches a file
         *
         * @param {string} id file id
         * @param {Function|void} [successCallback] - Callback after file is fetched
         * @param {Function|void} [errorCallback] - Callback after error
         * @return {void}
         */
        value: function fetchFile(id, successCallback, errorCallback) {
            if (!id) {
                throw InvalidIdError;
            }
            var hasSidebar = this.props.hasSidebar;

            this.api.getFileAPI().file(id, successCallback || this.fetchFileSuccessCallback, errorCallback || this.errorCallback, false, hasSidebar);
        }

        /**
         * Returns the viewer instance being used by preview.
         * This will let child components access the viewers.
         *
         * @return {Preview} current instance of preview
         */

    }, {
        key: 'getFileIndex',


        /**
         * Finds the index of current file inside the collection
         *
         * @return {number} -1 if not indexed
         */
        value: function getFileIndex() {
            var file = this.state.file;
            var collection = this.props.collection;

            if (!file || collection.length < 2) {
                return -1;
            }

            var index = collection.indexOf(file);
            if (index < 0) {
                return collection.indexOf(file.id);
            }
            return index;
        }

        /**
         * Shows a preview of a file at the specified index in the current collection.
         *
         * @public
         * @param {number} index - Index of file to preview
         * @return {void}
         */

    }, {
        key: 'navigateToIndex',
        value: function navigateToIndex(index) {
            var _props6 = this.props,
                collection = _props6.collection,
                onNavigate = _props6.onNavigate;
            var length = collection.length;

            if (length < 2 || index < 0 || index > length - 1) {
                return;
            }

            var fileOrId = collection[index];
            var fileId = (typeof fileOrId === 'undefined' ? 'undefined' : _typeof(fileOrId)) === 'object' ? fileOrId.id || '' : fileOrId;

            // Execute navigation callback
            onNavigate(fileId);

            // Hide current preview immediately - we don't want to wait until the next file info returns
            this.preview.hide();

            // Fetch file info for next file
            this.fetchFile(fileId);
        }

        /**
         * Shows a preview of the previous file.
         *
         * @public
         * @return {void}
         */


        /**
         * Shows a preview of the next file.
         *
         * @public
         * @return {void}
         */


        /**
         * Downloads file.
         *
         * @public
         * @return {void}
         */


        /**
         * Prints file.
         *
         * @public
         * @return {void}
         */


        /**
         * Mouse move handler thati s throttled and show
         * the navigation arrows if applicable.
         *
         * @return {void}
         */


        /**
         * Keyboard events
         *
         * @return {void}
         */


        /**
         * Holds the reference the preview container
         *
         * @return {void}
         */

    }, {
        key: 'render',


        /**
         * Renders the file preview
         *
         * @inheritdoc
         * @return {Element}
         */
        value: function render() {
            var _props7 = this.props,
                apiHost = _props7.apiHost,
                isSmall = _props7.isSmall,
                token = _props7.token,
                language = _props7.language,
                messages = _props7.messages,
                className = _props7.className,
                contentSidebarProps = _props7.contentSidebarProps,
                hasSidebar = _props7.hasSidebar,
                hasHeader = _props7.hasHeader,
                onClose = _props7.onClose,
                measureRef = _props7.measureRef,
                sharedLink = _props7.sharedLink,
                sharedLinkPassword = _props7.sharedLinkPassword,
                requestInterceptor = _props7.requestInterceptor,
                responseInterceptor = _props7.responseInterceptor;
            var file = this.state.file;
            var collection = this.props.collection;

            var fileIndex = this.getFileIndex();
            var hasLeftNavigation = collection.length > 1 && fileIndex > 0 && fileIndex < collection.length;
            var hasRightNavigation = collection.length > 1 && fileIndex > -1 && fileIndex < collection.length - 1;
            var isValidFile = isValidBoxFile(file, true, true);
            var isSidebarVisible = isValidFile && hasSidebar && shouldRenderSidebar(contentSidebarProps);

            /* eslint-disable jsx-a11y/no-static-element-interactions */
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            return React.createElement(
                Internationalize,
                { language: language, messages: messages },
                React.createElement(
                    'div',
                    {
                        id: this.id,
                        className: 'be bcpr ' + className,
                        ref: measureRef,
                        onKeyDown: this.onKeyDown,
                        tabIndex: 0
                    },
                    hasHeader && React.createElement(Header, {
                        file: file,
                        onClose: onClose,
                        onPrint: this.print,
                        canDownload: this.canDownload(),
                        onDownload: this.download
                    }),
                    React.createElement(
                        'div',
                        { className: 'bcpr-body' },
                        React.createElement(
                            'div',
                            { className: 'bcpr-container', onMouseMove: this.onMouseMove, ref: this.containerRef },
                            React.createElement(
                                Measure,
                                { bounds: true, onResize: this.onResize },
                                function (_ref2) {
                                    var previewRef = _ref2.measureRef;
                                    return React.createElement('div', { ref: previewRef, className: 'bcpr-content' });
                                }
                            ),
                            hasLeftNavigation && React.createElement(
                                PlainButton,
                                { type: 'button', className: 'bcpr-navigate-left', onClick: this.navigateLeft },
                                React.createElement(IconNavigateLeft, null)
                            ),
                            hasRightNavigation && React.createElement(
                                PlainButton,
                                { type: 'button', className: 'bcpr-navigate-right', onClick: this.navigateRight },
                                React.createElement(IconNavigateRight, null)
                            )
                        ),
                        isSidebarVisible && React.createElement(ContentSidebar, _extends({}, contentSidebarProps, {
                            isSmall: isSmall,
                            apiHost: apiHost,
                            token: token,
                            cache: this.api.getCache(),
                            fileId: this.getFileId(file),
                            getPreviewer: this.getPreviewer,
                            sharedLink: sharedLink,
                            sharedLinkPassword: sharedLinkPassword,
                            requestInterceptor: requestInterceptor,
                            responseInterceptor: responseInterceptor
                        }))
                    )
                )
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
        }
    }]);

    return ContentPreview;
}(PureComponent);

ContentPreview.defaultProps = {
    className: '',
    apiHost: DEFAULT_HOSTNAME_API,
    appHost: DEFAULT_HOSTNAME_APP,
    staticHost: DEFAULT_HOSTNAME_STATIC,
    staticPath: DEFAULT_PATH_STATIC_PREVIEW,
    language: DEFAULT_PREVIEW_LOCALE,
    version: DEFAULT_PREVIEW_VERSION,
    hasSidebar: false,
    canDownload: true,
    showDownload: true,
    hasHeader: false,
    autoFocus: false,
    useHotkeys: true,
    onDownload: noop,
    onError: noop,
    onLoad: noop,
    onMetric: noop,
    onNavigate: noop,
    collection: [],
    contentSidebarProps: {}
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.state = {};

    this.onPreviewLoad = function (data) {
        var _props8 = _this3.props,
            onLoad = _props8.onLoad,
            collection = _props8.collection;

        var currentIndex = _this3.getFileIndex();
        var filesToPrefetch = collection.slice(currentIndex + 1, currentIndex + 5);
        onLoad(data);
        _this3.focusPreview();
        if (_this3.preview && filesToPrefetch.length > 1) {
            _this3.prefetch(filesToPrefetch);
        }
    };

    this.setPreviewInstance = function (preview) {
        _this3.preview = preview;
        _this3.addPreviewListeners();
    };

    this.loadPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _props9, tokenOrTokenFunction, collection, rest, file, typedId, token, previewOptions, Preview;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _props9 = _this3.props, tokenOrTokenFunction = _props9.token, collection = _props9.collection, rest = _objectWithoutProperties(_props9, ['token', 'collection']);
                        file = _this3.state.file;

                        if (!(!_this3.isPreviewLibraryLoaded() || !file || !tokenOrTokenFunction)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 4:
                        typedId = getTypedFileId(_this3.getFileId(file));
                        _context2.next = 7;
                        return TokenService.getReadToken(typedId, tokenOrTokenFunction);

                    case 7:
                        token = _context2.sent;
                        previewOptions = {
                            showDownload: _this3.canDownload(),
                            skipServerUpdate: true,
                            header: 'none',
                            container: '#' + _this3.id + ' .bcpr-content',
                            useHotkeys: false
                        };


                        if (!_this3.preview) {
                            Preview = global.Box.Preview;

                            _this3.setPreviewInstance(new Preview());
                        }

                        _this3.preview.updateFileCache([file]);
                        _this3.preview.show(file.id, token, _extends({}, previewOptions, omit(rest, Object.keys(previewOptions))));

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this3);
    }));

    this.onResize = function () {
        if (_this3.preview && _this3.preview.getCurrentViewer()) {
            _this3.preview.resize();
        }
    };

    this.errorCallback = function (error) {
        /* eslint-disable no-console */
        console.error(error);
        /* eslint-enable no-console */
    };

    this.fetchFileSuccessCallback = function (file) {
        _this3.setState({ file: file });
    };

    this.getPreviewer = function () {
        var file = _this3.state.file;

        if (!_this3.preview || !file) {
            return null;
        }
        var viewer = _this3.preview.getCurrentViewer();
        var previewingFile = _this3.preview.getCurrentFile();
        if (!previewingFile || !viewer || previewingFile.id !== file.id) {
            return null;
        }
        return viewer;
    };

    this.navigateLeft = function () {
        var currentIndex = _this3.getFileIndex();
        var newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        if (newIndex !== currentIndex) {
            _this3.navigateToIndex(newIndex);
        }
    };

    this.navigateRight = function () {
        var collection = _this3.props.collection;

        var currentIndex = _this3.getFileIndex();
        var newIndex = currentIndex === collection.length - 1 ? collection.length - 1 : currentIndex + 1;
        if (newIndex !== currentIndex) {
            _this3.navigateToIndex(newIndex);
        }
    };

    this.download = function () {
        var onDownload = _this3.props.onDownload;
        var file = _this3.state.file;

        if (_this3.preview) {
            _this3.preview.download();
            onDownload(cloneDeep(file));
        }
    };

    this.print = function () {
        if (_this3.preview) {
            _this3.preview.print();
        }
    };

    this.onMouseMove = throttle(function () {
        var viewer = _this3.getPreviewer();
        var isPreviewing = !!viewer;
        var CLASS_NAVIGATION_VISIBILITY = 'bcpr-nav-is-visible';

        clearTimeout(_this3.mouseMoveTimeoutID);

        if (!_this3.previewContainer) {
            return;
        }

        // Always assume that navigation arrows will be hidden
        _this3.previewContainer.classList.remove(CLASS_NAVIGATION_VISIBILITY);

        // Only show it if either we aren't previewing or if we are then the viewer
        // is not blocking the show. If we are previewing then the viewer may choose
        // to not allow navigation arrows. This is mostly useful for videos since the
        // navigation arrows may interfere with the settings menu inside video player.
        if (_this3.previewContainer && (!isPreviewing || viewer.allowNavigationArrows())) {
            _this3.previewContainer.classList.add(CLASS_NAVIGATION_VISIBILITY);
        }

        _this3.mouseMoveTimeoutID = setTimeout(function () {
            if (_this3.previewContainer) {
                _this3.previewContainer.classList.remove(CLASS_NAVIGATION_VISIBILITY);
            }
        }, 1500);
    }, 1000, true);

    this.onKeyDown = function (event) {
        var useHotkeys = _this3.props.useHotkeys;

        if (!useHotkeys) {
            return;
        }

        var consumed = false;
        var key = decode(event);
        var viewer = _this3.getPreviewer();

        // If focus was on an input or if the viewer doesn't exist
        // then don't bother doing anything further
        if (!key || !viewer || isInputElement(event.target)) {
            return;
        }

        if (typeof viewer.onKeydown === 'function') {
            consumed = !!viewer.onKeydown(key, event.nativeEvent);
        }

        if (!consumed) {
            switch (key) {
                case 'ArrowLeft':
                    _this3.navigateLeft();
                    consumed = true;
                    break;
                case 'ArrowRight':
                    _this3.navigateRight();
                    consumed = true;
                    break;
                default:
                // no-op
            }
        }

        if (consumed) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    this.containerRef = function (container) {
        _this3.previewContainer = container;
    };
};

export { ContentPreview as ContentPreviewComponent };
export default makeResponsive(ContentPreview);