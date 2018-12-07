import React from 'react';
import { View, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import styles from './styles';
import theme from '../../theme';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SignOut = () => {
    const { screenProps } = this.props;
    Auth.signOut()
      .then((data) => {
        console.log(data);
        screenProps.session();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: theme.darkGray2 }}>
        <StatusBar barStyle="light-content" />
        <ListItem
          chevron
          containerStyle={styles.item_container}
          title="Change password"
          titleStyle={styles.title}
          onPress={() => {}}
        />
        <ListItem
          chevron
          containerStyle={styles.item_container}
          title="Bug report"
          titleStyle={styles.title}
          onPress={() => {}}
        />
        <ListItem
          chevron
          containerStyle={styles.item_container}
          title="Contact us"
          titleStyle={styles.title}
          onPress={() => {}}
        />
        <ListItem
          chevron
          containerStyle={styles.item_container}
          title="About us"
          titleStyle={styles.title}
          onPress={() => {}}
        />
        <ListItem
          chevron
          containerStyle={styles.item_container}
          title="Log out"
          titleStyle={styles.title}
          onPress={() => { this.SignOut(); }}
        />
        <ListItem
          containerStyle={styles.item_container}
          title="Version alpha 0.0.1"
          titleStyle={styles.title}
        />
      </View>
    );
  }
}

export default Settings;
