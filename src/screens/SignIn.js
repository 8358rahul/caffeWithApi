import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Alert} from 'react-native'
import {FONTS, COLORS, SIZES, images, icons,FAMILY} from '../constants';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton
} from '../components';
import {utils} from '../utils';
import AuthLayout from  './AuthLayout';
import { userLogin } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '@jamsch/react-native-toastify';

const SignIn = ({navigation}) => {
//redux hooks
const dispatch = useDispatch();
const {user} = useSelector(state => state.cart);
React.useEffect(() => {
  if(user?.success){
    navigation.navigate('Home');
    toast.success(`Welcome You're Logged In`);
  }
  else if(user?.success===false){
    toast.error(`Invalid Credentials`);
  }
  
},[user]);
 

  //react hooks
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [saveMe, setSaveMe] = React.useState(false);



  const isEnableSignIn = () => email != '' && password != '' && emailError == '';

  return (
      <AuthLayout
        title="Let's Sign You In"
        subtitle="Welcome back, you've been missed">
        <View
          style={{
            flex: 1,
            marginVertical:  20,
          }}>
          {/* Form Inputs */}
          <FormInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={text => {
              //Validate Email
              utils.validateEmail(text, setEmailError);
              setEmail(text);
            }}
            errorMsg={emailError}
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    email == '' || (email != '' && emailError == '')
                      ? icons.correct
                      : icons.cencel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      email == ''
                        ? COLORS.gray
                        : email != '' && emailError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />

          <FormInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPass}
            autoCompleteType="password"
            onChange={text => setPassword(text)}
            errorMsg={passwordError}
            containerStyle={{
              marginTop: SIZES.padding,
            }}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setShowPass(!showPass);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                }}>
                <Image
                  source={showPass ? icons.eye_close : icons.eye}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
                />
              </TouchableOpacity>
            }
          />

          {/* Save me & Forgot password */}

          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom:  SIZES.padding,
            }}>
            <CustomSwitch value={saveMe} onChange={value => setSaveMe(value)} />
            <TextButton
              label="Forgot Password"
              buttonContainerStyle={{
                backgroundColor: null,
              }}
              labelStyle={{
                ...FONTS.body4,
                color: COLORS.gray,
                fontFamily:FAMILY.bold
              }}
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>

          {/* Sign In */}

          <TextButton
            label="Sign In"
            disabled={isEnableSignIn() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding,
              backgroundColor: isEnableSignIn()
                ? COLORS.primary
                : COLORS.transparentPrimary,
              borderRadius: SIZES.radius-20,
            }}
            labelStyle={{
              ...FONTS.h4,
              color: isEnableSignIn() ? COLORS.white : COLORS.gray,
              fontWeight: 'bold',
              fontFamily:FAMILY.bold

            }}
            // onPress={() => navigation.navigate('Home')}
            onPress={() =>dispatch(userLogin({email, password}))}
          />
          {/* SignUP */}
          
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius-20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom:  SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.darkGray,
              }}>
              Don't have an account?
            </Text>
            <TextButton
              label="Sign Up"
              buttonContainerStyle={{
                marginLeft: 3,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h4,
                //fontWeight: '900',
              }}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View> */}
        </View>
      </AuthLayout>
  );
};

export default SignIn;
