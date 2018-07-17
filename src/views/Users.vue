<template>
    <v-flex>
      <v-tooltip bottom color="grey darken-1">
          <span slot="activator">
              <v-btn color="green lighten-1" fab dark>
                  <v-icon>account_circle</v-icon>
              </v-btn>
          </span>
        <span>Új felhasználó létrehozása</span>
      </v-tooltip>
    <v-card>
        <v-card-title><h2>Felhasználók</h2>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Keresés" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>

        <v-data-table 
        :headers="headers" 
        :items="items" 
        :search="search" 
        rows-per-page-text="Sor / oldal"
        :rows-per-page-items="rows_per_page"
        :must-sort="true"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.userName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }} {{ props.item.lastName }}</td>
          <td class="text-xs-right">
              <v-btn flat icon color="teal lighten-1" @click="editDialogShow(props.item)"><v-icon>edit</v-icon></v-btn>
              <v-btn flat icon color="red lighten-1" @click="deleteDialogShow(props.item)"><v-icon>delete</v-icon></v-btn>
          </td>
        </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nincs találat a(z) "{{ search }}" kifejezésre.
          </v-alert>
        </v-data-table>
    </v-card>

    <Dialog
      v-if="selectedItem !== null"
      title="Felhasználó szerkesztése"  
      okBtnText="Mentés"
      cancelBtnText="Mégse"
      color="teal lighten-1"
      :show="editDialogState" 
      :onCancel="editDialogClose" 
      :onOk="editDialogSave">
      
      <v-card>
        <v-card-text>
          <pre> {{ selectedItem}} </pre>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Felhasználó név" required v-model="selectedItem.userName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Vezetéknév" required v-model="selectedItem.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Keresztnév" required v-model="selectedItem.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Jelszó" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Jelszó megereősítés" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Igen', 'Nem']" label="Kikapcsolva" required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*kötelező mezők</small>
        </v-card-text>
      </v-card>


    </Dialog>

    <Dialog
      title="Felhasználó törlése"  
      okBtnText="Törlés"
      color="red lighten-1"
      :show="deleteDialogState" 
      :onCancel="deleteDialogClose" 
      :onOk="deleteDialogSave">
      

      <v-card>
        <v-card-title primary-title><h2>Biztosan törlöd ezt felhasználót?</h2></v-card-title>
        <v-card-text>
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs12>
                <v-input messages="felhasználónév"></v-input>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>


    </Dialog>

  
  </v-flex>
</template>

<script>

import Dialog from '@/components/Core/Dialog'

export default {
  components: {
    Dialog
  },

  mounted() {
    this.$store.dispatch('users/getUsersList');
  },

  computed: {
    items() { 
      return this.$store.state.users.users 
    }
  },

  methods: {
    editDialogShow(item) {
      this.selectedItem = item
      this.editDialogState = true
    },
    editDialogClose() {
      this.editDialogState = false
    },
    editDialogSave() {
      this.editDialogState = false
    },
    
    deleteDialogShow(item) {
      this.selectedItem = item
      this.deleteDialogState = true
    },
    deleteDialogClose() {
      this.deleteDialogState = false
    },
    deleteDialogSave() {
      this.editDialogState = false
    },

  },

  data() {
    return {
      editDialogState: false,
      deleteDialogState: false,
      selectedItem: null,
      search: "",
      rows_per_page: [50, 100, 150, {text: "Mind",value:-1}],
      headers: [
        
        { text: "ID",               value: "id",        align:"left",  sortable: true },
        { text: "Felhasználó név",  value: "userName",  align:"left",  sortable: true },
        { text: "Név",              value: "firstName", align:"left",  sortable: true },
        { text: "Művelet",          value: "firstName", align:"right", sortable: false }
      ]
    };
  }
};
</script>