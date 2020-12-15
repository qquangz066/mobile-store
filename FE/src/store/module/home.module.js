import {ADD_TO_CART, CHECK_OUT, DELETE_FROM_CART, HOME_SEARCH, SET_CART_QUALITY} from "../actions.type";
import {ADD_CART, DELETE_ALL_CART, DELETE_CART, SET_CART, SET_SEARCH} from "../mutations.type";
import orderService from "@/services/order";

const LOCAL_STORAGE_PLUGIN_CART = 'LOCAL_STORAGE_PLUGIN_CART_'

const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type.includes(LOCAL_STORAGE_PLUGIN_CART)) {
            window.localStorage.setItem('Carts', JSON.stringify(state.home.carts))
        }
    })
}
export {
    localStoragePlugin
}

const initialState = {
    search: '',
    carts: JSON.parse(window.localStorage.getItem('Carts') || '[]')
};

const state = {...initialState};

const actions = {
    async [HOME_SEARCH](context, search) {
        context.commit(SET_SEARCH, search);
    },
    async [ADD_TO_CART](context, cart) {
        context.commit(LOCAL_STORAGE_PLUGIN_CART + ADD_CART, cart);
    },
    async [SET_CART_QUALITY](context, cart) {
        context.commit(LOCAL_STORAGE_PLUGIN_CART + SET_CART, cart);
    },
    async [DELETE_FROM_CART](context, cart) {
        context.commit(LOCAL_STORAGE_PLUGIN_CART + DELETE_CART, cart);
    },
    async [CHECK_OUT](context, order) {
        let result = await orderService.create(order)
        if (result) {
            context.commit(LOCAL_STORAGE_PLUGIN_CART + DELETE_ALL_CART);
        }
        return result
    },
}

const mutations = {
    [SET_SEARCH](state, search) {
        state.search = search;
    },
    [LOCAL_STORAGE_PLUGIN_CART + ADD_CART](state, cart) {
        let addedProduct = state.carts.find(item => item.product._id === cart.product._id)

        if (addedProduct) {
            addedProduct.quality += cart.quality
        } else {
            state.carts.push(cart);
        }
    },
    [LOCAL_STORAGE_PLUGIN_CART + SET_CART](state, cart) {
        let addedProduct = state.carts.find(item => item.product._id === cart.product._id)

        if (addedProduct) {
            addedProduct.quality = cart.quality
        } else {
            state.carts.push(cart);
        }
    },
    [LOCAL_STORAGE_PLUGIN_CART + DELETE_CART](state, cart) {
        state.carts = state.carts.filter(item => item.product?._id !== cart.product._id)
    },
    [LOCAL_STORAGE_PLUGIN_CART + DELETE_ALL_CART](state) {
        state.carts.length = 0
    },
}


export default {
    state,
    actions,
    mutations
};