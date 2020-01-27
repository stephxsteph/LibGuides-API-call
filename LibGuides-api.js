const apiEndpoint = 'https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6';

const guides = [];

fetch(apiEndpoint)
  .then(allGuides => allGuides.json())
  .then(data => guides.push(...data))

function findGuides(searchText, guides) {
  return guides.filter(titles => {
    const searchTextExp = new RegExp(searchText, 'gi');
    return titles.name.match(searchTextExp)
  });
}

function showGuides() {
  const guideTitle = findGuides(this.value, guides);
  const typedSearch = guideTitle.map(titles => {
    const regularEx = new RegExp(this.value, 'gi');
    const nameTitle = titles.name.replace(regularEx, `<span class="highlight">${this.value}</span>`);
    return `
      <li>
        <span class="name">${nameTitle}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = typedSearch;
}

const inputField = document.querySelector('.searchguides');
const suggestions = document.querySelector('.suggestions');

inputField.addEventListener('change', showGuides);
inputField.addEventListener('keyup', showGuides);
