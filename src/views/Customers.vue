<template>

    <v-flex>
            <v-alert v-if="selectedPartner.id == 0" :value="true" color="error">
               Ki kell, hogy válassz egy partnert, mielőtt ügyfelet választasz!
            </v-alert>

        <v-tooltip bottom color="grey darken-1">
          <span slot="activator">
              <v-btn color="green lighten-1" fab dark>
                  <v-icon>account_circle</v-icon>
              </v-btn>
          </span>
            <span>Új ügyfél létrehozása</span>
        </v-tooltip>

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
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.shortName }}</td>
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.zipCode }}</td>
                <td class="text-xs-left">{{ props.item.city }}</td>
                <td class="text-xs-left">{{ props.item.address }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-right">
                    <IDeleted :status="props.item.deleted"/>
                </td>
                <td class="text-xs-right">
                    <v-btn flat icon color="teal lighten-1" @click="editDialogShow(props.item)">
                        <v-icon>edit</v-icon>
                    </v-btn>
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
                            <v-card-text>
                                <pre> {{ selectedItem }} </pre>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.name"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.shortName"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.code"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.zipCode"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.city"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.address"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.email"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Név" required
                                                          v-model="table.selectedItem.phone"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <v-select
                                                    :items="editDialog.content.selector" label="Kikapcsolva" required
                                                    v-model="table.selectedItem.deleted"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <small>*kötelező mezők</small>
                            </v-card-text>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>


        </Dialog>

    </v-flex>
</template>

<script>
    import Table from '@/components/Core/Table'
    import Dialog from '@/components/Core/Dialog'
    import IDeleted from '@/components/Icons/IDeleted'

    export default {
        components: {
            Table,
            Dialog,
            IDeleted
        },
        state: {
            selectedItem: null,
        },

        mounted() {
            // this.$store.dispatch('customer/getCustomersList');
            this.$store.dispatch('customer/getCustomersListFromDb');
        },


        computed: {
            items() {
                return this.$store.state.customer.custmoersOfpatner
            },
            selectedPartner() {
                return this.$store.state.partner.selected
            }
        },




        data() {
            return {
                editDialogState: false,
                deleteDialogState: false,
                selectedItem: null,
                search: "",
                rows_per_page: [50, 100, 150, {text: "Mind", value: -1}],
                title: "Ügyfelek",
                table: {
                    selectedItem: null,
                    search: "",
                    rows_per_page: [50, 100, 150, {text: "Mind", value: -1}],
                    headers: [
                        {text: "ID", value: "id", align: "left", sortable: true},
                        {text: "Név", value: "name", align: "left", sortable: true},
                        {text: "Rövid név", value: "shorName", align: "left", sortable: true},
                        {text: "Kód", value: "code", align: "left", sortable: true},
                        {text: "Irányítószám", value: "zipCode", align: "left", sortable: true},
                        {text: "Város", value: "city", align: "left", sortable: true},
                        {text: "Cím", value: "address", align: "left", sortable: true},
                        {text: "E-mail", value: "email", align: "left", sortable: true},
                        {text: "Telefon", value: "phone", align: "left", sortable: true},
                        {text: "Aktív/Inaktív", value: "deleted", align: "right", sortable: true},
                        {text: "Művelet", value: "actions", align: "right", sortable: false}
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
                            {text: 'Inaktív', value: false},
                            {text: 'Aktív', value: true}
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
                this.$store.dispatch("customer/updateCustomer", this.table.selectedItem);
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
<style scoped>

</style>