import { NavigationService, Routes } from 'navigation';

export interface ICategory {
  icon: string;
  queue_number: string;
  type: TTypeCategory;
  name: string;
  id: string;
  defaultIcon?: string;
  onPress?: () => void;
}
export interface IHomeState {
  loading: boolean;
  listCategories: any[];
  listPromotions: any[];
  listSuggests: any[];
}
export enum ETypeCategory {
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  BOOKING = 'BOOKING',
  PROMOTION = 'PROMOTION',
  MOTORBIKE_BOOKING = 'MOTORBIKE_BOOKING',
  DELIVERY = 'DELIVERY',
  COSMETIC = 'COSMETIC',
  DOMESTIC_WOKER = 'DOMESTIC_WOKER',
}
export type TTypeCategory =
  | ETypeCategory.FOOD
  | ETypeCategory.DRINK
  | ETypeCategory.BOOKING
  | ETypeCategory.PROMOTION
  | ETypeCategory.MOTORBIKE_BOOKING
  | ETypeCategory.DELIVERY
  | ETypeCategory.COSMETIC
  | ETypeCategory.DOMESTIC_WOKER;
interface ITypeCategory {
  icon: string;
  screen?: string;
  onPress?: () => void;
}
export const DATA_CATEGORY: Record<ETypeCategory, ITypeCategory> = {
  [ETypeCategory.FOOD]: {
    icon: 'food',
  },
  [ETypeCategory.DRINK]: {
    icon: 'drink',
  },
  [ETypeCategory.BOOKING]: {
    icon: 'booking',
  },
  [ETypeCategory.PROMOTION]: {
    icon: 'promotion',
  },
  [ETypeCategory.MOTORBIKE_BOOKING]: {
    icon: 'biker',
    onPress: () => NavigationService.navigate(Routes.Biker),
  },
  [ETypeCategory.DELIVERY]: {
    icon: 'delivery',
    onPress: () => NavigationService.navigate(Routes.RequestDelivery),
  },
  [ETypeCategory.COSMETIC]: {
    icon: 'comestic',
    onPress: () => {},
  },
  [ETypeCategory.DOMESTIC_WOKER]: {
    icon: 'working',
    onPress: () => {},
  },
};
