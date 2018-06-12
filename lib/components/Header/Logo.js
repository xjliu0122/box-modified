/**
 * 
 * @file Logo for the header
 * @author Box
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import IconLogo from 'box-react-ui/lib/icons/general/IconLogo';
import messages from '../messages';


function getLogo(isSmall, url) {
    if (url === 'box') {
        return React.createElement(IconLogo, null);
    } else if (typeof url === 'string') {
        return React.createElement('img', { alt: '', src: url, className: 'be-logo-custom' });
    }
    return React.createElement(
        'div',
        { className: 'be-logo-placeholder' },
        React.createElement(FormattedMessage, messages.logo)
    );
}

var Logo = function Logo(_ref) {
    var url = _ref.url,
        isSmall = _ref.isSmall;
    return React.createElement(
        'div',
        { className: 'be-logo' },
        getLogo(isSmall, url)
    );
};

export default Logo;