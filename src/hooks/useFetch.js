import { useState } from 'react';

const useFetch = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`result ${errorData.message}`);
      }
      const json = await response.json();
      const deleteResidents = json.results.map((result) => {
        delete result.residents;
        return result;
      });
      return deleteResidents;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, loading, error, setError };
};
export default useFetch;
