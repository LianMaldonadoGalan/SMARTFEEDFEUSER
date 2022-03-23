import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, Image, Text, View, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from '../../components/Spacer';
import { Picker } from "@react-native-picker/picker";
import { Context as UserDataContext } from "../context/UserDataContext";
import DataTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const AccountScreen = ({navigation}) => {
    const { state: stateUserData } = useContext(UserDataContext);
    
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState(stateUserData.name);

    const [sex, setSex] = useState(stateUserData.sex);

    const [editAge, setEditAge] = useState(false);
    const [age, setAge] = useState(null);

    const [date, setDate] = useState('1998-12-07');
    const [show, setShow] = useState(false);

    //Setear la edad por primera vez
    useEffect(() => {    
        const fechaAct = new Date();
        const fechaNac = Date.parse(stateUserData.birth_date);
        const edad = fechaAct - fechaNac;

        console.log('Edad  ' + Math.floor(edad/(1000*60*60*24*365)-.015));
        setAge(String(Math.floor(edad/(1000*60*60*24*365)-.015)));
    }, [])

    const onChange = (event, selectedDate) => {
        
        if(selectedDate){
            const fechaAct = new Date();
            const fechaNac = selectedDate;
            const edad = fechaAct - fechaNac;
            
            //Math.floor(edad/(1000*60*60*24*365)-.015) Es para convertir la diferencia de fechas en años. El -.015 es una pequeña validación.
            console.log('Edad  ' + Math.floor(edad/(1000*60*60*24*365)-.015));
            setAge(String(Math.floor(edad/(1000*60*60*24*365)-.015)));
            console.log(stateUserData.birth_date);
            setDate(fechaNac);
        }
        setShow(false);
    }
 
    return (
        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView>
                        <Image source={{uri: stateUserData.profile_picture}} style={styles.imagestyle}/>
                        
                        <Spacer>
                        <Input
                            disabled = {editName ? false : true}
                            value={name}
                            onChangeText={(name) => setName(name)}
                            autoCapitalize= "none"
                            autoCorrect={false}
                            editable = {editName ? true : false}
                            label="Nombre" 
                            labelStyle={styles.label}
                            rightIcon={{ type: 'font-awesome', size: 30, name: 'pencil' , color: '#60656C', onPress:() => setEditName(true)}}
                            blurOnSubmit={false}
                            //onChangeText={}
                        />
                        </Spacer>

                        <Text style={styles.label2}>Sexo</Text>
                        <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginHorizontal: 14}}>
                        <Picker
                            selectedValue={sex}
                            onValueChange={(itemValue, itemIndex) =>
                                setSex(itemValue)
                                }
                            style={styles.picker}
                        >
                            <Picker.Item label="Masculino" value="M"/>
                            <Picker.Item label="Femenino" value="F"/>
                        </Picker>
                        </View>
                    
                        <Spacer>
                        <Input
                            disabled = {editAge? false : true}
                            value={age}
                            onChangeText={(age) => setAge(age)}
                            editable = {editAge ? true : false}
                            label="Edad" 
                            labelStyle={styles.label}
                            rightIcon={{ type: 'font-awesome', size: 30, name: 'pencil' , color: '#60656C', onPress:() => setEditAge(true)}}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            //onChangeText={}
                        />
                        </Spacer>

                        <View>
                            <Button onPress={() => setShow(true)} title='Modificar fecha de nacimiento'></Button>
                        </View>
                        {show && (
                            <DataTimePicker
                                value={date}
                                mode={'date'}
                                onChange={onChange}
                            />
                        )}

                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};




const styles = StyleSheet.create({
    imagestyle:{
        marginTop: 10,
        height: 180,
        width: 180,
        alignSelf: "center",
        marginBottom: 25,
        borderRadius: 150,
        overflow: "hidden",
        borderWidth:1,
        borderColor: 'black'
    },
    label:{
        marginTop: 32,
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 18,
    },
    label2:{
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 18,
        marginHorizontal: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    picker:{
        color: '#60656C',
        borderColor: '#60656C',
        borderWidth: 1,
        marginHorizontal: 14,
        
    },
   
});

export default AccountScreen;
