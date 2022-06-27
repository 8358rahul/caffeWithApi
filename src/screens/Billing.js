import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { useSelector, useDispatch } from 'react-redux'
const Billing = () => {
  const { cartTotalQuantity, cartTotalAmount, tax } = useSelector((state) => state.cart);
  const cart = useSelector(state => state.cart.cartItems);
  const [tableHead1, setTableHead1] = React.useState(['Product', 'Quantity', 'Price', 'Total']);
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    setTableData(cart.map((item, index) => (
      [item.name, item.cartQuantity, item.price, item.totalPrice]
    )))

  }, [cart]);

  const date = new Date() // get current date
  const newDate = date.toUTCString() // get current date


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Image source={icons.logo} style={{ width: 120, height: 120, backgroundColor: '#fff', borderRadius: 50, marginLeft: 120, }} />
        <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: '#000', marginLeft: 120, marginTop: 10, }}>Table - 02</Text>
        <Text style={{ ...FONTS.h4, color: '#000', marginLeft: 50, marginTop: 10, }}> {newDate}</Text>
        <View style={{ marginTop: 10, }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={tableHead1} style={styles.head} textStyle={styles.text} flexArr={[2, 1, 1, 1]} />
            <Rows data={tableData} textStyle={styles.text} flexArr={[2, 1, 1, 1]} style={{marginVertical: SIZES.base, }} />
          </Table>
        </View>
        <Text style={{ ...FONTS.h4, fontWeight: '600', color: '#000', marginTop: 10, }}>Total Quantity - {cartTotalQuantity}</Text>
        <Text style={{ ...FONTS.h4, fontWeight: '600', color: '#000', marginTop: 10, }}>15% Tax - {tax}</Text>
        <Text style={{ ...FONTS.h4, fontWeight: '600', color: '#000', marginTop: 10, }}>Total Price - {cartTotalAmount}</Text>
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
    ...FONTS.h4,
    height: 40,
    backgroundColor: '#f1f8ff',

  },
  text: {
    ...FONTS.h5,
    margin: 6,
    textAlign: 'center',
    color: '#000',
  },

})