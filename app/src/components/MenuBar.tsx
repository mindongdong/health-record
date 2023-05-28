import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Plan: undefined;
  Data: undefined;
  Profile: undefined;
  // define other screens here
};

type Navigation = StackNavigationProp<RootStackParamList>;

const MenuBar: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  const goToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => goToScreen("Home")}
      >
        <Image source={require("../assets/home.png")} style={styles.icon} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => goToScreen("Plan")}
      >
        <Image source={require("../assets/plan.png")} style={styles.icon} />
        <Text>Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => goToScreen("Data")}
      >
        <Image source={require("../assets/data.png")} style={styles.icon} />
        <Text>Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => goToScreen("Profile")}
      >
        <Image source={require("../assets/profile.png")} style={styles.icon} />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  menuItem: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});

export default MenuBar;
