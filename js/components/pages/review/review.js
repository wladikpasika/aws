import template from "../../../../build/html/reviews/reviews.html"
import youtubeBlock from "./youtube-block.js"
import imageBlock from "./image-block.js"
import transform from '../../../helpers/transform'
import TouchEvent from '../../../helpers/touchEvent'

export default {
    template,
    data(){

        return {
            clickCount: 0,
            module: 0,
            slidersCount:0,
        }
    },

    mounted(){

        setTimeout(()=>{return this.touchEvent()},1000)
    },
    computed:{

        count(){
          return   this.slidersCount = this.$store.state.reviews.length;
        },

        moduleListen(){
            this.count;
            /*this.module = this.clickCount%this.slidersCount;
            return this.clickCount%this.slidersCount;*/

            this.clickCount<0?this.module = (this.slidersCount - Math.abs(this.clickCount%this.slidersCount))%this.slidersCount:this.module = this.clickCount%this.slidersCount;
            return this.module;
        },

        widthTransform(){
            return transform(this.$store.getters.widthReview,this.module, this.slidersCount)

        },

    },
    components:{
        'youtube':youtubeBlock,
        'images':imageBlock

    },
    methods: {

        increment(){
            this.clickCount+= 1;

        },
        decrement(){

            this.clickCount-= 1;
        },
        touchEvent(){

            TouchEvent.prototype = this;
            let constr = new TouchEvent('.review-slider', this.$store.getters.widthReview);

            return constr.main()

        }

    }
}