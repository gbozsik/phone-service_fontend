import axios from 'axios'

export default {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {
        fullname(state) {
            return `${state.user.firstName} ${state.user.lastName}`
        },
        hasRole(state) {
            return true
        }
    },
    actions: {
        async startup({commit}) {
            const { data } = await axios.get('/actualuser')
            commit('loadUserInfo', data)
        }
    },
    mutations: {
        loadUserInfo: function (state, user) {
            state.user = user
        },
    },
}
