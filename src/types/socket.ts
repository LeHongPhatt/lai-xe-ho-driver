export enum EventSocketType {
  ACTIVITIES = 'driver:activities',
  NEW_ORDER = 'driver:new-order',
  ACCEPT_ORDER = 'driver:accept-order',
  CANCEL_ORDER = 'driver:cancel-order',
  RESTAURANT_DONE_ORDER = 'driver:restaurant-done-order',
  NEW_MOTOBIKE_TAXI = 'driver:new-motorcycle-taxi',
  ACCEPT_MOTOBIKE_TAXI = 'driver:accept-motorcycle-taxi',
  ERROR = 'error',
}
