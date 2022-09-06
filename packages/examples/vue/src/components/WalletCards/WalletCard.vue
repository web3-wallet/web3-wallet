<script setup lang="ts">
defineProps<{
  account?: string;
  chainId?: number;
  isConnected: boolean;
  isConnecting: boolean;
}>();
</script>

<template>
  <div class="wallet-card">
    <h2>chainId: {{ chainId }}</h2>
    <h2>account: {{ account }}</h2>
    <h2>isConnected: {{ isConnected }}</h2>
    <h2>isConnecting: {{ isConnecting || 'false' }}</h2>
  </div>
</template>

<style scoped></style>
