import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConfirmOrder,
  Billing,
  Scan,
  Home,
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
} from '../screens';
import TabNavigation from './TabNavigation';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Home" component={TabNavigation} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Scan" component={Scan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
