<template>
    <v-layout row wrap>
        <v-flex xs12 md6>
            <v-card>
                <v-card-text>
                    <h4 class="inputTitle">Munkalap</h4>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field label="Ügyfél munkaszám" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="Munkalap szám" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    :items="selectableCustomers"
                                    item-text="name"
                                    v-model="form.claim.selectedCustomer"
                                    label="Ügyfél"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field label="IMEI" v-model="form.claim.imei"></v-text-field>
                        </v-flex>

                        <v-flex xs2>
                            <v-checkbox
                                    v-model="form.claim.doa"
                                    label="DOA"
                                    @change="doaChanged()">
                            </v-checkbox>
                        </v-flex>

                        <v-flex xs10>
                            <v-combobox
                                    :disabled=this.form.teendoDisabled
                                    v-model="form.claim.selectedRepairType"
                                    :items="form.repairTypes"
                                    @change="selectedTeendoChanged()"
                                    label="Teendő">
                            </v-combobox>
                        </v-flex>

                        <v-flex xs4>
                            <v-menu ref="showDatePickerArrival"
                                    :close-on-content-click="false"
                                    v-model="form.showDatePickerArrival"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px">
                                <v-text-field
                                        slot="activator"
                                        v-model="form.claim.selectedArrivalDate"
                                        label="Érkezés dátuma"
                                        persistent-hint
                                        prepend-icon="event">
                                </v-text-field>
                                <v-date-picker
                                        v-model="form.claim.selectedArrivalDate"
                                        locale="hu-hu"
                                        :first-day-of-week="1"
                                        no-title @input="form.showDatePickerArrival = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs4>
                            <v-menu ref="showDatePickerPurchase"
                                    :close-on-content-click="false"
                                    v-model="form.showDatePickerPurchase"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px">
                                <v-text-field
                                        slot="activator"
                                        v-model="form.claim.selectedPurchaseDate"
                                        label="Vásárlás dátuma"
                                        persistent-hint
                                        prepend-icon="event">
                                </v-text-field>
                                <v-date-picker
                                        v-model="form.claim.selectedPurchaseDate"
                                        locale="hu-hu"
                                        :first-day-of-week="1"
                                        no-title @input="form.showDatePickerPurchase = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs4>
                            <v-menu ref="showDatePickerToCustomerDate"
                                    :close-on-content-click="false"
                                    v-model="form.showDatePickerToCustomerDate"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px">
                                <v-text-field
                                        slot="activator"
                                        v-model="form.claim.selectedDatePickerToCustomerDate"
                                        label="Érkezés dátuma"
                                        persistent-hint
                                        prepend-icon="event">
                                </v-text-field>
                                <v-date-picker
                                        v-model="form.claim.selectedDatePickerToCustomerDate"
                                        locale="hu-hu"
                                        :first-day-of-week="1"
                                        no-title @input="formshowDatePickerToCustomerDate = false">
                                </v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex xs2>
                            <v-checkbox
                                    v-model="form.claim.warranty"
                                    label="Garanciális">
                            </v-checkbox>
                        </v-flex>

                        <v-flex xs10>
                            <!-- Ide jön majd a garanciális teszter -->

                            <v-card v-if="hasWarranty" color="yellow">
                                <v-card-text><h3>A készülék valószínűleg garanciális!</h3></v-card-text>
                            </v-card>
                        </v-flex>

                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 md6>
            <v-card>
                <v-card-text>
                    <h4 class="inputTitle">Készülék</h4>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-select
                                    :items="selectableProductCategories"
                                    v-model="form.product.selectedProductCategory"
                                    item-text="name"
                                    label="Kategória"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    :items="selectableProducts"
                                    v-model="form.product.selectedProduct"
                                    @change="selectedProductChanged()"
                                    item-text="name"
                                    label="Model"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>

                        <v-flex xs12>
                            <v-combobox
                                    :items="selectableOperators"
                                    v-model="form.product.selectedPartnersOperator"
                                    item-text="name"
                                    label="Operátor">
                            </v-combobox>
                        </v-flex>
                    </v-layout>

                    <h4 class="inputTitle">Tartozékok</h4>
                    <v-layout wrap>

                        <v-flex xs3>
                            <v-checkbox
                                    v-model="form.product.hasAccumulator"
                                    label="Akkumulátor">
                            </v-checkbox>
                        </v-flex>
                        <v-flex xs3>
                            <v-checkbox
                                    v-model="form.product.hasCharger"
                                    label="Töltő">
                            </v-checkbox>
                        </v-flex>
                        <v-flex xs3>
                            <v-checkbox
                                    v-model="form.product.hasBackpanel"
                                    label="Hátlap">
                            </v-checkbox>
                        </v-flex>
                        <v-flex xs3>
                            <v-checkbox
                                    v-model="form.product.hasHeadset"
                                    label="Headset">
                            </v-checkbox>
                        </v-flex>
                    </v-layout>

                    <h4 class="inputTitle">Sérülések</h4>
                    <v-layout wrap>
                        <v-flex xs6 sm2>
                            <v-select
                                    :items="form.injuries"
                                    v-model="form.product.selectedBackpanelInjury"
                                    item-text="name"
                                    label="Hátlap"
                                    hint="Hátlap kondiciója"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                        <v-flex xs6 sm2>
                            <v-select
                                    :items="form.injuries"
                                    v-model="form.product.selectedScreenInjury"
                                    item-text="name"
                                    label="Kijelző"
                                    hint="Kijelző kondiciója"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                        <v-flex xs6 sm2>
                            <v-select
                                    :items="form.injuries"
                                    v-model="form.product.selectedCornersInjury"
                                    item-text="name"
                                    label="Sarkak"
                                    hint="Sarkak kondiciója"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                        <v-flex xs6 sm2>
                            <v-select
                                    :items="form.injuries"
                                    v-model="form.product.selectedKeypadInjury"
                                    item-text="name"
                                    label="Gombsor"
                                    hint="Gombsor kondiciója"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                        <v-flex xs6 sm4>
                            <v-select
                                    :items="form.injuries"
                                    v-model="form.product.selectedOthersInjury"
                                    item-text="name"
                                    label="Egyéb"
                                    hint="Egyéb kondiciója"
                                    single-line
                                    return-object>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-card>
                <v-card-text>
                    <h4 class="inputTitle">Hibalerírás</h4>

                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-textarea
                                    name="description"
                                    label=""
                                    v-model="form.fault.description"
                                    hint="Hiba leírása magyar nyelven">
                            </v-textarea>
                        </v-flex>
                        <!--<v-flex xs12 md6>-->
                        <!--<v-textarea-->
                        <!--name="description-foreign"-->
                        <!--label="Idegen nyelv"-->
                        <!--v-model="form.fault.foreign_description"-->
                        <!--hint="Hiba leírása idegen nyelven">-->
                        <!--</v-textarea>-->
                        <!--</v-flex>-->
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'

    export default {
        mounted() {
            this.$store.dispatch("customer/getCustomersOfPartner");
            this.$store.dispatch("product/getProductsList");
            this.$store.dispatch("operat/getOperatorsOfPartner");
        },

        computed: {
            selectableProductCategories() {
                return this.$store.getters['product/categories']
            },
            selectableProducts() {
                if (_.isEmpty(this.selectedProductCategory)) {
                    return this.$store.state.product.products
                }
                else {
                    return this.$store.state.product.products.filter(product => {
                        return product.productCategory.name == this.form.product.selectedProductCategory.name
                    })
                }
            },
            selectableCustomers() {
                return this.$store.state.customer.customers
            },
            selectableOperators() {
                return this.$store.state.operat.operators
            },
            hasWarranty() {
                if (!_.isEmpty(this.form.claim.selectedPurchaseDate) && !_.isEmpty(this.form.claim.selectedDatePickerToCustomerDate)) {
                    const purchDate = moment(this.form.claim.selectedPurchaseDate)
                    const pickDate = moment(this.form.claim.selectedDatePickerToCustomerDate)
                    const diffMonths = pickDate.diff(purchDate, 'months')
                    if (diffMonths <= 24) return true
                }
                return false
            }

        },
        methods: {
            doaChanged() {
                // Ha be van pipálva a javítás egyértelműen csak diagnostic lehet
                console.log(this.form.claim.doa)
                if (this.form.claim.doa == true) {
                    this.form.claim.selectedRepairType = 'Bevizsgálás (DOA)'
                    this.form.whatTodo = false
                    this.form.teendoDisabled = true
                } else {
                    this.form.teendoDisabled = false
                    this.form.claim.selectedRepairType = 'Bevizsgálás'
                }
            },
            selectedProductChanged() {
                if (_.isEmpty(this.form.product.selectedProductCategory)) {
                    this.form.product.selectedProductCategory = this.form.product.selectedProduct.productCategory
                }
            },
            //ezt a whatTodo booleant kell elküldeni a backendnek, hogy tudja bevizsgálás vagy javítás
            //akkor hivódik meg a method ha változtatunk a teendőn
            selectedTeendoChanged() {
                    if (this.form.claim.selectedRepairType == 'Bevizsgálás') {
                        this.form.whatTodo = false
                    } else {
                        if (this.form.claim.selectedRepairType == 'Javítás')
                            this.form.whatTodo = true
                    }
            }
        },
        data() {
            return {
                form: {
                    claim: {
                        selectedCustomer: null,
                        selectedRepairType: null,
                        selectedArrivalDate: moment().format('YYYY-MM-DD'),
                        selectedDatePickerToCustomerDate: "",
                        selectedPurchaseDate: "",
                        imei: "",
                        doa: false,
                        warranty: false,
                    },
                    product: {
                        selectedProduct: null,
                        selectedProductCategory: null,
                        selectedPartnersOperator: null,
                        hasAccumulator: false,
                        hasBackpanel: false,
                        hasCharger: false,
                        hasHeadset: false,
                        selectedBackpanelInjury: null,
                        selectedScreenInjury: null,
                        selectedCornersInjury: null,
                        selectedKeypadInjury: null,
                        selectedOthersInjury: null,
                    },
                    fault: {
                        description: "",
                        foreign_description: "",
                    },
                    injuries: ['Karcmentes', 'Karcos', 'Törött'],
                    // repairTypes: false,
                    repairTypes: ['Bevizsgálás', 'Javítás'],
                    showDatePickerArrival: false,
                    showDatePickerToCustomerDate: false,
                    showDatePickerPurchase: false,
                    teendoDisabled: false,
                    whatTodo: false
                }


            }
        }
    };
</script>
