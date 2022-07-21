import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  FAMILY,
  animation,
} from '../constants';
import {Divider, Button} from 'react-native-paper';
const User = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <View
        style={{
          height: '50%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: COLORS.blue,
        }}>
        <Image
          source={require('../assets/icons/user.png')}
          style={{
            height: '30%',
            width: '30%',
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: SIZES.h3,
            color: COLORS.white,
            fontFamily: FAMILY.bold,
            marginTop: '5%',
          }}>
          User Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Entypo name="location-pin" size={25} color="#fff" />
          <Text style={{color: COLORS.white}}>Bhopal Madhya Pradesh </Text>
        </View>
      </View>
      <View
        style={{
          height: '50%',
          width: '100%',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            marginTop: '5%',
          }}>
          <Feather name="phone-call" size={25} color="#000" />
          <Text>+66 (089)-928-2134</Text>
          <Text
            style={{
              color: COLORS.blue,
              position: 'absolute',
              alignSelf: 'center',
              left: '30%',
              top: '80%',
            }}>
            Mobile
          </Text>
          <MaterialCommunityIcons
            name="android-messages"
            size={25}
            color="#000"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            marginTop: '5%',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              marginLeft: '30%',
            }}>
            +66 (089)-928-2134
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              position: 'absolute',
              alignSelf: 'center',
              left: '30%',
              top: '80%',
            }}>
            Work
          </Text>
          <MaterialCommunityIcons
            name="android-messages"
            size={25}
            color="#000"
          />
        </View>
        <Divider
        style={{
          width: '80%',
          height: 1,
          backgroundColor: COLORS.black,
          marginTop: '5%',
        }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            marginTop: '5%',

          }}>
          <Fontisto name="email" size={25} color="#000" />
          <Text
            style={{
              alignSelf: 'flex-start',
              position: 'absolute',
              left: '30%',
            }}>
            www.xyzabc.co.in
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              position: 'absolute',
              alignSelf: 'center',
              left: '30%',
              top: '80%',
            }}>
            Email
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            marginTop: '5%',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              marginLeft: '30%',
            }}>
            sdfsdfdgmai.@.com
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              position: 'absolute',
              alignSelf: 'center',
              left: '30%',
              top: '80%',

            }}>
            Work Email
          </Text>
        </View>
        <Divider
        style={{
          width: '80%',
          height: 1,
          backgroundColor: COLORS.black,
          marginTop: '5%',
        }}
        />
        <Button
          icon="logout"
          mode="elevated"
          onPress={() => console.log('Pressed')}
          style={{
            marginTop: '4%',
            width: '80%',
            alignItems: 'flex-start',
            marginBottom: '1%',
          }}>
          Logout
        </Button>
        <Divider
        style={{
          width: '80%',
          height: 1,
          backgroundColor: COLORS.black,
        }}
        />
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});


