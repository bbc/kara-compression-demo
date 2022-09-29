const fs = require("fs");

/**
 * 
 * @param {string} intParam The value to check
 * @param {int} minValue The minimum allowable value
 * @param {int} maxValue The maximum allowable value
 * @returns 
 */
const checkIntParam = (intParam, minValue, maxValue) => {
    const intParamAsInt = parseInt(intParam);
    if (intParamAsInt < minValue || intParamAsInt > maxValue) {
        return { valid: false }
    } else {
        return { parsedValue: intParamAsInt, valid: true }
    }
}

/**
 * Checks the contents of the file at filePath can be read.  If so, returns the contents as a string
 * @param {string} filePath 
 * @returns Object containing valid boolean and the contents of the file
 */
const checkFileParam = filePath => {

    try {
        const buffer = fs.readFileSync(filePath);

        // use the toString() method to convert
        // Buffer into String
        const contents = buffer.toString();
        
        return { valid: true, contents};
    } catch (e) {
        return { valid: false };
    }
}

module.exports = {
    checkIntParam,
    checkFileParam,
}
