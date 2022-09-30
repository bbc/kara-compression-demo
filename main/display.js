const { checkIntParam, checkFileParam } = require('./paramHelper');
const chalk = require('chalk');

/**
 * Display to the screen the image represented by comma separated string,
 * with dimensions width x height.
 * @param {string} image 
 * @param {int} width 
 * @param {int} height 
 */
const executePrintImage = ({inputImage, width, height, shades}) => {
    
    var imageArray = inputImage.split('');

    var pos = 0;
    for (var y = 0 ; y < height ; y++) {
        for (var x = 0 ; x < width ; x++) {
            const pixelColor = shadeToRgb(imageArray[pos++], shades);
            process.stdout.write(chalk.hex(pixelColor)('█'));
        }
        console.log();
    }
}

/**
 * Turns a shade into an html hex color string
 * @param {int between 1 and 16} shade 
 * @returns An html hex color string (including #)
 */
const shadeToRgb = (pixelColor, shades) => {
    const inputAsInt = parseInt(pixelColor, 16);
    
    const greyProportion = inputAsInt / (shades-1);
    
    const greyHex = Math.floor(0xFF * greyProportion).toString(16).padStart(2, '0');
    
    const colourForCell = `#${greyHex}${greyHex}${greyHex}`
    
    return colourForCell;
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
    forTest: {
        shadeToRgb,
    },
    executePrintImage,
    checkParamsForDisplay
}
