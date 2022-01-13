import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ville from "../components/Ville";
import Recherche from "../components/Recherche";
import { Icon } from "react-native-elements";
import DetailsMeteo from "../components/DetailsMeteo";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Ville"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0279CA",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="Ville"
          component={Ville}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Recherche")}
                style={{ marginRight: 5 }}
              >
                <Icon name="add" size={28} color={"#fff"} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Recherche" component={Recherche} />
        <Stack.Screen
          name="Details"
          component={DetailsMeteo}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigator;

const styles = StyleSheet.create({});
