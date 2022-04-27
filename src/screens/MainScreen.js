import React, { Component, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, SliderComponent } from "react-native";
import { Button, Text } from "react-native-elements";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as UserContext } from '../context/UserDataContext';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserPrefContext } from '../context/UserPrefContext';
import { Context as MealContext} from '../context/MealContext';
import { Picker } from "@react-native-picker/picker";
import Spacer from '../../components/Spacer';



const MainScreen = () => {
    const o = {
        monday: { },
        tuesday: { },
        wednesday: { },
        thursday: { },
        friday: { },
        saturday: { },
        sunday: { },
    }


    const { state: stateData, selectUser, putGoal } = useContext(UserContext);
    const { state: stateAuth } = useContext(AuthContext);
    const { state: stateMenu, getUserPref, createMenu } = useContext(UserPrefContext);

    const [ menu, setMenu ] = useState(getUserPref(stateAuth.userdata));
    const [ goal, setGoal ] = useState("");

    useEffect( async () => {
        selectUser(stateAuth.userdata);
        getUserPref(stateAuth.userdata);
        setMenu(getUserPref(stateAuth.userdata));
    }, [])

        const state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Lunes"
          },
          {
              title:"Martes"
          },
          {
              title:"Miercoles"
          },
          {
              title:"Jueves"
          },
          {
              title:"Viernes"
          },
          {
              title:"Sabado"
          },
          {
              title:"Domingo"
          }
        ]
      }
    
    const renderItem = ({item}) => {
        return (
          <View style={{
              backgroundColor:'#c9c2af',
              borderRadius: 30,
              height: 80,
              paddingTop: 15,
              marginLeft:  15,
              marginRight: 25,
              borderColor: '#60656C',
              borderWidth: 1
            }}
              >
            <Text style={{fontSize: 30, alignSelf: "center", color: '#FFFFFF'}}>{item.title}</Text>
          </View>
        )
    }

    const onPress = async () => {
        putGoal(stateAuth.userdata, goal);
        createMenu(stateAuth.userdata);
        getUserPref(stateAuth.userdata);
        setMenu(JSON.parse(stateMenu.menu_json));
        console.log(menu);
        console.log(stateMenu);
    }
  

    const comidota = {
        activeIndex:0,
        carouselItems: [
          {
            title: menu.monday.comida[0]
          },
          {
            title: menu.monday.comida[1]
          },
          {
            title: menu.monday.comida[2]
          }
        ]
    }

    const renderComida = ({item}) => {
        return (
          <View style={{
              backgroundColor:'#c9c2af',
              borderRadius: 30,
              height: 80,
              paddingTop: 15,
              marginLeft:  15,
              marginRight: 25,
              borderColor: '#60656C',
              borderWidth: 1
            }}
              >
            <Text style={{fontSize: 30, alignSelf: "center", color: '#FFFFFF'}}>{item.title}</Text>
          </View>
        )
    }
    
   return (
        <SafeAreaView >
            <View style={{ flexDirection:'row', justifyContent: "center", marginTop: 5}}> 
                <Carousel
                    layout={"default"}
                    loop
                    firstItem={0}
                    data={state.carouselItems}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={200}
                    renderItem={renderItem}
                    activeSlideAlignment="center"
                    sliderHeight={300}
                    activeSlideOffset={30}
                />
                </View>
                <View>
                    <Spacer></Spacer>
                    <Text style={styles.meta}>Meta: </Text>

                    <Picker
                        selectedValue={goal}
                        onValueChange={(itemValue, itemIndex) =>
                            setGoal(itemValue)
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label="Bajar" value="1"/>
                        <Picker.Item label="Mantener" value="2"/>
                        <Picker.Item label="Subir" value="3"/>
                    </Picker>

                    <Button title='Generar dieta' onPress={onPress} buttonStyle={styles.submitButton}></Button>
                </View>
                 
                {menu.monday.desayuno ? 
                    <Spacer>
                        <Text>Desayunos:</Text>
                        <Text>{menu.monday.desayuno}</Text>
                    </Spacer>
                : null}
                
                {menu.monday.almuerzo ? 
                    <Spacer>
                        <Text>Almuerzos:</Text>
                        <Text>{menu.monday.almuerzo}</Text>
                    </Spacer>
                : null}
                 
                {menu.monday.comida ? 
                    <Spacer>
                        <Text>Comidas:</Text>
                        <Text>{menu.monday.comida}</Text>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={comidota.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer>
                : null}

                {menu.monday.merienda ? 
                    <Spacer>
                        <Text>Meriendas:</Text>
                        <Text>{menu.monday.merienda}</Text>
                    </Spacer>
                : null}

                {menu.monday.cena ? 
                    <Spacer>
                        <Text>Cenas:</Text>
                        <Text>{menu.monday.cena}</Text>
                    </Spacer>
                : null}

                <Spacer></Spacer>
                <Text>{stateMenu.menu_json}</Text>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    meta: {
        alignSelf: "center",
        fontSize: 25
    },
    picker:{
        color: '#60656C',
        borderColor: '#60656C',
        borderWidth: 1,
        marginHorizontal: 14
    },
    submitButton:{
        marginTop: 10,
        backgroundColor: '#2fa822',
        borderRadius: 10,
        padding: 15,
        alignSelf: "center",
        width: 250,
        marginBottom: 20
    }
});

export default MainScreen;
