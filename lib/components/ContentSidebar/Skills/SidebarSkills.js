/**
 * 
 * @file Details sidebar component
 * @author Box
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import getProp from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import messages from '../../messages';
import SidebarSection from '../SidebarSection';
import { isValidSkillsCard } from './skillUtils';
import SidebarSkillsCard from './SidebarSkillsCard';
import { SKILLS_TARGETS } from '../../../interactionTargets';
import { SKILLS_TRANSCRIPT, SKILLS_KEYWORD, SKILLS_TIMELINE, SKILLS_FACE, SKILLS_STATUS, SKILLS_UNKNOWN_ERROR } from '../../../constants';

/**
 * Get ths skill interaction target based on card type
 *
 * @param {Object} card - skill card
 * @return {string} - interaction target
 */
var getCardInteractionTarget = function getCardInteractionTarget(_ref) {
    var skill_card_type = _ref.skill_card_type;

    switch (skill_card_type) {
        case SKILLS_KEYWORD:
            return SKILLS_TARGETS.KEYWORDS.CARD;
        case SKILLS_FACE:
        case SKILLS_TIMELINE:
            return SKILLS_TARGETS.FACES.CARD;
        case SKILLS_TRANSCRIPT:
            return SKILLS_TARGETS.TRANSCRIPTS.CARD;
        default:
            return '';
    }
};

/**
 * Get ths string skill title based on card title
 *
 * @param {Object} card - skill card
 * @return {string} - skill title
 */
var getCardTitle = function getCardTitle(_ref2) {
    var skill_card_type = _ref2.skill_card_type,
        _ref2$skill_card_titl = _ref2.skill_card_title,
        skill_card_title = _ref2$skill_card_titl === undefined ? {} : _ref2$skill_card_titl;
    var code = skill_card_title.code,
        message = skill_card_title.message;

    var defaultKey = skill_card_type + 'Skill';
    var defaultMessage = messages[defaultKey] || messages.defaultSkill;

    switch (code) {
        case 'skills_faces':
            return React.createElement(FormattedMessage, messages.faceSkill);
        case 'skills_transcript':
            return React.createElement(FormattedMessage, messages.transcriptSkill);
        case 'skills_topics':
            return React.createElement(FormattedMessage, messages.keywordSkill);
        case 'skills_status':
            return React.createElement(FormattedMessage, messages.statusSkill);
        case 'skills_error':
            return React.createElement(FormattedMessage, messages.errorSkill);
        default:
            return message || React.createElement(FormattedMessage, defaultMessage);
    }
};

var SidebarSkills = function SidebarSkills(_ref3) {
    var file = _ref3.file,
        getPreviewer = _ref3.getPreviewer,
        onSkillChange = _ref3.onSkillChange;

    var _getProp = getProp(file, 'metadata.global.boxSkillsCards', []),
        cards = _getProp.cards;

    var _file$permissions = file.permissions,
        permissions = _file$permissions === undefined ? {} : _file$permissions;

    var isSkillEditable = !!permissions.can_upload;

    return cards.map(function (card, index) {
        if (card.error && !card.status) {
            card.skill_card_type = SKILLS_STATUS;
            card.status = {
                code: SKILLS_UNKNOWN_ERROR
            };
            delete card.error;
        }

        var id = card.id;

        var cardId = id || uniqueId('card_');
        var isValid = isValidSkillsCard(file, card);
        var interactionTarget = getCardInteractionTarget(card);
        var title = getCardTitle(card);
        var hasEntries = Array.isArray(card.entries) ? card.entries.length > 0 : isValid;

        return isValid ? React.createElement(
            SidebarSection,
            { key: cardId, isOpen: hasEntries, interactionTarget: interactionTarget, title: title },
            React.createElement(SidebarSkillsCard, {
                card: card,
                cards: cards,
                isEditable: isSkillEditable,
                getPreviewer: getPreviewer,
                onSkillChange: function (_onSkillChange) {
                    function onSkillChange() {
                        return _onSkillChange.apply(this, arguments);
                    }

                    onSkillChange.toString = function () {
                        return _onSkillChange.toString();
                    };

                    return onSkillChange;
                }(function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return onSkillChange.apply(undefined, [index].concat(args));
                })
            })
        ) : null;
    });
};

export default SidebarSkills;