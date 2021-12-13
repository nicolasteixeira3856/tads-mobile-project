import React, { useContext, useState, useEffect } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, Image, ScrollView, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { EstateContext } from "../context/EstateContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Estate from '../components/Estate';

const HomeScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { estateState, listAllEstates, setFavorite } = useContext(EstateContext);
  const { favoriteState, favorite, unfavorite } = useContext(FavoriteContext);

  useEffect(() => {
    let id = authState.userId;
    listAllEstates({id});
  }, []);

  const handleFavorite = (userId, estateId) => {
    favorite({userId, estateId});
    setFavorite({estateId})
  }

  const handleUnfavorite = (userId, estateId) => {
    unfavorite({userId, estateId});
    setFavorite({estateId})
  }

  const showAlert = () =>
  Alert.alert(favoriteState.message);

  return (
    <View style={{padding: 16 }}>
        <Text>
          {estateState.message}
        </Text>
        <ScrollView>
          <View>
            {estateState.estates.map((estate) => (
              <Estate
                key={estate.id}
                title={estate.title}
                price={estate.price}
                imgUrl={estate.img_path}
                isFavorited={estate.isFavorited}
                favorite={() => handleFavorite(authState.userId, estate.id)}
                unfavorite={() => handleUnfavorite(authState.userId, estate.id)}
              />
            ))}
          </View>
        </ScrollView>
    </View>
  );
};

export default HomeScreen;
