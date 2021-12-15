import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Image, Icon } from "react-native-elements";

function formatCurrency(num) {
    return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

const Estate = (props) => (
    <View style={styles.noteWrap}>
        <Image
            style={styles.image}
            source={{ uri: 'https://76b5-2804-14c-87b9-b60d-94f-10e2-ad68-444a.ngrok.io/public/' + props.imgUrl}}
        />
        <View style={{ width: 6 }}/>
        <Text style={styles.text}>{props.title}{"\n"}{formatCurrency(props.price)}</Text>
        <View style={{ width: 12 }}/>
        <Icon
            name={props.isFavorited ? 'heart-minus' : 'heart'}
            type='material-community'
            color={props.isFavorited ? 'red' : 'red'}
            reverseColor={props.isFavorited ? 'grey' : 'red'}
            onPress={props.isFavorited ? props.unfavorite : props.favorite} 
        />
    </View>
) 

export default Estate;

const styles = StyleSheet.create({
    noteWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 40,
        paddingVertical: 12
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 'bold',
        letterSpacing: 0.24,
        color: 'black',
        flex: 6
    },
    image: {
        width: 100,
        height: 100
    },
})