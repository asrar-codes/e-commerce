import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartData = JSON.parse(localStorage.getItem("cartDetails"));

const initialState = {
  cartProducts: cartData ? cartData.cartProducts : [],
  totalPriceOfCart: 0,
  noOfItemsInCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      toast.success("Item Added To Cart");

      const sameProduct = state.cartProducts.find(
        (item) =>
          item.id == action.payload.id &&
          item.itemColor === action.payload.itemColor
      );
      // console.log(sameProduct);

      if (sameProduct) {
        const newProducts = state.cartProducts.map((item) => {
          if (
            item.id == action.payload.id &&
            item.itemColor == action.payload.itemColor
          ) {
            return {
              ...item,
              itemAmount:
                parseInt(item.itemAmount) + parseInt(action.payload.itemAmount),
            };
          }
          return item;
        });

        state.cartProducts = newProducts;
        return;
      }

      state.cartProducts = [...state.cartProducts, action.payload];
    },
    getCartTotals: (state, action) => {
      const newProducts = action.payload.reduce(
        (acc, currentItem) => {
          acc.noOfItems =
            parseInt(acc.noOfItems) + parseInt(currentItem.itemAmount);
          // console.log(currentItem);

          acc.totalPrice +=
            parseInt(currentItem.itemAmount) * parseInt(currentItem.price);

          return acc;
        },
        { noOfItems: 0, totalPrice: 0 }
      );
      localStorage.setItem(
        "cartDetails",
        JSON.stringify({
          cartProducts: state.cartProducts,
          noOfItemsInCart: newProducts.noOfItems,
          totalPriceOfCart: newProducts.totalPrice,
        })
      );
      state.noOfItemsInCart = newProducts.noOfItems;
      state.totalPriceOfCart = newProducts.totalPrice;
    },
    cartAmountChange: (state, action) => {
      const newCartProducts = state.cartProducts.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, itemAmount: action.payload.newAmount };
        }
        return { ...item };
      });
      // console.log(newCartProducts2);
      toast.success("Cart Updated!");
      state.cartProducts = newCartProducts;
    },
    removeCartItem: (state, action) => {
      const newCartProducts = state.cartProducts.filter(
        (item) => item.id != action.payload.id
      );

      state.cartProducts = newCartProducts;
      toast.success("Item removed from cart");
    },

    setCartProducts: (state, action) => {
      // console.log(action.payload.cartProducts);

      state.cartProducts = action.payload.cartProducts;
      state.totalPriceOfCart = action.payload.totalPriceOfCart;
      state.noOfItemsInCart = action.payload.noOfItemsInCart;
    },
  },
});

export const {
  addToCart,
  getCartTotals,
  cartAmountChange,
  removeCartItem,
  setCartProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
