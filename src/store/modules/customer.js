import axios from 'axios'

export default {
    namespaced: true,
    state: {
        customers: []
    },
    getters: {
       
    },
    actions: {
        async getCustomersList({commit, rootState}) {
            const partner = { id: rootState.partner.selected.id }
            // TODO itt akkor ki kéne deríteni, hogy mi is a végpont a backenden
            //const { data } = await axios.post('/customers', partner)
            //commit('loadCustomersList', data)
        },
       
    },
    mutations: {
        loadCustomersList: function (state, payload) {
            state.products = payload
        },
    },
}

