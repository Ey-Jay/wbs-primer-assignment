const usernameSpot = document.getElementById('username-spot');
const newPostButton = document.getElementById('new-post');
const addPostModal = document.querySelector('.add-post__modal');
const backdrop = document.querySelector('.backdrop');
const cancelButton = document.getElementById('cancel-button');
const postButton = document.getElementById('post-button');
const userPostInputs = addPostModal.querySelectorAll('input');
const userPostText = addPostModal.querySelector('textarea');
const recentPostsSection = document.querySelector('.my-recent-posts');
const recentPostsContainer = document.querySelector('.recent-posts__container');
const postCount = document.getElementById('amount-posts');

usernameSpot.textContent = localStorage.getItem('username') || "User";

const posts = JSON.parse(localStorage.getItem('posts')) != null ? JSON.parse(localStorage.getItem('posts')) : [];
const recentPosts = posts.slice(0, 3);

postCount.textContent = posts.length;

if (!posts.length) {
  recentPostsSection.style.display = 'none';
} else {
  for (let i = 0; i < recentPosts.length; i++) {
    createArticle(recentPosts[i].postTitle, recentPosts[i].postImgUrl, recentPosts[i].postTextContent, 115);
  }
  recentPostsSection.style.display = 'block';
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

cancelButton.addEventListener('click', () => {
  addPostModal.classList.toggle('visible');
  backdrop.style.display = 'none';

  userPostInputs[0].value = '';
  userPostText.value = '';
})

newPostButton.addEventListener('click', () => {
  addPostModal.classList.toggle('visible');
  backdrop.style.display = 'block';
})

backdrop.addEventListener('click', () => {
  addPostModal.classList.toggle('visible');
  backdrop.style.display = 'none';

  userPostInputs[0].value = '';
  userPostText.value = '';
})

postButton.addEventListener('click', () => {

  recentPostsContainer.innerHTML = '';

  let postTitle = userPostInputs[0].value;
  let postImgUrl = userPostInputs[1].value;
  let postTextContent = userPostText.value;

  let post = {
    postTitle,
    postImgUrl,
    postTextContent
  }

  posts.unshift(post);
  localStorage.setItem('posts', JSON.stringify(posts));
  const recentPosts = posts.slice(0, 3);

  postCount.textContent = posts.length;

  userPostInputs[0].value = '';
  userPostText.value = '';

  addPostModal.classList.toggle('visible');
  backdrop.style.display = 'none';

  if (!posts.length) {
    recentPostsSection.style.display = 'none';
  } else {
    for (let i = 0; i < recentPosts.length; i++) {
      createArticle(recentPosts[i].postTitle, recentPosts[i].postImgUrl, recentPosts[i].postTextContent, 115);
    }
    recentPostsSection.style.display = 'block';
  }
})