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
  Alert,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, SIZES, COLORS, FONTS,FAMILY} from '../constants';
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  addInstruction,
} from '../redux/cartSlice';
import {Divider,Button} from 'react-native-paper';
import {TextButton,FormInput} from '../components';
import AuthLayout from './AuthLayout';




const ConfirmOrder = (props) => {
  const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const {msg} = useSelector(state => state.cart);
  const cart = useSelector(state => state.cart.cartItems);
  const [instructions, setInstructions] = React.useState('');
  const [abc, setAbc] = React.useState(true);




  
const createTwoButtonAlert = () =>(
  Alert.alert(
    "Alert Title",
    "Are you sure you want to continue without instructions?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () =>props.navigation.navigate('Billing',{number:props?.route?.params?.number}) }
    ]
  ))

  return (
    <AuthLayout 
      title= {cart.length==0?'No Items In Cart':`Table - ${props?.route?.params?.number}`}
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
                <Text style={{width: '30%', flexShrink: 1,fontFamily:FAMILY.regular}}>{item.title}</Text>
                <View style={styles.btnStyle}>
                  <Button 
                    onPress={() =>item.cartQuantity==1?dispatch(removeFromCart(item)):dispatch(decreaseCart(item))}
                    mode="elevated"
                    icon={item.cartQuantity==1?'delete':'minus'}
                    style={{marginHorizontal: 10, marginLeft: 30,}}
                  />
                  <Text style={{...FONTS.h4, marginLeft: 5, fontFamily:FAMILY.regular,marginTop: 7,}}>{item.cartQuantity}</Text>
                    <Button 
                    onPress={() => dispatch(addToCart(item))}
                    mode="elevated"
                    icon={'plus'}
                    style={{marginHorizontal: 10,marginLeft:30 }}
                  />
                </View>

                <Text style={{width: '20%', marginLeft: 30, fontFamily:FAMILY.regular}}>{item.price}</Text>
                <Text style={{width: '20%', marginLeft: -30, paddingLeft: 15,fontFamily:FAMILY.regular}}>
                  {item.totalPrice}
                </Text>
              </View>
            ))}
            <View style={{
                 flex: 1,
                  marginTop: SIZES.padding * 1,
                  marginBottom: SIZES.padding * 1,
            }}>
            <FormInput
            label="Instructions*"
            placeholder="Add cooking instructions"
            value={instructions}
            onChange={text =>{
              setAbc(false);
              setInstructions(text)}}
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',

                }}>
                <TouchableOpacity
                  onPress={() =>{ 
                  setAbc(true);
                  dispatch(addInstruction(instructions))
                  setInstructions('')
                    
                    }}>
               
                <Image
                  source={icons.plus}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:COLORS.black
                         
                  }}
                />
                </TouchableOpacity>
              </View>
            }
          />{msg.length==0?null:
            <View style={{
              marginTop: 10,
            }}>
      
      <Text style={{ color: COLORS.blue,  }}>
      * Cooking instructions :
    </Text>
    {
        msg.map((item, index) => (
          <Text style={{color: COLORS.blue,fontFamily:FAMILY.light }}>
         {index+1}{' )'} &nbsp;{item}
        </Text>

        ))
    } 
    </View>  }
            </View>

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
                  fontFamily: FAMILY.bold,
                
                  
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
                  fontFamily: FAMILY.bold,

                }}
              onPress={() =>{ 
                  abc?
                props.navigation.navigate('Billing',{number:props?.route?.params?.number})
                : createTwoButtonAlert()
              }}>

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
    width: '25%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
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
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontFamily:FAMILY.semiBold
  },
 
});
