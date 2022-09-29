'use strict';
const chalk = require('chalk');

const { executeCompression, executeDecompression, checkParamsForCompression } = require('./compressionRunner');
const { executePrintImage, checkParamsForDisplay } = require('./display');

const EXECUTION_RETURN_ERROR_PARAMS = -1;
const EXECUTION_RETURN_SUCCESS = 0;

/**
 * Render a nice help screen.
 */
 const showHelp = errorMessage => {
    const welcomeMessage = '   👋 Welcome to the Compression Kata! 👋   ';
    console.log();
    console.log(chalk.hex('#FFFF00')('*'.repeat(welcomeMessage.length)))
    console.log(chalk.hex('#FFFF00').bold(welcomeMessage))
    console.log(chalk.hex('#FFFF00')('*'.repeat(welcomeMessage.length)))
    console.log();

    if (errorMessage) {
        console.log(`🔥 ${chalk.red.bold.underline(errorMessage)}
        `)
    }
    console.log(`ℹ️  ${chalk.green('Usage: ')} ${chalk.cyan.bold('node index.js')} ${chalk.cyan('-mode [compress|decompress] -input [filepath] -shades [2-16] -width [number] -height [number]')}`);
    console.log(`
        ${chalk.green('mode:\t')} ${chalk.cyan('compress, decompress, or display - ')} ${chalk.white('States whether we want to compress or decompress our input')}
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

    //Determine which mode we are in - compress / decompress
    switch (parsedArgs.mode?.toLowerCase()) {
        case 'compress':
            const compressionParamsValid = checkParamsForCompression(parsedArgs);
            if (!compressionParamsValid.valid) {
                showHelp(compressionParamsValid.message);
                return EXECUTION_RETURN_ERROR_PARAMS;
            }
            executeCompression(parsedArgs);
            break;
        case 'decompress':
            const decompressionParamsValid = checkParamsForCompression(parsedArgs);
            if (!decompressionParamsValid.valid) {
                showHelp(decompressionParamsValid.message);
                return EXECUTION_RETURN_ERROR_PARAMS;
            }
            executeDecompression(parsedArgs);
            break;
        case 'display':
            const displayParamsValid = checkParamsForDisplay(parsedArgs);
            if (!displayParamsValid.valid) {
                showHelp(displayParamsValid.message);
                return EXECUTION_RETURN_ERROR_PARAMS;
            }
            executePrintImage(parsedArgs);
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
