import React from "react";
import { StyleSheet, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import ShopItem from "../../components/ShopItem";

const ShoppingScreen = () => {
    return (
        
        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView>
                        
                        <Button
                            title='Actualizar Lista'
                            titleStyle={{color:'#FFFFFF', fontSize: 15}}
                            buttonStyle={styles.submitButton}
                        />

                        <ShopItem/>

                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
    submitButton:{
        marginTop: 10,
        backgroundColor: '#D7B55B',
        borderRadius: 30,
        padding: 10,
        alignSelf: "flex-end",
        width: 150,
        height: 50,
        marginBottom: 50,
        marginRight: 25
    }
});

export default ShoppingScreen;
