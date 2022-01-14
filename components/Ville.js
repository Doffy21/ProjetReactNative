import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import styles from "./StyleSheet"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeDetail } from '../redux/actions/detail';
import { Divider, Icon } from "react-native-elements";
const Ville = ({navigation}) => {
    const { details } = useSelector(state => state.detailReducer);
    const dispatch = useDispatch();
    const actions = bindActionCreators({
        removeDetail 
    }, dispatch);

    const separator = () => {
        return <Divider color="black" />;
      };

    const ContainerVille = () => {
        if (!details.length) {
            return (
                <View style={styles.centered}>
                    <Image source={require('../img/cloudy4.png')} style={{width: 50, height:50}}/>
                    <Text>Aucune ville par défaut.</Text>                
                </View>
            )
        }

        else {
            return (
                <FlatList
                data={details}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={separator}
                renderItem={({ item }) => (
                    <TouchableOpacity             
                        onPress={() => {
                        navigation.navigate("Details", {
                          id: item.id,
                          name: item.name,
                          country: item.country,
                        });
                      }}>
                        <View
                            style={{
                            padding: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row"
                            }}
                        >
                            <View>
                            <Text style={{fontSize: 18}}>{item.name} , {item.country}</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => actions.removeDetail(item.id)}>
                                    <Icon name="delete" size={24}/>
                                </TouchableOpacity>
                            </View>
                        </View>                        
                    </TouchableOpacity>

                )}
              />
                )
        }
    }

    return (
        <View style={styles.container}>
            <ContainerVille />
        </View>
    )
}

export default Ville

const stylesLocal = StyleSheet.create({

})
