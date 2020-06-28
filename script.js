const mobileNav = document.querySelector('.mobile-burger__nav');
const mobileBurger = document.querySelector('.mobile-burger');
const inputButton = document.getElementById('input-button');
const usernameInput = document.getElementById('input-username');

mobileBurger.addEventListener('click', () => {
  mobileNav.classList.toggle('hide');
})

function transformBurgerToX(el) {
  el.classList.toggle('transform');
}

function login() {
  localStorage.setItem('username', usernameInput.value);
  window.location = './profile.html';
}