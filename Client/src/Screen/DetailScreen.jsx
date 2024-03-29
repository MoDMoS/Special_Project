import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function DetailScreen({ navigation }) {
  const route = useRoute();

  const news = route.params.itemId;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{news.NewsTitle}</Text>
        <Text style={styles.detail}>{news.NewsDetail}</Text>

      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Message')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
