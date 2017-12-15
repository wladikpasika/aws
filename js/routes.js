import Vacantions from './components/pages/vacantions'
import Home from './components/pages/home'
// тут мы декларируем все роуты приложения (какие компоненты за какие адреса отвечают)
export default [
    {
        name: 'vacantions',
        component: Vacantions,
        path: '/vacantions/'
    },
    {
        name: '/',
        component: Home,
        path: '/'
    }
]
