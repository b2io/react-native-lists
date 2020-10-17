const {
  getOrderedSymbol,
  getStyleValue,
  countToLetter,
  repeat,
  reverse,
  romanNumeral,
} = require('./util');

describe('reverse', () => {
  test.each([
    [
      ['a', 'b', 'c'],
      ['c', 'b', 'a'],
    ],
    [
      ['a', 1, { name: 'test' }, null],
      [null, { name: 'test' }, 1, 'a'],
    ],
  ])('reverse(%p) => %p', (arr, expected) => {
    let actual = reverse(arr);
    expect(actual).toEqual(expected);
  });
});

describe('getOrderedSymbol', () => {
  test.each([
    [1, 0, '1.'],
    [2, 0, '2.'],
    [1, 1, 'a.'],
    [2, 1, 'b.'],
    [1, 2, 'i.'],
    [2, 2, 'ii.'],
  ])('getOrderedSymbol(%p, %p) => %p', (index, depth, expected) => {
    let actual = getOrderedSymbol(index, depth);
    expect(actual).toBe(expected);
  });
});

describe('getStyleValue', () => {
  test.each([
    [{ fontSize: 12 }, 'fontSize', 12],
    [[{ fontSize: 14 }, { fontSize: 12 }], 'fontSize', 12],
    [{ height: 12 }, 'fontSize', undefined],
    [[{ height: 14 }, { height: 12 }], 'fontSize', undefined],
  ])('getStyleValue(%p, %p) => %p', (style, prop, expected) => {
    let actual = getStyleValue(style, prop);
    expect(actual).toBe(expected);
  });
});

describe('countToLetter', () => {
  test.each([
    [1, 'a'],
    [26, 'z'],
    [27, 'aa'],
    [52, 'zz'],
  ])('countToLetter(%p) => %p', (index, expected) => {
    let actual = countToLetter(index);
    expect(actual).toBe(expected);
  });
});

describe('repeat', () => {
  test.each([
    ['*', 3, '***'],
    ['abc', 2, 'abcabc'],
    ['abc', 0, ''],
  ])('repeat(%p, %p) => %p', (str, n, expected) => {
    let actual = repeat(str, n);
    expect(actual).toBe(expected);
  });
});

describe('romanNumeral', () => {
  test.each([
    [1, 'I'],
    [4, 'IV'],
    [5, 'V'],
    [9, 'IX'],
    [10, 'X'],
    [49, 'XLIX'],
    [50, 'L'],
    [99, 'XCIX'],
    [100, 'C'],
    [118, 'CXVIII'],
    [2063, 'MMLXIII'],
  ])('romanNumeral(%p) => %p', (n, expected) => {
    let actual = romanNumeral(n);
    expect(actual).toEqual(expected);
  });
});
