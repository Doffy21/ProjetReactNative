import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import styles from "./StyleSheet";

import { Divider, SearchBar } from "react-native-elements";
import { useState, useEffect } from "react";

import filter from "lodash.filter";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCity } from '../redux/actions/city';
import { addDetail } from '../redux/actions/detail';

const Recherche = ({ navigation }) => {
  const [search, updateSearch] = useState("");
  const { citys } = useSelector(state => state.cityReducer);

  const dispatch = useDispatch();
  const actions = bindActionCreators({
    addCity, 
    addDetail,
  }, dispatch);

  const [data, setData] = useState(citys);
  const [fullData, setFullData] = useState(data);
  const [modalVisibe, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cityFound, setCityFound] = useState({
    id: "2279755",
    name: "Yamoussoukro",
    country: "CI",
  });

  useEffect(() => {
    if (modalVisibe) {
      setIsLoading(true);
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=792989e728dbf7b2d7cf2d3596a10997`
      )
        .then((response) => response.json())
        .then((results) => {
          setCityFound({
            id: results.id,
            name: results.name,
            country: results.sys.country,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setModalVisible(!modalVisibe);
          setIsLoading(false);
          ToastAndroid.show(
            "Vérifiez votre connexion ou la ville saisie !",
            ToastAndroid.SHORT
          );
        });
    }
  }, [modalVisibe]);

  const separator = () => {
    return <Divider orientation="vertical" />;
  };

  //Fonction pour trier les valeur de la liste des villes
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

  //Fonction qui s'exécute après la validation de la recherche
  const submitEditing = (valueSearch) => {
    if (valueSearch == "") {
      ToastAndroid.show(
        "Veuillez entrer le nom de la ville !",
        ToastAndroid.SHORT
      );
    }

    if (data.length != 0) {
      ToastAndroid.show("Déjà dans la liste des villes !", ToastAndroid.SHORT);
    } else {
      setModalVisible(true);
    }
  };

  // Fonction qui ajoute les villes
  const addNewCity = (id, name, country) => {
    actions.addCity({ id: id, name: name, country: country })
    actions.addDetail({ id: id, name: name, country: country })
    setModalVisible(!modalVisibe);
    handleSearch("");
    navigation.navigate("Details", cityFound);
  };

  //Contenu du modal
  const ContainModal = () => {
    if (isLoading) {
      return (
        <>
          <ActivityIndicator size={"large"} color={"#0279CA"} />
        </>
      );
    } else {
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
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() =>
                addNewCity(cityFound.id, cityFound.name, cityFound.country)
              }
            >
              <Text
                style={{
                  backgroundColor: "#0279CA",
                  color: "white",
                  padding: 10,
                }}
              >
                AJOUTER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisibe)}>
              <Text
                style={{
                  backgroundColor: "#ececec",
                  color: "black",
                  padding: 10,
                }}
              >
                ANNULER
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  };

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
          <View style={stylesLocal.modalView}>
            <ContainModal />
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
              actions.addDetail({ id: item.id, name: item.name, country: item.country })
              navigation.navigate("Details", {
                id: item.id,
                name: item.name,
                country: item.country,
              });
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

const stylesLocal = StyleSheet.create({
  modalView: {
    flex: 0.2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width:200,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
