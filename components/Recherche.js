import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
  ToastAndroid,
} from "react-native";
import styles from "./StyleSheet";
import { Divider, SearchBar } from "react-native-elements";
import { useState, useEffect } from "react";
import VilleParDefaut from "./VilleParDefaut";
import filter from "lodash.filter";

const Recherche = () => {
  const [search, updateSearch] = useState("");
  const [data, setData] = useState(VilleParDefaut);
  const [fullData, setFullData] = useState(data);
  const [modalVisibe, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [cityFound, setCityFound] = useState({ id: "2279755", name: "Yamoussoukro", country: "CI" });

  useEffect(() => {
    
    if (modalVisibe) {
      setIsLoading(true)
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=792989e728dbf7b2d7cf2d3596a10997`)
        .then((response) => response.json())
        .then((results) => {
          setCityFound({ id: results.id, name: results.name, country: results.sys.country });
          setIsLoading(false);
        })
        .catch(err => {
          setModalVisible(!modalVisibe)
          setIsLoading(false);
          alert("Vérifiez votre connexion ou la ville saisie !")
        });      
    }

  }, [modalVisibe])

  const separator = () => {
    return <Divider orientation="vertical" />;
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (pays) => {
      return contains(pays, formattedQuery);
    });
    setData(filteredData);
    updateSearch(text);
  };

  const contains = ({ name }, search) => {
    name = name.toLowerCase();
    if (name.includes(search)) {
      return true;
    }

    return false;
  };

  const submitEditing = (valueSearch) => {
    if (valueSearch == "") {
      ToastAndroid.show("Veuillez entrer le nom de la ville !", ToastAndroid.SHORT)
    }

    if (data.length != 0) {
      ToastAndroid.show("Déjà dans la liste des villes !", ToastAndroid.SHORT)
    } else {
      setModalVisible(true);
    }
  };

  const addNewCity = (id,name,country) => {
    VilleParDefaut.push({id:id,name:name,country:country})
    setModalVisible(!modalVisibe)
    console.log(VilleParDefaut)
  }


  const ContainModal =() => {
    if (isLoading) {
      return (
        <>
          <ActivityIndicator size={"large"} color={"#0279CA"} />   
        </>
      )
    }
    else {
      return (
        <>
          <Text style={{ marginBottom: 10 }}>
            {cityFound.name} , {cityFound.country}
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => addNewCity(cityFound.id,cityFound.name,cityFound.country)}>
              <Text style={{ backgroundColor: "#0279CA", color: "white", padding: 10 }}>
                AJOUTER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisibe)}>
              <Text style={{ backgroundColor: "#ececec", color: "black", padding: 10 }}>
                ANNULER
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Ville par défaut"
        round
        searchIcon={{ size: 24 }}
        onChangeText={(searchText) => handleSearch(searchText)}
        value={search}
        onSubmitEditing={() => submitEditing(search)}
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
          borderRadius: 30,
          backgroundColor: "#ececec",
        }}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisibe}>
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <ContainModal/>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={separator}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              alert(item.name);
            }}
          >
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
