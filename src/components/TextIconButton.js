import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, COLORS, SIZES } from "../constants";

const TextIconButton = ({
    label,
    containerStyle,
    labelStyle,
    onPress,
    icon,
    iconStyle,
    iconPosition,
}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            ...containerStyle,
        
        }}
        onPress={onPress}
    >
        {iconPosition === "LEFT" && 
            <Image
                source={icon}
                style={{
                    ...iconStyle,
                    ...styles.image,
                }}
            />
        }
        <Text
            style={{
                ...FONTS.body3,
                ...labelStyle,
            }}
        >
            {label}
        </Text>
        {iconPosition === "RIGHT" && 
            <Image
                source={icon}
                style={{
                    ...iconStyle,
                    ...styles.image,
                }}
            />
        }
             

    </TouchableOpacity>
  )
}

export default TextIconButton

const styles = StyleSheet.create({
    image:{
        marginLeft:5,
        width:20,
        height:20,
        tintColor:COLORS.black
    }
})