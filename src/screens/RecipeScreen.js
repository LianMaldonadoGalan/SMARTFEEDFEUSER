import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipeScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Recipe Screen</Text>
        </SafeAreaView>
    );
};

RecipeScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default RecipeScreen;
