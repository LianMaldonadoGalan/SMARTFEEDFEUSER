import createDataContext from "./createDataContext";
import smartFeedApi from "../api/smartfeed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const UserPrefReducer = (state, action) => {

    switch(action.type){
        
        default:
            return state;
    }
}

const getUserPref = dispatch => async () => {
    
};

export const {Context, Provider } = createDataContext(UserPrefReducer, {getUserPref}, {});