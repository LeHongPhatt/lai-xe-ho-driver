import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { EnumOTP } from 'types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Categories: undefined;
  Intro: undefined;
  HomeTabs: undefined;
  InputPhone: undefined;
  CartOrder: undefined;
  CheckOrder: undefined;
  OrderDetail: {
    orderCode?: string;
  };
  MethodPayment: undefined;
  Delivery: {
    orderCode?: string;
  };
  DeliveryAddress: undefined;
  InputAddress: undefined;
  HistoryActivity: undefined;
  Biker: undefined;
  Notification: undefined;
  ChangePassword: undefined;
  ContactSupport: undefined;
  InfoUser: undefined;
  Term: undefined;
  RequestDelivery: undefined;
  Rating: undefined;
  RatingBiker: undefined;
  RatingRestaurant: undefined;
  Income: undefined;
  TaxiOrderDetail: {
    id?: string;
  };
  OTP: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
    isOTPExpired?: boolean;
  };
  Register: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
  InputPassword: {
    phone_number: string;
    type_check: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
  KYC: {
    phoneNumber: string;
    password: string;
    userId: string;
    typeScreen: string;
  };
  Categoires: {
    searchText: string;
  };
  RestaurantDetail: {
    restaurantId: string;
  };
  ExtraFood: {
    foodId: string;
  };
  ResetPassword: {
    phoneNumber: string;
    typeCheck: EnumOTP.FORGOT | EnumOTP.REGISTER;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;
