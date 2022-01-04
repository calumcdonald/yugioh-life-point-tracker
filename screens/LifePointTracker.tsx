import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import NewPlayerDialog from '../components/NewPlayerDialog';
import { IPlayer } from '../entities/Player';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import LifePointDialog from '../components/LifePointDialog';
import ResetLifePointsDialog from '../components/ResetLifePointsDialog';

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
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selected, setSelected] = useState<IPlayer | null>(null);
  const [isNewPlayerDialogOpen, setIsNewPlayerDialogOpen] = useState<boolean>(false);
  const [isLifePointDialogOpen, setIsLifePointDialogOpen] = useState<boolean>(false);
  const [isResetLifePointsDialogOpen, setIsResetLifePointsDialogOpen] = useState<boolean>(false);

  const openNewPlayerDialog = () => {
    setIsNewPlayerDialogOpen(true);
  };

  const closeNewPlayerDialog = () => {
    setIsNewPlayerDialogOpen(false);
  };

  const openLifePointDialog = () => {
    setIsLifePointDialogOpen(true);
  };

  const closeLifePointDialog = () => {
    setIsLifePointDialogOpen(false);
  };

  const openResetLifePointsDialog = () => {
    setIsResetLifePointsDialogOpen(true);
  };

  const closeResetLifePointsDialog = () => {
    setIsResetLifePointsDialogOpen(false);
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

  const addLifePoints = (amount: number) => {
    if(selected){
      players[selected.id].lifePoints+=amount;
      setPlayers(players);
    }
  }

  const removeLifePoints = (amount: number) => {
    if(selected){
      players[selected.id].lifePoints-=amount;
      setPlayers(players);
    }
  }

  const resetLifePoints = () => {
    players.forEach(player => player.lifePoints = 8000);
    setPlayers(players);
  }
  
  return (
    <View style={styles.container}>
      {(players.length > 0 ? (
      <ScrollView>
        {players.map(player => {
          return (
            <View>
              <Swipeable style={styles.swipeable} rightContent={<Text style={styles.removePlayerButton}>Remove</Text>} onRightActionRelease={() => removePlayer(player.id)}>
                <TouchableOpacity key={player.id} onPress={() => {
                  setSelected(player);
                  openLifePointDialog();
                  }}>
                  <PlayerCard player={player} />
                </TouchableOpacity>
              </Swipeable>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
          )
        })}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionsButton} onPress={openNewPlayerDialog}>
            <Text>Add Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionsButton} onPress={openResetLifePointsDialog}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      ) : (
      <View style={styles.container}>
        <TouchableOpacity style={styles.actionsButton} onPress={openNewPlayerDialog}>
          <Text>Add Player</Text>
        </TouchableOpacity>
        <Text style={styles.info}>
          Add players with the above button.
          {"\n\n"}
          Tap a player to add/remove life points.
          {"\n\n"}
          Remove players by swiping them to the left.
        </Text>
      </View>))}

      <NewPlayerDialog open={isNewPlayerDialogOpen} handleClose={closeNewPlayerDialog} createPlayer={createPlayer} lastId={players.length}/>
      <LifePointDialog open={isLifePointDialogOpen} handleClose={closeLifePointDialog} addLifePoints={addLifePoints} removeLifePoints={removeLifePoints} player={selected!}/>
      <ResetLifePointsDialog open={isResetLifePointsDialogOpen} handleClose={closeResetLifePointsDialog} resetLifePoints={resetLifePoints}/>
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
  actions:{
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    flexDirection: 'row',
  },
  actionsButton:{
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    fontSize: 15,
    borderRadius: 20,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 10,
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
  },
  separator: {
    height: 1,
  },
});

export default LifePointTracker;
