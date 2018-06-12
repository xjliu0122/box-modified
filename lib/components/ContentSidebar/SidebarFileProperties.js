function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 
 * @file Sidebar file properties component
 * @author Box
 */

import React from 'react';
import getProp from 'lodash/get';
import { injectIntl } from 'react-intl';
import ItemProperties from 'box-react-ui/lib/features/item-details/ItemProperties';
import getFileSize from 'box-react-ui/lib/utils/getFileSize';
import withErrorHandling from './withErrorHandling';

import { FIELD_METADATA_CLASSIFICATION, KEY_CLASSIFICATION_TYPE } from '../../constants';
import { INTERACTION_TARGET, DETAILS_TARGETS } from '../../interactionTargets';

var SidebarFileProperties = function SidebarFileProperties(_ref) {
    var file = _ref.file,
        onDescriptionChange = _ref.onDescriptionChange,
        hasClassification = _ref.hasClassification,
        onClassificationClick = _ref.onClassificationClick,
        intl = _ref.intl;

    var value = getProp(file, FIELD_METADATA_CLASSIFICATION + '.' + KEY_CLASSIFICATION_TYPE);

    return React.createElement(ItemProperties, {
        createdAt: file.created_at,
        description: file.description,
        modifiedAt: file.modified_at,
        owner: getProp(file, 'owned_by.name'),
        size: getFileSize(file.size, intl.locale),
        uploader: getProp(file, 'created_by.name'),
        onDescriptionChange: getProp(file, 'permissions.can_rename') ? onDescriptionChange : undefined,
        descriptionTextareaProps: _defineProperty({}, INTERACTION_TARGET, DETAILS_TARGETS.DESCRIPTION),
        classificationProps: hasClassification ? _defineProperty({
            openModal: onClassificationClick,
            value: value
        }, INTERACTION_TARGET, value ? DETAILS_TARGETS.CLASSIFICATION_EDIT : DETAILS_TARGETS.CLASSIFICATION_ADD) : {}
    });
};

export { SidebarFileProperties as SidebarFilePropertiesComponent };
export default injectIntl(withErrorHandling(SidebarFileProperties));