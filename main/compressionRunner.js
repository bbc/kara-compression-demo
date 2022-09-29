const { compress, decompress } = require('./compressionEngine');
const { checkIntParam, checkFileParam } = require('./paramHelper');

/**
 * Compresses the image
 * @param {inputImage}
 * @returns compressed image as a string
 */
const executeCompression = (compressionParams) => {
    const compressedImageString = compress(compressionParams);

    console.log(compressedImageString);
}

const executeDecompression = (compressionParams) => {
    const uncompressedImageString = decompress(compressionParams);

    console.log(uncompressedImageString);
}

/**
 * Checks that the parameters are valid for compression
 * @param {*} params 
 * @returns object containing valid bool and string message
 */
const checkParamsForCompression = parsedArgs => {
    const returnCode = 0;

    if (!(parsedArgs.mode && parsedArgs.input && parsedArgs.shades)) {
        return { valid: false, message: 'Compression and Decompression require an input image and number of shades'}
    }

    //Check shades are correct
    const shadeCheck = checkIntParam(parsedArgs.shades, 2, 16);
    if (shadeCheck.valid) {
        //copy the value into our execution params
        parsedArgs.shades = shadeCheck.parsedValue
    } else {
        return { valid: false, message: 'The shades value must be a whole number between 2 and 16'}
    }

    //Check the file
    const fileCheck = checkFileParam(parsedArgs.input);
    if (fileCheck.valid) {
        //copy the value into our execution params
        parsedArgs.inputImage = fileCheck.contents
    } else {
        return { valid: false, message: 'The specified filename cannot be read'}
    }

    return { valid: true, message: ''}
}

module.exports = {
    executeCompression,
    executeDecompression,
    checkParamsForCompression
}
