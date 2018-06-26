<template>
  <v-navigation-drawer fixed v-model="$store.state.navigation.show" app>
     <UserAvatar />
     <v-divider :inset="false"></v-divider>
     <NavItems />
  </v-navigation-drawer>
</template>

<script>
import UserAvatar from '@/components/Navigation/UserAvatar';
import NavItems from '@/components/Navigation/NavItems';

export default {
  components: { 
    UserAvatar,
    NavItems,
  },
  computed: {
   
  }
};
</script>