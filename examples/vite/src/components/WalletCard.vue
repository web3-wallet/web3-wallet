<script setup lang="ts">
defineProps<{
  account?: string;
  chainId?: number;
  isActive: boolean;
  isActivating: boolean;
}>();
</script>

<template>
  <div class="wallet-card">
    <h2>chainId: {{ chainId }}</h2>
    <h2>account: {{ account }}</h2>
    <h2>isActive: {{ isActive }}</h2>
    <h2>isActivating: {{ isActivating || 'false' }}</h2>
  </div>
</template>

<style scoped></style>
