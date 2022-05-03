import React, {useState, useContext, useCallback} from "react";
import { StyleSheet, 
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, ScrollView, VirtualizedList, View, Image, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as UserContext } from '../context/UserDataContext';
import smartFeedApi from "../api/smartfeed";

const ShoppingScreen = () => {

    const { state: stateData } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    const getCart = async (id) => {
        const response = await smartFeedApi.get(`/menu/cart/${id}`);
        setCart(response.data.data);
    };

    useFocusEffect( 
        useCallback(() => {
        getCart(stateData.id_user)
      })
    );

    const keyExtractor = (cart) => cart.ingredient_id;

    const getItem = (cart, index) => {
        return cart[index];
    }

    const renderItem = ({ item }) => (
        <View  style = {styles.viewStyle}>
            <Image style = {styles.imageStyle} source={ {uri: item.ingredient_picture} }/>

            {/*<Text style= {style.name}> {shoppingitem.name} </Text>*/}
            <Text style= {styles.name}> {item.ingredient_name}</Text>

            {/* <Text>{shoppingitem.quantity}  {shoppingitem.measuretype}</Text>*/}
            <Text style= {styles.name}>{item.count}</Text>
        </View>
    );

    const ITEM_HEIGHT = 1;

    const getItemLayout = (cart, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * cart.length,
          index,
        };
    };

    return (
        
        <KeyboardAvoidingView 
         behavior={Platform.OS === 'android' ? 'padding' : 'null'}
         keyboardVerticalOffset = {-500}
         style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        
                        {/*<Button
                            title='Actualizar Lista'
                            titleStyle={{color:'#FFFFFF', fontSize: 15}}
                            buttonStyle={styles.submitButton}
                        />}

                        {/*<ShopItem/>*/}

                        <VirtualizedList
                        data={cart} 
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        getItemCount={(cart) => cart.length}
                        getItem={getItem}
                        getItemLayout={getItemLayout}
                        />

                    </SafeAreaView>
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
    },
    imageStyle: {
        width: 130,
        height: 100,
        borderRadius: 4,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 7,
        color: '#60656C'
    },
    viewStyle: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default ShoppingScreen;
