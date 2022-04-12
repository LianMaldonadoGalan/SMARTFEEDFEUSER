import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const IngredientReducer = (state, action) => {

    switch(action.type){
        case 'fetch_ingredients':
            return action.payload;

        default:
            return state;
    }
}

const fetchIngredients = dispatch => async () => {
    const response = await smartFeedApi.get('/ingredients');
    dispatch({type: 'fetch_ingredients', payload: response.data.data});
};

export const { Context, Provider } = createDataContext(IngredientReducer, {fetchIngredients}, []);