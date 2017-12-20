import Vue from 'vue'
import template from '../../../build/html/home.html'
import mainSlider from './main-slider/main-slider'
import servicesSliders from './services-sliders/services-sliders'
import navigation from './navigation/navigation'
import overlay from './overlay/overlay'

export default Vue.component('home', {
    template,

    created(){

        if (!this.$store.state.mainSliders.length) {
            //проверяем наличие массива
            this.mainSliderDownload()
        }
        if (!this.$store.state.servicesSliders.length) {
            //проверяем наличие массива
            this.servicesSliders()
        }
        if (!this.$store.state.navMenu.length) {
            //проверяем наличие массива
            this.navMenuDownload()
        }
        this.heightScreen;
       /*вызываем метод, диспетчерезирующий экшн, для измерения высоты экрана*/
       this.screenHeightAction();
       this.screenWidthAction();
       //вызываем метод, проверяющий ширину экрана
        /*при смене размера экрана, повторяем вызов методов, для высоты и ширины экрана*/
       window.addEventListener("resize", ()=>{
           /*используем задержку в 1 секунду, для того, чтобы не загружать браузер большим количеством событий*/
            return setTimeout (()=>{
                this.screenWidthAction();
                this.screenHeightAction();
            },1000);
        });

    },
    computed:{
        heightScreen(){
            return  {'height': this.$store.state.widthScreen>=980?this.$store.state.heightScreen+'px':'auto'}
        }
    },
    methods: {

        mainSliderDownload:function(){

            return this.$store.dispatch('GET_MAIN_SLIDERS');
        },
        navMenuDownload:function(){

            return this.$store.dispatch('GET_NAV_MENU');
        },

        /*диспетчерезируем вызов экшэна, который считает размер экрана*/
        screenWidthAction: function(){

            return this.$store.dispatch('GET_SCREEN_WIDTH').then(
                /*выставляем размер шрифта - достаем с геттера*/
                (response)=>{
                    return document.documentElement.style.fontSize = this.$store.getters.fontSize +'px';
                    },
                (err)=>{
                    console.log('Произошла ошибка при выставлении размера шрифта', err)
                }
            );
        },

        screenHeightAction:function(){
            return this.$store.dispatch('GET_SCREEN_HEIGHT').then((response)=>{
                /*после определения высоты, задаем ее в шаблоне c помощью геттера*/
            },(err)=>{
                console.log("Неудалось получить высоту для главного слайдера");
            });
        },

        servicesSliders:function(){
            return this.$store.dispatch('GET_SERVICES_SLIDERS');
        }

    },
    components: {
        'main-slider': mainSlider,
        'services-slider': servicesSliders,
        'navigation': navigation,
        'overlay': overlay
    }

});