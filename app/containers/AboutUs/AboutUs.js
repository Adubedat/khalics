import React from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import theme from '../../theme';

const ContactUs = () => (
  <View style={{ flex: 1, padding: 10, backgroundColor: theme.darkGray2 }}>
    <StatusBar barStyle="light-content" />
    <Text style={{
      fontWeight: 'bold', color: 'white', marginBottom: 18, fontSize: 17,
    }}
    >
        Khalics was founded by arthur and renan
    </Text>
    <Text style={{ color: 'white', fontSize: 15 }}>
        Curabitur eget erat pellentesque, ultricies diam vitae, viverra lectus.
        Aliquam et arcu vitae risus convallis egestas.
        Aliquam nec sem non metus ullamcorper suscipit ac sit amet leo.
        Vestibulum dictum, eros nec convallis viverra, purus quam pulvinar leo, eget dapibus neque enim vel augue.
        Donec non maximus nisl.
    </Text>
  </View>
);

export default ContactUs;
