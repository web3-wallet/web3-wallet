import { createStore } from '@vvswallet/store'
import type { RequestArguments, Store } from '@vvswallet/types'
import EventEmitter from 'node:events'

import { MockEIP1193Provider } from '../../eip1193/src/index.spec'
import { WalletConnect } from '.'

// necessary because walletconnect returns chainId as a number
class MockMockWalletConnectProvider extends MockEIP1193Provider {
  public connector = new EventEmitter()

  public eth_chainId_number = jest.fn((chainId?: string) =>
    chainId === undefined ? chainId : Number.parseInt(chainId, 16)
  )

  public request(x: RequestArguments): Promise<unknown> {
    if (x.method === 'eth_chainId') {
      return Promise.resolve(this.eth_chainId_number(this.chainId))
    } else {
      return super.request(x)
    }
  }
}

jest.mock('@walletconnect/ethereum-provider', () => MockMockWalletConnectProvider)

const chainId = '0x1'
const accounts: string[] = []

describe('WalletConnect', () => {
  let store: Store
  let connector: WalletConnect
  let mockConnector: MockMockWalletConnectProvider

  describe('works', () => {
    beforeEach(async () => {
      const s = createStore()
      store = s.store;
      connector = new WalletConnect({ actions: s.actions, options: { rpc: {} } })
    })

    test('#activate', async () => {
      await connector.connectEagerly().catch(() => {
        /**
         *
         */
      })
      mockConnector = connector.provider as unknown as MockMockWalletConnectProvider
      mockConnector.chainId = chainId
      mockConnector.accounts = accounts
      await connector.activate()

      expect(store.getState()).toEqual({
        chainId: Number.parseInt(chainId, 16),
        accounts,
        activating: false,
        error: undefined,
      })
    })
  })
})
