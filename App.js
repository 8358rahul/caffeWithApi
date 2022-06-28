import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./src/redux/cartSlice";
import StackNavigation from "./src/navigation/StackNavigation";
import { Provider as PaperProvider } from 'react-native-paper';
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StackNavigation />
      </PaperProvider>
    </Provider>
  );
};

export default App;
