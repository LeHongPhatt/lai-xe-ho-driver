import React from 'react';
import { IconApp, ImageCus, TextCus, ViewCus } from 'components';
import { IconName } from 'assets';
import { BaseStyle, Colors } from 'theme';
import { StyleSheet } from 'react-native';
import { formatMoney } from 'utils';
interface IProps {
  quantity: number;
  price: number;
  note: string;
  extraFood: any[];
  name: string;
}

const CategoryCartItem: React.FC<IProps> = ({
  quantity,
  price,
  note,
  extraFood,
  name,
}) => {
  return (
    <ViewCus style={styles.orderItem}>
      <ImageCus
        source={{
          uri: 'https://imgur.com/rb0mFSX.png',
        }}
        style={styles.image}
      />
      <ViewCus
        style={[BaseStyle.flexShrink1, BaseStyle.flex1, styles.spaceBetween]}
        ml-10>
        <TextCus>{`${quantity}x ${name}`}</TextCus>
        <TextCus caption color-grey85>
          Chọn size: Size vừa
        </TextCus>
        {extraFood.length > 0 && (
          <TextCus caption color-grey85>
            Món thêm: {extraFood?.map(item => item.name).join(',')}
          </TextCus>
        )}
        {note && <TextCus caption>Ghi chú: {note}</TextCus>}
        <TextCus main bold>
          {formatMoney(price)}
        </TextCus>
      </ViewCus>
      <IconApp name={IconName.Edit} color={Colors.grey85} size={20} />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 79,
    height: 79,
    borderRadius: 8,
  },
  orderItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyEF,
    marginHorizontal: 14,
    paddingBottom: 14,
    marginTop: 14,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
export default CategoryCartItem;
