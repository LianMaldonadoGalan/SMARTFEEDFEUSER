import React, {useContext, useState} from "react";
import { StyleSheet, Image, Text, View, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from '../../components/Spacer';
import { Picker } from "@react-native-picker/picker";
import { Context as UserDataContext } from "../context/UserDataContext";

const AccountScreen = ({navigation}) => {
    const { state: stateUserData } = useContext(UserDataContext);

    const [editName, setEditName] = useState(false);
    const [name, setName] = useState(stateUserData.name);

    const [sex, setSex] = useState(stateUserData.sex);

    const [editAge, setEditAge] = useState(false);
    const [age, setAge] = useState('45');
 
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
