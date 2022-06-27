import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

const LoginSigninScreen = () => {
  return (
    <View style={styles.container}>
      <Text 
      style={{ color: '#000', ...FONTS.LatoBoldItalic}}>LoginScreen</Text>
    </View>
  )
}

export default LoginSigninScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

})