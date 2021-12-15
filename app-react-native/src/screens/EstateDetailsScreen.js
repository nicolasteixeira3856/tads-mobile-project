import React, { useContext, useState, useEffect } from "react";
import { Text, Image } from "react-native-elements";
import { View, StyleSheet } from "react-native";

const EstateDetailsScreen = ({ navigation, route }) => {

  const [estate, setEstate] = useState({});

  useEffect( () => {
    setEstate(route.params.estate)
  }, [] );
  
  return (
    <View style={styles.detailsContainer}>
        <Text style={styles.title}>  
          {estate.title}
        </Text>
        <Image style={styles.image} source={{ uri: 'https://76b5-2804-14c-87b9-b60d-94f-10e2-ad68-444a.ngrok.io/public/' + estate.img_path}} />
        <Text style={styles.price}>R$ {estate.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
        <Text style={styles.text}>{estate.description}{"\n\n"}<Text style={{fontWeight:"bold"}}>Local: <Text style={styles.text}>{estate.city}, {estate.neighborhood}{"\n"}<Text style={{fontWeight:"bold"}}>Contato: <Text style={styles.text}>{estate.phone}</Text></Text></Text></Text></Text>
    </View>
  );
};

export default EstateDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
      width: 300,
      height: 300,
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
    marginVertical: 8
  },
  text: {
    fontSize: 16,
  }
})