/**
 * 
 * @file Function to sort the item list
 * @author Box
 */

import comparator from './comparator';
import { getBadItemError } from './error';

function isSortingNeeded(order, sortBy, sortDirection) {
    return !Array.isArray(order) || !order.some(function (entry) {
        return entry.by === sortBy && entry.direction === sortDirection;
    });
}

/**
 * Sorts items in place
 *
 * @param {Object} item box item object
 * @param {string} sortBy sort by field
 * @param {string} sortDirection the sort direction
 * @param {Cache} cache item cache
 * @return {void}
 */
export default function (item, sortBy, sortDirection, cache) {
    var item_collection = item.item_collection;

    if (!item_collection) {
        throw getBadItemError();
    }

    var entries = item_collection.entries,
        order = item_collection.order;

    if (!Array.isArray(entries)) {
        throw getBadItemError();
    }

    if (isSortingNeeded(order, sortBy, sortDirection)) {
        entries.sort(comparator(sortBy, sortDirection, cache));
        item_collection.order = [{
            by: sortBy,
            direction: sortDirection
        }];
    }
    return item;
}