/**
 * 
 * @file Global constants
 * @author Box
 */

import Browser from './util/Browser';

/* ----------------------- Size ---------------------------- */
export var SIZE_SMALL = 'small';
export var SIZE_LARGE = 'large';
export var SIZE_MEDIUM = 'medium';

/* ----------------------- Views ---------------------------- */
export var VIEW_FOLDER = 'folder';
export var VIEW_SEARCH = 'search';
export var VIEW_SELECTED = 'selected';
export var VIEW_RECENTS = 'recents';
export var VIEW_ERROR = 'error';
export var VIEW_UPLOAD_EMPTY = 'upload-empty';
export var VIEW_UPLOAD_IN_PROGRESS = 'upload-inprogress';
export var VIEW_UPLOAD_SUCCESS = 'upload-success';

/* ----------------------- Types ---------------------------- */
export var TYPE_FOLDER = 'folder';
export var TYPE_FILE = 'file';
export var TYPE_WEBLINK = 'web_link';

/* -------------------- Typed Prefix-------------------------- */
export var TYPED_ID_FOLDER_PREFIX = 'folder_';
export var TYPED_ID_FILE_PREFIX = 'file_';
export var TYPED_ID_WEBLINK_PREFIX = 'web_link_';

/* ----------------- Cache Key Prefix ----------------------- */
export var CACHE_PREFIX_FOLDER = TYPED_ID_FOLDER_PREFIX;
export var CACHE_PREFIX_FILE = TYPED_ID_FILE_PREFIX;
export var CACHE_PREFIX_WEBLINK = TYPED_ID_WEBLINK_PREFIX;
export var CACHE_PREFIX_SEARCH = 'search_';
export var CACHE_PREFIX_RECENTS = 'recents_';

/* ----------------------- Sorts ---------------------------- */
export var SORT_ASC = 'ASC';
export var SORT_DESC = 'DESC';
export var SORT_NAME = 'name';
export var SORT_DATE = 'date';
export var SORT_SIZE = 'size';

/* -------------------- Shared access ----------------------- */
export var ACCESS_NONE = 'none';
export var ACCESS_OPEN = 'open';
export var ACCESS_COLLAB = 'collaborators';
export var ACCESS_COMPANY = 'company';

/* ----------------------- Headers -------------------------- */
export var HEADER_ACCEPT = 'Accept';
export var HEADER_CONTENT_TYPE = 'Content-Type';
export var HEADER_CLIENT_NAME = 'X-Box-Client-Name';
export var HEADER_CLIENT_VERSION = 'X-Box-Client-Version';

/* ------------------ Metadata  ---------------------- */
export var KEY_CLASSIFICATION = 'securityClassification-6VMVochwUWo';
export var KEY_CLASSIFICATION_TYPE = 'Box__Security__Classification__Key';

