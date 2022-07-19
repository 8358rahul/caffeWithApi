import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  FAMILY,
  animation,
} from '../constants';
import {addToCart, decreaseCart, getTotals} from '../redux/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer} from '@jamsch/react-native-toastify';
import {Button, Divider, RadioButton} from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import {TextButton} from '../components';
import LottieView from 'lottie-react-native';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

const initialKeys = {
  product: 'product',
  description: 'description',
  price: 'price',
};

const Home = props => {
  // redux hook

  const cart = useSelector(state => state.cart.cartItems);
  const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // state hook
  const [key1, setKey] = React.useState();
  const [checked, setChecked] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const bottomSheet = React.useRef();
  const [category, setCategory] = React.useState('');
  const [originalData, setOriginalData] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState();
  const [cart_item_ids, setcart_item_ids] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // API CALLING FUNCTIONS
  const getCategoryData = async () => {
    let response = await apiService('POST', ApiEndpoints.CATEGORYS, {});
    let data = response.data;
    setCategory(data);
  };

  const getData = async () => {
    let response = await apiService('POST', ApiEndpoints.PRODUCT_MENUS, {});
    let data = response.data;
    setOriginalData(data);
    setRestaurants(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getData();
    getCategoryData();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
      getCategoryData();
    });
    return unsubscribe;
  }, [props.navigation]);

  React.useEffect(() => {
    dispatch(getTotals());
    if (cart.length > 0) {
      let cart_item_id = cart.map(item => item.id);
      setcart_item_ids(cart_item_id);
    } else {
      setcart_item_ids([]);
    }
  }, [cart]);

  function checkIsItemInCart(id) {
    let flag = cart_item_ids.find(i => i == id);
    if (flag) {
      return true;
    } else {
      return false;
    }
  }

  function renderMainCategories() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          backgroundColor:
            selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}
        onPress={() => {
          setSelectedCategory(item);
          setRestaurants(
            item.category == 'all'
              ? originalData
              : originalData.filter(a => a.category_id == item.id),
          );
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
          }}>
          <Image
            // source={item.icon}
            source={{uri: 'https://picsum.photos/200/300'}}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>

        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
            fontFamily: FAMILY.medium,
          }}>
          {item.category}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          marginHorizontal: 16,
          marginVertical: 20,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              // fontWeight: '900',
              marginTop: 8,
              marginBottom: 8,
              fontFamily: FAMILY.extraBold,
            }}>
            Categories
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              icon={() => (
                <Image source={icons.rs} style={{width: 16, height: 16}} />
              )}
              mode="elevated"
              onPress={() => props.navigation.navigate('ConfirmOrder')}>
              <Text style={{...FONTS.h3}}>{cartTotalAmount}</Text>
            </Button>
            <Button
              icon="cart"
              mode="elevated"
              onPress={() => props.navigation.navigate('ConfirmOrder')}>
              <Text style={{...FONTS.h3}}>{cartTotalQuantity}</Text>
            </Button>
          </View>
        </View>

        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => getCategoryData()}
            />
          }
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          marginBottom: SIZES.padding * 1.5,
          marginTop: SIZES.padding * 1.5,
          width: '100%',
          backgroundColor: COLORS.white,
          ...styles.shadow,
          minHeight: 160,
          borderTopRightRadius: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
        }}>
        {/* Image */}
        <View
          style={{
            flex: 1,
            marginBottom: SIZES.padding,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            // source={item.image}
            resizeMode="cover"
            style={{
              width: '40%',
              height: 120,
              borderBottomRightRadius: 25,
            }}
          />
          {/* Restaurant Info */}

          <View
            style={{
              marginTop: SIZES.padding - 5,
              marginLeft: 10,
              flex: 1,
            }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                fontFamily: FAMILY.semiBold,
              }}>
              {item[initialKeys['product']].length > 30
                ? item[initialKeys['product']].substring(0, 30) + '...'
                : item[initialKeys['product']]}
            </Text>
            <View style={{marginRight: '3%', marginTop: 5}}>
              <ReadMore
                numberOfLines={1}
                renderTruncatedFooter={handlePress => (
                  <Text
                    style={{
                      ...FONTS.body5,
                      color: COLORS.darkgray,
                      fontFamily: FAMILY.light,
                    }}
                    onPress={handlePress}>
                    ..more
                  </Text>
                )}>
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.darkGray,
                    fontFamily: FAMILY.light,
                  }}>
                  {item[initialKeys['description']]}
                </Text>
              </ReadMore>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  fontFamily: FAMILY.medium,
                }}>
                Rs.
                {item.half_price != null
                  ? item.half_price.price
                  : item[initialKeys['price']]}
              </Text>
              {/* <Text
                style={{
                  ...FONTS.body4,
                  marginLeft: 20,
                  color: COLORS.black,
                  fontFamily: FAMILY.medium,
                }}>
                Id-{item.id}
              </Text> */}
            </View>
          </View>
        </View>
        {checkIsItemInCart(item.id) ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '40%',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
              position: 'absolute',
              borderBottomLeftRadius: 25,
              borderTopRightRadius: 25,
              alignSelf: 'auto',
              marginTop: 110,
              height: 50,
            }}>
            <TextButton
              label={'-'}
              onPress={() => dispatch(decreaseCart(item))}
              buttonContainerStyle={{
                width: cart.quantity < 100 ? '50%' : '35%',
                height: 50,
                backgroundColor: null,
              }}
              labelStyle={{
                fontSize: SIZES.font * 1.7,
                fontWeight: 'bold',
                color: COLORS.white,
                fontFamily: FAMILY.bold,
                marginTop: 4,
              }}
            />

            {cart.map(i =>
              i.id == item.id ? (
                <View
                  key={item.id}
                  style={{
                    width: cart.quantity < 100 ? '30%' : null,
                  }}>
                  <Text
                    style={{
                      fontSize: SIZES.font * 1.5,
                      color: COLORS.white,
                      fontWeight: 'bold',
                      fontFamily: FAMILY.bold,
                    }}>
                    {i.quantity}
                  </Text>
                </View>
              ) : null,
            )}

            <TextButton
              label={'+'}
              onPress={() => {
                setKey('increase');
                if (item.half_price) {
                  bottomSheet.current.show();
                } else {
                  dispatch(addToCart(item));
                }
              }}
              buttonContainerStyle={{
                width: cart.quantity < 100 ? '50%' : '35%',
                height: 50,
                backgroundColor: null,
              }}
              labelStyle={{
                fontSize: SIZES.font * 1.5,
                fontWeight: 'bold',
                color: COLORS.white,
                fontFamily: FAMILY.bold,
              }}
            />
          </View>
        ) : (
          <TextButton
            label={'ADD'}
            onPress={() => {
              setKey('add');
              if (item.half_price) {
                setSelectedItem(item);
                bottomSheet.current.show();
              } else {
                dispatch(addToCart(item));
              }
            }}
            buttonContainerStyle={{
              backgroundColor: '#ffe5c7',
              position: 'absolute',
              alignSelf: 'auto',
              marginTop: 110,
              width: '40%',
              height: 50,
              borderBottomLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
            labelStyle={{
              color: COLORS.primary,
              fontWeight: 'bold',
              fontFamily: FAMILY.bold,
              fontSize: SIZES.font * 1.5,
            }}
          />
        )}
      </View>
    );

    return (
      <>
        <ToastContainer position="top-center" />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: Dimensions.get('window').height * 0.1,
            }}>
            <LottieView
              source={animation.loading}
              autoPlay
              style={{width: 100, height: 100}}
            />
          </View>
        ) : (
          <FlatList
            data={restaurants}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 50,
            }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={() => getData()} />
            }
          />
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderMainCategories()}
      {renderRestaurantList()}
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={280}>
        {key1 === 'add' ? (
          <View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SIZES.padding,
                top: -SIZES.padding * 1,
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                  fontFamily: FAMILY.semiBold,
                }}>
                {selectedItem?.product}
              </Text>
              <TouchableOpacity
                onPress={() => bottomSheet.current.close()}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: COLORS.lightGray3,
                  ...styles.shadow,
                }}>
                <Entypo name="cross" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...FONTS.body2,
                marginHorizontal: SIZES.padding,
                fontFamily: FAMILY.bold,
                marginBottom: SIZES.padding,
                marginTop: -10,
                color: COLORS.black,
              }}>
              Customise your order  
            </Text>
            <Divider
              style={{color: COLORS.black, height: 2, marginHorizontal: 10}}
            />
            <Text
              style={{
                ...FONTS.body3,
                marginHorizontal: SIZES.padding,
                fontFamily: FAMILY.bold,
                marginTop: SIZES.padding,
                color: COLORS.black,
              }}>
              Quantity
            </Text>
            <View
              style={{
                ...styles.shadow,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius - 10,
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
                padding: SIZES.padding,
                paddingVertical: SIZES.padding - 50,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 16,
                }}>
                <Text style={styles.textStyle}>Half</Text>
                <Text style={[styles.textStyle, {marginLeft: '60%'}]}>
                  Rs.{selectedItem?.half_price?.price}
                </Text>
                <RadioButton
                  value={checked}
                  status={
                    checked === selectedItem?.half_price?.price
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => setChecked(selectedItem?.half_price?.price)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 16,
                }}>
                <Text style={styles.textStyle}>Full</Text>
                <Text style={[styles.textStyle, {marginLeft: '60%'}]}>
                  Rs.{selectedItem?.price}
                </Text>
                <RadioButton
                  value={checked}
                  status={
                    checked === selectedItem?.price ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked(selectedItem?.price)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SIZES.padding,
                top: -SIZES.padding * 1,
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.gray,
                  fontFamily: FAMILY.semiBold,
                  top: SIZES.padding * 1,
                  color: COLORS.black,
                }}>
                Rs. {selectedItem?.price}
              </Text>
              <TextButton
                label=" Add to Cart"
                onPress={() => {
                  dispatch(addToCart(selectedItem));
                  bottomSheet.current.close();
                }}
                buttonContainerStyle={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius - 20,
                  ...styles.shadow,
                  height: 50,
                  width: '50%',
                }}
                labelStyle={{
                  color: COLORS.white,
                  fontFamily: FAMILY.semiBold,
                  fontSize: SIZES.font * 1.2,
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SIZES.padding,
                top: -SIZES.padding * 1,
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                  fontFamily: FAMILY.semiBold,
                }}>
                {selectedItem?.product}
              </Text>
              <TouchableOpacity
                onPress={() => bottomSheet.current.close()}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: COLORS.lightGray3,
                  ...styles.shadow,
                }}>
                <Entypo name="cross" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...FONTS.body2,
                marginHorizontal: SIZES.padding,
                fontFamily: FAMILY.bold,
                marginBottom: SIZES.padding,
                marginTop: -10,
                color: COLORS.black,
              }}>
              Reapeat your order as per your taste
            </Text>
            <Divider
              style={{color: COLORS.black, height: 2, marginHorizontal: 10}}
            />
            <Text
              style={{
                ...FONTS.body3,
                marginHorizontal: SIZES.padding,
                fontFamily: FAMILY.bold,
                marginTop: SIZES.padding,
                color: COLORS.black,
              }}>
              Quantity
            </Text>
            <View
              style={{
                ...styles.shadow,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius - 10,
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
                paddingVertical: SIZES.padding + 10,
                padding: SIZES.padding,
              }}>
              <Text style={styles.textStyle}> selected order show</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SIZES.padding,
                top: -SIZES.padding * 1,
              }}>
              <TextButton
                label="I'll choose"
                onPress={() => alert('I will choose')}
                buttonContainerStyle={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius - 20,
                  ...styles.shadow,
                  height: 50,
                  width: '47%',
                }}
                labelStyle={{
                  color: COLORS.white,
                  fontFamily: FAMILY.semiBold,
                  fontSize: SIZES.font * 1.2,
                  fontWeight: 'bold',
                }}
              />
              <TextButton
                label="Reapeat"
                onPress={() => {
                  dispatch(addToCart(selectedItem));
                  bottomSheet.current.close();
                }}
                buttonContainerStyle={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius - 20,
                  ...styles.shadow,
                  height: 50,
                  width: '47%',
                }}
                labelStyle={{
                  color: COLORS.white,
                  fontFamily: FAMILY.semiBold,
                  fontSize: SIZES.font * 1.2,
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  textStyle: {
    ...FONTS.h4,
    fontFamily: FAMILY.regular,
  },
});

export default Home;
