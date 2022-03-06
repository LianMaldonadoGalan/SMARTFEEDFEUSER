import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const RecipeReducer = (state, action) => {

    switch(action.type){
        
        default:
            return state;
    }
}

const fetchRecipes = dispatch => async () => {
    
};

export const {Context, Provider } = createDataContext(RecipeReducer, {fetchRecipes}, []);