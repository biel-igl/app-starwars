import { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

export default function FilterNumber() {
  const { results, setResults } = useContext(ApiContext);
  const [filters, setFilters] = useState({
    categorie: 'population',
    faixa: 'maior que',
    number: 0,
  });
  const categories = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const onChange = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };
  const onClick = () => {
    if (results) {
      const { categorie, faixa, number } = filters;
      const resultsFiltered = results.filter((cada) => {
        if (faixa === 'maior que') return (cada[categorie] > Number(number));
        if (faixa === 'menor que') return (cada[categorie] < Number(number));
        if (faixa === 'igual a') return (Number(cada[categorie]) === Number(number));
        return cada;
      });
      setResults(resultsFiltered);
    }
  };

  return (
    <form>
      <select
        data-testid="column-filter"
        value={ filters.categorie }
        onChange={ onChange }
        name="categorie"
      >
        {categories.map((cada) => <option key={ cada } value={ cada }>{ cada }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        value={ filters.faixa }
        onChange={ onChange }
        name="faixa"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ filters.number }
        onChange={ onChange }
        name="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => onClick() }
      >
        Filtrar
      </button>
    </form>
  );
}
