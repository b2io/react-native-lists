import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import {
  getOrderedSymbol,
  getStyleValue,
  getUnorderedSymbol,
  groupStyles,
} from './util';

const stylesheet = StyleSheet.create({
  listContainer: {
    paddingLeft: 10,
  },
  listItemContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 5,
  },
  listItemWrapper: {
    flex: 1,
    paddingLeft: 5,
  },
});

const isListItemType = (element) => {
  return element.type.name === 'ListItem';
};

const getSymbolWidth = (charCount, fontSize = 8) => {
  const fontSizePercent = 0.7;
  const minWidth = Math.max(fontSize, 20);
  const charCountPadding = Math.round(fontSize * fontSizePercent);
  return Math.max(minWidth, charCount * charCountPadding);
};

const withSymbolCharCount = (children) => {
  const symbolLength = React.Children.toArray(children).reduce((max, child) => {
    const isListItem = isListItemType(child);
    return isListItem ? Math.max(max, child.props.symbol.length) : max;
  }, 0);

  return React.Children.map(children, (child) => {
    const isListItem = isListItemType(child);
    return React.cloneElement(child, {
      symbolCharCount: isListItem ? symbolLength : undefined,
    });
  });
};

const ListItem = ({
  children,
  itemWrapperStyle = {},
  style,
  symbol,
  symbolCharCount,
  symbolStyle = {},
  ...rest
}) => {
  const { layoutStyle, textStyle, viewStyle } = groupStyles(style);

  const containerStyles = [
    stylesheet.listItemContainer,
    layoutStyle,
    viewStyle,
  ];

  const symbolWidth = getSymbolWidth(
    symbolCharCount ?? symbol.length,
    getStyleValue(textStyle, 'fontSize'),
  );

  const symbolStyles = [
    {
      width: symbolWidth,
    },
    textStyle,
    symbolStyle,
  ];

  const listItemWrapperStyles = [stylesheet.listItemWrapper, itemWrapperStyle];

  return (
    <View {...rest} style={containerStyles}>
      <Text style={symbolStyles}>{symbol}</Text>
      <View style={listItemWrapperStyles}>
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const UnorderedList = ({
  children,
  depth = 0,
  getSymbol,
  itemWrapperStyle,
  style,
  symbol,
  symbolStyle,
  ...rest
}) => {
  const symbolFunction = getSymbol ?? getUnorderedSymbol;

  const mappedChildren = React.Children.map(children, (child, index) => {
    const isListItem = isListItemType(child);

    return React.cloneElement(child, {
      depth: isListItem ? child.props.depth : depth + 1,
      itemWrapperStyle: child.props.itemWrapperStyle ?? itemWrapperStyle,
      style: child.props.style ? [style, child.props.style] : style,
      symbol: isListItem
        ? symbol ?? child.props.symbol ?? symbolFunction(depth)
        : child.props.symbol,
      symbolStyle: child.props.symbolStyle ?? symbolStyle,
    });
  });

  return (
    <View {...rest} style={[stylesheet.listContainer, style]}>
      {withSymbolCharCount(mappedChildren)}
    </View>
  );
};

const OrderedList = ({
  children,
  depth = 0,
  getSymbol,
  itemWrapperStyle,
  reversed = false,
  start,
  style,
  symbolStyle,
  ...rest
}) => {
  const symbolFunction = getSymbol ?? getOrderedSymbol;

  const startNum = start
    ? Number(start)
    : reversed
    ? children.filter(isListItemType).length
    : 1;

  const indexToCount = (index) => {
    return reversed ? startNum - index : startNum + index;
  };

  const mappedChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      depth: depth + 1,
      itemWrapperStyle: child.props.itemWrapperStyle ?? itemWrapperStyle,
      style: child.props.style ? [style, child.props.style] : style,
      symbol: isListItemType(child)
        ? child.props.symbol ?? symbolFunction(indexToCount(index), depth)
        : child.props.symbol,
      symbolStyle: child.props.symbolStyle ?? symbolStyle,
    });
  });

  return (
    <View {...rest} style={[stylesheet.listContainer, style]}>
      {withSymbolCharCount(mappedChildren)}
    </View>
  );
};

export { ListItem, OrderedList, UnorderedList };
