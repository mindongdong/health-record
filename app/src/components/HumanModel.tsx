import React, {
  useRef,
  useState,
  Suspense,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useEffect,
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
import {
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshMatcapMaterial,
  BoxBufferGeometry,
  Raycaster,
  Vector2,
  BoxGeometry,
} from "three";

interface BodyProps {
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

const Body: React.FC<BodyProps> = forwardRef((props: BodyProps, ref: any) => {
  const obj = useLoader(OBJLoader, require("../assets/human/human.obj"));
  // const obj = useLoader(OBJLoader, require("../assets/Airmax/shoe.obj"));

  const mesh = useRef<Mesh>(null);

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshMatcapMaterial({ color: 0xd2d2d2 }); // Set material color to black
      }
    });
  }, [obj]);

  useImperativeHandle(ref, () => ({
    rotateLeft: () => {
      console.log("Attempting to rotate left");
      mesh.current.rotation.y -= 0.1;
      console.log(`Rotation y: ${mesh.current.rotation.y}`);
    },
    rotateRight: () => {
      console.log("Attempting to rotate right");
      mesh.current.rotation.y += 0.1;
      console.log(`Rotation y: ${mesh.current.rotation.y}`);
    },
  }));

  return (
    <mesh ref={mesh} rotation={[0.3, 0, 0]} position={[0, -2.4, 0]}>
      <primitive object={obj} scale={0.028} />
    </mesh>
  );
});

const Interactable = ({ touch, setCubes }) => {
  const { scene, camera, size } = useThree();

  useEffect(() => {
    if (touch) {
      const raycaster = new Raycaster();
      const mouse = new Vector2();

      mouse.x = (touch.x / size.width) * 2 - 1;
      mouse.y = -(touch.y / size.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let position = intersects[0].point;
        let normal = intersects[0].face.normal.clone();
        normal.multiplyScalar(0.05);
        position.add(normal);

        setCubes((cubes) => {
          console.log("Creating a cube at:", position);
          return [...cubes, { position: [position.x, position.y, position.z] }];
        });
      } else {
        console.log("No intersection detected.");
      }
    }
  }, [touch]);

  return null;
};

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

  const shoeRef = useRef<BodyHandle>(null);

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

  const [touch, setTouch] = useState(null);
  const [cubes, setCubes] = useState<{ position: [number, number, number] }[]>(
    []
  );
  const [canvasLayout, setCanvasLayout] = useState(null);

  const handleTouch = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;
    console.log(`Touched at x: ${locationX}, y: ${locationY}`);
    setTouch({ x: locationX, y: locationY });
  };

  const handleCanvasLayout = (e) => {
    setCanvasLayout(e.nativeEvent.layout);
  };

  return (
    <View style={{ flex: 1 }} onTouchStart={handleTouch}>
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
      {/* other components */}
      <Canvas onLayout={handleCanvasLayout}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Body ref={shoeRef} animatedSensor={animatedSensor} />
          <Interactable touch={touch} setCubes={setCubes} />
          {/* add the cubes */}
          {cubes.map((cube, index) => (
            <mesh key={index} position={cube.position}>
              <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
      {/* other components */}
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
