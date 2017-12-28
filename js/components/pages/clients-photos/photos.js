import template from "../../../../build/html/photos/photos.html"

export default {
    template,
    data(){
        return{
            height: '',
            photoActive: false,
            photoLoad: false,
            big_photo:''
        }
    },
    computed:{

        resize(){

            this.height = this.$store.state.widthScreen>=980?this.$store.state.availHeightScreen*0.45:'';
            return this.height;
        }
    },
    methods:{
        active(e){
            if(e.target.className==='close-foto'){
                this.photoActive = false;
                this.deleteNode();
            }
            else {
                let a;
                if (this.$store.state.widthScreen < 980) {
                    a = this.$store.state.clientsPhotos.filter((item) => {
                            return item.big_foto === e.target.src.match(/img\/.*$/i)[0] ? item.small_foto : false;
                        }
                    )
                }
                else {
                    a = this.$store.state.clientsPhotos.filter((item) => {
                            return item.big_foto === e.target.firstChild.src.match(/img\/.*$/i)[0] ? item.small_foto : false;
                        }
                    )
                }
                this.big_photo = a[0].small_foto;

            }
            },
        photoLoadCheck(){

            if (this.photoActive === false){
                return this.createNode();
            }

            else{
                return this.deleteNode();
            }


        },
        deleteNode(){
            this.big_photo ='';
            this.photoActive = false;
            if(document.querySelector('.big_photo')){

                for(let a = 0; a<document.querySelectorAll('.big_photo').length; a++){
                    document.querySelector('.big-foto .active .photo-wrp').removeChild(document.querySelectorAll('.big_photo')[a]);
                }


            }
        },
        createNode(){
            this.photoActive = true;
            this.photoLoad = true;

                let img = document.createElement('img');
                img.className = 'big_photo';
                document.querySelector('.big-foto .active .photo-wrp').appendChild(img);

                img.onload = function(){
                    this.photoLoad = false;

                }.bind(this);

                img.src = this.big_photo;

        }
    },
    watch:{
        big_photo(){
            return this.big_photo!==''?this.photoLoadCheck():'';
        }
    }


}

