// based on improved Fisher-Yates shuffle
// credit: https://bost.ocks.org/mike/shuffle/
export function shuffleArray(array) {
  let high = array.length;
  let randomElement;
  let temp;

  while (high) {
    // pick a random element and swap
    randomElement = Math.floor(Math.random() * high--);

    temp = array[high];
    array[high] = array[randomElement];
    array[randomElement] = temp;
  }

  return array;
}
