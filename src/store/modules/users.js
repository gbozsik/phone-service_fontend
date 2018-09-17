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
        },
        async updateUser({ dispatch }, payload) {
            // send updated user datas to backend
            await axios.post('/updateuser', payload)
            // get users list again
            dispatch('getUsersList');
        }
    },
    mutations: {
        loadUsersList: function (state, payload) {
            state.users = payload
        },
    },
}