/* ----------------------- Fields --------------------------- */
export var FIELD_ID = 'id';
export var FIELD_NAME = 'name';
export var FIELD_TYPE = 'type';
export var FIELD_SIZE = 'size';
export var FIELD_PARENT = 'parent';
export var FIELD_EXTENSION = 'extension';
export var FIELD_ITEM_EXPIRATION = 'expires_at';
export var FIELD_PERMISSIONS = 'permissions';
export var FIELD_ITEM_COLLECTION = 'item_collection';
export var FIELD_PATH_COLLECTION = 'path_collection';
export var FIELD_MODIFIED_AT = 'modified_at';
export var FIELD_CREATED_AT = 'created_at';
export var FIELD_INTERACTED_AT = 'interacted_at';
export var FIELD_SHARED_LINK = 'shared_link';
export var FIELD_ALLOWED_SHARED_LINK_ACCESS_LEVELS = 'allowed_shared_link_access_levels';
export var FIELD_HAS_COLLABORATIONS = 'has_collaborations';
export var FIELD_IS_EXTERNALLY_OWNED = 'is_externally_owned';
export var FIELD_TOTAL_COUNT = 'total_count';
export var FIELD_ENTRIES = 'entries';
export var FIELD_DOWNLOAD_URL = 'download_url';
export var FIELD_ACCESS = 'access';
export var FIELD_URL = 'url';
export var FIELD_CREATED_BY = 'created_by';
export var FIELD_MODIFIED_BY = 'modified_by';
export var FIELD_OWNED_BY = 'owned_by';
export var FIELD_DESCRIPTION = 'description';
export var FIELD_REPRESENTATIONS = 'representations';
export var FIELD_SHA1 = 'sha1';
export var FIELD_WATERMARK_INFO = 'watermark_info';
export var FIELD_AUTHENTICATED_DOWNLOAD_URL = 'authenticated_download_url';
export var FIELD_FILE_VERSION = 'file_version';
export var FIELD_IS_DOWNLOAD_AVAILABLE = 'is_download_available';
export var FIELD_VERSION_NUMBER = 'version_number';
export var FIELD_METADATA_SKILLS = 'metadata.global.boxSkillsCards';
export var FIELD_METADATA_CLASSIFICATION = 'metadata.enterprise.' + KEY_CLASSIFICATION;
export var FIELD_DUE_AT = 'due_at';
export var FIELD_TASK_ASSIGNMENT_COLLECTION = 'task_assignment_collection';
export var FIELD_IS_COMPLETED = 'is_completed';
export var FIELD_MESSAGE = 'message';
export var FIELD_TAGGED_MESSAGE = 'tagged_message';
export var FIELD_TRASHED_AT = 'trashed_at';
export var METADATA_SKILLS = 'metadata.global.boxSkillsCards';
export var METADATA_CLASSIFICATION = 'metadata.enterprise.securityClassification-6VMVochwUWo';

/* ----------------------- Permissions --------------------------- */
export var PERMISSION_CAN_PREVIEW = 'can_preview';
export var PERMISSION_CAN_RENAME = 'can_rename';
export var PERMISSION_CAN_DOWNLOAD = 'can_download';
export var PERMISSION_CAN_DELETE = 'can_delete';
export var PERMISSION_CAN_UPLOAD = 'can_upload';
export var PERMISSION_CAN_SHARE = 'can_share';
export var PERMISSION_CAN_SET_SHARE_ACCESS = 'can_set_share_access';
export var PERMISSION_CAN_COMMENT = 'can_comment';
export var PERMISSION_CAN_EDIT = 'can_edit';

/* ------------- Delimiters for bread crumbs ---------------- */
export var DELIMITER_SLASH = 'slash';
export var DELIMITER_CARET = 'caret';

/* ---------------------- Defaults -------------------------- */
export var DEFAULT_PREVIEW_VERSION = '1.44.0';
export var DEFAULT_PREVIEW_LOCALE = 'en-US';
export var DEFAULT_PATH_STATIC = 'platform/elements';
export var DEFAULT_PATH_STATIC_PREVIEW = 'platform/preview';
export var DEFAULT_HOSTNAME_API = 'https://api.box.com';
export var DEFAULT_HOSTNAME_STATIC = 'https://cdn01.boxcdn.net';
export var DEFAULT_HOSTNAME_UPLOAD = 'https://upload.box.com';
export var DEFAULT_HOSTNAME_APP = 'https://app.box.com';
export var DEFAULT_CONTAINER = 'body';
export var DEFAULT_ROOT = '0';
export var DEFAULT_SEARCH_DEBOUNCE = 500;
export var DEFAULT_COLLAB_DEBOUNCE = 500;
export var DEFAULT_MAX_COLLABORATORS = 5;
export var DEFAULT_VIEW_FILES = 'files';
export var DEFAULT_VIEW_RECENTS = 'recents';
export var CLIENT_NAME_CONTENT_TREE = 'ContentTree';
export var CLIENT_NAME_CONTENT_PICKER = 'ContentPicker';
export var CLIENT_NAME_FILE_PICKER = 'FilePicker';
export var CLIENT_NAME_FOLDER_PICKER = 'FolderPicker';
export var CLIENT_NAME_CONTENT_UPLOADER = 'ContentUploader';
export var CLIENT_NAME_CONTENT_EXPLORER = 'ContentExplorer';
export var CLIENT_NAME_CONTENT_PREVIEW = 'ContentPreview';
export var CLIENT_NAME_CONTENT_SIDEBAR = 'ContentSidebar';

