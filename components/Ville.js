import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import styles from "./StyleSheet"
const Ville = () => {
    return (
        <View style={styles.container}>
            <View style={styles.centered}>
                <Image source={require('../img/cloudy4.png')} style={{width: 50, height:50}}/>
                <Text>Aucune ville par défaut.</Text>                
            </View>

        </View>
    )
}

export default Ville

const stylesLocal = StyleSheet.create({

})
