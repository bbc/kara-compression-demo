const compress = ({inputImage}) => {
    const compressedImage = [];
    const uncompressedImageArray = inputImage.split('');

    //First is always assumed to be pixel color 0
    if (uncompressedImageArray[0] === "1") {
        compressedImage.push(0);
    }

    var lastPixel = uncompressedImageArray[0];
    var currentRun = 0;
    uncompressedImageArray.forEach(currentPixel => {
        if (currentPixel !== '0' && currentPixel !== '1') {
            throw `Invalid uncompressed image input - ${currentPixel}`;
        }

        if (currentPixel !== lastPixel) {
            compressedImage.push(currentRun.toString(16));
            currentRun = 0;
        }
        currentRun++;
        lastPixel = currentPixel;
    });
    //And the last one
    compressedImage.push(currentRun.toString(16));

    return compressedImage.join(',');
}

const decompress = ({inputImage}) => {
    const uncompressedImage = [];

    const compressedImage = inputImage.split(',');
    const len = compressedImage.length;
    var currentColor = 0;
    for (var i = 0 ; i < len ; i++) {
        //Check the input is in the range 0-f
        if (!/^([a-fA-F0-9]*)$/.test(compressedImage[i])) {
            throw `Invalid compressed input ${compressedImage[i]}`;
        }
        const encodedNumber = parseInt(compressedImage[i], 16)
        uncompressedImage.push(...(currentColor.toString().repeat(encodedNumber).split('')));
        currentColor = currentColor ? 0 : 1;
    }

    return uncompressedImage.join('');
}

module.exports = {
    compress,
    decompress,
}
