import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import CustomDrawer from './components/CustomDrawer';
import SigninScreen from "./src/screens/SiginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HealthData from "./src/screens/HealthData";
import MainScreen from "./src/screens/MainScreen";
import MealsScreen from "./src/screens/MealsScreen";
import ShoppingList from './src/screens/ShoppingList';
import RecipeScreen from './src/screens/RecipeScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

//Variable para decidir que grupo de screens mostrar
const isLoggedIn = false;

export default function App() {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator 
       drawerContent={props=> <CustomDrawer {...props}/>}
        screenOptions={{ 
          drawerActiveBackgroundColor: '#EFCA66',
          drawerLabelStyle: { color: '#60656C', marginLeft: -20},
        }}>
          
          <Drawer.Screen name="Main" component={MainScreen} options= {{
            drawerIcon:config => <IonIcons name="home" size={30} color='#60656C'/>
          }}/>
          <Drawer.Screen name="Account" component={AccountScreen} options= {{
            drawerIcon:config => <IonIcons name="person" size={30} color='#60656C'/>
          }} />
          <Drawer.Screen name="Health" component={HealthData} options= {{
            drawerIcon:config => <IonIcons name="heart-sharp" size={30} color='#60656C'/>
          }}/>
          <Drawer.Screen name="Meals" component={MealsScreen} options= {{
            drawerIcon:config => <IonIcons name="restaurant-sharp" size={30} color='#60656C'/>
          }} />
          <Drawer.Screen name="Shopping" component={ShoppingList} options= {{
            drawerIcon:config => <IonIcons name="cart" size={30} color='#60656C'/>
          }}/>
          <Drawer.Screen name="Recipe" component={RecipeScreen} options= {{
            drawerIcon:config => <IonIcons name="book-sharp" size={30} color='#60656C'/>
          }}/>
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  );
}
