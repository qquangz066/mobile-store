import {createStore} from 'vuex'
import auth from './module/auth.module'
import home from './module/home.module'

export default createStore({
    modules: {
        auth,
        home
    }
})
