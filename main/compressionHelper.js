/**
 * Checks the pixelValue is within the range for the number of shades
 * @param {string} pixelValue 
 * @param {int} shades 
 * @returns boolean
 */
 const checkPixelValueIsValidForShades = (pixelValue, shades) => {
    //First check it is a valid number (0-f)
    if (!/^([a-fA-F0-9])$/.test(pixelValue)) {
        return false;
    }

    const pixelAsInt = parseInt(pixelValue, 16);
    const shadesAsInt = parseInt(shades);

    return pixelAsInt >= 0 && pixelAsInt < shadesAsInt;
}

/**
 * For 2 shades, returns the count field as hex
 * For >2 shades, returns the shade plus count as hex
 * @param {int} shades 
 * @param {int} count 
 * @param {int} pixel 
 * @returns string
 */
const generateCompressedField = (shades, count, pixel) => {
    if (shades === 2) {
        return `${count.toString(16)}`;
    } else {
        return `${pixel}${count.toString(16)}`;
    }
}

module.exports = {
    generateCompressedField,
    checkPixelValueIsValidForShades
}
