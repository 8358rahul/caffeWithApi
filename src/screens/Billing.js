import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  BackHandler,
  ScrollView
} from 'react-native';
import React from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  animation,
  FAMILY,
} from '../constants';
import LottieView from 'lottie-react-native';
import AuthLayout from './AuthLayout';
import {Button} from 'react-native-paper';
import RNPrint from 'react-native-print';
import {useSelector, useDispatch} from 'react-redux';
import { clearCart, clearInstructions } from '../redux/cartSlice';

const Billing = props => {
  const dispatch = useDispatch();
  const [tableHead1, setTableHead1] = React.useState([
    'Product',
    'Instruction',
    'Quantity',
    'Price',
    'Total',
  ]);
  const [tableData, setTableData] = React.useState(null);
  const [mainData, setMainData] = React.useState([]);
  const translateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const data = props?.route?.params?.response;
    setTableData(data);
    setMainData(
      tableData?.order_contains?.map((item, index) => [
        item.product,
        item.instructions,
        item.quantity,
        item.price,
        item.totalPrice,
      ]),
    )       
  }, [tableData]);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.navigation.navigate('Home');
        dispatch(clearCart());
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(translateAnim, {
        toValue: -360,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 600);
   
  }, []);

  const date = new Date(); // get current date
  const newDate = date.toGMTString().replace('GMT', '');

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath:
        'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
    });
  };

  return (
     
    <ScrollView style={styles.container}  >
    <AuthLayout
      title={`Table - ${tableData?.table_number}`}
      subtitle={`${newDate}`}
      hideHeader={true}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute', //*
          width: '100%',
          height: Dimensions.get('window').height,
          transform: [{translateY: translateAnim}],
          zIndex: 10,
        }}>
        <LottieView
          loop={false}
          source={animation.done}
          autoPlay
          style={{width: 200, height: 200}}
          size={20}
        />
        {/* </Animated.View> */}
      </Animated.View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 10,
        }}>
        <Button
          icon={icons.print}
          mode="elevated"
          onPress={() => printRemotePDF()}
          labelStyle={{fontFamily: FAMILY.bold}}
          uppercase={false}>
          Print
        </Button>
      </View>

      <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
        <Row
          data={tableHead1}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[2, 1, 1, 1]}
        />
        <Rows
          data={mainData}
          textStyle={styles.text}
          flexArr={[2, 1, 1, 1]}
          style={{marginVertical: SIZES.base}}
        />
      </Table>
      {tableData != null ? (
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <Text style={styles.bottom}>
              Total Quantity - {tableData.totalQuantity}
            </Text>
            <Text style={styles.bottom}>
              Charges & Taxes - {tableData.taxes}
            </Text>
            <Text style={styles.bottom}>
              Total Price - {tableData.totalAmount}
            </Text>
          </View>
        </View>
      ) : null}

      <View
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,

    
        }}>
        <LottieView
          source={animation.cooking}
          autoPlay
          loop
          style={{width: 150, height: 150}}
        />
      </View>
    </AuthLayout>
    </ScrollView>
  
  );
};

export default Billing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: SIZES.base,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base * 2,
    
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
    marginVertical: SIZES.base - 4,
  },
});
