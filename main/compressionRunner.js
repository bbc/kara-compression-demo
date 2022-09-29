const { checkIntParam, checkFileParam } = require('./paramHelper');

const executeCompression = ({input, shades, width, height}) => {
    console.log('compression todo');
    //TODO
    return '';
}

const executeDecompression = ({input, shades, width, height}) => {
    console.log('decompression todo');
    //TODO
    return '';
}

/**
 * Checks that the parameters are valid for compression
 * @param {*} params 
 * @returns object containing valid bool and string message
 */
const checkParamsForCompression = parsedArgs => {
    const returnCode = 0;

    if (!(parsedArgs.mode && parsedArgs.input && parsedArgs.shades && parsedArgs.width && parsedArgs.height)) {
        return { valid: false, message: 'All parameters are mandatory'}
    }

    //Check shades are correct
    const shadeCheck = checkIntParam(parsedArgs.shades, 2, 16);
    if (shadeCheck.valid) {
        //copy the value into our execution params
        parsedArgs.shades = shadeCheck.parsedValue
    } else {
        return { valid: false, message: 'The shades value must be a whole number between 2 and 16'}
    }

    //Check width is correct
    const widthCheck = checkIntParam(parsedArgs.width, 1, 1000);
    if (widthCheck.valid) {
        //copy the value into our execution params
        parsedArgs.width = widthCheck.parsedValue
    } else {
        return { valid: false, message: 'The width value must be a whole number between 1 and 1000'}
    }

    //Check height is correct
    const heightCheck = checkIntParam(parsedArgs.height, 1, 1000);
    if (heightCheck.valid) {
        //copy the value into our execution params
        parsedArgs.height = heightCheck.parsedValue
    } else {
        return { valid: false, message: 'The height value must be a whole number between 1 and 1000'}
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
