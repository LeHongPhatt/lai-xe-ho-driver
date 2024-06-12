import {
  Buttons,
  RNFlatList,
  HomeLayout,
  IconApp,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { formatMoney } from 'utils';
import { IconName } from 'assets';
import { CategoryCartItem } from '../components';
import { NavigationService, Routes } from 'navigation';
import { useCart } from 'context/CartContext';
const Line = () => <ViewCus h-8 bg-greyF5 />;
const CartOrder: React.FC = () => {
  const { carts, price } = useCart();
  const [desc, setDesc] = useState('');
  const onChooseDelivery = useCallback(() => {}, []);
  const renderItem = useCallback(({ item, index }) => {
    return <CategoryCartItem key={index} {...item} />;
  }, []);
  const ListComponentHeader = useCallback(() => {
    return (
      <>
        <ViewCus style={[BaseStyle.wrapperDisable]}>
          <TextCus heading5 color-grey85>
            Giao tới
          </TextCus>
        </ViewCus>
        <TouchCus
          onPress={onChooseDelivery}
          style={[BaseStyle.wrapperMain]}
          flex-row
          items-center>
          <ViewCus flex-row items-center style={BaseStyle.flexShrink1}>
            <IconApp
              name={IconName.AddressDisable}
              size={22}
              color={Colors.greyAD}
            />
            <ViewCus px-10>
              <TextCus heading5>Võ Kim Yến</TextCus>
              <TextCus numberOfLines={1}>
                89 Phan Đình Phùng, Phường 17, Quận Phú Nhuận, Thàn...
              </TextCus>
            </ViewCus>
          </ViewCus>
          <IconApp name={IconName.ChevronRight} size={14} style={styles.icon} />
        </TouchCus>
        <ViewCus style={[BaseStyle.wrapperDisable]}>
          <TextCus heading5 color-grey85>
            Đơn hàng
          </TextCus>
        </ViewCus>
      </>
    );
  }, [onChooseDelivery]);
  const ListComponentFooter = useCallback(
    ({ setValue, value }) => {
      return (
        <ViewCus>
          <ViewCus style={[[BaseStyle.wrapperDisable]]}>
            <TextCus>Ghi chú (không bắt buộc)</TextCus>
          </ViewCus>
          <ViewCus style={[BaseStyle.wrapperMain]}>
            <TextInputs
              placeholder="category.service_note"
              style={styles.input}
              onChangeText={setValue}
              value={value}
            />
          </ViewCus>
          <Line />
          <TouchCus style={[BaseStyle.wrapperMain]} onPress={() => {}}>
            <TextCus heading5 mb-4 useI18n>
              category.title_promotion
            </TextCus>
            <ViewCus flex-row justify-space-between items-center>
              <TextCus color-blue47 useI18n>
                category.enter_promotion
              </TextCus>
              <IconApp name={IconName.ChevronRight} color={Colors.blue47} />
            </ViewCus>
          </TouchCus>
          <Line />
          <ViewCus style={[BaseStyle.wrapperMain]}>
            <TextCus heading5 mb-4 useI18n>
              category.title_payment
            </TextCus>
            <ViewCus style={styles.linePrice}>
              <TextCus color-grey85 useI18n>
                category.estimate
              </TextCus>
              <TextCus>{formatMoney(price)}</TextCus>
            </ViewCus>
            <ViewCus style={styles.linePrice}>
              <TextCus color-grey85 useI18n paramI18n={{ number: 12 }}>
                category.fee_delivery
              </TextCus>
              <TextCus>{formatMoney(0)}</TextCus>
            </ViewCus>
            <ViewCus style={styles.linePrice}>
              <TextCus color-grey85 useI18n>
                category.special_fee
              </TextCus>
              <TextCus>{formatMoney(0)}</TextCus>
            </ViewCus>
          </ViewCus>
          <Line />
          <TouchCus
            style={[BaseStyle.wrapperMain]}
            onPress={() => NavigationService.navigate(Routes.MethodPayment)}>
            <TextCus heading5 mb-4 useI18n>
              category.payment
            </TextCus>
            <ViewCus flex-row justify-space-between items-center>
              <TextCus color-blue47>Thanh toán tiền mặt</TextCus>
              <IconApp name={IconName.ChevronRight} color={Colors.blue47} />
            </ViewCus>
          </TouchCus>
          <ViewCus style={[BaseStyle.wrapperDisable]}>
            <TextCus>
              <TextCus useI18n>category.agree</TextCus>
              <TextCus color-blue00 useI18n>
                category.term
              </TextCus>
            </TextCus>
          </ViewCus>
        </ViewCus>
      );
    },
    [price],
  );

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        renderCenter: () => (
          <ViewCus>
            <TextCus bold color-white textAlign="center">
              Cơm Gà Xối Mỡ 142 - Đinh Tiên...
            </TextCus>
            <TextCus subhead color-white textAlign="center">
              Khoảng cách tới chỗ bạn: 3.6 km
            </TextCus>
          </ViewCus>
        ),
        iconColor: Colors.white,
      }}>
      <ViewCus f-1>
        <RNFlatList
          data={carts}
          renderItem={renderItem}
          ListHeaderComponent={<ListComponentHeader />}
          ListFooterComponent={
            <ListComponentFooter setValue={setDesc} value={desc} />
          }
        />
      </ViewCus>
      <ViewCus
        flex-row
        justify-space-between
        items-center
        px-16
        bg-white
        btw-1
        pt-12
        pb-30
        btc-greyEE>
        <ViewCus mr-24>
          <TextCus useI18n>category.total</TextCus>
          <ViewCus flex-row>
            <TextCus bold main mr-4>
              {formatMoney(price)}
            </TextCus>
            <TextCus color-grey85 useI18n paramI18n={{ number: carts?.length }}>
              category.quantity
            </TextCus>
          </ViewCus>
        </ViewCus>
        <Buttons
          textBtn="category.payment"
          style={styles.btnAddFood}
          onPress={() => NavigationService.navigate(Routes.Delivery)}
        />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  btnAddFood: {
    flex: 0.75,
    borderRadius: 8,
  },
  icon: {
    flexShrink: 1,
    marginLeft: 30,
    color: Colors.greyAD,
  },
  linePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyED,
    marginTop: 10,
  },
  input: {
    borderRadius: 4,
  },
});
export default CartOrder;
