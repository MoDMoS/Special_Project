import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date(),
      news: null
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        dateTime: new Date(),
      });
    }, 1000);

    fetch('http://localhost:3000/api/news', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ news: data });
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  render() {
    const { dateTime, news } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.widthbox}>
          <Image style={styles.logo} source={require('../../asset/Logo.png')} />
          <View style={styles.time}>
            <Text style={{ fontSize: 18 }}>{dateTime.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            <Text style={{ fontSize: 50 }}>{dateTime.toLocaleTimeString('th-TH', { hour12: false })}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')}>
              <View style={styles.box}>
                {Array.isArray(news) && news.map((item, index) =>
                  index === 0 ? (
                    <Text key={index} style={styles.newsText} numberOfLines={5}>{item['NewsDetail']}</Text>
                  ) : null
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')}>
              <View style={styles.box}>
                {Array.isArray(news) && news.map((item, index) =>
                  index === 1 ? (
                    <Text key={index} style={styles.newsText} numberOfLines={5}>{item['NewsDetail']}</Text>)
                    : null
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')}>
              <View style={styles.box}>
                {Array.isArray(news) && news.map((item, index) =>
                  index === 2 ? (
                    <Text key={index} style={styles.newsText} numberOfLines={5}>{item['NewsDetail']}</Text>)
                    : null
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')}>
              <View style={styles.box}>
                {Array.isArray(news) && news.map((item, index) =>
                  index === 3 ? (
                    <Text key={index} style={styles.newsText} numberOfLines={5}>{item['NewsDetail']}</Text>)
                    : null
                )}
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  widthbox: {
    width: 400,
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
    // borderColor: 'black',
    // borderWidth: 1,
  },
  box: {
    width: 180,
    height: 220,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 10,
    marginStart: 5,
    marginEnd: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  logo: {
    width: '45%',
    height: '100%',
    resizeMode: 'contain',
  },
  newsText: {
    fontSize: 20,
    flexWrap: 'wrap',
  }
})