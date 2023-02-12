const projectSection = document.querySelector('#project');

fetch('https://api.github.com/users/DmitrijevK/repos')
  .then(res => res.json())
  .then(repos => {
    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'card';

      const cardHeader = document.createElement('header');
      cardHeader.className = 'card-header';
      cardHeader.innerHTML = `
        <p class="card-header-title">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </p>
      `;
      card.appendChild(cardHeader);
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.innerHTML = `
        <div class="content">
          <span class="icon2">
            <i class="fa fa-star"></i>
            ${repo.stargazers_count}
          </span>
          <span class="icon2">
            <i class="fa fa-eye"></i>
            ${repo.watchers_count}
          </span>
          <p class="date">Create Date: ${repo.created_at}</p>
          <p class="date">Last Activity Date: ${repo.updated_at}</p>
        </div>
      `;
      card.appendChild(cardContent);

      projectSection.appendChild(card);
    });
  });
