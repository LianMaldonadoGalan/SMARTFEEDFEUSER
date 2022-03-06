import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const MealReducer = (state, action) => {

    switch(action.type){
        
        default:
            return state;
    }
}

const fetchMeals = dispatch => async () => {
    
};

export const {Context, Provider } = createDataContext(MealReducer, {fetchMeals}, []);