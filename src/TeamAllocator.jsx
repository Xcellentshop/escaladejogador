import React, { useState } from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function TeamAllocator({ players, goalkeepers }) {
  const [teamRed, setTeamRed] = useState([]);
  const [teamBlue, setTeamBlue] = useState([]);
  const [selectedGoalkeepers, setSelectedGoalkeepers] = useState([]);
  const [lastPositions, setLastPositions] = useState([]);

  const allocateTeams = () => {
    let availablePlayers = [...players];
    let availableGoalkeepers = [...goalkeepers];
    let selectedGoalkeepers = [];

    // Criar uma cópia da lista de jogadores disponíveis para a seleção de goleiros
    let playersForGoalkeeperSelection = [...availablePlayers];

    // Excluir Edson da lista de jogadores disponíveis para ser goleiro
    const edsonIndex = playersForGoalkeeperSelection.findIndex(player => player.toLowerCase() === 'edson');
    if (edsonIndex !== -1) {
      playersForGoalkeeperSelection.splice(edsonIndex, 1);
    }

    const numGoalkeepersNeeded = 2 - availableGoalkeepers.length;

    if (numGoalkeepersNeeded > 0) {
      playersForGoalkeeperSelection = shuffleArray(playersForGoalkeeperSelection);
      if (playersForGoalkeeperSelection.length >= numGoalkeepersNeeded) {
        selectedGoalkeepers = playersForGoalkeeperSelection.splice(0, numGoalkeepersNeeded);
        availableGoalkeepers = [...availableGoalkeepers, ...selectedGoalkeepers];
      } else {
        alert(`Não há jogadores suficientes para selecionar ${numGoalkeepersNeeded} goleiro(s)!`);
        return;
      }
    }

    // Remover os goleiros selecionados da lista de jogadores disponíveis
    availablePlayers = availablePlayers.filter(player => !availableGoalkeepers.includes(player));

    // Embaralhar os jogadores restantes
    availablePlayers = shuffleArray(availablePlayers);

    // Dividir os jogadores em dois times
    const half = Math.ceil(availablePlayers.length / 2);
    const teamRedPlayers = availablePlayers.slice(0, half);
    const teamBluePlayers = availablePlayers.slice(half);

    // Embaralhar a lista de goleiros disponíveis
    availableGoalkeepers = shuffleArray(availableGoalkeepers);

    // Adicionar os goleiros aos times
    if (availableGoalkeepers.length >= 2) {
      teamRedPlayers.push(availableGoalkeepers[0]);
      teamBluePlayers.push(availableGoalkeepers[1]);
    } else if (availableGoalkeepers.length === 1) {
      const randomTeam = Math.random() < 0.5 ? teamRedPlayers : teamBluePlayers;
      randomTeam.push(availableGoalkeepers[0]);
    }

    // Verificar se a nova formação é igual à última
    const positions = [...teamRedPlayers, ...teamBluePlayers];
    if (JSON.stringify(positions) === JSON.stringify(lastPositions)) {
      // Tentar sortear novamente
      allocateTeams();
      return;
    }

    // Atualizar os estados
    setLastPositions(positions);
    setSelectedGoalkeepers(selectedGoalkeepers);
    setTeamRed(teamRedPlayers);
    setTeamBlue(teamBluePlayers);
  };

  return (
    <div className="team-allocator">
      <button onClick={allocateTeams}>Sortear Times</button>

      {selectedGoalkeepers.length > 0 && (
        <div className="selected-goalkeepers">
          <h2>Goleiros Selecionados:</h2>
          <ul>
            {selectedGoalkeepers.map((goalkeeper, index) => (
              <li key={index}>
                {goalkeeper} - Time {index === 0 ? "Vermelho" : "Azul"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="teams">
        <div className="team">
          <h2>Time Vermelho</h2>
          <ul>
            {teamRed.map((player, index) => (
              <li key={index} className={selectedGoalkeepers.includes(player) ? "selected-goalkeeper" : ""}>
                {player}
              </li>
            ))}
          </ul>
        </div>
        <div className="team">
          <h2>Time Azul</h2>
          <ul>
            {teamBlue.map((player, index) => (
              <li key={index} className={selectedGoalkeepers.includes(player) ? "selected-goalkeeper" : ""}>
                {player}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamAllocator;
