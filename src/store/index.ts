import categories from './categories/Reducer';
import home from './home/Reducer';
import location from './location/Reducer';
import notify from './notify/Reducer';
import user from './user/Reducer';
import order from './order/Reducer';
import taxi from './taxi/Reducer';

// Just in case want to switch
import taxiApi from './taxi/Api';
import orderApi from './order/Api';

const reducer = {
  user,
  notify,
  location,
  home,
  categories,
  order,
  taxi: taxi.reducer,
};

const apiReducer = {
  [taxiApi.reducerPath]: taxiApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
};

const apiMiddleware = [taxiApi.middleware, orderApi.middleware];

export { reducer, apiReducer, apiMiddleware };

export default { ...reducer, ...apiReducer };
