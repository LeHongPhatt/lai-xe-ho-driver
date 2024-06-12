import React from 'react';
import MapView, { MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from 'hooks';
const MapCus = ({ showsUserLocation = true, ...props }: MapViewProps) => {
  const { locationUser } = useLocation();
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: locationUser.lat,
        longitude: locationUser.long,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}
      showsUserLocation={showsUserLocation}
      {...props}>
      {props.children}
    </MapView>
  );
};

export default MapCus;
