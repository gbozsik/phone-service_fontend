import axios from 'axios'

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        manufacturers(state) {
            return state.products.map((product) => {
                return product.manufacturer
            })
        },
        categories(state) {
            return state.products.map((product) => {
                return product.productCategory
            })
        }
    },
    actions: {
        async getProductsList({commit, rootState}) {
            const partner = { id: rootState.partner.selected.id }
            const { data } = await axios.post('/produstmodels', partner)
            commit('loadProductsList', data)
        },
       
    },
    mutations: {
        loadProductsList: function (state, payload) {
            state.products = payload
        },
    },
}

