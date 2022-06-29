import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { icons, images, SIZES, COLORS, FONTS,animation } from "../constants";
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView source={animation.check_mark} autoPlay loop  style={{  width: 150,  height: 150, }}  />
        </View>
        <Text style={{ ...FONTS.h3, fontWeight: 'bold', color: '#000',  }}>Table - {props?.route?.params?.number}</Text>
        <Text style={{ ...FONTS.h4, color: '#000',marginTop: 20,}}> {newDate}</Text> 
        <View style={{ marginTop: 10, }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={tableHead1} style={styles.head} textStyle={styles.text} flexArr={[2, 1, 1, 1]} />
            <Rows data={tableData} textStyle={styles.text} flexArr={[2, 1, 1, 1]} style={{marginVertical: SIZES.base, }} />
          </Table>
        </View>
        <View style={styles.bottomView}>
        <Text style={{ ...FONTS.h5, fontWeight: '600', color: '#000', marginTop: 10, }}>Total Quantity - {cartTotalQuantity}</Text>
        <Text style={{ ...FONTS.h5, fontWeight: '600', color: '#000', marginTop: 10, }}>Charges & Taxes - {tax}</Text>
        <Text style={{ ...FONTS.h5, fontWeight: '600', color: '#000', marginTop: 10, }}>Total Price - {cartTotalAmount}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <LottieView source={animation.cooking} autoPlay loop  style={{  width: 150,  height: 150, }}/>
        </View>
      </ScrollView>
    </View>

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

  },
  text: {
    margin: 6,
    textAlign: 'center',
    color: '#000',
  },
  bottomView: {
    marginTop: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#c8e1ff',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  }


})