<template>
    <v-card>
        <v-card-title><h2>{{title}}</h2>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Keresés" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="items" :search="search" rows-per-page-text="Sor / oldal"
        :rows-per-page-items="rows_per_page" :must-sort="true">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.userName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }} {{ props.item.lastName }}</td>
          <td class="text-xs-right">
              <v-btn flat icon color="teal lighten-1" @click="onEdit(props.item)"><v-icon>edit</v-icon></v-btn>
              <v-btn flat icon color="red lighten-1" @click="onDelete(props.item)"><v-icon>delete</v-icon></v-btn>
          </td>
        </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nincs találat a(z) "{{ search }}" kifejezésre.
          </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>

export default {
    props: {
        title:          { type: String, default: "Table title", required: true },
        headers:        { type: Array, default: [], required: true },
        items:          { type: Array, default: [], required: true },
        onEdit:         { type: Function, default: null, required: true },
        onDelete:       { type: Function, default: null, required: true },
        rows_per_page:  { type: Array, default: () => [50, 100, 150, {text: "Mind",value:-1}], required: false },
    }, 
    data() {
        return {
            search: "",
        }
    }
}
</script>