import { StyleSheet, Text, View ,TextInput,Image,TouchableOpacity} from "react-native";
import React, { useEffect } from "react";
import { FONTS, COLORS, SIZES, images } from "../constants";

const FormInput = ({
  label,
  containerStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  autoCapitalize = "none",
  keyboardType = "default",
  autoCompleteType = "off",
  errorMsg = "",
}) => { 
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {/* Label & Error msg */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
      </View>

      {/* TextInput */}
      <View
        style={{
          flexDirection: "row",
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius-20,
          backgroundColor: COLORS.lightGray2,
          borderColor: COLORS.darkgray,
        }}
      >
        {prependComponent}
        <TextInput
          style={{
            ...inputStyle,
            flex: 1,
            fontSize: SIZES.font * 1.2,
            color: COLORS.black, 
          }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          onChangeText={(text) => onChange(text)}
        />

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
