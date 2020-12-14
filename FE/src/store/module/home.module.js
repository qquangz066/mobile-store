import {HOME_SEARCH} from "../actions.type";
import {SET_SEARCH} from "../mutations.type";

const initialState = {
    search: '',
    cart: [
        {

        }
    ]
};

const state = {...initialState};

const actions = {
    async [HOME_SEARCH](context, search) {
        context.commit(SET_SEARCH, search);
    },
}

const mutations = {
    [SET_SEARCH](state, search) {
        state.search = search;
    },
}


export default {
    state,
    actions,
    mutations
};