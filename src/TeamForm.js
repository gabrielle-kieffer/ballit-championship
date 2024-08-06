import React, { useState } from 'react';

const TeamForm = ({ addTeam }) => {
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !slogan || isNaN(year)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    addTeam({ name, slogan, year: parseInt(year, 10), points: 50, blots: 0, plifs: 0, advrunghs: 0 });
    setName('');
    setSlogan('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Time"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Grito de Guerra"
        value={slogan}
        onChange={(e) => setSlogan(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Ano de Fundação"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <button type="submit">Adicionar Time</button>
    </form>
  );
};

export default TeamForm;
