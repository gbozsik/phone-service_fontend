<template>
    <v-flex>
      <v-card>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Csomagszám" required ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-combobox v-model="selectedCustomer" :items="customers" label="Ügyfél"></v-combobox>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Munkalap szám" required readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Ügyfél munkaszám" required readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="IMEI" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-combobox v-model="selectedProductModel" :items="productModels" label="Készülék model"></v-combobox>
              </v-flex>
              <v-flex xs12 sm6>
                <v-combobox v-model="selectedProductOperator" :items="productOperators" label="Készülék operátor"></v-combobox>
              </v-flex >
              <v-flex xs12 sm1>
                <v-checkbox v-model="doa" label="DOA" required  @change="doaChanged()"></v-checkbox>
              </v-flex >
              <v-flex xs12 sm6>
                <v-combobox v-model="selectedProductCategory" :items="productCategories" label="Készülék kategória"></v-combobox>
              </v-flex >
              <v-flex xs12 sm6>
                <v-combobox v-model="selectedRepairType" :items="repairTypes" label="Teendő"></v-combobox>
              </v-flex >
            </v-layout>
          </v-container>
          <small>*kötelező mezők</small>
        </v-card-text>
      </v-card>
    </v-flex>
</template>

<script>
export default {

  mounted() {},
  computed: {},
  methods: {
    doaChanged() {
      console.log(this.doa)
    }
  },
  data() {
    return {
      selectedCustomer: null,
      customers: [ 'Vodafone SK', 'Telenor SK'],
      selectedProductModel: null,
      productModels: ['Iphone', 'Samsung'],
      selectedProductOperator: null,
      productOperators: ['Vodafone', 'Telenor'],
      selectedProductCategory: null,
      productCategories: ['Telefon', 'Tablet', 'Modem', 'Kieg'],
      selectedRepairType: null,
      repairTypes: ['Repair', 'Csere'],
      doa: false
    }
  }
};
</script>