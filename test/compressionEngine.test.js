const { compress, decompress } = require('../main/compressionEngine');

test('Empty Image', async () => {

    var compressedImage = compress({inputImage: ''})
    expect(compressedImage).toStrictEqual('');

});

test('2 pixel image - starting 0', async () => {
    var compressedImage = compress({inputImage: '01'})
    expect(compressedImage).toStrictEqual('1,1');
});

test('2 pixel image - starting 1', async () => {
    var compressedImage = compress({inputImage: '10'})
    expect(compressedImage).toStrictEqual('0,1,1');
});

test('10 pixel image - starting 1', async () => {
    var compressedImage = compress({inputImage: '1110000110'})
    expect(compressedImage).toStrictEqual('0,3,4,2,1');
});

test('10 pixel image - starting 0', async () => {
    var compressedImage = compress({inputImage: '0000111101'})
    expect(compressedImage).toStrictEqual('4,4,1,1');
});

test('long run length', async () => {
    var compressedImage = compress({inputImage: '00000000000'})
    expect(compressedImage).toStrictEqual('b');
});