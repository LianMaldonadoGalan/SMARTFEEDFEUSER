import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CustomDrawer from './components/CustomDrawer';
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SigupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HealthData from "./src/screens/HealthData";
import MainScreen from "./src/screens/MainScreen";
import MealsScreen from "./src/screens/MealsScreen";
import ShoppingList from './src/screens/ShoppingList';
import RecipeScreen from './src/screens/RecipeScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as MealProvider} from './src/context/MealContext';
import { Provider as IngredientProvider } from './src/context/IngredientContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Variable para decidir que grupo de screens mostrar
const isLoggedIn = false;

function Root({route}) {
  return (
    <Drawer.Navigator
    drawerContent={props=> <CustomDrawer {...props}/>}
    screenOptions={{ 
      drawerActiveBackgroundColor: '#EFCA66',
      drawerLabelStyle: { color: '#60656C', marginLeft: -20},
      drawerType: 'slide',
      drawerIcon:config => <IonIcons name="home" size={30} color='#60656C'/>
    }}>
      
      <Drawer.Screen name="Main" component={MainScreen} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="home" size={30} color='#60656C'/>,
      }}/>

      <Drawer.Screen name="Account" component={AccountScreen} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="person" size={30} color='#60656C'/>
      }} />

      <Drawer.Screen name="Health" component={HealthData} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="heart-sharp" size={30} color='#60656C'/>
      }}/>

      <Drawer.Screen name="Meals" component={MealsScreen} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="restaurant-sharp" size={30} color='#60656C'/>
      }} />

      <Drawer.Screen name="Shopping" component={ShoppingList} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="cart" size={30} color='#60656C'/>
      }}/>

      <Drawer.Screen name="Recipe" initialParams={{ params: route.params }} component={RecipeScreen} options= {{
        headerStyle:{backgroundColor: '#EFCA66', },
        headerTitleAlign: "center",
        headerTitleStyle: {color: '#f0f1f2'},
        drawerIcon:config => <IonIcons name="book-sharp" size={30} color='#60656C'/>
      }}/>

    </Drawer.Navigator>
  );
}


export default function App() {
  
  return (
    
    <NavigationContainer>
      <IngredientProvider>
      <MealProvider>
      <AuthProvider>
      {isLoggedIn ? (
        Root()
      ) : (
        
        <Stack.Navigator>
          <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        </Stack.Navigator>
      )
      }
      </AuthProvider>
      </MealProvider>
      </IngredientProvider>
    </NavigationContainer>
  );
}
