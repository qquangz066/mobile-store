import {LOGIN, LOGOUT, REGISTER} from "../actions.type";
import {SET_AUTH} from "../mutations.type";
import auth from "@/services/auth";
import {useToast} from "vue-toastification";

const toast = useToast();

const initialState = {
    auth: auth.getAuth()
};

const state = {...initialState};

const actions = {
    async [REGISTER](context, user) {
        const data = auth.register(user);
        if (data) {
            await context.dispatch(LOGIN, {email: user.email, password: user.password});
        }
        return data
    },
    async [LOGIN](context, {email, password}) {
        const data = await auth.login(email, password);
        context.commit(SET_AUTH, data);
        if(data){
            toast.success('You are logged in')
        }

        return data
    },
    async [LOGOUT](context) {
        await auth.logout()
        context.commit(SET_AUTH, null);
    },
}

const mutations = {
    [SET_AUTH](state, data) {
        state.auth = data;
    },
}

const getters = {
    auth(state) {
        return state.auth;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};