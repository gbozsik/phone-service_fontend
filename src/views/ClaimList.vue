<template>

    <v-flex>

        <v-card-title><h2>{{title}}</h2>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Keresés" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>

        <!--<Table title="Partnerek" :headers="headers" :items="items"/>-->
        <v-data-table :title="title" :headers="headers" :items="items" :search="search" :onEdit="editDialogShow"  rows-per-page-text="Sor / oldal"
                      :rows-per-page-items="rows_per_page" :must-sort="true">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.customerClaimNum }}</td>
                <td class="text-xs-right"  v-if="props.item.deleted == false"><v-icon style="color: greenyellow">done</v-icon></td>
                <td class="text-xs-right" v-else><v-icon style="color: darkred">block</v-icon></td>
                <td class="text-xs-right">
                    <v-btn flat icon color="teal lighten-1" @click="editDialogShow(props.item)"><v-icon>edit</v-icon></v-btn>
                </td>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Nincs találat a(z) "{{ search }}" kifejezésre.
            </v-alert>
        </v-data-table>

        <Dialog
                v-if="selectedItem !== null"
                title="Partner szerkesztése"
                okBtnText="Mentés"
                cancelBtnText="Mégse"
                color="teal lighten-1"
                :show="editDialogState"
                :onCancel="editDialogClose"
                :onOk="editDialogSave">

            <v-card>
                <v-card-text>
                    <pre> {{ selectedItem }} </pre>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Név" required v-model="selectedItem.name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                        :items="yesOrNo" label="Kikapcsolva" required v-model="selectedItem.deleted"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*kötelező mezők</small>
                </v-card-text>
            </v-card>


        </Dialog>

    </v-flex>
</template>

<script>
    import Table from '@/components/Core/Table'
    import Dialog from '@/components/Core/Dialog'


    export default {

        mounted() {
            this.$store.dispatch('claims/getClaimList');
        },

        computed: {
            items() {
                return this.$store.state.claims.claims
            }
        },

        components: {
            Dialog,
            Table
        },


        data() {
            return {
                yesOrNo: [
                    { text: 'Igen', value: true },
                    { text: 'Nem', value: false }
                ],
                editDialogState: false,
                deleteDialogState: false,
                selectedItem: null,
                search: "",
                rows_per_page: [50, 100, 150, {text: "Mind",value:-1}],
                title: "Munkalapok",
                headers: [

                    { text: "ID",               value: "id",        align:"left",  sortable: true },
                    { text: "Külső Munkalapszám",              value: "customerClaimNum", align:"left",  sortable: true },
                    { text: "Státusz",              value: "deleted", align:"right",  sortable: true },
                    { text: "Művelet",           align:"right", sortable: false }
                ]
            };
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
            }
        }
    }
</script>

<style scoped>

</style>