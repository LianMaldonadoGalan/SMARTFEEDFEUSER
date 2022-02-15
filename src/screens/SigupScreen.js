import React, {useState} from "react";
import { StyleSheet,View, TouchableOpacity } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ navigation }) => {

    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);

    return (
        <SafeAreaView>
            <Text style={styles.header}>Registrarse</Text>
            <View style={{paddingHorizontal: 15}}>
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

            <Input
            placeholder= "****"
            autoCapitalize= "none"
            autoCorrect={false}
            secureTextEntry={hidePass1 ? true : false}
            label="Contraseña" 
            labelStyle={styles.label}
            leftIcon={{ type: 'IonIcons', name: 'lock' , color: '#60656C'}}
            rightIcon={{ type: 'font-awesome', name: 'eye' , color: '#60656C', onPress:() => setHidePass1(!setHidePass1)}}
            //onChangeText={}
            />

            <Input
            placeholder= "****"
            autoCapitalize= "none"
            autoCorrect={false}
            secureTextEntry={hidePass2 ? true : false}
            label="Confirmar contraseña" 
            labelStyle={styles.label}
            leftIcon={{ type: 'IonIcons', name: 'lock' , color: '#60656C'}}
            rightIcon={{ type: 'font-awesome', name: 'eye' , color: '#60656C', onPress:() => setHidePass2(!setHidePass2)}}
            //onChangeText={}
            />

            </View>
            <Button
                title='Registrarme'
                onPress={() => navigation.push('Signup')}
                titleStyle={{color:'#FFFFFF'}}
                buttonStyle={styles.submitButton}
            />

            <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
            <Text style={styles.question}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.push('Signup')}>
            <Text style={styles.link}>Inciar Sesion</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



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
        marginTop: 50,
        backgroundColor: '#D7B55B',
        borderRadius: 10,
        padding: 25,
        alignSelf: "center",
        width: 350
    }
});

export default SignupScreen;
