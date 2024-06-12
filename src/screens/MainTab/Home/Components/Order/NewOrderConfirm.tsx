import { TextCus, ViewCus, IconApp, Buttons, ScrollViewCus } from 'components';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { BaseStyle, Colors, FontWeight } from 'theme';
import { formatMoney } from 'utils';
import { IconName, Images } from 'assets';
import { IOrderItem, IRestaurant } from 'types';
import Icon from 'assets/svg/Icon';

interface IProps {
  order: Omit<IOrderItem, 'restaurant'> & {
    restaurant: IRestaurant;
    durationMinute: number;
    distanceKm: number;
  };
  counter: number;
  onAcceptOrder: (data: any) => void;
}
const NewOrderConfirm: React.FC<IProps> = props => {
  const _onAcceptOrder = () =>
    props?.onAcceptOrder?.({ orderCode: props.order.order_code });

  return (
    <ViewCus f-1>
      <ScrollViewCus
        style={[
          {
            // backgroundColor: 'red',
          },
        ]}>
        <ViewCus px-16 style={[]}>
          <ViewCus>
            <ViewCus style={[styles.line, {}]} ml-7 />

            {/* lấy hàng */}
            <ViewCus>
              <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
                <ViewCus style={BaseStyle.flexRowCenter}>
                  <ViewCus style={styles.icon}>
                    <Icon.RestaurantPickup color={Colors.success} />
                  </ViewCus>
                  <TextCus
                    useI18n
                    style={[BaseStyle.flexShrink1, styles.label]}
                    numberOfLines={1}>
                    order.pickup_label
                  </TextCus>
                </ViewCus>
                {/* <TextCus
                  style={[BaseStyle.flexShrink1, styles.label]}
                  numberOfLines={1}>
                  3.4km - 6 phút
                </TextCus> */}
              </ViewCus>
              <ViewCus style={styles.inforPickupPlace}>
                <ViewCus ml-18 py-12>
                  <TextCus heading3 numberOfLines={1}>
                    {props.order.restaurant.address}
                  </TextCus>
                  <TextCus mainSize numberOfLines={1}>
                    {props.order.restaurant.name}
                  </TextCus>
                </ViewCus>
              </ViewCus>
            </ViewCus>
            {/* Giao hang */}
            <ViewCus>
              <ViewCus style={BaseStyle.flexRowSpaceBetwwen}>
                <ViewCus style={BaseStyle.flexRowCenter}>
                  <ViewCus style={styles.icon}>
                    <IconApp
                      name={IconName.Account}
                      size={16}
                      color={Colors.redEB}
                    />
                  </ViewCus>
                  <TextCus
                    useI18n
                    style={[BaseStyle.flexShrink1, styles.label]}
                    numberOfLines={1}>
                    order.delivery_label
                  </TextCus>
                </ViewCus>
                <TextCus
                  style={[BaseStyle.flexShrink1, styles.label]}
                  numberOfLines={1}>
                  {props.order.distanceKm}km - {props.order.durationMinute} phút
                </TextCus>
              </ViewCus>
              <ViewCus style={[styles.inforPickupPlace]}>
                <ViewCus style={[styles.unline]} ml-7 />
                <ViewCus ml-18 py-12>
                  <TextCus heading3 numberOfLines={1}>
                    {props.order.customer.address}
                  </TextCus>
                  <TextCus mainSize numberOfLines={1}>
                    {props.order.customer.full_name}
                  </TextCus>
                </ViewCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </ScrollViewCus>
      <ViewCus px-16 style={styles.fixBottom}>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} py-12>
          <TextCus useI18n>order.fee_order</TextCus>
          <TextCus color-orangeFF heading3>
            {formatMoney(props.order.total_price)}
          </TextCus>
        </ViewCus>
        <Buttons onPress={_onAcceptOrder}>
          <TextCus useI18n heading5 color-white>
            order.receive_order
          </TextCus>
          <TextCus heading5 color-white>{` (${props.counter}s)`}</TextCus>
        </Buttons>
      </ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: FontWeight.semibold,
  },
  line: {
    top: 30,
    height: 70,
    position: 'absolute',
    borderLeftWidth: 2,
    borderLeftColor: Colors.greyAD,
  },
  unline: {
    width: 2,
  },
  inforPickupPlace: {
    // flex: 1,
    // flexDirection: 'row',
  },
  fixBottom: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: Colors.white,
  },
});

export default NewOrderConfirm;
