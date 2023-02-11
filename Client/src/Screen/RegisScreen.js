import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});