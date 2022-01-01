import React, { useState } from "react";
import { TextInput } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { View } from "./Themed";

const EnterNameDialog = () => {
    const [inputVal, setInputVal] = useState('Player 1');
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    return (
        <View>
            <Dialog
                visible={isDialogVisible}
                onDismiss={() => setIsDialogVisible(false)}>
                <Dialog.Content>
                    <TextInput
                        value={inputVal}
                        onChangeText={text => setInputVal(text)}
                    />
                    <TextInput
                        value={inputVal}
                        onChangeText={text => setInputVal(text)}
                    />
                    <TextInput
                        value={inputVal}
                        onChangeText={text => setInputVal(text)}
                    />
                </Dialog.Content>

                <Dialog.Actions>
                <Button onPress={() => setIsDialogVisible(false)}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

export default EnterNameDialog;