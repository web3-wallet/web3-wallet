(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2761:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(172)}])},7144:function(e,t,n){"use strict";n.d(t,{A:function(){return w}});var r=n(7264),i=n(2569),o=n(9240),s=n(5250),c=n(4559),a=function(){return(0,s.jsx)(c.xu,{})},u=n(644),d=n(3675),h=n(576),l=n.n(h),p=(n(79),function(e){var t=e.href,n=e.children,a=e.linkProps,u=(0,o.Z)(e,["href","children","linkProps"]);return(0,s.jsx)(l(),(0,i.Z)((0,r.Z)({href:t},u),{passHref:!0,children:(0,s.jsx)(c.rU,(0,i.Z)((0,r.Z)({_hover:{textDecoration:"none",color:"red.500"},display:"flex",textShadow:"1px 1px 2px #fff"},a),{children:n}))}))}),v={src:"/web3-wallet//_next/static/media/logo.ff6abe39.svg",height:256,width:256},f=n(1275),m=n.n(f),C=function(){return(0,s.jsx)(p,{href:"/",children:(0,s.jsx)(m(),{width:"32px",height:"32px",src:v,alt:"web3 wallet logo"})})},x=function(){return(0,s.jsxs)(c.kC,{px:6,py:3,gap:{base:6,md:8,lg:10},bg:"green.300",alignItems:"center",fontWeight:"medium",children:[(0,s.jsx)(C,{}),(0,s.jsxs)(c.kC,{gap:{base:6,md:8,lg:10},children:[(0,s.jsx)(p,{href:"/wallets",children:"Wallets"}),(0,s.jsx)(p,{href:"/docs",children:"Docs"}),(0,s.jsx)(p,{href:"/showcase",children:"Showcase"}),(0,s.jsx)(p,{href:"/docs-api",children:"API"})]}),(0,s.jsx)(c.kC,{flexGrow:"1",justifyContent:"flex-end",children:(0,s.jsx)(p,{href:"https://github.com/web3-wallet/web3-wallet",linkProps:{display:"flex",justifySelf:"end",target:"_blank"},children:(0,s.jsx)(u.JO,{lineHeight:"2rem",fontSize:"1.4rem",as:d.idJ})})})]})},w=function(e){var t=e.children,n=(0,o.Z)(e,["children"]);return(0,s.jsxs)(c.xu,(0,i.Z)((0,r.Z)({minH:"100vh"},n),{children:[(0,s.jsx)(x,{}),(0,s.jsx)(c.xu,{margin:"0 auto",maxW:"1180px",px:{base:6,xl:0},children:t}),(0,s.jsx)(c.LZ,{my:10}),(0,s.jsx)(a,{})]}))}},172:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _e}});var r,i=n(5250),o=n(7075),s=n(4559),c=n(9427),a=n(644),u=n(7144),d=n(6832);!function(e){e.UserUntouched="UserUntouched",e.UserConnected="UserConnected",e.UserDisconnected="UserDisconnected"}(r||(r={}));class h extends Error{constructor(e="Provider not found"){super(e),this.name=h.name,Object.setPrototypeOf(this,h.prototype)}}var l=n(9063);const p=e=>{if(!Number.isInteger(e)||e<=0||e>0xfffffffffffec)throw new Error(`Invalid chainId ${e}`)};function v(e){return(0,l.Kn)(e)}const f=e=>"number"===typeof e?e:Number.parseInt(`${e}`,`${e}`.startsWith("0x")?16:10),m=e=>`0x${e.toString(16)}`,C={userConnectionStatus:r.UserUntouched,isConnecting:!1,chainId:void 0,accounts:void 0};class x{constructor(e,t){this.name=e;const{actions:n,store:i}=(()=>{const e=(0,d.Z)()((()=>C));let t=0;return{store:e,actions:{startConnection:function(){const n=++t;return e.setState({isConnecting:!0}),()=>{t===n&&e.setState({isConnecting:!1})}},update:function(n){if(void 0!==n.chainId&&p(n.chainId),void 0!==n.accounts)for(let e=0;e<n.accounts.length;e++)n.accounts[e]=v(n.accounts[e]);t++,e.setState((e=>{const t=n.chainId??e.chainId,r=n.accounts??e.accounts,i=n.userConnectionStatus??e.userConnectionStatus;let o=e.isConnecting;return o&&t&&r&&(o=!1),{chainId:t,accounts:r,isConnecting:o,userConnectionStatus:i}}))},disconnect:()=>{e.getState().userConnectionStatus===r.UserConnected&&e.setState({...C,userConnectionStatus:r.UserDisconnected})}}}})();this.store=i,this.actions=n,this.options=t,this.providerNotFoundError=new h(`${e} provider not found`)}async lazyInitialize(){await this.detectProvider(),this.removeEventListeners=this.addEventListeners()}async autoConnect(){const e=this.actions.startConnection();try{await this.lazyInitialize();const[t,n]=await Promise.all([this.requestChainId(),this.requestAccounts()]);if(!n.length)throw new Error("No accounts returned");this.updateChainId(t),this.updateAccounts(n)}catch(t){return console.debug("Could not auto connect",t),!1}finally{e()}return!0}async autoConnectOnce(){return this.autoConnectOncePromise||(this.autoConnectOncePromise=this.autoConnect()),await this.autoConnectOncePromise}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;const[r,i]=await Promise.all([this.requestChainId(),this.requestAccounts()]),o=f(r),s="number"===typeof e?e:e?.chainId;if(!s||o===s)return this.updateChainId(o),void this.updateAccounts(i);try{return await this.switchChain(s),this.actions.update({chainId:s,accounts:i})}catch(n){const t=n,r=(e=>!(e=>"number"===typeof e)(e))(e)&&(4902===t.code||-32603===t.code);if(!this.addChain||!r)throw t;await this.addChain(e),await this.connect(e.chainId)}}finally{t()}}async disconnect(e=!1){this.actions.disconnect()}async watchAsset(e){if(!this.provider)throw this.providerNotFoundError;if(!(await this.provider.request({method:"wallet_watchAsset",params:{type:"ERC20",options:e}})))throw new Error(`Failed to watch ${e.symbol}`)}updateChainId(e){this.actions.update({chainId:f(e)})}updateAccounts(e){this.actions.update({accounts:e})}onConnect({chainId:e}){this.updateChainId(e)}onDisconnect(e){this.options?.onError?.(e)}onChainChanged(e){this.updateChainId(e)}onAccountsChanged(e){this.updateAccounts(e)}addEventListeners(){if(!this.provider)return;const e=this.onConnect.bind(this),t=this.onDisconnect.bind(this),n=this.onChainChanged.bind(this),r=this.onAccountsChanged.bind(this);return"function"===typeof this.provider.on?(this.provider.on("connect",e),this.provider.on("disconnect",t),this.provider.on("chainChanged",n),this.provider.on("accountsChanged",r)):(this.provider.addListener("connect",e),this.provider.addListener("disconnect",t),this.provider.addListener("chainChanged",n),this.provider.addListener("accountsChanged",r)),()=>{this.provider&&("function"===typeof this.provider.off?(this.provider.off("connect",e),this.provider.off("disconnect",t),this.provider.off("chainChanged",n),this.provider.off("accountsChanged",r)):"function"===typeof this.provider.removeListener&&(this.provider.removeListener("connect",e),this.provider.removeListener("disconnect",t),this.provider.removeListener("chainChanged",n),this.provider.removeListener("accountsChanged",r)))}}async switchChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:m(e)}]})}async addChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_addEthereumChain",params:[{...e,chainId:m(e.chainId)}]})}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){console.debug("Failed to request accounts with 'eth_requestAccounts', try to fallback to 'eth_accounts'");return await this.provider.request({method:"eth_accounts"})}}async requestChainId(){if(!this.provider)throw this.providerNotFoundError;return await this.provider.request({method:"eth_chainId"})}}var w=n(6498),y=n(8023);var g=n(79);let b,j=!1;const I=()=>{const[e,t]=(0,g.useState)(void 0!==b);return(0,g.useEffect)((()=>{if(e)return;let r=!1;return async function(){if(j)return b;j=!0;try{const e=await n.e(610).then(n.bind(n,6610));b=e.Web3Provider}catch{console.debug("@ethersproject/providers not available")}}().then((()=>{r||t(!0)})),()=>{r=!0}}),[e]),b};function S(e,t=[]){const[n,r]=(0,g.useState)();return(0,g.useEffect)((()=>{if(e&&t.length){let n=!1;return Promise.all(t.map((t=>e.lookupAddress(t)))).then((e=>{n||r(e.map((e=>e||void 0)))})).catch((e=>{n||(console.debug("Could not fetch ENS names",e),r(new Array(t.length).fill(void 0)))})),()=>{n=!0,r(void 0)}}}),[e,t]),n??new Array(t.length).fill(void 0)}const E=({useChainId:e,useAccounts:t,useIsConnecting:n})=>({useAccount:()=>t()?.[0],useIsConnected:()=>(({chainId:e,accounts:t,isConnecting:n})=>Boolean(e&&t?.length&&!n))({chainId:e(),accounts:t(),isConnecting:n()})}),k=(e,t)=>void 0===e&&void 0===t||(void 0!==e||void 0===t)&&((void 0===e||void 0!==t)&&(e?.length===t?.length&&!!e?.every(((e,n)=>e===t?.[n]))));const N=e=>{const t=(e=>({name:e.name,$getStore:()=>e.store,$getActions:()=>e.actions,connect:(...t)=>e.connect(...t),autoConnect:(...t)=>e.autoConnect(...t),autoConnectOnce:(...t)=>e.autoConnectOnce(...t),disconnect:(...t)=>e.disconnect(...t),watchAsset:(...t)=>e.watchAsset(...t)}))(e),n=(0,w.ZP)(t.$getStore()),r=(i=n,{useChainId:()=>i((e=>e.chainId)),useAccounts:()=>i((e=>e.accounts),k),useIsConnecting:()=>i((e=>e.isConnecting)),useUserConnectionStatus:()=>i((e=>e.userConnectionStatus))});var i;const o=E(r),s=((e,{useAccounts:t,useChainId:n},{useAccount:r,useIsConnected:i})=>({useProvider:t=>{const r=i(),o=n(),s=I();return(0,g.useMemo)((()=>{if(s&&e.provider)return new s(e.provider,t)}),[s,r,o,t])},useENSNames:e=>S(e,t()),useENSName:e=>{const t=r();return S(e,(0,g.useMemo)((()=>void 0===t?[]:[t]),[t]))?.[0]}}))(e,r,o);return{...t,...r,...o,...s}};var A=n(2172),P={name:"Ether",symbol:"ETH",decimals:18},U={name:"Matic",symbol:"MATIC",decimals:18};function W(e){var t=_[e];return function(e){return!!e.nativeCurrency}(t)?{chainId:e,chainName:t.name,nativeCurrency:t.nativeCurrency,rpcUrls:t.urls,blockExplorerUrls:t.blockExplorerUrls}:e}var _={1:{urls:[A.env.infuraKey?"https://mainnet.infura.io/v3/".concat(A.env.infuraKey):"",A.env.alchemyKey?"https://eth-mainnet.alchemyapi.io/v2/".concat(A.env.alchemyKey):"","https://cloudflare-eth.com"].filter((function(e){return!!e})),name:"Mainnet"},3:{urls:[A.env.infuraKey?"https://ropsten.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Ropsten"},4:{urls:[A.env.infuraKey?"https://rinkeby.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Rinkeby"},5:{urls:[A.env.infuraKey?"https://goerli.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"G\xf6rli"},25:{urls:["https://evm-cronos.crypto.org"],name:"Cronos"},338:{urls:["https://evm-t3.cronos.org"],name:"Cronos Test"},42:{urls:[A.env.infuraKey?"https://kovan.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Kovan"},10:{urls:[A.env.infuraKey?"https://optimism-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://mainnet.optimism.io"].filter((function(e){return!!e})),name:"Optimism",nativeCurrency:P,blockExplorerUrls:["https://optimistic.etherscan.io"]},69:{urls:[A.env.infuraKey?"https://optimism-kovan.infura.io/v3/".concat(A.env.infuraKey):"","https://kovan.optimism.io"].filter((function(e){return!!e})),name:"Optimism Kovan",nativeCurrency:P,blockExplorerUrls:["https://kovan-optimistic.etherscan.io"]},42161:{urls:[A.env.infuraKey?"https://arbitrum-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://arb1.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum One",nativeCurrency:P,blockExplorerUrls:["https://arbiscan.io"]},421611:{urls:[A.env.infuraKey?"https://arbitrum-rinkeby.infura.io/v3/".concat(A.env.infuraKey):"","https://rinkeby.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum Testnet",nativeCurrency:P,blockExplorerUrls:["https://testnet.arbiscan.io"]},137:{urls:[A.env.infuraKey?"https://polygon-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://polygon-rpc.com"].filter((function(e){return!!e})),name:"Polygon Mainnet",nativeCurrency:U,blockExplorerUrls:["https://polygonscan.com"]},80001:{urls:[A.env.infuraKey?"https://polygon-mumbai.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Polygon Mumbai",nativeCurrency:U,blockExplorerUrls:["https://mumbai.polygonscan.com"]}},O=Object.keys(_).reduce((function(e,t){var n=_[Number(t)].urls[0];return e[Number(t)]=n,e}),{});var F=N(new class extends x{constructor(e){super("Coinbase Wallet",e)}async detectProvider(){this.provider&&this.provider;const e=await Promise.all([n.e(375),n.e(59),n.e(116)]).then(n.bind(n,7059)),{url:t,...r}=this.options.providerOptions;return this.coinbaseWallet=new e.default(r),this.provider=this.coinbaseWallet.makeWeb3Provider(t),this.provider}get connected(){return!!this.provider?.selectedAddress}async autoConnect(){return await this.lazyInitialize(),this.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(){this.coinbaseWallet?.disconnect()}}({providerOptions:{appName:"@web3-wallet example",reloadOnDisconnect:!1,url:O[1]}}));class K extends x{async detectProvider(e=(()=>!0)){this.provider&&this.provider;const t=await n.e(934).then(n.t.bind(n,1934,23)),r=await t.default();if(!r)throw this.providerNotFoundError;let i=r;if(i=r.providers?.length?r.providers?.find(e):i&&e(i)?i:void 0,!i)throw this.providerNotFoundError;return this.provider=i,i}}const D=e=>!!e.isDesktopWallet;var L=N(new class extends K{constructor(e){super("Crypto.com Desktop Wallet",e)}async detectProvider(){return await super.detectProvider(D)}});const Z=async(e=40,t=50)=>{const n=q();return n||0===e?n:(await(r=t,new Promise((e=>{setTimeout((()=>{e()}),r)}))),await Z(e-1,t));var r},q=()=>{if("undefined"!==typeof window)return window.deficonnectProvider?window.deficonnectProvider:void 0};class z extends x{constructor(e){super("DeFi Wallet",e)}async detectProvider(){this.provider&&this.provider;const e=await Z();if(!e)throw this.providerNotFoundError;return this.provider=e,this.provider}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;await this.provider.connect({...this.options.providerOptions,chainId:e});if(e!==f(this.provider.chainId)){const t=f(e);await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:t}]})}}catch(n){throw t(),n}finally{this.provider?.chainId&&this.updateChainId(this.provider?.chainId),this.provider?.accounts&&this.updateAccounts(this.provider?.accounts)}}}const M=e=>!!e.isTrust&&window.navigator?.userAgent?.includes("DeFiWallet");class T extends K{constructor(){super("DeFi Wallet")}async detectProvider(){return await super.detectProvider(M)}}var $,B=N(($={extension:{chainType:"eth",appName:"@web3-wallet example",chainId:1,rpcUrls:{}}},(()=>{if("undefined"===typeof window)return!1;const e=navigator.userAgent||navigator.vendor||window.opera||"";return!!/android/i.test(e)||!!(/iPhone|iPad|iPod/i.test(e)||/Mac/i.test(e)&&"ontouchend"in document)||!!/BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(e)})()?new T:new z({providerOptions:$.extension})));const H=e=>!!e.isMetaMask;var J=N(new class extends K{constructor(e){super("MetaMask",e)}async detectProvider(){return await super.detectProvider(H)}}),R=n(8774),G=n.n(R);var X=N(new class extends x{constructor(e){super("WalletConnect",e),this.events=new(G()),this.onDisplayUri=(e,t)=>{this.events.emit("URI_AVAILABLE",t.params[0])}}async detectProvider(){if(this.provider)return this.provider;const e=new((await Promise.all([n.e(375),n.e(761),n.e(571)]).then(n.bind(n,4761))).default)({...this.options.providerOptions});return this.provider=e,e}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){throw"User closed modal"===e.message&&await this.disconnect(),e}}addEventListeners(){if(!this.provider)return;const e=super.addEventListeners(),t=this.onDisplayUri.bind(this);return this.provider.connector.on("display_uri",t),()=>{this.provider&&(e?.(),"function"===typeof this.provider.off?this.provider.off("display_uri",t):"function"===typeof this.provider.removeListener&&this.provider.removeListener("display_uri",t))}}async autoConnect(){return await this.lazyInitialize(),this.provider?.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(){this.removeEventListeners?.(),super.disconnect(),await(this.provider?.disconnect()),this.provider=void 0}}({providerOptions:{rpc:O}})),V=((e,t={})=>{const{defaultCurrentWallet:n,key:i="@web3-wallet"}=t;if(!(e=e.slice()).length)throw new Error("wallets can't be empty");const o=(0,w.ZP)()((0,y.tJ)((()=>({userConnectionStatus:r.UserUntouched,currentWallet:n||e[0].name})),{name:i,version:0})),s=()=>{const t=o.getState().currentWallet;return e.find((e=>e.name===t))};return{wallets:e,setCurrentWallet:e=>{o.setState({currentWallet:e})},useName:()=>o((e=>e.currentWallet)),connect:async(...e)=>{const t=s(),n=await t.connect(...e);return o.setState({userConnectionStatus:r.UserConnected}),n},autoConnect:async(...e)=>{const t=s(),n=await t.autoConnect(...e);return o.getState().userConnectionStatus===r.UserDisconnected?(console.debug("connectionId don't exists, auto connect is suppressed"),!1):(o.setState({userConnectionStatus:r.UserConnected}),n)},autoConnectOnce:async(...e)=>{const t=s();if(o.getState().userConnectionStatus===r.UserDisconnected)return console.debug("connectionId don't exists, auto connect is suppressed"),!1;const n=await t.autoConnectOnce(...e);return o.setState({userConnectionStatus:r.UserConnected}),n},disconnect:async(...e)=>{const t=s(),n=await t.disconnect(...e);return o.setState({userConnectionStatus:r.UserDisconnected}),n},watchAsset:(...e)=>s().watchAsset(...e),...(()=>{const t={},{useChainId:n,useAccount:r,useAccounts:i,useUserConnectionStatus:s,useENSName:c,useENSNames:a,useIsConnected:u,useIsConnecting:d,useProvider:h}=e[0],l={useChainId:n,useAccount:r,useAccounts:i,useUserConnectionStatus:s,useENSName:c,useENSNames:a,useIsConnected:u,useIsConnecting:d,useProvider:h};for(const p of Object.keys(l))t[p]=(...t)=>{let n;const r=o.getState().currentWallet;for(const i of e){const e=(0,i[p])(...t);i.name===r&&(n=e)}return n};return t})(),useUserConnectionStatus:()=>o((e=>e.userConnectionStatus))}})([J,B,F,X,L]),Q=n(2825),Y=n(7264),ee=n(2569),te=n(9240),ne=function(e){var t=e.account,n=e.leadingChars,r=void 0===n?4:n,o=e.tailingChars,c=void 0===o?4:o,a=(0,te.Z)(e,["account","leadingChars","tailingChars"]);return t?(0,i.jsxs)(s.xv,(0,ee.Z)((0,Y.Z)({as:"span"},a),{children:[t.slice(0,r),"...",t.slice(-c)]})):null},re=function(e){var t=e.accounts,n=e.provider,r=e.ENSNames,o=function(e,t){var n=(0,g.useState)(),r=n[0],i=n[1];return(0,g.useEffect)((function(){if(e&&(null===t||void 0===t?void 0:t.length)){var n=!1;return Promise.all(t.map((function(t){return e.getBalance(t)}))).then((function(e){n||i(e)})),function(){n=!0,i(void 0)}}}),[e,t]),r}(n,t);return void 0===t?null:0===t.length?(0,i.jsxs)(s.kC,{gap:2,children:[(0,i.jsx)(s.xv,{children:"Account:"}),(0,i.jsx)(s.xv,{children:"None"})]}):(0,i.jsx)(i.Fragment,{children:t.map((function(e,t){return(null===r||void 0===r?void 0:r[t])?null===r||void 0===r?void 0:r[t]:(0,i.jsxs)(g.Fragment,{children:[(0,i.jsxs)(s.kC,{gap:2,children:[(0,i.jsx)(s.xv,{as:"span",children:"Account:"}),(0,i.jsx)(ne,{account:e,fontWeight:"bold"})]}),(0,i.jsxs)(s.kC,{gap:2,children:[(0,i.jsx)(s.xv,{children:"Balance:"}),(0,i.jsx)(s.xv,{fontWeight:"bold",children:(null===o||void 0===o?void 0:o[t])?"".concat(Number((0,Q.dF)(o[t])).toFixed(4)):"--"})]})]},e)}))})},ie=function(e){var t,n=e.chainId;if(void 0===n)return null;var r=n?null===(t=_[n])||void 0===t?void 0:t.name:void 0;return r?(0,i.jsxs)(s.kC,{gap:2,children:[(0,i.jsx)(s.xv,{children:"Chain:"}),(0,i.jsxs)(s.xv,{fontWeight:"bold",children:[r," (",n,")"]})]}):(0,i.jsxs)(s.kC,{gap:2,children:[(0,i.jsx)(s.xv,{children:"Chain Id:"}),(0,i.jsx)(s.xv,{fontWeight:"bold",children:n})]})},oe=n(1249),se=n(5354),ce=n.n(se),ae=n(3850),ue=n(6053),de=function(e){var t,n=e.chainId,r=e.switchChain,o=e.chainIds;return(0,i.jsx)(ue.Ph,{value:n,onChange:function(e){null===r||void 0===r||r(Number(e.target.value))},disabled:void 0===r,children:o.map((function(e){var n;return(0,i.jsx)("option",{value:e,children:null!==(t=null===(n=_[e])||void 0===n?void 0:n.name)&&void 0!==t?t:e},e)}))})},he=function(e){var t=e.connect,n=e.disconnect,r=e.chainId,o=e.isConnecting,a=e.isConnected,u=Object.keys(O).map((function(e){return Number(e)})),d=(0,g.useState)(r||1),h=d[0],l=d[1],p=(0,ae.pm)(),v=(0,g.useCallback)((function(e){l(e),t(W(e))}),[t]);return a?(0,i.jsxs)(s.kC,{flexDirection:"column",gap:4,children:[(0,i.jsx)(de,{chainId:r,switchChain:v,chainIds:u}),(0,i.jsx)(c.zx,{colorScheme:"red",onClick:(0,oe.Z)(ce().mark((function e(){return ce().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.warn("connect error: ",e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Disconnect"})]}):(0,i.jsxs)(s.kC,{flexDirection:"column",gap:4,children:[(0,i.jsx)(de,{chainId:r||1,switchChain:o?void 0:v,chainIds:u}),(0,i.jsx)(c.zx,{colorScheme:"blue",disabled:o,onClick:(0,oe.Z)(ce().mark((function e(){return ce().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t(W(h));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),p({position:"top-right",status:"error",description:e.t0.message});case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Connect"})]})},le=function(e){var t=e.children,n=e.ssrPlaceholder;return function(){var e=(0,g.useState)(!1),t=e[0],n=e[1];return(0,g.useEffect)((function(){n(!0)}),[]),t}()?(0,i.jsx)(i.Fragment,{children:t}):(0,i.jsx)(i.Fragment,{children:n})},pe=n(8494),ve=function(e){var t=(0,pe.Z)({},e);return(0,i.jsx)(s.kC,(0,Y.Z)({flexDirection:"column",gap:4,p:3,borderColor:"gray.200",borderWidth:"1px",borderRadius:"8px"},t))},fe=function(e){var t=e.wallets,n=e.selectedWalletName,r=e.setSelectedWallet;return(0,i.jsx)(ue.Ph,{value:n,onChange:function(e){r(e.target.value)},children:t.map((function(e){return(0,i.jsx)("option",{value:e.name,children:e.name},e.name)}))})},me=function(e){var t=e.isConnecting,n=e.isConnected;return(0,i.jsx)(s.xu,{children:t?(0,i.jsx)(i.Fragment,{children:"\ud83d\udfe1 Connecting"}):n?(0,i.jsx)(i.Fragment,{children:"\ud83d\udfe2 Connected"}):(0,i.jsx)(i.Fragment,{children:"\u26aa\ufe0f Disconnected"})})},Ce=V.wallets,xe=V.setCurrentWallet,we=V.useName,ye=V.connect,ge=V.autoConnectOnce,be=V.disconnect,je=V.useIsConnecting,Ie=V.useIsConnected,Se=V.useAccounts,Ee=V.useChainId,ke=V.useENSNames,Ne=V.useProvider,Ae=function(){var e=we(),t=je(),n=Ie(),r=Ee(),o=Se(),c=Ne(),a=ke(c);return(0,g.useEffect)((function(){ge()}),[e]),(0,i.jsx)(le,{children:(0,i.jsxs)(ve,{style:{minWidth:"280px",maxWidth:"420px",width:"100%"},children:[(0,i.jsx)(fe,{wallets:Ce,selectedWalletName:e,setSelectedWallet:xe}),(0,i.jsxs)(ve,{children:[(0,i.jsx)(s.xv,{fontWeight:"bold",children:e}),(0,i.jsx)(me,{isConnecting:t,isConnected:n}),(0,i.jsx)(ie,{chainId:r}),(0,i.jsx)(re,{accounts:o,provider:c,ENSNames:a}),(0,i.jsx)(he,{connect:ye,disconnect:be,chainId:r,isConnecting:t,isConnected:n})]})]})})},Pe=n(370),Ue=n.n(Pe),We=n(3675);function _e(){return(0,i.jsxs)(u.A,{children:[(0,i.jsx)(Ue(),{children:(0,i.jsx)("title",{children:"Home | Web3 Wallet "})}),(0,i.jsx)(s.LZ,{my:12}),(0,i.jsxs)(s.kC,{flexDirection:"column",gap:12,children:[(0,i.jsxs)(s.X6,{as:"h1",textAlign:"center",m:"0 auto",width:{base:"100",lg:"80%"},children:["A"," ",(0,i.jsx)(s.xv,{as:"span",color:"yellow.500",children:"Modular"}),","," ",(0,i.jsx)(s.xv,{as:"span",color:"green.500",children:"Extensible"})," ","and"," ",(0,i.jsx)(s.xv,{as:"span",color:"red.500",children:"Flexible"})," ","web3 wallet framework for building dApps"]}),(0,i.jsx)(s.kC,{justifyContent:"center",children:(0,i.jsx)(Ae,{})}),(0,i.jsxs)(s.kC,{gap:{base:4,lg:6},justifyContent:"center",children:[(0,i.jsx)(c.zx,{rightIcon:(0,i.jsx)(o.mr,{}),colorScheme:"blue",children:"Get Started"}),(0,i.jsx)(s.rU,{display:"flex",justifySelf:"end",_hover:{textDecoration:"none"},href:"https://github.com/web3-wallet/web3-wallet",target:"_blank",children:(0,i.jsx)(c.zx,{leftIcon:(0,i.jsx)(a.JO,{as:We.idJ}),variant:"outline",children:"Github"})})]})]})]})}},4712:function(){}},function(e){e.O(0,[613,268,295,774,888,179],(function(){return t=2761,e(e.s=t);var t}));var t=e.O();_N_E=t}]);