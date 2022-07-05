import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {FONTS, SIZES, COLORS,icons} from '../constants';
import {TextButton,FormInput} from '../components';
import { utils } from '../utils';
import AuthLayout from './AuthLayout';

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    const isEnableSignIn = () => email != '' && error == '';



    return (
        <AuthLayout title="Forgot Recovery" subtitle="Please enter your email address to recover your password"
        titleContainerStyle={{
            marginTop: SIZES.padding*2,
        }}
        >
            {/* FormInput */}
            <View style={{
                flex: 1,
                marginTop: SIZES.padding*2,
            }}>

<FormInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(text) => {
            //Validate Email
            utils.validateEmail(text, setError);
            setEmail(text);
          }}
          errorMsg={error}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  email == "" || (email != "" && error == "")
                    ? icons.correct
                    : icons.cencel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ""
                      ? COLORS.gray
                      : email != "" && error == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
                
            </View>


            {/* Button?? */}

            <TextButton  
                label={' Send Email'}
                disabled={!isEnableSignIn()}
                buttonContainerStyle={{
                    marginTop: SIZES.padding,
                    height: 55,
                    alignItems: 'center',
                    borderRadius: SIZES.radius-20,
                    backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimary,
                }}
                labelStyle={{

                    color: COLORS.white,
                    ...FONTS.h4,
                    fontWeight: '900',
                }}
                onPress={() => navigation.goBack()}
            />


            </AuthLayout>
    )
}

export default ForgotPassword;