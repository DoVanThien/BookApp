import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { Text, View } from "../components/Themed";
import { COLORS, Icons, SIZES } from "../constants";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen(navigation: any) {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: SIZES.padding,
    },
    avatarContainer: {
      flex: 1.8,
      alignItems: "center",
      marginBottom: SIZES.padding2,
      backgroundColor: theme.backgroundColor,
    },
    avatar: {
      width: 140,
      height: 140,
      borderRadius: 70,
    },
    containerInfor: {
      flex: 6,
      backgroundColor: theme.backgroundColor,
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.padding,
      paddingLeft: SIZES.radius,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#e8e8e8",
      height: 60,
      backgroundColor: "#FCFCFD",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    infoLabel: {
      flex: 1,
      fontWeight: "bold",
      color: COLORS.black,
    },
    infoValue: {
      flex: 2.5,
      color: COLORS.black,
      fontSize: 16,
    },
    infoInput: {
      flex: 2.5,
      color: COLORS.black,
      fontSize: 16,
    },
    buttonContainer: {
      flex: 1.5,
      justifyContent: "flex-end",
      marginBottom: 16,
      backgroundColor: theme.backgroundColor,
    },
    button: {
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
      borderRadius: 15,
      width: "100%",
    },
    buttonText: {
      color: COLORS.black,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  const [firstName, setFirstName] = useState("Do");
  const [lastName, setLastName] = useState("Thien");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("22");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userFirstName = await AsyncStorage.getItem("userFirstName");
        if (userFirstName !== null) {
          setFirstName(userFirstName);
        }
        const userLastName = await AsyncStorage.getItem("userLastName");
        if (userLastName !== null) {
          setLastName(userLastName);
        }
        const userGender = await AsyncStorage.getItem("userGender");
        if (userGender !== null) {
          setGender(userGender);
        }
        const userAge = await AsyncStorage.getItem("userAge");
        if (userAge !== null) {
          setAge(userAge);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const handleSavePress = async () => {
    setIsEditing(false);
    try {
      await AsyncStorage.setItem("userFirstName", firstName);
      await AsyncStorage.setItem("userLastName", lastName);
      await AsyncStorage.setItem("userGender", gender);
      await AsyncStorage.setItem("userAge", age);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.avatarContainer}>
        <Image source={Icons.image} resizeMode="cover" style={styles.avatar} />
      </View>

      <View style={styles.containerInfor}>
        <View
          style={[
            styles.infoBox,
            { shadowColor: isEditing ? theme.inforColor : theme.authorColor },
          ]}
        >
          <Text style={styles.infoLabel}>First Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={firstName}
              onChangeText={setFirstName}
            />
          ) : (
            <Text style={styles.infoValue}>{firstName}</Text>
          )}
        </View>

        <View
          style={[
            styles.infoBox,
            { shadowColor: isEditing ? theme.inforColor : theme.authorColor },
          ]}
        >
          <Text style={styles.infoLabel}>Last Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={lastName}
              onChangeText={setLastName}
            />
          ) : (
            <Text style={styles.infoValue}>{lastName}</Text>
          )}
        </View>

        <View
          style={[
            styles.infoBox,
            { shadowColor: isEditing ? theme.inforColor : theme.authorColor },
          ]}
        >
          <Text style={styles.infoLabel}>Gender:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={gender}
              placeholder="Male/Female or Other"
              onChangeText={setGender}
            />
          ) : (
            <>
              <Text style={styles.infoValue}>{gender}</Text>
            </>
          )}
        </View>

        <View
          style={[
            styles.infoBox,
            { shadowColor: isEditing ? theme.inforColor : theme.authorColor },
          ]}
        >
          <Text style={styles.infoLabel}>Age:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={age}
              onChangeText={setAge}
            />
          ) : (
            <Text style={styles.infoValue}>{age}</Text>
          )}
        </View>

        <View
          style={[
            styles.infoBox,
            { shadowColor: isEditing ? theme.inforColor : theme.authorColor },
          ]}
        >
          <Text style={styles.infoLabel}>Mode:</Text>
          <ToggleButton/>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleSavePress}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEditPress}>
            <Text style={styles.buttonText}>Custom</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
