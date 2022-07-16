import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';
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
import AuthLayout from './AuthLayout';
import LottieView from 'lottie-react-native';
import {ApiEndpoints} from '../helper/httpConfig';
import {apiService} from '../helper/http';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Button} from '@rneui/themed';

const PendingOrders = props => {
  const [pendingOrder, setPendingOrder] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBtnLoading, setIsBtnLoading] = React.useState(false);

  // API CALLING FOR PENDING ORDERS
  const getData = async () => {
    let response = await apiService('POST', ApiEndpoints.PENDING, {});
    if(response.success){
      setPendingOrder(response);
      setIsLoading(true);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [props.navigation]);

  const compltedOrder = async item => {
    setIsBtnLoading(item.id);
    const response = await apiService('PUT', ApiEndpoints.ORDERS + item.id, {
      order_contains: item.order_contains,
      order_status: '2',
      table_number: item.table_number,
    });
    if (response.success) {
      setIsBtnLoading();
      getData();
    } 
  };

  const UrgeWithPleasureComponent = (duration = 0) => (

 
    <CountdownCircleTimer
      size={50}
      isPlaying
      duration={pendingOrder !== null ? parseInt(duration) : 0}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 3, 0]}
      strokeWidth={7}  
      onTimeElapsed={() => {
        getData();

      }}
      onComplete={() => {
        getData();
      }}
      onUpdate={() => {
        getData();

      }}
      >
      {({remainingTime}) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer> 
  );

  return (
    <AuthLayout
      title={
        pendingOrder?.data?.length == 0
          ? 'You have no pending orders'
          : 'Pending Orders'
      }
      subtitle="You have pending orders">
      {!isLoading ? (
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
                description={'Pending '}
                left={() => UrgeWithPleasureComponent(item.table_number) }
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Button
                      title="DONE"
                      loading={ item.id==isBtnLoading? true:false}
                      titleStyle={{fontWeight: 'bold', fontFamily: FAMILY.bold}}
                      buttonStyle={{
                        backgroundColor: COLORS.green,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}
                      containerStyle={{
                        width: 80,
                        height: 50,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        compltedOrder(item);
                      }}
                    />
                  </View>
                )}
                style={styles.listItem}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => getData()}
            />
          }
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
});
