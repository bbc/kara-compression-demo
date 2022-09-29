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

module.exports = {
    checkIntParam,
}
