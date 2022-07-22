import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  FlatList,
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
  
} from '../redux/cartSlice';
import {Button} from 'react-native-paper';
import {TextButton, FormInput} from '../components';
import AuthLayout from './AuthLayout';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ConfirmOrder = props => {
  const dispatch = useDispatch();
  const {status_id, cartTotalQuantity, cartTotalAmount, tax, cartItems} =
    useSelector(state => state.cart);
  const [instructions, setInstructions] = React.useState('');
  //Modal open
  let tempCartItems = cartItems;
  let abcd = tempCartItems.map((item, index) => {
    let tempObj = {
      ...item,
      product_menu_id: item.id,
      // name: item.product
    };
    delete tempObj.product;
    delete tempObj.id;
    delete tempObj.price;
    delete tempObj.description;
    delete tempObj.actualPrice;
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

  const addDraftOrder = async () => {
    let response = await apiService('POST', ApiEndpoints.ORDERS, {
      table_number: 55,
      order_status: status_id,
      taxes: tax,
      order_contains: abcd,
    });
    console.log('response-------', response);
    if (response.success) {
      dispatch(clearCart());
    }
    props.navigation.navigate('Billing', {response: reducerdata1});
  };

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
      {cartItems.length != 0 ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: COLORS.white,
          }}>
          <View style={ styles.innerView }>
            <Text style={styles.hearder}>Product</Text>
            <Text style={styles.hearder}>Price</Text>
            <Text style={styles.hearder}>Quentity</Text>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={cartItems}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View key={index}>
                    {item.quantity > item.half_price.quantity?(
                      <View style={ styles.innerView }>
                        <View
                          style={{
                            marginLeft: SIZES.padding + 10,
                            width: '30%',
                          }}>
                          <Text
                            style={{
                              marginLeft: SIZES.padding - 30,
                              flexShrink: 1,
                              fontFamily: FAMILY.regular,
                              fontSize: SIZES.h5,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: FAMILY.regular,
                            top: 5,
                            fontSize: SIZES.h5,
                            width: '30%',
                            left: 25,
                          }}>
                          {(item.quantity - item.half_price.quantity) * item.price}
                        </Text>
                        <View style={styles.btnStyle}>
                          <Button
                            onPress={() =>
                              item.quantity == 1
                                ? dispatch(removeFromCart(item))
                                : dispatch(decreaseCart(item))
                            }
                            mode="elevated"
                            icon={item.quantity-item.half_price.quantity == 1 ? 'delete' : 'minus'}
                            style={{marginHorizontal: 10, marginLeft: 30}}
                          />
                          <Text
                            style={{
                              ...FONTS.h4,
                              marginLeft: 5,
                              fontFamily: FAMILY.regular,
                              marginTop: 10,
                            }}>
                            {item.quantity - item.half_price.quantity}
                          </Text>
                          <Button
                            onPress={() =>{
                              dispatch(addToCart({selectedItem: item, price: item.price}))
                            }}
                            mode="elevated"
                            icon={'plus'}
                            style={{marginHorizontal: 10, marginLeft: 30}}
                          />
                        </View>
                      </View>
                     ):null}
                    {item.half_price.quantity?(
                      <View style={ styles.innerView }>
                        <View
                          style={{
                            marginLeft: SIZES.padding + 10,
                            width: '30%',

                          }}>
                          <Text
                            style={{
                              marginLeft: SIZES.padding - 30,
                              flexShrink: 1,
                              fontFamily: FAMILY.regular,
                              fontSize: SIZES.h5,
                            }}>
                            {item.half_price.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: FAMILY.regular,
                            top: 5,
                            fontSize: SIZES.h5,
                            width: '30%',
                            left: 25,
                          }}>
                          {item.half_price.quantity*item.half_price.price}
                        </Text>
                        <View style={styles.btnStyle}>
                          <Button
                            onPress={() =>
                              item.quantity == 1
                                ? dispatch(removeFromCart(item))
                                : dispatch(decreaseCart(item))
                            }
                            mode="elevated"
                            icon={item.half_price.quantity == 1 ? 'delete' : 'minus'}
                            style={{marginHorizontal: 10, marginLeft: 30}}
                          />
                          <Text
                            style={{
                              ...FONTS.h4,
                              marginLeft: 5,
                              fontFamily: FAMILY.regular,
                              marginTop: 10,
                            }}>
                            {item.half_price.quantity}
                          </Text>
                          <Button
                            onPress={() =>{
                               dispatch(addToCart({selectedItem: item, price: item.half_price.price}))
                            }
                               
                            }
                            mode="elevated"
                            icon={'plus'}
                            style={{marginHorizontal: 10, marginLeft: 30}}
                          />
                        </View>
                      </View>
                    ):null}

                    {/* //input filed for instructions */}

                    {item.instructions ? (
                      <View
                        style={{
                          marginTop: SIZES.padding,
                          backgroundColor: COLORS.white,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          paddingHorizontal: SIZES.padding,
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
                            justifyContent: 'flex-end',
                            marginLeft: SIZES.padding,
                          }}
                          onPress={() => {
                            dispatch(removeInstruction(index));
                          }}>
                          <AntDesign
                            name="delete"
                            size={20}
                            color={COLORS.black}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <FormInput
                        placeholder="Write a cooking instructions"
                        containerStyle={{
                          marginTop: SIZES.padding - 30,
                          borderRadius: 10,
                          paddingHorizontal: SIZES.padding,
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
                              <AntDesign
                                name="plus"
                                size={20}
                                color={COLORS.black}
                              />
                            </TouchableOpacity>
                          </View>
                        }
                      />
                    )}
                  </View>
                );
              }}
            />
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
              labelStyle={{
                fontWeight: 'bold',
                paddingHorizontal: 10,
                ...FONTS.h6,
              }}
              onPress={() => {
                dispatch(clearCart());
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
                addDraftOrder();
              }}></TextButton>
          </View>
        </View>
      ) : (
        <View style={{}}>
          <Button
            mode="elevated"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
            labelStyle={{fontFamily: FAMILY.bold}}
            uppercase={false}
            icon={icons.back}>
            goBack
          </Button>
        </View>
      )}
    </AuthLayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding,
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
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    paddingVertical: 6,
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
    // width: '40%',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: FAMILY.semiBold,
  },
});
