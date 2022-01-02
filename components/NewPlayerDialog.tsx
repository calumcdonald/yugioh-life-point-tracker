import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { Text, View } from '../components/Themed';

const NewPlayerDialog = (props: {open: boolean, handleClose: Function, createPlayer: Function, lastId: number}) => {
    const [inputVal, setInputVal] = useState(`Player ${props.lastId+1}`);

    return (
        <Dialog
            style={styles.container}
            visible={props.open}
            dismissable
            onDismiss={() => props.handleClose}>
            <Dialog.Content style={styles.container}>
                <Text style={styles.title}>New Player</Text>
                <TextInput
                    maxLength={10}
                    style={styles.input}
                    autoFocus
                    value={inputVal}
                    onChangeText={text => setInputVal(text)}
                />
            </Dialog.Content>

            <Dialog.Actions>
                <Button onPress={() => props.handleClose}>Cancel</Button>
                <Button onPress={() => {
                    props.createPlayer(inputVal);
                    props.handleClose;
                }}>Done</Button>
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