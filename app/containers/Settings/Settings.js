import React from 'react';
import {
  View, Platform, StatusBar, SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SignOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{
            flex: 1, backgroundColor: '#202020', marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Button onPress={() => { this.SignOut(); }} title="Log out" />
          </View>
        </SafeAreaView>

      </View>
    );
  }
}

export default Settings;
