import React, { useState } from "react";
import { IPlayer } from "../entities/Player";
import { Text, View } from '../components/Themed';
import { SafeAreaView, TextInput, StyleSheet, Button } from "react-native";

const PlayerCard = (props: {player: IPlayer/*, isSelected: boolean*/}) => {
    const [name, setName] = useState(props.player.name);

    return (
        /*<View style={[styles.card, props.isSelected ? styles.selected : styles.notSelected]}>*/
        <View style={[styles.card, styles.notSelected]}>
            <Text style={styles.name}>
                {props.player.name}
            </Text>
            <Text style={[styles.lifePoints, props.player.lifePoints <= 0 ? styles.dead : styles.alive]}>
                {props.player.lifePoints}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 25,
    },
    notSelected:{
        backgroundColor: '#ffffff',
    },
    selected:{
        backgroundColor: '#edecea',
    },
    name:{
        fontSize: 45,
    },
    lifePoints:{
        marginLeft: 'auto',
        fontSize: 35,
    },
    alive:{
        color:'black',
    },
    dead:{
        color: 'red',
    }
});

export default PlayerCard;