export default {
    namespaced: true,
    state: {
        show: true,
        items: [
            { header: 'Általános', role: 'ROLE_USER' },
            { title: 'Home', icon: 'contacts', role: 'ROLE_USER', to: { name: 'home.index'}},
            
            { divider: true, inset: false },
            
            { header: 'Adminisztráció', role: 'ROLE_ADMIN'},
            { title: 'Felhasználók', icon: 'contacts', role: 'ROLE_ADMIN', to: { name: 'users.index'}},

            { divider: true, inset: false },
        ]
    },
    getters: {},
    actions: {
        
    },
    mutations: {
        toggleNav(state) {
            state.show = !state.show
        }
    },
}