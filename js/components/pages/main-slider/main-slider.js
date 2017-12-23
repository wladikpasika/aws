import template from '../../../../build/html/main-slider/main-slider.html'
import navigation from './navigation'
import top from './top.js'
import transform from '../../../helpers/transform'
import TouchEvent from '../../../helpers/touchEvent'

export default {

    template,

    data(){

      return {
          clickCount: 0,
          module: 0,
          timer: false,
          slidersCount:0
      }
          },

    mounted(){

        this.setTimer();
        setTimeout(()=>{return this.touchEvent()},1000)
    },

    computed: {

        widthSlider(){

            return this.$store.state.widthScreen+'px';
        },

        moduleOfCount(){

            this.module = Math.abs(this.clickCount % this.$store.getters.mainSlidersCount);
            this.slidersCount = this.$store.state.mainSliders.length;
            return this.module
        },///!!! переписать методом!!! Важно

        widthSlidersBlock(){

            return transform(this.$store.state.widthScreen, this.moduleOfCount,
                this.$store.getters.mainSlidersCount)

        },
        heightScreen(){
            return {height:this.$store.getters.heightMainSlider+'px'};
        }
    },
    components: {
        top,
        navigation
    },

    methods: {

        increment(){

            this.timer = true;
            return this.clickCount+= 1;

        },
        decrement(){

            this.timer = true;
            return this.clickCount-= 1

        },
        dotChangeCount(e){
            this.timer = true;
            return this.clickCount = +(e.target.attributes[0].value - 1)
        },

        bind(func, context) {return function() {

            return func.apply(context, arguments)}
                //жестко присваиваем контекст для функции settimeout
            },
        setTimer(){
           return setTimeout(this.bind(function(){

               if(!this.timer){

                  this.clickCount +=1;

                   return this.setTimer();
               }

            },this), 4000);
        },
        touchEvent(){

            TouchEvent.prototype = this;
            let constr = new TouchEvent('.main-slider',this.$store.state.widthScreen);

            return constr.main()

        }

    },
    watch:{

        module(){

            if(this.module >= 0){
                for(let a = 0; a < this.$store.getters.mainSlidersCount; a++){

                    document.querySelectorAll('.owl-dot')[a].setAttribute('class', 'owl-dot')
                }
               return document.querySelectorAll('.owl-dot')[this.module].setAttribute('class', 'owl-dot active')
            }
        }

    }

}