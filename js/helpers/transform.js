export default function transform (widthSlider, module, count, delta){

    if(delta&&widthSlider !== 'auto'){

        if(module === 0){

        return "translate3d("  + ((0 - delta / 5)) + "px, 0px, 0px)"
        }

        else {
            return "translate3d(" + (-((module * widthSlider) + delta / 5)) + "px, 0px, 0px)"
        }
    }

    else {
        return {
            width:widthSlider!=='auto'?widthSlider*count+"px":'auto',
            transform: widthSlider!=='auto'?"translate3d(" + (-widthSlider * module) + "px, 0px, 0px)":'translated3d( 0px,0px,0px'}
    }
}

