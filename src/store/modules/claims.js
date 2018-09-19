import axios from 'axios'

export default {
    namespaced: true,
    state: {
        claims: []
    },
    getters: {

    },
    actions:{
        async getClaimList({commit}) {
            const { data } = await axios.get('/getclaims')
            commit('loadClaims', data)
        },
    },
    mutations: {
        loadClaims: function (state, payload) {
            state.claims = payload
        },
    }
}
