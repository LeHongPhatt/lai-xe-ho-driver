import { ViewCus } from 'components';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';
import { useLocation } from 'hooks';

// const DEFAULT_REGION = {
//   latitude: 10.8527988,
//   longitude: 106.6239689,
//   latitudeDelta: 0.0422,
//   longitudeDelta: 0.0221,
// };

const MapViewCus = ({ showsUserLocation = true, ...props }) => {
  const { locationUser } = useLocation();
  return (
    <ViewCus f-1>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: locationUser.lat,
          longitude: locationUser.long,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221,
        }}
        showsUserLocation={showsUserLocation}
        {...props}
      />
    </ViewCus>
  );
};

export default MapViewCus;
