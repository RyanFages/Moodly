import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="ManagerDashboard"
                    component={ManagerDashboardPage}
                    options={{ title: "Manager Dashboard" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
