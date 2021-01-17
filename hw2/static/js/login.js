console.log('document.cookie', document.cookie);
let cookieValue = document.cookie.replace(
  /(?:(?:^|.*;\s*)isAuth\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);

console.log('document.cookie', cookieValue);

let form = document.querySelector('.form');

if (cookieValue === 'no') {
  form.insertAdjacentHTML(
    'beforeend',
    `<p class="bad-login"> * Не правильно введет логин или пароль </p>`
  );
}
