const projectSection = document.querySelector('#project');

fetch('https://api.github.com/users/DmitrijevK/repos')
.then(res => res.json())
.then(repos => {
repos.forEach(repo => {
const card = document.createElement('div');
card.className = 'card';
  const cardHeader = document.createElement('header');
  cardHeader.className = '.card';
  cardHeader.innerHTML = `<p class="card-header-title">
    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
  </p>`;
  card.appendChild(cardHeader);

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.innerHTML = `<div class="content">
    ${repo.description || ''}
  </div>`;
  card.appendChild(cardContent);

  projectSection.appendChild(card);
});
})
.catch(error => console.error(error));
