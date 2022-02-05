import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const MealsScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Meals Screen</Text>
        </SafeAreaView>
    );
};

MealsScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default MealsScreen;
