const Ranking = ({ teams, matches, onClearTeams }) => {
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

  // Calcular os totais de blots, plifs e advrunghs para cada time
  const calculateTotals = (teams, matches) => {
    const totals = teams.map(team => ({
      ...team,
      totalBlots:team.totalBlots || 0,
      totalPlifs: team.totalPlifs || 0,
      totalAdvrunghs: team.totalAdvrughs || 0,
      totalPoints: team.points || 0,
    }));

    matches.forEach(match => {
      const team1 = totals.find(team => team.name === match.team1.name);
      const team2 = totals.find(team => team.name === match.team2.name);

      if (team1) {
        team1.totalBlots += match.team1.blots || 0;
        team1.totalPlifs += match.team1.plifs || 0;
        team1.totalAdvrunghs += match.team1.advrunghs || 0;
        team1.totalPoints += match.team1.points || 0;
      }

      if (team2) {
        team2.totalBlots += match.team2.blots || 0;
        team2.totalPlifs += match.team2.plifs || 0;
        team2.totalAdvrunghs += match.team2.advrunghs || 0;
        team2.totalPoints += match.team2.points || 0;
      }
    });

    return totals;
  };

  const teamsWithTotals = calculateTotals(teams, matches);

  // Ordenar os times pela pontuação total em ordem decrescente
  const sortedTeams = [...teamsWithTotals].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div>
      {teams.length > 0 && allTeamsParticipated && (
        <>
          <h2>Ranking Final</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Total de Blots</th>
                <th>Total de Plifs</th>
                <th>Total de Advrunghs</th>
                <th>Pontuação Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <tr key={index}>
                  <td>{team.name}</td>
                  <td>{team.totalBlots}</td>
                  <td>{team.totalPlifs}</td>
                  <td>{team.totalAdvrunghs}</td>
                  <td>{team.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onClearTeams}>Limpar Times</button>
        </>
      )}
    </div>
  );
};

  
export default Ranking;
