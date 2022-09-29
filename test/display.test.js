const { forTest } = require('../main/display');

test('Test shade to rgb', async () => {

    var rgb = forTest.shadeToRgb('0', 16);
    expect(rgb).toStrictEqual('#000');

    rgb = forTest.shadeToRgb('F', 16);
    expect(rgb).toStrictEqual('#ffffff');

    rgb = forTest.shadeToRgb('8', 16);
    expect(rgb).toStrictEqual('#888888');

    rgb = forTest.shadeToRgb('7', 8);
    expect(rgb).toStrictEqual('#ffffff');
})