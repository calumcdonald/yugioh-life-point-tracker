import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import EnterNameDialog from '../components/EnterNameDialog';
import { IPlayer } from '../entities/Player';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';

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
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [selected, setSelected] = useState<IPlayer | null>(null);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState<boolean>(false);

  const addPlayer = () => {

  }

  const createPlayer = (name: string) => {
    let newId = 0;
    if(players.length !== 0){
      newId = players[players.length-1].id + 1;
    }
    
    setPlayers([...players, {id:newId,name:`Player ${newId}`,lifePoints:8000}]);
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
              <TouchableOpacity key={player.id} onPress={() => {
                setSelected(player);
                }}>
                <PlayerCard player={player} isSelected={selected === player ? true : false} />
              </TouchableOpacity>
            </Swipeable>
          )
        })}
        <TouchableOpacity style={styles.addPlayerButton} onPress={() => {
            createPlayer('Matthew');
            }}>
              <Ionicons name="add-outline" size={50}/>
        </TouchableOpacity>
      </ScrollView>
      ) : (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addPlayerButton} onPress={() => {
            createPlayer('Matthew');
            }}>
              <Ionicons name="add-outline" size={50}/>
        </TouchableOpacity>
        <Text style={styles.info}>
            Add players with the above button.
        </Text>
      </View>))}
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
