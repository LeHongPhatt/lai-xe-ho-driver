import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { IconApp, TextCus, ViewCus } from 'components';
import React, { useMemo } from 'react';
import { Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontWeight, Colors } from 'theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Routes } from './Routes';

interface IProps extends BottomTabBarButtonProps {
  icon: string;
  route: string;
  label: string;
  screen: string;
}
const ButtonBottomStack: React.FC<IProps> = ({
  onPress,
  icon,
  accessibilityState,
  label,
  screen,
}) => {
  const focused = Boolean(accessibilityState?.selected);
  const { color, fontWeight } = useMemo(() => {
    return {
      color: focused ? Colors.main : Colors.grey84,
      fontWeight: focused ? FontWeight.bold : FontWeight.regular,
    };
  }, [focused]);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ViewCus style={styles.container}>
        {screen === Routes.Home ? (
          <Ionicons name={icon} size={24} color={color} />
        ) : (
          <IconApp name={icon} size={24} color={color} />
        )}
        <TextCus
          mt-5
          subhead
          useI18n
          color={color}
          style={{
            fontWeight,
          }}>
          {label}
        </TextCus>
      </ViewCus>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    ...Platform.select({
      android: {},
      ios: {
        marginTop: 10,
      },
    }),
  },
});
export default ButtonBottomStack;
