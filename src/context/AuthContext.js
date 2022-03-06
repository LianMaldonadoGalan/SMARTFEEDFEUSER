import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import CryptoES from "crypto-es";

const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
}

const AuthReducer = (state, action) => {

    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};

        case 'clear_error_message':
            return {...state, errorMessage: ''};

        case 'signin':
            return { token: action.payload};

        case 'sign_out':
            return {token: null, errorMessage: ''};

        default:
            return state;
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = (dispatch) => {
    const navigation = useNavigation();
    return async () => {
    const token = await AsyncStorage.getItem('token');

    if(token){
        dispatch({ type: 'signin', payload: token});

        navigation.navigate('Root');
    }else{
        navigation.navigate('Signin');
    }
    }
};

const signup = (dispatch) => {

    const navigation = useNavigation();

    return async ( { email, passwd, confirmpw }) => {

        if(email.length==0 || passwd.length==0){
            dispatch({ type: 'add_error', payload: 'Por favor llena los campos debidamente'});
            return;
        }
        if(!validateEmail(email)){
            dispatch({ type: 'add_error', payload: 'Por favor ingresa un email valido'});
            return;
        }
        if(passwd != confirmpw){
            dispatch({ type: 'add_error', payload: 'Las contraseñas no coinciden'});
            return;
        }
        if(passwd.length<6){
            dispatch({ type: 'add_error', payload: 'La contraseña debe tener al menos 6 caracteres'});
            return;
        }

        const pass = CryptoES.SHA256(passwd).toString();

        try {
            const response = await smartFeedApi.post('/users/register', {email, passwd: pass});
            await AsyncStorage.setItem('token', response.token);
            dispatch({ type: 'signin', payload: response.data});

            navigation.navigate('Root');
            //navigation.navigate('Root', { screen: 'Meals' });
        } catch (error) {
            dispatch({ type: 'add_error', payload: 'Algo salió mal al intentar registrarte'});
            console.log(error);
        }
    };
};


const signin = (dispatch) => {

    const navigation = useNavigation();

    return async ( { email, passwd }) => {
        if(email.length==0 || passwd.length==0){
            dispatch({ type: 'add_error', payload: 'Por favor llena los campos debidamente'});
            return;
        }

        const pass = CryptoES.SHA256(passwd).toString();

        try {
            const response = await smartFeedApi.post('/users/login', {email, passwd: pass} );
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data});

            navigation.navigate('Root');
            //navigation.navigate('Root', { screen: 'Meals' });
        } catch (error) {
            dispatch({ type: 'add_error', payload: 'Email o contraseña incorrectos'});
            console.log(error);
        }
    };
};

const signout = (dispatch) =>  {
    const navigation = useNavigation();
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'sign_out'});

        navigation.navigate('Signin');
    }
 };

export const {Context, Provider } = createDataContext(AuthReducer, {signin, signout, signup, clearErrorMessage, tryLocalSignin}, {token: null, errorMessage: ''});
