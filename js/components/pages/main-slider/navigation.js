import template from '../../../../build/html/main-slider/navigation.html'

export default {

    props:['clickCountMainSlider'],
    template,

    methods:{
        increment(){
             this.$emit('increment');

        },

        decrement(){
             this.$emit('decrement');

        }
    }
}