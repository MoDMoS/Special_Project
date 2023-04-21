import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List, Searchbar } from 'react-native-paper';

import Service from '../api';

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: null,
      searchQuery: ''
    };
  }

  componentDidMount() {
    Service.ContactsAPI()
      .then((response) => {
        // console.log(response.data);
        this.setState({ contacts: response.data });
      })
      .catch((error) => console.error(error));
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  render() {
    const { contacts, searchQuery } = this.state;

    // Filter the contacts array based on the search query
    const filteredContacts = Array.isArray(contacts) && contacts.filter((item) => {
      const fullName = item['TitleName'] + item['FirstName'] + ' ' + item['LastName'];
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={this.handleSearch}
          value={searchQuery}
        />
        <ScrollView style={styles.scrollView}>
          <List.Section>
            {filteredContacts && filteredContacts.map((item, index) =>
                <List.Item
                  style={styles.listItem}
                  key={index}
                  title={item['TitleName'] + item['FirstName'] + ' ' + item['LastName']}
                  titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                  titleNumberOfLines={1}
                  description={item['DepartmentName'] + '\n' + item['PhoneNumber'] + '\n' + item['Email']}
                  descriptionStyle={{ fontSize: 18 }}
                  descriptionNumberOfLines={3}
                  keyExtractor={(item) => item.id.toString()}
                />
            )}
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
  listItem: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    margin: 10,
    fontSize: 18,
  }
});
