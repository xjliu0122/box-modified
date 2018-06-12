/**
 * 
 * @file Helper for throwing errors
 * @author Box
 */

export function getBadItemError() {
    return new Error('Bad box item!');
}

export function getBadPermissionsError() {
    return new Error('Insufficient Permissions!');
}