<template>
  <MetaMask />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import MetaMask from './components/MetaMask.vue';

defineComponent({
  name: 'App',
  components: {
    MetaMask,
  },
});
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
