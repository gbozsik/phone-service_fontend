import axios from 'axios'

export default {

    namespaced: true,
    state: {
        customers: [],
    },
    getters: {
     
    },
    actions: {
        async getCustomersOfPartner({commit, rootState}) {
            const partner = { id: rootState.partner.selected.id }
            const {data} = await axios.post('/getcustomersofpartner', partner)
            commit('loadCustomersOfPartner', data)
        },
    },
    mutations: {
        loadCustomersOfPartner: function (state, customers) {
            state.customers = customers
        }
    }
}
