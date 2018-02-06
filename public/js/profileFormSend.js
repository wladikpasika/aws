(function(){
    document.querySelector('#btn-img').style.display = 'none';
    document.querySelector('#img-input').addEventListener('change',function(e){
       // document.querySelector('.load').style.display = 'block';
        e.preventDefault();
// 1. Создаём новый объект XMLHttpReq
        var file = document.querySelector('#img-input').files[0];

        if (!file || !file.type.match(/image.*/)) return alert('Ошибка: Вы не выбрали файл или пытаетесь загрузить не изображение');

        var formData = new FormData();
        formData.append("myImage", file);

        var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/users/main/upload', false);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

// 3. Отсылаем запрос
        console.log(formData);
        xhr.send(formData);

// 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // пример вывода: 404: Not Found
            switch(xhr.responseText)
            {
                case "File don't upload to DB":
                    alert(xhr.responseText);
                    break;
                default:
                    alert("Неизвестная ошибка");
            }

        } else {
            if(document.querySelector('.about img')){
                document.querySelector('.about img').remove();
            }

            //document.querySelector('.load').style.display = 'block';

            document.querySelector('.about').innerHTML = `<img src='/${xhr.responseText}'>`;

            // вывести результат
           // return location.reload();
              // responseText -- текст ответа.
        }
    })})();