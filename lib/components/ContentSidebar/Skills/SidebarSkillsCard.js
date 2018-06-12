/**
 * 
 * @file Skills card component
 * @author Box
 */

import React from 'react';
import Status from './Status';
import Transcript from './Transcript';
import Keywords from './Keywords';
import Faces from './Faces';
import { SKILLS_TRANSCRIPT, SKILLS_KEYWORD, SKILLS_TIMELINE, SKILLS_FACE, SKILLS_STATUS } from '../../../constants';

var SidebarSkillsCard = function SidebarSkillsCard(_ref) {
    var card = _ref.card,
        cards = _ref.cards,
        isEditable = _ref.isEditable,
        onSkillChange = _ref.onSkillChange,
        getPreviewer = _ref.getPreviewer;

    switch (card.skill_card_type) {
        case SKILLS_KEYWORD:
            return React.createElement(Keywords, {
                card: card,
                transcript: isEditable ? cards.find(function (_ref2) {
                    var skill_card_type = _ref2.skill_card_type;
                    return skill_card_type === SKILLS_TRANSCRIPT;
                }) : undefined,
                isEditable: isEditable,
                getPreviewer: getPreviewer,
                onSkillChange: onSkillChange
            });
        case SKILLS_TIMELINE:
        case SKILLS_FACE:
            return React.createElement(Faces, { card: card, isEditable: isEditable, getPreviewer: getPreviewer, onSkillChange: onSkillChange });
        case SKILLS_TRANSCRIPT:
            return React.createElement(Transcript, {
                card: card,
                getPreviewer: getPreviewer,
                isEditable: isEditable,
                onSkillChange: onSkillChange
            });
        case SKILLS_STATUS:
            return React.createElement(Status, { card: card });
        default:
            return null;
    }
};

export default SidebarSkillsCard;