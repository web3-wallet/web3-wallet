<template>
  <MetaMaskCard />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { MetaMaskCard } from './components';

defineComponent({
  name: 'App',
  components: {
    MetaMaskCard,
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
