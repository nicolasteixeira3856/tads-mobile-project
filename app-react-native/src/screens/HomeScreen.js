import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { View, ScrollView, Alert, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { EstateContext } from "../context/EstateContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Estate from '../components/Estate';

const HomeScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { estateState, listAllEstates, setFavoriteEstatesList } = useContext(EstateContext);
  const { favoriteState, favorite, unfavorite } = useContext(FavoriteContext);
  const [showActivityIndicator, setActivityIndicator] = useState(true);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setActivityIndicator(true);

    let id = authState.userId;
    listAllEstates({id});

    sleep(1200).then(() => { 
      setActivityIndicator(false);
    });

    const unsubscribe = navigation.addListener('focus', () => {
      setActivityIndicator(true);
      listAllEstates({id});
      sleep(1200).then(() => { 
        setActivityIndicator(false);
      });
    });

    return unsubscribe;

  }, [navigation]);

  const handleFavorite = (userId, estateId) => {
    favorite({userId, estateId});
    setFavoriteEstatesList({estateId})
  }

  const handleUnfavorite = (userId, estateId) => {
    unfavorite({userId, estateId});
    setFavoriteEstatesList({estateId})
  }

  const displayScreen = () => {
    if (showActivityIndicator) {
      return (
        <View style={[styles.container_indicator, styles.horizontal_indicator]}>
          <ActivityIndicator size="large" color="#59617d" animating={showActivityIndicator} />
        </View>
      )
    }
    return (
      <View style={{padding: 16 }}>
          <ScrollView>
            <View>
              {estateState.estates.map((estate) => (
                <TouchableOpacity key={estate.id} onPress={() => navigation.navigate("EstateDetailsScreen", { estateId: estate.id })}>
                  <Estate
                    key={estate.id}
                    title={estate.title}
                    price={estate.price}
                    imgUrl={estate.img_path}
                    isFavorited={estate.isFavorited}
                    favorite={() => handleFavorite(authState.userId, estate.id)}
                    unfavorite={() => handleUnfavorite(authState.userId, estate.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
      </View>
    )
  }

  return (
    displayScreen()
  );
};

const styles = StyleSheet.create({
  container_indicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal_indicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default HomeScreen;
