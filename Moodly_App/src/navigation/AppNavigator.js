import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import EmotionPage from "../pages/EmotionPage";
import RegisterPage from "../pages/RegisterPage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage";
import MoodWheel from "../pages/MoodWheel";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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
                    name="EmotionPage"
                    component={EmotionPage}
                    option={{ title: "EmotionPage" }}
                />
                <Stack.Screen
                    name="RegisterPage"
                    component={RegisterPage}
                    options={{ title: "RegisterPage" }}
                />
                <Stack.Screen
                    name="ManagerDashboard"
                    component={ManagerDashboardPage}
                    options={{ title: "Manager Dashboard" }}
                />
                <Stack.Screen
                    name="MoodWheel"
                    component={MoodWheel}
                    options={{ title: "MoodWheel" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