/* ---------------------- Statuses  -------------------------- */
export var STATUS_PENDING = 'pending';
export var STATUS_IN_PROGRESS = 'inprogress';
export var STATUS_COMPLETE = 'complete';
export var STATUS_ERROR = 'error';

/* ------------------- Styles ------------------------ */
export var CLASS_MODAL_CONTENT = 'be-modal-dialog-content';
export var CLASS_MODAL_CONTENT_FULL_BLEED = 'be-modal-dialog-content-full-bleed';
export var CLASS_MODAL_OVERLAY = 'be-modal-dialog-overlay';
export var CLASS_IS_SMALL = 'be-is-small';
export var CLASS_IS_MEDIUM = 'be-is-medium';
export var CLASS_IS_TOUCH = 'be-is-touch';
export var CLASS_MODAL = 'be-modal';

/* ------------------ Error Codes  ---------------------- */
export var ERROR_CODE_ITEM_NAME_INVALID = 'item_name_invalid';
export var ERROR_CODE_ITEM_NAME_TOO_LONG = 'item_name_too_long';
export var ERROR_CODE_ITEM_NAME_IN_USE = 'item_name_in_use';
export var ERROR_CODE_UPLOAD_FILE_LIMIT = 'upload_file_limit';

/* ------------- Representation Hints  ------------------- */
var X_REP_HINT_BASE = '[3d][pdf][text][mp3]';
var X_REP_HINT_DOC_THUMBNAIL = '[jpg?dimensions=1024x1024&paged=false]';
var X_REP_HINT_IMAGE = '[jpg?dimensions=2048x2048,png?dimensions=2048x2048]';
var X_REP_HINT_VIDEO_DASH = '[dash,mp4][filmstrip]';
var X_REP_HINT_VIDEO_MP4 = '[mp4]';
var videoHint = Browser.canPlayDash() ? X_REP_HINT_VIDEO_DASH : X_REP_HINT_VIDEO_MP4;
export var X_REP_HINTS = '' + X_REP_HINT_BASE + X_REP_HINT_DOC_THUMBNAIL + X_REP_HINT_IMAGE + videoHint;

/* ------------------ Uploader  ---------------------- */
export var DEFAULT_RETRY_DELAY_MS = 3000;
export var MS_IN_S = 1000;

/* ------------------ Colors  ---------------------- */
export var COLOR_BOX_BLUE = '#0061d5';
export var COLOR_BOX_BLUE_LIGHT = '#dbe8f8';
export var COLOR_RED = '#c82341';
export var COLOR_999 = '#999';
export var COLOR_WHITE = '#fff';

/* ------------------ Skills  ---------------------- */
export var SKILLS_TRANSCRIPT = 'transcript';
export var SKILLS_KEYWORD = 'keyword';
export var SKILLS_TIMELINE = 'timeline';
export var SKILLS_FACE = 'face';
export var SKILLS_STATUS = 'status';
export var SKILLS_INTERNAL_SERVER_ERROR = 'skills_internal_server_error';
export var SKILLS_UNKNOWN_ERROR = 'skills_unknown_error';
export var SKILLS_INVALID_FILE_SIZE = 'skills_invalid_file_size_error';
export var SKILLS_INVALID_FILE_FORMAT = 'skills_invalid_file_format_error';
export var SKILLS_NO_INFO_FOUND = 'skills_no_info_found_error';
export var SKILLS_PENDING = 'skills_pending_status';

/* ------------------ File Extensions  ---------------------- */
export var FILE_EXTENSION_BOX_NOTE = 'boxnote';

/* ------------------ Sidebar View  ---------------------- */
export var SIDEBAR_VIEW_SKILLS = 'skills';
export var SIDEBAR_VIEW_DETAILS = 'details';
export var SIDEBAR_VIEW_METADATA = 'metadata';
export var SIDEBAR_VIEW_ACTIVITY = 'activity';

/* ------------------ HTTP Requests  ---------------------- */
export var HTTP_GET = 'get';
export var HTTP_POST = 'post';
export var HTTP_PUT = 'put';
export var HTTP_DELETE = 'delete';
export var HTTP_OPTIONS = 'options';
export var HTTP_HEAD = 'head';