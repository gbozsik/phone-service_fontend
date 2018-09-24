<template>
  <v-icon v-if="status == false" class="disabled" >block</v-icon>
  <v-icon v-else class="enabled">done</v-icon>
</template>

<script>

export default {
    props: {
        status:      { type: Boolean, default: false, required: false },
    },
}
</script>