function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file withErrorHandling higher order component
 * @author Box
 */

import * as React from 'react';
import ErrorMask from 'box-react-ui/lib/components/error-mask/ErrorMask';
import InlineError from 'box-react-ui/lib/components/inline-error/InlineError';
import { FormattedMessage } from 'react-intl';

var withErrorHandling = function withErrorHandling(WrappedComponent) {
    return function (_ref) {
        var maskError = _ref.maskError,
            inlineError = _ref.inlineError,
            errorCode = _ref.errorCode,
            rest = _objectWithoutProperties(_ref, ['maskError', 'inlineError', 'errorCode']);

        if (maskError) {
            return React.createElement(ErrorMask, {
                errorHeader: React.createElement(FormattedMessage, maskError.errorHeader),
                errorSubHeader: maskError.errorSubHeader ? React.createElement(FormattedMessage, maskError.errorSubHeader) : undefined
            });
        } else if (inlineError) {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    InlineError,
                    { title: React.createElement(FormattedMessage, inlineError.title) },
                    React.createElement(FormattedMessage, inlineError.content)
                ),
                React.createElement(WrappedComponent, rest)
            );
        }
        return React.createElement(WrappedComponent, rest);
    };
};

export default withErrorHandling;