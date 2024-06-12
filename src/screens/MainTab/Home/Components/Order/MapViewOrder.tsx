import { MapCus, MarkerIcon } from 'components/MapViewCus';
import { useAuth, useGeo, useLocation } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Polyline } from 'react-native-maps';
import { Colors } from 'theme';
import {
  IDirectionData,
  IOrderItem,
  IRestaurantDetail,
  OrderStatus as ORDER_STATUS,
  TaxiVehicle,
} from 'types';
import { usePrevious } from '@uidotdev/usehooks';
import { getGreatCircleBearing } from 'geolib';
interface IProps {
  orderDetail: Omit<IOrderItem, 'restaurant'> & {
    restaurant: IRestaurantDetail;
  };
}
const MapViewOrder = (props: IProps) => {
  const [directionData, setDirectionData] = useState<IDirectionData | null>(
    null,
  );
  const { locationUser } = useLocation();
  const { user } = useAuth();
  const { searchDirection } = useGeo();
  const [polylineData, setPolylineData] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const prevertDriverLocation = usePrevious(locationUser);
  const [rotationDriverIcon, setRotationDriverIcon] = useState(0);
  const endLocation = useMemo(() => {
    let rs = {
      lat: Number(props.orderDetail.restaurant.location.lat),
      long: Number(props.orderDetail.restaurant.location.long),
    };
    if ([ORDER_STATUS.DRIVER_DELIVERING].includes(props.orderDetail.status)) {
      rs = {
        lat: Number(props.orderDetail.customer.lat),
        long: Number(props.orderDetail.customer.long),
      };
    }
    return rs;
  }, [props.orderDetail.status]);

  useEffect(() => {
    let rs = 0;
    if (prevertDriverLocation && locationUser) {
      rs = getGreatCircleBearing(
        {
          latitude: prevertDriverLocation.lat,
          longitude: prevertDriverLocation.long,
        },
        {
          latitude: locationUser.lat,
          longitude: locationUser.long,
        },
      );
    }
    if (rs !== 0) {
      setRotationDriverIcon(rs);
    }
  }, [locationUser]);

  const vehicleIconName = useMemo(() => {
    return user.vehicle !== TaxiVehicle.MOTORBIKE ? 'CarOnMap' : 'BikerOnMap';
  }, [props.orderDetail, user]);

  const renderDriverLocation = useMemo(() => {
    if (locationUser) {
      return (
        <MarkerIcon
          iconName={vehicleIconName}
          markerProps={{
            rotation: rotationDriverIcon,
            anchor: { x: 0.5, y: 0.5 },
            style: {
              height: 45,
            },
          }}
          iconProps={{
            height: 45,
          }}
          location={locationUser}
        />
      );
    }

    return <></>;
  }, [locationUser, rotationDriverIcon, vehicleIconName]);

  useEffect(() => {
    const vihicle = user.vehicle !== TaxiVehicle.MOTORBIKE ? 'taxi' : 'bike';

    searchDirection(
      {
        origin: `${locationUser.lat},${locationUser.long}`,
        destination: `${endLocation.lat},${endLocation.long}`,
        vehicle: vihicle,
      },
      res => {
        if (res.data) {
          setDirectionData(res.data);
        }
      },
    );
  }, [endLocation, locationUser, user, props.orderDetail]);

  useEffect(() => {
    if (directionData !== null) {
      const route = directionData.routes[0];
      const { legs }: { legs: any[] } = route;
      const mapData: { latitude: number; longitude: number }[] = [];
      legs[0].steps.map(x => {
        mapData.push({
          latitude: x.start_location.lat,
          longitude: x.start_location.lng,
        });
        mapData.push({
          latitude: x.end_location.lat,
          longitude: x.end_location.lng,
        });
      });
      setPolylineData(mapData);
    }
  }, [directionData, endLocation, locationUser]);
  return (
    <MapCus
      showsUserLocation={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      initialRegion={{
        latitude: locationUser.lat,
        longitude: locationUser.long,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      {/* {directionView} */}
      {polylineData.length > 0 && (
        <Polyline
          coordinates={polylineData}
          strokeColor={Colors.orange}
          strokeWidth={6}
        />
      )}

      {endLocation && (
        <MarkerIcon
          markerProps={{
            style: {
              height: 45,
              width: 42,
            },
          }}
          iconProps={{
            height: 45,
            width: 42,
          }}
          iconName="SpotLightDestination"
          location={endLocation}
        />
      )}
      {renderDriverLocation}
    </MapCus>
  );
};

export default MapViewOrder;
