import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ville from "../components/Ville";
import Recherche from "../components/Recherche";
import { Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Ville"
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Ville"
          component={Ville}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Recherche")}
                style={{ marginRight: 20 }}
              >
                <Icon name="add" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Recherche" component={Recherche} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigator;

const styles = StyleSheet.create({});
