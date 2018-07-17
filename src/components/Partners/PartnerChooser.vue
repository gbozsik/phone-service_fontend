<template>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>{{ partnerName }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in partners" :key="item.id" @click="partnerChanged(item)">
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
</template>

<script>

    export default {
        mounted() {
            this.$store.commit("partner/changed", this.first)
        },
        computed: {
            partnerName() {
                return this.$store.getters['partner/name']
            },
            partners() {
                return this.$store.state.partner.items
            },
            color() {
                return this.$store.getters['partner/color']
            },
            first() {
                return this.$store.getters['partner/first']
            }
        },    
        methods: {
            partnerChanged(item) {
                this.$store.commit("partner/changed", item)
                this.$router.push({name: 'home.index'})
            }
        }
    }

</script>
