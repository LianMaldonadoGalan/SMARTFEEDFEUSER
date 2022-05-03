import React, { Component, useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, SliderComponen, Image, TouchableOpacity } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import smartFeedApi from "../api/smartfeed";
import { ScrollView } from "react-native-gesture-handler";
import Spacer3 from "../../components/Spacer3";
import { set } from "react-native-reanimated";


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
    const { state: stateMenu, getUserPref } = useContext(UserPrefContext);

    const [menu, setMenu] = useState(o);
    const [goal, setGoal] = useState("1");
    const [day, setDay] = useState('monday');
    const [meals, setMeals] = useState([]);
    const [bandera, setBandera] = useState(false)
    const [stateItems, setStateItems] = useState(items);

    const navigation = useNavigation();

    const dict = {
        Lunes: 'monday',
        Martes: 'tuesday',
        Miercoles: 'wednesday',
        Jueves: 'thursday',
        Viernes: 'friday',
        Sabado: 'saturday',
        Domingo: 'sunday'
    } 
    const items = {
        activeIndex: 0,
        
    }

    useEffect( () => {
        setMenu(o);
        setMeals([]);
        selectUser(stateAuth.userdata);
        getUserPref(stateAuth.userdata);
        //checkTypes();
        console.log(stateAuth);
        getMenu(stateAuth.userdata); 
    },[])

    useEffect( () => { 
        if(menu.monday.comida[0] !== undefined && stateData.meals_qty !== undefined){
            console.log("UseEffect del menu",menu.monday);
            checkTypes();
            getMeals();
        }
    }, [menu]);

    useEffect( () => { 
        console.log("UseEffect del stateItems")
    }, [stateItems]);

    useEffect( () => { 
        console.log("UseEffect del stateDATAA");
        if(menu.monday.comida[0] && stateData.meals_qty !== undefined ){
            getMenu(stateAuth.userdata); 
            setStateItems(itemsDinamycs());
        }
    }, [stateData]);

    useEffect( () => { 
        //console.log(day, menu[day])
    }, [day]);

    useEffect( () => { 
        console.log("Efecto del meals",meals)
    }, [meals]);

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

    const itemsDinamycs = () => {
        console.log("itemsDINAMYC", stateData);
        console.log(menu);
        getMenu(stateAuth.userdata);
        console.log(meals);
        if(stateData.meals_qty === 2){
            const items = {
                activeIndex: 0,
                desayuno: {
                    carouselItems: [
                        {
                            title: menu[day].desayuno[0]
                        }
                    ]
                },
                comida: {
                    carouselItems: [
                        {
                            title: menu[day].comida[0]
                        }
                    ]
                }
            }
            return items
        }
        else if(stateData.meals_qty === 3){
            const items = {
                activeIndex: 0,
                desayuno: {
                    carouselItems: [
                        {
                            title: menu[day].desayuno[0]
                        }
                    ]
                },
                comida: {
                    carouselItems: [
                        {
                            title: menu[day].comida[0]
                        }
                    ]
                },
                cena: {
                    carouselItems: [
                        {
                            title: menu[day].cena[0]
                        }
                    ]
                }
            }
            return items
        }
        else if(stateData.meals_qty === 4){
            const items = {
                activeIndex: 0,
                desayuno: {
                    carouselItems: [
                        {
                            title: menu[day].desayuno[0]
                        }
                    ]
                },
                almuerzo: {
                    carouselItems: [
                        {
                            title: menu[day].almuerzo[0]
                        }
                    ]
                },
                comida: {
                    carouselItems: [
                        {
                            title: menu[day].comida[0]
                        }
                    ]
                },
                cena: {
                    carouselItems: [
                        {
                            title: menu[day].cena[0]
                        }
                    ]
                }
            }
            return items
        }
        else if(stateData.meals_qty === 5){
            const items = {
                activeIndex: 0,
                desayuno: {
                    carouselItems: [
                        {
                            title: menu[day].desayuno[0]
                        }
                    ]
                },
                almuerzo: {
                    carouselItems: [
                        {
                            title: menu[day].almuerzo[0]
                        }
                    ]
                },
                comida: {
                    carouselItems: [
                        {
                            title: menu[day].comida[0]
                        }
                    ]
                },
                merienda: {
                    carouselItems: [
                        {
                            title: menu[day].merienda[0]
                        }
                    ]
                },
                cena: {
                    carouselItems: [
                        {
                            title: menu[day].cena[0]
                        }
                    ]
                }
            }
            return items
        }
        checkTypes();
    }    

    renderComida = ({ item }) => {
        const result = meals.find(m => m.id_meal === item.title);
        return (
            <>
                <View>
                    {meals.length !== 0  ?
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Recipe',  {result})}>
                                <Image source={{ uri: meals.find(m => m.id_meal === item.title).meal_photo }} style={{height: 190, width: 260}} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15, alignSelf: "center", color: 'black' }}>{meals.find(m => m.id_meal === item.title).meal_name}</Text>
                        </>

                        : <Text style={{ fontSize: 30, alignSelf: "center", color: '#FFFFFF' }}>Loading</Text>
                    }
                </View>
            </>

        )
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                backgroundColor: '#FFC300',
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

    const createMenu = async (id) => {
        const response = await smartFeedApi.get(`/menu/${id}`);
        const x = JSON.parse(response.data.data.menu_json)
        setMeals([]);
        setMenu(x);
        //setStateItems(items);
    };

    //Conseguir los Ids de los meals
    const getIdsMeals = () => {
        let aux = []

        let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        let types = [];

        console.log("Se mete a getIdsMeals", stateData.meals_qty);
    
        if(stateData.meals_qty == 2){
            types = ['desayuno','comida'];
        }
        else if(stateData.meals_qty == 3){
            types = ['desayuno','comida','cena'];
        }
        else if(stateData.meals_qty == 4){
            types = ['desayuno', 'almuerzo', 'comida','cena'];
        }
        else if(stateData.meals_qty == 5){
            types = ['desayuno', 'almuerzo', 'comida', 'merienda', 'cena'];
        }
        
        days.forEach(d => {
            types.forEach(t => {
                console.log(t);
                if (Object.prototype.hasOwnProperty.call(menu[d], t)) {
                    menu[d][t].forEach(i => {
                        aux.push(i);
                    })
                }
            })
        });

        let ids = [...new Set(aux)];

        return ids;
    }

    const getMenu = async (id) => {
        const response = await smartFeedApi.get(`/userPref/${id}`);
        setMenu(JSON.parse(response.data.data.menu_json));
    };

    const onPress = () => {
        putGoal(stateAuth.userdata, goal);
        createMenu(stateAuth.userdata);
        //getMenu(stateAuth.userdata);
        //console.log(menu.monday);
    }

    const dayChange = (index) => {
        setDay(dict[state.carouselItems[index].title]);
    }
    
    const checkTypes = () => {
        let types= [];
        if(stateData.meals_qty == 2){
            types = ['desayuno','comida'];
        }
        else if(stateData.meals_qty == 3){
            types = ['desayuno','comida','cena'];
        }
        else if(stateData.meals_qty == 4){
            types = ['desayuno', 'almuerzo', 'comida','cena'];
        }
        else if(stateData.meals_qty == 5){
            types = ['desayuno', 'almuerzo', 'comida', 'merienda', 'cena'];
        }

        types.forEach(t => {
            if (!Object.prototype.hasOwnProperty.call(menu.monday, t)) {
                delete stateItems[t];
            }
        })
        console.log("checkTypes",stateItems)
        
    }


    const getMeals = async () => {
        console.log("Se mete a get meals", menu);
        let ids = getIdsMeals();
        console.log(ids);
        const response = await smartFeedApi.get(`/meals?mealIds=${JSON.stringify(ids)}`)
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
                    itemWidth={300}
                    renderItem={renderItem}
                    activeSlideAlignment="center"
                    sliderHeight={300}
                    activeSlideOffset={30}
                    onSnapToItem={(index) => dayChange(index)}
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

                    <Button title='Generar dieta' onPress={() => onPress()} buttonStyle={styles.submitButton}></Button>
                    <Button title='Gene' onPress={() => console.log(stateData.meals_qty)} buttonStyle={styles.submitButton}></Button>
                </View>
                        
                {Object.prototype.hasOwnProperty.call(menu[day], 'desayuno') ?
                    <Spacer3>
                        <Spacer>
                            <Text style={{ alignSelf: "center"}}>Desayuno</Text>
                        </Spacer>
                        {stateItems !== undefined? 
                            <Carousel
                                layout={"default"}
                                firstItem={0}
                                data={stateItems.desayuno.carouselItems.filter(x => typeof x.title === "number")}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250}
                                renderItem={renderComida}
                                activeSlideAlignment="center"
                                sliderHeight={300}
                                activeSlideOffset={30}
                            /> 
                            : null
                        }
                        
                    </Spacer3>
                    : null}

                {Object.prototype.hasOwnProperty.call(menu[day], 'almuerzo')  ?
                    <Spacer3>
                        <Spacer>
                        <Text style={{ alignSelf: "center"}}>Almuerzo</Text>
                        </Spacer>
                        {stateItems !== undefined ? 
                            <Carousel
                                layout={"default"} 
                                firstItem={0}
                                data={stateItems.almuerzo.carouselItems.filter(x => typeof x.title === "number")}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250}
                                renderItem={renderComida}
                                activeSlideAlignment="center"
                                sliderHeight={300}
                                activeSlideOffset={30}
                            />
                            : null
                        }
                    </Spacer3>
                    : null}

                {Object.prototype.hasOwnProperty.call(menu[day], 'comida')  ?
                    <Spacer3>
                        <Spacer>
                        <Text style={{ alignSelf: "center"}}>Comida</Text>
                        </Spacer>
                        {stateItems !== undefined ? 
                            <Carousel
                                layout={"default"}                          
                                firstItem={0}
                                data={stateItems.comida.carouselItems.filter(x => typeof x.title === "number")}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250}
                                renderItem={renderComida}
                                activeSlideAlignment="center"
                                sliderHeight={300}
                                activeSlideOffset={30}
                            />
                            : null
                        }
                    </Spacer3>
                    : null}

                {Object.prototype.hasOwnProperty.call(menu[day], 'merienda')  ?
                    <Spacer3>
                        <Spacer>
                        <Text style={{ alignSelf: "center"}}>Merienda</Text>
                        </Spacer>
                        { stateItems && Object.prototype.hasOwnProperty.call(stateItems, 'merienda') ? 
                            <Carousel
                                layout={"default"}
                                firstItem={0}
                                data={stateItems.merienda.carouselItems.filter(x => typeof x.title === "number")}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250}
                                renderItem={renderComida}
                                activeSlideAlignment="center"
                                sliderHeight={300}
                                activeSlideOffset={30}
                            />
                            : null
                        }
                        
                    </Spacer3>
                    : null}

                {Object.prototype.hasOwnProperty.call(menu[day], 'cena') ?
                    <Spacer3>
                        <Spacer>
                        <Text style={{ alignSelf: "center"}}>Cena</Text>
                        </Spacer>
                        {stateItems !== undefined ? 
                            <Carousel
                                layout={"default"}
                                firstItem={0}
                                data={stateItems.cena.carouselItems.filter(x => typeof x.title === "number")}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={250}
                                renderItem={renderComida}
                                activeSlideAlignment="center"
                                sliderHeight={300}
                                activeSlideOffset={30}
                            />
                            : null
                        }
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
        backgroundColor: '#9CBEF9',
        borderRadius: 10,
        padding: 15,
        alignSelf: "center",
        width: 250,
        marginBottom: 20
    }
});

export default MainScreen;