import Icon from 'assets/svg/Icon';
import React from 'react';
import { MapMarkerProps, Marker } from 'react-native-maps';
import { ILongLocation } from 'types';
interface MarkerIconProps {
  markerProps?: Omit<MapMarkerProps, 'coordinate'>;
  location: ILongLocation;
  iconName?: keyof typeof Icon;
  iconProps?: object;
  customIcon?: React.JSX.Element;
}
const MarkerIcon: React.FC<MarkerIconProps> = props => {
  const iconShow = React.useMemo(() => {
    if (props.customIcon) {
      return props.customIcon;
    }
    if (props.iconName && Object.keys(Icon).includes(props.iconName)) {
      return Icon[props.iconName]({
        width: 18,
        height: 23,
        ...props.iconProps,
      });
    }
    return <Icon.StartLocation width={18} height={23} />;
  }, [props]);
  return (
    <Marker
      {...props.markerProps}
      coordinate={{
        latitude: props.location.lat,
        longitude: props.location.long,
      }}>
      {iconShow}
    </Marker>
  );
};
export default MarkerIcon;
