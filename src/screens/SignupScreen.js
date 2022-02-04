import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text h3>Signup Screen</Text>
            <Button
                title='Ir a Signin'
                onPress={() => navigation.push('Signin')}
            />
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
