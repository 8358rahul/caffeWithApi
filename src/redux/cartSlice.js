import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from '@jamsch/react-native-toastify';

export const userLogin = createAsyncThunk(
    "userLogin",
    async ({email,password} ) => {
        try {
            const response = await fetch('http://aceuss.3mad.in/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            });
            const data = await response.json();
            return data;
    }
    catch (error) {
        console.log(error);
    }
}
)
 

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        tax: 0,
        msg:[],
        isLoading: false,
        isError: false,
        isSuccess: false,
        isLoggedIn: false,
        user: {}, 

    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        }, 
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].cartQuantity*state.cartItems[itemIndex].price;
                toast.info(`${state.cartItems[itemIndex].title} Incresed`)
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1,totalPrice:action.payload.price};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} Added`)
            }

        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.title} Removed`)

        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity -= 1
                    state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].cartQuantity*state.cartItems[itemIndex].price;
                    toast.info(`${state.cartItems[itemIndex].title} Decresed`)
                } else {
                    state.cartItems.splice(itemIndex, 1)
                    toast.error(`${action.payload.title} item is deleted`)
                }
            }
            else {
                toast.error(`${action.payload.title} Item is not in cart`)
            }

        },
        clearCart: (state) => {
            state.cartItems = [];
            toast.info("Cart Cleared")
        },
        getTotals: (state, action) => {
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            state.tax = 0;
            state.cartItems.forEach((item) => {
                state.cartTotalQuantity += item.cartQuantity;
                state.cartTotalAmount += item.cartQuantity * item.price;
                state.tax = state.cartTotalAmount * 15 / 100;
            }
            )
        },
        
        addInstruction: (state, action) => {
            state.msg.push(action.payload);
            toast.success(`${action.payload} instruction added`)
        }


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

}
});


export const { saveUser,addToCart, removeFromCart, decreaseCart, clearCart, getTotals,addInstruction } = cartSlice.actions;
export default cartSlice.reducer;