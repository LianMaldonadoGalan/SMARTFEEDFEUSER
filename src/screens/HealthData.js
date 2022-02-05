import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const HealthData = () => {
    return (
        <SafeAreaView>
            <Text h3>Health Screen</Text>
        </SafeAreaView>
    );
};

HealthData.navigationOptions = () => {
    return{
        headerShown: false,
    };
};

const styles = StyleSheet.create({

});

export default HealthData;
