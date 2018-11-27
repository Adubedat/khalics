import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  ... // more items
]


class WorkoutList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
      </View>
    );
  }
}

export default WorkoutList;
