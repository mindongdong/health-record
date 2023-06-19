import React, { useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

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
              onPress={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
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
