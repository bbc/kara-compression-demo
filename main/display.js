const { checkIntParam, checkFileParam } = require('./paramHelper');

/**
 * Display to the screen the image represented by comma separated string,
 * with dimensions width x height.
 * @param {string} image 
 * @param {int} width 
 * @param {int} height 
 */
const executePrintImage = ({inputImage, width, height}) => {
    console.log('display todo')
    //TODO
    console.log(inputImage.length);
}

/**
 * Turns a shade into an html hex color string
 * @param {int between 1 and 16} shade 
 * @returns An html hex color string (including #)
 */
const shadeToRgb = shade => {
    //TODO
    return '#AAAAAA';
}

/**
 * Checks that the parameters are valid for display mode
 * @param {*} params 
 * @returns object containing valid bool and string message
 */
const checkParamsForDisplay = parsedArgs => {
    if (!(parsedArgs.mode && parsedArgs.input && parsedArgs.shades && parsedArgs.width && parsedArgs.height)) {
        return { valid: false, message: 'All parameters are mandatory'}
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
    forTest: {
        shadeToRgb,
    },
    executePrintImage,
    checkParamsForDisplay
}
