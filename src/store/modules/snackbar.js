import axios from 'axios'

export default {
    namespaced: true,
    state: {
        show: false,
        color: 'info',
        timeout: 2000,
        multiLine: true,
        vertical: true,
        text: ''
    },
    getters: {
        
    },
    actions: {
        
    },
    mutations: {
        showMessage(state, { text, color = 'info', timeout = 2000 }) {
            state.text = text
            state.color = color,
            state.timeout = timeout
            state.show = true
        },
        close(state, ) {
            state.text = ''
            state.show = false
        },

    },
}
