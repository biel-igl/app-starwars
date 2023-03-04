import { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

const categorieSort = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FilterSort() {
  const { setOrder } = useContext(ApiContext);
  const [check, setChecked] = useState({
    ASC: true,
    DESC: false,
  });
  const [stateFilter, setStateFilter] = useState({ column: 'population', sort: 'ASC' });
  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={
          ({ target: { value } }) => setStateFilter({ ...stateFilter, column: value })
        }
      >
        { categorieSort
          .map((cada) => <option key={ cada } value={ cada }>{ cada }</option>)}
      </select>
      <div>
        <input
          data-testid="column-sort-input-asc"
          id="asc"
          type="radio"
          value="ASC"
          name="filter"
          onChange={ () => {
            setChecked({ ASC: true, DESC: false });
            setStateFilter({ ...stateFilter, sort: 'ASC' });
          } }
          checked={ check.ASC }
        />
        <label htmlFor="asc">Ascendente</label>
        <input
          data-testid="column-sort-input-desc"
          id="desc"
          type="radio"
          value="DESC"
          name="filter"
          onChange={ () => {
            setChecked({ ASC: false, DESC: true });
            setStateFilter({ ...stateFilter, sort: 'DESC' });
          } }
          checked={ check.DESC }
        />
        <label htmlFor="desc">Descendente</label>
      </div>
      <button
        data-testid="column-sort-button"
        onClick={ () => setOrder(stateFilter) }
      >
        Pesquisa
      </button>
    </div>
  );
}
