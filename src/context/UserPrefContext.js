import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const UserPrefReducer = (state, action) => {

    switch(action.type){
        case 'create-menu':
            return {...state, menu_json: action.payload};
        default:
            return state;
    }
}

const createMenu = dispatch => async (id) => {
    const response = await smartFeedApi.get(`/menu/${id}`);
    dispatch({type: 'create-menu', payload: response.data.data});
};

const getUserPref = dispatch => async (id) => {
    const response = await smartFeedApi.get(`/userPref/${id}`);
    console.log(JSON.parse(response.data.data.menu_json));
    dispatch({type: 'create-menu', payload: JSON.parse(response.data.data.menu_json)});
};

export const {Context, Provider } = createDataContext(
    UserPrefReducer, 
    {getUserPref, createMenu}, 
    {});