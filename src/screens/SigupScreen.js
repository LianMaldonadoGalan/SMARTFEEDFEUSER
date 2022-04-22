import React, {useState, useContext} from "react";
import { StyleSheet,View, TouchableOpacity, 
         KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
         Keyboard, ScrollView } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext2 } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserDataContext';

const SignupScreen = ({ navigation }) => {

    const {state, signup, clearErrorMessage } = useContext(AuthContext2);
    const { selectUser, resetData  } = useContext(UserContext);

    //STATES para ocultar contraseña
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [disableButton, setDisableButton] = useState(false);

    const [email, setEmail] = useState('');
    const [passwd, setPassword] = useState('');
    const [confirmpw, setConfirmpw] = useState('');

    navigation.addListener('blur', () => {
        clearErrorMessage();
    });

    return (

        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView>

                        {/* HEADER */}
                        <Text style={styles.header}>Registrarse</Text>
                        <View style={{paddingHorizontal: 15}}>

                        {/* EMAIL INPUT */}
                        <Input
                        placeholder= "Correo"
                        autoCapitalize= "none"
                        autoCorrect={false}
                        label="Correo" 
                        labelStyle={styles.label}
                        leftIcon={{ type: 'IonIcons', name: 'mail' , color: '#60656C'}}
                        value={email} 
                        onChangeText={setEmail}
                        />


                        {/* PASSWORD INPUT */}
                        <Input
                        placeholder= "****"
                        autoCapitalize= "none"
                        autoCorrect={false}
                        secureTextEntry={hidePass1 ? true : false}
                        label="Contraseña" 
                        labelStyle={styles.label}
                        leftIcon={{ type: 'IonIcons', name: 'lock' , color: '#60656C'}}
                        rightIcon={{ type: 'font-awesome', size: 30,  
                        name: hidePass1 ?  'eye' : 'eye-slash', 
                        color: '#60656C', onPress: () => setHidePass1(!hidePass1)}}
                        value={passwd}
                        onChangeText={setPassword}
                        />


                        {/* CONFIRM PASSWORD INPUT */}
                        <Input
                        placeholder= "****"
                        autoCapitalize= "none"
                        autoCorrect={false}
                        secureTextEntry={hidePass2 ? true : false}
                        label="Confirmar contraseña"
                        labelStyle={styles.label}
                        leftIcon={{ type: 'IonIcons', name: 'lock' , color: '#60656C'}}
                        rightIcon={{ type: 'font-awesome', size: 30,
                        name: hidePass2 ?  'eye' : 'eye-slash',
                        color: '#60656C', onPress: () => setHidePass2(!hidePass2)}}
                        value={confirmpw}
                        onChangeText={setConfirmpw}
                        />

                        {state.errorMessage ? <Text style= {styles.errorMessage}>{state.errorMessage}</Text> : null}
                        
                        </View>

                        {/* BOTON REGISTRARSE */}
                        <Button
                            title='Registrarme'
                            disabled={disableButton}
                            titleStyle={{color:'#FFFFFF', fontSize: 18}}
                            buttonStyle={styles.submitButton}
                            onPress={() => {
                                try {
                                    resetData()
                                    setDisableButton(true)
                                    signup({email,passwd,confirmpw})
                                    setEmail("")
                                    setPassword("")
                                    selectUser(state.userdata)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        />

                        {/* LINK Y PREGUNTA */}
                        <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
                        <Text style={styles.question}>¿Ya tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.push('Signin')}>
                        <Text style={styles.link}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


//HOJA DE ESTILOS
const styles = StyleSheet.create({
    header:{
        alignSelf: "center",
        marginTop: 50,
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
    question:{
        marginTop: 50,
        color: '#60656C',
        fontFamily: 'Roboto',
        fontSize: 20
    },
    link:{
        marginTop: 50,
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 20,
    },
    submitButton:{
        marginTop: 45,
        backgroundColor: '#D7B55B',
        borderRadius: 10,
        padding: 25,
        alignSelf: "center",
        width: 350
    },
    errorMessage:{
        color: 'red',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 15
    },
});

export default SignupScreen;
