const {
  LAYOUT_STYLE_PROPS,
  TEXT_STYLE_PROPS,
  VIEW_STYLE_PROPS,
} = require('./constants');

const styleGroups = {
  layoutStyle: LAYOUT_STYLE_PROPS,
  textStyle: TEXT_STYLE_PROPS,
  viewStyle: VIEW_STYLE_PROPS,
};

const groupStyleObject = (style = {}) => {
  return Object.entries(style).reduce((acc, [key, value]) => {
    const [group] = Object.entries(styleGroups).find(([, groupProps]) =>
      groupProps.includes(key),
    );

    return group
      ? {
          ...acc,
          [group]: {
            ...acc[group],
            [key]: value,
          },
        }
      : acc;
  }, {});
};

const groupStyles = (style = {}) => {
  if (Array.isArray(style)) {
    const mapped = style
      .flat(Infinity)
      .filter(Boolean)
      .map((s) => groupStyleObject(s));

    return mapped.reduce((acc, currentGroup) => {
      return Object.assign(
        {},
        acc,
        ...Object.keys(styleGroups).map((key) =>
          currentGroup[key]
            ? {
                [key]: acc[key]
                  ? [...acc[key], currentGroup[key]]
                  : [currentGroup[key]],
              }
            : undefined,
        ),
      );
    }, {});
  } else {
    return groupStyleObject(style);
  }
};

module.exports = { groupStyles };
