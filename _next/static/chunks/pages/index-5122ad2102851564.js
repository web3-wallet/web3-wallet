(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2761:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5330)}])},7144:function(e,t,n){"use strict";n.d(t,{A:function(){return C}});var i=n(7264),r=n(2569),o=n(9240),s=n(5250),c=n(4559),a=function(){return(0,s.jsx)(c.xu,{})},u=n(644),d=n(3675),h=n(576),l=n.n(h),p=(n(79),function(e){var t=e.href,n=e.children,a=e.chakraLinkProps,u=(0,o.Z)(e,["href","children","chakraLinkProps"]);return(0,s.jsx)(l(),(0,r.Z)((0,i.Z)({href:t},u),{passHref:!0,children:(0,s.jsx)(c.rU,(0,r.Z)((0,i.Z)({_hover:{textDecoration:"none",color:"red.500"},display:"flex",textShadow:"1px 1px 2px #fff"},a),{children:n}))}))}),v={src:"/web3-wallet//_next/static/media/logo.ff6abe39.svg",height:256,width:256},f=n(1275),m=n.n(f),w=function(){return(0,s.jsx)(p,{chakraLinkProps:{flexShrink:0},href:"/",children:(0,s.jsx)(m(),{width:"32px",height:"32px",src:v,alt:"web3 wallet logo"})})},g=function(){return(0,s.jsxs)(c.kC,{px:6,py:3,gap:{base:6,md:8,lg:10},bg:"green.300",alignItems:"center",fontWeight:"medium",children:[(0,s.jsx)(w,{}),(0,s.jsxs)(c.kC,{gap:{base:6,md:8,lg:10},children:[(0,s.jsx)(p,{href:"/showcase",children:"Showcase"}),(0,s.jsx)(p,{href:"/wallets",children:"Wallets"}),(0,s.jsx)(p,{href:"/plugins",children:"Plugins"}),(0,s.jsx)(p,{href:"/docs",children:"Docs"}),(0,s.jsx)(p,{href:"/docs-api",children:"API"})]}),(0,s.jsx)(c.kC,{flexGrow:"1",justifyContent:"flex-end",children:(0,s.jsx)(p,{href:"https://github.com/web3-wallet/web3-wallet",chakraLinkProps:{display:"flex",justifySelf:"end",target:"_blank"},children:(0,s.jsx)(u.JO,{lineHeight:"2rem",fontSize:"1.4rem",as:d.idJ})})})]})},C=function(e){var t=e.children,n=(0,o.Z)(e,["children"]);return(0,s.jsxs)(c.xu,(0,r.Z)((0,i.Z)({minH:"100vh"},n),{children:[(0,s.jsx)(g,{}),(0,s.jsx)(c.xu,{margin:"0 auto",maxW:"1180px",px:{base:6,xl:0},children:t}),(0,s.jsx)(c.LZ,{my:10}),(0,s.jsx)(a,{})]}))}},5330:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Ze}});var i=n(5250),r=n(7075),o=n(4559),s=n(9427),c=n(644),a=n(7144),u=n(2519),d=n(2172),h={name:"Ether",symbol:"ETH",decimals:18},l={name:"Matic",symbol:"MATIC",decimals:18};function p(e){var t=v[e];return function(e){return!!e.nativeCurrency}(t)?{chainId:e,chainName:t.name,nativeCurrency:t.nativeCurrency,rpcUrls:t.urls,blockExplorerUrls:t.blockExplorerUrls}:e}var v={1:{urls:[d.env.infuraKey?"https://mainnet.infura.io/v3/".concat(d.env.infuraKey):"",d.env.alchemyKey?"https://eth-mainnet.alchemyapi.io/v2/".concat(d.env.alchemyKey):"","https://cloudflare-eth.com"].filter((function(e){return!!e})),name:"Mainnet"},3:{urls:[d.env.infuraKey?"https://ropsten.infura.io/v3/".concat(d.env.infuraKey):""].filter((function(e){return!!e})),name:"Ropsten"},4:{urls:[d.env.infuraKey?"https://rinkeby.infura.io/v3/".concat(d.env.infuraKey):""].filter((function(e){return!!e})),name:"Rinkeby"},5:{urls:[d.env.infuraKey?"https://goerli.infura.io/v3/".concat(d.env.infuraKey):""].filter((function(e){return!!e})),name:"G\xf6rli"},25:{urls:["https://evm-cronos.crypto.org"],name:"Cronos"},338:{urls:["https://evm-t3.cronos.org"],name:"Cronos Test"},42:{urls:[d.env.infuraKey?"https://kovan.infura.io/v3/".concat(d.env.infuraKey):""].filter((function(e){return!!e})),name:"Kovan"},10:{urls:[d.env.infuraKey?"https://optimism-mainnet.infura.io/v3/".concat(d.env.infuraKey):"","https://mainnet.optimism.io"].filter((function(e){return!!e})),name:"Optimism",nativeCurrency:h,blockExplorerUrls:["https://optimistic.etherscan.io"]},69:{urls:[d.env.infuraKey?"https://optimism-kovan.infura.io/v3/".concat(d.env.infuraKey):"","https://kovan.optimism.io"].filter((function(e){return!!e})),name:"Optimism Kovan",nativeCurrency:h,blockExplorerUrls:["https://kovan-optimistic.etherscan.io"]},42161:{urls:[d.env.infuraKey?"https://arbitrum-mainnet.infura.io/v3/".concat(d.env.infuraKey):"","https://arb1.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum One",nativeCurrency:h,blockExplorerUrls:["https://arbiscan.io"]},421611:{urls:[d.env.infuraKey?"https://arbitrum-rinkeby.infura.io/v3/".concat(d.env.infuraKey):"","https://rinkeby.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum Testnet",nativeCurrency:h,blockExplorerUrls:["https://testnet.arbiscan.io"]},137:{urls:[d.env.infuraKey?"https://polygon-mainnet.infura.io/v3/".concat(d.env.infuraKey):"","https://polygon-rpc.com"].filter((function(e){return!!e})),name:"Polygon Mainnet",nativeCurrency:l,blockExplorerUrls:["https://polygonscan.com"]},80001:{urls:[d.env.infuraKey?"https://polygon-mumbai.infura.io/v3/".concat(d.env.infuraKey):""].filter((function(e){return!!e})),name:"Polygon Mumbai",nativeCurrency:l,blockExplorerUrls:["https://mumbai.polygonscan.com"]}},f=Object.keys(v).reduce((function(e,t){var n=v[Number(t)].urls[0];return e[Number(t)]=n,e}),{}),m=n(9063),w=n(6832);const g=e=>{if(!Number.isInteger(e)||e<=0||e>0xfffffffffffec)throw new Error(`Invalid chainId ${e}`)},C=e=>"number"===typeof e?e:Number.parseInt(`${e}`,`${e}`.startsWith("0x")?16:10),x=e=>`0x${e.toString(16)}`,y={isConnecting:!1,chainId:void 0,accounts:void 0};class b extends Error{constructor(e="Provider not found"){super(e),this.name=b.name,Object.setPrototypeOf(this,b.prototype)}}class j{constructor(e,t){const{store:n,actions:i}=(()=>{const e=(0,w.Z)()((()=>y));let t=0;return{store:e,actions:{startConnection:function(){const n=++t;return e.setState({isConnecting:!0}),()=>{t===n&&e.setState({isConnecting:!1})}},update:function(n){if(void 0!==n.chainId&&g(n.chainId),void 0!==n.accounts)for(let e=0;e<n.accounts.length;e++)n.accounts[e]=(0,m.Kn)(n.accounts[e]);t++,e.setState((e=>{const t=n.chainId??e.chainId,i=n.accounts??e.accounts;let r=e.isConnecting;return r&&t&&i&&(r=!1),{chainId:t,accounts:i,isConnecting:r}}))},resetState:()=>{e.setState({...y})}}}})();this.name=e,this.store=n,this.actions=i,this.options=t,this.providerNotFoundError=new b(`${e} provider not found`)}async lazyInitialize(){await this.detectProvider(),this.removeEventListeners=this.addEventListeners()}async autoConnect(){const e=this.actions.startConnection();try{await this.lazyInitialize();const[t,n]=await Promise.all([this.requestChainId(),this.requestAccounts()]);if(!n.length)throw new Error("No accounts returned");this.updateChainId(t),this.updateAccounts(n)}catch(t){return console.debug("Could not auto connect",t),!1}finally{e()}return!0}async autoConnectOnce(){return this.autoConnectOncePromise||(this.autoConnectOncePromise=this.autoConnect()),await this.autoConnectOncePromise}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;const[i,r]=await Promise.all([this.requestChainId(),this.requestAccounts()]),o=C(i),s="number"===typeof e?e:e?.chainId;if(!s||o===s)return this.updateChainId(o),void this.updateAccounts(r);try{return await this.switchChain(s),this.actions.update({chainId:s,accounts:r})}catch(n){const t=n,i=(e=>!(e=>"number"===typeof e)(e))(e)&&(4902===t.code||-32603===t.code);if(!this.addChain||!i)throw t;await this.addChain(e),await this.connect(e.chainId)}}finally{t()}}async disconnect(e=!1){this.actions.resetState()}async watchAsset(e){if(!this.provider)throw this.providerNotFoundError;if(!(await this.provider.request({method:"wallet_watchAsset",params:{type:"ERC20",options:e}})))throw new Error(`Failed to watch ${e.symbol}`)}updateChainId(e){this.actions.update({chainId:C(e)})}updateAccounts(e){this.actions.update({accounts:e})}onConnect({chainId:e}){this.updateChainId(e)}onDisconnect(e){this.options?.onError?.(e)}onChainChanged(e){this.updateChainId(e)}onAccountsChanged(e){this.updateAccounts(e)}addEventListeners(){if(!this.provider)return;const e=this.onConnect.bind(this),t=this.onDisconnect.bind(this),n=this.onChainChanged.bind(this),i=this.onAccountsChanged.bind(this);return"function"===typeof this.provider.on?(this.provider.on("connect",e),this.provider.on("disconnect",t),this.provider.on("chainChanged",n),this.provider.on("accountsChanged",i)):(this.provider.addListener("connect",e),this.provider.addListener("disconnect",t),this.provider.addListener("chainChanged",n),this.provider.addListener("accountsChanged",i)),()=>{this.provider&&("function"===typeof this.provider.off?(this.provider.off("connect",e),this.provider.off("disconnect",t),this.provider.off("chainChanged",n),this.provider.off("accountsChanged",i)):"function"===typeof this.provider.removeListener&&(this.provider.removeListener("connect",e),this.provider.removeListener("disconnect",t),this.provider.removeListener("chainChanged",n),this.provider.removeListener("accountsChanged",i)))}}async switchChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:x(e)}]})}async addChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_addEthereumChain",params:[{...e,chainId:x(e.chainId)}]})}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){console.debug("Failed to request accounts with 'eth_requestAccounts', try to fallback to 'eth_accounts'");return await this.provider.request({method:"eth_accounts"})}}async requestChainId(){if(!this.provider)throw this.providerNotFoundError;return await this.provider.request({method:"eth_chainId"})}}class I extends j{async detectProvider(e=(()=>!0)){this.provider&&this.provider;const t=await n.e(934).then(n.t.bind(n,1934,23)),i=await t.default();if(!i)throw this.providerNotFoundError;let r=i;if(r=i.providers?.length?i.providers?.find(e):r&&e(r)?r:void 0,!r)throw this.providerNotFoundError;return this.provider=r,r}}const k=e=>!!e.isDesktopWallet;const E=async(e=40,t=50)=>{const n=S();return n||0===e?n:(await(i=t,new Promise((e=>{setTimeout((()=>{e()}),i)}))),await E(e-1,t));var i},S=()=>{if("undefined"!==typeof window)return window.deficonnectProvider?window.deficonnectProvider:void 0};class P extends j{constructor(e){super("DeFi Wallet",e)}async detectProvider(){this.provider&&this.provider;const e=await E();if(!e)throw this.providerNotFoundError;return this.provider=e,this.provider}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;await this.provider.connect({...this.options.providerOptions,chainId:e});if(e!==C(this.provider.chainId)){const t=C(e);await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:t}]})}}catch(n){throw t(),n}finally{this.provider?.chainId&&this.updateChainId(this.provider?.chainId),this.provider?.accounts&&this.updateAccounts(this.provider?.accounts)}}}const W=e=>!!e.isTrust&&window.navigator?.userAgent?.includes("DeFiWallet");class N extends I{constructor(){super("DeFi Wallet")}async detectProvider(){return await super.detectProvider(W)}}const A=e=>!!e.isMetaMask;var O=n(6498),_=n(8023);const K="@web3-wallet/plugin-connection-status-react";var D;!function(e){e.Untouched="Untouched",e.Connected="Connected",e.Disconnected="Disconnected"}(D||(D={}));const F={connectionStatus:D.Untouched};var L;!function(e){e.Untouched="Untouched",e.Connected="Connected",e.Disconnected="Disconnected"}(L||(L={}));var Z=n(79);const M=(e,t={})=>{const{defaultCurrentWallet:n,persistKey:i="@web3-wallet"}=t;if(!e.length)throw new Error("wallets can't be empty");const r={connectionStatus:L.Untouched,currentWallet:n||e[0].name},o=(0,O.ZP)()((0,_.tJ)((()=>r),{name:i,version:0})),s=()=>o((e=>e.currentWallet)),c=()=>{const t=o.getState().currentWallet;return e.find((e=>e.name===t))??e[0]};return{useName:s,switchCurrentWallet:t=>{e.find((e=>e.name===t))?o.setState({currentWallet:t}):console.debug(`Wallet '${t}' don't exists`)},useConnectionStatus:()=>o((e=>e.connectionStatus)),connect:async(...e)=>{const t=c(),n=await t.connect(...e);return o.setState({connectionStatus:L.Connected}),n},autoConnect:async(...e)=>{const t=c(),n=await t.autoConnect(...e);return o.getState().connectionStatus===L.Disconnected?(console.debug("connectionId don't exists, auto connect is suppressed"),!1):(o.setState({connectionStatus:L.Connected}),n)},autoConnectOnce:async(...e)=>{const t=c();if(o.getState().connectionStatus===L.Disconnected)return console.debug("connectionId don't exists, auto connect is suppressed"),!1;const n=await t.autoConnectOnce(...e);return o.setState({connectionStatus:L.Connected}),n},disconnect:async(...e)=>{const t=c(),n=await t.disconnect(...e);return o.setState({connectionStatus:L.Disconnected}),n},watchAsset:(...e)=>c().watchAsset(...e),$getStore:(...e)=>c().$getStore(...e),$getProvider:(...e)=>c().$getProvider(...e),getPlugin:(...e)=>c().getPlugin(...e),usePlugin:(...e)=>(()=>{const e=s();return(0,Z.useMemo)((()=>c()),[e])})().getPlugin(...e),...(()=>{const t={},{useChainId:n,useAccount:i,useAccounts:r,useENSName:s,useENSNames:c,useIsConnected:a,useIsConnecting:u,useProvider:d}=e[0],h={useChainId:n,useAccount:i,useAccounts:r,useENSName:s,useENSNames:c,useIsConnected:a,useIsConnecting:u,useProvider:d};for(const l of Object.keys(h))t[l]=(...t)=>{let n;const i=o.getState().currentWallet;for(const r of e){const e=(0,r[l])(...t);r.name===i&&(n=e)}return n};return t})()}};let U,q=!1;const z=()=>{const[e,t]=(0,Z.useState)(void 0!==U);return(0,Z.useEffect)((()=>{if(e)return;let i=!1;return async function(){if(q)return U;q=!0;try{const e=await n.e(610).then(n.bind(n,6610));U=e.Web3Provider}catch{console.debug("@ethersproject/providers not available")}}().then((()=>{i||t(!0)})),()=>{i=!0}}),[e]),U};function $(e,t=[]){const[n,i]=(0,Z.useState)();return(0,Z.useEffect)((()=>{if(e&&t.length){let n=!1;return Promise.all(t.map((t=>e.lookupAddress(t)))).then((e=>{n||i(e.map((e=>e||void 0)))})).catch((e=>{n||(console.debug("Could not fetch ENS names",e),i(new Array(t.length).fill(void 0)))})),()=>{n=!0,i(void 0)}}}),[e,t]),n??new Array(t.length).fill(void 0)}const T=({useChainId:e,useAccounts:t,useIsConnecting:n})=>({useAccount:()=>t()?.[0],useIsConnected:()=>(({chainId:e,accounts:t,isConnecting:n})=>Boolean(e&&t?.length&&!n))({chainId:e(),accounts:t(),isConnecting:n()})}),B=(e,t)=>void 0===e&&void 0===t||(void 0!==e||void 0===t)&&((void 0===e||void 0!==t)&&(e?.length===t?.length&&!!e?.every(((e,n)=>e===t?.[n]))));const J=e=>{const t=(e=>({name:e.name,$getProvider:()=>e.provider,$getStore:()=>e.store,connect:(...t)=>e.connect(...t),autoConnect:(...t)=>e.autoConnect(...t),autoConnectOnce:(...t)=>e.autoConnectOnce(...t),disconnect:(...t)=>e.disconnect(...t),watchAsset:(...t)=>e.watchAsset(...t)}))(e),n=(0,O.ZP)(t.$getStore()),i=(r=n,{useChainId:()=>r((e=>e.chainId)),useAccounts:()=>r((e=>e.accounts),B),useIsConnecting:()=>r((e=>e.isConnecting))});var r;const o=T(i),s=((e,{useAccounts:t,useChainId:n},{useAccount:i,useIsConnected:r})=>({useProvider:t=>{const i=r(),o=n(),s=z();return(0,Z.useMemo)((()=>{if(s&&e.provider)return new s(e.provider,t)}),[s,i,o,t])},useENSNames:e=>$(e,t()),useENSName:e=>{const t=i();return $(e,(0,Z.useMemo)((()=>void 0===t?[]:[t]),[t]))?.[0]}}))(e,i,o);return{...t,...i,...o,...s}};var H=n(8774),R=n.n(H);var G,X=[new class extends I{constructor(e){super("MetaMask",e)}async detectProvider(){return await super.detectProvider(A)}},(G={extension:{chainType:"eth",appName:"@web3-wallet example",chainId:1,rpcUrls:{}}},(()=>{if("undefined"===typeof window)return!1;const e=navigator.userAgent||navigator.vendor||window.opera||"";return!!/android/i.test(e)||!!(/iPhone|iPad|iPod/i.test(e)||/Mac/i.test(e)&&"ontouchend"in document)||!!/BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(e)})()?new N:new P({providerOptions:G.extension})),new class extends j{constructor(e){super("Coinbase Wallet",e)}async detectProvider(){this.provider&&this.provider;const e=await Promise.all([n.e(375),n.e(59),n.e(116)]).then(n.bind(n,7059)),{url:t,...i}=this.options.providerOptions;return this.coinbaseWallet=new e.default(i),this.provider=this.coinbaseWallet.makeWeb3Provider(t),this.provider}get connected(){return!!this.provider?.selectedAddress}async autoConnect(){return await this.lazyInitialize(),this.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(e=!0){await super.disconnect(),e&&await(this.coinbaseWallet?.disconnect())}}({providerOptions:{appName:"@web3-wallet example",reloadOnDisconnect:!1,url:f[1]}}),new class extends I{constructor(e){super("Crypto.com Desktop Wallet",e)}async detectProvider(){return await super.detectProvider(k)}},new class extends j{constructor(e){super("WalletConnect",e),this.events=new(R()),this.onDisplayUri=(e,t)=>{this.events.emit("URI_AVAILABLE",t.params[0])}}async detectProvider(){if(this.provider)return this.provider;const e=new((await Promise.all([n.e(375),n.e(761),n.e(571)]).then(n.bind(n,4761))).default)({...this.options.providerOptions});return this.provider=e,e}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){throw"User closed modal"===e.message&&await this.disconnect(),e}}addEventListeners(){if(!this.provider)return;const e=super.addEventListeners(),t=this.onDisplayUri.bind(this);return this.provider.connector.on("display_uri",t),()=>{this.provider&&(e?.(),"function"===typeof this.provider.off?this.provider.off("display_uri",t):"function"===typeof this.provider.removeListener&&this.provider.removeListener("display_uri",t))}}async autoConnect(){return await this.lazyInitialize(),this.provider?.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(e=!0){super.disconnect(),e&&(this.removeEventListeners?.(),await(this.provider?.disconnect()),this.provider=void 0)}}({providerOptions:{rpc:f}})],V=[(e=>()=>{const{isPersist:t=!1,persistKey:n=K}=e||{};let i;i=t?(0,O.ZP)()((0,_.tJ)((()=>F),{name:n,version:0})):(0,O.ZP)()((()=>F));return{name:K,middleware:{connect:()=>e=>async(...t)=>{const n=await e(...t);return i.setState({connectionStatus:D.Connected}),n},autoConnect:()=>e=>async(...t)=>{const n=await e(...t);return i.setState({connectionStatus:D.Connected}),n},autoConnectOnce:()=>e=>async(...t)=>{const n=await e(...t);return i.setState({connectionStatus:D.Connected}),n},disconnect:()=>e=>async(...t)=>{const n=await e(...t);return i.setState({connectionStatus:D.Disconnected}),n}},api:{hooks:{useConnectionStatus:()=>i((e=>e.connectionStatus))}}}})()],Q=new class{constructor(e,t){if(this.pluginMap={},this.wallets=[],!e.length)throw new Error("connectors can't be empty");this.options=t,this.connectors=e,this.connectors.forEach((e=>{this.createWallet(e)})),this.currentWallet=M(this.wallets,t?.currentWalletOptions)}getCurrentWallet(){return this.currentWallet}hasPlugin(e,t){return!!this.pluginMap[e]?.[t]}hasWallet(e){return this.wallets.some((t=>t.name===e))}getWallet(e){if(!this.hasWallet(e))throw new Error(`Wallet ${e} don't exists`);return this.wallets.find((t=>t.name===e))}getWallets(){return this.wallets.slice(0)}getPlugin(e,t){if(!this.hasPlugin(e,t))throw new Error(`Can't find plugin '${t}'`);return this.pluginMap[e][t]}createWallet(e){if(this.hasWallet(e.name))throw new Error(`Wallet '${e.name}' already exits`);let t={...J(e),getPlugin:e=>this.getPlugin(t.name,e)};return this.options?.plugins?.forEach((e=>{const n=e(t);this.pluginMap[t.name]=this.pluginMap[t.name]??{},this.pluginMap[t.name][n.name]=n;const{middleware:i}=n;if(i){const{connect:e,autoConnect:n,autoConnectOnce:r,disconnect:o}=i;t={...t,connect:e?e(t)(t.connect):t.connect,autoConnect:n?n(t)(t.autoConnect):t.autoConnect,autoConnectOnce:r?r(t)(t.autoConnectOnce):t.autoConnectOnce,disconnect:o?o(t)(t.disconnect):t.disconnect}}})),this.wallets.push(t),t}}(X,{plugins:V}),Y=Q.getWallets(),ee=Q.getCurrentWallet(),te=(0,u.Z)(Y,5),ne=te[0],ie=(te[1],te[2],te[3],te[4],n(2825)),re=n(7264),oe=n(2569),se=n(9240),ce=function(e){var t=e.account,n=e.leadingChars,r=void 0===n?4:n,s=e.tailingChars,c=void 0===s?4:s,a=(0,se.Z)(e,["account","leadingChars","tailingChars"]);return t?(0,i.jsxs)(o.xv,(0,oe.Z)((0,re.Z)({as:"span"},a),{children:[t.slice(0,r),"...",t.slice(-c)]})):null},ae=function(e){var t=e.accounts,n=e.provider,r=e.ENSNames,s=function(e,t){var n=(0,Z.useState)(),i=n[0],r=n[1];return(0,Z.useEffect)((function(){if(e&&(null===t||void 0===t?void 0:t.length)){var n=!1;return Promise.all(t.map((function(t){return e.getBalance(t)}))).then((function(e){n||r(e)})),function(){n=!0,r(void 0)}}}),[e,t]),i}(n,t);return void 0===t?null:0===t.length?(0,i.jsxs)(o.kC,{gap:2,children:[(0,i.jsx)(o.xv,{children:"Account:"}),(0,i.jsx)(o.xv,{children:"None"})]}):(0,i.jsx)(i.Fragment,{children:t.map((function(e,t){return(null===r||void 0===r?void 0:r[t])?null===r||void 0===r?void 0:r[t]:(0,i.jsxs)(Z.Fragment,{children:[(0,i.jsxs)(o.kC,{gap:2,children:[(0,i.jsx)(o.xv,{as:"span",children:"Account:"}),(0,i.jsx)(ce,{account:e,fontWeight:"bold"})]}),(0,i.jsxs)(o.kC,{gap:2,children:[(0,i.jsx)(o.xv,{children:"Balance:"}),(0,i.jsx)(o.xv,{fontWeight:"bold",children:(null===s||void 0===s?void 0:s[t])?"".concat(Number((0,ie.dF)(s[t])).toFixed(4)):"--"})]})]},e)}))})},ue=function(e){var t,n=e.chainId;if(void 0===n)return null;var r=n?null===(t=v[n])||void 0===t?void 0:t.name:void 0;return r?(0,i.jsxs)(o.kC,{gap:2,children:[(0,i.jsx)(o.xv,{children:"Chain:"}),(0,i.jsxs)(o.xv,{fontWeight:"bold",children:[r," (",n,")"]})]}):(0,i.jsxs)(o.kC,{gap:2,children:[(0,i.jsx)(o.xv,{children:"Chain Id:"}),(0,i.jsx)(o.xv,{fontWeight:"bold",children:n})]})},de=n(1249),he=n(5354),le=n.n(he),pe=n(3850),ve=n(6053),fe=function(e){var t,n=e.chainId,r=e.switchChain,o=e.chainIds;return(0,i.jsx)(ve.Ph,{value:n,onChange:function(e){null===r||void 0===r||r(Number(e.target.value))},disabled:void 0===r,children:o.map((function(e){var n;return(0,i.jsx)("option",{value:e,children:null!==(t=null===(n=v[e])||void 0===n?void 0:n.name)&&void 0!==t?t:e},e)}))})},me=function(e){var t=e.connect,n=e.disconnect,r=e.chainId,c=e.isConnecting,a=e.isConnected,u=Object.keys(f).map((function(e){return Number(e)})),d=(0,Z.useState)(r||1),h=d[0],l=d[1],v=(0,pe.pm)(),m=(0,Z.useCallback)((function(e){l(e),t(p(e))}),[t]);return a?(0,i.jsxs)(o.kC,{flexDirection:"column",gap:4,children:[(0,i.jsx)(fe,{chainId:r,switchChain:m,chainIds:u}),(0,i.jsx)(s.zx,{colorScheme:"red",onClick:(0,de.Z)(le().mark((function e(){return le().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.warn("connect error: ",e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Disconnect"})]}):(0,i.jsxs)(o.kC,{flexDirection:"column",gap:4,children:[(0,i.jsx)(fe,{chainId:r||1,switchChain:c?void 0:m,chainIds:u}),(0,i.jsx)(s.zx,{colorScheme:"blue",disabled:c,onClick:(0,de.Z)(le().mark((function e(){return le().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t(p(h));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),v({position:"top-right",status:"error",description:e.t0.message});case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Connect"})]})},we=function(e){var t=e.children,n=e.ssrPlaceholder;return function(){var e=(0,Z.useState)(!1),t=e[0],n=e[1];return(0,Z.useEffect)((function(){n(!0)}),[]),t}()?(0,i.jsx)(i.Fragment,{children:t}):(0,i.jsx)(i.Fragment,{children:n})},ge=n(8494),Ce=function(e){var t=(0,ge.Z)({},e);return(0,i.jsx)(o.kC,(0,re.Z)({flexDirection:"column",gap:4,p:3,borderColor:"gray.200",borderWidth:"1px",borderRadius:"8px"},t))},xe=function(e){var t=e.wallets,n=e.currentWalletName,r=e.switchCurrentWallet;return(0,i.jsx)(ve.Ph,{value:n,onChange:function(e){r(e.target.value)},children:t.map((function(e){return(0,i.jsx)("option",{value:e.name,children:e.name},e.name)}))})},ye=function(e){var t=e.isConnecting,n=e.isConnected;return(0,i.jsx)(o.xu,{children:t?(0,i.jsx)(i.Fragment,{children:"\ud83d\udfe1 Connecting"}):n?(0,i.jsx)(i.Fragment,{children:"\ud83d\udfe2 Connected"}):(0,i.jsx)(i.Fragment,{children:"\u26aa\ufe0f Disconnected"})})},be=ee.useName,je=ee.switchCurrentWallet,Ie=ee.usePlugin,ke=ee.connect,Ee=ee.autoConnectOnce,Se=ee.disconnect,Pe=ee.useIsConnecting,We=ee.useIsConnected,Ne=ee.useAccounts,Ae=ee.useChainId,Oe=ee.useENSNames,_e=ee.useProvider,Ke=function(){var e=be(),t=Pe(),n=We(),r=Ae(),s=Ne(),c=_e(),a=Oe(c),u=Ie(K).api.hooks.useConnectionStatus;return console.log("useConnectionStatus",u()),console.log(ne.useAccount()),(0,Z.useEffect)((function(){Ee()}),[e]),(0,i.jsx)(we,{children:(0,i.jsxs)(Ce,{style:{minWidth:"280px",maxWidth:"420px",width:"100%"},children:[(0,i.jsx)(xe,{wallets:Y,currentWalletName:e,switchCurrentWallet:je}),(0,i.jsxs)(Ce,{children:[(0,i.jsx)(o.xv,{fontWeight:"bold",children:e}),(0,i.jsx)(ye,{isConnecting:t,isConnected:n}),(0,i.jsx)(ue,{chainId:r}),(0,i.jsx)(ae,{accounts:s,provider:c,ENSNames:a}),(0,i.jsx)(me,{connect:ke,disconnect:Se,chainId:r,isConnecting:t,isConnected:n})]})]})})},De=n(370),Fe=n.n(De),Le=n(3675);function Ze(){return(0,i.jsxs)(a.A,{children:[(0,i.jsx)(Fe(),{children:(0,i.jsx)("title",{children:"Home | Web3 Wallet "})}),(0,i.jsx)(o.LZ,{my:12}),(0,i.jsxs)(o.kC,{flexDirection:"column",gap:12,children:[(0,i.jsxs)(o.X6,{as:"h1",textAlign:"center",m:"0 auto",width:{base:"100",lg:"80%"},children:["A"," ",(0,i.jsx)(o.xv,{as:"span",color:"yellow.500",children:"Modular"}),","," ",(0,i.jsx)(o.xv,{as:"span",color:"green.500",children:"Extensible"})," ","and"," ",(0,i.jsx)(o.xv,{as:"span",color:"red.500",children:"Flexible"})," ","web3 wallet framework for building dApps"]}),(0,i.jsx)(o.kC,{justifyContent:"center",children:(0,i.jsx)(Ke,{})}),(0,i.jsxs)(o.kC,{gap:{base:4,lg:6},justifyContent:"center",children:[(0,i.jsx)(s.zx,{rightIcon:(0,i.jsx)(r.mr,{}),colorScheme:"blue",children:"Get Started"}),(0,i.jsx)(o.rU,{display:"flex",justifySelf:"end",_hover:{textDecoration:"none"},href:"https://github.com/web3-wallet/web3-wallet",target:"_blank",children:(0,i.jsx)(s.zx,{leftIcon:(0,i.jsx)(c.JO,{as:Le.idJ}),variant:"outline",children:"Github"})})]})]})]})}},4712:function(){}},function(e){e.O(0,[613,268,883,774,888,179],(function(){return t=2761,e(e.s=t);var t}));var t=e.O();_N_E=t}]);