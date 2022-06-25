import { StyleSheet, Text, View, SafeAreaView, Dimensions,Image,Pressable,ScrollView } from 'react-native'
import React from 'react'
import { Button, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { removeFromCart, decreaseCart, addToCart, clearCart } from '../redux/cartSlice'
import AntDesign from 'react-native-vector-icons/AntDesign';
const ConfirmOrder = ({navigation}) => {
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems)


  return (
    <SafeAreaView style={{ flex: 1,marginTop: 20, marginHorizontal: 16,marginVertical: 16,}}>
      <ScrollView showsVerticalScrollIndicator={false}  
      contentContainerStyle={{ alignItems: 'center', }}>
     
      <Image source={icons.logo} style={{ width: 120,height: 120,backgroundColor:'#fff',borderRadius: 50, }} />
      {cart === undefined
        ? <Text style={{ fontSize: 20, alignItems: 'center', color: '#000' }}>No Items</Text>
        :
        (<View style={{ width: '100%',marginTop: 10, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around',   }}>
            <Text style={[styles.hearder,{width: '30%'}]} >Product</Text>
            <Text style={styles.hearder}>Quentity</Text>
            <Text style={styles.hearder}>Price</Text>
            <Text style={styles.hearder}>Total</Text>
          </View>
          
          {
            cart.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginHorizontal: 16,width:'100%'}}>
                <Divider />
                <Text style={{ flexShrink: 1,   ...FONTS.h4, width: '32%',marginLeft: -20,  }}>{item.name}</Text>
                <View style={{ flexDirection: 'row',justifyContent:'space-evenly' ,width: '20%',  }}>
                <Pressable onPress={()=>item.cartQuantity===1?dispatch(removeFromCart(item)):dispatch(decreaseCart(item))} >
                  <AntDesign name={item.cartQuantity===1?'delete':'minuscircleo'} size={20} color={COLORS.black} />
                </Pressable>
                <Text style={{ ...FONTS.h4, }}>{item.cartQuantity}</Text>
                <Pressable onPress={() => dispatch(addToCart(item))}>
                  <AntDesign name="pluscircleo" size={20} color={COLORS.black} />
                </Pressable>
                </View>

                <Text style={{ ...FONTS.h4,width:'20%'}} >{item.price}</Text>
                <Text style={{ ...FONTS.h4, width:'20%'}} >{item.totalPrice}</Text>
                <Divider />
              </View>
            ))
          }
          <View style={{   justifyContent: 'space-around', marginTop: 20,marginHorizontal: 16,marginLeft: 20, }}>
            <Button icon="delete" mode="outlined" color={COLORS.black}
              onPress={() => dispatch(clearCart())}
              
            >Clear Cart</Button>
            <Text numeric style={styles.total}>Total Quentity - {cartTotalQuantity}</Text>
            <Text numeric style={[styles.total,{marginTop: 5,}]} >Total Price - {cartTotalAmount}</Text>
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
  hearder:{
    ...FONTS.h3, color: COLORS.black ,width: '20%',

  },
  total:{
    ...FONTS.h4, color:COLORS.black,marginTop: 10, 
  }
})