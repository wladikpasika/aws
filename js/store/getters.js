export default {

    mainSlidersCount:function(state){
        return state.mainSliders.length
    },
    fontSize:function(state){
        if(state.widthScreen >= 980){
            return String(state.widthScreen / 1600 * 10);
        }
        else{
            return 7.5;
        }
    },
    heightMainSlider:function(state){

        if(state.widthScreen>=980){

        return state.heightScreen;
        }

        else if(state.widthScreen<980&&state.widthScreen>500){

        return (state.widthScreen / 8) * 4
        }

        else {

            return 288;
        }
    },
    widthMainSlider(state){
        return state.widthScreen * state.mainSliders.length
    },
    widthServicesScreen(state){

        if(state.widthScreen >= 980){
            return state.widthScreen - ((state.widthScreen/1600*10)*14.5)*2
        }
        else{
            return state.widthScreen - 7.5*14.5*2
        }
    },
    widthServicesCard(state, getters){
        if (state.widthScreen >= 980) {
            return getters.widthServicesScreen/3;
        }
        else if (state.widthScreen < 980 && state.widthScreen > 700) {
            return getters.widthServicesScreen/2;
        }
        else{
            return 'auto';
        }
    },
    widthServicesBlock(state, getters){
        if(state.widthScreen > 700){
            return getters.widthServicesCard*state.servicesSliders.length;
        }
        else{
            return 'auto';
        }
    },
    countServicesScreen(state){
        if (state.widthScreen >= 980) {
            return Math.ceil(state.servicesSliders.length / 3);
        }
        else if (state.widthScreen < 980 && state.widthScreen > 700) {
            return Math.ceil(state.servicesSliders.length / 2);
        }
        else{
            return 1;
        }

    },
    widthReview(state){
        return state.widthScreen*0.7;
    },
    countReviewSliders(state){
        return state.reviews.length;
    }

}
