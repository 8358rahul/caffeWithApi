import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux'



const optionsPerPage = [2, 3, 4];
const ConfirmOrder = () => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const cart = useSelector((state) => state.cart)
  return (
    <SafeAreaView style={{alignItems:'center' , marginTop: 20,}}>
      <Text style={{fontSize: 25,fontWeight: 'bold',color:'#000'}}>Bill</Text>
    {cart.cartItems===undefined?<Text style={{fontSize: 20,alignItems: 'center',color:'#000'}}>No Items</Text>: 
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Product</DataTable.Title>
        <DataTable.Title numeric>Quentity</DataTable.Title>
        <DataTable.Title numeric>Total</DataTable.Title>
      </DataTable.Header>
      
      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
}
    </SafeAreaView>
  )
}

export default ConfirmOrder

const styles = StyleSheet.create({})