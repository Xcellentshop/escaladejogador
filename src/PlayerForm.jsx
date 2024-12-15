import React, { useState } from 'react';

function PlayerForm({ onAddPlayer, onAddGoalkeeper }) {
  const [playerName, setPlayerName] = useState('');
  const [goalkeeperName, setGoalkeeperName] = useState('');

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onAddPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleGoalkeeperSubmit = (e) => {
    e.preventDefault();
    if (goalkeeperName.trim()) {
      onAddGoalkeeper(goalkeeperName.trim());
      setGoalkeeperName('');
    }
  };

  return (
    <div className="player-form">
      <form onSubmit={handlePlayerSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nome do jogador"
        />
        <button type="submit">Adicionar Jogador</button>
      </form>
      <form onSubmit={handleGoalkeeperSubmit}>
        <input
          type="text"
          value={goalkeeperName}
          onChange={(e) => setGoalkeeperName(e.target.value)}
          placeholder="Nome do goleiro"
        />
        <button type="submit">Adicionar Goleiro</button>
      </form>
    </div>
  );
}

export default PlayerForm;
