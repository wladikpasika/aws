(function(){
    document.querySelector('#login-form button').addEventListener('click',function(e){
        e.preventDefault(); console.log('перехватили');
// 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/users/login', false);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

// 3. Отсылаем запрос
        xhr.send(JSON.stringify(
            {
                name:document.querySelector('#login-form .name').value,
                password:document.querySelector('#login-form .password').value,

            }));

// 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status !== 200) {
            // обработать ошибку
            if(xhr.responseText==='user not found')
            {alert('Вы ввели неправильный логин или пароль, попробуйте снова')}
            else{alert('Неизвестная ошибка авторизации')};
        } else {

        let user = JSON.parse(xhr.responseText);
        window.location =`/users/main/${user.name+'-'+user.id}`;
        }
    })})();