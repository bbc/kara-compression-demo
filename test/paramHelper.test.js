const { checkIntParam, checkFileParam } = require('../main/paramHelper');

test('Test integer param parser', async () => {
    //Too big
    var parseResult = checkIntParam('101', 10, 100);
    expect(parseResult.valid).toStrictEqual(false);

    //Too small
    parseResult = checkIntParam('9', 10, 100);
    expect(parseResult.valid).toStrictEqual(false);

    //Just right and an integer
    parseResult = checkIntParam('50', 10, 100);
    expect(parseResult.valid).toStrictEqual(true);
    expect(parseResult.parsedValue).toStrictEqual(50);
});


test('Test filereader', async () => {
    //File does not exist
    var checkResult = checkFileParam('blah');
    expect(checkResult.valid).toStrictEqual(false);

    checkResult = checkFileParam('./sample-images/testcard.pgm-240-180-16.lee');
    expect(checkResult.valid).toStrictEqual(true);
    expect(checkResult.contents.length).toStrictEqual(43201);
});