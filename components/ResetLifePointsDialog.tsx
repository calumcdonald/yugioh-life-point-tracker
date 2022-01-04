import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { Text } from '../components/Themed';
import { IPlayer } from "../entities/Player";

const NewPlayerDialog = (props: {open: boolean, handleClose: Function, resetLifePoints: Function}) => {

    return (
        <Dialog
            style={styles.container}
            visible={props.open}
            dismissable
            onDismiss={() => props.handleClose()}>
            <Dialog.Content style={styles.container}>
                <Text style={styles.title}>Reset Life Points?</Text>
            </Dialog.Content>

            <Dialog.Actions>
                <Button onPress={() => {
                    props.resetLifePoints();
                    props.handleClose();
                }}>Yes</Button>
                <Button onPress={() => props.handleClose()}>No</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    input:{
        fontSize:25,
        borderWidth:1,
        borderRadius:5,
        padding:10,
        textAlign:'center',
        borderColor:'#aaaaaa',
        width:250,
    }
  });

export default NewPlayerDialog;