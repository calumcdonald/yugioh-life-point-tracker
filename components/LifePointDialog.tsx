import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, ActionSheetIOS } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { Text } from '../components/Themed';
import { IPlayer } from "../entities/Player";

const NewPlayerDialog = (props: {open: boolean, handleClose: Function, addLifePoints: Function, removeLifePoints: Function, player: IPlayer}) => {
    const [inputVal, setInputVal] = useState('');

    useEffect(() => {
        setInputVal('');
    }, [props.open]);

    return (
        <Dialog
            style={styles.container}
            visible={props.open}
            dismissable
            onDismiss={() => props.handleClose()}>
            <Dialog.Content style={styles.container}>
                <Text style={styles.title}>Enter Amount</Text>
                <TextInput
                    maxLength={10}
                    style={styles.input}
                    autoFocus
                    keyboardType='numeric'
                    value={inputVal}
                    onChangeText={text => setInputVal(text)}
                />
            </Dialog.Content>

            <Dialog.Actions>
                <View style={styles.actionsContainer}>
                    <Button color={'green'} onPress={() => {
                        props.addLifePoints(Number(inputVal));
                        props.handleClose();
                    }}>Add</Button>
                    <Button color={'red'} onPress={() => {
                        props.removeLifePoints(Number(inputVal));
                        props.handleClose();
                    }}>Remove</Button>
                </View>
            </Dialog.Actions>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    actionsContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
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
    },
  });

export default NewPlayerDialog;