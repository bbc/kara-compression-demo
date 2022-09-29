const { generateCompressedField, checkPixelValueIsValidForShades } = require('./compressionHelper');

/**
 * Compresses the inputImage of shades according to comma separated run-length encoding
 * Returns a comma separated string
 * @param {dict} inputImage and shades 
 * @returns string
 */
const compress = ({inputImage, shades}) => {
    const compressedImage = [];
    const uncompressedImageArray = inputImage.split('');

    //First is always assumed to be pixel color 0
    if (shades === 2 && uncompressedImageArray[0] === "1") {
        compressedImage.push(0);
    }

    var lastPixel = uncompressedImageArray[0];
    var currentRun = 0;
    uncompressedImageArray.forEach(currentPixel => {
        //Check the pixel value is correct for the number of shades
        if (!checkPixelValueIsValidForShades(currentPixel, shades)) {
            throw `Invalid uncompressed image input - ${currentPixel} for shades ${shades}`;
        }

        if (currentPixel !== lastPixel) {
            compressedImage.push(generateCompressedField(shades, currentRun, lastPixel));
            currentRun = 0;
        }
        currentRun++;
        lastPixel = currentPixel;
    });
    //And the last one
    compressedImage.push(generateCompressedField(shades, currentRun, lastPixel));

    return compressedImage.join(',');
}

/**
 * Decompresses the input image of shades according to comma separated run-length encoding
 * @param {dict} inputImage and shades  
 * @returns string
 */
const decompress = ({inputImage, shades}) => {
    const uncompressedImage = [];

    const compressedImage = inputImage.split(',');
    const len = compressedImage.length;
    var currentColor = 0;
    var count = 0;
    for (var i = 0 ; i < len ; i++) {
        if (shades === 2) {
            //Check the input is in the range 0-f
            if (!/^([a-fA-F0-9])$/.test(compressedImage[i])) {
                throw `Invalid compressed input ${compressedImage[i]}`;
            }
            count = parseInt(compressedImage[i], 16)
            uncompressedImage.push(...(currentColor.toString().repeat(count).split('')));
            currentColor = currentColor ? 0 : 1;
        } else {
            currentColor = compressedImage[i].substring(0,1);
            count = parseInt(compressedImage[i].substring(1), 16);
            uncompressedImage.push(...(currentColor.toString().repeat(count).split('')));
        }
    }

    return uncompressedImage.join('');
}

module.exports = {
    compress,
    decompress,
}
