// Fetch information about the GitHub user's repositories
async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await response.json();
  return repos;
}

// Create a card for each repository
function createRepoCards(repos) {
  const section = document.createElement('section');
  section.classList.add('repo-section');

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.classList.add('repo-card');

    const name = document.createElement('h2');
    name.textContent = repo.name;

    const description = document.createElement('p');
    description.textContent = repo.description || 'No description provided.';

    const button = document.createElement('a');
    button.textContent = 'View Repository';
    button.href = repo.html_url;
    button.target = '_blank';

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(button);

    section.appendChild(card);
  });

  return section;
}

// Display the repository cards on the page
async function displayRepos(username) {
  const repos = await getRepos(username);
  const repoCards = createRepoCards(repos);
  document.body.appendChild(repoCards);
}

// Call the displayRepos function with the GitHub username
displayRepos('GitHubUsername');
