import React, { useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";

const Dropdown = ({ options, setSelectedOption }) => {
  const [selectedOption, setSelectedOptionLocal] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const onPressHandler = (option) => {
    setSelectedOption(option);
    setSelectedOptionLocal(option);
    setIsOpen(false);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={{ padding: 3, borderWidth: 1, borderColor: "#000" }}>
          <Text>{selectedOption}</Text>
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <ScrollView>
          {options.map((option, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onPressHandler(option)}
            >
              <View style={{ padding: 8, borderWidth: 1, borderColor: "#000" }}>
                <Text>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;
