import Vue from 'vue';
export default {

    GET_MAIN_SLIDERS(context) {

        context.commit('SET_MAIN_SLIDERS_DOWNLOAD', true);

        let get;

        if(window.location.port==='8082'||window.location.port==='80'){

            get = '/?slider=main_slider';

        }
        else {
            get = '/db/firstslider.json';
        }
        Vue.http.get(get).then((response) => {
            context.commit('SET_MAIN_SLIDERS', response.data)
        }).then(()=>{context.commit('SET_MAIN_SLIDERS_DOWNLOAD', false);});
    },

    GET_NAV_MENU(context) {

        let get;

        if(window.location.port==='8082'||window.location.port==='80'){

            get = '/?slider=nav';

        }
        else {
            get = '/db/nav-menu.json';
        }
        Vue.http.get(get).then((response) => {
            context.commit('SET_NAV_MENU', response.data)
        });
    },


    GET_SERVICES_SLIDERS(context) {

        context.commit('SET_SERVICES_SLIDERS_DOWNLOAD',true);

        let get;

        if(window.location.port==='8082'||window.location.port==='80'){

            get = '/?slider=block_services';
        }
        else {
            get = '/db/services-slider.json';
        }

        return Vue.http.get(get).then((response) => {
            return context.commit('SET_SERVICES_SLIDERS', response.data)
        }).then(()=>{
            return context.commit('SET_SERVICES_SLIDERS_DOWNLOAD',false)
        });
    },

    /*получаем ширину экрана*/
    GET_SCREEN_WIDTH(context){
        /*передаем ширину в мутацию, потом в хранилище*/
        let body = document.body;
        let documentElement = document.documentElement;
        let widthScreen = Math.max(
            /*body.scrollWidth, documentElement.scrollWidth,*/
            body.offsetWidth, documentElement.offsetWidth,
            body.clientWidth, documentElement.clientWidth);
        context.commit('SET_SCREEN_WIDTH', widthScreen);
    },
    /*получаем высоту экрана*/
    GET_SCREEN_HEIGHT(context){
        /*передаем высоту в мутацию, потом в хранилище*/
        let heightScreen = document.documentElement.clientHeight;
        context.commit('SET_SCREEN_HEIGHT', heightScreen);
    },
    OVERLAY_GET(context){

        let overlayDisplay;

        if(context.state.overlayDisplay){
            overlayDisplay=false;
        }
        else{
            overlayDisplay=true;
        }
        return context.commit('OVERLAY_SET', overlayDisplay);
    }
}