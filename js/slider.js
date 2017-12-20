/*глобальные переменные*/
var heightPixel;
var widthPixel;//ширина экрана
var widthRow;// ширина блока row, родителя элементов для вротой карусели
var widthReview;
var slidecount = document.querySelectorAll(".owl-item").length;//считаем количество слайдов
var countOfElement = document.querySelectorAll(".col-sm-4").length;//считаем количество блоков услуг
var slidecount3 = document.querySelectorAll(".slide-review").length; //считаем количество блоков с отзывами
var slidecount4 = document.querySelectorAll(".carousel-about").length;
var clickonslider = false;
var slideNumber = 0;
var slideNumber2 = 0;
var slideNumber3 = 0;//счетчик для кликов по элементам навигации для третьей карусели
var slideNumber4 = 0;
var slidemodule = 0;
var slidemodule2 = 0;
var slidemodule3 = 0;
var slidemodule4 = 0;
var droplistSymbol = 0;
var clickOnMobileMenu = 0;
var started = false;
var detecting = false;
var touch;
var delta;
var left;
var right;
var fontWidth;
var videoHeight;
var x;
var y;

/*функция для смены атрибутов слайда */
function translate3d(slidemodule) {

    return document.querySelector(".owl-stage").style.transform = "translate3d(" + (-slidemodule * widthPixel) + "px, 0px, 0px)";
};


function clickonSlider() {
    document.querySelector(".owl-next").addEventListener("click", function () {
        clickonslider = true;
        slideNumber++;
        slidemodule = Math.abs(slideNumber) % slidecount;
        /*меняем положение слайда*/
        translate3d(slidemodule);
    });
    /*смена слайда по клику влево*/
    document.querySelector(".owl-prev").addEventListener("click", function () {
        clickonslider = true;
        slideNumber--;
        slidemodule = Math.abs(slideNumber) % slidecount;
        /*меняем положение слайда*/
        translate3d(slidemodule);
    });
////////////////////
    /*функция таймера для слайдера*/
    function slideMove() {
        var timerforClick = 4000;
        (function timer() {
            if (clickonslider === true) {
                return
            }
            setTimeout(function () {

                if (clickonslider === true) {
                    return
                }
                else {
                    slideNumber++;
                    slidemodule = slideNumber % slidecount;
                    translate3d(slidemodule);
                    timer();
                }

            }, timerforClick)
        })();
    }

    /*запускаем функцию таймера для слайдера, когда сайт загружен*/
    document.addEventListener("DOMContentLoaded", slideMove());

    /*смена слайда по клику на кружочки*/
    (function () {
        /*клик на слайдер*/
        for (var a = 0; a < slidecount; a++) {
            document.querySelectorAll(".owl-dot")[a].addEventListener('click', function (e) {
                clickonslider = true;
                slideNumber = +e.target.attributes[0].value;
                slidemodule = Math.abs(slideNumber) % slidecount;
                //меняем положение слайда
                translate3d(slidemodule)
            })
        }
    })();
}

/*получаем высоту экрана, ставим размер блоков*/
function sises() {

    /*получаем ширину экрана, задаем ширину слайдам, вычисляем ширину родительского блока для слайдов*/
    (function () {
        widthPixel = screen.width;
        var availWidth =  Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (widthPixel != availWidth) {
            widthPixel = availWidth
        }

        for (var a = 0, b = slidecount; a < b; a++) {

            document.querySelectorAll(".owl-item")[a].style.width = widthPixel + "px";
        }
        var t = document.querySelector(".owl-stage").style;
        t.width = widthPixel * a + "px";
    })();

    (function () {
        heightPixel = document.documentElement.clientHeight;
        if (widthPixel >= 980) {
            heightPixel = document.documentElement.clientHeight;
            //ставим высоту блоков sections если ширина экрана больше 980 px
            for(var a = 0, b = document.querySelectorAll('.section').length; a<b; a++){document.querySelectorAll('.section')[a].setAttribute('style', 'height:'+heightPixel+'px')}
            for (var a = 0, b = document.querySelectorAll(".fp-tableCell").length; a < b; a++) {
                document.querySelectorAll(".fp-tableCell")[a].style.height = heightPixel + "px";
            }
        }
        //если ширина экрана меньше 980 px очищаем стили, который устанавливает высоту
        else {
            imagecalculate();
        }
        ;
    })();
    /*меняем размер шрифта*/
    if (widthPixel >= 980) {
        fontWidth = String(widthPixel / 1600 * 10);
        document.querySelector("html").style.fontSize = fontWidth + 'px'
    }
    else {
        fontWidth = 7.5;
        document.querySelector("html").style.fontSize = fontWidth + 'px'
    }
    /*устанавливаем размеры нижней карусели*/

    (function(){
        if(widthPixel >= 980){
        for(var a=0, b = document.querySelectorAll('.clients').length; a<b;a++){
            document.querySelectorAll('.clients')[a].setAttribute('style', 'height:'+screen.availHeight*0.45+'px')}}
        else{return}
    })();//считаем размеры блока фоток клиентов
}

