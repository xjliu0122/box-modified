var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box Tasks API
 * @author Box
 */

import Base from './Base';
import { PERMISSION_CAN_COMMENT } from '../constants';

var Tasks = function (_Base) {
    _inherits(Tasks, _Base);

    function Tasks() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tasks);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tasks.__proto__ || Object.getPrototypeOf(Tasks)).call.apply(_ref, [this].concat(args))), _this), _this.successHandler = function (data) {
            if (_this.isDestroyed() || typeof _this.successCallback !== 'function') {
                return;
            }

            // There is no response data when deleting a task
            if (!data) {
                _this.successCallback();
                return;
            }

            // We don't have entries when updating/creating a task
            if (!data.entries) {
                _this.successCallback(_this.format(data));
                return;
            }

            var tasks = data.entries.map(_this.format);
            _this.successCallback(_extends({}, data, { entries: tasks }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tasks, [{
        key: 'getUrl',

        /**
         * API URL for tasks
         *
         * @param {string} [id] - a box file id
         * @return {string} base url for files
         */
        value: function getUrl(id) {
            if (!id) {
                throw new Error('Missing file id!');
            }
            return this.getBaseApiUrl() + '/files/' + id + '/tasks';
        }

        /**
         * API URL for tasks endpoint
         *
         * @param {string} [id] - A box task id
         * @return {string} base url for tasks
         */

    }, {
        key: 'tasksUrl',
        value: function tasksUrl(id) {
            var baseUrl = this.getBaseApiUrl() + '/tasks';
            return id ? baseUrl + '/' + id : baseUrl;
        }

        /**
         * Formats task data for use in components.
         *
         * @param {string} [id] - An individual task entry from the API
         * @return {Task} A task
         */

    }, {
        key: 'format',
        value: function format(task) {
            return _extends({}, task, {
                task_assignment_collection: task.task_assignment_collection.entries || []
            });
        }

        /**
         * Formats the tasks api response to usable data
         * @param {Object} data the api response data
         * @return {void}
         */

    }, {
        key: 'createTask',


        /**
         * API for creating a task on a file
         *
         * @param {BoxItem} file - File object for which we are creating a task
         * @param {string} message - Task message
         * @param {string} dueAt - Task due date
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */
        value: function createTask(_ref2) {
            var file = _ref2.file,
                message = _ref2.message,
                dueAt = _ref2.dueAt,
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
                    due_at: dueAt
                }
            };

            this.post(id, this.tasksUrl(), requestData, successCallback, errorCallback);
        }

        /**
         * API for updating a task on a file
         *
         * @param {BoxItem} file - File object for which we are creating a task
         * @param {string} taskId - Task to be edited
         * @param {string} message - Task message
         * @param {string} dueAt - Task due date
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'updateTask',
        value: function updateTask(_ref3) {
            var file = _ref3.file,
                taskId = _ref3.taskId,
                message = _ref3.message,
                dueAt = _ref3.dueAt,
                successCallback = _ref3.successCallback,
                errorCallback = _ref3.errorCallback;
            var _file$id2 = file.id,
                id = _file$id2 === undefined ? '' : _file$id2,
                permissions = file.permissions;


            try {
                // We don't know task_edit specific permissions, so let the client try and fail gracefully
                this.checkApiCallValidity(PERMISSION_CAN_COMMENT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            var data = { message: message };
            var requestData = { data: data };

            if (dueAt) {
                requestData.data.due_at = dueAt;
            }

            this.put(id, this.tasksUrl(taskId), requestData, successCallback, errorCallback);
        }

        /**
         * API for deleting a task on a file
         *
         * @param {BoxItem} file - File object for which we are deleting a task
         * @param {string} taskId - Id of the task we are deleting
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'deleteTask',
        value: function deleteTask(_ref4) {
            var file = _ref4.file,
                taskId = _ref4.taskId,
                successCallback = _ref4.successCallback,
                errorCallback = _ref4.errorCallback;
            var _file$id3 = file.id,
                id = _file$id3 === undefined ? '' : _file$id3,
                permissions = file.permissions;


            try {
                // We don't know task_delete specific permissions, so let the client try and fail gracefully
                this.checkApiCallValidity(PERMISSION_CAN_COMMENT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            this.delete(id, this.tasksUrl(taskId), successCallback, errorCallback);
        }
    }]);

    return Tasks;
}(Base);

export default Tasks;