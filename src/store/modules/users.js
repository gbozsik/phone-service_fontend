import axios from 'axios'

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
       
    },
    actions: {
        async getUsersList({commit}) {
            const { data } = await axios.get('/users')
            commit('loadUsersList', data)
        }
    },
    mutations: {
        loadUsersList: function (state, users) {
            state.users = users
        },
    },
}
