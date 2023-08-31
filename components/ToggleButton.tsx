import React, { useContext, useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContextProvider";
import { darkTheme, lightTheme } from "../constants";

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: theme.backgroundInputColor, true: theme.backgroundInputColor }}
        thumbColor={theme === darkTheme ? theme.primary : theme.primary}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        onChange={toggleTheme}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2.5,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default ToggleButton;
