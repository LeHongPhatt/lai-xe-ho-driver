import Icon from 'assets/svg/Icon';
import {
  IconCus,
  MapViewCus,
  ScrollViewCus,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import { BottomSheetModalContainer } from 'components/BottomSheetModals';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IRefBottom } from 'types';
import styles from './styles';
import { getWidthBySpace } from 'utils';
import { IconName } from 'assets';
import { Colors } from 'theme';
import Geolocation from '@react-native-community/geolocation';
import { useGeo } from 'hooks';

const InputAddress = () => {
  const { onNameByLatLng, searchAutoComplete } = useGeo();
  const [address, setAddress] = useState({ from: '', to: '' });
  const refContentBottom = useRef<IRefBottom>(null);

  const getNameLocation = ({ coords: { latitude, longitude } }) => {
    onNameByLatLng({ latitude, longitude }, from =>
      setAddress({ ...address, from }),
    );
  };

  // const onCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(getNameLocation);
  // };

  const onChangeText = input => {
    searchAutoComplete({ input }, () => {});
  };

  useEffect(() => {
    refContentBottom.current?.show();
    Geolocation.getCurrentPosition(getNameLocation);
  }, [JSON.stringify(refContentBottom.current)]);

  const renderUser = useCallback(() => {
    return (
      <ScrollViewCus>
        <ViewCus>
          <ViewCus px-16>
            <ViewCus style={styles.fullWidth} mt-12>
              <ViewCus flex-row items-center>
                <IconCus name={IconName.Maker} color={Colors.grey84} />
                <TextCus ml-6 textAlign="center" subhead subHeadColor>
                  {address.from}
                </TextCus>
              </ViewCus>
            </ViewCus>
            <ViewCus mt-12>{Icon.Line(getWidthBySpace(32))}</ViewCus>
            <ViewCus style={styles.fullWidth}>
              <ViewCus flex-row items-center>
                <ViewCus items-center minh-25>
                  <IconCus name={IconName.Maker} color={Colors.main} />
                </ViewCus>
                <TextInputs
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={onChangeText}
                  placeholder="Nhập địa chỉ giao"
                />
              </ViewCus>
            </ViewCus>
          </ViewCus>
          <ViewCus style={styles.fullWidth} h-5 bg-greyEE mt-5 />
        </ViewCus>
      </ScrollViewCus>
    );
  }, []);

  return (
    <>
      <ViewCus l-16 t-90 style={styles.posAbsolute}>
        <TouchCus onPress={() => {}}>
          <ViewCus bg-white br-12 w-32 h-32 items-center justify-center>
            <IconCus name={IconName.ChevronLeft} color={Colors.main} />
          </ViewCus>
        </TouchCus>
      </ViewCus>
      <ViewCus f-1>
        <MapViewCus showsUserLocation={true} />
        <BottomSheetModalContainer
          hideBackdrop={true}
          ref={refContentBottom}
          showIndicator={true}
          snapPoints={['45%', '80%']}>
          {renderUser()}
        </BottomSheetModalContainer>
      </ViewCus>
    </>
  );
};

export default InputAddress;
