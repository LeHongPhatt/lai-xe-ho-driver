import { ILongLocation } from './location';

export enum EStatus {
  RECEIVE = 'receive',
  SUCCESS = 'success',
  CANCEL = 'cancel',
}

export enum OrderStatus {
  WAITTING_DRIVER_ACCEPT = 'WAITTING_DRIVER_ACCEPT',
  DRIVER_PICKING = 'DRIVER_PICKING',
  RESTAURANT_DONE = 'RESTAURANT_DONE',
  DRIVER_DELIVERING = 'DRIVER_DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCEL = 'CANCEL',
}

export const ProcessingOrderStatus = [
  'WAITTING_DRIVER_ACCEPT',
  'DRIVER_PICKING',
  'RESTAURANT_DONE',
  'DRIVER_DELIVERING',
];

export const LableStatus = {
  [OrderStatus.WAITTING_DRIVER_ACCEPT]: 'Chờ tài xế',
  [OrderStatus.DRIVER_PICKING]: 'Chờ lấy hàng',
  [OrderStatus.RESTAURANT_DONE]: 'Nhà hàng chuẩn bị xong',
  [OrderStatus.DRIVER_DELIVERING]: 'Đang giao hàng',
  [OrderStatus.DELIVERED]: 'Đã giao hàng',
  [OrderStatus.CANCEL]: 'Đơn đã huỷ',
};

export const ButtonNextStatus = {
  [OrderStatus.WAITTING_DRIVER_ACCEPT]: 'WAITTING_DRIVER_ACCEPT',
  [OrderStatus.DRIVER_PICKING]: 'Chờ lấy hàng',
  [OrderStatus.RESTAURANT_DONE]: 'Xác nhận đã lấy hàng',
  [OrderStatus.DRIVER_DELIVERING]: 'Xác nhận đã giao hàng',
  [OrderStatus.DELIVERED]: 'Đã giao hàng',
  [OrderStatus.CANCEL]: 'CANCEL',
};

export const PROCESS_TAB_IDS = {
  PROCESSING: 'processing',
  HISTORY: 'history',
};

export const PROCESS_TAB_ORDER = [
  { key: PROCESS_TAB_IDS.PROCESSING, title: 'home.home_tab.processing' },
  { key: PROCESS_TAB_IDS.HISTORY, title: 'home.home_tab.history' },
];

export interface IOrderItem {
  _id: string;
  driver: Driver;
  note: any;
  discount_id: any;
  discount_order: number;
  discount_shipping: number;
  payment_method: string;
  payment_status: string;
  status: OrderStatus;
  cancel_reason: any;
  currency_type: string;
  order_code: string;
  customer: Customer;
  customer_catalog_id: string;
  restaurant_id: string;
  shipping_fee: number;
  total_price: number;
  order_price: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  order_items: OrderItem[];
  restaurant: Restaurant[];
}

export interface Driver {
  user_id: string;
  full_name: any;
  avatar: any;
  phone_number: string;
  number_plate: any;
}

export interface Customer {
  user_id: string;
  address: string;
  full_name: string;
  lat: string;
  long: string;
  user_phone: string;
}

export interface OrderItem {
  _id: string;
  currency_type: string;
  extra_options: any[];
  order_code: string;
  item_id: string;
  price: number;
  quantity: number;
  item_name: string;
  id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  _id: string;
  location: ILongLocation;
  location_v2: LocationV2;
  open_time: OrderOpenTime;
  contact: OrderContact;
  bank_information: OrderBankInformation;
  status: string;
  stop_time: string;
  balance_amount: number;
  avatar: string;
  name: string;
  address: string;
  id: string;
  managers: Manager[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LocationV2 {
  type: string;
  coordinates: number[];
}

export interface OrderOpenTime {
  day: string;
  time: string;
}

export interface OrderContact {
  phone: string;
  email: string;
}

export interface OrderBankInformation {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface Manager {
  user_id: string;
  _id: string;
}

export interface IPayloadOrder {
  isObject?: boolean;
  redirect?: boolean;
  isPaginate?: boolean;
  body?: any;
  isPagination?: boolean;
  type?: string | undefined | null;
  endPoint?: string;
  headers?: any;
  params?: any;
  dataKey?: string;
}

export interface IOrderPayload {
  payload: IPayloadOrder;
  callback?: IPayloadOrder;
}

export type TStatus = EStatus.RECEIVE | EStatus.SUCCESS | EStatus.CANCEL;
