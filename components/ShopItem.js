import React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet, Image} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

//Recibe {shoppingitem}

const ShopItem = ({ route }) =>{
    
    return ( <View  style = {style.viewStyle}>

                {/*<Image style = {style.imageStyle}source={ {uri: shoppingitem.image_url }}/>*/}
                <Image style = {style.imageStyle} source={ {uri: 'https://cdn2.salud180.com/sites/default/files/field/image/2019/04/propiedades-zanahoria.jpg'} }/>

               {/*<Text style= {style.name}> {shoppingitem.name} </Text>*/}
                <Text style= {style.name}> Zanahoria</Text>

               {/* <Text>{shoppingitem.quantity}  {shoppingitem.measuretype}</Text>*/}
                <Text style= {style.name}>5 pzs </Text>

                <BouncyCheckbox
                size={40}
                fillColor="green"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "green" }}
                //onPress={(isChecked: boolean) => {}}
                />


            </View>
    );
};

const style = StyleSheet.create({
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

export default ShopItem;