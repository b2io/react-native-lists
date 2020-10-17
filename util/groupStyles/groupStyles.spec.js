const { groupStyles } = require('./groupStyles');

test('should handle style object', () => {
  const styles = {
    fontSize: 12,
    height: 24,
    opacity: 1,
  };

  const { layoutStyle, textStyle, viewStyle } = groupStyles(styles);

  expect(layoutStyle).toEqual({ height: 24 });
  expect(textStyle).toEqual({ fontSize: 12 });
  expect(viewStyle).toEqual({ opacity: 1 });
});

test('should handle style array', () => {
  const stylesA = {
    fontSize: 12,
    height: 24,
    opacity: 1,
  };

  const stylesB = {
    fontSize: 10,
    lineHeight: 10,
    opacity: 1,
    width: 24,
  };

  const styles = [stylesA, stylesB];

  const { layoutStyle, textStyle, viewStyle } = groupStyles(styles);

  expect(layoutStyle).toEqual([{ height: 24 }, { width: 24 }]);
  expect(textStyle).toEqual([
    { fontSize: 12 },
    { fontSize: 10, lineHeight: 10 },
  ]);
  expect(viewStyle).toEqual([{ opacity: 1 }, { opacity: 1 }]);
});
