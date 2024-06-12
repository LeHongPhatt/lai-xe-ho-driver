import { Images } from 'assets';
import { ImageCus, TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export interface IItemNew {
  id: number;
  title: string;
  image: string;
}

const ItemNew: React.FC<IItemNew> = ({ title, image }) => {
  return (
    <ViewCus style={[styles.container, styles.shadow]}>
      <ImageCus
        source={image ? { uri: image } : Images.comsuon}
        style={styles.image}
      />
      <ViewCus px-8 py-8>
        <TextCus style={styles.text} colors-black2B bold numberOfLines={2}>
          {title}
        </TextCus>
      </ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 138,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default ItemNew;
