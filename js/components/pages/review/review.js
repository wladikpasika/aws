import template from "../../../../build/html/reviews/reviews.html"
import youtubeBlock from "./youtube-block.js"
import imageBlock from "./image-block.js"
import transform from '../../../helpers/transform'
import TouchEvent from '../../../helpers/touchEvent'

export default {
    template,
    data(){

        return{
            clickCount: 0,
            module: 0,
            slidersCount:0
        }
    },
    created(){

        this.moduleListen;
        this.count;

    },
    mounted(){

        setTimeout(()=>{return this.touchEvent()},1000)
    },
    computed:{

        count(){
          return   this.slidersCount = this.$store.getters.countReviewSliders;
        },

        moduleListen(){
            let a;
            this.module!==0&&this.slidersCount!==0?a=Math.abs(this.clickCount % this.slidersCount):a=this.clickCount % this.slidersCount;
            return this.module = Math.abs(this.clickCount % this.slidersCount);
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
            console.log(this.clickCount,this.module);

            return;

        },
        decrement(){
            console.log('дикремент');

            return this.clickCount-= 1

        },
        touchEvent(){

            TouchEvent.prototype = this;
            console.log(this.$store.getters.widthReview, 'геттер');
            let constr = new TouchEvent('.review-slider', this.$store.getters.widthReview);

            return constr.main()

        },

        moduleCheck(clickCount,slidersCount){

            return this.module = Math.abs(clickCount % slidersCount);
        }

    }
}