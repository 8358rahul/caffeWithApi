import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import AuthLayout from './AuthLayout';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  FAMILY,
  animation,
} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {List, Button} from 'react-native-paper';
import RNPrint from 'react-native-print';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';
import LottieView from 'lottie-react-native';

const CompleteOrder = () => {
  const dispatch = useDispatch();
  const {compltedOrder} = useSelector(state => state.cart);
  const [completeOrder , setCompleteOrder] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);


  // API CALLING FOR COMPLETED ORDERS
 const getData = async () => {
    let response = await apiService('POST',ApiEndpoints.COMPLETED, {});
    setCompleteOrder(response);
    setIsLoading(false); 
  }

  React.useEffect(() => {
    getData();
  }, []);

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath:
        'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
    });
  };

  return (
    <AuthLayout
      title="Completed Orders"
      subtitle={'Total Order - ' +completeOrder?.data?.length}>
      {isLoading?(  <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,

            }}>
            <LottieView
              source={animation.loading}
              autoPlay
              style={{width: 100, height: 100}}
            />
          </View>):(
      <FlatList
        data={completeOrder?.data}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
            }}>
            <List.Item
              title={'Table #' + item.table_number}
              titleStyle={{fontFamily: FAMILY.bold}}
              description={item.order_status==1?"Completed ☑":null}
              descriptionStyle={{fontFamily: FAMILY.light}}
              left={() => (
                <Image
                  source={icons.c}
                  style={{width: 40, height: 40, marginTop: 5}}
                />
              )}
              right={() => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    icon={icons.print}
                    mode="elevated"
                    onPress={() => printRemotePDF()}
                    labelStyle={{fontFamily: FAMILY.bold}}
                    uppercase={false} >
                    
                    Print
                  </Button>
                </View>
              )}
              style={styles.listItem}
            />
          </View>
        )}
      /> )
}
    </AuthLayout>
  );
};

export default CompleteOrder;

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    
  },
  btn: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
