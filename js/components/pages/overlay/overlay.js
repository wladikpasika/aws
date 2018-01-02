import template from "../../../../build/html/overlay/overlay.html"
import Vue from 'vue'

export default{
    template,
    data(){
      return{
          emailData:{
              name:'',
              number:'',
          },
          thanksBlock:false,
          sendFlag:false,
          successSend:true
      }
    },
    methods:{

    overlayDisplay(){
        return this.$store.dispatch('OVERLAY_GET').then(()=>{this.thanksBlock = false})},

    sendEmail(e){

        e.preventDefault();

        if(this.emailData.name.length<2||this.emailData.number.length<=4){
            return alert('Вы неправильно заполнили форму, попробуйте еще раз')}
        else{
            this.sendFlag = true;
            Vue.http.post('email-message', {
                name:this.emailData.name,
                phoneEmail:this.emailData.number
            }).then(
                (success)=>{
                    this.sendFlag = false;
                }, (err)=>{
                    this.sendFlag = false;
                    this.successSend = false;
            });

            this.emailData.name = '';
            this.emailData.number = '';
            return this.thanksBlock = true}
    }
    }
}