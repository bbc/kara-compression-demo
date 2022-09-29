const { compress, decompress } = require('../main/compressionEngine');

test('Test compress Mono starting 0', async () => {
    const compressedImage = compress({inputImage: '01', shades: 2});
    expect(compressedImage).toStrictEqual('1,1');
});

test('Test compress Mono starting 1', async () => {
    const compressedImage = compress({inputImage: '10', shades: 2});
    expect(compressedImage).toStrictEqual('0,1,1');
});

test('Test compress mono invalid input', async () => {
    expect(() => {
        compress({inputImage: 'ff', shades: 2});
    }).toThrow();
});

test('Test decompressMono', async () => {
    var uncompressedImage = decompress({inputImage: '0,1,1', shades: 2});
    expect(uncompressedImage).toStrictEqual('10');

    uncompressedImage = decompress({inputImage: '1,1', shades: 2});
    expect(uncompressedImage).toStrictEqual('01');
});

test('Test decompress Mono invalid input', async () => {
    expect(() => {
        decompress({inputImage: 'x,1,1', shades: 2});
    }).toThrow();
});

test('Test compress Greyscale', async () => {
    const compressedImage = compress({inputImage: '0123456789abcdef', shades: 16});
    expect(compressedImage).toStrictEqual('01,11,21,31,41,51,61,71,81,91,a1,b1,c1,d1,e1,f1');
});

test('Test compress greyscale invalid input', async () => {
    expect(() => {
        compress({inputImage: 'ff', shades: 8});
    }).toThrow();
});

test('Test decompress Greyscale', async () => {
    const compressedImage = decompress({inputImage: '01,11,21,31,41,51,61,71,81,91,a1,b1,c1,d1,e1,f1', shades: 16});
    expect(compressedImage).toStrictEqual('0123456789abcdef');
});