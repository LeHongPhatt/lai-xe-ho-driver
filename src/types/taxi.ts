import { ILongLocation } from './location';

export enum TaxiOrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DRIVER_ARRIVED = 'DRIVER_ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
// 'MOTORBIKE', 'CAR4SEATS', 'CAR7SEATS'
export enum TaxiVehicle {
  MOTORBIKE = 'MOTORBIKE',
  CAR4SEATS = 'CAR4SEATS',
  CAR7SEATS = 'CAR7SEATS',
}

export const LableTaxiOrderStatus = {
  [TaxiOrderStatus.PENDING]: 'Chờ nhận cuốc',
  [TaxiOrderStatus.ACCEPTED]: 'Đang trên đường đón khách',
  [TaxiOrderStatus.DRIVER_ARRIVED]: 'Đã đến điểm đón',
  [TaxiOrderStatus.IN_PROGRESS]: 'Đang chở khách',
  [TaxiOrderStatus.COMPLETED]: 'Đã hoàn thành',
  [TaxiOrderStatus.CANCELLED]: 'Đã huỷ',
};

export const LableTaxiOrderNextAction = {
  [TaxiOrderStatus.ACCEPTED]: 'Đã đến điểm đón',
  [TaxiOrderStatus.DRIVER_ARRIVED]: 'Đã đón khách',
  [TaxiOrderStatus.IN_PROGRESS]: 'Đã trả khách',
};

export const ProcessingTaxiOrderStatus: TaxiOrderStatus[] = [
  TaxiOrderStatus.ACCEPTED,
  TaxiOrderStatus.IN_PROGRESS,
  TaxiOrderStatus.DRIVER_ARRIVED,
];

export const PROCESS_TAB_TAXI_ORDER = [
  { key: 'process', title: 'Hiện tại' },
  { key: 'history', title: 'home.home_tab.history' },
];

export interface ITaxiItem {
  customer: TaxiCustomer;
  driver: TaxiCustomer;
  pickup_location: LocationTaxi;
  dropoff_location: LocationTaxi;
  status: TaxiOrderStatus;
  reason: null;
  cancelledBy: string;
  _id: string;
  vehicle: TaxiVehicle;
  distance: number;
  price: number;
  id: string;
  pickup_date: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TaxiCustomer {
  avatar: null;
  full_name: null | string;
  phone_number: string;
  user_id: string;
  number_plate?: null;
}

export interface LocationTaxi extends ILongLocation {
  address: string;
}

export enum TaxiDeviceEvent {
  ON_ACCEPT_NEW_ORDER = 'ON_ACCEPT_NEW_ORDER',
  RELOAD_LIST_ORDER = 'RELOAD_LIST_ORDER',
}

export interface ITaxiState {
  orderWorking: null | ITaxiItem[];
}
