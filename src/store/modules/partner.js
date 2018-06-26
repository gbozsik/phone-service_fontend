import axios from 'axios'

const baseItem = { id:0, name: 'Nincs kiválasztva', color: 'black' }

export default {
    namespaced: true,
    state: {
        selected: {},
        items: [ baseItem ]
    },
    getters: {
        first(state) {
            if (state.items.length > 0) return state.items[0]
        },
        name(state) {
            return state.selected.name
        },
        color(state) {
            return state.selected.color
        }
    },
    actions: {
        async startup({commit}) {
            const { data } = await axios.get('/partners')
            commit('loadPartners', data)
        }
    },
    mutations: {
        loadPartners: function (state, partners) {
            state.items = partners
            if (partners.length > 0) state.selected = partners[0]
        },
        changed(state, item) {
            state.selected = item
        }
    },
}

