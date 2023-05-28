import React from "react";

import { View, Text, StyleSheet } from "react-native";

import HumanModel from "../components/HumanModel";
import { SafeAreaView } from "react-native-safe-area-context";

const MainScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <HumanModel />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;