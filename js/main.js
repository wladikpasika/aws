import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './store';
import routes from './routes';//конфигурация
import App from './components/App';

Vue.use(VueRouter);// добавляем плагин
Vue.use(VueResource);

const router = new VueRouter({routes,mode:'history'});//создаем объект роута

var vm = new Vue({
    el:'#app',
    router,
    store,
    render: h =>h(App)
});

export{vm};

