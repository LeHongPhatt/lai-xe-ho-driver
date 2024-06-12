import React from 'react';
import { ViewCus, TextCus } from 'components';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

interface TimelineProps {
  activeStep: 1 | 2 | 3;
}

const Timeline: React.FC<TimelineProps> = ({ activeStep = 1 }) => {
  const activeDotStyle = { backgroundColor: Colors.orangeFF };
  const activeLineStyle = {
    width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%',
  };

  return (
    <>
      <ViewCus style={styles.boxTimeLine}>
        <ViewCus style={[styles.dot, activeStep >= 1 && activeDotStyle]} />
        <ViewCus
          style={[
            styles.dot,
            { left: '50%' },
            activeStep >= 2 && activeDotStyle,
          ]}
        />
        <ViewCus
          style={[
            styles.dot,
            { left: '100%' },
            activeStep === 3 && activeDotStyle,
          ]}
        />
        <ViewCus style={[styles.lineActive, activeLineStyle]} />
      </ViewCus>
      <ViewCus justify-space-between items-center mt-12 ml-16 mr-2 flex-row>
        <TextCus useI18n subhead>
          order.receive
        </TextCus>
        <TextCus useI18n subhead>
          order.delivery_progress
        </TextCus>
        <TextCus useI18n subhead>
          order.deliveried
        </TextCus>
      </ViewCus>
    </>
  );
};

const styles = StyleSheet.create({
  boxTimeLine: {
    position: 'relative',
    height: 2,
    backgroundColor: Colors.greyAD,
    marginHorizontal: 16,
  },
  lineActive: {
    position: 'relative',
    height: 2,
    backgroundColor: Colors.orangeFF,
    marginHorizontal: 0,
  },
  dot: {
    zIndex: 9,
    position: 'absolute',
    top: -5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.greyAD,
  },
});

export default Timeline;
