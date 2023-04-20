import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
``
import Service from '../api';

export default function BookingScreen({ navigation }) {
    const route = useRoute();
    const data = route.params

    const [topic, setTopic] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async () => {
        const EmpID = await AsyncStorage.getItem('ID');
        // console.log(JSON.stringify(data.RoomID), topic, JSON.parse(EmpID), data.Date, data.Start, data.End);
        if (topic.length <= 10 && topic !== ''){
            Service.BookingAPI( JSON.stringify(data.RoomID), topic, JSON.parse(EmpID), data.Date, data.Start, data.End )
            .then((response) => {
                console.log(response.data);
                navigation.navigate('Meeting')
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            Alert.alert('กรุณากำหนดหัวข้อการใช้ห้องประชุม');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { marginTop: 10 }]}>
                หมายเลขห้อง:
            </Text>
            <TextInput
                style={styles.input}
                value={route.params.RoomName}
                editable={false}
            />
            <Text style={[styles.label, { marginTop: 10 }]}>
                หัวข้อการประชุม:
            </Text>
            <TextInput
                style={styles.input}
                placeholder="หัวข้อการประชุม"
                value={topic}
                onChangeText={text => setTopic(text)}
            />
            <Text style={[styles.label, { marginTop: 10 }]}>
                ที่จอง:
            </Text>
            <View style={{ flexDirection: 'row', }}>
                <TextInput
                    style={styles.time}
                    placeholder="Date"
                    value={route.params.Start}
                    editable={false}
                />
                <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold', marginBottom: 5, }}> - </Text>
                <TextInput
                    style={styles.time}
                    placeholder="Date"
                    value={route.params.End}
                    editable={false}
                />
            </View>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                    style={styles.redbutton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>ยกเลิก</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitbutton}
                    disabled={isDisabled}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        minWidth: 300,
    },
    time: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        minWidth: 170,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    redbutton: {
        backgroundColor: 'red',
        padding: 10,
        width: '50%',
        borderRadius: 5,
    },
    submitbutton: {
        backgroundColor: 'green',
        padding: 10,
        width: '50%',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
