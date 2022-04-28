import React, { Component, useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, SliderComponent } from "react-native";
import { Button, Text } from "react-native-elements";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as UserContext } from '../context/UserDataContext';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserPrefContext } from '../context/UserPrefContext';
import { Context as MealContext } from '../context/MealContext';
import { Picker } from "@react-native-picker/picker";
import Spacer from '../../components/Spacer';
import { useFocusEffect } from "@react-navigation/core";
import smartFeedApi from "../api/smartfeed";
import { ScrollView } from "react-native-gesture-handler";
import Spacer3 from "../../components/Spacer3";


const MainScreen = () => {
    const o = {
        monday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        tuesday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        wednesday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        thursday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        friday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        saturday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
        sunday: {
            desayuno: [],
            almuerzo: [],
            comida: [],
            merienda: [],
            cena: []
        },
    }


    const { state: stateData, selectUser, putGoal } = useContext(UserContext);
    const { state: stateAuth } = useContext(AuthContext);
    const { state: stateMenu, getUserPref, createMenu } = useContext(UserPrefContext);

    const [menu, setMenu] = useState(o);
    const [goal, setGoal] = useState("1");
    const [day, setDay] = useState('monday');
    const [meals, setMeals] = useState({});

    const dict = {
        Lunes: 'monday',
        Martes: 'tuesday',
        Miercoles: 'wednesday',
        Jueves: 'thursday',
        Viernes: 'friday',
        Sabado: 'saturday',
        Domingo: 'sunday'
    }

    const getIdsMeals = () => {
        let aux = []

        let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        let types = ['desayuno', 'almuerzo', 'comida', 'merienda', 'cena']
        days.forEach(d => {
            types.forEach(t => {
                if (Object.prototype.hasOwnProperty.call(menu[d], t)) {
                    console.log("AQUIII", menu[d])
                    console.log("TTT", t)
                    menu[d][t].forEach(i => {
                        aux.push(i)
                    })
                }
            })
        });

        let ids = [...new Set(aux)];
        //console.log(ids);

        return ids;
    }

    const getMenu = async (id) => {
        const response = await smartFeedApi.get(`/userPref/${id}`);
        setMenu(JSON.parse(response.data.data.menu_json));
    };


    useFocusEffect(
        useCallback(() => {
            selectUser(stateAuth.userdata);
            getMenu(stateAuth.userdata)
            checkTypes();
        }, [])
    );



    const state = {
        activeIndex: 0,
        carouselItems: [
            {
                title: "Lunes"
            },
            {
                title: "Martes"
            },
            {
                title: "Miercoles"
            },
            {
                title: "Jueves"
            },
            {
                title: "Viernes"
            },
            {
                title: "Sabado"
            },
            {
                title: "Domingo"
            }
        ]
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                backgroundColor: '#c9c2af',
                borderRadius: 30,
                height: 80,
                paddingTop: 15,
                marginLeft: 15,
                marginRight: 25,
                borderColor: '#60656C',
                borderWidth: 1
            }}
            >
                <Text style={{ fontSize: 30, alignSelf: "center", color: '#FFFFFF' }}>{item.title}</Text>
            </View>

        )
    }

    const onPress = () => {
        putGoal(stateAuth.userdata, goal);
        createMenu(stateAuth.userdata);
        getMenu(stateAuth.userdata)
    }


    const items = {
        activeIndex: 0,
        desayuno: {
            carouselItems: [
                {
                    title: menu[day].desayuno[0]
                },
                {
                    title: menu[day].desayuno[1]
                },
                {
                    title: menu[day].desayuno[2]
                }
            ]
        },
        almuerzo: {
            carouselItems: [
                {
                    title: menu[day].almuerzo[0]
                },
                {
                    title: menu[day].almuerzo[1]
                },
                {
                    title: menu[day].almuerzo[2]
                }
            ]
        },
        comida: {
            carouselItems: [
                {
                    title: menu[day].comida[0]
                },
                {
                    title: menu[day].comida[1]
                },
                {
                    title: menu[day].comida[2]
                }
            ]
        },
        merienda: {
            carouselItems: [
                {
                    title: menu[day].merienda[0]
                },
                {
                    title: menu[day].merienda[1]
                },
                {
                    title: menu[day].merienda[2]
                }
            ]
        },
        cena: {
            carouselItems: [
                {
                    title: menu[day].cena[0]
                },
                {
                    title: menu[day].cena[1]
                },
                {
                    title: menu[day].cena[2]
                }
            ]
        }
    }

    const checkTypes = () => {
        let types = ['desayuno', 'almuerzo', 'comida', 'merienda', 'cena'];

        types.forEach(t => {
            if (!Object.prototype.hasOwnProperty.call(menu.monday, t)) {
                delete items[t];
            }
        })

    }

    const dayChange = (index) => {
        setDay(dict[state.carouselItems[index].title]);
        console.log(day);
        console.log(menu[day].comida[0]);
    }

    const renderComida = ({ item }) => {
        return (
            <View style={{
                backgroundColor: '#c9c2af',
                borderRadius: 30,
                height: 80,
                paddingTop: 15,
                marginLeft: 15,
                marginRight: 25,
                borderColor: '#60656C',
                borderWidth: 1
            }}
            >
                <Text style={{ fontSize: 30, alignSelf: "center", color: '#FFFFFF' }}>{item.title}</Text>
            </View>
        )
    }

    const getMeals = async () => {
        let ids = getIdsMeals();
        console.log("IDS", ids);
        const response = await smartFeedApi.get(`/meals?mealIds=${JSON.stringify(ids)}`)
        console.log("MEALS", response.data.data);
        setMeals(response.data.data);
    }

    return (
        <>
            <Spacer3>
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
                    onSnapToItem={(index) => dayChange(index)}
                //style={{ position: "absolute"}}
                />
            </Spacer3>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 5 }}>

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
                        <Picker.Item label="Bajar" value="1" />
                        <Picker.Item label="Mantener" value="2" />
                        <Picker.Item label="Subir" value="3" />
                    </Picker>

                    <Button title='Generar dieta' onPress={onPress} buttonStyle={styles.submitButton}></Button>
                    <Button onPress={() => getMeals()} title='No que muy lion?' buttonStyle={styles.submitButton} />
                </View>

                {menu[day].desayuno ?
                    <Spacer3>
                        <Spacer>
                            <Text>Desayunos:</Text>
                            <Text>{menu[day].desayuno}</Text>
                        </Spacer>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={items.desayuno.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer3>
                    : null}

                {menu[day].almuerzo ?
                    <Spacer3>
                        <Spacer>
                            <Text>Almuerzos:</Text>
                            <Text>{menu[day].almuerzo}</Text>
                        </Spacer>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={items.comida.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer3>
                    : null}

                {menu[day].comida ?
                    <Spacer3>
                        <Spacer>
                            <Text>Comidas:</Text>
                            <Text>{menu[day].comida}</Text>
                        </Spacer>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={items.comida.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer3>
                    : null}

                {menu[day].merienda ?
                    <Spacer3>
                        <Spacer>
                            <Text>Meriendas:</Text>
                            <Text>{menu[day].merienda}</Text>
                        </Spacer>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={items.comida.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer3>
                    : null}

                {menu[day].cena ?
                    <Spacer3>
                        <Spacer>
                            <Text>Cenas:</Text>
                            <Text>{menu[day].cena}</Text>
                        </Spacer>
                        <Carousel
                            layout={"default"}
                            loop
                            firstItem={0}
                            data={items.cena.carouselItems}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={200}
                            renderItem={renderComida}
                            activeSlideAlignment="center"
                            sliderHeight={300}
                            activeSlideOffset={30}
                        />
                    </Spacer3>
                    : null}

                <Spacer3></Spacer3>
            </ScrollView>
        </>
    );
};



const styles = StyleSheet.create({
    meta: {
        alignSelf: "center",
        fontSize: 25
    },
    picker: {
        color: '#60656C',
        borderColor: '#60656C',
        borderWidth: 1,
        marginHorizontal: 14
    },
    submitButton: {
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
