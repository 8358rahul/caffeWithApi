import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from '@jamsch/react-native-toastify';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const userLogin = createAsyncThunk(
  'userLogin',
  async ({email, password}) => {
    try {
      const response = await fetch('https://aceuss.3mad.in/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    tax: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoggedIn: false,
    user: {},
    status_id: '1',
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    addToCart: (state, action) => {
      
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.selectedItem.id,
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        if (action?.payload?.price.isHalf) {
          state.cartItems[itemIndex].half_price.quantity += 1;
        }
        if (action.payload?.selectedItem?.half_price) {
          if (action?.payload?.price) {
            state.cartItems[itemIndex].totalPrice +=
              action?.payload?.price.price;
          } else {
            state.cartItems[itemIndex].totalPrice += action?.payload?.price.price;
          }
        } else {
          state.cartItems[itemIndex].totalPrice =
            state.cartItems[itemIndex].quantity *
            state.cartItems[itemIndex].price;
        }
      } else {
        if (action?.payload?.price){
          let temp = {...action.payload.selectedItem};
          temp.quantity = 1;
          temp.totalPrice = action.payload.price.price;
          if (action?.payload?.price.isHalf) {
            temp.half_price.quantity = 1;
          }else{
            // temp.half_price = {quantity: 0, price: 0, name:null};
            temp.half_price.quantity = 0;
          }
          state.cartItems.push({...temp});
        } else {
          state.cartItems.push({
            ...action.payload.selectedItem,
            quantity: 1,
            totalPrice: action?.payload?.selectedItem?.price,
          });
        }
      }
    },   
      removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
      state.cartItems = nextCartItems;
      toast.error(`${action.payload.product} Removed`);
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
          state.cartItems[itemIndex].totalPrice =
            state.cartItems[itemIndex].quantity *
            state.cartItems[itemIndex].price;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }  
    },
    clearCart: state => {
      state.cartItems = [];
      toast.info('Cart Cleared');
    },
    getTotals: (state, action) => {
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      state.tax = 0;
      state.cartItems.forEach(item => {
        state.cartTotalQuantity += item.quantity;
        state.cartTotalAmount += item.totalPrice;
        state.tax = (state.cartTotalAmount * 15) / 100;
      });
    },

    addInstruction: (state, action) => {
      let flag = state.cartItems.find(
        (item, index) => index === action.payload.id,
      );
      if (flag) {
        let temp = state.cartItems[action.payload.id];
        temp.instructions = action.payload.instructions;
        // toast.success(`Instruction added`);
      } else {
        toast.error('Item is not in cart');
      }
    },

    removeInstruction: (state, action) => {
      let flag = state.cartItems.find(
        (item, index) => index === action.payload,
      );
      if (flag) {
        let temp = state.cartItems[action.payload];
        temp.instructions = '';
        toast.success(`Instruction removed`);
      } else {
        toast.error('Item is not in cart');
      }
    },    
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    },
  },
});

export const {
  saveUser,
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  addInstruction,
  removeInstruction,
  clearInstructions,
  addPendingOrder,
  addHalfPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
