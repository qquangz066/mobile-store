import {createStore} from 'vuex'
import auth from './module/auth.module'
import home, {localStoragePlugin} from './module/home.module'



export default createStore({
    modules: {
        auth,
        home
    },
    plugins: [localStoragePlugin]
})
