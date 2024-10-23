import React from "react";
import { SafeAreaView } from "react-native";

import PageName from "../components/atoms/PageName.js";
import ManagerDashboardTemplate from "../components/templates/ManagerDashboardTemplate.js";

const ManagerDashboardPage = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <PageName Name="Team Dashboard" />
        <ManagerDashboardTemplate />
    </SafeAreaView>
);

export default ManagerDashboardPage;