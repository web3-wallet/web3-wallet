<template>
  <div class="wallet-metamask">
    <WalletCard
      :account="account"
      :chain-id="chainId"
      :is-active="isActive"
      :is-activating="isActivating"
    />
    <div style="margin-top: 10px">
      <button @click="connect">connect</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { metaMask } from '../connectors/metaMask';
import WalletCard from './WalletCard.vue';

const {
  connector,
  hooks: { useChainId, useAccount, useIsActive, useIsActivating },
} = metaMask;

const chainId = useChainId();
const account = useAccount();
const isActive = useIsActive();
const isActivating = useIsActivating();

const connect = () => {
  connector.activate(1);
};

defineComponent({
  name: 'MetaMask',
  components: {
    WalletCard,
  },
});
</script>

<style scoped></style>
