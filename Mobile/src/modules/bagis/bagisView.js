import React, { Fragment }  from 'react';
import {
  StyleSheet,
  View,
SafeAreaView, ScrollView, StatusBar, Alert,
  Image,Platform
} from 'react-native';
import {  Button } from '@ui-kitten/components';
import { Input,Radio, RadioGroup, } from '@ui-kitten/components';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { useDispatch, useSelector } from 'react-redux';

import { donate } from '../../redux/actions/authActions';
const PaymentRequest = require('react-native-payments').PaymentRequest;
export default function bagisScreen(props) {
  const METHOD_DATA = [{
    supportedMethods: ['apple-pay','android-pay'],
    data: {
      merchantIdentifier: 'merchant.apple.test',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
  
    }
  }];
  const METHOD_DATA_android = [{
    supportedMethods: ['apple-pay','android-pay'],
    data: {
      merchantIdentifier: 'merchant.apple.test',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
      paymentMethodTokenizationParameters: {
        // tokenizationType: "GATEWAY_TOKEN",
        tokenizationType: 'NETWORK_TOKEN',
        parameters: {
          publicKey:'pk_test_51I5wapmXmOyoqYiJvT9QU00JMWuQtpg'
          // gateway: "stripe",
          // 'stripe:publishableKey':
          //   'pk_test_51SjonY7g500rYY0D6YE',
            
        },
      }
    }
  }];


  let paymentRequest =null;
  const paymetDetail = [{
    id: 1, detail: {
      id: '1',
      displayItems: [
        {
          label: 'Öğrenci Desteği',
          amount: { currency: 'TL', value: '1.00' }
        }
      ],
      total: {
        label: 'Bağış Tutarı',
        amount: { currency: 'TL', value: '1.00' }
      }
    }
  },
  {
    id: 2, detail: {
      id: '2',
      displayItems: [
        {
          label: 'Çay',
          amount: { currency: 'TL', value: '5.00' }
        }
      ],
      total: {
        label: 'Bağış Tutarı',
        amount: { currency: 'TL', value: '5.00' }
      }
    }
  },
  {
    id: 3, detail: {
      id: '3',
      displayItems: [
        {
          label: 'Kahve',
          amount: { currency: 'TL', value: '10.00' }
        }
      ],
      total: {
        label: 'Bağış Tutarı',
        amount: { currency: 'TL', value: '10.00' }
      }
    }
  }
  ];


  const OPTIONS = {

  };




  check = () => {
    let detail = null;
    if ((selectedIndex == -1) && amount <=0) {
      Alert.alert(
        'Uyarı',
        'Lütfen Seçim Yapınız'
      );
      detail = null;
    }
    else {
      if (selectedIndex == 0 && amount <= 0) {
        Alert.alert(
          'Bilgilendirme',
          'Desteğiniz için teşekkürler'
        );
        detail = null;
        dispatch(donate());
      }
      else if (amount >= 0) {
        detail = {
          id: 'deneme',
          displayItems: [
            {
              label: 'Bağış Tutarı',
              amount: { currency: 'TL', value:amount}
            }
          ],
          total: {
            label: 'Bağış Tutarı',
            amount: { currency: 'TL', value: amount}
          }
        };
      
      }
      else{
        var type= paymetDetail.find(x=> x.id==selectedIndex);
        if(type)
         detail=type.detail;
         else 
          detail=null;
      }
      // paymetDetail


   

      if (detail!=null) {
        if (Platform.OS === 'android') {
          paymentRequest = new PaymentRequest(METHOD_DATA_android, detail, OPTIONS);
        }
        else{
  
          paymentRequest = new PaymentRequest(METHOD_DATA, detail, OPTIONS);
        }
  
        this.pay();
    
      }
    }
  };



  
pay = () => {

  paymentRequest.canMakePayments().then((canMakePayment) => {
  if (canMakePayment) {
    console.log('Can Make Payment')

    paymentRequest.show()
      .then(paymentResponse => {
        // Your payment processing code goes here
      
        paymentResponse.complete('success');
        dispatch(donate());
  
      }).then(()=>{    Alert.alert(
        'Bilgilendirme',
        'Desteğiniz için teşekkürler'
      );});
 
  }
  else {
    console.log('Cant Make Payment')
  }
})
}
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [amount, setAmount] = React.useState(-1);

  return (
    <View style={styles.container}>
  
          <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        
        <Image
        style={styles.tinyLogo}
        source={require('../../../assets/images/pages/bagis/developer.jpeg')}
      />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Neden bağış istiyoruz ?</Text>
              <Text style={styles.sectionDescription}>
              Uygulamlarımızı ücretsiz fakat reklamlı yapıyoruz. Reklamlardan en az bizde sizin kadar nefret ettiğimizden dolayı bağış alarak reklamsız uygulamayı kullanmanızı isteriz. Ayrıca geliştiricilerimiz uygulamaları geliştiriken biraz masraflı oluyor. Bu masraflara bağış yaparak destek olabilrsiniz. Son olarak size burada bıraktığımız fotoğraf ile selamlarımızı iletiyoruz.
              </Text>
         
            </View>
          </View>
          <View style={styles.body}>
           
      <RadioGroup
    selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}>
   
      
           <Radio   style={styles.itemContainer}>
         
              <View style={styles.itemDetail}>
              <Text style={styles.itemPrice}>Hayır Duası</Text>
             
              </View>
              <View style={styles.itemPrice}>
                <Text style={{marginLeft:120}}>0.00 TL</Text>
              </View>
          
            </Radio>

            <Radio style={styles.itemContainer}>
              <View style={styles.itemDetail}>
              <Text style={styles.itemPrice}>Öğrenci Desteği</Text>
             
              </View>
              <View style={styles.itemPrice}>
                <Text style={{marginLeft:120}}>1.00 TL</Text>
              </View>
            </Radio>
            <Radio style={styles.itemContainer}>
              <View style={styles.itemDetail}>
              <Text style={styles.itemPrice}>Çay</Text>
             
              </View>
              <View style={styles.itemPrice}>
                <Text style={{marginLeft:120}} >5.00 TL</Text>
              </View>
            </Radio>
            <Radio style={styles.itemContainer}>
              <View style={styles.itemDetail}>
              <Text style={styles.itemPrice}>Kahve</Text>
             
              </View>
              <View style={styles.itemPrice}>
                <Text style={{marginLeft:120}}>10.00 TL</Text>
              </View>
            </Radio>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetail}>
              <Text style={styles.itemTitle}>Siz ne isterseniz</Text>
             
              </View>
              <View style={styles.itemPrice}>
              <Input
              status='control'
              placeholder='0.00 TL'
              style={{backgroundColor:'#50ad33'}}
              value={amount}
              keyboardType={'numeric'}
              onChangeText={setAmount}
            />
              </View>
         
            </View>
             
            </RadioGroup>

                     <Button
            style={styles.signInButton}
            size='giant'
            onPress={() =>   this.check()}>
           Bağış Yap
          </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
        </View>
  

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  signInButton: {
    marginHorizontal: 16,
    minWidth: 300,
    backgroundColor: '#50ad33'
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  tinyLogo: {
    width: 'auto',
    height: 250,
    marginTop:40
  },
  scrollView: { backgroundColor: 'white'},
  engine: { position: 'absolute', right: 0},
  body: {backgroundColor: colors.white, borderBottomColor: "#cccccc", borderBottomWidth: 1, paddingBottom: 10},  
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },  
  itemContainer: {marginTop: 12,paddingHorizontal: 24,display: "flex",flexDirection: 'row'},
  totalContainer: {marginTop: 12,paddingHorizontal: 24,display: "flex",flexDirection: 'row',borderTopColor: "#cccccc",borderTopWidth: 1,paddingTop: 10,marginBottom: 20},
  itemDetail: {flex: 2,width:100},
  itemTitle: {fontWeight: '500',fontSize: 18},
  itemDescription: {fontSize: 12},
  itemPrice: {flex: 1},
  sectionTitle: {fontSize: 24,fontWeight: '600',color:'black',},
  sectionDescription: {marginTop: 8,fontSize: 12,fontWeight: '400',color: 'black',},
  highlight: {fontWeight: '700',},
  footer: {color: 'black',fontSize: 12,fontWeight: '600',padding: 4,paddingRight: 12,textAlign: 'right',},
});
