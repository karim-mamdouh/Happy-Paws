import { createReducer, on } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import {
  addReview,
  addToCart,
  addToWishList,
  decrementCartItem,
  fillProducts,
  fillWishList,
  incrementCartItem,
  removeFromCart,
  removeFromWishList,
  resetCart,
  resetProducts,
  resetWishList,
} from './store-actions';

const initalState = {
  products: [] as Array<ProductItem>,
  wishList: [] as Array<ProductItem>,
  cart: [] as Array<CartItem>,
};

export const storeReducer = createReducer(
  initalState,
  //Fill products action
  on(fillProducts, (state, action) => {
    return {
      ...state,
      products: [...state.products, ...action.payload],
    };
  }),
  //Reset products action
  on(resetProducts, (state, action) => {
    return {
      ...state,
      products: [] as Array<ProductItem>,
    };
  }),
  //Add new review to product item in store action
  on(addReview, (state, action) => {
    let product = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (product === undefined) {
      throw new Error('Item not found, check item id');
    }
    product?.reviews.push(action.payload.review);
    return {
      ...state,
      products: [
        ...state.products.filter((element) => element.id !== action.payload.id),
        product!,
      ],
    };
  }),
  //Add product item to wishlist action
  on(addToWishList, (state, action) => {
    return {
      ...state,
      wishList: [...state.wishList, action.payload],
    };
  }),
  //Remove product item from wishlist action
  on(removeFromWishList, (state, action) => {
    return {
      ...state,
      wishList: state.wishList.filter(
        (element) => element.id !== action.payload.id
      ),
    };
  }),
  //Fill wishlist items action
  on(fillWishList, (state, action) => {
    return {
      ...state,
      wishList: [...state.wishList, ...action.payload],
    };
  }),
  //Reset wishlist items action
  on(resetWishList, (state, action) => {
    return {
      ...state,
      wishList: [] as Array<ProductItem>,
    };
  }),
  //Add product item to cart action
  on(addToCart, (state, action) => {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }),
  //Remove from cart action
  on(removeFromCart, (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((element) => element.id !== action.payload.id),
    };
  }),
  //Increment cart item quantity action
  on(incrementCartItem, (state, action) => {
    let cartItem = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (cartItem === undefined) {
      throw new Error('Item not found, check item id');
    }
    cartItem.count = cartItem?.count + 1;
    return {
      ...state,
      cart: [
        ...state.cart.filter((element) => element.id !== action.payload.id),
        cartItem!,
      ],
    };
  }),
  //Decrement cart item quantity action
  on(decrementCartItem, (state, action) => {
    let cartItem = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (cartItem === undefined) {
      throw new Error('Item not found, check item id');
    }
    if (cartItem.count > 0) {
      cartItem.count = cartItem?.count - 1;
      return {
        ...state,
        cart: [
          ...state.cart.filter((element) => element.id !== action.payload.id),
          cartItem!,
        ],
      };
    } else {
      return {
        ...state,
      };
    }
  }),
  //Reset cart action
  on(resetCart, (state, action) => {
    return {
      ...state,
      cart: [] as Array<CartItem>,
    };
  })
);
