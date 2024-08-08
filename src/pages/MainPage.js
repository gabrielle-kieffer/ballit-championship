import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../context/MyContext';

function MainPage() {
  const navigate = useNavigate();
  const { teams, setTeams } = useContext(context);
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [year, setYear] = useState('');
  const [points, setPoints] = useState(50);

  useEffect(() => {
    const ulTimesCadastrados = document.getElementById('ulTimesCadastrados');
    ulTimesCadastrados.innerHTML = '';
    teams.forEach((team) => {
      const li = document.createElement('li');
      li.innerText = `${team.name} - ${team.slogan} - ${team.year}`;
      ulTimesCadastrados.appendChild(li);
    });
  });

  const handleClick = () => {
    const isNameUnique = !teams.some((team) => team.name === name);
    const isSloganUnique = !teams.some((team) => team.slogan === slogan);
  
    if (!isNameUnique) {
      alert('Já existe um time com esse nome!');
      return;
    }
  
    if (!isSloganUnique) {
      alert('Já existe um time com esse grito de guerra!');
      return;
    }
    const ulTimesCadastrados = document.getElementById('ulTimesCadastrados');
    const li = document.createElement('li');
    li.innerText = `${name} - ${slogan} - ${year}`;
    ulTimesCadastrados.appendChild(li);
    setTeams([...teams, { name, slogan, year, points }]);

    // Limpa os inputs após adicionar a lista 
    setName('');
    setSlogan('');
    setYear('');
  }

  const irParaPartidas = () => {
    navigate('/partidas');
  }

  
  const verify = name && slogan && year;
  const quantidadeTimes = teams.length > 3;
  return (
    <div>
      <header>
        <h1>Ballit Championship</h1>
        </header>
        <div className='registrationTitle'>
        <h2>Cadastre os Times</h2>
        </div>
        <div className='infoTeam'>
        <label htmlFor='teamName'>Nome do Time: </label>
        <input
          type="text"
          id='teamName'
          placeholder="Nome do Time"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor='teamWarCry'>Grito de Guerra: </label>
        <input
          type="text"
          id='teamWarCry'
          placeholder="Grito de Guerra"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          required
        />
        <br />
        <label htmlFor='anoDeFundacao'>Ano de Fundação: </label>
        <input
          type='number'
          id='anoDeFundacao'
          placeholder='Ano de Fundação'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
         </div>
        <br />
        <div className='buttonMainPage'>
        <button
          type="button"
          disabled={ !verify }
          onClick={ handleClick }
        >
          Adicionar Time
        </button>
        <br />
        <div className='buttonInitial'>
        <button
          type="button"
          disabled={ !quantidadeTimes }
          onClick={ irParaPartidas }
        >
          Iniciar Partida
        </button>
        </div>
        </div>
        <h3>Times Cadastrados</h3>
        <ul id='ulTimesCadastrados'>
        </ul>
    </div>
  )
}


export default MainPage;