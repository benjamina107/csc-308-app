const myFunctions = require('./sample-functions.js');

test('Testing div by 0 -- success', () => {
    const target = NaN;
    const result = myFunctions.div(0, 0);
    expect(result).toBe(target);
});

test('Testing div by 1 -- success', () => {
    const target = 5;
    const result = myFunctions.div(5, 1);
    expect(result).toBe(target);
});

test('Testing div by 5 -- success', () => {
    const target = 5;
    const result = myFunctions.div(25, 5);
    expect(result).toBe(target);
});

//containsNumbers

test('Testing contains no numbers -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("abcabc");
    expect(result).toBe(target);
});

test('Testing contains punctuation -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("ab,ca!bc");
    expect(result).toBe(target);
});

test('Testing contains numbers -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("abc12abc");
    expect(result).toBe(target);
});

test('Testing contains number last char -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("abca1");
    expect(result).toBe(target);
});