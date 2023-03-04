import Filter from '../components/Filter';
import FilterNumber from '../components/FilterNumbers';
import FilterSort from '../components/FilterSort';
import Table from '../components/Table';

function Home() {
  return (
    <div>
      <Filter />
      <FilterNumber />
      <FilterSort />
      <Table />
    </div>
  );
}
export default Home;
