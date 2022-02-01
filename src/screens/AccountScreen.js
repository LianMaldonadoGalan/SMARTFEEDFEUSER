import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Account Screen</Text>
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default AccountScreen;
