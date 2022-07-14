import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES, images,FAMILY} from '../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {toast, ToastContainer} from '@jamsch/react-native-toastify';

const AuthLayout = ({title, subtitle, titleContainerStyle, children,hideHeader}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.padding,
      
        
      }}>
      <ScrollView>
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            flex: 1,
          }}>
          {/* App Icon */}
          {!hideHeader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                
              }}>
              <Image
                source={images.logo_02}
                resizeMode="contain"
                style={{
                  height: 100,
                  width: 200,
                }}
              />
            </View >
          ) : <View  style={{
            height: 100,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            </View>}

          {/* Title & subtitle */}
          <View
            style={{
              marginTop: SIZES.padding,
              ...titleContainerStyle,
            }}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h3,
                fontWeight: 'bold',
                fontFamily: FAMILY.bold,
              }}>
              {title}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.darkGray,
                marginTop: SIZES.base,
                ...FONTS.body4,
                fontFamily: FAMILY.semiBold,
              }}>
              {subtitle}
            </Text>
          </View>

          {/* Content / children */}
          {children}
        </KeyboardAwareScrollView>
        <ToastContainer position="top-center" />
      </ScrollView>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
