import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer2 from '../../components/Spacer2';
import { Picker } from "@react-native-picker/picker";
import { Context as UserDataContext } from "../context/UserDataContext";

const HealthData = () => {
    const { state: stateUserData, updateUserData, updateUserHealth } = useContext(UserDataContext);
    
    const [editWeight, setEditWeight] = useState(false);
    const [weight, setWeight] = useState(String(stateUserData.weight));

    const [editHeight, setEditHeight] = useState(false);
    const [height, setHeight] = useState(String(stateUserData.height));

    const [physAct, setPhysAct] = useState(String(stateUserData.physical_activity));

    const [isVeg, setIsVeg] = useState(String(stateUserData.is_vegetarian));

    const [mealsPerDay, setMealsPerDay] = useState(String(stateUserData.meals_qty));

    return (
        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView>
                        
                        <Text style={styles.header}>Datos de Salud</Text>
                        <Spacer2>
                            <Input
                            disabled = {editWeight ? false : true}
                            value={weight}
                            onChangeText={(weight) => setWeight(weight)}
                            keyboardType='numeric'
                            editable = {editWeight ? true : false}
                            label="Peso" 
                            labelStyle={styles.label}
                            rightIcon={{ type: 'font-awesome', size: 30, name: 'pencil' , color: '#60656C', onPress:() => setEditWeight(true)}}
                            blurOnSubmit={false}
                            //onChangeText={}
                            />
                        </Spacer2>

                        <Spacer2>
                            <View style={{marginTop: -30}}>
                            <Input
                            disabled = {editHeight ? false : true}
                            value={height}
                            onChangeText={(height) => setHeight(height)}
                            keyboardType='numeric'
                            editable = {editHeight ? true : false}
                            label="Altura" 
                            labelStyle={styles.label}
                            rightIcon={{ type: 'font-awesome', size: 30, name: 'pencil' , color: '#60656C', onPress:() => setEditHeight(true)}}
                            blurOnSubmit={false}
                            //onChangeText={}
                            />
                            </View>
                        </Spacer2>

                        
                        <Text style={styles.label2}>Actividad Fisica</Text>
                        <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginHorizontal: 22}}>
                            <Spacer2>
                                <Picker
                                    selectedValue={physAct}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setPhysAct(itemValue)
                                        }
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Ninguna" value="1"/>
                                    <Picker.Item label="Baja" value="2"/>
                                    <Picker.Item label="Moderada" value="3"/>
                                    <Picker.Item label="Alta" value="4"/>
                                    <Picker.Item label="Atleta" value="5"/>
                                </Picker>
                            </Spacer2>
                        </View>
                        
                        
                        <Text style={styles.label3}>¿Eres Vegetariano?</Text>
                        <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginHorizontal: 22}}>
                            <Spacer2>
                                <Picker
                                    selectedValue={isVeg}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setIsVeg(itemValue)
                                        }
                                    style={styles.picker}
                                >
                                    <Picker.Item label="No" value="F"/>
                                    <Picker.Item label="Si" value="T"/>

                                </Picker>
                            </Spacer2>
                        </View>

                        <Text style={styles.label3}>Cantidad de comidas por dia:</Text>
                        <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginHorizontal: 22}}>
                            <Spacer2>
                                <Picker
                                    selectedValue={mealsPerDay}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMealsPerDay(itemValue)
                                        }
                                    style={styles.picker}
                                >
                                    <Picker.Item label="2" value="2"/>
                                    <Picker.Item label="3" value="3"/>
                                    <Picker.Item label="4" value="4"/>
                                    <Picker.Item label="5" value="5"/>

                                </Picker>
                            </Spacer2>
                        </View>
                        
                        <Spacer2>
                            <Button
                                onPress={() => updateUserHealth(stateUserData.id_user, weight, height, physAct, isVeg, parseInt(mealsPerDay))}
                                title='Guardar Cambios'
                                titleStyle={{color:'#FFFFFF'}}
                                buttonStyle={styles.submitButton}
                            />
                        </Spacer2>
                        

                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    header:{
        alignSelf: "center",
        marginTop: 10,
        color: '#60656C',
        fontFamily: 'Roboto',
        fontSize: 30
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
        marginBottom: 10,
        marginTop: 5
    },
    label3:{
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 18,
        marginHorizontal: 22,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 30
    },
    picker:{
        color: '#60656C',
        borderColor: '#60656C',
        borderWidth: 1,
        marginHorizontal: -10,
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

export default HealthData;
