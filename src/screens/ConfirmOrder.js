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
  BackHandler,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, SIZES, COLORS, FONTS, FAMILY} from '../constants';
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  addInstruction,
  removeInstruction,
  addPendingOrder,
  clearInstructions,
} from '../redux/cartSlice';
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import {TextButton, FormInput} from '../components';
import AuthLayout from './AuthLayout';
import {toast} from '@jamsch/react-native-toastify';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';

const ConfirmOrder = props => {
  const dispatch = useDispatch();
  const {status_id, cartTotalQuantity, cartTotalAmount, tax, cartItems} =
    useSelector(state => state.cart);
  const [instructions, setInstructions] = React.useState('');
  const [abc, setAbc] = React.useState();
  //Modal open
  const [visible, setVisible] = React.useState(false);
  let tempCartItems = cartItems;
  let abcd = tempCartItems.map((item, index) => {
    let tempObj = {...item, product_menu_id: item.id, 
      // name: item.product
    };
    delete tempObj.product;
    delete tempObj.id;
    delete tempObj.price;
    delete tempObj.description;
    delete tempObj.totalPrice;
    delete tempObj.subcategory_id;
    delete tempObj.updated_at;
    delete tempObj.created_at;
    return tempObj;
  });
  let reducerdata1 = {
    table_number: 25,
    // table_number: props?.route?.params?.number,
    order_status: status_id,
    totalQuantity: cartTotalQuantity,
    totalAmount: cartTotalAmount,
    taxes: tax,
    order_contains: cartItems,
  };
  let reducerdata = {
    table_number: 21,
    // table_number: props?.route?.params?.number,
    order_status: status_id,
    order_contains: abcd,
  };
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.navigation.navigate('Home');
        return true;
      },
    );
    return () => backHandler.remove();
  }, []); 
 

  const addDraftOrder = async() => {
    let response = await apiService('POST',ApiEndpoints.ORDERS, reducerdata);
    props.navigation.navigate('Billing', {response: reducerdata1});
    console.log('response---------------1', response);
    if (response.status === 'success') {
      dispatch(clearCart());
      dispatch(clearInstructions());
    }

  }
 

  return (
    <AuthLayout
      title={
        cartItems.length == 0
          ? 'No Items In Cart'
          : `Table - ${props?.route?.params?.number}`
      }
      subtitle={
        cartItems.length == 0
          ? 'No Items In Cart'
          : 'Total - Rs. ' + cartTotalAmount + ', Items - ' + cartTotalQuantity
      }>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            margin: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FormInput
              label="Instructions"
              placeholder="Write a cooking instructions"
              containerStyle={{
                width: '100%',
              }}
              inputStyle={{
                fontFamily: FAMILY.medium,
                fontSize: FONTS.medium,
                color: COLORS.black,
              }}
              value={instructions}
              onChange={text => {
                setInstructions(text);
              }}
            />
            <TextButton
              instructions={instructions}
              label="ADD"
              buttonContainerStyle={{
                backgroundColor: COLORS.primary,
                width: '100%',
                height: 45,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.red,
                fontFamily: FAMILY.bold,
                marginTop: 10,
              }}
              labelStyle={{
                fontWeight: 'bold',
                paddingHorizontal: 10,
                ...FONTS.h4,
                color: COLORS.white,
              }}
              onPress={() => {
                dispatch(addInstruction({instructions: instructions, id: abc}));
                setInstructions('');
                setVisible(false);
              }}></TextButton>
          </View>
        </Modal>
      </Portal>

      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.padding,
          width: '100%',
          height: '100%',
        }}>
        {cartItems.length != 0 ? (
          <View
          // style={{
          //   flex: 1,
          //   paddingVertical: SIZES.padding,
          //   width: '100%',
          //   height: '100%',
          // }}
          >
            {/* <View style={styles.innerView}>
              <Text style={[styles.hearder, {width: '30%'}]}>Product</Text>
              <Text style={[styles.hearder, {width: '30%'}]}>Quentity</Text>
              <Text style={styles.hearder}>Price</Text>
              <Text style={styles.hearder}>Total</Text>
            </View> */}

            {cartItems.map((item, index) => (
              <View key={index}>
                <View style={styles.innerView}>
                  <View
                    style={{
                      width: '30%',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        marginLeft: SIZES.padding - 30,
                        flexShrink: 1,
                        fontFamily: FAMILY.regular,
                      }}>
                      {item.product}
                    </Text>
                  </View>
                  <View style={styles.btnStyle}>
                    <Button
                      onPress={() =>
                        item.quantity == 1
                          ? dispatch(removeFromCart(item))
                          : dispatch(decreaseCart(item))
                      }
                      mode="elevated"
                      icon={item.quantity == 1 ? 'delete' : 'minus'}
                      style={{marginHorizontal: 10, marginLeft: 30}}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        marginLeft: 5,
                        fontFamily: FAMILY.regular,
                        marginTop: 7,
                      }}>
                      {item.quantity}
                    </Text>
                    <Button
                      onPress={() => dispatch(addToCart(item))}
                      mode="elevated"
                      icon={'plus'}
                      style={{marginHorizontal: 10, marginLeft: 30}}
                    />
                  </View>
                  <View
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontFamily: FAMILY.regular,
                      }}>
                      {item.price}
                    </Text>

                    {/* <Text
                  style={{
                    width: '20%',
                    marginLeft: -50,
                    paddingLeft: 15,
                    fontFamily: FAMILY.regular,
                  }}>
                  {item.totalPrice}
                </Text> */}

                    {/* <TouchableOpacity
                      onPress={() => {
                        setVisible(true);
                        setAbc(index);
                      }}>
                      <Image
                        source={icons.plus}
                        style={{
                          height: 20,
                          width: 20,
                          tintColor: COLORS.black,
                        }}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>

                {/* //input filed for instructions */}

                {item.instructions == '' ? (
                  <FormInput
                    placeholder="Write a cooking instructions"
                    containerStyle={{
                      marginTop: SIZES.padding - 30,
                      borderRadius: 10,
                    }}
                    value={instructions}
                    onChange={text => {
                      setInstructions({text: text, index: index});
                      // setAbc(index);
                    }}
                    appendComponent={
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: SIZES.padding,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(
                              addInstruction({
                                instructions: instructions.text,
                                id: instructions.index,
                              }),
                            );
                            setInstructions('');
                          }}>
                          <Image
                            source={icons.plus}
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: COLORS.black,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    }
                  />
                ) : (
                  <View
                    style={{
                      marginTop: SIZES.padding,
                      marginTop: SIZES.padding,
                      marginLeft: SIZES.padding,
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontFamily: FAMILY.regular,
                        color: COLORS.blue,
                        fontSize: FONTS.medium,
                         flexShrink: 5,
                      }}>
                    *{item.instructions}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: SIZES.padding,        
                      }}
                      onPress={() => {
                        setVisible(true);
                        setAbc(index);
                      }}>
                      <Image
                        source={icons.edit}
                        style={{
                          height: 20,
                          width: 20,
                        }} 
                      />    
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginLeft: SIZES.padding,        
                      }}
                      onPress={() => {
                        dispatch(removeInstruction(index))
                      }}>
                      <Image
                        source={icons.delete_}
                        style={{
                          height: 20,
                          width: 20,
                        }} 
                      />    
                    </TouchableOpacity>
                  </View>
                )}
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
                  fontFamily: FAMILY.bold,
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                  ...FONTS.h6,
                }}
                onPress={() => {
                  dispatch(clearCart());
                  dispatch(clearInstructions());
                }}></TextButton>
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
                labelStyle={{
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                  ...FONTS.h6,
                  fontFamily: FAMILY.bold,
                }}
                onPress={() => {
                    addDraftOrder()
                }}></TextButton>
            </View>
          </View>
        ) : (
          <View style={{}}>
            <Button
              mode="elevated"
              onPress={() => {
                props.navigation.navigate('Home')
                dispatch(clearInstructions());
              }}
              labelStyle={{fontFamily: FAMILY.bold}}
              uppercase={false}
              icon={icons.back}>
              goBack
            </Button>
          </View>
        )}
      </View>
    </AuthLayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // width: '100%',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius - 20,
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
    fontFamily: FAMILY.semiBold,
  },
});
