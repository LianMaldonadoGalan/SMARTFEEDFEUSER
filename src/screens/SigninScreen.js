import React, {useState} from "react";
import { StyleSheet, Image, View, TouchableOpacity, 
         KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
         Keyboard, ScrollView } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SigninScreen = ({ navigation }) => {

    //State para ocultar la contraseña
    const [hidePass1, setHidePass1] = useState(true);

    return (

        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView style={{paddingHorizontal: 15}}>

                        {/* LOGO */}
                        <Image source={require('../../assets/images/logo.png')} style={styles.imagestyle}/>

                        {/* HEADER */}
                        <Text style={styles.header}>Inciar Sesión</Text>


                        {/* EMAIL INPUT */}    
                        <Input
                        placeholder= "Correo"
                        autoCapitalize= "none"
                        autoCorrect={false}
                        label="Correo" 
                        labelStyle={styles.label}
                        leftIcon={{ type: 'IonIcons', name: 'mail' , color: '#60656C'}}
                        //value={} 
                        //onChangeText={}
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
                        color: '#60656C', onPress:() => setHidePass1(!hidePass1)}}
                        //onChangeText={}
                        />


                        {/* BOTON INICIAR SESION */}
                        <Button
                            title='Iniciar Sesion'
                            onPress={() => navigation.push('Signup')}
                            titleStyle={{color:'#FFFFFF'}}
                            buttonStyle={styles.submitButton}
                        />


                        {/* LINK Y PREGUNTA */}
                        <View style={styles.questionContainer}>
                        <Text style={styles.question}>¿Aún no tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                        <Text style={styles.link}>Registrarme</Text>
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
    container:{
        flex: 1
    },
    header:{
        alignSelf: "center",
        marginTop: 10,
        color: '#60656C',
        fontFamily: 'Roboto',
        fontSize: 30
    },
    imagestyle:{
        marginTop: 40,
        height: 180,
        width: 180,
        alignSelf: "center",
        marginBottom: 25,
        borderRadius: 150,
        overflow: "hidden",
        borderWidth:1,
        borderColor: 'black'
    },
    question:{
        color: '#60656C',
        fontFamily: 'Roboto',
        fontSize: 20
    },
    link:{
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 20,
    },
    label:{
        marginTop: 32,
        color: '#D7B55B',
        fontFamily: 'Roboto',
        fontSize: 18,
    },
    submitButton:{
        marginTop: 30,
        backgroundColor: '#D7B55B',
        borderRadius: 10,
        padding: 25,
        alignSelf: "center",
        width: 350
    },
    questionContainer:{
        flexDirection:"row", 
        justifyContent: "space-evenly",
        marginTop: 50
    }
});

export default SigninScreen;
