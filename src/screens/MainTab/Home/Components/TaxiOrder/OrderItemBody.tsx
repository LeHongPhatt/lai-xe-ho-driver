import React, { useMemo } from 'react';
import { Divider, TextCus, ViewCus } from 'components';
import { Platform, StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { formatMoney } from 'utils';
import Icon from 'assets/svg/Icon';
import { ITaxiItem, TaxiVehicle } from 'types/taxi';
interface IProps {
  item: ITaxiItem;
}
const OrderItemBody: React.FC<IProps> = props => {
  const typeVehicle = useMemo(() => {
    switch (props.item.vehicle) {
      case TaxiVehicle.MOTORBIKE:
        return (
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <Icon.PersonSimpleBike />
            <TextCus ml-8>Xe máy</TextCus>
          </ViewCus>
        );

      default:
        return (
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <Icon.CarSide />
            <TextCus ml-8>Xe ô tô</TextCus>
          </ViewCus>
        );
    }
  }, [props.item]);

  const typePayment = useMemo(() => {
    return (
      <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
        <Icon.COD_PAYMENT />
        <TextCus ml-8>Tiền mặt</TextCus>
      </ViewCus>
    );
  }, [props.item]);

  return (
    <>
      <ViewCus pb-12 style={[BaseStyle.flexRowSpaceBetwwen]}>
        <TextCus main color-grey85 useI18n>
          Loại phương tiện
        </TextCus>
        {typeVehicle}
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.dividerS} />
      <ViewCus pb-12 style={[BaseStyle.flexRowSpaceBetwwen]}>
        <TextCus main color-grey85 useI18n>
          Thanh toán
        </TextCus>
        {typePayment}
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.divider} />
      <ViewCus>
        <ViewCus style={[BaseStyle.flexRow]}>
          <ViewCus mt-5 style={[styles.active]}>
            <Icon.StartLocation />
          </ViewCus>
          <ViewCus f-1>
            <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
              <TextCus color-grey85 main style={[BaseStyle.flexShrink1]}>
                Điểm bắt đầu
              </TextCus>
              <TextCus ml-8 color-grey85 main>
                3.4km - 6 phút
              </TextCus>
            </ViewCus>
            <ViewCus>
              <TextCus style={styles.label} numberOfLines={1}>
                {props.item.pickup_location.address}
              </TextCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
        <ViewCus style={styles.line} ml-8 p-0 m-0 />
        <ViewCus mt-12 style={[BaseStyle.flexRow]}>
          <ViewCus mt-5 style={[styles.active]}>
            <Icon.EndLocation />
          </ViewCus>
          <ViewCus f-1>
            <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
              <TextCus color-grey85 main style={[BaseStyle.flexShrink1]}>
                Điểm đến
              </TextCus>
              <TextCus ml-8 color-grey85 main>
                2.4km - 3 phút
              </TextCus>
            </ViewCus>
            <ViewCus>
              <TextCus style={styles.label} numberOfLines={1}>
                {props.item.dropoff_location.address}
              </TextCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.divider} />
      <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
        <TextCus
          style={BaseStyle.flexShrink1}
          numberOfLines={1}
          main
          color-black3A>
          Cước phí
        </TextCus>
        <TextCus color-main heading1>
          {formatMoney(Math.round(props.item.price))}
        </TextCus>
      </ViewCus>
    </>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 35,
    position: 'absolute',
    top: 25,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greyAD,
    borderStyle: Platform.select({
      ios: 'solid',
      android: 'dashed',
    }),
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
  dividerS: {
    marginVertical: 8,
    backgroundColor: 'transparent',
    borderBottomColor: Colors.greyEE,
    borderBottomWidth: 1,
    borderStyle: Platform.select({
      ios: 'solid',
      android: 'dashed',
    }),
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  btn: {
    padding: 10,
  },
  wrapperItem: {
    borderRadius: 16,
  },
});
export default OrderItemBody;
