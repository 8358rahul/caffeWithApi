import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
} from '../redux/cartSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {TextButton} from '../components';
import AuthLayout from './AuthLayout';
const ConfirmOrder = ({navigation}) => {
  const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cartItems);

  return (
    <AuthLayout 
      title= {cart.length==0?'No Items In Cart':'Your Order'}
      subtitle={cart.length==0?'No Items In Cart':'Total - Rs. '+ cartTotalAmount + ', Items - '+cartTotalQuantity}
     
    > 
    <View 
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        width: '100%',
        height: '100%',
      }}
    >
    {cart.length != 0  ?
          <View >
            <View style={styles.innerView}>
              <Text style={[styles.hearder, {width: '30%'}]}>Product</Text>
              <Text style={[styles.hearder, {width: '30%'}]}>Quentity</Text>
              <Text style={styles.hearder}>Price</Text>
              <Text style={styles.hearder}>Total</Text>
            </View>

            {cart.map((item, index) => (
              <View key={index} style={styles.innerView}>
                <Divider />
                <Text style={{width: '30%', flexShrink: 1}}>{item.name}</Text>
                <View style={styles.btnStyle}>
                  <Pressable
                    onPress={() =>
                      item.cartQuantity === 1
                        ? dispatch(removeFromCart(item))
                        : dispatch(decreaseCart(item))
                    }>
                    <AntDesign
                      name={item.cartQuantity === 1 ? 'delete' : 'minuscircleo'}
                      size={20}
                      color={COLORS.black}
                    />
                  </Pressable>
                  <Text style={{...FONTS.h4}}>{item.cartQuantity}</Text>
                  <Pressable onPress={() => dispatch(addToCart(item))}>
                    <AntDesign
                      name="pluscircleo"
                      size={20}
                      color={COLORS.black}
                    />
                  </Pressable>
                </View>

                <Text style={{width: '20%', marginLeft: 30}}>{item.price}</Text>
                <Text style={{width: '20%', marginLeft: -30, paddingLeft: 15}}>
                  {item.totalPrice}
                </Text>
                <Divider />
              </View>
            ))}
            <View style={styles.innerView}>
              <TextButton
                label="Clear Cart"
                buttonContainerStyle={{ 
                  backgroundColor: COLORS.red,
                  width: '45%',
                  height: 45,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.red, 
                
                  
                }}
                labelStyle= {{
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                  ...FONTS.h6,
                }}
                onPress={() => dispatch(clearCart())}>

              </TextButton>
              <TextButton
                label="Confirm Order"
                buttonContainerStyle={{ 
                  backgroundColor: COLORS.primary,
                  width: '45%',
                  height: 45,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.primary, 
                }}
                labelStyle= {{
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                  ...FONTS.h6,

                }}
                onPress={() => navigation.navigate('Scan')}>

              </TextButton> 
            </View>
          </View>
          :null} 
          </View>
    </AuthLayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius-20,
    padding: 10,
    shadowColor: '#000',
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
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hearder: {
   ...FONTS.h5,
    width: '20%',
    fontFamily: FONTS.BalooExtra.fontFamily,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '650',
  },
 
});
