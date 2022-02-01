import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SigninScreen from "./src/screens/SiginScreen";
import SignupScreen from "./src/screens/SignupScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  },{
    initialRouteName: 'Signup',
  })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App>

    </App>
  );
}