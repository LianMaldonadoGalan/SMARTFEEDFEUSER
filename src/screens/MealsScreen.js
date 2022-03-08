import React,{useContext} from "react";
import { StyleSheet, Text, View, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { FontAwesome} from '@expo/vector-icons';
import MealInfo from "../../components/MealInfo";
import { Context as AuthContext } from '../context/AuthContext';


const MealsScreen = () => {

    const {state} = useContext(AuthContext);

    //console.log(state.userdata.id_user);

    return (
        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView>

                    <View style={styles.backgroundstyle}>
                        <FontAwesome name= "filter" style = {styles.searchiconstyle2}/>
                        <TextInput
                        autoCorrect = {false}
                        style= {styles.searchbarstyle} 
                        placeholder="Buscar"
                        >
                        </TextInput>
                        <Feather name= "search" style = {styles.searchiconstyle}/>
                    </View>

                     {/*Por cada comida*/}  
                    
                    <MealInfo/>
                    
                    <MealInfo/>
                        
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    backgroundstyle: {
        backgroundColor: '#d9d7d7',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: "row",
        marginBottom: 10
        
    },
    searchbarstyle: {
        color: '#b5b3b3',
        fontSize: 18,
        flex: 1
    },
    searchiconstyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 12,
        color: '#60656C'
    },
    searchiconstyle2: {
        fontSize: 30,
        alignSelf: "center",
        marginHorizontal: 12,
        color: '#60656C'
    }
});

export default MealsScreen;
