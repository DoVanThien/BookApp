import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface OptionSelectorProps {
    options: string[];
    defaultOptionIndex: number;
    onOptionSelected: (option: string) => void;
  }
  
  const OptionSelector = ({ options, defaultOptionIndex, onOptionSelected }: OptionSelectorProps) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex);

  const handleOptionPress = (newIndex: any) => {
    setSelectedOptionIndex(newIndex);
    onOptionSelected(options[newIndex]);
  };

  const handleLeftArrowPress = () => {
    const newIndex = selectedOptionIndex - 1;
    if (newIndex >= 0) {
      handleOptionPress(newIndex);
    }
  };

  const handleRightArrowPress = () => {
    const newIndex = selectedOptionIndex + 1;
    if (newIndex < options.length) {
      handleOptionPress(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftArrowPress}>
        <Text style={styles.arrow}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.selectedOption}>
        <Text style={styles.selectedOptionText}>{options[selectedOptionIndex].split("_")[0]}</Text>
      </View>

      <TouchableOpacity onPress={handleRightArrowPress}>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  arrow: {
    fontSize: 24,
    color: '#000',
    paddingHorizontal: 16,
  },
  selectedOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OptionSelector;
