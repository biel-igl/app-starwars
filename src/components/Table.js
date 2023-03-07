import { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Table() {
  const { results, loading } = useContext(ApiContext);
  return (loading ? ('Carregando...') : (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {results
            .map((cada) => (
              <tr key={ cada.name }>
                <td data-testid="planet-name">
                  { cada.name }
                </td>
                <td>
                  { cada.rotation_period }
                </td>
                <td>
                  { cada.orbital_period }
                </td>
                <td>
                  { cada.diameter }
                </td>
                <td>
                  { cada.climate }
                </td>
                <td>
                  { cada.gravity }
                </td>
                <td>
                  { cada.terrain }
                </td>
                <td>
                  { cada.surface_water }
                </td>
                <td>
                  { cada.population }
                </td>
                <td>
                  { cada.films }
                </td>
                <td>
                  { cada.created }
                </td>
                <td>
                  { cada.edited }
                </td>
                <td>
                  { cada.url }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>)
  );
}
export default Table;
