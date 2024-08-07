// import React from 'react';

// const TeamRanking = ({ teams, matches, onClearTeams }) => {
//   // Função para verificar se uma equipe participou de pelo menos uma partida
//   const didAllTeamsParticipate = (teams, matches) => {
//     const teamNames = new Set(teams.map(team => team.name));
//     const participatingTeams = new Set();

//     matches.forEach(match => {
//       participatingTeams.add(match.team1.name);
//       participatingTeams.add(match.team2.name);
//     });

//     return teamNames.size === participatingTeams.size;
//   };

//   // Verificar se todas as equipes participaram de pelo menos uma partida
//   const allTeamsParticipated = didAllTeamsParticipate(teams, matches);

//   // Ordenar os times pela pontuação em ordem decrescente
//   const sortedTeams = [...teams].sort((a, b) => (b.points || 0) - (a.points || 0));
//   console.log("Teams:", teams);
//   console.log("Matches:", matches);
//   console.log("All Teams Participated:", allTeamsParticipated);

//   // Exibir o ranking e o botão somente se houver times e todas as equipes tiverem participado
//   return (
//     <div>
//       {teams.length > 0 && allTeamsParticipated && (
//         <>
//           <h2>Ranking Final</h2>
//           <ul>
//             {sortedTeams.map((team, index) => (
//               <li key={index}>
//                 {team.name} - {team.points || 0} pontos
//               </li>
//             ))}
//           </ul>
//           <button onClick={onClearTeams}>Limpar Times</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default TeamRanking;

const TeamRanking = ({ teams, matches, onClearTeams }) => {
    // Função para verificar se uma equipe participou de pelo menos uma partida
    const didAllTeamsParticipate = (teams, matches) => {
      const teamNames = new Set(teams.map(team => team.name));
      const participatingTeams = new Set();
  
      matches.forEach(match => {
        participatingTeams.add(match.team1.name);
        participatingTeams.add(match.team2.name);
      });
  
      return teamNames.size === participatingTeams.size;
    };
  
    // Verificar se todas as equipes participaram de pelo menos uma partida
    const allTeamsParticipated = didAllTeamsParticipate(teams, matches);
  
    // Ordenar os times pela pontuação em ordem decrescente
    const sortedTeams = [...teams].sort((a, b) => (b.points || 0) - (a.points || 0));
  
    return (
      <div>
        {teams.length > 0 && allTeamsParticipated && (
          <>
            <h2>Ranking Final</h2>
            <ul>
              {sortedTeams.map((team, index) => (
                <li key={index}>
                  {team.name} - {team.points || 0} pontos
                </li>
              ))}
            </ul>
            <button onClick={onClearTeams}>Limpar Times</button>
          </>
        )}
      </div>
    );
  };
  
export default TeamRanking;
