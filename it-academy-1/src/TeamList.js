import React from 'react';

const TeamList = ({ teams }) => {
  return (
    <div>
      <h1>Times cadastrados</h1>
      <div>
        {teams.map((team, index) => (
          <div key={index}>{team.name} - {team.slogan} ({team.year})</div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
