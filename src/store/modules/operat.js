import axios from 'axios'

export default {

    namespaced: true,
    state: {
        operators: [],
    },
    getters: {
     
    },
    actions: {
        async getOperatorsOfPartner({commit, rootState}) {
            const partner = { id: rootState.partner.selected.id }
            const {data} = await axios.post('/getoperatorsofpartner', partner)
            commit('loadOperatorsOfPartner', data)
        },
    },
    mutations: {
        loadOperatorsOfPartner: function (state, operators) {
            state.operators = operators
        }
    }
}
