<template>
  <v-toolbar :color="$store.getters['partner/color']" dark fixed app>
      <v-toolbar-side-icon @click.stop="$emit('side-icon-click')"></v-toolbar-side-icon>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>{{ this.$store.getters['partner/name'] }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in $store.state.partner.items" :key="item.id" @click="partnerChanged(item)">
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
   </v-toolbar>
</template>

<script>

  export default {
    props: [
      'side-icon-click'
    ],
    computed: {
      first() {
        return this.$store.getters['partner/first']
      }
    },
    mounted() {
       this.$store.commit("partner/changed", this.first)
    },
    methods: {
      partnerChanged(item) {
        this.$store.commit("partner/changed", item)
        this.$router.push({name: 'home.index'})
      }
    }
  }

</script>
