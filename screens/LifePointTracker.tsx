import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import EnterNameDialog from '../components/EnterNameDialog';
import { IPlayer } from '../entities/Player';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const initialPlayers = [{
    id: 0,
    name: 'Player 1',
    lifePoints: 8000
  }, 
  {
    id: 1,
    name: 'Player 2',
    lifePoints: 8000
}];

const LifePointTracker = ({ navigation }: RootTabScreenProps<'LifePointTracker'>) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selected, setSelected] = useState<IPlayer | null>(null);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState<boolean>(false);

  const addPlayer = () => {

  }

  const createPlayer = (name: string) => {
    let newId = 0;
    if(players.length !== 0){
      newId = players[players.length-1].id + 1;
    }
    
    setPlayers([...players, {id:newId,name:name,lifePoints:8000}]);
  };

  const removePlayer = () => {
    if(selected) setPlayers(players.filter(player => player.id !== selected.id));
  };
  
  return (
    <View style={styles.container}>
      {(players.length !== 0 ? (
      <ScrollView>
        {players.map(player => {
          return (
          <TouchableOpacity onPress={() => {
            setSelected(player);
            }}>
            <PlayerCard player={player} isSelected={selected === player ? true : false} />
          </TouchableOpacity>
          )
        })}
      </ScrollView>
      ) : (
      <View>
        <Text style={styles.info}>
            No players yet!
        </Text>
        <Text style={styles.info}>
            Add and remove players with the buttons below.
        </Text>
      </View>))}
      
      <View style={styles.addRemovePlayerButtonsContainer}>
        <Ionicons name="add-outline" size={50} style={styles.addRemovePlayerButton} onPress={addPlayer}/>
        <AntDesign name="minus" size={50} style={styles.addRemovePlayerButton} onPress={removePlayer} />
      </View>

      <EnterNameDialog />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  info: {
    color: '#aaaaaa',
    fontSize: 20,
  },
  addRemovePlayerButtonsContainer:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  addRemovePlayerButton:{
    backgroundColor: "white", 
    color: "black",
    borderColor: 'lightgrey',
    borderRadius: 20,
  }
});

export default LifePointTracker;
