import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DataScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Visualization</Text>
      <View style={{ flex: 1, backgroundColor: "white", padding: 10, margin: 5, borderRadius: 10 }}>
        <Text style={styles.smallTitle}>Timeline</Text>
        <Image
          source={require("../assets/data_1.png")}
          style={styles.largeImage}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={styles.smallTitle}>Data</Text>
          <Image
            source={require("../assets/data_2.png")}
            style={styles.smallImage}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={styles.smallTitle}>Data</Text>
          <Image
            source={require("../assets/data_3.png")}
            style={styles.smallImage}
          />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", margin: 5, borderRadius: 10 }}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={styles.smallTitle}>Data</Text>
          <Image
            source={require("../assets/data_4.png")}
            style={styles.smallImage}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={styles.smallTitle}>Data</Text>
          <Image
            source={require("../assets/data_5.png")}
            style={styles.smallImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f0f0f0", // Slightly gray
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  largeImage: {
    width: "100%",
    height: "40%", // Adjust according to your needs
    marginBottom: 20,
  },
  smallImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallImage: {
    width: "90%",
    height: "80%", // Adjust according to your needs
  },
});

export default DataScreen;
