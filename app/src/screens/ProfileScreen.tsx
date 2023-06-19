import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { ceil } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 3, alignItems: "center", marginTop: 10 }}>
        <Image
          source={require("../assets/user.png")}
          style={styles.profileImage}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold"}}>사용자</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.icon}
          ></Image>
          <Text>내 정보</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require("../assets/setting.png")}
            style={styles.icon}
          ></Image>
          <Text>환경설정</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require("../assets/share.png")}
            style={styles.icon}
          ></Image>
          <Text>공유</Text>
        </View>
      </View>
      <View style={{ flex: 5, marginTop: 10, borderTopColor: "black", borderTopWidth: 1 }}>
        <View style={{ height: 50, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold"}}>알림</Text>
        </View>
        <View style={{ height: 50, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold"}}>테마</Text>
        </View>
        <View style={{ height: 50, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold"}}>개인정보</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  infoItem: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
