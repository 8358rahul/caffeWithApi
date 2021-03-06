import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES,FAMILY } from "../constants";

const TextButton = ({ label, buttonContainerStyle, labelStyle, onPress,disabled }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress ?()=>onPress() : () => {}}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
          justifyContent: "center",
          alignItems: "center",
          
          
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
