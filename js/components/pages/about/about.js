import template from "../../../../build/html/about/about.html"
import transform from '../../../helpers/transform'
import TouchEvent from '../../../helpers/touchEvent'

export default {
    template,
    data(){

        return {
            clickCount: 0,
            module: 0,
            aboutInfo:[],
            countScreen:0
        }
    },

    computed:{

        widthTransform(){
            console.log(this.$store.state.widthScreen, this.module, this.$store.state.about.length);
            return transform(this.$store.state.widthScreen, this.module, this.$store.state.about.length)

        },
        aboutGet(){
            this.aboutInfo = this.$store.state.about;
            return this.$store.state.about.length>0?true:false
        }
    },
    mounted(){

        setTimeout(()=>{return this.touchEvent()},1000)
    },
    methods:{
        increment(){
            this.clickCount+= 1;

        },
        decrement(){

            this.clickCount-= 1;
        },
        touchEvent(){

            TouchEvent.prototype = this;
            let constr = new TouchEvent('.about-us-carousel', this.$store.state.widthScreen);

            return constr.main()

        }
    },
    watch:{
        clickCount(){
           return  this.module = Math.abs(this.clickCount%this.aboutInfo.length);
        },
        aboutInfo(){
            return this.countScreen =  this.aboutInfo.length;
        }
    }

}