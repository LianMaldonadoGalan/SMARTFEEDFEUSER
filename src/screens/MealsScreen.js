import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View, Text,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
    Keyboard, TextInput, VirtualizedList, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { FontAwesome} from '@expo/vector-icons';
import MealInfo from "../../components/MealInfo";
import smartFeedApi from "../api/smartfeed";
import { Context as IngredientContext } from '../context/IngredientContext';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button, Input } from "react-native-elements";
import Spacer from "../../components/Spacer";



const MealsScreen = ({navigation}) => {

    const { fetchIngredients } = useContext(IngredientContext);

    const [search, setSearch] = useState('');
    const [meals, setMeals] = useState([]);
    const [masterMeals, setMasterMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isVegCheck, setIsVegCheck ] = useState(false);
    const [maxCalRange, setMaxCalRange] = useState(0);
    const [minCalRange, setMinCalRange] = useState(0);
    const [minCarbRange, setMinCarbRange] = useState(0);
    const [maxCarbRange, setMaxCarbRange] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetchIngredients();
        getData();
        getAllData();
    }, [pageCurrent]);

    const searchFilter = (text) => {
        if(text) {
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_name ?
                        item.meal_name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setMeals(newMeals);
            setSearch(text);
        } else {
            setMeals(masterMeals);
            setSearch(text);
        }
    }

    const applyFilters = () => {
        setShowFilters(!showFilters);
        //Settear los valores no validos

        if(minCalRange === ''){
            setMinCalRange(0);
        }
        if(maxCalRange === ''){
            setMaxCalRange(0);
        }
        if(maxCarbRange === ''){
            setMaxCarbRange(0);
        }
        if(minCarbRange === ''){
            setMinCarbRange(0);
        }

        //Filtros individuales

        //Solo vegetariano

        if(isVegCheck && maxCarbRange === 0 && minCarbRange === 0 && maxCalRange === 0 && minCalRange === 0){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_type
                return itemData === 'V';
            });
            setMeals(newMeals);
        }

        //Solo rango de calorias
        if(minCalRange>0 && maxCalRange>minCalRange && !isVegCheck && maxCarbRange === 0 && minCarbRange === 0){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_calories
                return (itemData >=minCalRange && itemData <= maxCalRange);
            });
            setMeals(newMeals);
        }

        //Solo rango de carbos
        if(minCarbRange>0 && maxCarbRange>minCarbRange && !isVegCheck && maxCalRange === 0 && minCalRange === 0){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_carbohydrates
                return (itemData >=minCarbRange && itemData <= maxCarbRange);
            });
            setMeals(newMeals);
        }

        //Filtros combinados

        //Rango de calorias, Vegetariano y sin rango de carbohidratos

        if(minCalRange>0 && maxCalRange>minCalRange && isVegCheck && maxCarbRange === 0 && minCarbRange === 0){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_calories;
                const itemType = item.meal_type;
                return (itemData >=minCalRange && itemData <= maxCalRange && itemType === 'V');
            });
            setMeals(newMeals);
        }

        //Rango de Carbos, Vegetariano y sin rango de calorias

        if(minCarbRange>0 && maxCarbRange>minCarbRange && isVegCheck && maxCalRange === 0 && minCalRange === 0){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_carbohydrates;
                const itemType = item.meal_type;
                return (itemData >=minCarbRange && itemData <= maxCarbRange && itemType === 'V');
            });
            setMeals(newMeals);
        }

        //Rango de calorias y carbohidratos sin ser vegetariano

        if(minCarbRange>0 && maxCarbRange>minCarbRange && minCalRange>0 && maxCalRange>minCalRange && !isVegCheck){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_carbohydrates;
                const itemData2 = item.meal_calories;
                return (itemData >=minCarbRange && itemData <= maxCarbRange && itemData2 >=minCalRange && itemData2 <= maxCalRange);
            });
            setMeals(newMeals);
        }

        //Vegetariano con rango de calorias y carbohidratos
        if(minCarbRange>0 && maxCarbRange>minCarbRange && minCalRange>0 && maxCalRange>minCalRange && isVegCheck){
            const newMeals = allMeals.filter((item) => {
                const itemData = item.meal_carbohydrates;
                const itemData2 = item.meal_calories;
                const itemType = item.meal_type;
                return (itemData >=minCarbRange && itemData <= maxCarbRange && itemData2 >=minCalRange && itemData2 <= maxCalRange && itemType === 'V');
            });
            setMeals(newMeals);
        }

        //Reset
        if(!isVegCheck && maxCalRange === 0 && minCalRange === 0 && maxCarbRange === 0 && minCarbRange === 0){
            setMeals(masterMeals);
        }

    }


    const getData = async () => {
        const response = await smartFeedApi.get('/meals?limit=10&page=' + pageCurrent);
        setMeals(meals.concat(response.data.data));
        setMasterMeals(masterMeals.concat(response.data.data));
        setIsLoading(false);
    }

    const getAllData = async () => {
        const response = await smartFeedApi.get('/meals?limit=1000&page=0');
        setAllMeals(response.data.data);
    }

    const loadMore = () => {
        if(isVegCheck || maxCalRange != 0 || minCalRange != 0){
            return;
        }
        setPageCurrent(pageCurrent + 10);
        setIsLoading(true);
    }

    const renderItem = ({ item }) => (
        <MealInfo result={item}/>
    );

    const renderFooter = () => {
        return (
            isLoading ?
        <View style={styles.loader}>
            <ActivityIndicator size="large"/>
        </View> : null
        )
    }

    const getItem = (meals, index) => {
        return meals[index];
    }

    const keyExtractor = (meals) => meals.id_meal;

    const ITEM_HEIGHT = 150;
    
    const getItemLayout = (meals, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * meals.length,
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

                    <View style={styles.backgroundstyle}>
                        <FontAwesome name= "filter" style = {styles.searchiconstyle2} onPress={() => setShowFilters(!showFilters)}/>
                        <TextInput
                        autoCorrect = {false}
                        style= {styles.searchbarstyle} 
                        placeholder="Buscar"
                        onChangeText={(text) => searchFilter(text)}
                        >
                        </TextInput>
                        <Feather name= "search" style = {styles.searchiconstyle}/>
                    </View>

                    <View >
                        {
                            showFilters ? (
                                <View >
                                    <Spacer>
                                    <BouncyCheckbox
                                    size={40}
                                    fillColor="green"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "green" }}
                                    style={{marginHorizontal: 1}}
                                    text='Comidas Vegetarianas'
                                    isChecked = {isVegCheck}
                                    onPress={(isChecked) => setIsVegCheck(isChecked)}
                                    />

                                    <View style={{flexDirection: "row", marginTop: 15}}>
                                        <View style={styles.inputWrap}>
                                            <Input
                                            keyboardType='numeric'
                                            label="Mínimo de calorias"
                                            value={minCalRange}
                                            onChangeText={(text) => setMinCalRange(text)}
                                            />
                                        </View>

                                        <Text style={{ marginTop: 40, color: '#60656C'}}> a </Text>
                                        
                                        <View style={styles.inputWrap}>
                                            <Input
                                            keyboardType='numeric'
                                            label="Maximo de calorias"
                                            value={maxCalRange}
                                            onChangeText={(text) => setMaxCalRange(text)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginTop: 15}}>
                                        <View style={styles.inputWrap}>
                                            <Input
                                            keyboardType='numeric'
                                            label="Mínimo de carbohidratos"
                                            value={minCarbRange}
                                            onChangeText={(text) => setMinCarbRange(text)}
                                            />
                                        </View>

                                        <Text style={{ marginTop: 60, color: '#60656C'}}> a </Text>
                                        
                                        <View style={styles.inputWrap}>
                                            <Input
                                            keyboardType='numeric'
                                            label="Maximo de carbohidratos"
                                            value={maxCarbRange}
                                            onChangeText={(text) => setMaxCarbRange(text)}
                                            />
                                        </View>
                                    </View>
                                    </Spacer>
                                    <View style={{flexDirection: "row", justifyContent: "space-evenly", marginBottom: 15}}>
                                        <Button title='Cancelar' onPress={() => setShowFilters(!showFilters)}/>
                                        <Button title='Aplicar' onPress={() => applyFilters()}/>
                                    </View>
                                </View>
                            ) : null
                        }
                        
                    </View>

                     {/*Por cada comida */}
                    
                     <VirtualizedList
                        data={meals} 
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        getItemCount={(meals) => meals.length}
                        getItem={getItem}
                        //initialNumToRender={12}
                       //maxToRenderPerBatch={3}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0}
                        ListFooterComponent={renderFooter}
                        getItemLayout={getItemLayout}
                    />

                    </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    backgroundstyle: {
        backgroundColor: '#d9d7d7',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: "row",
        marginBottom: 10
        
    },
    searchbarstyle: {
        color: '#b5b3b3',
        fontSize: 18,
        flex: 1
    },
    searchiconstyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 12,
        color: '#60656C'
    },
    searchiconstyle2: {
        fontSize: 30,
        alignSelf: "center",
        marginHorizontal: 12,
        color: '#60656C'
    },
    loader:{
        marginTop: 10,
        alignItems: "center"
    },
    inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10
    },
});

export default MealsScreen;
