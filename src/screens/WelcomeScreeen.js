import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import {
  heightPercentToDp as hp,
  widthPercentToDp as wp,
} from '../constants/theme';

const WelcomeScreeen = ({navigation}) => {
  const [loginClick, setLoginClick] = useState(false);
  const [bottomFlex, setBottomFlex] = useState(new Animated.Value(1));

  useEffect(() => {
    if (loginClick) {
      Animated.timing(bottomFlex, {
        toValue: 8,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(bottomFlex, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [loginClick]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.welcome_screen}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.topPart}>
          <Text style={styles.textStyle}>WEL</Text>
          <Text style={styles.textStyle}>COME</Text>
        </View>
        <Animated.View style={[styles.bottomPart, {flex: bottomFlex}]}>
          {loginClick ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fffd',
                borderTopLeftRadius: wp(20),
              }}>
              <Text
                style={{
                  fontSize: wp(6),
                  fontFamily: FONTS.regular,
                  color: COLORS.primary,
                  marginHorizontal: wp(20),
                  marginVertical: wp(2),
                  letterSpacing: 2,
                  fontWeight: 'bold',
                }}>
                LOGIN
              </Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Email"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => {
                  setLoginClick(false);
                  navigation.navigate('Menu');
                }}
                style={[
                  styles.buttonStyle,
                  {backgroundColor: loginClick ? COLORS.primary : COLORS.white},
                ]}>
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {color: !loginClick ? COLORS.primary : COLORS.white},
                  ]}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: 10,
                }}>
                <Text style={{color: 'blue', fontSize: 16}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => setLoginClick(true)}
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: loginClick ? COLORS.primary : '#fffd',
                    marginBottom: 4,
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {color: !loginClick ? COLORS.primary : COLORS.white},
                  ]}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
                style={{
                  ...styles.buttonStyle,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fffa',
                  marginBottom: 4,
                }}>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Don't have and account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topPart: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingVertical: hp(15),
    alignItems: 'center',
  },

  textStyle: {
    color: COLORS.white,
    fontSize: wp(10),
    textAlign: 'center',
    letterSpacing: wp(4),
    fontFamily: 'BalooBhai2-ExtraBold.ttf',
  },
  buttonStyle: {
    elevation: 5,
    shadowColor: COLORS.lightGray,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    height: hp(6),
    width: wp(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: COLORS.primary,
    fontSize: wp(5),
    textAlign: 'center',
    letterSpacing: wp(1),
    fontFamily: FONTS.BalooExtra.fontFamily,
    fontWeight: 'bold',
  },
  textInputStyle: {
    backgroundColor: COLORS.white,
    elevation: 5,
    shadowColor: '#010101',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    height: hp(6),
    width: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    alignSelf: 'center',
    marginVertical: hp(2),
    letterSpacing: wp(1),
    fontFamily: FONTS.BalooExtra.fontFamily,
    paddingHorizontal: wp(3),
  },
});
