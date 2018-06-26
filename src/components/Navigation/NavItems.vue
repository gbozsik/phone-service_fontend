<template>

<v-list dense>
  <template v-for="(item, index) in $store.state.navigation.items">
    <v-subheader v-if="item.header && hasRole(item.role)" :key="item.header">{{ item.header }}</v-subheader>
    <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

    <v-list-tile v-else-if="hasRole(item.role)" :key="item.title" router exact :to="item.to">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title> {{ item.title }} </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

  </template>
</v-list>
</template>

<script>
export default {

  methods: {
    hasRole(role) {
      if (Object.keys(this.$store.state.account.user).length > 0) {
        return this.$store.state.account.user.roles.includes(role)
      }
    }
  }

}
</script>