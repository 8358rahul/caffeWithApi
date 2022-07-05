import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { icons, images, SIZES, COLORS, FONTS,animation } from "../constants";
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';
import AuthLayout from './AuthLayout';
const Billing = (props) => {
  const { cartTotalQuantity, cartTotalAmount, tax } = useSelector((state) => state.cart);
  const cart = useSelector(state => state.cart.cartItems);
  const [tableHead1, setTableHead1] = React.useState(['Product', 'Quantity', 'Price', 'Total']);
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    setTableData(cart.map((item, index) => (
      [item.name, item.cartQuantity, item.price, item.totalPrice]
    )))

  }, [cart]);

  const date = new Date()  // get current date
  const newDate =  date.toGMTString().replace('GMT', '') 

   
  return (
    <AuthLayout
      title={ `Table - ${props?.route?.params?.number}`}
      subtitle={`${newDate}`}
    >
        {/* <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 150,
        }}>
        <LottieView source={animation.check_mark} autoPlay loop  style={{  width: 150,  height: 150, }}  />
        </View> */}
        <View style={{ marginTop: 10, }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={tableHead1} style={styles.head} textStyle={styles.text} flexArr={[2, 1, 1, 1]} />
            <Rows data={tableData} textStyle={styles.text} flexArr={[2, 1, 1, 1]} style={{marginVertical: SIZES.base, }} />
          </Table>
        </View>
        
        <Text style={styles.bottom}>Total Quantity - {cartTotalQuantity}</Text>
        <Text style={styles.bottom}>Charges & Taxes - {tax}</Text>
        <Text style={styles.bottom}>Total Price - {cartTotalAmount}</Text>
{/*         
        <View style={{
          flex: 1,
          alignItems:'center',
          justifyContent:'center',
          minHeight: 100,
          marginBottom: 10,

        
        }}>
        <LottieView source={animation.cooking} autoPlay loop  style={{  width: 150,  height: 150, }}/>
        </View> */}
    </AuthLayout>

  )
}

export default Billing

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
    color:COLORS.black,   
    fontWeight: '900',

  },
  text: {
    margin: 6,
    textAlign: 'center',
    color: COLORS.darkGray2,
  },
  bottom:{
    ...FONTS.h5, fontWeight: '600', color: COLORS.darkGray, marginTop: 10, 
    fontWeight: '700',
    
  }


})