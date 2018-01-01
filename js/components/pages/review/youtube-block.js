import template from "../../../../build/html/reviews/youtube-block.html"

export default {
    props:['review'],
    template,
    data(){
        return {youTybeLoad:false}
    },
    mounted(){

        return setTimeout(()=>{return this.DOMContentLoaded()},4000);

    },

    computed:{
        videoHeight(){
            return this.$store.state.widthScreen>=980?this.$store.getters.widthReview*0.48/1.8:this.$store.getters.widthReview/1.8;
        }
    },
    methods:{
        DOMContentLoaded(){

            return this.youTybeLoad = true;

        }
    }
}