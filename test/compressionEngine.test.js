const { compress, decompress } = require('../main/compressionEngine');

test('Test compress Mono starting 0', async () => {
    const compressedImage = compress({inputImage: '01'});
    expect(compressedImage).toStrictEqual('1,1');
})

test('Test compress Mono starting 1', async () => {
    const compressedImage = compress({inputImage: '10'});
    expect(compressedImage).toStrictEqual('0,1,1');
});

test('Test compress Mono invalid input', async () => {
    expect(() => {
        compress({inputImage: 'xx'});
    }).toThrow();
});

test('Test decompressMono', async () => {
    var uncompressedImage = decompress({inputImage: '0,1,1'});
    expect(uncompressedImage).toStrictEqual('10');

    uncompressedImage = decompress({inputImage: '1,1'});
    expect(uncompressedImage).toStrictEqual('01');
});

test('Test decompress Mono invalid input', async () => {
    expect(() => {
        decompress({inputImage: 'x,1,1'});
    }).toThrow();
});