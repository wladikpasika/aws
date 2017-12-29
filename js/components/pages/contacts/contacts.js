import template from "../../../../build/html/contacts/contacts.html"

export default{
    template,
    data(){
        return{
            googleMapsLoad:false,

        }
    },
    mounted(){

        return setTimeout(()=>{return this.DOMContentLoaded()},6000);

    },
    methods:{

        DOMContentLoaded(){
            return this.googleMapsLoad = true;

        },
        overlayDisplay(){
            return this.$store.dispatch('OVERLAY_GET').then(()=>{this.thanksBlock = false})
        },

    }
}
