import React, {useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet,ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from './Spacer';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MealInfo = () => {

    //Imagenes

    const images = [
        'https://cdn2.cocinadelirante.com/sites/default/files/images/2018/12/receta-facil-de-pollo-en-mole.jpg',
        'https://dam.cocinafacil.com.mx/wp-content/uploads/2013/03/pollo-con-mole.jpg',
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2017%2F05%2F11%2Fpollo-en-mole-rojo-f-cil.jpg-2000.jpg&q=60'
    ]

    //State imagen activa

    const [activeImg, setActiveImg] = useState(0);

    onchange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != activeImg){
                setActiveImg(slide);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imgwrap}>
                <ScrollView
                 onScroll={({nativeEvent}) => onchange(nativeEvent)}
                 showsVerticalScrollIndicator={false}
                 pagingEnabled
                 horizontal
                 style={styles.imgwrap}
                 >
                     {
                         images.map((e, index) =>
                         <Image
                            key={e}
                            resizeMode='stretch'
                            style={styles.imgwrap}
                            source={{uri: e}}
                         />
                         )
                     }
                    
                </ScrollView>
                <View style={styles.wrapDot}>
                {
                         images.map((e, index) =>
                         <Text
                            key={e}
                            style={activeImg == index ? styles.dotActive : styles.dot}
                         >
                          ●
                         </Text>
                         )
                     }
                </View>
            </View>
            <ScrollView >
                <Spacer>
                    <Text style={styles.text}>Mole con pollo</Text>
                </Spacer>
                
                <Spacer>
                    <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                        pariatur
                    </Text>
                </Spacer>                

                <Spacer/>
                <Spacer >
                    
                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Calorias </Text>
                        <Text style={styles.healthProps, styles.text}>359 Kcal/100g{'\n'}</Text>
                    </View>

    
                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Proteina </Text>
                        <Text style={styles.healthProps, styles.text}>12.7g /100g{'\n'}</Text>
                    </View>

                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Grasas </Text>
                        <Text style={styles.healthProps, styles.text}>1.5g /100g{'\n'}</Text>
                    </View>

                    <View style={styles.healthPropsContainer}>
                        <Text style={styles.text}>- Carbohidratos </Text>
                        <Text style={styles.healthProps, styles.text}>12.3g /100g{'\n'}</Text>
                    </View>
                     
                </Spacer>
            </ScrollView>
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


export default MealInfo;