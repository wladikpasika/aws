import template from "../../../../build/html/navigation/navigation.html"

export default {
    template,
    data(){
        return {
            mobMenuActive: false,
            menuFlag:0
        }
    },
    computed:{


    },
    methods:{
        mobMenuCheck(){
            this.menuFlag +=1;

            if(this.menuFlag%2===1){
                return this.mobMenuActive = true;
            }
            else{
                return this.mobMenuActive = false
            }
        },
        overlayDisplay(){

            return this.$store.dispatch('OVERLAY_GET').then(()=>{return this.mobMenuCheck()});
        }
    }

}