import { useContext } from 'react';
import ApiContext from '../context/ApiContext';

export default function Filter() {
  const { setNameFilter, nameFilter } = useContext(ApiContext);
  const onChange = ({ target }) => {
    setNameFilter(target.value);
  };
  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Nome do planeta"
        value={ nameFilter }
        onChange={ onChange }
      />
    </form>
  );
}
