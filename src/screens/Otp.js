import React from "react";
import { View, Text } from "react-native";

import OPTInputView from "@twotalltotems/react-native-otp-input";

import { FONTS, SIZES, COLORS } from "../constants";
import { TextButton } from "../components";
import AuthLayout from "./AuthLayout";

const Otp = ({ navigation }) => {
  const [timer, setTimer] = React.useState(60);

    React.useEffect(() => {
        let interval = setInterval(() => {
             setTimer(timer=>{
                if(timer > 0){
                    return timer - 1;
                }else{
                return timer;
                }
            })
            
          }, 1000)
          return () => clearInterval(interval);
    }, []);
    

  return (
    <AuthLayout title="OTP" subtitle="Enter the OTP sent to your email">
      {/* OTP input  */}

      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        <OPTInputView
          pinCount={4}
          style={{
            width: "100%",
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderWidth: 1,
            borderRadius: SIZES.radius-20,
            color: COLORS.black,
            ...FONTS.h3,
            backgroundColor: COLORS.lightGray2,
          }}
          onCodeFilled={(code) => console.log(code)}
        />

        {/* CountDown Timer */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: SIZES.padding*2,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}
          >
            Didn't receive code?
          </Text>
          <TextButton
            label={`Resend in ${timer}s`}
            disabled={timer === 0}
            buttonContainerStyle={{
              margiLeft: SIZES.base,
              backgroundColor: null,
              
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => setTimer(60)}
          />
        </View>
      </View>
      {/* Footer */}

      <View style={{

      }}>
        <TextButton  

          label="Continue"
          buttonContainerStyle={{
            backgroundColor: COLORS.primary,
            height:50,
            alignItems: 'center',
            borderRadius: SIZES.radius-20,
          }}
          onPress={() =>  navigation.navigate('SignIn')}
        />
        <View style={{
          marginTop: SIZES.padding,
          aignItems: 'center',
          justifyContent: 'center',

        }}>
          <Text
          style={{color: COLORS.darkGray, ...FONTS.body3, textAlign: 'center'}}
          >
            By signing up, you agree to our,
          </Text>
          <TextButton  
            label={`Terms of Service`}
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
            onPress={() => console.log("Term and Service")}
          />
        </View>
        
      </View>

    </AuthLayout>
  );
};

export default Otp;
