import React, { useContext, useEffect } from "react";
import { Text } from "react-native-elements";
import { View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { EstateContext } from "../context/EstateContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Estate from '../components/Estate';

const HomeScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { estateState, listAllEstates, setFavoriteEstatesList } = useContext(EstateContext);
  const { favoriteState, favorite, unfavorite } = useContext(FavoriteContext);

  useEffect(() => {
    let id = authState.userId;
    listAllEstates({id});

    const unsubscribe = navigation.addListener('focus', () => {
      listAllEstates({id});
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
              <TouchableOpacity key={estate.id} onPress={() => navigation.navigate("EstateDetailsScreen", {estate})}>
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
  );
};

export default HomeScreen;
