<template>
<v-app id="inspire">
  <Navigation />
  <Toolbar @side-icon-click="toggleNav()"/>
   
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center wrap row>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
    
  <Footer text="Tanfield Service Manager"/>
</v-app>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation'
import Toolbar from '@/components/Core/Toolbar'
import Footer from '@/components/Core/Footer'

export default {
  components: {
    Navigation,
    Toolbar,
    Footer
  },
  methods: {
    toggleNav() {
      this.$store.commit("navigation/toggleNav");
    }
  }
};
</script>