import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const MealReducer = (state, action) => {

    switch(action.type){
        case 'fetch_meals':
            return action.payload;
        
        default:
            return state;
    }
}

const fetchMeals = dispatch => async () => {
    const response = await smartFeedApi.get('/meals');
    dispatch({type: 'fetch_meals', payload: response.data.data});
};

export const {Context, Provider } = createDataContext(
    MealReducer, 
    {fetchMeals}, 
    []
);