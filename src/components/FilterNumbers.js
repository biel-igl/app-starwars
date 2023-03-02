import { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

const initialState = (categorias) => ({
  categorie: categorias[0],
  faixa: 'maior que',
  number: 0,
});

export default function FilterNumber() {
  const { results, setResults, resultsClean, initialCategories } = useContext(ApiContext);
  const [filterClick, setFilterClick] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [filters, setFilters] = useState(initialState(initialCategories));
  const onChange = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };
  const clearFilter = (target) => {
    const [categorieClick, index] = target;
    if (target === 'remove All' || filterClick.length === 1) {
      filterClick.map(() => {
        categories.push(categorieClick);
        setCategories(categories);
        setFilters(initialState(categories));
        return setFilterClick([]);
      });
      return setResults(resultsClean);
    }
    if (filterClick.length >= 1) {
      filterClick.splice(index, 1);
      filterClick.map((filtros) => {
        const { categorie, faixa, number } = filtros;
        const resultsFiltered = resultsClean.filter((cada) => {
          if (faixa === 'maior que') return (cada[categorie] > Number(number));
          if (faixa === 'menor que') return (cada[categorie] < Number(number));
          if (faixa === 'igual a') return (Number(cada[categorie]) === Number(number));
          return cada;
        });
        return setResults(resultsFiltered);
      });
      categories.push(categorieClick);
      return setCategories(categories);
    }
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
    if (!filterClick.length) {
      filterClick.push(filters);
      filterClick.map((cada) => {
        const index = categories.indexOf(cada.categorie);
        categories.splice(index, 1);
        setCategories(categories);
        return setFilters(initialState(categories));
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
        setCategories(categories);
        return setFilters(initialState(categories));
      });
    }
  };

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          value={ filters.categorie }
          onChange={ onChange }
          name="categorie"
        >
          {categories
            .map((cada) => <option key={ cada } value={ cada }>{ cada }</option>)}
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
      <div>
        {filterClick
          .map((cada, index) => (
            <div key={ index } data-testid="filter">
              {`${cada.categorie} ${cada.faixa} ${cada.number}`}
              <button
                type="button"
                onClick={ () => clearFilter([cada.categorie, index]) }
              >
                x
              </button>
            </div>
          ))}
        <button
          data-testid="button-remove-filters"
          onClick={ (target) => clearFilter(target.target.name) }
          name="remove All"
        >
          Remover todas filtragens
        </button>
      </div>
    </div>
  );
}
