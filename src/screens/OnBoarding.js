import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  FlatList,
} from "react-native";
 
import { constants, images, FONTS, SIZES, COLORS,FAMILY } from "../constants";
import { TextButton } from "../components";

const OnBoarding = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const onViewChangeRef = React.useRef(({ viewableItems , changed }) => {
    setCurrentIndex(viewableItems[0].index);
  });

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: "clamp",
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: dotWidth,
                height: 10,
                borderRadius: 5,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderHeaderLogo = () => (
    <View
      style={{
        position: "absolute",
        top: SIZES.height > 800 ? 50 : 25,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={images.logo_02}
        resizeMode="contain"
        style={{
          width: SIZES.width * 0.5,
          height: 100,
        }}
      />
    </View>
  );

  const renderFooter = () => (
    <View
      style={{
        height: 160,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',

      }}
    >
      {/* Pagination /Dots */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
            alignItems: "center",

        }}
      >
        <Dots />
      </View>
      {/* Button */}
      {currentIndex < constants.onboarding_screens.length - 1 && 
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding,
            marginVertical: SIZES.padding,
            width: '100%',
            
          }}
        >
          <TextButton
            label="Skip"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.darkGray2,
              ...FONTS.h4,
              fontFamily: FAMILY.bold,

            }}
            onPress={() => navigation.navigate("SignIn")}
          />

          <TextButton
            label="Next"
            buttonContainerStyle={{
              height: 50,
              width: 200,
              borderRadius: SIZES.radius-20,
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h3,
              fontFamily:FAMILY.bold,
              fontWeight: 'bold',
            }}
            onPress={() => {
              flatListRef?.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              })
            }}
          />
        </View>
      }
      {currentIndex == constants.onboarding_screens.length - 1 && (
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            marginVertical: SIZES.padding,
          }}
        >
          <TextButton
            label="Let's Get Started"
            buttonContainerStyle={{
              height: 50,
              width: 300,  
              borderRadius: SIZES.radius-20,
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h4,
              fontWeight: 'bold',
              fontFamily: FAMILY.bold,
            }}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      )}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderHeaderLogo()}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flex: 3,
                }}
              >
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Image
                    source={item.bannerImage}
                    resizeMode="contain"
                    style={{
                      width: SIZES.width * 0.8,
                      height: SIZES.height * 0.3,
                      marginBottom: -SIZES.padding,
                    }}
                  />
                </ImageBackground>
              </View>

              {/* Details */}
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    fontFamily: FAMILY.bold,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: "center",
                    color: COLORS.darkGray,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.body3,
                    fontFamily: FAMILY.regular,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;
