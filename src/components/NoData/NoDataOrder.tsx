import { TextCus } from 'components';
import React from 'react';
import { View, Image } from 'react-native';
import { Images } from 'assets';

import styles from './styles';

const NoDataOrder = () => {
  return (
    <View style={styles.padContentBtn}>
      <View style={styles.cenItem}>
        <Image source={Images.noOrder} />
        <TextCus mt-24 heading5 color-black3A useI18n>
          order.no_order
        </TextCus>
        <TextCus mainSize color-grey85 useI18n>
          order.open_res
        </TextCus>
      </View>
    </View>
  );
};

export default NoDataOrder;
