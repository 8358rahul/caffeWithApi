import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES, images} from '../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
                fontWeight: '900',
              }}>
              {title}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.darkGray,
                marginTop: SIZES.base,
                ...FONTS.body4,
              }}>
              {subtitle}
            </Text>
          </View>

          {/* Content / children */}
          {children}
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
