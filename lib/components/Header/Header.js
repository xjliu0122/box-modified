/**
 * 
 * @file Header bar
 * @author Box
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import Logo from './Logo';
import messages from '../messages';
import { VIEW_FOLDER, VIEW_SEARCH } from '../../constants';

var Header = function Header(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        searchQuery = _ref.searchQuery,
        onSearch = _ref.onSearch,
        logoUrl = _ref.logoUrl,
        intl = _ref.intl;

    var search = function search(_ref2) {
        var currentTarget = _ref2.currentTarget;
        return onSearch(currentTarget.value);
    };
    var isFolder = view === VIEW_FOLDER;
    var isSearch = view === VIEW_SEARCH;
    return React.createElement(
        'div',
        { className: 'be-header' },
        React.createElement(Logo, { url: logoUrl, isSmall: isSmall }),
        React.createElement(
            'div',
            { className: 'be-search' },
            React.createElement('input', {
                type: 'search',
                disabled: !isFolder && !isSearch,
                placeholder: intl.formatMessage(messages.searchPlaceholder),
                value: searchQuery,
                onChange: search
            })
        )
    );
};

export default injectIntl(Header);