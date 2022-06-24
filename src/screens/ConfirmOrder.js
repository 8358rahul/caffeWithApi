import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Button, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { removeFromCart, decreaseCart, addToCart, clearCart } from '../redux/cartSlice'
import { Table, Row, Rows } from 'react-native-table-component';
const ConfirmOrder = () => {
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems)


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 20, }}>
      <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: '#000' }}>Bill</Text>
      {cart === undefined
        ? <Text style={{ fontSize: 20, alignItems: 'center', color: '#000' }}>No Items</Text>
        :
        (<View style={{ width: '100%', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, }}>
            <Text style={{ ...FONTS.h3, color: COLORS.black }} >Product Name</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>Total Quentity</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.black }} >Total Price</Text>
          </View>
          {
            cart.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, }}>
                <Divider />
                <Text style={{ flexShrink: 1, width: 110, }}>{item.name}</Text>


                <Button icon={item.cartQuantity === 1 ? 'delete' : 'minus'}
                  onPress={() => {
                    item.cartQuantity === 1 ? dispatch(removeFromCart(item)) : dispatch(decreaseCart(item))
                  }}
                ></Button>
                <Text style={{ marginTop: 5,width: 100, }}>{item.cartQuantity}</Text>
                <Button icon="plus" onPress={() => dispatch(addToCart(item))}></Button>

                <Text style={{ marginRight: 70, }}>{item.price}</Text>
                <Divider />
              </View>
            ))
          }

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginLeft: -10, }}>
            <Button icon="delete" color={COLORS.darkgray}
              onPress={() => dispatch(clearCart())}
            >Clear Cart</Button>
            <Text numeric style={{ ...FONTS.h5, marginTop: 6, }}>Total Quentity - {cartTotalQuantity}</Text>
            <Text numeric style={{ ...FONTS.h5, marginTop: 6, }} >Total Price - {cartTotalAmount}</Text>
          </View>
          <View style={{ marginTop: 10, }}>
            <Button mode="contained"
              color={COLORS.primary}
              contentStyle={{
                width: "100%",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,

              }}
              labelStyle={{
                fontSize: SIZES.font * 1.1,
                fontWeight: "bold",
                color: COLORS.white,
                marginTop: 4,
              }} >
              Confirm Order</Button>
          </View>


        </View>)

      }

    </SafeAreaView>
  )
}

export default ConfirmOrder

const styles = StyleSheet.create({})