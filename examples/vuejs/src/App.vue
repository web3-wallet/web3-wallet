<template>
  <MetaMask />
</template>

<script setup lang="ts">
// import { MAX_SAFE_CHAIN_ID } from '@web3-wallet/hello-world';
import { defineComponent } from 'vue';

import MetaMask from './components/MetaMask.vue';

// console.log(MAX_SAFE_CHAIN_ID);
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
