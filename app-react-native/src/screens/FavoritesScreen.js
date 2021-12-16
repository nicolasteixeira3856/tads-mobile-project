import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native-elements";
import { View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Estate from '../components/Estate';

const FavoritesScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { favoriteState, unfavorite, listAllFavoritedEstatesByUserId, removeEstateOnUnfavorite } = useContext(FavoriteContext);
  const [showActivityIndicator, setActivityIndicator] = useState(true);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {

    setActivityIndicator(true);

    let id = authState.userId;
    listAllFavoritedEstatesByUserId({id});

    sleep(600).then(() => { 
      setActivityIndicator(false);
    });

    const unsubscribe = navigation.addListener('focus', () => {
      setActivityIndicator(true);
      listAllFavoritedEstatesByUserId({id});
      sleep(600).then(() => { 
        setActivityIndicator(false);
      });
    });

    return unsubscribe;

  }, [navigation]);

  const handleUnfavorite = (userId, estateId) => {
    unfavorite({userId, estateId});
    removeEstateOnUnfavorite({estateId})
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
          <Text>{favoriteState.messageFavoritesScreen}</Text>
          <View>
            {favoriteState.favoritedEstates.map((favoritedEstate) => (
              <TouchableOpacity key={favoritedEstate.Estate.id} onPress={() => navigation.navigate("EstateDetailsScreen", { estateId: favoritedEstate.Estate.id })}>
              <Estate
                key={favoritedEstate.Estate.id}
                title={favoritedEstate.Estate.title}
                price={favoritedEstate.Estate.price}
                imgUrl={favoritedEstate.Estate.img_path}
                isFavorited={favoritedEstate.Estate.isFavorited}
                favorite={() => {}}
                unfavorite={() => handleUnfavorite(authState.userId, favoritedEstate.Estate.id)}
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

export default FavoritesScreen;

