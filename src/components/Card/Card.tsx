import React from 'react';
import { ViewCus } from 'components';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export interface Card {
  hasShadow?: boolean;
  content: React.ReactNode;
}

export default function Card(props: Card) {
  const { hasShadow, content } = props;
  return (
    <ViewCus p-16 style={[hasShadow && styles.shadow, styles.card]}>
      {content}
    </ViewCus>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#8a8989',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});
