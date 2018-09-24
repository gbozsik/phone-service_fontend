let axios = require('axios')
let partner = require('./partner')


export default {

    data() {
        return {
            postBody: '',
            errors: []
        }
    },

    namespaced: true,
    state: {
        customer: '',
        custmoersOfpatner: [],
        // custmoersOfpatner2: []
    },
    getters: {
        // actualPartner: partner.default.state.selected.id
    },
    actions: {
        async getCustomersList({commit}) {
            const {data} = await axios.get('/customers')
            commit('loadCustomersList', data)
        },
        async getCustomersListFromDb({commit}) {
            const actualPartner = {id:partner.default.state.selected.id}
            if (actualPartner.id == 0) {
                // ide majd popup kell
                
                console.log('You need to choose a Partner first')
            }
            const { data } = await axios.post('getcustomersofpartner', actualPartner )
            commit ('loadCustomersOfPartner', data )
        },
        async updateCustomer({ dispatch }, customer) {
            const {data} = await axios.post('/updatecustomer', customer)
            console.log(data)
            dispatch('getCustomersListFromDb')
        }
    },
    mutations: {
        loadCustomersOfPartner: function (state, customers) {
            state.custmoersOfpatner = customers
        },

        saveChangedCustomerDetails: function (state, customer) {
            state.customer = customer
        }
    }
}
