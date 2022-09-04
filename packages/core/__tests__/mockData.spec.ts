/* eslint-disable jest/no-export */
import { utils } from '../src';

// Get around: "Your test suite must contain at least one test" error.
// eslint-disable-next-line jest/no-disabled-tests, jest/expect-expect
test.skip('skip', () => {});

const chainIds = [1, 4, 25, 338, 205, 100, 8888];
const hexChainIds = chainIds.map((v) => `0x${v.toString(16)}`);

const invalidChainIds = [
  0,
  -1,
  -10,
  1.5,
  10.5,
  -3.5,
  utils.MAX_SAFE_CHAIN_ID + 1,
  utils.MAX_SAFE_CHAIN_ID + 10,
];

const accounts = [
  '0x984286c6085a60f2124F2AC5FA668ED026839e4f',
  '0x1D988f648fC4BcE623680679a1CD5e061DF3de15',
  '0x4361783eEC042f17e2E65275616c9A360aaC0b87',
  '0x68fd9b1136F3c6028EE80F73071015CA11c73B5e',
  '0x3e368f3Efb64e8980361549B3a448f69ad70DFF7',
];

const invalidAccounts = [
  'invalid account',
  'cro3e368f3Efb64e8980361549B3a448f69ad70DFF7',
  '3e368f3Efb64e8980361549B3a448f69ad70DFH7',
  '0x3e368f3Efb64e8980361549B3a448f69ad70DFF7_X',
  '0x3e368f3Efb64e8980361549B3a448f6',
];

export default {
  chainIds,
  hexChainIds,
  accounts,
  invalidChainIds,
  invalidAccounts,
};
