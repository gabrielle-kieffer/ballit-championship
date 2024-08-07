//ultimo teste

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

// function App() {
//   const [teams, setTeams] = useState([]);
//   const [matches, setMatches] = useState([]);
//   const [championshipStarted, setChampionshipStarted] = useState(false);
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   const [topTeam, setTopTeam] = useState(null);
//   const [showRanking, setShowRanking] = useState(false);
//   const [matchScores, setMatchScores] = useState([]);

//   const addTeam = (team) => {
//     setTeams([...teams, team]);
//   };

//   const startChampionship = () => {
//     const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
//     const generatedMatches = generateMatches(shuffledTeams);
//     setMatches(generatedMatches);
//     setChampionshipStarted(true);
//   };

//   const handleMatchClick = (match) => {
//     setSelectedMatch(match);
//   };

//   const handleCloseMatch = () => {
//     setSelectedMatch(null);
//   };

//   const finalizeMatch = (winner) => {
//     setTeams(prevTeams => {
//       const updatedTeams = prevTeams.map(team => ({
//         ...team,
//         points: team.name === winner ? (team.points || 0) + 1 : (team.points || 0)
//       }));

//       const updatedMatchScores = [...matchScores, {
//         match: selectedMatch,
//         winner
//       }];
//       setMatchScores(updatedMatchScores);

//       const highestPoints = Math.max(...updatedTeams.map(team => team.points || 0));
//       const topScoringTeams = updatedTeams.filter(team => team.points === highestPoints);

//       if (topScoringTeams.length > 1) {
//         setTopTeam(null);
//       } else {
//         setTopTeam(topScoringTeams[0]);
//       }

//       const updatedMatches = matches.map(match =>
//         match === selectedMatch ? { ...match, administered: true } : match
//       );

//       setMatches(updatedMatches);

//       // Verificar se todas as partidas foram administradas
//       const allMatchesAdministered = updatedMatches.every(match => match.administered);
//       if (allMatchesAdministered) {
//         setShowRanking(true);
//         setChampionshipStarted(false);
//       }

//       return updatedTeams;
//     });
//   };

//   const clearTeams = () => {
//     setTeams([]);
//     setMatches([]);
//     setTopTeam(null);
//     setMatchScores([]);
//     setShowRanking(false);
//     setChampionshipStarted(false);
//   };

//   return (
//     <div className="App">
//       <h1>Ballit Championship</h1>
//       <h2>Cadastre os Times</h2>
//       {/* <TeamForm addTeam={addTeam} /> */}
//       <TeamForm addTeam={addTeam} championshipStarted={championshipStarted} />
//       <TeamList teams={teams} />
//       {!showRanking && teams.length >= 4 && teams.length % 2 === 0 && !championshipStarted && (
//         <button onClick={startChampionship}>Iniciar Campeonato</button>
//       )}
//       {championshipStarted && (
//         <div>
//           <h2>Partidas</h2>
//           <ul>
//             {matches.map((match, index) => (
//               <li key={index} onClick={() => handleMatchClick(match)}>
//                 {match.team1.name} vs {match.team2.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {selectedMatch && (
//         <Match match={selectedMatch} onClose={handleCloseMatch} onResult={finalizeMatch} />
//       )}
//       {topTeam && !showRanking && (
//         <div>
//           <h2>Vencedor da partida</h2>
//           <p>{topTeam.name} - {topTeam.points} pontos</p>
//         </div>
//       )}
//       {showRanking && (
//         <TeamRanking teams={teams} matches={matches} onClearTeams={clearTeams} />
//       )}
//     </div>
//   );
// }

function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [championshipStarted, setChampionshipStarted] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [topTeam, setTopTeam] = useState(null);
  const [showRanking, setShowRanking] = useState(false);
  const [matchScores, setMatchScores] = useState([]);

  const addTeam = (team) => {
    setTeams([...teams, team]);
  };

  const startChampionship = () => {
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const generatedMatches = generateMatches(shuffledTeams);
    setMatches(generatedMatches);
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
        points: team.name === winner ? (team.points || 0) + 1 : (team.points || 0)
      }));

      const updatedMatchScores = [...matchScores, {
        match: selectedMatch,
        winner
      }];
      setMatchScores(updatedMatchScores);

      const highestPoints = Math.max(...updatedTeams.map(team => team.points || 0));
      const topScoringTeams = updatedTeams.filter(team => team.points === highestPoints);

      if (topScoringTeams.length > 1) {
        setTopTeam(null);
      } else {
        setTopTeam(topScoringTeams[0]);
      }

      const updatedMatches = matches.map(match =>
        match === selectedMatch ? { ...match, administered: true } : match
      );

      setMatches(updatedMatches);

      const allMatchesAdministered = updatedMatches.every(match => match.administered);
      if (allMatchesAdministered) {
        setShowRanking(true);
        setChampionshipStarted(false);
      }

      return updatedTeams;
    });
  };

  const clearTeams = () => {
    setTeams([]);
    setMatches([]);
    setTopTeam(null);
    setMatchScores([]);
    setShowRanking(false);
    setChampionshipStarted(false);
  };

  return (
    <div className="App">
      <h1>Ballit Championship</h1>
      <h2>Cadastre os Times</h2>
      <TeamForm addTeam={addTeam} championshipStarted={championshipStarted} showRanking={showRanking} />
      <TeamList teams={teams} />
      {!showRanking && teams.length >= 4 && teams.length % 2 === 0 && !championshipStarted && (
        <button onClick={startChampionship}>Iniciar Campeonato</button>
      )}
      {championshipStarted && !showRanking && (
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
      {topTeam && !showRanking && (
        <div>
          <h2>Vencedor da partida</h2>
          <p>{topTeam.name} - {topTeam.points} pontos</p>
        </div>
      )}
      {showRanking && (
        <TeamRanking teams={teams} matches={matches} onClearTeams={clearTeams} />
      )}
    </div>
  );
}


export default App;

