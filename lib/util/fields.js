var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 
 * @file Utility to combine API fields needed
 * @author Box
 */

import getProp from 'lodash/get';
import { FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_SIZE, FIELD_PARENT, FIELD_EXTENSION, FIELD_PERMISSIONS, FIELD_ITEM_COLLECTION, FIELD_ITEM_EXPIRATION, FIELD_PATH_COLLECTION, FIELD_MODIFIED_AT, FIELD_CREATED_AT, FIELD_SHARED_LINK, FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS, FIELD_HAS_COLLABORATIONS, FIELD_IS_EXTERNALLY_OWNED, FIELD_CREATED_BY, FIELD_MODIFIED_BY, FIELD_OWNED_BY, FIELD_DESCRIPTION, FIELD_REPRESENTATIONS, FIELD_SHA1, FIELD_WATERMARK_INFO, FIELD_AUTHENTICATED_DOWNLOAD_URL, FIELD_FILE_VERSION, FIELD_IS_DOWNLOAD_AVAILABLE, FIELD_VERSION_NUMBER, FIELD_METADATA_SKILLS, FIELD_METADATA_CLASSIFICATION, FIELD_TASK_ASSIGNMENT_COLLECTION, FIELD_IS_COMPLETED, FIELD_MESSAGE, FIELD_TAGGED_MESSAGE, FIELD_DUE_AT, FIELD_TRASHED_AT } from '../constants';

// Optional Box file fields
var BOX_ITEM_OPTIONAL_FIELDS = [FIELD_ITEM_COLLECTION];

// Minimum set of fields needed for Content Explorer / Picker
var BASE_FIELDS_TO_FETCH = [FIELD_ID, FIELD_NAME, FIELD_TYPE, FIELD_SIZE, FIELD_PARENT, FIELD_EXTENSION, FIELD_PERMISSIONS, FIELD_PATH_COLLECTION, FIELD_MODIFIED_AT, FIELD_CREATED_AT, FIELD_MODIFIED_BY, FIELD_SHARED_LINK, FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS, FIELD_HAS_COLLABORATIONS, FIELD_IS_EXTERNALLY_OWNED, FIELD_ITEM_COLLECTION];

// Additional fields needed for the sidebar
var SIDEBAR_FIELDS_TO_FETCH = [FIELD_CREATED_BY, FIELD_OWNED_BY, FIELD_DESCRIPTION, FIELD_METADATA_SKILLS, FIELD_ITEM_EXPIRATION, FIELD_METADATA_CLASSIFICATION, FIELD_VERSION_NUMBER];

// Additional fields needed for preview
var PREVIEW_FIELDS_TO_FETCH = [FIELD_REPRESENTATIONS, FIELD_SHA1, FIELD_WATERMARK_INFO, FIELD_AUTHENTICATED_DOWNLOAD_URL, FIELD_FILE_VERSION, FIELD_IS_DOWNLOAD_AVAILABLE];

// Fields needed to get tasks data
export var TASKS_FIELDS_TO_FETCH = [FIELD_TASK_ASSIGNMENT_COLLECTION, FIELD_IS_COMPLETED, FIELD_CREATED_AT, FIELD_CREATED_BY, FIELD_DUE_AT, FIELD_MESSAGE];

// Fields needed to get tasks data
export var VERSIONS_FIELDS_TO_FETCH = [FIELD_TRASHED_AT, FIELD_CREATED_AT, FIELD_MODIFIED_AT, FIELD_MODIFIED_BY];

// Fields needed to get tasks data
export var COMMENTS_FIELDS_TO_FETCH = [FIELD_TAGGED_MESSAGE, FIELD_MESSAGE, FIELD_CREATED_AT, FIELD_CREATED_BY, FIELD_MODIFIED_AT, FIELD_PERMISSIONS];

/**
 * Returns all the fields that can be fetched
 *
 * @return {Array<string>} list of fields with preview and sidebar
 */
function getFieldsIncludingPreviewSidebar() {
    return BASE_FIELDS_TO_FETCH.concat(SIDEBAR_FIELDS_TO_FETCH).concat(PREVIEW_FIELDS_TO_FETCH);
}

/**
 * Returns base fields and preview fields
 *
 * @return {Array<string>} list of fields with preview
 */
function getFieldsIncludingPreview() {
    return BASE_FIELDS_TO_FETCH.concat(PREVIEW_FIELDS_TO_FETCH);
}

/**
 * Returns fields needed for fetching
 *
 * @param {boolean|void} [includePreview] - Optionally include preview fields
 * @param {boolean|void} [includePreviewSidebar] - Optionally include preview and sidebar fields
 * @return {Array<string>} list of fields
 */
function getFields() {
    var includePreview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var includePreviewSidebar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var fields = BASE_FIELDS_TO_FETCH;
    if (includePreview && includePreviewSidebar) {
        // Only include sidebar fields if we are also including preview fields
        fields = getFieldsIncludingPreviewSidebar();
    } else if (includePreview) {
        // Preview may not have a sidebar
        fields = getFieldsIncludingPreview();
    }
    return fields;
}

/**
 * Returns fields needed for fetching
 *
 * @param {boolean|void} [includePreview] - Optionally include preview fields
 * @param {boolean|void} [includePreviewSidebar] - Optionally include preview and sidebar fields
 * @return {string} comma seperated list of fields
 */
export function getFieldsAsString() {
    var includePreview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var includePreviewSidebar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var fields = getFields(includePreview, includePreviewSidebar);
    return fields.join(',');
}

/**
 * Checks the fields needed for a box file
 *
 * @param {boolean|void} [includePreview] - Optionally include preview fields
 * @param {boolean|void} [includePreviewSidebar] - Optionally include preview and sidebar fields
 * @return {string} comma seperated list of fields
 */
export function isValidBoxFile(file) {
    var includePreview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var includePreviewSidebar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!file || (typeof file === 'undefined' ? 'undefined' : _typeof(file)) !== 'object') {
        return false;
    }
    var fields = getFields(includePreview, includePreviewSidebar).filter(function (field) {
        return BOX_ITEM_OPTIONAL_FIELDS.indexOf(field) < 0;
    });

    // Some fields like metadata have dots in it. Only use the root prop.
    return fields.every(function (field) {
        return typeof getProp(file, field.split('.')[0]) !== 'undefined';
    });
}