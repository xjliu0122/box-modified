var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ItemTypes = {
    fileVersion: 'file_version',
    upload: 'upload'
}; /**
    * 
    * @file Activity feed utility methods
    */


export function collapseFeedState(feedState) {
    return feedState.reduce(function (collapsedFeedState, feedItem) {
        var previousFeedItem = collapsedFeedState.pop();

        if (!previousFeedItem) {
            return collapsedFeedState.concat([feedItem]);
        }

        if (feedItem.type === ItemTypes.fileVersion && previousFeedItem.type === ItemTypes.fileVersion && feedItem.action === ItemTypes.upload && previousFeedItem.action === ItemTypes.upload) {
            var prevModifiedBy = previousFeedItem.modified_by,
                _previousFeedItem$ver = previousFeedItem.versions,
                versions = _previousFeedItem$ver === undefined ? [previousFeedItem] : _previousFeedItem$ver,
                _previousFeedItem$ver2 = previousFeedItem.version_start,
                version_start = _previousFeedItem$ver2 === undefined ? previousFeedItem.version_number : _previousFeedItem$ver2,
                _previousFeedItem$ver3 = previousFeedItem.version_end,
                version_end = _previousFeedItem$ver3 === undefined ? previousFeedItem.version_number : _previousFeedItem$ver3;
            var action = feedItem.action,
                modified_by = feedItem.modified_by,
                created_at = feedItem.created_at,
                trashed_at = feedItem.trashed_at,
                id = feedItem.id,
                version_number = feedItem.version_number;

            var collaborators = previousFeedItem.collaborators || _defineProperty({}, prevModifiedBy.id, _extends({}, prevModifiedBy));

            // add collaborators
            collaborators[modified_by.id] = _extends({}, modified_by);

            return collapsedFeedState.concat([{
                action: action,
                collaborators: collaborators,
                created_at: created_at,
                modified_by: modified_by,
                trashed_at: trashed_at,
                id: id,
                type: ItemTypes.fileVersion,
                version_number: version_number,
                versions: versions.concat([feedItem]),
                version_start: Math.min(version_start, version_number),
                version_end: Math.max(version_end, version_number)
            }]);
        }

        return collapsedFeedState.concat([previousFeedItem, feedItem]);
    }, []);
}

export function shouldShowEmptyState(feedState) {
    return feedState.length === 0 || feedState.length === 1 && feedState[0].type === ItemTypes.fileVersion;
}