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

const AccountScreen = ({navigation}) => {
    const { state: stateUserData, updateUserData } = useContext(UserDataContext);
    
    //State local de la variable que permite modificar el nombre.
    const [editName, setEditName] = useState(false);
    //State local del nombre.
    const [name, setName] = useState(stateUserData.name);

    //State local del sexo.
    const [sex, setSex] = useState(stateUserData.sex);

    //State local de la edad.
    const [age, setAge] = useState(null);

    //State local de la fecha de nacimiento.
    const [date, setDate] = useState(new Date(stateUserData.birth_date));

    //State local de la variable que abre el calendario.
    const [show, setShow] = useState(false);

    //Setear la edad por primera vez
    useEffect(() => {    
        const fechaAct = new Date();
        const fechaNac = Date.parse(stateUserData.birth_date);
        const edad = fechaAct - fechaNac;

        setAge(String(Math.floor(edad/(1000*60*60*24*365)-.015)));
    }, [])

    //Función para cambiar de fecha de nacimiento y setear la edad según la fecha seleccionada.
    const onChange = (event, selectedDate) => {
        if(selectedDate){
            const fechaAct = new Date();
            const fechaNac = new Date(selectedDate);
            const edad = fechaAct - fechaNac;
            
            setAge(String(Math.floor(edad/(1000*60*60*24*365)-.015)));
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
                            disabled = {false}
                            value={age}
                            onChangeText={(age) => setAge(age)}
                            editable = {false}
                            label="Edad" 
                            labelStyle={styles.label}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                        />
                        </Spacer>

                        <Spacer>
                            <View>
                                <Button onPress={() => setShow(true)} title='Modificar fecha de nacimiento'></Button>
                            </View>
                        </Spacer>
                        
                        {show && (
                            <DataTimePicker
                                value={date}
                                mode={'date'}
                                onChange={onChange}
                            />
                        )}

                        <Button 
                            onPress={() => updateUserData(stateUserData.id_user, name, sex, date.toISOString())} 
                            title='Confirmar'
                            titleStyle={{color:'#FFFFFF'}}
                            buttonStyle={styles.submitButton}
                        />

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
    submitButton:{
        marginTop: 50,
        backgroundColor: '#2fa822',
        borderRadius: 10,
        padding: 25,
        alignSelf: "center",
        width: 350,
        marginBottom: 50
    }
   
});

export default AccountScreen;
