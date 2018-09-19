export default {
    namespaced: true,
    state: {
        show: true,
        items: [
            { header: 'Általános', role: 'ROLE_USER' },
            { title: 'Home', icon: 'contacts', role: 'ROLE_USER', to: { name: 'home.index'}},

            
            { divider: true, inset: false },
            { header: 'Ügyintézés', role: 'ROLE_USER'},
            
            { title: 'Bevétel', icon: 'contacts', role: 'ROLE_USER', to: { name: 'intake.index'}},
            { title: 'Szerviz', icon: 'contacts', role: 'ROLE_USER', to: { name: 'users.index'}},
            { title: 'Árajánlat', icon: 'contacts', role: 'ROLE_USER', to: { name: 'users.index'}},
            { title: 'Kivétel', icon: 'contacts', role: 'ROLE_USER', to: { name: 'users.index'}},

            { divider: true, inset: false },

            { title: 'Munkalapok', icon: 'contacts', role: 'ROLE_USER', to: { name: 'claimlist.index'}},
            { title: 'Raktár', icon: 'contacts', role: 'ROLE_USER', to: { name: 'users.index'}},

            { divider: true, inset: false },


            { header: 'Adminisztráció', role: 'ROLE_ADMIN'},
            { title: 'Felhasználók', icon: 'contacts', role: 'ROLE_ADMIN', to: { name: 'users.index'}},
            { title: 'Partnerek', icon: 'contacts', role: 'ROLE_ADMIN', to: { name: 'partners.index'}},
            { title: 'Ügyfelek', icon: 'contacts', role: 'ROLE_ADMIN', to: { name: 'customers.index'}},

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