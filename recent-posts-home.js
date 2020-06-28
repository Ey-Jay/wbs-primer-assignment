const recentPostsSectionHome = document.querySelector('.recent-posts');
const recentPostsContainer = document.querySelector('.recent-posts__container');

const posts = JSON.parse(localStorage.getItem('posts')) != null ? JSON.parse(localStorage.getItem('posts')) : [];
const recentPosts = posts.slice(0, 3);

if (!posts.length) {
  recentPostsSectionHome.style.display = 'none';
} else {
  for (let i = 0; i < recentPosts.length; i++) {
    createArticle(recentPosts[i].postTitle, recentPosts[i].postImgUrl, recentPosts[i].postTextContent, 115);
  }
  recentPostsSectionHome.style.display = 'block';
}

function createArticle(title, imageUrl, excerpt, excerptLength) {
  let trimmedExcerpt;
  if (excerpt.length <= excerptLength) {
    trimmedExcerpt = `${excerpt}...`;
  } else {
    trimmedExcerpt = `${excerpt.slice(0, excerptLength)}...`
  }

  const newPost = document.createElement('article');
  newPost.innerHTML =
    `<div class="post-card">
      <a href="#">
        <div class="card-image" style="background:url('${imageUrl}') no-repeat; height: 200px; background-size: 100% auto;"></div>
        <h2 class="card-title">${title}</h2>
        <p class="card-excerpt">${trimmedExcerpt}</p>
      </a>
    </div>`;

  recentPostsContainer.appendChild(newPost);
}