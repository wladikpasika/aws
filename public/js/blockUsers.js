(function(){
    "use strict";
    for (var a = 0, b=document.querySelectorAll("span[data]").length; a<b; a++){
        document.querySelectorAll("span[data]")[a].addEventListener('click', function(e){

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/users/main/delete/${e.target.getAttribute('data')}`, false);
            xhr.send();
            if (xhr.status != 200) {
                return alert(xhr.responseText)
            }
            return location.reload();
        })
    }
})();
(function(){
    "use strict";
    for (var a = 0, b=document.querySelectorAll("span[allow]").length; a<b; a++){
        document.querySelectorAll("span[allow]")[a].addEventListener('click', function(e){

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/users/main/allow/${e.target.getAttribute('allow')}`, false);
            xhr.send();
            if (xhr.status != 200) {
                return alert(xhr.responseText)
            }
            return location.reload();
        })
    }
})();


