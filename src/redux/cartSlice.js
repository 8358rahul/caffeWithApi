import { createSlice } from "@reduxjs/toolkit";
import { toast } from '@jamsch/react-native-toastify';



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        tax: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].cartQuantity*state.cartItems[itemIndex].price;
                toast.info(`Incresed ${state.cartItems[itemIndex].name} quantity`)
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1,totalPrice:action.payload.price};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} Added`)
            }

        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.name} Removed`)

        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity -= 1
                    state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].cartQuantity*state.cartItems[itemIndex].price;
                    toast.info(`Decresed ${state.cartItems[itemIndex].name} quantity`)
                } else {
                    state.cartItems.splice(itemIndex, 1)
                    toast.error(`${action.payload.name} item is deleted`)
                }
            }
            else {
                toast.error(`${action.payload.name} Item is not in cart`)
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
        }

    }
});


export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;