import React, { useState } from 'react';
import TeamForm from './TeamForm';
import TeamList from './TeamList';

import Match from './Match';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [championshipStarted, setChampionshipStarted] = useState(false);
  const [currentTeams, setCurrentTeams] = useState([]);
  const [matches, setMatches] = useState([]); 
  const [selectedMatch, setSelectedMatch] = useState(null); 


  const addTeam = (newTeam) => {
    const { name, slogan } = newTeam;
    if (teams.some(team => team.name === name)) {
      alert('O nome do time deve ser único.');
      return;
    }

    if (teams.some(team => team.slogan === slogan)) {
      alert('O grito de guerra deve ser único.');
      return;
    }

    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const startChampionship = () => {
    if (teams.length < 8 || teams.length % 2 !== 0) {
      alert('Número de times deve ser par e no mínimo 8.');
      return;
    }

    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    setCurrentTeams(shuffledTeams);
    setChampionshipStarted(true);

    // Gerar as partidas
    const generatedMatches = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      generatedMatches.push({
        team1: shuffledTeams[i],
        team2: shuffledTeams[i + 1],
        administered: false,
      });
    }
    setMatches(generatedMatches);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseMatch = () => {
    setSelectedMatch(null);
  };


  return (
    <div className="App">
      <h1>Ballit Championship</h1>
      <h2>Cadastre os Times</h2>
      <TeamForm addTeam={addTeam} />
      <TeamList teams={teams} />
      {teams.length >= 8 && teams.length % 2 === 0 && !championshipStarted && (
        <button onClick={startChampionship}>Iniciar Campeonato</button>
      )}
      {championshipStarted && (
        <div>
          <h2>Partidas</h2>
          <ul>
            {matches.map((match, index) => (
              <li key={index} onClick={() => handleMatchClick(match)}>
                {match.team1.name} vs {match.team2.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedMatch && (
        <Match match={selectedMatch} onClose={handleCloseMatch} />
      )}
    </div>
  );
}

export default App;
