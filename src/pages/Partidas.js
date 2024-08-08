import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../context/MyContext';

function Partidas() {
  const { teams } = useContext(context);
  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    const matchesArr = generateMatches();
    setMatches(matchesArr);
  }, [teams]);
  

  const generateMatches = () => {
    const generatedMatches = [];
    for (let i = 0; i < teams.length; i += 2) {
      if (teams[i + 1]) {
        generatedMatches.push({ team1: teams[i], team2: teams[i + 1] });
      }
    }
    return generatedMatches;
  };

  const startGame = () => {
    if (currentMatchIndex < matches.length) {
      const match = matches[currentMatchIndex];
      document.getElementById('nomePontosT1').innerHTML = `${match.team1.name}: ${match.team1.points}`;
      document.getElementById('nomePontosT2').innerHTML = `${match.team2.name}: ${match.team2.points}`;
      document.getElementById('gritoDeGuerraT1').innerHTML = match.team1.slogan;
      document.getElementById('nomeT1').innerHTML = match.team1.name;
      document.getElementById('gritoDeGuerraT2').innerHTML = match.team2.slogan;
      document.getElementById('nomeT2').innerHTML = match.team2.name;
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      document.getElementById('gritoDeGuerraT1').innerHTML = '';
      document.getElementById('nomeT1').innerHTML = '';
      document.getElementById('gritoDeGuerraT2').innerHTML = '';
      document.getElementById('nomeT2').innerHTML = '';
      console.log('All matches have been displayed.');
    }
  };

  const plifBlotAdv = (team, btn) => {
    if (btn === 'plif') {
      team.points += 1;
      console.log('Plif', team);
    } else if (btn === 'blot') {
      team.points += 5;
      console.log('Blot', team);
    } else if (btn === 'advrungh') {
      team.points -= 10;
      console.log('Advrungh', team);
    }
    document.getElementById('nomePontosT1').innerHTML = `${matches[currentMatchIndex - 1].team1.name}: ${matches[currentMatchIndex - 1].team1.points}`;
    document.getElementById('nomePontosT2').innerHTML = `${matches[currentMatchIndex - 1].team2.name}: ${matches[currentMatchIndex - 1].team2.points}`;
  };

  return (
    <div>
      <h1>Ballit Championship</h1>
      <div className='titleMatches'>
      <h2>Partidas</h2>
      </div>
      <div className='match'>
      <ul id="ulPartidas">
        {matches.map((match, index) => (
          <li key={index}>
            <div className='rivals'>
            {match.team1.name} x {match.team2.name}
            </div>
          </li>
        ))}
      </ul>
      </div>

      <button
          type="button"
          onClick={ startGame }
        >
          Iniciar Jogo
      </button>

      <p id='gritoDeGuerraT1'></p>
      <p id='nomeT1'></p>
      <button
          type="button"
          id='btnPlifT1'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team1, 'plif') }
        >
          Plif
      </button>
      <button
          type="button"
          id='btnBlotT1'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team1, 'blot') }
        >
          Blot
      </button>
      <button
          type="button"
          id='btnAdvrunghT1'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team1, 'advrungh') }
        >
          Advrungh
      </button>
      <p>VS</p>
      <p id='gritoDeGuerraT2'></p>
      <p id='nomeT2'></p>
      <button
          type="button"
          id='btnPlifT2'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team2, 'plif') }
        >
          Plif
      </button>
      <button
          type="button"
          id='btnBlotT2'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team2, 'blot') }
        >
          Blot
      </button>
      <button
          type="button"
          id='btnAdvrunghT2'
          onClick={ () => plifBlotAdv(matches[currentMatchIndex - 1].team2, 'advrungh') }
        >
          Advrungh
      </button>

     <div className='points'>
      <p id='nomePontosT1'></p>
      <p id='nomePontosT2'></p>
      </div>
    </div>
  )
}


export default Partidas