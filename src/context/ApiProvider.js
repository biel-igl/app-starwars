import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import ApiFetchData from '../services/ApiFetchData';

export default function ApiProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState();
  const [nameFilter, setNameFilter] = useState('');
  const [resultsClean, setResultsClean] = useState(null);
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
    const getResults = async () => {
      const result = await ApiFetchData();
      setResultsClean(result);
    };
    getResults();
  }, []);

  useEffect(() => {
    const filters = async () => {
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

      if (resultsClean) {
        const filtered = resultsClean
          .filter((cada) => cada.name.toLowerCase().includes(nameFilter.toLowerCase()));

        if (order.sort === 'ASC') {
          const filterAsc = filtered.sort(compareAsc);
          setResults(filterAsc);
          setLoading(false);
        }
        if (order.sort === 'DESC') {
          const filterDesc = filtered.sort(compareDesc);
          setResults(filterDesc);
          setLoading(false);
        }
      }
    };
    filters();
  }, [nameFilter, order, resultsClean]);

  const values = useMemo(() => ({
    loading,
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
  }), [
    results,
    error,
    nameFilter, resultsClean, initialCategories, order, setError, loading]);
  return (
    <ApiContext.Provider value={ values }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
