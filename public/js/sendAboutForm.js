(function(){
    document.querySelector('#about-botton').addEventListener('click',function(e){
        e.preventDefault();
// 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/users/main/update-about', false);

        xhr.setRequestHeader('Content-Type', 'application/json');

// 3. Отсылаем запрос
        xhr.send(JSON.stringify(
            {
                first_name:document.querySelector('#first-name').value,
                last_name:document.querySelector('#last-name').value,
                about:document.querySelector('#comment').value

            }));

// 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
            alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
        } else {
            // вывести результат
            document.location.reload(true);
        }
    })})();