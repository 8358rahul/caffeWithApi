import React,{useState} from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { RNCamera } from "react-native-camera";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { toast } from '@jamsch/react-native-toastify';

const Scan = ({ navigation }) => {
  const [number , setNumber] = useState("");
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 3,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.close}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
            Scan for Menu
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.green,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Info")}
        >
          <Image
            source={icons.info}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            marginTop: "-55%",
            width: 200,
            height: 300,
            tintColor: COLORS.white,

          }}
        />
      </View>
    );
  }

  function renderPaymentMethods() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          padding: SIZES.padding * 3,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,

        }}
      >
        <Text style={{ ...FONTS.h4 }}>Enter Table Number</Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: SIZES.padding * 2,
          }}
        >
          <TextInput

            style={{
              flex: 1,
              borderColor: COLORS.gray,
              borderWidth: 1,
              borderRadius: 10,
              padding: SIZES.padding,
              marginRight: SIZES.padding,
              marginLeft: SIZES.padding,
              fontSize: SIZES.font * 1.2,
              fontFamily: FONTS.BalooExtra.fontFamily,
              color: COLORS.black,
            }}
            placeholder="Table Number"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) => setNumber(text)}
            value={number}
          />
          

        </View>
        <TouchableOpacity
            style={{
              height: 50,
              width: '100%',
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: SIZES.padding,
            }}
            onPress=
            {
              number?() =>{ navigation.navigate("Billing",{number:number})
               setNumber("")
              }:()=> toast.info("Please Enter Table Number")
              
            }
            >
            <Text style={{ ...FONTS.h4, color: COLORS.white,fontWeight: '900', }}>
              Continue
            </Text>
          </TouchableOpacity>
      </View>
    );
  }

  function onBarCodeRead(result) {
    if (result.data.length > 0) {
      navigation.navigate("Billing", {
        number: result.data,
      });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <RNCamera
        style={{ flex: 1 }}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onBarCodeRead={onBarCodeRead}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "Camera is required for barcode scanning",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }}
      >
        {renderHeader()}
        {renderScanFocus()}
        {renderPaymentMethods()}
      </RNCamera>

    </View>
  );
};

export default Scan;



