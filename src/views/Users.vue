<template>
    <v-flex>
        <v-tooltip bottom color="grey darken-1">
            <span slot="activator">
                <v-btn color="warning" fab dark>
                    <v-icon>account_circle</v-icon>
                </v-btn>
            </span>
        <span>Új felhasználó létrehozása</span>
        </v-tooltip>
        
    <v-card>
        <v-card-title>Felhasználók
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Keresés" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.userName }}</td>
        <td class="text-xs-right">{{ props.item.firstName }} {{ props.item.lastName }}</td>
        <td class="text-xs-right"> {{ props.item.roles }} </td>
        <td class="text-xs-right">
            <v-btn color="info" small>Szerkeszt</v-btn>
            <v-btn color="error" small>Töröl</v-btn>
        </td>
      </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Nincs találat a(z) "{{ search }}" kifejezésre.
      </v-alert>

    </v-data-table>
  </v-card>
  </v-flex>
</template>

<script>
export default {

  mounted() {
    this.$store.dispatch('users/getUsersList');
  },

  computed: {
    items() { 
      return this.$store.state.users.users 
    }
  },

  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Felhasználó név", value: "username" },
        { text: "Név", value: "name" },
        { text: "Jelszó", value: "password" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  }
};
</script>