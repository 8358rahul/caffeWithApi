import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TextButton from './TextButton';
import {SIZES, COLORS, FONTS, FAMILY} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider } from 'react-native-paper';

const BottomSheetComponent = props => {
  const {product, mainContainerStyle} = props.item;
  const [a,b] =React.useState(false);
  return (
props.key1=="increase"
?<View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    top: -SIZES.padding * 1,
  }}>
  <Text
    style={{
      ...FONTS.h2,
      color: COLORS.primary,
      fontFamily: FAMILY.semiBold,
    }}>
    {product}
  </Text>
  <TouchableOpacity
    onPress={() => props.closeBottomSheet()}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 25,
      backgroundColor: COLORS.lightGray3,
      ...styles.shadow,
    }}>
    <Entypo name="cross" size={25} color={COLORS.black} />
  </TouchableOpacity>
</View>
<Text
  style={{
    ...FONTS.body2,
    marginHorizontal: SIZES.padding,
    fontFamily: FAMILY.bold,
    marginBottom: SIZES.padding,
    marginTop: -10,
    color: COLORS.black,
  }}>
  Repeat previous customisation
</Text>
<Divider style={{color: COLORS.black, height: 2, marginHorizontal: 10}} />
<Text
  style={{
    ...FONTS.body3,
    marginHorizontal: SIZES.padding,
    fontFamily: FAMILY.bold,
    marginTop: SIZES.padding,
    color: COLORS.black,
  }}>
  {props.subtitle}
</Text>
<View
  style={{
    ...styles.shadow,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius - 10,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    padding: SIZES.padding,
    paddingVertical: SIZES.padding - 50,
    ...mainContainerStyle,
  }}>
  {props.children}
</View>
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.padding,
    top: -SIZES.padding * 1,
    
  }}>
 
  
  <TextButton
    label="I'll choose"
    onPress={props.onPress}
    buttonContainerStyle={{
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.radius - 20,
      ...styles.shadow,
      height: 50,
      width: '45%',
    }}
    labelStyle={{
      color: COLORS.white,
      fontFamily: FAMILY.semiBold,
      fontSize: SIZES.font * 1.2,
      fontWeight: 'bold',
    }}
  />
  <TextButton
    label="Reapeat"
    onPress={props.onPress}
    buttonContainerStyle={{
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.radius - 20,
      ...styles.shadow,
      height: 50,
      width: '45%',
    }}
    labelStyle={{
      color: COLORS.white,
      fontFamily: FAMILY.semiBold,
      fontSize: SIZES.font * 1.2,
      fontWeight: 'bold',
    }}
  />
 
</View>
</View>
:<View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SIZES.padding,
          top: -SIZES.padding * 1,
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            fontFamily: FAMILY.semiBold,
          }}>
          {product}
        </Text>
        <TouchableOpacity
          onPress={() => props.closeBottomSheet()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 25,
            backgroundColor: COLORS.lightGray3,
            ...styles.shadow,
          }}>
          <Entypo name="cross" size={25} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          ...FONTS.body2,
          marginHorizontal: SIZES.padding,
          fontFamily: FAMILY.bold,
          marginBottom: SIZES.padding,
          marginTop: -10,
          color: COLORS.black,
        }}>
        {props.title}
      </Text>
      <Divider style={{color: COLORS.black, height: 2, marginHorizontal: 10}} />
      <Text
        style={{
          ...FONTS.body3,
          marginHorizontal: SIZES.padding,
          fontFamily: FAMILY.bold,
          marginTop: SIZES.padding,
          color: COLORS.black,
        }}>
        {props.subtitle}
      </Text>
      <View
        style={{
          ...styles.shadow,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius - 10,
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          padding: SIZES.padding,
          paddingVertical: SIZES.padding - 50,
          ...mainContainerStyle,
        }}>
        {props.children}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SIZES.padding,
          top: -SIZES.padding * 1,
          
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray,
            fontFamily: FAMILY.semiBold,
            top: SIZES.padding * 1,
            color: COLORS.black,
          }}>
          Rs.{props.item.price}
        </Text>
        <TextButton
          label=" Add to Cart"
          onPress={props.onPress}
          buttonContainerStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius - 20,
            ...styles.shadow,
            height: 50,
            width: '50%',
          }}
          labelStyle={{
            color: COLORS.white,
            fontFamily: FAMILY.semiBold,
            fontSize: SIZES.font * 1.2,
            fontWeight: 'bold',
          }}
        />
      </View>
    </View>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
