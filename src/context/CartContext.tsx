import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
interface IContext {
  onAddToCart: (item: any) => void;
  carts: any[];
  price: number;
}
const CartContext = createContext<IContext>({
  carts: [],
  onAddToCart: () => {},
  price: 0,
});

const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carts] = useState([]);
  const onAddToCart = useCallback(item => {
    console.log('🚀 ~ file: CartContext.tsx:23 ~ onAddToCart ~ item:', item);
  }, []);

  const value = useMemo(() => {
    return { carts, onAddToCart };
  }, [carts, onAddToCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
// "orderItems": [
//   {
//       "itemId": "5c6d132e-ecd8-44fc-8667-ff36b31960d9",
//       "quantity": 2,
//       "itemName": "Bò lá lốt"
//   }
// ],
// "extraOptions": []
