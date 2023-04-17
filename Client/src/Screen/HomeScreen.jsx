import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Service from '../api';
import {List} from 'react-native-paper';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: new Date(),
      news: null,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        dateTime: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  api() {
    Service.NewsPinAPI()
      .then(response => {
        // console.log(response.data);
        this.setState({news: response.data});
      })
      .catch(error => console.error(error));
  }

  handleItemPress = itemId => {
    // console.log(itemId);
    this.props.navigation.navigate('MessageStack', {
      screen: 'Details',
      params: {itemId},
    });
  };

  render() {
    const {dateTime, news} = this.state;
    this.api();
    return (
      <View style={styles.container}>
        <View style={styles.widthbox}>
          <Image style={styles.logo} source={require('../../asset/Logo.png')} />
          <View style={styles.time}>
            <Text style={{fontSize: 18}}>
              {dateTime.toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={{fontSize: 48}}>
              {dateTime.toLocaleTimeString('th-TH', {hour12: false})}
            </Text>
          </View>
        </View>
        <ScrollView>
          <List.Section>
            {Array.isArray(news) &&
              news.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.handleItemPress(item)}>
                  {/* {console.log(item['TopicNews'])} */}
                  <List.Item
                    style={styles.listItem}
                    key={index}
                    title={item['TopicNews']}
                    titleStyle={{fontSize: 24, fontWeight: 'bold'}}
                    titleNumberOfLines={1}
                    description={item['NewsDetail']}
                    descriptionStyle={{fontSize: 18}}
                    descriptionNumberOfLines={3}
                    keyExtractor={item => item.id.toString()}
                  />
                </TouchableOpacity>
              ))}
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  widthbox: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 10,
    flexDirection: 'row',
  },
  time: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    margin: 10,
    fontSize: 18,
  },
  logo: {
    width: '45%',
    height: '100%',
    resizeMode: 'contain',
  },
  newsText: {
    fontSize: 20,
    flexWrap: 'wrap',
  },
});
