import { RNFlatList, TextCus, TouchCus, ViewCus } from 'components';
import React, { useCallback, useRef, useState } from 'react';
import { ListRenderItem, FlatList, StyleSheet } from 'react-native';
import { Colors } from 'theme';

interface IProps {}
interface IItem {
  id: number;
  name: string;
}
const DATA: IItem[] = [
  { id: 1, name: 'Ăn uống' },
  { id: 2, name: 'Mỹ phẩm' },
  { id: 3, name: 'Giao hàng' },
  { id: 4, name: 'Xe ôm' },
  { id: 5, name: 'Xe ôm' },
  { id: 6, name: 'Xe ôm' },
  { id: 7, name: 'Xe ôm' },
  { id: 8, name: 'Xe ôm' },
];
const ActivityCategories: React.FC<IProps> = () => {
  const flatListRef = useRef<FlatList>(null);
  const [actived, setActived] = useState(-1);
  const onChooseActivity = useCallback((item, index) => {
    setActived(item.id);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index === 0 ? 0 : index - 1,
    });
  }, []);
  const renderItem: ListRenderItem<IItem> = useCallback(
    ({ item, index }) => {
      return (
        <TouchCus
          key={index}
          style={[
            styles.categoryItem,
            actived === item?.id && { borderColor: Colors.main },
          ]}
          onPress={() => onChooseActivity(item, index)}>
          <TextCus
            heading5
            regular
            color={actived === item?.id ? Colors.main : Colors.grey85}>
            {item.name}
          </TextCus>
        </TouchCus>
      );
    },
    [onChooseActivity, actived],
  );
  return (
    <ViewCus mb-16>
      <RNFlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        horizontal
      />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  content: {
    paddingLeft: 14,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.greyAD,
    marginRight: 12,
    marginTop: 12,
    borderRadius: 100,
  },
});
export default ActivityCategories;
