const colorsList = document.querySelector('#colors');
const input = document.querySelector('input[type="text"]');
const colors = document.querySelectorAll('li');
const clearButton = document.querySelector('#clear-button');

const sortAlphabetically = arr => arr.sort((a, b) => a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase() ? -1 : 0)

input.addEventListener('input', e => {
  const colorsArray = [...colors];
  const bestMatches = [];
  const filteredColors = colorsArray.filter((li) => {
    const { innerHTML } = li;

    if (innerHTML.toLowerCase().includes(e.target.value.toLowerCase()) || e.target.value.toLowerCase().includes(innerHTML.toLocaleLowerCase())) {
      if (innerHTML.toLocaleLowerCase()[0] === e.target.value.toLocaleLowerCase()[0]) {
        bestMatches.push(li);
        return false;
      };
      return true;
    };
  });

  sortAlphabetically(bestMatches);
  const result = [...bestMatches, ...filteredColors];

  colorsList.innerHTML = '';
  result.forEach(color => {
    colorsList.appendChild(color);

    color.addEventListener('click', e => e.target.style.color = 'green');
  });

  if (e.target.value.length && result.length) {
    document.title = result[0].innerHTML;

    return;
  }
  document.title = 'Search Color';
});

clearButton.addEventListener('click', _ => {
  input.value = '';
  const colorsArray = [...colors];
  
  sortAlphabetically(colorsArray);
  colorsArray.forEach(color => {
    color.style.color = 'black';
    colorsList.appendChild(color)
  });
});
