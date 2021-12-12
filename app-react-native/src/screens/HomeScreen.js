import React, { useContext, useState, useEffect } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, Image, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { EstateContext } from "../context/EstateContext";
import Estate from '../components/Estate';

const HomeScreen = ({ navigation }) => {

  const { authState } = useContext(AuthContext);
  const { estateState, listAllEstates } = useContext(EstateContext);

  useEffect(() => {
    let id = authState.userId;
    listAllEstates({id});
  }, []);

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
              />
            ))}
          </View>
        </ScrollView>
    </View>
  );
};

export default HomeScreen;
