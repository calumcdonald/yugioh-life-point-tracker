import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import NewPlayerDialog from '../components/NewPlayerDialog';
import { IPlayer } from '../entities/Player';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';

const initialPlayers = [{
    id: 0,
    name: 'Calum',
    lifePoints: 8000
  }, 
  {
    id: 1,
    name: 'Matthew',
    lifePoints: 8000
}];

const LifePointTracker = ({ navigation }: RootTabScreenProps<'LifePointTracker'>) => {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [selected, setSelected] = useState<IPlayer | null>(null);
  const [isNewPlayerDialogOpen, setIsNewPlayerDialogOpen] = useState<boolean>(false);

  const openNewPlayerDialog = () => {
    setIsNewPlayerDialogOpen(true);
  };

  const closeNewPlayerDialog = () => {
    setIsNewPlayerDialogOpen(false);
  };

  const createPlayer = (name: string) => {
    let newId = 0;
    if(players.length !== 0){
      newId = players[players.length-1].id + 1;
    }
    
    setPlayers([...players, {id:newId,name:name,lifePoints:8000}]);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };
  
  return (
    <View style={styles.container}>
      {(players.length > 0 ? (
      <ScrollView>
        {players.map(player => {
          return (
            <Swipeable style={styles.swipeable} rightContent={<Text style={styles.removePlayerButton}>Remove</Text>} onRightActionRelease={() => removePlayer(player.id)}>
              <TouchableOpacity key={player.id} onPress={() => setSelected(player)}>
                <PlayerCard player={player} isSelected={selected === player ? true : false} />
              </TouchableOpacity>
            </Swipeable>
          )
        })}
        <TouchableOpacity style={styles.addPlayerButton} onPress={openNewPlayerDialog}>
          <Ionicons name="add-outline" size={50}/>
        </TouchableOpacity>
      </ScrollView>
      ) : (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addPlayerButton} onPress={openNewPlayerDialog}>
              <Ionicons name="add-outline" size={50}/>
        </TouchableOpacity>
        <Text style={styles.info}>
            Add players with the above button.
        </Text>
      </View>))}

      <NewPlayerDialog open={isNewPlayerDialogOpen} handleClose={closeNewPlayerDialog} createPlayer={createPlayer} lastId={players.length}/>
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
    textAlign:'center',
    color: '#aaaaaa',
    fontSize: 20,
  },
  addPlayerButton:{
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  removePlayerButton:{
    marginLeft: 5,
    paddingLeft:10,
    backgroundColor:'#ff6961',
    fontSize: 18,
    flex: 1,
    textAlignVertical:'center',
    borderRadius: 25,
  },
  swipeable:{
    width: Dimensions.get('window').width-40,
  }
});

export default LifePointTracker;
