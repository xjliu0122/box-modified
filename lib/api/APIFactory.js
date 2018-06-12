var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @file Main entry point for the box api
 * @author Box
 */

import Cache from '../util/Cache';
import ChunkedUploadAPI from './uploads/MultiputUpload';
import PlainUploadAPI from './uploads/PlainUpload';
import FolderAPI from './Folder';
import FileAPI from './File';
import WebLinkAPI from './WebLink';
import SearchAPI from './Search';
import RecentsAPI from './Recents';
import VersionsAPI from './Versions';
import CommentsAPI from './Comments';
import TasksAPI from './Tasks';
import TaskAssignmentsAPI from './TaskAssignments';
import FileAccessStatsAPI from './FileAccessStats';
import UsersAPI from './Users';
import MetadataAPI from './Metadata';
import FileCollaboratorsAPI from './FileCollaborators';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_UPLOAD, TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../constants';

var APIFactory = function () {

    /**
     * [constructor]
     *
     * @param {Object} options
     * @param {string} options.id - item id
     * @param {string|function} options.token - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.apiHost] - Api host
     * @param {string} [options.uploadHost] - Upload host name
     * @return {API} Api instance
     */


    /*
     * @property {MetadataAPI}
     */


    /*
     * @property {FileAccessStatsAPI}
     */


    /**
     * @property {TasksAPI}
     */


    /**
     * @property {VersionsAPI}
     */


    /**
     * @property {SearchAPI}
     */


    /**
     * @property {PlainUploadAPI}
     */


    /**
     * @property {WebLink}
     */

    /**
     * @property {*}
     */
    function APIFactory(options) {
        _classCallCheck(this, APIFactory);

        this.options = Object.assign({}, options, {
            apiHost: options.apiHost || DEFAULT_HOSTNAME_API,
            uploadHost: options.uploadHost || DEFAULT_HOSTNAME_UPLOAD,
            cache: options.cache || new Cache()
        });
    }

    /**
     * [destructor]
     *
     * @param {boolean} destroyCache - true to destroy cache
     * @return {void}
     */


    /**
     * @property {FileCollaboratorsAPI}
     */


    /*
     * @property {UsersAPI}
     */


    /**
     * @property {TaskAssignmentsAPI}
     */


    /**
     * @property {CommentsAPI}
     */


    /**
     * @property {RecentsAPI}
     */


    /**
     * @property {ChunkedUploadAPI}
     */


    /**
     * @property {FolderAPI}
     */


    /**
     * @property {FileAPI}
     */


    _createClass(APIFactory, [{
        key: 'destroy',
        value: function destroy() {
            var destroyCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.fileAPI) {
                this.fileAPI.destroy();
                delete this.fileAPI;
            }
            if (this.weblinkAPI) {
                this.weblinkAPI.destroy();
                delete this.weblinkAPI;
            }
            if (this.plainUploadAPI) {
                this.plainUploadAPI.destroy();
                delete this.plainUploadAPI;
            }
            if (this.chunkedUploadAPI) {
                this.chunkedUploadAPI.destroy();
                delete this.chunkedUploadAPI;
            }
            if (this.folderAPI) {
                this.folderAPI.destroy();
                delete this.folderAPI;
            }
            if (this.searchAPI) {
                this.searchAPI.destroy();
                delete this.searchAPI;
            }
            if (this.recentsAPI) {
                this.recentsAPI.destroy();
                delete this.recentsAPI;
            }
            if (this.versionsAPI) {
                this.versionsAPI.destroy();
                delete this.versionsAPI;
            }
            if (this.fileAccessStatsAPI) {
                this.fileAccessStatsAPI.destroy();
                delete this.fileAccessStatsAPI;
            }
            if (this.tasksAPI) {
                this.tasksAPI.destroy();
                delete this.tasksAPI;
            }
            if (this.commentsAPI) {
                this.commentsAPI.destroy();
                delete this.commentsAPI;
            }
            if (this.usersAPI) {
                this.usersAPI.destroy();
                delete this.usersAPI;
            }
            if (this.metadataAPI) {
                this.metadataAPI.destroy();
                delete this.metadataAPI;
            }
            if (this.fileCollaboratorsAPI) {
                this.fileCollaboratorsAPI.destroy();
                delete this.fileCollaboratorsAPI;
            }
            if (destroyCache) {
                this.options.cache = new Cache();
            }
        }

        /**
         * Gets the cache instance
         *
         * @return {Cache} cache instance
         */

    }, {
        key: 'getCache',
        value: function getCache() {
            return this.options.cache;
        }

        /**
         * Returns the API based on type of item
         *
         * @private
         * @param {String} type - item type
         * @return {ItemAPI} api
         */

    }, {
        key: 'getAPI',
        value: function getAPI(type) {
            var api = void 0;

            switch (type) {
                case TYPE_FOLDER:
                    api = this.getFolderAPI();
                    break;
                case TYPE_FILE:
                    api = this.getFileAPI();
                    break;
                case TYPE_WEBLINK:
                    api = this.getWebLinkAPI();
                    break;
                default:
                    throw new Error('Unknown Type!');
            }

            return api;
        }

        /**
         * API for file
         *
         * @return {FileAPI} FileAPI instance
         */

    }, {
        key: 'getFileAPI',
        value: function getFileAPI() {
            this.destroy();
            this.fileAPI = new FileAPI(this.options);
            return this.fileAPI;
        }

        /**
         * API for web links
         *
         * @return {WebLinkAPI} WebLinkAPI instance
         */

    }, {
        key: 'getWebLinkAPI',
        value: function getWebLinkAPI() {
            this.destroy();
            this.weblinkAPI = new WebLinkAPI(this.options);
            return this.weblinkAPI;
        }

        /**
         * API for plain uploads
         *
         * @return {UploadAPI} UploadAPI instance
         */

    }, {
        key: 'getPlainUploadAPI',
        value: function getPlainUploadAPI() {
            this.destroy();
            this.plainUploadAPI = new PlainUploadAPI(this.options);
            return this.plainUploadAPI;
        }

        /**
         * API for chunked uploads
         *
         * @return {UploadAPI} UploadAPI instance
         */

    }, {
        key: 'getChunkedUploadAPI',
        value: function getChunkedUploadAPI() {
            this.destroy();
            this.chunkedUploadAPI = new ChunkedUploadAPI(this.options);
            return this.chunkedUploadAPI;
        }

        /**
         * API for folder
         *
         * @return {FolderAPI} FolderAPI instance
         */

    }, {
        key: 'getFolderAPI',
        value: function getFolderAPI() {
            this.destroy();
            this.folderAPI = new FolderAPI(this.options);
            return this.folderAPI;
        }

        /**
         * API for search
         *
         * @return {SearchAPI} SearchAPI instance
         */

    }, {
        key: 'getSearchAPI',
        value: function getSearchAPI() {
            this.destroy();
            this.searchAPI = new SearchAPI(this.options);
            return this.searchAPI;
        }

        /**
         * API for recents
         *
         * @return {RecentsAPI} RecentsAPI instance
         */

    }, {
        key: 'getRecentsAPI',
        value: function getRecentsAPI() {
            this.destroy();
            this.recentsAPI = new RecentsAPI(this.options);
            return this.recentsAPI;
        }

        /**
         * API for metadata
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {MetadataAPI} MetadataAPI instance
         */

    }, {
        key: 'getMetadataAPI',
        value: function getMetadataAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.metadataAPI = new MetadataAPI(this.options);
            return this.metadataAPI;
        }

        /**
         * API for versions
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {VersionsAPI} VersionsAPI instance
         */

    }, {
        key: 'getVersionsAPI',
        value: function getVersionsAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.versionsAPI = new VersionsAPI(this.options);
            return this.versionsAPI;
        }

        /**
         * API for comments
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {CommentsAPI} CommentsAPI instance
         */

    }, {
        key: 'getCommentsAPI',
        value: function getCommentsAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.commentsAPI = new CommentsAPI(this.options);
            return this.commentsAPI;
        }

        /**
         * API for tasks
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {TasksAPI} TasksAPI instance
         */

    }, {
        key: 'getTasksAPI',
        value: function getTasksAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.tasksAPI = new TasksAPI(this.options);
            return this.tasksAPI;
        }

        /**
         * API for tasks
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {TasksAPI} TaskAssignmentsAPI instance
         */

    }, {
        key: 'getTaskAssignmentsAPI',
        value: function getTaskAssignmentsAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.taskAssignmentsAPI = new TaskAssignmentsAPI(this.options);
            return this.taskAssignmentsAPI;
        }

        /*
         * API for file access stats
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {FileAccessStatsAPI} FileAccessStatsAPI instance
         */

    }, {
        key: 'getFileAccessStatsAPI',
        value: function getFileAccessStatsAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.fileAccessStatsAPI = new FileAccessStatsAPI(this.options);
            return this.fileAccessStatsAPI;
        }

        /*
         * API for file collaborators
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {FileCollaboratorsAPI} FileCollaboratorsAPI instance
         */

    }, {
        key: 'getFileCollaboratorsAPI',
        value: function getFileCollaboratorsAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.fileCollaboratorsAPI = new FileCollaboratorsAPI(this.options);
            return this.fileCollaboratorsAPI;
        }

        /*
         * API for Users
         *
         * @param {boolean} shouldDestroy - true if the factory should destroy before returning the call
         * @return {UsersAPI} UsersAPI instance
         */

    }, {
        key: 'getUsersAPI',
        value: function getUsersAPI(shouldDestroy) {
            if (shouldDestroy) {
                this.destroy();
            }
            this.usersAPI = new UsersAPI(this.options);
            return this.usersAPI;
        }
    }]);

    return APIFactory;
}();

export default APIFactory;