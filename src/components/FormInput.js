import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {FONTS, COLORS, SIZES, images, FAMILY} from '../constants';

const FormInput = ({
  label,
  containerStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
  autoCompleteType = 'off',
  errorMsg = '',
  value,
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      {/* Label & Error msg */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body4,
            fontFamily: FAMILY.semiBold,
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: COLORS.red,
            ...FONTS.body4,
            fontFamily: FAMILY.semiBold,
          }}>
          {errorMsg}
        </Text>
      </View>

      {/* TextInput */}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius - 20,
          backgroundColor: COLORS.lightGray2,
          borderColor: COLORS.darkgray,
        }}>
        {prependComponent}
        <TextInput
          style={{
            ...inputStyle,
            flex: 1,
            fontSize: SIZES.font * 1.2,
            color: COLORS.black,
            fontFamily: FAMILY.semiBold,
          }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          onChangeText={onChange ? text => onChange(text) : () => {}}
          value={value ? value : ''}
        />

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
