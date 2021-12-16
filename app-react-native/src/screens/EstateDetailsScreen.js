import React, { useContext, useState, useEffect } from "react";
import { Text, Image } from "react-native-elements";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { EstateContext } from "../context/EstateContext";
import MapView, { Marker } from 'react-native-maps';
import MyConstants from '../core/constants';
import {formatCurrency} from '../utils/helpers';

const EstateDetailsScreen = ({route, navigation}) => {

  const { estateState, findEstateById } = useContext(EstateContext);
  const [showActivityIndicator, setActivityIndicator] = useState(true);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect( () => {

    setActivityIndicator(true);

    const { estateId } = route.params;
    findEstateById({estateId});

    sleep(1000).then(() => { 
      setActivityIndicator(false);
    });

    const unsubscribe = navigation.addListener('focus', () => {
      setActivityIndicator(true);
      findEstateById({estateId});
      sleep(1000).then(() => { 
        setActivityIndicator(false);
      });
    });

    return unsubscribe;

  }, [navigation] );

  const displayScreen = () => {
    if (showActivityIndicator) {
      return (
        <View style={[styles.container_indicator, styles.horizontal_indicator]}>
          <ActivityIndicator size="large" color="#59617d" animating={showActivityIndicator} />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Text>{estateState.findEstateById}</Text>
          <View style={{height: 8}}></View>
          <Image style={styles.image} source={{ uri: MyConstants.API_URL + '/public/' + estateState.estate.img_path}} />
          <View style={{height: 16}}></View>
          <Text style={styles.price}>{formatCurrency(estateState.estate.price)}</Text>
          <View style={{height: 16}}></View>
          <Text style={styles.text}>{estateState.estate.description}</Text>
          <View style={{height: 16}}></View>
          <MapView 
            style={{width: '100%', height: 260}}
            initialRegion={{
              latitude: Number(estateState.estate.lat),
              longitude: Number(estateState.estate.lng),
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
          >
            <Marker
              key={estateState.estate.id + '_' + Date.now()}
              coordinate={{
                latitude: Number(estateState.estate.lat),
                longitude:Number(estateState.estate.lng)
              }}
              title={estateState.estate.title}
            >
            </Marker>
          </MapView>
          <View style={{height: 16}}></View>
          <Text style={styles.contact}>{estateState.estate.city}, {estateState.estate.neighborhood} </Text>
          <Text style={styles.contact}>{estateState.estate.phone} </Text>
        </View>
      </ScrollView>
    )
  }
  
  return (
    displayScreen()
  );
};

export default EstateDetailsScreen;

const styles = StyleSheet.create({
  container_indicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal_indicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  detailsContainer: {
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  image: {
      width: 350,
      height: 200,
      alignSelf:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  contact: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
  }
})