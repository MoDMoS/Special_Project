import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.widthbox}></View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text>Test</Text>
        </View>
        <View style={styles.box}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  widthbox: {
    width: 400,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 10
  },
  box: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 10,
    marginStart: 5,
    marginEnd: 5
  },
})