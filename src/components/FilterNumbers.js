import { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

const initialFilters = {
  categorie: 'population',
  faixa: 'maior que',
  number: 0,
};

export default function FilterNumber() {
  const { results, setResults } = useContext(ApiContext);
  const [filters, setFilters] = useState(initialFilters);
  const [filterClick, setFilterClick] = useState([]);
  const [categories, setCategories] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
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
      setFilters(initialFilters);
    }
    if (!filterClick.length) {
      filterClick.push(filters);
      filterClick.map((cada) => {
        const index = categories.indexOf(cada.categorie);
        categories.splice(index, 1);
        return setCategories(categories);
      });
    }
    if (filterClick.length) {
      filterClick.push(filters);
      setFilterClick([...new Set(filterClick)]);
      filterClick.map((cada) => {
        const index = categories.indexOf(cada.categorie);
        const not = -1;
        if (index !== not) {
          categories.splice(index, 1);
        }
        return setCategories(categories);
      });
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
        onClick={ onClick }
      >
        Filtrar
      </button>
    </form>
  );
}
