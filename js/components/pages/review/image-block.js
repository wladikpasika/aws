import template from "../../../../build/html/reviews/image-block.html"

export default {
    props:['review'],
    template,

    computed:{
        imageHeight(){
            return this.$store.state.widthScreen>=980?this.$store.getters.widthReview*0.48/1.8*1.5:this.$store.getters.widthReview/1.8*1.5;
        }
    }
}