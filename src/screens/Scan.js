import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {toast} from '@jamsch/react-native-toastify';
import {TextButton, FormInput} from '../components';
import {utils} from '../utils';
import { Divider } from 'react-native-paper';

const Scan = ({navigation}) => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const isEnableNumber= () => number != ''&& error == '';

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 3,
           
        }}>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log('flash')}
        >
          <Image
            source={icons.flash}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.body3}}>
            Scan for QR Code
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            backgroundColor: COLORS.lightGray1,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.cross}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            marginTop: '-55%',
            width: '70%',
            height: 300,
            tintColor: COLORS.blue,
          }}
        />
      </View>
    );
  }

  function renderEnterNumber() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          padding: SIZES.padding * 3,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding * 0.5,
          }}>
          <FormInput
            label="Table Number"
            placeholder="Enter table Number"
            keyboardType="numeric"
            onChange={text =>{
                utils.onlyValidNumbers(text, setError);
              setNumber(text)}}
            errorMsg={error}
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    number == '' || (number != '' && error == '')
                      ? icons.correct
                      : icons.cencel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      number == ''
                        ? COLORS.gray
                        : number != '' && error == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
        </View>
       
      <TextButton 
        label="Continue"
        disabled={!isEnableNumber()}
        buttonContainerStyle={{
          height:55,
          alignItems: 'center',
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius-20,
          backgroundColor: isEnableNumber() ? COLORS.primary : COLORS.transparentPrimary,
      }}
      labelStyle={{
        ...FONTS.h4,
        fontWeight: '900',
      }}
      onPress={() =>{
        if(isEnableNumber()){
          navigation.navigate('ConfirmOrder', {number: number});
          setNumber('');
        }else{
          toast.info('Please Enter Table Number')
        }  
      }}
      
      />

      </View>
    );
  }

  function onBarCodeRead(result) {
    if (result.data.length > 0) {
      navigation.navigate('Billing', {
        number: result.data,
      });
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.transparent}}>
      <RNCamera
        style={{flex: 1}}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onBarCodeRead={onBarCodeRead}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'Camera is required for barcode scanning',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}>
        {renderHeader()}
        {renderScanFocus()}
        {renderEnterNumber()}
      </RNCamera>
    </View>
  );
};

export default Scan;
