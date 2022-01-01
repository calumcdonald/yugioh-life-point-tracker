import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import PlayerCard from '../components/PlayerCard';
import { IPlayer } from '../entities/Player';
import { RootTabScreenProps } from '../types';

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

const createPlayer = () => {
  
};

const LifePointTracker = ({ navigation }: RootTabScreenProps<'LifePointTracker'>) => {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [selected, setSelected] = useState<IPlayer | null>(null);
  
  return (
    <ScrollView>
      {players.map(player => {
        return (
        <TouchableOpacity onPress={() => {setSelected(player)}}>
          <PlayerCard player={player} isSelected={selected === player ? true : false} />
        </TouchableOpacity>
        )
      })}
    </ScrollView>
  );
}

export default LifePointTracker;
