import {LOGIN, LOGOUT} from "../actions.type";
import {SET_AUTH} from "../mutations.type";
import auth from "@/services/auth";

const initialState = {
    auth: auth.getAuth()
};

const state = {...initialState};

const actions = {
    async [LOGIN](context, {email, password}) {
        const data = await auth.login(email, password);
        context.commit(SET_AUTH, data);
        return data
    },
    async [LOGOUT](context) {
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