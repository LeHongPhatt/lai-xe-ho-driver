import Icon from 'assets/svg/Icon';
import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const NotFoundData = () => {
  return (
    <ViewCus
      mb-80
      justify-space-between
      items-center
      style={styles.boxNotFoundData}>
      <ViewCus items-center>
        <Icon.IconSearchNotFoundData />
        <TextCus useI18n>text.not_found_data</TextCus>
      </ViewCus>
    </ViewCus>
  );
};

export default NotFoundData;

const styles = StyleSheet.create({
  boxNotFoundData: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flex: 1,
  },
});