/*инициализация функции sizes*/
function imagecalculate() {
    var massValue;
    var massValuedown;
    /*
              */
    if (widthPixel <= 980 && widthPixel >= 500) {
        document.querySelectorAll(".fp-tableCell")[0].setAttribute('style', 'height:' + (widthPixel / 8) * 4 + 'px');

    }
    else if (widthPixel < 500) {
        document.querySelectorAll(".fp-tableCell")[0].setAttribute('style', 'height:' + 288 + 'px');
    }
}

sises();

/*создаем точки навигации*/
(function () {
    for (var a = 0; a < slidecount; a++) {
        var div = document.createElement('div');
        var text = "<span></span>";
        /*первая точка будет выбрана по умолчанию после загрузки*/
        div.setAttribute("data-item", a);
        if (a == 0) {
            div.className = "owl-dot active"
        }
        else {
            div.className = "owl-dot"
        }
        document.querySelector(".owl-dots").appendChild(div)
    }
    /*проверяем добавились ли точки*/
    if (document.querySelector(".owl-dots") != null) {
        /*если добавились, то вешаем обработчик событий, который реагирует на смену атрибута*/
        (function () {
            var target = document.querySelector('.owl-stage');
            var observer = new MutationObserver(function (mutations) {

                for (var a = 0; a < slidecount; a++) {
                    if (document.querySelectorAll(".owl-dot")[a].className == "owl-dot active") {
                        document.querySelectorAll(".owl-dot")[a].className = "owl-dot"
                    }
                }
                /*кроме точки под номером, который соответствует номеру слайда*/
                //чтобы избежать ошибок, отложим выполнение классов на 0,1 с
                setTimeout(function () {
                    document.querySelectorAll(".owl-dot")[+slidemodule].className = "owl-dot active"
                }, 100);
                /*если сменился слайд, все точки приводим к одному классу*/
            });
            var config = {attributes: true, attributeOldValue: true};
            observer.observe(target, config);
        })();
        clickonSlider();
    }
})();


/*прослушивание кликов по стрелке вниз на списке телефонов*/
(function () {
    var adress = document.querySelectorAll(".phonesOnSlider");
    var adressList = document.querySelectorAll(".droplistOnSlider");
    for (var a = 0; a < slidecount; a++) {
        document.querySelectorAll(".phonesOnSlider")[a].addEventListener('click', function (e) {
            droplistSymbol++;
            clickonslider = true;
            if (droplistSymbol % 2 != 0) {

                for (var b = 0; b < slidecount; b++) {
                    adress[b].innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>';
                    adressList[b].style.display = "block";
                }
            }
            else {

                for (var b = 0; b < slidecount; b++) {
                    adress[b].innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
                    adressList[b].style.display = "none";
                }
            }
        })
    }
})();

/* механика работы мобильное меню по клику*/
(function () {
    function menuActive(){
        if (clickOnMobileMenu % 2 != 1) {
            document.querySelector('.mob-menu').setAttribute('class', 'mob-menu active');
            document.querySelector('.header').setAttribute('class', 'header active');
            document.querySelector('.menu').setAttribute('class', 'menu active');
        }
        else {
            document.querySelector('.mob-menu').setAttribute('class', 'mob-menu');
            document.querySelector('.header').setAttribute('class', 'header');
            document.querySelector('.menu').setAttribute('class', 'menu');
        };
        clickOnMobileMenu++;
        ///клик по ссылке мобильного меню должно прятать его
    }

    if(widthPixel<980){
        for(var a = 0, b = document.querySelectorAll('.menu a').length; a<b; a++){
            document.querySelectorAll('.menu a')[a].addEventListener('click', function() {
                menuActive()
            }
            )}
        document.querySelector('.mob-menu').addEventListener('click', function () {
            menuActive()
        });
    }

})();

window.addEventListener("resize", function () {return sises()
});
document.addEventListener("DOMContentLoaded", imagecalculate());
// после загрузки страницы
