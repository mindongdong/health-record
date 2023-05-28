import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import PlanScreen from "./screens/PlanScreen";
import DataScreen from "./screens/DataScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MenuBar from "./components/MenuBar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <MenuBar />
    </NavigationContainer>
  );
}
