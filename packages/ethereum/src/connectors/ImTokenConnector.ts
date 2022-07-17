import { type InjectedProvider, InjectedConnector } from './InjectedConnector';

export type ImTokenProvider = InjectedProvider & {
  isImToken?: boolean;
};

const providerFilter = (p: ImTokenProvider) => !!p.isImToken;

export class ImTokenConnector extends InjectedConnector {
  public override detectProvider = async (): Promise<ImTokenProvider> => {
    return await super.detectProvider(providerFilter);
  };
}
