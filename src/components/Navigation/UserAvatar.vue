<template>
  <v-toolbar flat class="transparent">
    <v-list class="pa-0">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon>face</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    name()  {return this.$store.getters['account/fullname']},
    image() {return this.$store.state.account.user.avatar}
}
};
</script>