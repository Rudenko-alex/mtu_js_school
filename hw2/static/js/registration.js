'use strict';
let eye = document.querySelector('.eye');
let eyeSlash = document.querySelector('.eyeSlash');
let pass = document.querySelector('.pass');
let rePass = document.querySelector('.re-pass');
let btn = document.querySelector('.btn');
let form = document.querySelector('.registration-form');
/*-прослушивание поля пароль-*/
eye.addEventListener('click', () => {
  change(pass, eye);
});
/*-Прослушивание поля повтора пароля-*/
eyeSlash.addEventListener('click', () => {
  change(rePass, eyeSlash);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(registr);
  let sendData = {
    login: data.get('login'),
    name: data.get('name'),
    password: data.get('password'),
  };
  compare(pass.value, rePass.value, sendData);
});

pass.onfocus = removeError; /*-Удаляем сообщение об ошибке при наведении фокуса на пассворд-*/
rePass.onfocus = removeError; /*-Удаляем сообщение об ошибке при наведении фокуса на ре-пассворд-*/
form.login.onfocus = removeError;

function removeError() {
  /*-если есть значение о ошибке-*/
  if (Boolean(document.querySelector('.err'))) {
    document.querySelector('.err').remove();
  }
}

function change(pass, eye) {
  /*- Смена иконки и типа-*/
  if (pass.type == 'text') {
    pass.type = 'password';
  } else {
    pass.type = 'text';
  }
  eye.classList.toggle('fa-eye-slash');
  eye.classList.toggle('fa-eye');
}

async function compare(value1, value2, sendData) {
  /*-сравнение-*/
  if (value1 === value2 && value1 !== '') {
    await fetch('http://localhost:3000/api/login/register', {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 409) {
          document
            .querySelector('.re-pass-label')
            .insertAdjacentHTML(
              'beforeend',
              `<span class="err" style="display:block; color:red">Такой логин уже занят</span>`
            );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!document.querySelector('.err')) {
    document
      .querySelector('.re-pass-label')
      .insertAdjacentHTML(
        'beforeend',
        `<span class="err" style="display:block; color:red">Нужно ввести одинаковые значения </span>`
      );
  }
}
