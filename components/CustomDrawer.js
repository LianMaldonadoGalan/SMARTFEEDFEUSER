import React,{useContext} from "react";
import {Text,View,Image,StyleSheet} from 'react-native';
import { DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../src/context/AuthContext';
import { Context as UserDataContext } from "../src/context/UserDataContext";

const CustomDrawer = (props) => {
    const { state: stateUserData, updateUserData } = useContext(UserDataContext);

    const {signout} = useContext(AuthContext);

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <Image source={{uri: stateUserData.profile_picture}} style={styles.imagestyle}/>
                <Text style={styles.textStyle}>{stateUserData.name}</Text>
                <DrawerItemList {...props}/>
                <DrawerItem
                label= "Cerrar Sesion"
                icon={() => <IonIcons name="close-circle" size={35} color='#60656C'/>}
                style={{marginTop: 140, borderTopWidth: 1, borderColor:'#60656C' }}
                labelStyle= {{marginLeft: -25}}
                onPress={signout}
                />
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    imagestyle:{
        marginTop: 50,
        height: 120,
        width: 120,
        alignSelf: "center",
        marginBottom: 25,
        borderRadius: 150,
        overflow: "hidden"
    },
    textStyle:{
        fontFamily: 'Roboto',
        color: '#60656C',
        fontSize: 20,
        alignSelf:"center",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#60656C',
    },
});

export default CustomDrawer;