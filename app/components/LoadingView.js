import React from 'react';
import {
  View, ActivityIndicator, Platform, SafeAreaView, StatusBar,
} from 'react-native';

const LoadingView = () => (
  <View style={{ flex: 1, backgroundColor: '#181818' }}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        flex: 1, backgroundColor: '#202020', marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, justifyContent: 'center', alignItems: 'center',
      }}
      >
        <ActivityIndicator size="large" color="#D00000" />
      </View>
    </SafeAreaView>

  </View>
);

export default LoadingView;
