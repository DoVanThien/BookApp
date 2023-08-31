/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import MyBooksScreen from "../screens/MyBooksScreen/MyBooksScreen";
import BookDetail from "../screens/BookDetail";
import BookPages from "../screens/BookPages";
import { ThemeContext } from "../context/ThemeContextProvider";
import { useContext } from "react";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { darkTheme, lightTheme } from "../constants";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === darkTheme ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookPages"
        component={BookPages}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  let colorScheme = useColorScheme();
  const { theme } = useContext(ThemeContext);
  if (theme === lightTheme) {
    colorScheme = "light";
  } else if (theme === darkTheme) {
    colorScheme = "dark";
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<"Search">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
      <BottomTab.Screen
        name="MyBooks"
        component={MyBooksScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
