var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * @file Helper for the box Task Assignments API
 * @author Box
 */

import Base from './Base';
import { PERMISSION_CAN_COMMENT } from '../constants';

var TaskAssignments = function (_Base) {
    _inherits(TaskAssignments, _Base);

    function TaskAssignments() {
        _classCallCheck(this, TaskAssignments);

        return _possibleConstructorReturn(this, (TaskAssignments.__proto__ || Object.getPrototypeOf(TaskAssignments)).apply(this, arguments));
    }

    _createClass(TaskAssignments, [{
        key: 'getUrl',

        /**
         * API URL for task assignments. Getting a list of assignments "/tasks/id/assignments" does not give us the fields
         * we need. So instead we will only perform GET operations on an assignment by assignment basis,
         * and other endpoints will use the GET URL.
         *
         * @param {string} id - a box task assignment ID
         * @return {string} base url for task assignments
         */
        value: function getUrl(id) {
            var baseUrl = this.getBaseApiUrl() + '/task_assignments';
            return id ? baseUrl + '/' + id : baseUrl;
        }

        /**
         * API for creating a task assignment on a file
         *
         * @param {BoxItem} file - File object that contains the task we are assigning to
         * @param {string} taskId - Task id that we are adding an assignment to
         * @param {Object} assignTo - Object containing task assignee
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'createTaskAssignment',
        value: function createTaskAssignment(_ref) {
            var file = _ref.file,
                taskId = _ref.taskId,
                assignTo = _ref.assignTo,
                successCallback = _ref.successCallback,
                errorCallback = _ref.errorCallback;
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
                    task: {
                        type: 'task',
                        id: taskId
                    },
                    assign_to: assignTo
                }
            };

            this.post(id, this.getUrl(), requestData, successCallback, errorCallback);
        }

        /**
         * API for updating a task assignment on a file
         *
         * @param {BoxItem} file - File object for which we are updating a task assignment
         * @param {string} taskAssignmentId - Task assignment to be edited
         * @param {string} resolutionStatus - The updated task assignment status
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'updateTaskAssignment',
        value: function updateTaskAssignment(_ref2) {
            var file = _ref2.file,
                taskAssignmentId = _ref2.taskAssignmentId,
                resolutionStatus = _ref2.resolutionStatus,
                successCallback = _ref2.successCallback,
                errorCallback = _ref2.errorCallback;
            var _file$id2 = file.id,
                id = _file$id2 === undefined ? '' : _file$id2,
                permissions = file.permissions;


            try {
                // We don't know task_assignment_edit specific permissions, so let the client try and fail gracefully
                this.checkApiCallValidity(PERMISSION_CAN_COMMENT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            var requestData = {
                data: { resolution_status: resolutionStatus }
            };

            this.put(id, this.getUrl(taskAssignmentId), requestData, successCallback, errorCallback);
        }

        /**
         * API for deleting a task assignment on a file
         *
         * @param {BoxItem} file - File object for which we are deleting a task assignment
         * @param {string} taskAssignmentId - Id of the task assignment we are deleting
         * @param {Function} successCallback - Success callback
         * @param {Function} errorCallback - Error callback
         * @return {void}
         */

    }, {
        key: 'deleteTaskAssignment',
        value: function deleteTaskAssignment(_ref3) {
            var file = _ref3.file,
                taskAssignmentId = _ref3.taskAssignmentId,
                successCallback = _ref3.successCallback,
                errorCallback = _ref3.errorCallback;
            var _file$id3 = file.id,
                id = _file$id3 === undefined ? '' : _file$id3,
                permissions = file.permissions;


            try {
                // We don't know task_assignment_delete specific permissions, so let the client try and fail gracefully
                this.checkApiCallValidity(PERMISSION_CAN_COMMENT, permissions, id);
            } catch (e) {
                errorCallback(e);
                return;
            }

            this.delete(id, this.getUrl(taskAssignmentId), successCallback, errorCallback);
        }
    }]);

    return TaskAssignments;
}(Base);

export default TaskAssignments;