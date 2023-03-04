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
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  useEffect(() => {
    function compareAsc(a, b) {
      const { column } = order;
      const menosUm = -1;
      if (b[column] === 'unknown') {
        return menosUm;
      } return a[column] - b[column];
    }

    function compareDesc(a, b) {
      const { column } = order;
      const menosUm = -1;
      if (b[column] === 'unknown') {
        return menosUm;
      } return b[column] - a[column];
    }

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
        if (order.sort === 'ASC') {
          const filterAsc = filtered.sort(compareAsc);
          setResults(filterAsc);
          setResultsClean(filterAsc);
        }
        if (order.sort === 'DESC') {
          const filterDesc = filtered.sort(compareDesc);
          setResults(filterDesc);
          setResultsClean(filterDesc);
        }
      } catch (erro) {
        setError(erro);
      }
    };
    fetchData();
  }, [setResults, nameFilter, order]);

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
    setOrder,
    order,
  }), [results, error, nameFilter, resultsClean, initialCategories, order]);
  return (
    <ApiContext.Provider value={ values }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
