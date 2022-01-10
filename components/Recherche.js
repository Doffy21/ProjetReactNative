import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./StyleSheet";
import { Divider, SearchBar } from "react-native-elements";
import { useState, useEffect } from "react";
import VilleParDefaut from "./VilleParDefaut";

const Recherche = () => {
  // const API_RESTCOUNTRIE = `https://restcountries.com/v3.1/all`
  const [search, updateSearch] = useState("");
  // const [isLoading, setIsLoading] = useState(false)
  // const [datas, setDatas] = useState([])
  // const [error, setError] = useState(null)

  const data = VilleParDefaut;

  // useEffect(() => {
  //   setIsLoading(true)

  //   fetch(API_RESTCOUNTRIE)
  //     .then((response) => response.json())
  //     .then((results) => {
  //       setDatas(results);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       setIsLoading(false);
  //       setError(err);
  //     });
  // }, [])

  // if (isLoading) {
  //   return (
  //     <View style={{justifyContent: 'center',alignItems: 'center',}}>
  //       <ActivityIndicator size={"large"} color={"#5500dc"}/>
  //     </View>
  //   )
  // }

  // if (error) {
  //   return (
  //     <View style={{justifyContent: 'center',alignItems: 'center',}}>
  //       <Text>Error fetching data... Check your network connection</Text>
  //     </View>
  //   )
  // }

  const separator = () => {
    return <Divider orientation="vertical" />;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Ville par défaut"
        round
        searchIcon={{ size: 24 }}
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        containerStyle={{
          marginTop: 5,
          marginLeft: 10,
          marginRight: 10,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          padding: 0,
          borderRadius: 30,
          marginBottom: 5,
          
        }}
        inputContainerStyle={{
          borderRadius: 30,backgroundColor: '#ececec'
        }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={separator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {alert(item.name)}}>
            <View style={{ padding: 10, borderBottomColor: "white" }}>
              <Text style={{ fontSize: 18 }}>
                {item.name} , {item.country}
              </Text>
            </View>            
          </TouchableOpacity>

        )}
      />
    </View>
  );
};

export default Recherche;

const stylesLocal = StyleSheet.create({});
