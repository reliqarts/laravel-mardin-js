/**
 * Mardin Utility functions.
 */

// trim string
export var trimString = (string, length) => {
    length = length || 200;
    return string.length > length ? string.substring(0, length - 3) + '...' : string;
};
