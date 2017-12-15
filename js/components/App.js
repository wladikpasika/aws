import Vue from 'vue'
import Home from './pages/home'
import Vacantions from './pages/vacantions'
import template from '../../build/html/App.html'

export default Vue.component('app',{
    template,
    components: {
        'home': Home,
        'vacantions': Vacantions
    }

})