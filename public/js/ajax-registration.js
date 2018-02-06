(function(){
    document.querySelector('#register-form button').addEventListener('click',function(e){
        e.preventDefault();
// 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/users/register', false);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

// 3. Отсылаем запрос
        xhr.send(JSON.stringify(
            {
                name:document.querySelector('#register-form .name').value,
                email:document.querySelector('#register-form .email').value,
                password:document.querySelector('#register-form .password').value,
                password2:document.querySelector('#register-form .re-password').value,
            }));

// 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            switch (xhr.responseText){
                case 'name must be unique':
                    alert('Пользователь с таким ником уже существует, введите другое');
                    break;
                case 'email must be unique':
                    alert('Пользователь с таким email уже существует, введите другой');
                break;

                case 'incorrect password':
                    alert('Вы неправильно повторно ввели пароль, попробуйте снова');
                    break;

                default:
                    alert('Ошибка заполнения формы, обязательно укажите логин и email');
            }

        } else {
            // вывести результат
            window.location = '/users/login'  // responseText -- текст ответа.
        }
    })})();