/**
 * 
 * @file File for some simple dom utilities
 * @author Box
 */

/**
 * Checks if an html element is some type of input-able
 * element or text area type where characters can be typed.
 *
 * @param {HTMLElement|null} element - the dom element to check
 * @return {boolean} true if its one of the above elements
 */
export function isInputElement(element) {
    if (!element || !(element instanceof HTMLElement)) {
        return false;
    }
    var tag = element.tagName.toLowerCase();
    return tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'div' && !!element.getAttribute('contenteditable');
}

/**
 * Checks if an html element is some kind of element
 * that the user would want to keep their focus on.
 *
 * @param {HTMLElement|null} element - the dom element to check
 * @return {boolean} true if its one of the above elements
 */
export function isFocusableElement(element) {
    if (!element || !(element instanceof HTMLElement)) {
        return false;
    }
    var tag = element.tagName.toLowerCase();

    // Box React UI sensitive checks
    var isCheckbox = element.classList.contains('checkbox-pointer-target') || (element.parentElement instanceof HTMLElement ? element.parentElement.classList.contains('checkbox-label') : false);

    var isButton = element.classList.contains('btn-content') || (element.parentElement instanceof HTMLElement ? element.parentElement.classList.contains('btn') : false);

    return isInputElement(element) || tag === 'button' || tag === 'a' || tag === 'option' || isCheckbox || isButton;
}

/**
 * Focuses a DOM element if it exists.
 *
 * @param {HTMLElement} root - the root dom element to search
 * @param {string} selector - the query selector
 * @param {boolean|void} [focusRoot] - if root should be focused
 * @return {void}
 */
export function focus(root, selector) {
    var focusRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!root) {
        return;
    }
    if (!selector) {
        root.focus();
        return;
    }
    var element = root.querySelector(selector);
    if (element && typeof element.focus === 'function') {
        element.focus();
    } else if (focusRoot) {
        root.focus();
    }
}