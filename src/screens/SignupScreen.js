import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Signup Screen</Text>
        </SafeAreaView>
    );
};

SignupScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default SignupScreen;
