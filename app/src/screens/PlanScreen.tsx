import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlanScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstComponent}>
        {/* Insert your first component here */}
        <View>
          <Image
            source={require("../assets/user.png")}
            style={styles.iconLarge}
          />
        </View>
        <View>
          <View>
            <Text>정상</Text>
          </View>
          <View>
            <Text>경고</Text>
          </View>
          <View>
            <Text>위험</Text>
          </View>
        </View>
      </View>
      <View style={styles.compoenet}>
        {/* Second component */}
        <Text>Timeline</Text>
        <ScrollView horizontal>
          {/* Your horizontally scrolling components */}
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.compoenet}>
        {/* Third component */}
        <Text>Report</Text>
        <ScrollView horizontal>
          {/* Your horizontally scrolling components */}
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.compoenet}>
        {/* Fourth component */}
        <Text>Recommend</Text>
        <ScrollView horizontal>
          {/* Your horizontally scrolling components */}
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
          <View>
            <Text>Component</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstComponent: {
    flex: 3,
  },
  compoenet: {
    flex: 2,
  },
  menuItem: {
    alignItems: "center",
  },
  iconLarge: {
    width: 35,
    height: 35,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default PlanScreen;
