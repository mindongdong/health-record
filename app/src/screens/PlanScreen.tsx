import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlanScreen: React.FC = () => {
  const deviceWidth = Dimensions.get("window").width;

  const handlePress = () => {
    const url = "https://youtu.be/9Yycil-iYXs";
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstComponent}>
        {/* Insert your first component here */}
        <Image
          source={require("../assets/user.png")}
          style={styles.iconLarge}
        />
        <View>
          <Text style={styles.textLarge}>현재 상태</Text>

          <View
            style={{
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={styles.greenDot}></View>
            <Text>정상</Text>
          </View>
        </View>
      </View>
      <View style={styles.component}>
        {/* Second component */}
        <Text style={styles.textTitle}>Timeline</Text>
        <ScrollView horizontal>
          {/* Your horizontally scrolling components */}
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_1.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>상처</Text>
          </View>
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_2.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>골절</Text>
          </View>
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_3.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>타박상</Text>
          </View>
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_2.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>골절</Text>
          </View>
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_3.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>타박상</Text>
          </View>
          <View style={styles.litleComponent}>
            <Image
              source={require("../assets/photo_1.png")}
              style={styles.componentImage}
            ></Image>
            <Text style={styles.text}>상처</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.component}>
        {/* Third component */}
        <Text style={styles.textTitle}>Report</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <View style={{ flex: 1, margin: 5 }}>
            <View style={styles.greenDot}></View>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              상체가 건강합니다.
            </Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              머리쪽에 이상이 발견되지 않았습니다.
            </Text>
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <View style={styles.yellowDot}></View>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              무릎 부근에 상처가 있습니다.
            </Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              종아리에 타박상이 있습니다.
            </Text>
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <View style={styles.redDot}></View>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              발목에 골절이 있습니다.
            </Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>
              골절 관리에 주의해주세요.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.component}>
        {/* Fourth component */}
        <Text style={styles.textTitle}>Recommend</Text>
        <ScrollView horizontal>
          {/* Your horizontally scrolling components */}
          <TouchableOpacity onPress={handlePress} style={{ margin: 15 }}>
            <Image
              source={require("../assets/thumnail_1.png")}
              style={styles.thumnailImage}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress} style={{ margin: 15 }}>
            <Image
              source={require("../assets/thumnail_2.png")}
              style={styles.thumnailImage}
            ></Image>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
  component: {
    flex: 2,
    padding: 10,
  },
  litleComponent: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginLeft: 0,
  },
  menuItem: {
    alignItems: "center",
  },
  iconLarge: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textLarge: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#40FF00",
    marginRight: 5,
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FE2E2E",
    marginRight: 5,
  },
  yellowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F3EC32",
    marginRight: 5,
  },
  componentImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 5,
  },
  thumnailImage: {
    width: 140,
    height: 80,
  },
  timelineBar: {
    height: 7,
    backgroundColor: "black",
    opacity: 0.6,
    marginLeft: 10,
  },
});

export default PlanScreen;
