import React, { useState } from 'react';

const Match = ({ match, onClose, onResult }) => {
  const [team1Points, setTeam1Points] = useState(50);
  const [team2Points, setTeam2Points] = useState(50);

  const handleBlot = (team) => {
    if (team === 'team1') {
      setTeam1Points(prev => prev + 5);
    } else {
      setTeam2Points(prev => prev + 5);
    }
  };

  const handlePlif = (team) => {
    if (team === 'team1') {
      setTeam2Points(prev => prev + 1); // Plif para o time adversário
    } else {
      setTeam1Points(prev => prev + 1); // Plif para o time adversário
    }
  };

  const handleAdvrungh = (team) => {
    if (team === 'team1') {
      setTeam1Points(prev => prev - 10);
    } else {
      setTeam2Points(prev => prev - 10);
    }
  };

  const determineWinner = () => {
    if (team1Points > team2Points) {
      return match.team1.name;
    } else if (team2Points > team1Points) {
      return match.team2.name;
    } else {
      // Empate, aplicar o "grusht"
      return 'Empate - Grusht necessário';
    }
  };

  const handleCloseMatch = () => {
    const winner = determineWinner();
    onResult(winner); 
    onClose(); 
  };

  return (
    <div className="match-details">
      <h2>Detalhes da Partida</h2>
      <p>{match.team1.name} vs {match.team2.name}</p>
      <p><strong>Grito de Guerra: {match.team1.slogan}</strong></p>
      <p><strong>Grito de Guerra: {match.team2.slogan}</strong></p>
      <p><strong>Ano de Fundação: {match.team1.year}</strong></p>
      <p><strong>Ano de Fundação: {match.team2.year}</strong></p>

      <h3>Pontos</h3>
      <p>{match.team1.name}: {team1Points}</p>
      <p>{match.team2.name}: {team2Points}</p>

      <button onClick={() => handleBlot('team1')}>Registrar Blot para {match.team1.name}</button>
      <button onClick={() => handleBlot('team2')}>Registrar Blot para {match.team2.name}</button>
      <button onClick={() => handlePlif('team1')}>Registrar Plif para {match.team2.name}</button>
      <button onClick={() => handlePlif('team2')}>Registrar Plif para {match.team1.name}</button>
      <button onClick={() => handleAdvrungh('team1')}>Registrar Advrungh para {match.team1.name}</button>
      <button onClick={() => handleAdvrungh('team2')}>Registrar Advrungh para {match.team2.name}</button>

      <button onClick={handleCloseMatch}>Encerrar Partida</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Match;


