import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

export default function ApiProvider({ children }) {
  const [results, setResults] = useState();
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [resultsClean, setResultsClean] = useState();
  const [initialCategories] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
        const filtered = deleteResidents
          .filter((cada) => cada.name.toLowerCase().includes(nameFilter.toLowerCase()));
        setResults(filtered);
        setResultsClean(filtered);
      } catch (erro) {
        setError(erro);
      }
    };
    fetchData();
  }, [setResults, nameFilter]);

  const values = useMemo(() => ({
    results,
    setResults,
    error,
    setError,
    useEffect,
    setNameFilter,
    nameFilter,
    resultsClean,
    initialCategories,
  }), [results, error, nameFilter, resultsClean, initialCategories]);
  return (
    <ApiContext.Provider value={ values }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
