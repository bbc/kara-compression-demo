'use strict';
const chalk = require('chalk');

const { executeCompression, executeDecompression } = require('./compressionRunner');
const { checkIntParam } = require('./paramHelper');

const EXECUTION_RETURN_ERROR_PARAMS = -1;
const EXECUTION_RETURN_SUCCESS = 0;

/**
 * Render a nice intro screen.  These are always important :)
 */
const showIntro = () => {
    const message = '   👋 Welcome to the Compression Kata! 👋   ';
    console.log(chalk.hex('#FFFF00')('*'.repeat(message.length)))
    console.log(chalk.hex('#FFFF00').bold(message))
    console.log(chalk.hex('#FFFF00')('*'.repeat(message.length)))
    console.log();
}

/**
 * Render a nice help screen.  These are even more important :)
 */
 const showHelp = message => {
    if (message) {
        console.log(`🔥 ${chalk.red.bold.underline(message)}
        `)
    }
    console.log(`ℹ️  ${chalk.green('Usage: ')} ${chalk.cyan.bold('node index.js')} ${chalk.cyan('-mode [compress|decompress] -input [filepath] -shades [2-16] -width [number] -height [number]')}`);
    console.log(`
        ${chalk.green('mode:\t')} ${chalk.cyan('compress or decompress - ')} ${chalk.white('States whether we want to compress or decompress our input')}
        ${chalk.green('input:\t')} ${chalk.cyan('file path - ')} ${chalk.white('Path to the input file')}
        ${chalk.green('shades:\t')} ${chalk.cyan('integer between 2-16 - ')} ${chalk.white('How many shades of grey should we be processing')}
        ${chalk.green('width:\t')} ${chalk.cyan('integer - ')} ${chalk.white('The pixel width of the input image')}
        ${chalk.green('height:\t')} ${chalk.cyan('integer - ')} ${chalk.white('The pixel height of the input image')}
    `);
    
}

/**
 * Parses the params and calls the appropriate compress/decompress runner
 * @param {dictionary} parsedArgs 
 * @returns Execution return code
 */
const parseAndExecute = (parsedArgs) => {

    if (!(parsedArgs.mode && parsedArgs.input && parsedArgs.shades && parsedArgs.width && parsedArgs.height)) {
        showHelp('All parameters are mandatory');
        console.log(JSON.stringify(parsedArgs));
        return EXECUTION_RETURN_ERROR_PARAMS;
    }

    //Check shades are correct
    const shadeCheck = checkIntParam(parsedArgs.shades, 2, 16);
    if (shadeCheck.valid) {
        //copy the value into our execution params
        parsedArgs.shades = shadeCheck.parsedValue
    } else {
        showHelp('The shades value must be a whole number between 2 and 16');
        return EXECUTION_RETURN_ERROR_PARAMS;
    }

    //Check width is correct
    const widthCheck = checkIntParam(parsedArgs.width, 1, 1000);
    if (widthCheck.valid) {
        //copy the value into our execution params
        parsedArgs.width = widthCheck.parsedValue
    } else {
        showHelp('The width value must be a whole number between 1 and 1000');
        return EXECUTION_RETURN_ERROR_PARAMS;
    }

    //Check height is correct
    const heightCheck = checkIntParam(parsedArgs.height, 1, 1000);
    if (heightCheck.valid) {
        //copy the value into our execution params
        parsedArgs.height = heightCheck.parsedValue
    } else {
        showHelp('The height value must be a whole number between 1 and 1000');
        return EXECUTION_RETURN_ERROR_PARAMS;
    }

    //Determine which mode we are in - compress / decompress
    switch (parsedArgs.mode?.toLowerCase()) {
        case 'compress':
            executeCompression(parsedArgs);
            break;
        case 'decompress':
            executeDecompression(parsedArgs);
            break;
        default:
            showHelp('The mode parameter must be one of compress or decompress');
            return EXECUTION_RETURN_ERROR_PARAMS;
    }
    return EXECUTION_RETURN_SUCCESS;
}

/**
 * This is where execution starts
 */
const main = (parsedArgs) => {
    console.log('parsed args', parsedArgs)
    showIntro();
    const executionReturnCode = parseAndExecute(parsedArgs);
    
    if (executionReturnCode !== EXECUTION_RETURN_SUCCESS) {
        //Exit with the error return code
        process.exit(executionReturnCode)
    }
    //Otherwise exit normally
}

module.exports = {
    main,
}
