import { createAction, props } from '@ngrx/store';
import { CartItem, ProductItem, Review } from 'src/app/interfaces/store';

//Fill products action
export const fillProducts = createAction(
  'FILL_PRODUCTS',
  props<{ payload: Array<ProductItem> }>()
);
//Add Review to product item action
export const alterReview = createAction(
  'ALTER_REVIEW',
  props<{ payload: ProductItem }>()
);
//Empty product list action
export const resetProducts = createAction('RESET_PRODUCTS');
//Add product item to wishlist action
export const addToWishList = createAction(
  'ADD_TO_WISHLIST',
  props<{ payload: ProductItem }>()
);
//Remove product item from wishlist action
export const removeFromWishList = createAction(
  'REMOVE_FROM_WISHLIST',
  props<{ payload: ProductItem }>()
);
//Fill wishlist items action
export const fillWishList = createAction(
  'FILL_WISHLIST',
  props<{ payload: Array<ProductItem> }>()
);
//Reset wishlist items action
export const resetWishList = createAction('RESET_WISH_LIST');
//Fill cartlist items action
export const fillCartList = createAction(
  'FILL_CART',
  props<{ payload: Array<CartItem> }>()
);
//Add product item to cart action
export const addToCart = createAction(
  'ADD_TO_CART',
  props<{ payload: CartItem }>()
);
//Remove product item from cart action
export const removeFromCart = createAction(
  'REMOVE_FROM_CART',
  props<{ payload: { id: string } }>()
);
//Increase cart quantity action
export const updateCartItem = createAction(
  'UPDATE_CART_ITEM',
  props<{ payload: CartItem }>()
);
//Reset cart action
export const resetCart = createAction('RESET_CART');
