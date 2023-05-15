import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContextProvider';
import { lightTheme } from '../constants';

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text style={{ color: theme.textColor }}>
        Toggle Theme ({theme === lightTheme ? 'Light' : 'Dark'})
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;