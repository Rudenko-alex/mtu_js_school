let form = document.querySelector('.login');

function removeError() {
  /*-если есть значение о ошибке-*/
  if (Boolean(document.querySelector('.bad-login'))) {
    document.querySelector('.bad-login').remove();
  }
}

form.login.onfocus = removeError;
form.password.onfocus = removeError;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let sendData = {
    login: data.get('login'),
    password: data.get('password'),
  };
  await fetch('http://localhost:3000/api/login/', {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 401) {
        form.insertAdjacentHTML(
          'beforeend',
          `<p class="bad-login"> * Не правильно введет логин или пароль </p>`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
