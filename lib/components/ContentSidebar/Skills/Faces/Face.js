/**
 * 
 * @file File Keywords SkillCard component
 * @author Box
 */

import * as React from 'react';
import classNames from 'classnames';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import IconClose from 'box-react-ui/lib/icons/general/IconClose';
import IconMinus from 'box-react-ui/lib/icons/general/IconMinus';
import { COLOR_999, COLOR_WHITE } from '../../../../constants';
import { SKILLS_TARGETS } from '../../../../interactionTargets';

var Face = function Face(_ref) {
    var face = _ref.face,
        selected = _ref.selected,
        isEditing = _ref.isEditing,
        onDelete = _ref.onDelete,
        onSelect = _ref.onSelect;

    var isAnyFaceSelected = !!selected;
    var isCurrentFaceSelected = face === selected;
    var isFaceSelected = isAnyFaceSelected && isCurrentFaceSelected && !isEditing;
    var faceClassName = classNames('be-face-wrapper', {
        'be-face-unselected': !isEditing && isAnyFaceSelected && !isCurrentFaceSelected
    });

    return React.createElement(
        'div',
        { className: faceClassName },
        React.createElement(
            PlainButton,
            {
                type: 'button',
                className: 'be-face',
                'data-resin-target': SKILLS_TARGETS.FACES.FACE,
                onClick: function onClick() {
                    return !isEditing && onSelect(face);
                }
            },
            React.createElement('img', { alt: face.text, title: face.text, src: face.image_url }),
            isFaceSelected && React.createElement(IconMinus, { color: COLOR_WHITE })
        ),
        isEditing && React.createElement(
            PlainButton,
            {
                type: 'button',
                className: 'be-face-delete',
                'data-resin-target': SKILLS_TARGETS.FACES.DELETE,
                onClick: function onClick() {
                    return onDelete(face);
                }
            },
            React.createElement(IconClose, { color: COLOR_999, width: 16, height: 16 })
        )
    );
};

export default Face;