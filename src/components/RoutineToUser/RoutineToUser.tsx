import Icon from 'assets/svg/Icon';
import { Divider, TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  from: string;
  to: string;
  note?: string;
  titleNote?: string;
  style?: StyleProp<ViewStyle>;
}
const RoutineToUser: React.FC<IProps> = ({
  from,
  to,
  titleNote,
  note,
  style,
}) => {
  return (
    <ViewCus style={[BaseStyle.wrapperMain, style]}>
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <Icon.HomeBlack />
        <TextCus ml-8 style={styles.from} numberOfLines={1}>
          {from}
        </TextCus>
      </ViewCus>
      <ViewCus style={styles.line} ml-8 />
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <Icon.IconUserBlackBlur />
        <TextCus ml-8 style={styles.to} numberOfLines={1}>
          {to}
        </TextCus>
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.divider} />
      {titleNote && <TextCus bold>{titleNote}</TextCus>}
      {note && <TextCus>{note}</TextCus>}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  from: {
    color: Colors.black3A,
  },
  to: {
    color: Colors.disable,
  },
  divider: {
    marginVertical: 12,
  },
  line: {
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.disable,
  },
});
export default RoutineToUser;
