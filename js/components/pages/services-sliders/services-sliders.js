import template from '../../../../build/html/services-sliders/services-slider.html'
import transform from '../../../helpers/transform'
import TouchEvent from '../../../helpers/touchEvent'

export default {
    template,
    data(){
        return {
            clickCount: 0,
            module: 0,
            slidersCount:0,
            countScreen:0
        }
    },
    created(){

        this.moduleOfCount;
        this.countServicesScreen;
        this.widthSlidersBlock;
    },
    mounted(){
        setTimeout(()=>{return this.touchEvent()},1000)
    },
    computed:{

       /* widthServicesBlock(){

            return {width: this.$store.state.widthScreen>700?this.$store.getters.widthServicesBlock+'px':'auto'}
        },*/
        widthServicesCard(){
          return {width: this.$store.getters.widthServicesCard+'px'}
        },

        moduleOfCount(){

            this.module = Math.abs(this.clickCount % this.$store.getters.countServicesScreen);
            this.slidersCount = this.$store.state.servicesSliders.length;
            return this.module
        },
        widthSlidersBlock(){

            return transform(this.$store.state.widthScreen>700?this.$store.getters.widthServicesScreen:'auto',
                this.moduleOfCount, this.slidersCount)
        },
        countServicesScreen(){

            return this.countScreen = this.$store.getters.countServicesScreen;
        }
    },
    methods:{

        vShowClickOnButton(e){
                e.preventDefault();
                return e.target.parentNode.parentNode.parentNode.nextElementSibling.style.display='block'

        },
        vShowClickOnClose(e){
            e.preventDefault();
            e.target.parentNode.style.display='none';

        },
        touchEvent(){

            TouchEvent.prototype = this;
            let constr = new TouchEvent('.row', this.$store.getters.widthServicesScreen);

            return constr.main()

        }
    }
}