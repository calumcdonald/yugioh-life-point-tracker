import React, { useState } from "react";
import { IPlayer } from "../entities/Player";
import { Text, View } from '../components/Themed';
import { SafeAreaView, TextInput, StyleSheet, Button } from "react-native";
import Checkbox from 'expo-checkbox';

const PlayerCard = (props: {player: IPlayer, isSelected: boolean}) => {
    const [name, setName] = useState(props.player.name);

    return (
        <View style={[styles.card, props.isSelected ? styles.selected : styles.notSelected]}>
            <Text style={styles.name}>
                {props.player.name}
            </Text>
            <Text style={styles.lifePoints}>
                {props.player.lifePoints}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    notSelected:{
        backgroundColor: '#ffffff',
    },
    selected:{
        backgroundColor: '#aaaaaa',
    },
    name:{
        fontSize: 35,
    },
    lifePoints:{
        fontSize: 25,
    }
});

export default PlayerCard;