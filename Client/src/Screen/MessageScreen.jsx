import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/news', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((Data) => {
        this.setState({ news: Data });
        console.log(Data);
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
      <ScrollView style={{ backgroundColor: "black" }}>
        <List.Section>
          {Array.isArray(news) && news.map((item, index) =>
            <TouchableOpacity key={index} onPress={() => this.handleItemPress(item)}>
              <List.Item
                style={styles.listItem}
                key={index}
                title={item['NewsTitle']}
                titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                titleNumberOfLines={1}
                description={item['NewsDetail']}
                descriptionStyle={{ fontSize: 18 }}
                descriptionNumberOfLines={4}
                keyExtractor={(item) => item.id.toString()}
              />
            </TouchableOpacity>)
          }

        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  newsText: {
    fontSize: 16
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    margin: 10,
    fontSize: 18,
  }
})
