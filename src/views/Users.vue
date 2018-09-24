<template>
  <v-layout justify-center row>
    <v-flex>

      <!--<Table title="Partnerek" :headers="headers" :items="items" :actions="tableActions" />-->

      <v-card-title><h2>{{title}}</h2>
        <v-spacer></v-spacer>
        <v-text-field append-icon="search"
                      label="Keresés"
                      single-line hide-details
                      v-model="table.search">
        </v-text-field>
      </v-card-title>

      <v-data-table :title="title"
                    :headers="table.headers"
                    :items="items"
                    :search="table.search"
                    rows-per-page-text="Sor / oldal"
                    :rows-per-page-items="table.rows_per_page"
                    :must-sort="true">

        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.userName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }}</td>
          <td class="text-xs-left">{{ props.item.lastName }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-right"><IDeleted :status="props.item.deleted" /></td>
          <td>
          <v-btn flat icon color="teal lighten-1" @click="editDialogShow(props.item)"><v-icon>edit</v-icon></v-btn>
          </td>
        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Nincs találat a(z) "{{ table.search }}" kifejezésre.
        </v-alert>
      </v-data-table>





      <Dialog v-if="table.selectedItem !== null"
              title="Partner szerkesztése"
              color="teal lighten-1"
              :show="editDialog.state"
              :actions="editDialog.actions">

        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Felhasználó név" required v-model="table.selectedItem.userName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Vezetéknév" required v-model="table.selectedItem.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Keresztnév" required v-model="table.selectedItem.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="E-mail" required v-model="table.selectedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Jelszó" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Jelszó megereősítés" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                  <v-select :items="editDialog.content.selector"
                            label="Státusz" required
                            v-model="table.selectedItem.deleted"
                  ></v-select>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </Dialog>
    </v-flex>
  </v-layout>

</template>

<script>
import Dialog from "@/components/Core/Dialog";
import Table from "@/components/Core/Table";
import IDeleted from '@/components/Icons/IDeleted'

export default {
  components: {
    Dialog,
    Table,
    IDeleted
  },

  mounted() {
    this.$store.dispatch("users/getUsersList");
  },

    computed: {
        items() {
            return this.$store.state.users.users
        },
    },

    components: {
        Dialog,
        Table,
        IDeleted,
    },

    data() {
        return {
            title: "Partnerek",
            table: {
                selectedItem: null,
                search: "",
                rows_per_page: [50, 100, 150, {text: "Mind",value:-1}],
                headers: [
                    { text: "ID",               value: "id",        align:"left",  sortable: true },
                    { text: "Felhasználó név",              value: "userName",      align:"left",  sortable: true },
                    { text: "Keresztnév",              value: "firstName",      align:"left",  sortable: true },
                    { text: "Vezetéknév",              value: "lastName",      align:"left",  sortable: true },
                    { text: "E-mail",              value: "email",      align:"left",  sortable: true },
                    { text: "Aktív/Inaktív",    value: "deleted",   align:"right",  sortable: true },
                    { text: "Művelet",          value: "actions",   align:"right", sortable: false }
                ]
            },

            editDialog: {
                state: false,
                actions: [
                    {
                        text: "Mentés",
                        click: this.editDialogSave,
                    },
                    {
                        text: "Bezárás",
                        click: this.editDialogClose,
                    },
                ],
                content: {
                    selector: [
                        { text: 'Inaktív',  value: false },
                        { text: 'Aktív',  value: true }
                    ],
                }
            },
        };
    },

    methods: {
        editDialogShow(item) {
            this.table.selectedItem = _.cloneDeep(item)
            this.editDialog.state = true
        },
        editDialogSave() {
            this.$store.dispatch("users/updateUser", this.table.selectedItem);
            this.editDialog.state = false
        },
        editDialogClose() {
            this.editDialog.state = false
        },
        chooseAnotherColor() {
            this.table.selectedItem.color = _.sample(this.colors);
        }
    }
}
</script>