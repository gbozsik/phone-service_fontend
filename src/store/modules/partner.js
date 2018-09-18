import axios from 'axios'
import _ from 'lodash'

const baseState = { id: 0, name: 'Nincs választható partner', color: 'black' }

export default {
    namespaced: true,
    state: {
        selected: {},
        items: [baseState]
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
        /**
         * Indulásnál lekéri a backendből a partnereket
         * 
         */
        async startup({ commit }) {
            const { data } = await axios.get('/partners')
            commit('loadPartners', data)
        },

        /**
         * Felküldi egy partner adatait a backendnek
         * és újratölti a választható partnerek listáját
         * TODO Ez itt még nem működik valamiért! Nem menti el a státuszt a backend
         */
        async updatePartner({ dispatch }, partner) {
            console.log(partner)
            const {data} = await axios.post('/updatepartner', partner)
            console.log(data)
            dispatch('startup')
        }
    },
    mutations: {
        /**
        * Feltölti a partnerek listáját és 
        * kiválasztja az első olyan partnert, ami nincs kikapcsolva
        */
        loadPartners: function (state, partners) {
            state.items = partners

            if (_.isArray(state.items) && state.items.length > 0) {
                state.items.every(partner => {
                    if (partner.deleted === false) {
                        state.selected = partner
                        return false
                    }
                })
            }

        },

        /**
         * Ha az aktuális partner megváltozik
         * akkor a selected-be berakjuk azt
         */
        changed(state, item) {
            state.selected = item
        }
    },
}

