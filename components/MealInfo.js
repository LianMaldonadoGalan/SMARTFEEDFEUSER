import React, {useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FastImage from 'react-native-fast-image';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const MealInfo = ({ result }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imgwrap}>
                <TouchableOpacity delayPressIn={500} onPress={() => navigation.navigate('Recipe',{result})}>
                    <Image
                        style={styles.imgwrap}
                        source={{uri: result.meal_photo}}
                        
                    />
                </TouchableOpacity>
            </View>
            
        
            <Text style={styles.text}>{result.meal_name}</Text>
        
            <Text style={styles.text}>{result.meal_description}</Text>
                        
            
            <View style={styles.healthPropsContainer}>
                <Text style={styles.text3}>- Calorias </Text>
                <Text style={[styles.healthProps, styles.text2]}>{result.meal_calories} Kcal/100g{'\n'}</Text>
                
            
                <Text style={styles.text3}>- Proteina </Text>
                <Text style={[styles.healthProps, styles.text2]}>{result.meal_protein}g /100g{'\n'}</Text>
            

                <Text style={styles.text3}>- Grasas </Text>
                <Text style={[styles.healthProps, styles.text2]}>{result.meal_fats}g /100g{'\n'}</Text>
            

                <Text style={styles.text3}>- Carbohidratos </Text>
                <Text style={[styles.healthProps, styles.text2]}>{result.meal_carbohydrates}g /100g{'\n'}</Text>
            </View>
                
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomColor: '#60656C',
        borderBottomWidth: 1
    },
    imgwrap:{
        height: screenHeight * 0.30,
        width: screenWidth
    },
    wrapDot: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignSelf: "center"
    },
    dotActive:{
        margin: 3,
        color: 'black'
    },
    dot:{
        margin: 3,
        color: 'white'
    },
    healthPropsContainer:{
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 14
    },
    healthProps:{
        alignSelf: 'flex-end'
    },

    text:{
        color: '#60656C',
        fontSize: 18,
        margin: 14
    },
    text2:{
        color: '#60656C',
        fontSize: 18,
        textAlign: 'right',
        
    },
    text3:{
        color: '#60656C',
        fontSize: 18,
        width: 250
    }
});


export default MealInfo;