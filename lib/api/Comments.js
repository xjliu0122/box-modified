var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box comments API
 * @author Box
 */

import OffsetBasedAPI from './OffsetBasedAPI';
import { PERMISSION_CAN_COMMENT, PERMISSION_CAN_DELETE, PERMISSION_CAN_EDIT } from '../constants';
import { COMMENTS_FIELDS_TO_FETCH } from '../util/fields';

var Comments = function (_OffsetBasedAPI) {
    _inherits(Comments, _OffsetBasedAPI);

    function Comments() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Comments);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comments.__proto__ || Object.getPrototypeOf(Comments)).call.apply(_ref, [this].concat(args))), _this), _this.successHandler = function (data) {
            if (_this.isDestroyed() || typeof _this.successCallback !== 'function') {
                return;
            }

            // There is no response data when deleting a comment
            if (!data) {
                _this.successCallback();
                return;
            }

            // We don't have entries when updating/creating a comment
            if (!data.entries) {
                _this.successCallback(_this.format(data));
                return;
            }

            var comments = data.entries.map(_this.format);
            _this.successCallback(_extends({}, data, { entries: comments }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Comments, [{
        key: 'getUrl',

        /**
         * API URL for comments on a file
         *
         * @param {string} id - A box file id
         * @return {string} base url for files
         */
        value: function getUrl(id) {
            if (!id) {
                throw new Error('Missing file id!');
            }
            return this.getBaseApiUrl() + '/files/' + id + '/comments';
        }

        /**
         * API URL for comments endpoint
         *
         * @param {string} [id] - A box comment id
         * @return {string} base url for comments
         */

    }, {
        key: 'commentsUrl',
        value: function commentsUrl(id) {
            var baseUrl = this.getBaseApiUrl() + '/comments';
            return id ? baseUrl + '/' + id : baseUrl;
        }

        /**
         * Formats comment data for use in components.
         *
         * @param {string} [id] - An individual comment entry from the API
         * @return {Task} A task
         */

    }, {
        key: 'format',
        value: function format(comment) {
            return _extends({}, comment, {
                tagged_message: comment.tagged_message !== '' ? comment.tagged_message : comment.message
            });
        }

        /**
         * Formats the comments api response to usable data
         * @param {Object} data the api response data
         */

    }, {
        key: 'createComment',


        /**
         * API for creating a comment on a file
         *
         * @param {BoxItem} file - File object for which we are creating a comment
         * @param {string} message - Comment message
         * @param {string} taggedMessage - Comment message with @mentions
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */
        value: function createComment(_ref2) {
            var file = _ref2.file,
                message = _ref2.message,
                taggedMessage = _ref2.taggedMessage,
                successCallback = _ref2.successCallback,
                errorCallback = _ref2.errorCallback;
            var _file$id = file.id,
                id = _file$id === undefined ? '' : _file$id,
                permissions = file.permissions;


            try {
                this.checkApiCallValidity(PERMISSION_CAN_COMMENT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            var requestData = {
                data: {
                    item: {
                        id: id,
                        type: 'file'
                    },
                    message: message,
                    tagged_message: taggedMessage
                },
                params: {
                    fields: COMMENTS_FIELDS_TO_FETCH.toString()
                }
            };

            this.post(id, this.commentsUrl(), requestData, successCallback, errorCallback);
        }

        /**
         * API for updating a comment on a file
         *
         * @param {BoxItem} file - File object for which we are updating a comment
         * @param {string} commentId - Comment to be edited
         * @param {string} message - Comment message
         * @param {BoxItemPermission} permissions - The known permissions of the comment we're updating
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'updateComment',
        value: function updateComment(_ref3) {
            var file = _ref3.file,
                commentId = _ref3.commentId,
                message = _ref3.message,
                permissions = _ref3.permissions,
                successCallback = _ref3.successCallback,
                errorCallback = _ref3.errorCallback;
            var _file$id2 = file.id,
                id = _file$id2 === undefined ? '' : _file$id2;


            try {
                this.checkApiCallValidity(PERMISSION_CAN_EDIT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            var requestData = {
                data: { message: message }
            };

            this.put(id, this.commentsUrl(commentId), requestData, successCallback, errorCallback);
        }

        /**
         * API for deleting a comment on a file
         *
         * @param {BoxItem} file - File object for which we are deleting a comment
         * @param {string} commentId - Id of the comment we are deleting
         * @param {BoxItemPermission} permissions - The known permissions of the comment we're deleting
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'deleteComment',
        value: function deleteComment(_ref4) {
            var file = _ref4.file,
                commentId = _ref4.commentId,
                permissions = _ref4.permissions,
                successCallback = _ref4.successCallback,
                errorCallback = _ref4.errorCallback;
            var _file$id3 = file.id,
                id = _file$id3 === undefined ? '' : _file$id3;


            try {
                this.checkApiCallValidity(PERMISSION_CAN_DELETE, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            this.delete(id, this.commentsUrl(commentId), successCallback, errorCallback);
        }
    }]);

    return Comments;
}(OffsetBasedAPI);

export default Comments;