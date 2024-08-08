import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [teams, setTeams] = useState(0);

  const values = useMemo(() => ({
    teams,
    setTeams,
  }), [
    teams,
    setTeams,
  ]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;