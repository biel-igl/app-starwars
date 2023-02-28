export const getPlanets = async () => {
  const request = await fetch('https://swapi.dev/api/planets');
  const data = await request.json();
  return data;
};

console.log(getPlanets);
