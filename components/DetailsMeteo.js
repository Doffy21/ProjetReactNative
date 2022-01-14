import React from "react";
import { StyleSheet, Text, View, Image, ToastAndroid, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { Divider, Icon } from "react-native-elements";
import moment from "moment";
import 'moment/locale/fr'

const DetailsMeteo = ({ route,navigation }) => {
  const [isRefresh, setIsRefresh] = useState(false)
  const [weather, setWeather] = useState({
    id: route.params.id,
    deg: "0",
    des: "- - - - -",
    humidity: "- - -",
    wave: "- - -",
    cloudy: "- - -",
    minMax: { min: "- - -", max: "- - -" },
    moreInfos: [
      {id: 1,value: "- - -", img: require("../img/full-moon.png")},
      {id: 2,value: "- - -", img: require("../img/sunrise.png")},
      {id: 3,value: "- - -", img: require("../img/sunset.png")},
      {id: 4,value: "- - -", img: require("../img/night.png")}
    ],
    imgWeather: "01d",
    moreDays: [
      {id: 1,day: "", date:"", img:"", min:"", max:""},
      {id: 2,day: "", date:"", img:"", min:"", max:""},
      {id: 3,day: "", date:"", img:"", min:"", max:""},
      {id: 4,day: "", date:"", img:"", min:"", max:""}
    ]
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setIsRefresh(true)}
          style={{ marginRight: 5 }}
        >
          <Icon name="refresh" size={28} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={{ marginRight: 5 }}
      >
        <Icon name="arrow-back-outline" size={28} color={"#fff"} type='ionicon' />
      </TouchableOpacity>
      )
    })
  })

  useEffect(() => {
    setIsRefresh(false)
    fetch(
    `http://api.openweathermap.org/data/2.5/forecast/daily?id=${route.params.id}&cnt=5&appid=94c6cf0868fa5cb930a5e2d71baf0dbf&units=metric&lang=fr`
    )
    .then(response => response.json())
    .then(results => {
        setWeather( previousState => {
          return {
            ...previousState,
            deg: Math.round(results.list[0].temp.day),
            des: results.list[0].weather[0].description,
            humidity: results.list[0].humidity + "%",
            wave: results.list[0].speed + "m/s",
            cloudy: results.list[0].clouds,
            minMax: {
              min: Math.round(results.list[0].temp.min),
              max: Math.round(results.list[0].temp.max),
            },
            moreInfos: [
              {
                id: 1,
                value: Math.round(results.list[0].temp.day) + "°C",
                img: require("../img/full-moon.png"),
              },
              {
                id: 2,
                value: moment(results.list[0].sunrise * 1000).format("HH:mm"),
                img: require("../img/sunrise.png"),
              },
              {
                id: 3,
                value: moment(results.list[0].sunset * 1000).format("HH:mm"),
                img: require("../img/sunset.png"),
              },
              {
                id: 4,
                value: Math.round(results.list[0].temp.night) + "°C",
                img: require("../img/night.png"),
              },
            ],
            imgWeather: results.list[0].weather[0].icon,
            moreDays: [
              {
                id: 1,
                day: moment(results.list[1].dt * 1000).format("dddd"),
                date: moment(results.list[1].dt * 1000).format("DD/MM"),
                img: results.list[1].weather[0].icon,
                min: Math.round(results.list[1].temp.min),
                max: Math.round(results.list[1].temp.max),
              },
              {
                id: 2,
                day: moment(results.list[2].dt * 1000).format("dddd"),
                date: moment(results.list[2].dt * 1000).format("DD/MM"),
                img: results.list[2].weather[0].icon,
                min: Math.round(results.list[2].temp.min),
                max: Math.round(results.list[2].temp.max),
              },
              {
                id: 3,
                day: moment(results.list[3].dt * 1000).format("dddd"),
                date: moment(results.list[3].dt * 1000).format("DD/MM"),
                img: results.list[3].weather[0].icon,
                min: Math.round(results.list[3].temp.min),
                max: Math.round(results.list[3].temp.max),
              },
              {
                id: 4,
                day: moment(results.list[4].dt * 1000).format("dddd"),
                date: moment(results.list[4].dt * 1000).format("DD/MM"),
                img: results.list[4].weather[0].icon,
                min: Math.round(results.list[4].temp.min),
                max: Math.round(results.list[4].temp.max),
              },
            ],
          };
        })
    })
    .catch((err) => {
        ToastAndroid.show(
            "Vérifiez votre connexion !",
            ToastAndroid.SHORT
        );
    });
  }, [navigation, isRefresh]);

  const separator = () => {
    return <Divider orientation="vertical" color="#00AAF7" />;
  };

  const separatorH = () => {
    return <Divider color="#00AAF7" />;
  };

  const Img = (props) => {
    const type = props.imgW
    let image
    switch (type) {
      case '01d':
        image = require("../img/full-moon.png")
        break;
      case '02d':
        image = require("../img/cloudy1.png")
        break;
      case '03d':
        image = require("../img/cloud.png")
        break;
      case '04d':
        image = require("../img/cloudy.png")
        break;
      case '09j':
        image = require("../img/cloudy3.png")
        break;
      case '10d':
        image = require("../img/cloudy3.png")
        break;
      case '11d':
        image = require("../img/storm.png")
        break;
      case '13d':
        image = require("../img/snowflake.png")
        break;
      case '50d':
        image = require("../img/windy.png")
        break;
    }
    return <Image source={image} style={{ width: props.size, height: props.size }} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.degWeather}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 80,
              color: "white",
              fontWeight: "bold",
              marginRight: 50,
            }}
          >
            {weather.deg}°
          </Text>
          <Img size={90} imgW={weather.imgWeather} />
        </View>
        <View
          style={{ width: 150, height: 2, backgroundColor: "white" }}
        ></View>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginTop: 10,
            textTransform: "capitalize",
          }}
        >
          {weather.des}
        </Text>
        <Text style={{ fontSize: 20, color: "white", marginTop: 5 }}>
          {weather.minMax.min}/{weather.minMax.max}°C
        </Text>
      </View>

      <View style={styles.hoursWeather}>
        <FlatList
          data={weather.moreInfos}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separator}
          horizontal
          renderItem={({ item }) => (
            <View
              style={{
                padding: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={item.img} style={{ width: 50, height: 50 }} />
              <Text>{item.value}</Text>
            </View>
          )}
        />
      </View>

      <Divider color="#00AAF7" />

      <View style={styles.moreInfoWeather}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.33,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 5 }}>
                <Icon name="wb-cloudy" size={28} color={"#00AAF7"} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>Nuage</Text>
                <Text>{weather.cloudy}</Text>
              </View>
            </View>
          </View>

          <View
            style={{ width: 1, height: 50, backgroundColor: "#00AAF7" }}
          ></View>

          <View
            style={{
              flex: 0.33,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 5 }}>
                <Icon name="opacity" size={28} color={"#00AAF7"} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>Humidité</Text>
                <Text>{weather.humidity}</Text>
              </View>
            </View>
          </View>

          <View
            style={{ width: 1, height: 50, backgroundColor: "#00AAF7" }}
          ></View>

          <View
            style={{
              flex: 0.38,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 5 }}>
                <Icon name="waves" size={28} color={"#00AAF7"} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>Vent</Text>
                <Text>{weather.wave}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Divider color="#00AAF7" />

      <View style={{ flex: 0.37 }}>
        <FlatList
          data={weather.moreDays}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separatorH}
          ListHeaderComponent={
            <>
              <Text style={{color:"#00AAF7", marginLeft: 10}}>4 jours</Text>
              <Divider color="#00AAF7" />
            </>
          }
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View>
                <Text>{item.day.toUpperCase()}</Text>
                <Text style={{fontSize: 13}}>{item.date}</Text>
              </View>
              <View><Img size={30} imgW={item.img} /></View>
              <View>
                <Text>{item.min}/{item.max}°C</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DetailsMeteo;

const styles = StyleSheet.create({
  degWeather: {
    flex: 0.35,
    backgroundColor: "#0279CA",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
  },

  hoursWeather: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  moreInfoWeather: {
    flex: 0.13,
    alignItems: "center",
    justifyContent: "center",
  },
});
