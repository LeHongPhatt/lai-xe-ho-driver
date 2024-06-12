import React from 'react';
import { Switch, SwitchProps } from 'react-native-switch';

const SwitchCus: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  inActiveText,
  activeText,
  backgroundActive,
  backgroundInactive,
  circleActiveColor,
  circleInActiveColor,
}) => {
  return (
    <Switch
      value={value}
      activeText={activeText}
      inActiveText={inActiveText}
      onValueChange={onValueChange}
      backgroundActive={backgroundActive}
      backgroundInactive={backgroundInactive}
      circleActiveColor={circleActiveColor}
      circleInActiveColor={circleInActiveColor}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={3.8}
      switchBorderRadius={30}
      barHeight={50}
      circleSize={40}
    />
  );
};
// const styles = StyleSheet.create({
//   mr: {
//     marginRight: 5,
//   },
// });
export default SwitchCus;
