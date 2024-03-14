import { streetDictionary } from "../custom-types/streetConnection";

export function areCitysConnected(
  cityDictionary: streetDictionary,
  currentCity: string,
  searchedCity: string,
  visitedCitys: string[]
) {
  if (currentCity == searchedCity) {
    return true;
  }
  for (let value of cityDictionary[currentCity]) {
    console.log(value);
    if (!visitedCitys.includes(value)) {
      visitedCitys.push(value);
      if (
        areCitysConnected(cityDictionary, value, searchedCity, visitedCitys)
      ) {
        return true;
      }
    }
  }
  return false;
}
