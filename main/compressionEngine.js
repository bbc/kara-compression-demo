const compress = ({inputImage}) => {
    const uncompressedImageArray = inputImage.split('');
    const compressedArray = [];

    if (inputImage === '') {
        return '';
    }

    var previousChar = '0';
    var charCount = 0;
    var currentChar;
    for (var i = 0 ; i < uncompressedImageArray.length ; i++) {
        currentChar = uncompressedImageArray[i];
        while (currentChar === previousChar) {
            i++;
            charCount++;
            currentChar = uncompressedImageArray[i];
        }
        previousChar = currentChar;
        compressedArray.push(charCount.toString(16));
        charCount = 1;
    }

    return compressedArray.join(',');
}

const decompress = ({inputImage}) => {
    return '';
}

module.exports = {
    compress,
    decompress,
}
