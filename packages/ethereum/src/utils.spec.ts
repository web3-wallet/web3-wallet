import mock from './mock';
import {
  isValidAccount,
  isValidChainId,
  parseChainId,
  toHexChainId,
  validateAccount,
  validateChainId,
} from './utils';

describe('utils', () => {
  describe('validateChainId', () => {
    let table = mock.chainIds.map((v) => [v]);
    test.each(table)('chainId: %i', (chainId: number) => {
      expect(validateChainId(chainId)).toBe(void 0);
    });

    table = mock.invalidChainIds.map((v) => [v]);
    test.each(table)('chainId: %i', (chainId: number) => {
      expect(() => {
        validateChainId(chainId);
      }).toThrow();
    });
  });
  describe('isValidChainId', () => {
    let table = mock.chainIds.map((v) => [v]);
    test.each(table)('chainId: %i', (chainId: number) => {
      expect(isValidChainId(chainId)).toBe(true);
    });

    table = mock.invalidChainIds.map((v) => [v]);
    test.each(table)('chainId: %i', (chainId: number) => {
      expect(isValidChainId(chainId)).toBe(false);
    });
  });

  describe('validateAccount', () => {
    let table = mock.accounts.map((v) => [v]);
    test.each(table)('account: %i', (account: string) => {
      expect(validateAccount(account)).toBe(account);
    });

    table = mock.invalidAccounts.map((v) => [v]);
    test.each(table)('account: %i', (account: string) => {
      expect(() => {
        validateAccount(account);
      }).toThrow();
    });
  });
  describe('isValidAccount', () => {
    let table = mock.accounts.map((v) => [v]);

    test.each(table)('account: %i', (account: string) => {
      expect(isValidAccount(account)).toBe(true);
    });

    table = mock.invalidAccounts.map((v) => [v]);
    test.each(table)('account: %i', (account: string) => {
      expect(isValidAccount(account)).toBe(false);
    });
  });
  describe('parseChainId', () => {
    const table: [number | string, number][] = [
      ['1', 1],
      ['2', 2],
      [3, 3],
      ['0x1', 1],
      ['0x19', 25],
      ['0x4', 4],
    ];
    test.each(table)(
      'chainId: %i',
      (unParsedChainId: string | number, parsedChainId: number) => {
        expect(parseChainId(unParsedChainId)).toBe(parsedChainId);
      },
    );
  });
  describe('toHexChainId', () => {
    const table: [number, string][] = [
      [1, '0x1'],
      [2, '0x2'],
      [4, '0x4'],
      [25, '0x19'],
      [338, '0x152'],
    ];
    test.each(table)('chainId: %i', (chainId: number, hexChainId: string) => {
      expect(toHexChainId(chainId)).toBe(hexChainId);
    });
  });
});
