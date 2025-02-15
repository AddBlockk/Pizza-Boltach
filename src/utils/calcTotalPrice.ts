import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    if (isNaN(obj.price) || isNaN(obj.count)) {
      console.error("Invalid price or count in cart item:", obj);
      return sum;
    }
    return obj.price * obj.count + sum;
  }, 0);
};
