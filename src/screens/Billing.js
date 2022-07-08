import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Linking
} from 'react-native';
import React from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {icons, images, SIZES, COLORS, FONTS,animation,FAMILY } from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import AuthLayout from './AuthLayout';
import {Button} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';



const Billing = props => {
  const {cartTotalQuantity, cartTotalAmount, tax, msg} = useSelector(
    state => state.cart,
  );
  const cart = useSelector(state => state.cart.cartItems);
  const [tableHead1, setTableHead1] = React.useState([
    'Product',
    'Quantity',
    'Price',
    'Total',
  ]);
  const [tableData, setTableData] = React.useState([]);
  const translateAnim = React.useRef(new Animated.Value(0)).current;
 
  React.useEffect(() => {
   setTimeout(() => {
    Animated.timing(translateAnim, {
      toValue: -360,
      duration: 1000,
      useNativeDriver: true,
    }).start();
   }, 600);
  }, []);

  React.useEffect(() => {
    setTableData(
      cart.map((item, index) => [
        item.title,
        item.cartQuantity,
        item.price,
        item.totalPrice,
      ]),
    );
  }, [cart]);

  const date = new Date(); // get current date
  const newDate = date.toGMTString().replace('GMT', '');


  const printRemotePDF = async () =>{
    await RNPrint.print({
      filePath: 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
    })
     
  };

  return (
    <AuthLayout
      title={`Table - ${props?.route?.params?.number}`}
      subtitle={`${newDate}`}
      hideHeader={true}
      >
       
      <Animated.View style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: "absolute",  //*
          width: "100%",
          height:  Dimensions.get('window').height,
          transform: [{ translateY: translateAnim }],  
          zIndex: 10,        
        }}>
          <LottieView 
         loop={false}
        source={animation.done} autoPlay   
        style={{  width: 200,  height:200, }} 
        size={20}
         />
         {/* </Animated.View> */}
        
        </Animated.View>
      
      <View style={{ }}>
        <Button
          icon= {icons.print}
          mode="elevated"
          onPress={()=>  printRemotePDF()}
          style={{  alignSelf: 'flex-end',  zIndex: 11,  }}         
          labelStyle={{ fontFamily:FAMILY.bold,}}
          uppercase={false}
          >
          Print
        </Button>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
          <Row
            data={tableHead1}
            style={styles.head}
            textStyle={styles.text}
            flexArr={[2, 1, 1, 1]}
          />
          <Rows
            data={tableData}
            textStyle={styles.text}
            flexArr={[2, 1, 1, 1]}
            style={{marginVertical: SIZES.base}}
          />
        </Table>
      </View>
      <View style={{marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {msg.length == 0 ? null 
      :      
        <View style={{}}>      
        <Text style={{...styles.bottom, color: COLORS.blue,  }}>
        * Cooking instructions 
      </Text>
      {
          msg.map((item, index) => (
            <Text style={{...styles.bottom, color: COLORS.blue,fontFamily:FAMILY.light }}>
           {index+1}{' )'} &nbsp;{item}
          </Text>

          ))
      } 
      </View>
      }
      <View style={{ }}> 
      <Text style={styles.bottom }>Total Quantity - {cartTotalQuantity}</Text>
      <Text style={styles.bottom}>Charges & Taxes - {tax}</Text>
      <Text style={styles.bottom}>Total Price - {cartTotalAmount}</Text>
      </View>
      </View>
         
        <View style={{
          flex: 1,
          alignItems:'center',
          justifyContent:'center',
          minHeight: 100,
          marginBottom: 10, 
          marginTop: 10,
        }}>
        <LottieView source={animation.cooking} autoPlay loop  style={{  width: 150,  height: 150, }}/>
        </View>
    </AuthLayout>
  );
};

export default Billing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  head: {
    ...FONTS.h5,
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    color: COLORS.darkGray2,
    fontFamily: FAMILY.regular,
  },
  bottom: {
    ...FONTS.h6,
    color: COLORS.darkGray,
    fontFamily: FAMILY.semiBold,
    marginVertical: SIZES.base-4,
 
    
  },
});
