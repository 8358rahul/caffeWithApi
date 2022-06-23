import { createSlice } from "@reduxjs/toolkit";
import { toast } from '@jamsch/react-native-toastify';
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalPrice: 0,
        totalItems: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                console.log(state.cartItems[itemIndex].cartQuantity)
                toast.info(`Incresed ${state.cartItems[itemIndex].name} quantity`)
            } else {
            const tempProduct = {...action.payload, cartQuantity: 1};
            state.cartItems.push( tempProduct );
            console.log(state.cartItems);
            toast.success(`${action.payload.name} Added `)
            }
        }    
        
    }
});
        

export const { addToCart,   } = cartSlice.actions;
export default cartSlice.reducer;