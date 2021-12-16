import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Image, Icon } from "react-native-elements";
import MyConstants from '../core/constants';
import {formatCurrency} from '../utils/helpers';

const Estate = (props) => (
    <View style={styles.noteWrap}>
        <Image
            style={styles.image}
            source={{ uri: MyConstants.API_URL + '/public/' + props.imgUrl}}
        />
        <View style={{ width: 6 }}/>
        <Text style={styles.text}>{props.title}{"\n"}{formatCurrency(props.price)}</Text>
        <View style={{ width: 12 }}/>
        <Icon
            name={props.isFavorited ? 'heart-minus' : 'heart'}
            type='material-community'
            color='red'
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