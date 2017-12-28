import transform from './transform'

export default function(elem,widthScreen){
    let x;
    let y;
    let started = false;
    let detecting = false;
    let touch;
    let delta;
    let left;
    let right;

    this.dr =(e)=>{


        delta = touch.clientX - e.changedTouches[0].clientX;

        if (Math.sign(delta) === -1) {

            if (this.module === 0) {

                document.querySelector(elem).style.transform = transform(0,0,this.slidersCount,delta);

            }
            else if (this.module > 0) {
                left = true;
            }

        }
        else {


            if (this.module === (Math.abs(this.countScreen-1)||Math.abs(this.slidersCount - 1))) {
                document.querySelector(elem).style.transform = transform(widthScreen,this.module,(this.countScreen||this.slidersCount),delta);

            }
            else if (this.module < (this.countScreen-1||this.slidersCount - 1)) {
                right = true;

            }
        }
    };

    this.dt = (e)=>{

        if (Math.abs(x - e.changedTouches[0].clientX) >= Math.abs(y - e.changedTouches[0].clientY)) {
            started = true;
            e.preventDefault();

        }
        detecting = false;

    };


    this.main = ()=>{
        /*добавляем ссылку на родительский объект*/
        let draw = this.dr.bind(this);
        let detect = this.dt.bind(this);

            document.querySelector(elem).addEventListener('touchstart', function (e) {


                if (e.touches.length != 1 || started) {
                    return;
                }

                detecting = true;

                touch = e.changedTouches[0];
                x = touch.clientX;
                y = touch.clientY;

            }.bind(this));

            document.querySelector(elem).addEventListener('touchmove', function (e) {

            if (e.touches.length != 1) {
                detecting = false;
                started = false;
                return
            }

            if (!started && !detecting) {
                return;
            }

            if (detecting) {
                detect(e)
            }

            if (started) {
                draw(e);
            }
            /*отменяем автоматическое перелистывание*/
            this.timer = true;
        }.bind(this));

        document.querySelector(elem).addEventListener('touchend', function (e) {

            started = false;
            if (left === true) {
                this.clickCount--;

                return left = false;
            }
            if (right === true) {
                this.clickCount++;

                return right = false;
            }

            return document.querySelector(elem).style.transform = transform(widthScreen,this.module,(this.countScreen||this.slidersCount)).transform;

        }.bind(this));


    }
}
