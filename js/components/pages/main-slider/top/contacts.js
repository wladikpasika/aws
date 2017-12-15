import template from '../../../../../build/html/main-slider/top/contacts.html'

export default {
    data(){
        return{
            listCount:0,
            flag: false
        }
    },
    template:template,
    computed:{

        dropListIcon(){
            return {
                'fa': true,
                'fa-angle-down':true,
                'active':this.flag
            }
        }
    },
    methods: {

        dropList(){
            this.listCount++;

            if(this.listCount%2){
                this.flag = true;
            }
            else{
                this.flag = false;
            }
        }

    }
}