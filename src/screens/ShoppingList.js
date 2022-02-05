import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingScreen = () => {
    return (
        <SafeAreaView>
            <Text h3>Shopping Screen</Text>
        </SafeAreaView>
    );
};

ShoppingScreen.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default ShoppingScreen;
