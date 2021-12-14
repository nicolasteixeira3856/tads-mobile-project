import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native-elements";
import { View, ScrollView, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Estate from '../components/Estate';

const FavoritesScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { favoriteState, unfavorite, listAllFavoritedEstatesByUserId, removeEstateOnUnfavorite } = useContext(FavoriteContext);

  useEffect(() => {
    let id = authState.userId;
    listAllFavoritedEstatesByUserId({id});

    const unsubscribe = navigation.addListener('focus', () => {
      listAllFavoritedEstatesByUserId({id});
    });

    return unsubscribe;
  }, [navigation]);

  const handleUnfavorite = (userId, estateId) => {
    unfavorite({userId, estateId});
    removeEstateOnUnfavorite({estateId})
  }

  const showAlert = () =>
  Alert.alert(favoriteState.message);

  return (
    <View style={{padding: 16 }}>
        <Text>
          {favoriteState.messageFavoritesScreen}
        </Text>
        <ScrollView>
          <View>
            {favoriteState.favoritedEstates.map((favoritedEstate) => (
              <Estate
                key={favoritedEstate.Estate.id}
                title={favoritedEstate.Estate.title}
                price={favoritedEstate.Estate.price}
                imgUrl={favoritedEstate.Estate.img_path}
                isFavorited={favoritedEstate.Estate.isFavorited}
                favorite={() => {}}
                unfavorite={() => handleUnfavorite(authState.userId, favoritedEstate.Estate.id)}
              />
            ))}
          </View>
        </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

