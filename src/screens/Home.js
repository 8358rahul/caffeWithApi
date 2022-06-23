import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { categoryData } from "../constants/categoryData";
import { restaurantData } from "../constants/restaurantData";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from '@jamsch/react-native-toastify';
import { Button } from 'react-native-paper';
import { car } from "../constants/icons";
const Home = ({ navigation }) => {

  const initialCurrentLocation = {
    streetName: "Our Menu",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );


  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >

          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Scan")}
        >
          <Image
            source={icons.scan}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => {
            setSelectedCategory(item);
            let temp = restaurantData.filter((a) => a.category.includes(item.name))
            console.log('temp------[',temp)
            setRestaurants(
              restaurantData.filter((a) => a.category.includes(item.name))
            );

          }}
        >
          <View
            style={{
              width: 50,
              height: 50,

              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >


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
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <View style={{ flexDirection: 'row',justifyContent: 'space-between'  }}>
          <View>
            <Text style={{ ...FONTS.h2 }}>Main</Text>
            <Text style={{ ...FONTS.h2 }}>Categories</Text>
          </View>
            <Button icon={icons.dollar}  mode="elevated" onPress={() => console.log('Pressed')}>
            <Text style={{ ...FONTS.h2 }}></Text>
            </Button>
            <Button icon="cart"  mode="elevated" onPress={() => console.log('Pressed')}>
            <Text style={{ ...FONTS.h2 }}>{cart.cartItems.length}</Text>
            </Button>
        </View>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />

      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <View
        style={{
          marginBottom: SIZES.padding * 2,
          width: "100%",
          paddingVertical: 16,
        }}
      >
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
            borderRadius: 20,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "40%",
              height: 110,
              borderRadius: SIZES.radius,
              position: "absolute",
            }}
          />
        </View>

        {/* Restaurant Info */}

        <View
          style={{
            marginTop: SIZES.padding - 15,
            marginLeft: 170,
          }}
        >
          <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
          <Text style={{ ...FONTS.body2 }}>$-{item.price}</Text>
          <Text style={{ ...FONTS.body2 }}>Ć-{item.calories}</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            width: "100%",
            height: 40,
            marginTop: SIZES.padding * 4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          onPress={() => dispatch(addToCart(item))}
        >
          <Text style={{ color: "#000", ...FONTS.body2, fontWeight: "bold" }}>
            ADD
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (

      <View  >
        <ToastContainer position="top-left" />
        <FlatList
          data={restaurants}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 30,
          }}
        />
      </View>

    );
  }

  return (

    <SafeAreaView style={styles.container}>
      {renderHeader()}
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
    shadowColor: "#000",
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
