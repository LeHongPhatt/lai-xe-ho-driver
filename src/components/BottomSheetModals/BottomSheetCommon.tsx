import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetModalInternal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { Portal } from '@gorhom/portal';
import React, {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IRefBottom } from 'types';
import styles from './styles';
interface IProps extends Omit<BottomSheetProps, 'children' | 'snapPoints'> {
  children: React.ReactNode;
  pressBehavior?: BackdropPressBehavior;
  hideBackdrop: boolean;
  snapPoint?: Array<string | number>;
  index;
}
const BottomSheetCommon = (
  {
    children,
    pressBehavior = 'collapse',
    snapPoint,
    index,
  }: // hideBackdrop = false,
  IProps,
  ref: Ref<IRefBottom>,
) => {
  const refBottom = useRef<BottomSheet>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [snapPoint]);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const { bottom: safeBottomArea } = useSafeAreaInsets();
  useImperativeHandle(
    ref,
    () => {
      return {
        close: closeModal,
        show: showModal,
      };
    },
    [],
  );
  // useEffect(() => {
  //   const backAction = () => {
  //     refBottom.current?.close();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  const closeModal = useCallback(() => {
    refBottom.current?.close();
  }, []);
  const showModal = useCallback(() => {
    refBottom.current?.snapToIndex(0);
  }, []);
  const { containerHeight, containerOffset } = useBottomSheetModalInternal();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={Keyboard.dismiss}
        pressBehavior={pressBehavior}
      />
    ),
    [pressBehavior],
  );
  const contentContainerStyle = useMemo(
    () => [{ paddingBottom: safeBottomArea || 6 }],
    [safeBottomArea],
  );
  return (
    <Portal>
      <BottomSheet
        snapPoints={animatedSnapPoints}
        ref={refBottom}
        {...(index !== undefined ? { index } : { index: -1 })}
        animateOnMount
        handleIndicatorStyle={styles.indicator}
        animationConfigs={animationConfigs}
        containerHeight={containerHeight}
        containerOffset={containerOffset}
        backdropComponent={renderBackdrop}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enableContentPanningGesture={false}>
        <BottomSheetView
          style={contentContainerStyle}
          onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
export default forwardRef(BottomSheetCommon);
