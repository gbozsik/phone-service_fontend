<template>
  <v-toolbar :color="color" dark fixed app>
      <v-toolbar-side-icon @click.stop="$emit('side-icon-click')"></v-toolbar-side-icon>
      <PartnerChooser />
      <v-spacer></v-spacer>
   </v-toolbar>
</template>

<script>
  import PartnerChooser from '@/components/Partners/PartnerChooser'

  export default {
    components: {
      PartnerChooser
    },
    computed: {
      color() {
        return this.$store.getters['partner/color']
      },
    },
  }

</script>
