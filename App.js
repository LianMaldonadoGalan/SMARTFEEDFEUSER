import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SigninScreen from "./src/screens/SiginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HealthData from "./src/screens/HealthData";
import MainScreen from "./src/screens/MainScreen";
import MealsScreen from "./src/screens/MealsScreen";
import ShoppingList from './src/screens/ShoppingList';
import RecipeScreen from './src/screens/RecipeScreen';


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

//Variable para decidir que grupo de screens mostrar
const isLoggedIn = false;

export default function App() {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
          <Drawer.Screen name="Main" component={MainScreen} />
          <Drawer.Screen name="Account" component={AccountScreen} />
          <Drawer.Screen name="Health" component={HealthData} />
          <Drawer.Screen name="Meals" component={MealsScreen} />
          <Drawer.Screen name="Shopping" component={ShoppingList} />
          <Drawer.Screen name="Recipe" component={RecipeScreen} />
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