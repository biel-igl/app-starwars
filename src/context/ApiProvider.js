import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

export default function ApiProvider({ children }) {
  const [results, setResults] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://swapi.dev/api/planets');
        if (!data.ok) {
          const newError = await data.json();
          throw newError.detail;
        }
        const json = await data.json();
        const deleteResidents = json.results.map((result) => {
          delete result.residents;
          return result;
        });
        setResults(deleteResidents);
      } catch (erro) {
        setError(erro);
      }
    };
    fetchData();
  }, [setResults]);
  const values = useMemo(() => ({
    results, setResults, error, setError, useEffect,
  }), [results, error]);
  return (
    <ApiContext.Provider value={ values }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
