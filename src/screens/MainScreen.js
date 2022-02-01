import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const MainScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Main Screen</Text>
        </SafeAreaView>
    );
};

MainScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default MainScreen;
