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
    //console.log('Si entra     ' + id)
    const response = await smartFeedApi.get(`/userData/${id}`);
    dispatch({ type: 'get-user', payload: response.data.data})
};

const updateUserData = dispatch => async (id, name, sex, birth_date) => {
    console.log(id + "  " + name + "  " + sex + "  " + birth_date + "  ");
    const response = await smartFeedApi.patch(`/userData/${id}`, {name, sex, birth_date});
    alert('¡Cambios guardados! :)');
}

const updateUserHealth = dispatch => async (id, weight, height, physical_activity, is_vegetarian, meals_qty) => {
    console.log(id + "  " + weight + "  " + height + "  " + physical_activity + "  " + is_vegetarian + "  " + typeof meals_qty);
    const response = await smartFeedApi.patch(`/userData/${id}`, {weight, height, physical_activity, is_vegetarian, meals_qty});
    alert('¡Cambios guardados! :)');
}

export const {Context, Provider } = createDataContext(
    UserDataReducer, 
    {selectUser, updateUserData, updateUserHealth}, 
    {}
);