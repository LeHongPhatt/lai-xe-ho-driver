import Geolocation from '@react-native-community/geolocation';
import { requestMultiple } from 'react-native-permissions';
import { isIos, ANDROID_PERMISSIONS_LOCATION } from 'utils';
import GeolocationService from 'react-native-geolocation-service';
export async function LocationPermission() {
  try {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always',
      locationProvider: 'auto',
    });
    if (isIos) {
      return Geolocation.requestAuthorization();
    } else {
      return await requestMultiple(ANDROID_PERMISSIONS_LOCATION);
    }
  } catch (error) {
    return false;
  }
}
