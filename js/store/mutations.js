export default {

    SET_MAIN_SLIDERS(state,mainSliders){
        state.mainSliders = mainSliders;
    },
    SET_SERVICES_SLIDERS(state,servicesSliders){
        state.servicesSliders = servicesSliders;
    },
    SET_SCREEN_WIDTH(state, widthScreen){
        state.widthScreen = widthScreen;
    },
    SET_SCREEN_HEIGHT(state, heightScreen){
        state.heightScreen = heightScreen;
    },
    SET_SCREEN_AVAIL_HEIGHT (state, availHeightScreen){
        state.availHeightScreen = availHeightScreen;
    },
    SET_SERVICES_SLIDERS_DOWNLOAD(state,servicesSliderDownload){
        state.servicesSliderDownload = servicesSliderDownload;
    },
    SET_MAIN_SLIDERS_DOWNLOAD(state,mainSliderDownload){
        state.mainSliderDownload = mainSliderDownload;
    },
    SET_NAV_MENU(state,navMenu){
        state.navMenu = navMenu;
    },
    OVERLAY_SET(state,overlayDisplay){
        state.overlayDisplay = overlayDisplay;
    },
    SET_REVIEWS(state,reviews){
        state.reviews = reviews;
    },
    SET_CLIENTS_PHOTOS(state,photos){
        state.clientsPhotos = photos;
    },
    SET_ABOUT(state,about){
        state.about = about;
    },
    SET_CONTACTS(state,contacts){
        state.contacts = contacts;
    },
}
