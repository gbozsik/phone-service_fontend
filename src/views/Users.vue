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

    <Table title="Felhasználók" :headers="tableHeaders" :items="tableItems" :actions="tableActions" />

    <Dialog v-if="selectedItem !== null" title="Felhasználó szerkesztése" okBtnText="Mentés"
      cancelBtnText="Mégse" color="teal lighten-1" :show="editDialogState" :actions="editDialogActions">
      
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

    <Dialog v-if="selectedItem !== null" title="Felhasználó törlése" okBtnText="Törlés"
      color="red lighten-1" :show="deleteDialogState" :actions="deleteDialogActions">
  
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
import Dialog from "@/components/Core/Dialog";
import Table from "@/components/Core/Table";

export default {
  components: {
    Dialog,
    Table
  },

  mounted() {
    this.$store.dispatch("users/getUsersList");
  },

  computed: {
    tableItems() {
      return this.$store.state.users.users
    }
  },

  methods: {
    editDialogShow(item) {
      this.selectedItem = item;
      this.editDialogState = true;
    },
    editDialogClose() {
      this.editDialogState = false;
    },
    editDialogSave() {
      this.editDialogState = false;
    },

    deleteDialogShow(item) {
      this.selectedItem = item;
      this.deleteDialogState = true;
    },
    deleteDialogClose() {
      this.deleteDialogState = false;
    },
    deleteDialogSave() {
      this.editDialogState = false;
    }
  },

  data() {
    return {
      editDialogState: false,
      deleteDialogState: false,
      selectedItem: null,
      tableHeaders: [
        { text: "ID", value: "id", align: "left", sortable: true },
        { text: "Felhasználó név", value: "userName", align: "left", sortable: true },
        { text: "Keresztnév", value: "firstName", align: "left", sortable: true },
        { text: "Vezetéknév", value: "lastName", align: "left", sortable: true },
        { text: "Művelet", value: "actions", align: "right", sortable: false }
      ],
      tableActions: [
        {
          icon: "edit",
          color: "teal lighten-1",
          click: this.editDialogShow,
          tooltip: "Szerkesztés"
        },
        {
          icon: "delete",
          color: "red lighten-1",
          click: this.deleteDialogShow,
          tooltip: "Törlés"
        }
      ],
      editDialogActions: [
        {
          text: "Mentés",
          click: this.editDialogSave,
        },
        {
          text: "Bezárás",
          click: this.editDialogClose,
        },
      ],
      deleteDialogActions: [
        {
          text: "Igen",
          click: this.deleteDialogSave,
        },
        {
          text: "Nem",
          click: this.deleteDialogClose,
        },
      ]
    };
  }
};
</script>