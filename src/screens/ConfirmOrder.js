import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Button, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { removeFromCart, decreaseCart, addToCart, clearCart } from '../redux/cartSlice'
import AntDesign from 'react-native-vector-icons/AntDesign';
const ConfirmOrder = ({ navigation }) => {
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems)


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Image source={icons.logo} style={{ width: 120, height: 120, backgroundColor: '#fff', }} />
        {cart.length === 0
          ? <Text style={{ fontSize: 20, alignItems: 'center', color: '#000', fontFamily: FONTS.BalooExtra.fontFamily, marginTop: 30, }}>No Items</Text>
          :
          (
            <View style={styles.subContainer}>
              <View style={styles.innerView}>
                <Text style={[styles.hearder, { width: '30%' }]} >Product</Text>
                <Text style={[styles.hearder, { width: '30%' }]}>Quentity</Text>
                <Text style={styles.hearder}>Price</Text>
                <Text style={styles.hearder}>Total</Text>
              </View>

              {
                cart.map((item, index) => (
                  <View key={index} style={styles.innerView}>
                    <Divider />
                    <Text style={{ width: '30%',flexShrink:1 }}>{item.name}</Text>
                    <View style={styles.btnStyle}>
                      <Pressable onPress={() => item.cartQuantity === 1 ? dispatch(removeFromCart(item)) : dispatch(decreaseCart(item))}
                      >
                        <AntDesign name={item.cartQuantity === 1 ? 'delete' : 'minuscircleo'} size={20} color={COLORS.black} />
                      </Pressable>
                      <Text style={{ ...FONTS.h4, }}>{item.cartQuantity}</Text>
                      <Pressable onPress={() => dispatch(addToCart(item))}>
                        <AntDesign name="pluscircleo" size={20} color={COLORS.black} />
                      </Pressable>
                    </View>

                    <Text style={{ width: '20%', }}>{item.price}</Text>
                    <Text style={{ width: '20%', }}>{item.totalPrice}</Text>
                    <Divider />
                  </View>
                ))
              }
              <View style={{ justifyContent: 'space-around', marginTop: 20, marginHorizontal: 16, marginLeft: 20, }}>
                <Button icon="delete" mode="outlined" color={COLORS.black}
                  onPress={() => dispatch(clearCart())}

                >Clear Cart</Button>
                <Text numeric style={styles.total}>Total Quentity - {cartTotalQuantity}</Text>
                <Text numeric style={[styles.total, { marginTop: 5, }]} >Total Price - {cartTotalAmount}</Text>
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
                  }}
                  onPress={() => navigation.navigate('Billing')}
                >
                  Confirm Order</Button>
              </View>
            </View>
          )
        }
      </ScrollView>

    </SafeAreaView>
  )
}

export default ConfirmOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.white,


  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    marginLeft: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,


  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    marginLeft: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  btnStyle: {
    flexDirection: 'row',
    width: '30%',
    height: 40,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  hearder: {
    ...FONTS.h4, color: COLORS.black, width: '20%',

  },
  total: {
    ...FONTS.h4, color: COLORS.black, marginTop: 10,
  }
})