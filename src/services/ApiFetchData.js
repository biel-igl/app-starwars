const ApiFetchData = async () => {
  const url = 'https://swapi.dev/api/planets/';
  const response = await fetch(url);
  const json = await response.json();
  const deleteResidents = json.results.map((result) => {
    delete result.residents;
    return result;
  });
  return deleteResidents;
};
export default ApiFetchData;
