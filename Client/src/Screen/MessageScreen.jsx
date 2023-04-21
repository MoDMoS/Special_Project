import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';

import Service from '../api';

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: null
    };
  }

  componentDidMount() {
    Service.NewsAPI()
      .then((response) => {
        // console.log(response.data);
        this.setState({ news: response.data });
      })
      .catch((error) => console.error(error));
  }
  
  handleItemPress = (itemId) => {
    // navigate to detail screen with the itemId
    this.props.navigation.navigate('Details', { itemId: itemId });
    // console.log(itemId)
  }

  render() {
    const { news } = this.state;
    return (
      <ScrollView>
        <List.Section>
          {Array.isArray(news) && news.map((item, index) =>
            <TouchableOpacity key={index} onPress={() => this.handleItemPress(item)}>
              <List.Item
                style={styles.listItem}
                key={index}
                title={item['TopicNews']}
                titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                titleNumberOfLines={1}
                description={item['NewsDetail']}
                descriptionStyle={{ fontSize: 18 }}
                descriptionNumberOfLines={3}
                keyExtractor={(item) => item.id.toString()}
              />
            </TouchableOpacity>
          )}
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    margin: 10,
    fontSize: 18,
  }
})
