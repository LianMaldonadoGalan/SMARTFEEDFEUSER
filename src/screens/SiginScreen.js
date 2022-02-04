import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const SigninScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text h3>Signin Screen</Text>
            <Button
                title='Ir a Signup'
                onPress={() => navigation.push('Signup')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default SigninScreen;
