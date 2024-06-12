export const API_ENDPOINT = {
  AUTH: {
    REQUEST_OTP: 'authen/request-otp',
    VERIFY_OTP: 'authen/verify-otp',
    CREATE_USER: 'authen/create-user',
    LOGIN: 'authen/login',
    LOGOUT: 'authen/logout',
    GET_PROFILE: 'authen/profile',
    GET_SESSION: 'authen/get-session',
    FORGOT_PASSWORD_OTP: 'authen/forgot-password-otp',
    FORGOT_PASSWORD: 'authen/forgot-password',
    KYC_USER: 'authen/create-update-user',
    CHANGE_PASSWORD: 'authen/change-password',
  },
  GOONG: {
    GEO_CODE: 'Geocode',
    PLACE_DETAIL: 'Place/Detail',
    PLACE_AUTO: 'Place/AutoComplete',
    DIRECTION: 'Direction',
    DISTANCE_MATRIX: 'DistanceMatrix',
  },
  HOME: {
    CATELOG: 'customer/customer-catalog/get-all',
  },
  CATEGORY: {
    RESTAURANT: 'customer/list-restaurants',
    DETAIL_RESTAURANT: 'customer/restaurant/get-detail',
    EXTRA_FOOD: 'customer/food/get-detail',
    LIST_FOOD_CATALOG: 'customer/food-catalog/list-food-catalog',
    LIST_FOOD: 'customer/food/list-food',
  },
  ORDER: {
    LIST_ORDER: 'driver/orders/list-orders',
    CONFRIM_DELIVERED_ORDER: 'driver/orders',
    GET_DETAIL: 'driver/orders',
    CONFIRM_PICKED_ORDER: 'driver/orders',
  },
  GET_SESSION: 'authen/get-session',
};
