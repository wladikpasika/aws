import template from "../../../../build/html/overlay/overlay.html"

export default{
    template,
    data(){
      return{
          emailData:{
              name:'',
              number:''
          },
          thanksBlock:false,
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
            return this.thanksBlock = true}}
    }
}