import React, { useCallback, useMemo } from 'react';
import { Divider, TextCus, ViewCus, Buttons, TouchCus } from 'components';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { useTranslation } from 'react-i18next';
import { formatMoney } from 'utils';
import { LableStatus, OrderStatus, ButtonNextStatus } from 'types';
import Icon from 'assets/svg/Icon';
interface IProps {
  from: string;
  to: string;
  note?: string;
  titleNote?: string;
  style?: StyleProp<ViewStyle>;
  price: number;
  id: string;
  time: string;
  status: string;
  orderCode: string;
  onPressNextAction: (props: any) => void;
  onPressItem: () => void;
}
const OrderItem: React.FC<IProps> = ({
  from,
  to,
  price,
  id,
  time,
  status,
  orderCode,
  onPressNextAction,
  onPressItem,
}) => {
  const { t } = useTranslation();
  const isHideButton = useMemo(() => {
    return [
      OrderStatus.DELIVERED,
      OrderStatus.CANCEL,
      OrderStatus.DRIVER_PICKING,
    ].includes(status as any);
  }, [status]);
  const _onPressNextAction = useCallback(() => {
    if (typeof onPressNextAction === 'function') {
      onPressNextAction({ orderCode, status });
    }
  }, [orderCode, status, onPressNextAction]);

  const statusName = useMemo(() => {
    return LableStatus[status];
  }, [status]);

  return (
    <TouchCus onPress={onPressItem}>
      <ViewCus
        bg-white
        style={[BaseStyle.wrapperMain, styles.wrapperItem]}
        key={id}>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus main color-blue47>
            {LableStatus?.[status]}
          </TextCus>
          <TextCus main color-grey85>
            {time}
          </TextCus>
        </ViewCus>
        <Divider small color={Colors.greyEE} style={styles.divider} />
        <ViewCus pb-12 style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus heading5>{orderCode}</TextCus>
          <TextCus main color-blue47 useI18n>
            order.order_item.label_detail
          </TextCus>
        </ViewCus>
        <ViewCus style={[BaseStyle.wrapperMain]}>
          <ViewCus style={[BaseStyle.flexRowCenter]}>
            <ViewCus style={styles.active}>
              <Icon.HomeBlack />
            </ViewCus>
            <TextCus
              style={[BaseStyle.flexShrink1, styles.label]}
              numberOfLines={1}>
              {from}
            </TextCus>
          </ViewCus>
          <ViewCus style={styles.line} ml-8 />
          <ViewCus style={[BaseStyle.flexRowCenter]}>
            <ViewCus style={styles.active}>
              <Icon.IconUserBlackBlur />
            </ViewCus>
            <TextCus
              style={[
                BaseStyle.flexShrink1,
                styles.label,
                { color: Colors.greyAD },
              ]}
              numberOfLines={1}>
              {to}
            </TextCus>
          </ViewCus>
        </ViewCus>
        <Divider small color={Colors.greyEE} style={styles.divider} />
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus style={BaseStyle.flexShrink1} numberOfLines={1}>
            {`${t('order.order_item.label_price')}: `}
            <TextCus color-orangeFF heading5>
              {formatMoney(price)}
            </TextCus>
          </TextCus>
          <TextCus>{statusName}</TextCus>
        </ViewCus>
        {!isHideButton && (
          <Buttons onPress={_onPressNextAction} mt-10>
            <TextCus heading5 color-white px-12>
              {ButtonNextStatus?.[status]}
            </TextCus>
          </Buttons>
        )}
      </ViewCus>
    </TouchCus>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 20,
    borderLeftWidth: 2,
    borderLeftColor: Colors.greyAD,
  },
  active: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  nonActive: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  divider: {
    marginVertical: 12,
  },
  label: {
    fontSize: 18,
  },
  btn: {
    padding: 10,
  },
  wrapperItem: {
    borderRadius: 16,
  },
});
export default OrderItem;
