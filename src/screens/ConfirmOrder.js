import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, Pressable, ScrollView, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { removeFromCart, decreaseCart, addToCart, clearCart } from '../redux/cartSlice'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
const ConfirmOrder = ({ navigation }) => {
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems)
 


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={icons.logo} style={{ width: 120, height: 120, backgroundColor: '#fff', }} />
          <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: '#000', }}>Your Order</Text>
        </View>
        {cart.length === 0
          ? <Text style={{ fontSize: 20, alignItems: 'center', color: '#000', fontFamily: FONTS.BalooExtra.fontFamily, marginTop: 30, }}>No Items</Text>
          :
          (
            <View style={styles.subContainer}>
              <View style={styles.innerView}>
                <Text style={[styles.hearder, { width: '30%' }]}>Product</Text>
                <Text style={[styles.hearder, { width: '30%' }]}>Quentity</Text>
                <Text style={styles.hearder}>Price</Text>
                <Text style={styles.hearder}>Total</Text>
              </View>

              {
                cart.map((item, index) => (
                  <View key={index} style={styles.innerView}>
                    <Divider />
                    <Text style={{ width: '30%', flexShrink: 1 }}>{item.name}</Text>
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

                    <Text style={{ width: '20%',marginLeft: 30,  }}>{item.price}</Text>
                    <Text style={{ width: '20%',marginLeft: -30,paddingLeft:15 }}>{item.totalPrice}</Text>
                    <Divider />
                  </View>
                ))
              }
              <View style={[styles.innerView, { width: '85%', }]}>
                <Text style={styles.bottomHeader}>Total Quentity - {cartTotalQuantity}</Text>
                <Text style={styles.bottomHeader}>Total Price - {cartTotalAmount}</Text>
              </View>
              <View style={styles.bottomBtn}>
                <TouchableOpacity onPress={() => dispatch(clearCart())}
                  style={[styles.btnStyle, {
                    backgroundColor: 'red',
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }]}>

                  <Text
                    style={{
                      ...FONTS.h5,
                      color: '#fff',
                      fontWeight: 'bold',

                    }}
                  >Clear Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnStyle, {
                    backgroundColor: COLORS.primary,
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }]}
                  onPress={() =>  navigation.navigate('Scan')}
                >
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: '#fff',
                      fontWeight: 'bold',

                    }}
                  >ConfirmOrder</Text>
                </TouchableOpacity>
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

    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: "#000",
    marginVertical: 16,
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
    marginTop: 10,
    marginHorizontal: 10,
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
    fontSize: SIZES.font * 1.2,
    width: '20%',
    fontFamily: FONTS.BalooExtra.fontFamily,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',

  },
  bottomHeader: {
    fontSize: SIZES.font * 1.2,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: FONTS.BalooExtra.fontFamily,


  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    padding: 10,
  }






})