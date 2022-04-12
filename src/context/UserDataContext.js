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
    const response = await smartFeedApi.get(`/userData/${id}`);
    dispatch({ type: 'get-user', payload: response.data.data})
};

const updateUserData = dispatch => async (id, name, sex, birthDate) => {
    const response = await smartFeedApi.patch(`/userData/${id}`, {name, sex, birthDate});
    alert('¡Cambios guardados! :)');
}

const updateUserHealth = dispatch => async (id, weight, height, physicalActivity, isVegetarian, mealsQty) => {
    const response = await smartFeedApi.patch(`/userData/${id}`, {weight, height, physicalActivity, isVegetarian, mealsQty});
    alert('¡Cambios guardados! :)');
}

export const {Context, Provider } = createDataContext(
    UserDataReducer, 
    {selectUser, updateUserData, updateUserHealth}, 
    {}
);