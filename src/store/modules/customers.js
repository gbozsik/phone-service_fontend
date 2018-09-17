import axios from 'axios'

export default {
    namespaced: true,
    state: {
        customers: []
    },
    getters: {
       
    },
    actions: {
        async getCustomersList({commit}) {
            partner = { id: 11 }
            const { data } = await axios.post('/users', partner)
            commit('loadCustomersList', data)
        },
       
    },
    mutations: {
        
    },
}

