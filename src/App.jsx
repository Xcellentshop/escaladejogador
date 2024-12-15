import React, { useState } from 'react';
import PlayerForm from './PlayerForm.jsx';
import TeamAllocator from './TeamAllocator.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import './styles.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [goalkeepers, setGoalkeepers] = useState([]);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const addGoalkeeper = (goalkeeper) => {
    setGoalkeepers([...goalkeepers, goalkeeper]);
  };

  const removePlayer = (index) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  const removeGoalkeeper = (index) => {
    const newGoalkeepers = goalkeepers.filter((_, i) => i !== index);
    setGoalkeepers(newGoalkeepers);
  };

  const editPlayer = (index, newName) => {
    const newPlayers = players.map((player, i) => (i === index ? newName : player));
    setPlayers(newPlayers);
  };

  const editGoalkeeper = (index, newName) => {
    const newGoalkeepers = goalkeepers.map((goalkeeper, i) => (i === index ? newName : goalkeeper));
    setGoalkeepers(newGoalkeepers);
  };

  const reset = () => {
    setPlayers([]);
    setGoalkeepers([]);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Sistema de Sorteio de Jogadores do Peladão do União</h1>
        <ThemeToggle />
      </div>
      <PlayerForm onAddPlayer={addPlayer} onAddGoalkeeper={addGoalkeeper} />
      <button onClick={reset}>Resetar Configuração</button>
      <div className="added-players">
        <h2>Jogadores Adicionados</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player}
              <div className="button-container">
                <button className="edit" onClick={() => editPlayer(index, prompt('Novo nome do jogador:', player))}>Editar</button>
                <button className="delete" onClick={() => removePlayer(index)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="added-goalkeepers">
        <h2>Goleiros Adicionados</h2>
        <ul>
          {goalkeepers.map((goalkeeper, index) => (
            <li key={index}>
              {goalkeeper}
              <div className="button-container">
                <button className="edit" onClick={() => editGoalkeeper(index, prompt('Novo nome do goleiro:', goalkeeper))}>Editar</button>
                <button className="delete" onClick={() => removeGoalkeeper(index)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TeamAllocator players={players} goalkeepers={goalkeepers} />
    </div>
  );
}

export default App;
