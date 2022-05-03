import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const MenuReducer = (state, action) => {
    switch(action.type){
        case 'create-menu':
            return action.payload;
        default:
            return state;
    }
}

const createMenu = dispatch => async (id) => {
    const response = await smartFeedApi.get(`/userPref/${id}`);
    dispatch({type: 'create-menu', payload: response.data.data});
};

export const {Context, Provider } = createDataContext(
    MenuReducer, 
    {createMenu}, 
    {});