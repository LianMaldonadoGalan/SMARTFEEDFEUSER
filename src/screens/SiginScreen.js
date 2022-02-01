import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SigninScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Signin Screen</Text>
        </SafeAreaView>
    );
};

SigninScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default SigninScreen;
