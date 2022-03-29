
import React, {useState,useEffect, useContext,useCallback} from "react";
import { useFocusEffect } from "@react-navigation/core";
import { StyleSheet,ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { SliderBox } from "react-native-image-slider-box";
import Spacer from '../../components/Spacer';
import smartFeedApi from "../api/smartfeed";
import { Context as IngredientContext } from '../context/IngredientContext';

const RecipeScreen = ({route}) => {

    const { state } = useContext(IngredientContext);

    const meal = route.params;
    const id = meal.result.id_meal;
    let wasntFound = false;

    //Imagenes

    const images = [
        'https://cdn2.cocinadelirante.com/sites/default/files/images/2018/12/receta-facil-de-pollo-en-mole.jpg',
        'https://dam.cocinafacil.com.mx/wp-content/uploads/2013/03/pollo-con-mole.jpg',
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F05%2F11%2Fpollo-en-mole-rojo-f-cil.jpg-2000.jpg&q=60'
    ]

    const [recipe, setRecipe] = useState('');
    const [ingredients, setIngredients] = useState([]);

    let ingredientname = [];
 
    const getRecipe = async (id) => {
        const response = await smartFeedApi.get(`/recipes/meal/${id}`);
        setRecipe(response.data.data[0].meal_recipe);
        const ing = JSON.parse(response.data.data[0].meal_ingredients);
        setIngredients(ing);
    };

    if(ingredients.length > 0) {
        for (const ingredient of ingredients) {
            let ingre = state.find(i => i.ingredient_id === ingredient);
            if(ingre != null){
                ingredientname.push(ingre.ingredient_name);
            }
        }
    }
   
    useFocusEffect( 
        useCallback(() => {
        getRecipe(id)
      })
    );

    if(recipe==''){
        wasntFound = true;
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <SliderBox images={images} sliderBoxHeight={250}/>
            <ScrollView >
                <Spacer>
                    <Text style={styles.text}>{meal.result.meal_name}</Text>
                </Spacer>
                
                <Spacer>
                    <Text style={styles.text}>{meal.result.meal_description}
                    </Text>
                </Spacer>

                <Spacer>
                    <Text style={styles.text}>Ingredientes:</Text>
                </Spacer>
                

                <Spacer>
                {ingredientname.map((item, key)=>(
                <Text key={key} style={styles.text}>-{item}</Text>)
                )}
                </Spacer>
                

                <Spacer>
                    <Text style={styles.text}>Preparacion:</Text>
                </Spacer>
                
                <Spacer>
                    <Text style={styles.text}>{wasntFound ? "We are working on that..." : recipe}
                    </Text>
                </Spacer>
                <Spacer/>
                <Spacer >
                    
                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Calorias </Text>
                        <Text style={[styles.healthProps, styles.text]}>{meal.result.meal_calories} Kcal/100g{'\n'}</Text>
                    </View>

    
                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Proteina </Text>
                        <Text style={[styles.healthProps, styles.text]}>{meal.result.meal_protein}g /100g{'\n'}</Text>
                    </View>

                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Grasas </Text>
                        <Text style={[styles.healthProps, styles.text]}>{meal.result.meal_fats}g /100g{'\n'}</Text>
                    </View>

                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Carbohidratos </Text>
                        <Text style={[styles.healthProps, styles.text]}>{meal.result.meal_carbohydrates}g /100g{'\n'}</Text>
                    </View>
                     
                </Spacer>
            </ScrollView>
        </SafeAreaView>
    );
};

//Hoja de estilos
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    healthPropsContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    healthProps:{
        alignSelf: "flex-end"   
    },
    text:{
        color: '#60656C',
        fontSize: 18,
    }
});

export default RecipeScreen;