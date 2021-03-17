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
      color: 'white', marginBottom: 18, fontSize: 17,
    }}
    >
        If you have any suggestions please contact us at
      <Text style={{ fontWeight: 'bold' }}>
        {' contact@khalics.com'}
      </Text>
    </Text>
  </View>
);

export default ContactUs;
