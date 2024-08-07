import React, { useState } from 'react';
import TeamForm from './TeamForm'; 
import TeamList from './TeamList'; 
import Match from './Match'; 
import TeamRanking from './TeamRanking'; 
import './App.css';

const generateMatches = (shuffledTeams) => {
  const generatedMatches = [];
  for (let i = 0; i < shuffledTeams.length; i += 2) {
    generatedMatches.push({
      team1: shuffledTeams[i],
      team2: shuffledTeams[i + 1],
      administered: false,
    });
  }
  return generatedMatches;
};


function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [championshipStarted, setChampionshipStarted] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [topTeam, setTopTeam] = useState(null);
  const [matchScores, setMatchScores] = useState([]);
  const [showFullRanking, setShowFullRanking] = useState(false);

  const addTeam = (team) => {
    setTeams([...teams, team]);
  };

  const startChampionship = () => {
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const initialMatches = generateMatches(shuffledTeams);
    setMatches(initialMatches);
    setChampionshipStarted(true);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseMatch = () => {
    setSelectedMatch(null);
  };

  const finalizeMatch = (winner) => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map(team => ({
        ...team,
        points: team.name === winner ? (team.points || 0) + 1 : (team.points || 0),
      }));

      const updatedMatchScores = [...matchScores, {
        match: selectedMatch,
        winner
      }];
      setMatchScores(updatedMatchScores);

      const updatedMatches = matches.map(match =>
        match === selectedMatch ? { ...match, administered: true, winner } : match
      );

      setMatches(updatedMatches);

      const allMatchesAdministered = updatedMatches.every(match => match.administered);

      if (allMatchesAdministered) {
        const winners = updatedMatches.map(match => match.winner);
        if (winners.length === 1) {
          setTopTeam(updatedTeams.find(team => team.name === winners[0]));
        } else {
          const nextRoundMatches = generateMatches(winners.map(winner => updatedTeams.find(team => team.name === winner)));
          setMatches(nextRoundMatches);
        }
      }

      return updatedTeams;
    });
    setSelectedMatch(null);
  };

  const clearTeams = () => {
    setTeams([]);
    setMatches([]);
    setTopTeam(null);
    setMatchScores([]);
    setChampionshipStarted(false);
    setShowFullRanking(false);
  };

  const handleShowFullRanking = () => {
    setShowFullRanking(true);
  };

  return (
    <div className="App">
      <h1>Ballit Championship</h1>
      <h2>Cadastre os Times</h2>
      <TeamForm addTeam={addTeam} championshipStarted={championshipStarted} />
      <TeamList teams={teams} />
      {!championshipStarted && teams.length >= 4 && teams.length % 2 === 0 && (
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
        <Match match={selectedMatch} onClose={handleCloseMatch} onResult={finalizeMatch} />
      )}
      {topTeam && !showFullRanking && (
        <div>
          <h2>Vencedor do Campeonato</h2>
          <p>{topTeam.name}</p>
          <p>Grito de Guerra: {topTeam.slogan}</p>
          <button onClick={handleShowFullRanking}>Ver Ranking Completo</button>
        </div>
      )}
      {showFullRanking && (
        <TeamRanking teams={teams} matches={matches} onClearTeams={clearTeams} />
      )}
    </div>
  );
}

export default App;

