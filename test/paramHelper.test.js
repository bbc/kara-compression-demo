const { checkIntParam } = require('../main/paramHelper');

test('Int out of range', async () => {
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