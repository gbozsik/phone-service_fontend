<template>
  <v-layout justify-center row>
    <v-flex>
      <v-card>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Csomagszám" required ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select :items="customers" v-model="selectedCustomer" item-text="name" label="Ügyfél" single-line  return-object/>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Munkalap szám" required disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Ügyfél munkaszám" required disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="IMEI" required ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>    
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-text>
          <h4 class="inputTitle">Készülék információk</h4>
          <v-container>
            <v-layout wrap>

              <v-flex xs12 sm4>
                <v-select :items="manufacturers" 
                          v-model="selectedManufacturer" 
                          item-text="name" 
                          label="Gyártó" 
                          single-line  
                          return-object>
                </v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select :items="products" 
                          v-model="selectedProduct" 
                          @change="productNameChanged()"
                          item-text="name" 
                          label="Model" 
                          single-line  
                          return-object >
                </v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select :items="categories" 
                          v-model="selectedCategory" 
                          item-text="name" 
                          label="Kategória" 
                          single-line  
                          return-object>
                </v-select>
              </v-flex>


              <v-flex xs12>
                <v-combobox v-model="selectedProductOperator" :items="productOperators" label="Készülék operátor"></v-combobox>
              </v-flex >
              <v-flex xs12>
                <v-checkbox v-model="doa" label="DOA" required  @change="doaChanged()"></v-checkbox>
              </v-flex >
              <v-flex xs12 sm6>
                <v-combobox v-model="selectedRepairType" :items="repairTypes" label="Teendő"></v-combobox>
              </v-flex >
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

  mounted() {
    this.$store.dispatch("customer/getCustomersList");
    this.$store.dispatch("product/getProductsList");
  },
  computed: {
    products() {
      if (_.isEmpty(this.selectedManufacturer) && _.isEmpty(this.selectedProductCategory)) {
        return this.$store.state.product.products
      }    
      else {
        return this.$store.state.product.products.filter(product => {
          return product.manufacturer.name == this.selectedManufacturer.name
        })
      }
    },
    manufacturers() {
      return this.$store.getters['product/manufacturers']
    },
    categories() {
      return this.$store.getters['product/categories']
    }
  },
  methods: {
    productNameChanged() {
      this.selectedManufacturer = this.selectedProduct.manufacturer
    },
    doaChanged() {
      console.log(this.doa)
    }
  },
  data() {
    return {
      customers: [ 'Vodafone SK', 'Telenor SK'],
      selectedCustomer: null,
      
      selectedProduct: null,
      selectedManufacturer: null,
      selectedCategory: null,

      selectedProductOperator: null,
      productOperators: ['Vodafone', 'Telenor'],
      selectedProductCategory: null,
      selectedRepairType: null,
      repairTypes: ['Repair', 'Csere'],
      doa: false
    }
  }
};
</script>
