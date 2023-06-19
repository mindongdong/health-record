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
  Modal,
  Button,
  ScrollView,
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
import Dropdown from "./DropDown";

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
      return mesh.current.rotation.y;
    },
    rotateRight: () => {
      console.log("Attempting to rotate right");
      mesh.current.rotation.y += 0.1;
      console.log(`Rotation y: ${mesh.current.rotation.y}`);
      return mesh.current.rotation.y;
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

      console.log(mouse.x, mouse.y);

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
  activeButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    margin: 8, // Add space around each button
    backgroundColor: "skyblue", // or any color you want
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
  const [touch, setTouch] = useState(null);
  const [cubes, setCubes] = useState<{ position: [number, number, number] }[]>(
    []
  );
  const [canvasLayout, setCanvasLayout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [allowHandleTouch, setAllowHandleTouch] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const options = ["Option 1", "Option 2"]; // Add more options as needed

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
        const rotate = shoeRef.current?.rotateLeft();
        setCurrentRotation(rotate);
      }, 50); // This will rotate left every 50ms
      setRotateInterval(intervalId);
    }
  };

  const startRotatingRight = () => {
    if (rotateInterval === null) {
      const intervalId = setInterval(() => {
        const rotate = shoeRef.current?.rotateRight();
        setCurrentRotation(rotate);
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

  const handleTouch = (event) => {
    // Prevent handleTouch from executing when the modal is visible
    if (modalVisible) return;
    if (!allowHandleTouch) return;
    const touchLocationX = event.nativeEvent.locationX;
    const touchLocationY = event.nativeEvent.locationY;

    if (touchLocationY < 129) {
      if (currentRotation > 1.6 && currentRotation < 4.6) {
        setSelectedPart("목");
      } else {
        setSelectedPart("머리");
      }
    } else if (touchLocationY > 129 && touchLocationY < 190) {
      if (currentRotation > 1.6 && currentRotation < 4.6) {
        setSelectedPart("등");
      } else {
        setSelectedPart("가슴");
      }
    } else if (touchLocationY > 190 && touchLocationY < 232) {
      if (currentRotation > 1.6 && currentRotation < 4.6) {
        setSelectedPart("허리");
      } else {
        setSelectedPart("배");
      }
    } else if (touchLocationY > 232) {
      setSelectedPart("하체");
    }

    setTouch({ x: touchLocationX, y: touchLocationY });

    setModalPosition({
      x: touchLocationX,
      y: touchLocationY,
    });
    console.log(
      `Modal will be displayed at x: ${touchLocationX}, y: ${touchLocationY}`
    );
    setModalVisible(true); // Open the modal when the screen is touched
  };

  const handleCanvasLayout = (e) => {
    setCanvasLayout(e.nativeEvent.layout);
  };

  const handleCanvasContainerLayout = (e) => {
    const { x, y } = e.nativeEvent.layout;
    setCanvasPosition({ x, y });
  };

  const removeLastCube = () => {
    setCubes((prevCubes) => {
      if (prevCubes.length > 0) {
        // Removes the last cube from the array
        return prevCubes.slice(0, prevCubes.length - 1);
      } else {
        return prevCubes;
      }
    });
  };

  const modalStyles = StyleSheet.create({
    modalView: {
      position: "absolute",
      left: modalPosition.x,
      top: modalPosition.y,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 5,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "33%", // 33% of screen width
      height: "33%", // 25% of screen height
    },
  });

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
      <View style={{ flex: 1 }} onTouchStart={handleTouch}>
        <View style={{ flex: 1 }} onLayout={handleCanvasContainerLayout}>
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
        </View>
        {/* other components */}
        {modalVisible && (
          <View
            style={[
              modalStyles.modalView,
              { left: modalPosition.x, top: modalPosition.y },
            ]}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 10,
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                {selectedPart}
              </Text>

              <Dropdown options={["타박상", "상처", "골절"]} />
              <Dropdown options={["보통", "아픔", "일상생활이 힘듦"]} />

              <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                  removeLastCube();
                }}
              />
            </ScrollView>
          </View>
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableWithoutFeedback
          onPressIn={startRotatingLeft}
          onPressOut={stopRotating}
          onTouchStart={() => {}} // Prevent handleTouch from executing when the modal is visible
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
        <TouchableWithoutFeedback
          onPress={() => setAllowHandleTouch(!allowHandleTouch)}
        >
          <View style={allowHandleTouch ? styles.activeButton : styles.button}>
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
