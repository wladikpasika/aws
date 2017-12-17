import template from "../../../../build/html/navigation/navigation.html"

export default {
    template,
    data(){
        return {
            mobMenuActive: false,
            menuFlag:0,
            sticking:false,
        }
    },
    created(){
        window.addEventListener('scroll', ()=>{
            return this.menuSticking();
        })
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
        },
        menuSticking(){

            if (this.$store.state.widthScreen >= 980) {

                if (!this.sticking) {

                    if (window.pageYOffset >= window.innerHeight - (this.$store.getters.fontSize* 9.2) - 5) {
                        this.sticking = true;
                    }
                }
                else {

                    if (window.pageYOffset < window.innerHeight - (this.$store.getters.fontSize * 9.2) - 5){
                        this.sticking = false;
                    }

                }
            }

        }
    }

}