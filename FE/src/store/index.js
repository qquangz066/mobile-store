import {createStore} from 'vuex'
import auth from './module/auth.module'

export default createStore({
    modules: {
        auth
    }
})
