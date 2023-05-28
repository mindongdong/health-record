import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber/native";
import { TextureLoader } from "expo-three";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Mesh } from "three";

interface ShoeProps {
  animatedSensor: {
    sensor: {
      value: {
        x: number;
        y: number;
        z: number;
      };
    };
  };
}

const Shoe: React.FC<ShoeProps> = forwardRef((props: ShoeProps, ref: any) => {
  const [base, normal, rough] = useLoader(TextureLoader, [
    require("../assets/Airmax/textures/BaseColor.jpg"),
    require("../assets/Airmax/textures/Normal.jpg"),
    require("../assets/Airmax/textures/Roughness.png"),
  ]);

  const material = useLoader(MTLLoader, require("../assets/Airmax/shoe.mtl"));

  const obj = useLoader(
    OBJLoader,
    require("../assets/Airmax/shoe.obj"),
    (loader) => {
      material.preload();
      loader.setMaterials(material);
    }
  );

  const mesh = useRef<Mesh>(null);

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.map = base;
        child.material.normalMap = normal;
        child.material.roughnessMap = rough;
      }
    });
  }, [obj]);

  //   useFrame((state, delta) => {
  //     let { x, y, z } = props.animatedSensor.sensor.value;
  //     x = ~~(x * 100) / 5000;
  //     y = ~~(y * 100) / 5000;
  //     mesh.current.rotation.x += x;
  //     mesh.current.rotation.y += y;
  //     console.log(
  //       `Rotation x: ${mesh.current.rotation.x}` +
  //         `Rotation y: ${mesh.current.rotation.y}`
  //     );
  //   });

  useImperativeHandle(ref, () => ({
    rotateLeft: () => {
      console.log("Attempting to rotate left");
      mesh.current.rotation.y -= 0.1; // Modify the value to adjust rotation speed
      //   mesh.current.rotation.x -= 0.1;
      console.log(`Rotation y: ${mesh.current.rotation.y}`);
    },
    rotateRight: () => {
      console.log("Attempting to rotate right");
      mesh.current.rotation.y += 0.1; // Modify the value to adjust rotation speed
      //   mesh.current.rotation.x += 0.1;
      console.log(`Rotation y: ${mesh.current.rotation.y}`);
    },
  }));

  return (
    <mesh ref={mesh} rotation={[0.7, 0, 0]}>
      <primitive object={obj} scale={10} />
    </mesh>
  );
});

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    margin: 8, // Add space around each button
  },
  buttonTop: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    margin: 3, // Add space around each button
  },
  buttonRotate: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
  text: {
    fontSize: 12, // Increase text size
    textAlign: "center",
    opacity: 0.4, // Make text semi-transparent
  },
  image: {
    width: 25,
    height: 25,
    marginBottom: 5, // Add space below the text
  },
  imageTop: {
    width: 45,
    height: 45,
    marginTop: 10,
  },
});

export default function HumanModel() {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  const shoeRef = useRef<ShoeHandle>(null);

  //   const rotateLeft = () => {
  //     shoeRef.current.rotateLeft();
  //   };

  //   const rotateRight = () => {
  //     shoeRef.current.rotateRight();
  //   };
  const [rotateInterval, setRotateInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const startRotatingLeft = () => {
    if (rotateInterval === null) {
      const intervalId = setInterval(() => {
        shoeRef.current?.rotateLeft();
      }, 50); // This will rotate left every 50ms
      setRotateInterval(intervalId);
    }
  };

  const startRotatingRight = () => {
    if (rotateInterval === null) {
      const intervalId = setInterval(() => {
        shoeRef.current?.rotateRight();
      }, 50); // This will rotate right every 50ms
      setRotateInterval(intervalId);
    }
  };

  const stopRotating = () => {
    if (rotateInterval !== null) {
      clearInterval(rotateInterval);
      setRotateInterval(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableWithoutFeedback>
          <View style={styles.buttonTop}>
            <Image
              source={require("../assets/record.png")}
              style={styles.imageTop}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.buttonTop}>
            <Image
              source={require("../assets/edit.png")}
              style={styles.imageTop}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Shoe ref={shoeRef} animatedSensor={animatedSensor} />
        </Suspense>
      </Canvas>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableWithoutFeedback
          onPressIn={startRotatingLeft}
          onPressOut={stopRotating}
        >
          <View style={styles.buttonRotate}>
            <Image
              source={require("../assets/left.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Rotate Left</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={startRotatingRight}
          onPressOut={stopRotating}
        >
          <View style={styles.button}>
            <Image
              source={require("../assets/right.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Rotate Right</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.button}>
            <Image
              source={require("../assets/click.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Clcik</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
