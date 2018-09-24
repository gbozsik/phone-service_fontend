<template>
    <v-container>
    <v-layout justify-center row>
        <v-flex>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-select :items="customers" v-model="selectedCustomer" item-text="name" label="Ügyfél"
                                          single-line return-object/>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Bolt" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Bolt Azonosító" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Munkalap szám" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Ügyfél munkaszám" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="IMEI IN" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="IMEI OUT" required></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-checkbox v-model="doa" label="DOA" required @change="doaChanged()"></v-checkbox>
                            </v-flex>
                            <v-flex xs1></v-flex>
                            <v-flex xs9>
                                <v-combobox v-model="selectedRepairType" :items="repairTypes"
                                            label="Teendő"></v-combobox>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <h4 class="inputTitle">Tartozékok</h4>
                <v-layout wrap>
                    <v-flex xs6>
                        <v-checkbox v-model="accu" label="Akku" required
                                    @change="accuChanged()"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                        <v-checkbox v-model="backcover" label="Hátlap" required
                                    @change="bcoverChanged()"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                        <v-checkbox v-model="charger" label="Töltő" required
                                    @change="chargerChanged()"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                        <v-checkbox v-model="headset" label="Headset" required
                                    @change="headsetChanged()"></v-checkbox>
                    </v-flex>
                </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-flex>

        <v-flex>
            <v-card>
                <v-card-text>
                    <h4 class="inputTitle">Időpontok</h4>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs6>
                                <v-select :items="getArrivalDate"
                                          v-model="arrivalDate"
                                          item-text="name"
                                          label="Érkezés dátuma"
                                          single-line
                                          return-object>
                                </v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="getArrivedToCustomer"
                                          v-model="arrivedToCustomer"
                                          item-text="name"
                                          label="Érkezés dátuma"
                                          single-line
                                          return-object>
                                </v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="getPurchaseDate"
                                          v-model="purchaseDate"
                                          item-text="name"
                                          label="Érkezés dátuma"
                                          single-line
                                          return-object>
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
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
                                          return-object>
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
                            <v-flex xs12 >
                                <v-combobox v-model="selectedProductOperator" :items="productOperators"
                                            label="Készülék operátor"></v-combobox>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
            <v-flex>
            <v-card>
                <v-card-text>
                    <h4 class="inputTitle">Készülék állapota</h4>
                    <!--<v-container>-->
                        <v-layout wrap>
                            <v-flex xs6>
                                <v-checkbox v-model="conditionDisplay" label="Kijelző" required
                                            @change="displayChanged()"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <v-checkbox v-model="conditionBackcover" label="Hátlap" required
                                            @change="backcoverChanged()"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <v-checkbox v-model="conditionButtons" label="Gombok" required
                                            @change="buttonChanged()"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <v-checkbox v-model="conditionHeel" label="Sarok" required
                                            @change="hellChanged()"></v-checkbox>
                            </v-flex>
                        </v-layout>
                    <!--</v-container>-->
                </v-card-text>
            </v-card>
            </v-flex>
        </v-flex>

    </v-layout>
    <v-flex>
    <!--<v-layout>-->
        <v-flex xs12 sm12>
            <v-card >
                <v-card-text>
                    <h4 class="inputTitle">Készülék állapota</h4>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-editor label="Jelentett hibajelenség" required>{{ description }}</v-text-editor>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    <!--</v-layout>-->
    </v-flex>
    </v-container>
</template>

<script>
    export default {

        mounted() {
            this.$store.dispatch("customer/getCustomersList");
            this.$store.dispatch("product/getProductsList");
            this.$store.dispatch('customer/getCustomersListFromDb');
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
            },
            customers() {
                return this.$store.state.customer.custmoersOfpatner
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
                // customers: ['Vodafone SK', 'Telenor SK'],
                selectedCustomer: null,

                selectedProduct: null,
                selectedManufacturer: null,
                selectedCategory: null,

                selectedProductOperator: null,
                productOperators: ['Vodafone', 'Telenor'],
                selectedProductCategory: null,
                selectedRepairType: null,
                repairTypes: ['Repair', 'Csere'],
                doa: false,

                arrivalDate: null,
                arrivedToCustomer: null,
                purchaseDate: null,
                description: 'ez a hibajelenség hogy nem indul a telóqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
            }
        }
    };
</script>
