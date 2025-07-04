"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFullName = formatFullName;
function formatFullName(fullName) {
    if (!fullName) {
        return '';
    }
    const lowerCaseName = fullName.toLowerCase();
    const words = lowerCaseName.split(' ');
    const formattedWords = words.map(word => {
        if (word.length <= 2) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formattedWords.join(' ');
}
//# sourceMappingURL=string.utils.js.map