import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {icons, images, SIZES, COLORS, FONTS, FAMILY, animation} from '../constants';
import {categoryData} from '../constants/categoryData';
import {addToCart, decreaseCart, getTotals} from '../redux/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {toast, ToastContainer} from '@jamsch/react-native-toastify';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import {TextButton} from '../components';
import {restaurantData} from '../constants/restaurantData';
import LottieView from 'lottie-react-native';
 



const Home = ({navigation}) => {
  const [originalData, setOriginalData] = React.useState(restaurantData);
  const cart = useSelector(state => state.cart.cartItems);
  const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [cart_item_ids, setcart_item_ids] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);


const getData = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setRestaurants(data);
    setOriginalData(data);
    setIsLoading(true);
    return data;

  } catch (error) {
    console.log(error);   
  }
}

React.useEffect(() => {
  getData();  
},[]); 

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

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50, marginVertical: 5}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.h3, color: COLORS.primary,  }}>
            Our Menu
          </Text>
        </View>
      </View>
    );
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
              item.category==='All'? originalData : 
              originalData.filter(a => a.category.includes(item.category))            
            )
          }}>
          <View
            style={{
              width: 50,
              height: 50, 
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
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

            {item.name}

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
              fontFamily:FAMILY.extraBold,
            }}>
            Categories
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              icon ={()=>(
                <Image 
                source={icons.rs}
                style={{width: 16, height: 16}}
                />
              )}
              mode="elevated"
              onPress={() => navigation.navigate('Scan')}>
              <Text style={{...FONTS.h3}}>{cartTotalAmount}</Text>
            </Button>
            <Button
              icon="cart"
              mode="elevated"
              onPress={() => navigation.navigate('Scan')}>
              <Text style={{...FONTS.h3}}>{cartTotalQuantity}</Text>
            </Button>
          </View>
        </View>

        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }

  function renderRestaurantList() { 
    const renderItem = ({item}) => (
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
            source={{uri:item.image}}
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

            <Text style={{...FONTS.body4, color: COLORS.black, fontFamily:FAMILY.semiBold,}}>
             {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}            
            </Text>
              <View style={{marginRight: '3%',marginTop: 5,}}>
              <ReadMore
                numberOfLines={1}
                renderTruncatedFooter={handlePress => (
                  <Text
                    style={{...FONTS.body5, color: COLORS.darkgray,  fontFamily:FAMILY.light}}
                    onPress={handlePress}>
                    ..more
                  </Text>
                )}>
                <Text style={{...FONTS.body5, color: COLORS.darkGray,fontFamily:FAMILY.light}}>
                  {item.description}
                </Text>
              </ReadMore>
            </View>
            <View style={{flexDirection: 'row',marginTop: 5,}}>
              <Text style={{...FONTS.body4, color: COLORS.black,fontFamily:FAMILY.medium}}>
                Rs.{item.price}
              </Text>
              {/* <Text
                style={{...FONTS.body4, marginLeft: 20, color: COLORS.black,fontFamily:FAMILY.medium}}>
                Kcal-{item.calories}
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
                width:cart.cartQuantity<100?'50%' :'35%',
                height: 50,
                backgroundColor: null,
              }}
              labelStyle={{
                fontSize: SIZES.font * 1.7,
                fontWeight: 'bold',
                color: COLORS.white,
                fontFamily:FAMILY.bold,
                marginTop: 4,

              }}
            />

            {cart.map(i =>
              i.id == item.id ? (
                <View key={item.id}  
                  style={{
                    width: cart.cartQuantity<100?'30%' :null,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.font * 1.5,
                      color: COLORS.white,
                      fontWeight: 'bold',
                      fontFamily:FAMILY.bold,
                    }}>
                    {i.cartQuantity}
                  </Text>
                </View>
              ) : null,
            )}


<TextButton
              label={'+'}
              onPress={() => dispatch(addToCart(item))}
              buttonContainerStyle={{
                width: cart.cartQuantity<100?'50%' :'35%',
                height: 50,
                backgroundColor: null,
              }}
              labelStyle={{
                fontSize: SIZES.font * 1.5,
                fontWeight: 'bold',
                color: COLORS.white,
                fontFamily:FAMILY.bold,
              }}
            />
          </View>
        ) : (
          <TextButton
            label={'ADD'}
            onPress={() => dispatch(addToCart(item))}
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
              fontFamily:FAMILY.bold,
              fontSize: SIZES.font * 1.5,

            }}
          />
        )}
      </View>
      ) 
   
    return (
      <>        
      <ToastContainer position="bottom-center" />
     {!isLoading?<View style={{flex: 1, alignItems:'center', marginTop:Dimensions.get('window').height*0.1}}>
     <LottieView  source={animation.loading} autoPlay  style={{width:100, height:100}} />
     </View>
     :
     <FlatList
        data={restaurants}
        keyExtractor = {item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 50,
        }}         
      />}

        </>

    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* {renderHeader()} */}
      {renderMainCategories()}
      {renderRestaurantList()}
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
});

export default Home;
