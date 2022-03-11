import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from '../context/AuthContext';
import { useContext } from "react";


const UserDataReducer = (state, action) => {
    switch(action.type){
        case 'get-user':
            return action.payload
        default:
            return state;
    }
}

const selectUser = dispatch => async (id) => {
    console.log('Si entra     ' + id)
    const response = await smartFeedApi.get(`/userData/${id}`);
    dispatch({ type: 'get-user', payload: response.data.data})
};

export const {Context, Provider } = createDataContext(
    UserDataReducer, 
    {selectUser}, 
    {}
);