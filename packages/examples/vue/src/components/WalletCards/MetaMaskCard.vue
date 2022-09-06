<template>
  <div class="wallet-metamask">
    <WalletCard
      :account="account"
      :chain-id="chainId"
      :is-active="isActive"
      :is-activating="isActivating"
    />
    <div style="margin-top: 10px">
      <button @click="connect(1)">connect(1)</button>
      <button @click="connect(4)">connect(4)</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';

import { metaMask } from '../../wallets';
import WalletCard from './WalletCard.vue';

const { connector, account, chainId, isActivating, isActive } = metaMask;

const connect = (chainId: number) => {
  connector.connect(chainId);
};

onMounted(() => {
  connector.autoConnect();
});

defineComponent({
  name: 'MetaMask',
  components: {
    WalletCard,
  },
});
</script>

<style scoped></style>
