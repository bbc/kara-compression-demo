const { generateCompressedField, checkPixelValueIsValidForShades } = require('../main/compressionHelper');

test('Test compressed field generation - mono', async () => {
    const compressedField = generateCompressedField(2, 5, 6);
    expect(compressedField).toStrictEqual('5');
});

test('Test compressed field generation - Greyscale', async () => {
    const compressedField = generateCompressedField(8, 5, 6);
    expect(compressedField).toStrictEqual('65');
});

test('Test pixel values are valid', async () => {
    var isValid = checkPixelValueIsValidForShades(0, 2);
    expect(isValid).toStrictEqual(true);

    isValid = checkPixelValueIsValidForShades(2, 2);
    expect(isValid).toStrictEqual(false);

    isValid = checkPixelValueIsValidForShades(2, 8);
    expect(isValid).toStrictEqual(true);
});