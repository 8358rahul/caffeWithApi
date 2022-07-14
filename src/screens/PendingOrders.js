import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {List, Button} from 'react-native-paper';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  FAMILY,
  animation,
  Dimensions,
} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import AuthLayout from './AuthLayout';
import {TextButton} from '../components';
import LottieView from 'lottie-react-native';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const PendingOrders = () => {
  const dispatch = useDispatch();
  // const {timer} = useSelector(state => state.cart);
  const [pendingOrder, setPendingOrder] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // API CALLING FOR PENDING ORDERS
  const getData = async () => {
    let response = await apiService('POST', ApiEndpoints.PENDING, {});
    console.log('response', response);
    setPendingOrder(response);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const compltedOrder = async item => {
    const response = await apiService('PUT', ApiEndpoints.UPDATE + item.id, {
      order_contains: item.order_contains,
      order_status: '2',
      table_number: item.table_number,
    });
    console.log('order status------', response);
    setIsLoading(false);
    return response;
  };
 
  const UrgeWithPleasureComponent = ( duration = 0) => (
  
    <CountdownCircleTimer
      size={50}
      isPlaying
      // initialRemainingTime={15}
      duration={pendingOrder !== null ? parseInt(duration) : 0}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 3, 0]}
      strokeWidth={7}
      // onComplete={() => {
      //   return { shouldRepeat: true, delay: 1} 
      // }}      
      >   
      {({ remainingTime }) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
  )

  return (
    <AuthLayout
      title={
        pendingOrder?.data?.length == 0
          ? 'You have no pending orders'
          : 'Pending Orders'
      }
      subtitle="You have pending orders">
      {isLoading ? (
        <View
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
        </View>
      ) : (
        <FlatList
          data={pendingOrder !== null ? pendingOrder?.data : []}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
                width: '100%',
              }}>             
              <List.Item
             
                title={'Table #' + item.table_number}
                titleStyle={{fontFamily: FAMILY.bold}}
                description={ "Pending " }
                left={() => (
                  // <Image
                  //   source={icons.p}
                  //   style={{width: 50, height: 50, marginTop: 5}}
                  // />
         
                  UrgeWithPleasureComponent(item.table_number) 
                  
                  
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Button
                      mode="contained"
                      icon={icons.done}
                      color={COLORS.green}
                      loading={isLoading}
                      labelStyle={{
                        color: COLORS.white,
                        fontFamily: FAMILY.bold,
                        fontSize: SIZES.h5,
                      }}
                      style={styles.btn}
                      onPress={() => {
                        compltedOrder(item);
                        getData();
                      }}>
                      Done
                    </Button>
                  </View>
                )}
                style={styles.listItem}
              />
            </View>
          )}
        />
      )}
    </AuthLayout>
  );
};

export default PendingOrders;

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
  },
});
