import { PublicKey } from '@solana/web3.js';

export function validateAccount(account: string): never | string {
  const publicKey = new PublicKey(account);
  PublicKey.isOnCurve(publicKey.toBytes());
  return publicKey.toBase58();
}

export function isValidAccount(account: string): boolean {
  try {
    validateAccount(account);
    return true;
  } catch (_) {
    return false;
  }
}
