import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, Text } from "react-native-elements";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as UserContext } from '../context/UserDataContext';
import { Context as AuthContext } from '../context/AuthContext';


const MainScreen = () => {
    const { state: stateData, selectUser } = useContext(UserContext);
    const { state: stateAuth } = useContext(AuthContext);

    useEffect(() => {
        selectUser(stateAuth.userdata);
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
                <Text>hola</Text>
                <Button title='goli'></Button>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    
});

export default MainScreen;
