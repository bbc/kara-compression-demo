# kata-compression-demo

This is a starter project for use with the Kata Compression demo session.

## To Run the demo
```node index.js [params]```
### For example
**Display image located at `./test-images/surf.pgm-640-480-16.lee`'**\
```node index.js --mode=display --input=./test-images/surf.pgm-640-480-16.lee --shades=16 --width=640 --height=480```

**Compress image located at `./test-images/pepper.pgm-256-256-2.lee`'**\
```node index.js --mode=compress --input=./test-images/pepper.pgm-256-256-2.lee --shades=2 --width=256 --height=256```

**Decompress image located at `./test-images/buffalo.pgm-481-321-8.lee.com`'**\
```node index.js --mode=compress --input=./test-images/buffalo.pgm-481-321-8.lee.com --shades=8 --width=481 --height=321```


## To Run the tests
```npm test```