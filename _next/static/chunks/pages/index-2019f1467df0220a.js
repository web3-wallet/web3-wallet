(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2761:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6931)}])},7144:function(e,t,n){"use strict";n.d(t,{A:function(){return C}});var r=n(7264),i=n(2569),o=n(9240),s=n(5250),c=n(4559),a=function(){return(0,s.jsx)(c.xu,{})},u=n(644),d=n(3675),h=n(576),l=n.n(h),p=(n(79),function(e){var t=e.href,n=e.children,a=e.linkProps,u=(0,o.Z)(e,["href","children","linkProps"]);return(0,s.jsx)(l(),(0,i.Z)((0,r.Z)({href:t},u),{passHref:!0,children:(0,s.jsx)(c.rU,(0,i.Z)((0,r.Z)({_hover:{textDecoration:"none",color:"red.500"},display:"flex",textShadow:"1px 1px 2px #fff"},a),{children:n}))}))}),v={src:"/web3-wallet//_next/static/media/logo.ff6abe39.svg",height:256,width:256},f=n(1275),m=n.n(f),x=function(){return(0,s.jsx)(p,{href:"/",children:(0,s.jsx)(m(),{width:"32px",height:"32px",src:v,alt:"web3 wallet logo"})})},w=function(){return(0,s.jsxs)(c.kC,{px:6,py:3,gap:{base:6,md:8,lg:10},bg:"green.300",alignItems:"center",fontWeight:"medium",children:[(0,s.jsx)(x,{}),(0,s.jsxs)(c.kC,{gap:{base:6,md:8,lg:10},children:[(0,s.jsx)(p,{href:"/wallets",children:"Wallets"}),(0,s.jsx)(p,{href:"/docs",children:"Docs"}),(0,s.jsx)(p,{href:"/showcase",children:"Showcase"}),(0,s.jsx)(p,{href:"/docs-api",children:"API"})]}),(0,s.jsx)(c.kC,{flexGrow:"1",justifyContent:"flex-end",children:(0,s.jsx)(p,{href:"https://github.com/web3-wallet/web3-wallet",linkProps:{display:"flex",justifySelf:"end",target:"_blank"},children:(0,s.jsx)(u.JO,{lineHeight:"2rem",fontSize:"1.4rem",as:d.idJ})})})]})},C=function(e){var t=e.children,n=(0,o.Z)(e,["children"]);return(0,s.jsxs)(c.xu,(0,i.Z)((0,r.Z)({minH:"100vh"},n),{children:[(0,s.jsx)(w,{}),(0,s.jsx)(c.xu,{margin:"0 auto",maxW:"1180px",px:{base:6,xl:0},children:t}),(0,s.jsx)(c.LZ,{my:10}),(0,s.jsx)(a,{})]}))}},6931:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return je}});var r=n(5250),i=n(7075),o=n(4559),s=n(9427),c=n(644),a=n(7144);class u extends Error{constructor(e="Provider not found"){super(e),this.name=u.name,Object.setPrototypeOf(this,u.prototype)}}var d=n(9063);const h=e=>{if(!Number.isInteger(e)||e<=0||e>0xfffffffffffec)throw new Error(`Invalid chainId ${e}`)};function l(e){return(0,d.Kn)(e)}const p=e=>"number"===typeof e?e:Number.parseInt(`${e}`,`${e}`.startsWith("0x")?16:10),v=e=>`0x${e.toString(16)}`;class f{constructor(e,t,n){this.name=e,this.actions=t,this.onError=n,this.providerNotFoundError=new u(`${e} provider not found`)}resetState(){this.actions.resetState()}async lazyInitialize(){await this.detectProvider(),this.removeEventListeners=this.addEventListeners()}async autoConnect(){const e=this.actions.startConnection();try{await this.lazyInitialize();const[t,n]=await Promise.all([this.requestChainId(),this.requestAccounts()]);if(!n.length)throw new Error("No accounts returned");this.updateChainId(t),this.updateAccounts(n)}catch(t){return console.debug("Could not auto connect",t),!1}finally{e()}return!0}async autoConnectOnce(){return this.autoConnectOncePromise||(this.autoConnectOncePromise=this.autoConnect()),await this.autoConnectOncePromise}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;const[r,i]=await Promise.all([this.requestChainId(),this.requestAccounts()]),o=p(r),s="number"===typeof e?e:e?.chainId;if(!s||o===s)return this.updateChainId(o),void this.updateAccounts(i);try{return await this.switchChain(s),this.actions.update({chainId:s,accounts:i})}catch(n){const t=n,r=(e=>!(e=>"number"===typeof e)(e))(e)&&(4902===t.code||-32603===t.code);if(!this.addChain||!r)throw t;await this.addChain(e),await this.connect(e.chainId)}}finally{t()}}async disconnect(e=!1){this.resetState()}async watchAsset(e){if(!this.provider)throw this.providerNotFoundError;if(!(await this.provider.request({method:"wallet_watchAsset",params:{type:"ERC20",options:e}})))throw new Error(`Failed to watch ${e.symbol}`);return!0}updateChainId(e){this.actions.update({chainId:p(e)})}updateAccounts(e){this.actions.update({accounts:e})}onConnect({chainId:e}){this.updateChainId(e)}onDisconnect(e){this.onError?.(e)}onChainChanged(e){this.updateChainId(e)}onAccountsChanged(e){this.updateAccounts(e)}addEventListeners(){if(!this.provider)return;const e=this.onConnect.bind(this),t=this.onDisconnect.bind(this),n=this.onChainChanged.bind(this),r=this.onAccountsChanged.bind(this);return"function"===typeof this.provider.on?(this.provider.on("connect",e),this.provider.on("disconnect",t),this.provider.on("chainChanged",n),this.provider.on("accountsChanged",r)):(this.provider.addListener("connect",e),this.provider.addListener("disconnect",t),this.provider.addListener("chainChanged",n),this.provider.addListener("accountsChanged",r)),()=>{this.provider&&("function"===typeof this.provider.off?(this.provider.off("connect",e),this.provider.off("disconnect",t),this.provider.off("chainChanged",n),this.provider.off("accountsChanged",r)):"function"===typeof this.provider.removeListener&&(this.provider.removeListener("connect",e),this.provider.removeListener("disconnect",t),this.provider.removeListener("chainChanged",n),this.provider.removeListener("accountsChanged",r)))}}async switchChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:v(e)}]})}async addChain(e){if(!this.provider)throw this.providerNotFoundError;await this.provider.request({method:"wallet_addEthereumChain",params:[{...e,chainId:v(e.chainId)}]})}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){console.debug("Failed to request accounts with 'eth_requestAccounts', try to fallback to 'eth_accounts'");return await this.provider.request({method:"eth_accounts"})}}async requestChainId(){if(!this.provider)throw this.providerNotFoundError;return await this.provider.request({method:"eth_chainId"})}}var m=n(6832);const x={chainId:void 0,accounts:void 0,isConnecting:!1};var w=n(6498),C=n(79);let y,g=!1;const b=()=>{const[e,t]=(0,C.useState)(void 0!==y);return(0,C.useEffect)((()=>{if(e)return;let r=!1;return async function(){if(g)return y;g=!0;try{const e=await n.e(610).then(n.bind(n,6610));y=e.Web3Provider}catch{console.debug("@ethersproject/providers not available")}}().then((()=>{r||t(!0)})),()=>{r=!0}}),[e]),y};function j(e,t=[]){const[n,r]=(0,C.useState)();return(0,C.useEffect)((()=>{if(e&&t.length){let n=!1;return Promise.all(t.map((t=>e.lookupAddress(t)))).then((e=>{n||r(e.map((e=>e||void 0)))})).catch((e=>{n||(console.debug("Could not fetch ENS names",e),r(new Array(t.length).fill(void 0)))})),()=>{n=!0,r(void 0)}}}),[e,t]),n??new Array(t.length).fill(void 0)}const I=({useChainId:e,useAccounts:t,useIsConnecting:n})=>({useAccount:()=>t()?.[0],useIsConnected:()=>(({chainId:e,accounts:t,isConnecting:n})=>Boolean(e&&t?.length&&!n))({chainId:e(),accounts:t(),isConnecting:n()})}),k=(e,t)=>void 0===e&&void 0===t||(void 0!==e||void 0===t)&&((void 0===e||void 0!==t)&&(e?.length===t?.length&&!!e?.every(((e,n)=>e===t?.[n]))));const E=e=>{const{store:t,actions:n}=(()=>{const e=(0,m.Z)()((()=>x));let t=0;return{store:e,actions:{startConnection:function(){const n=++t;return e.setState({isConnecting:!0}),()=>{t===n&&e.setState({isConnecting:!1})}},update:function(n){if(void 0!==n.chainId&&h(n.chainId),void 0!==n.accounts)for(let e=0;e<n.accounts.length;e++)n.accounts[e]=l(n.accounts[e]);t++,e.setState((e=>{const t=n.chainId??e.chainId,r=n.accounts??e.accounts;let i=e.isConnecting;return i&&t&&r&&(i=!1),{chainId:t,accounts:r,isConnecting:i}}))},resetState:function(){t++,e.setState(x)}}}})(),r=e(n),i=(0,w.ZP)(t),o=(s=i,{useChainId:()=>s((e=>e.chainId)),useAccounts:()=>s((e=>e.accounts),k),useIsConnecting:()=>s((e=>e.isConnecting))});var s;const c=I(o),a=((e,{useAccounts:t,useChainId:n},{useAccount:r,useIsConnected:i})=>({useProvider:t=>{const r=i(),o=n(),s=b();return(0,C.useMemo)((()=>{if(s&&e.provider)return new s(e.provider,t)}),[s,r,o,t])},useENSNames:e=>j(e,t()),useENSName:e=>{const t=r();return j(e,(0,C.useMemo)((()=>void 0===t?[]:[t]),[t]))?.[0]}}))(r,o,c);return{name:r.name,connector:r,getState:()=>i.getState(),hooks:{...o,...c,...a}}};var P=n(8023);var A=n(2172),N={name:"Ether",symbol:"ETH",decimals:18},W={name:"Matic",symbol:"MATIC",decimals:18};function S(e){var t=_[e];return function(e){return!!e.nativeCurrency}(t)?{chainId:e,chainName:t.name,nativeCurrency:t.nativeCurrency,rpcUrls:t.urls,blockExplorerUrls:t.blockExplorerUrls}:e}var _={1:{urls:[A.env.infuraKey?"https://mainnet.infura.io/v3/".concat(A.env.infuraKey):"",A.env.alchemyKey?"https://eth-mainnet.alchemyapi.io/v2/".concat(A.env.alchemyKey):"","https://cloudflare-eth.com"].filter((function(e){return!!e})),name:"Mainnet"},3:{urls:[A.env.infuraKey?"https://ropsten.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Ropsten"},4:{urls:[A.env.infuraKey?"https://rinkeby.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Rinkeby"},5:{urls:[A.env.infuraKey?"https://goerli.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"G\xf6rli"},25:{urls:["https://evm-cronos.crypto.org"],name:"Cronos"},338:{urls:["https://evm-t3.cronos.org"],name:"Cronos Test"},42:{urls:[A.env.infuraKey?"https://kovan.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Kovan"},10:{urls:[A.env.infuraKey?"https://optimism-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://mainnet.optimism.io"].filter((function(e){return!!e})),name:"Optimism",nativeCurrency:N,blockExplorerUrls:["https://optimistic.etherscan.io"]},69:{urls:[A.env.infuraKey?"https://optimism-kovan.infura.io/v3/".concat(A.env.infuraKey):"","https://kovan.optimism.io"].filter((function(e){return!!e})),name:"Optimism Kovan",nativeCurrency:N,blockExplorerUrls:["https://kovan-optimistic.etherscan.io"]},42161:{urls:[A.env.infuraKey?"https://arbitrum-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://arb1.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum One",nativeCurrency:N,blockExplorerUrls:["https://arbiscan.io"]},421611:{urls:[A.env.infuraKey?"https://arbitrum-rinkeby.infura.io/v3/".concat(A.env.infuraKey):"","https://rinkeby.arbitrum.io/rpc"].filter((function(e){return!!e})),name:"Arbitrum Testnet",nativeCurrency:N,blockExplorerUrls:["https://testnet.arbiscan.io"]},137:{urls:[A.env.infuraKey?"https://polygon-mainnet.infura.io/v3/".concat(A.env.infuraKey):"","https://polygon-rpc.com"].filter((function(e){return!!e})),name:"Polygon Mainnet",nativeCurrency:W,blockExplorerUrls:["https://polygonscan.com"]},80001:{urls:[A.env.infuraKey?"https://polygon-mumbai.infura.io/v3/".concat(A.env.infuraKey):""].filter((function(e){return!!e})),name:"Polygon Mumbai",nativeCurrency:W,blockExplorerUrls:["https://mumbai.polygonscan.com"]}},F=Object.keys(_).reduce((function(e,t){var n=_[Number(t)].urls[0];return e[Number(t)]=n,e}),{});class K extends f{constructor(e,t,n){super("Coinbase Wallet",e,n),this.options=t}async detectProvider(){this.provider&&this.provider;const e=await Promise.all([n.e(375),n.e(59),n.e(116)]).then(n.bind(n,7059)),{url:t,...r}=this.options;return this.coinbaseWallet=new e.default(r),this.provider=this.coinbaseWallet.makeWeb3Provider(t),this.provider}get connected(){return!!this.provider?.selectedAddress}async autoConnect(){return await this.lazyInitialize(),this.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(){this.coinbaseWallet?.disconnect()}}var D=E((function(e){return new K(e,{appName:"@web3-wallet example",reloadOnDisconnect:!1,url:F[1]})}));class L extends f{async detectProvider(e=(()=>!0)){this.provider&&this.provider;const t=await n.e(934).then(n.t.bind(n,1934,23)),r=await t.default();if(!r)throw this.providerNotFoundError;let i=r;if(i=r.providers?.length?r.providers?.find(e):i&&e(i)?i:void 0,!i)throw this.providerNotFoundError;return this.provider=i,i}}const O=e=>!!e.isDesktopWallet;class Z extends L{constructor(e,t){super("Crypto.com Desktop Wallet",e,t)}async detectProvider(){return await super.detectProvider(O)}}var q=E((function(e){return new Z(e)}));const z=async(e=40,t=50)=>{const n=M();return n||0===e?n:(await(r=t,new Promise((e=>{setTimeout((()=>{e()}),r)}))),await z(e-1,t));var r},M=()=>{if("undefined"!==typeof window)return window.deficonnectProvider?window.deficonnectProvider:void 0};class U extends f{constructor(e,t,n){super("DeFi Wallet",e,n),this.options=t}async detectProvider(){this.provider&&this.provider;const e=await z();if(!e)throw this.providerNotFoundError;return this.provider=e,this.provider}async connect(e){const t=this.actions.startConnection();try{if(await this.lazyInitialize(),!this.provider)throw this.providerNotFoundError;await this.provider.connect({...this.options,chainId:e});if(e!==p(this.provider.chainId)){const t=p(e);await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:t}]})}}catch(n){throw t(),n}finally{this.provider?.chainId&&this.updateChainId(this.provider?.chainId),this.provider?.accounts&&this.updateAccounts(this.provider?.accounts)}}}const T=e=>!!e.isTrust&&window.navigator?.userAgent?.includes("DeFiWallet");class B extends L{constructor(e,t){super("DeFi Wallet",e,t)}async detectProvider(){return await super.detectProvider(T)}}const $=(e,t,n)=>(()=>{if("undefined"===typeof window)return!1;const e=navigator.userAgent||navigator.vendor||window.opera||"";return!!/android/i.test(e)||!!(/iPhone|iPad|iPod/i.test(e)||/Mac/i.test(e)&&"ontouchend"in document)||!!/BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(e)})()?new B(e,n):new U(e,t.extension,n);var H=E((function(e){return $(e,{extension:{chainType:"eth",appName:"@web3-wallet example",chainId:1,rpcUrls:{}}})}));const J=e=>!!e.isMetaMask;class R extends L{constructor(e,t){super("MetaMask",e,t)}async detectProvider(){return await super.detectProvider(J)}}var G=E((function(e){return new R(e)})),X=n(8774),V=n.n(X);class Q extends f{constructor({actions:e,options:t,onError:n}){super("WalletConnect",e,n),this.events=new(V()),this.onDisplayUri=(e,t)=>{this.events.emit("URI_AVAILABLE",t.params[0])},this.options=t}async detectProvider(){if(this.provider)return this.provider;const e=new((await Promise.all([n.e(375),n.e(761),n.e(571)]).then(n.bind(n,4761))).default)({...this.options});return this.provider=e,e}async requestAccounts(){if(!this.provider)throw this.providerNotFoundError;try{return await this.provider.request({method:"eth_requestAccounts"})}catch(e){throw"User closed modal"===e.message&&await this.disconnect(),e}}addEventListeners(){if(!this.provider)return;const e=super.addEventListeners(),t=this.onDisplayUri.bind(this);return this.provider.connector.on("display_uri",t),()=>{this.provider&&(e?.(),"function"===typeof this.provider.off?this.provider.off("display_uri",t):"function"===typeof this.provider.removeListener&&this.provider.removeListener("display_uri",t))}}async autoConnect(){return await this.lazyInitialize(),this.provider?.connected?await super.autoConnect():(console.debug("No existing connection"),!1)}async disconnect(){this.removeEventListeners?.(),super.disconnect(),await(this.provider?.disconnect()),this.provider=void 0}}var Y=((e,t={})=>{const{defaultCurrentWallet:n,key:r="@web3-wallet"}=t;if(!e.length)throw new Error("wallets can't be empty");const i=(0,w.ZP)()((0,P.tJ)((()=>({connectionId:void 0,currentWallet:n||e[0].name})),{name:r,version:0})),o=e=>{i.setState({currentWallet:e})},s=()=>{const t=i((e=>e.currentWallet));return(0,C.useMemo)((()=>{const n=e.find((e=>e.name===t));return n||o(e[0].name),n??e[0]}),[t])};return{...(()=>{const t={};for(const n of Object.keys(e[0].hooks).sort())t[n]=(...t)=>{let r;const o=i.getState().currentWallet;for(const i of e){const e=(0,i.hooks[n])(...t);i.name===o&&(r=e)}return r};return t})(),wallets:e.slice(),useCurrentWallet:s,setCurrentWallet:o,useConnectionId:()=>i((e=>e.connectionId)),useConnect:()=>{const e=s();return async(...t)=>{await e.connector.connect(...t),i.setState({connectionId:Date.now()})}},useAutoConnect:()=>{const e=s();return async(...t)=>{const n=await e.connector.autoConnect(...t);return i.setState({connectionId:Date.now()}),n}},useAutoConnectOnce:()=>{const e=s();return async(...t)=>i.getState().connectionId?await e.connector.autoConnectOnce(...t):(console.debug("connectionId don't exists, auto connect is suppressed"),!1)},useDisconnect:()=>{const e=s();return async(...t)=>{const n=await e.connector.disconnect(...t);return i.setState({connectionId:void 0}),n}}}})([G,H,D,E((function(e){return new Q({actions:e,options:{rpc:F}})})),q]),ee=n(2825),te=n(7264),ne=n(2569),re=n(9240),ie=function(e){var t=e.account,n=e.leadingChars,i=void 0===n?4:n,s=e.tailingChars,c=void 0===s?4:s,a=(0,re.Z)(e,["account","leadingChars","tailingChars"]);return t?(0,r.jsxs)(o.xv,(0,ne.Z)((0,te.Z)({as:"span"},a),{children:[t.slice(0,i),"...",t.slice(-c)]})):null},oe=function(e){var t=e.accounts,n=e.provider,i=e.ENSNames,s=function(e,t){var n=(0,C.useState)(),r=n[0],i=n[1];return(0,C.useEffect)((function(){if(e&&(null===t||void 0===t?void 0:t.length)){var n=!1;return Promise.all(t.map((function(t){return e.getBalance(t)}))).then((function(e){n||i(e)})),function(){n=!0,i(void 0)}}}),[e,t]),r}(n,t);return void 0===t?null:0===t.length?(0,r.jsxs)(o.kC,{gap:2,children:[(0,r.jsx)(o.xv,{children:"Account:"}),(0,r.jsx)(o.xv,{children:"None"})]}):(0,r.jsx)(r.Fragment,{children:t.map((function(e,t){return(null===i||void 0===i?void 0:i[t])?null===i||void 0===i?void 0:i[t]:(0,r.jsxs)(C.Fragment,{children:[(0,r.jsxs)(o.kC,{gap:2,children:[(0,r.jsx)(o.xv,{as:"span",children:"Account:"}),(0,r.jsx)(ie,{account:e,fontWeight:"bold"})]}),(0,r.jsxs)(o.kC,{gap:2,children:[(0,r.jsx)(o.xv,{children:"Balance:"}),(0,r.jsx)(o.xv,{fontWeight:"bold",children:(null===s||void 0===s?void 0:s[t])?"".concat(Number((0,ee.dF)(s[t])).toFixed(4)):"--"})]})]},e)}))})},se=function(e){var t,n=e.chainId;if(void 0===n)return null;var i=n?null===(t=_[n])||void 0===t?void 0:t.name:void 0;return i?(0,r.jsxs)(o.kC,{gap:2,children:[(0,r.jsx)(o.xv,{children:"Chain:"}),(0,r.jsxs)(o.xv,{fontWeight:"bold",children:[i," (",n,")"]})]}):(0,r.jsxs)(o.kC,{gap:2,children:[(0,r.jsx)(o.xv,{children:"Chain Id:"}),(0,r.jsx)(o.xv,{fontWeight:"bold",children:n})]})},ce=n(1249),ae=n(5354),ue=n.n(ae),de=n(3850),he=n(6053),le=function(e){var t,n=e.chainId,i=e.switchChain,o=e.chainIds;return(0,r.jsx)(he.Ph,{value:n,onChange:function(e){null===i||void 0===i||i(Number(e.target.value))},disabled:void 0===i,children:o.map((function(e){var n;return(0,r.jsx)("option",{value:e,children:null!==(t=null===(n=_[e])||void 0===n?void 0:n.name)&&void 0!==t?t:e},e)}))})},pe=function(e){var t=e.connect,n=e.disconnect,i=e.chainId,c=e.isConnecting,a=e.isConnected,u=Object.keys(F).map((function(e){return Number(e)})),d=(0,C.useState)(i||1),h=d[0],l=d[1],p=(0,de.pm)(),v=(0,C.useCallback)((function(e){l(e),t(S(e))}),[t]);return a?(0,r.jsxs)(o.kC,{flexDirection:"column",gap:4,children:[(0,r.jsx)(le,{chainId:h,switchChain:v,chainIds:u}),(0,r.jsx)(s.zx,{colorScheme:"red",onClick:(0,ce.Z)(ue().mark((function e(){return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.warn("connect error: ",e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Disconnect"})]}):(0,r.jsxs)(o.kC,{flexDirection:"column",gap:4,children:[(0,r.jsx)(le,{chainId:h,switchChain:c?void 0:v,chainIds:u}),(0,r.jsx)(s.zx,{colorScheme:"blue",disabled:c,onClick:(0,ce.Z)(ue().mark((function e(){return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t(S(h));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),p({position:"top-right",status:"error",description:e.t0.message});case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),children:"Connect"})]})},ve=function(e){var t=e.children,n=e.ssrPlaceholder;return function(){var e=(0,C.useState)(!1),t=e[0],n=e[1];return(0,C.useEffect)((function(){n(!0)}),[]),t}()?(0,r.jsx)(r.Fragment,{children:t}):(0,r.jsx)(r.Fragment,{children:n})},fe=n(8494),me=function(e){var t=(0,fe.Z)({},e);return(0,r.jsx)(o.kC,(0,te.Z)({flexDirection:"column",gap:4,p:3,borderColor:"gray.200",borderWidth:"1px",borderRadius:"8px"},t))},xe=function(e){var t=e.wallets,n=e.selectedWalletName,i=e.setSelectedWallet;return(0,r.jsx)(he.Ph,{value:n,onChange:function(e){i(e.target.value)},children:t.map((function(e){return(0,r.jsx)("option",{value:e.name,children:e.name},e.name)}))})},we=function(e){var t=e.isConnecting,n=e.isConnected;return(0,r.jsx)(o.xu,{children:t?(0,r.jsx)(r.Fragment,{children:"\ud83d\udfe1 Connecting"}):n?(0,r.jsx)(r.Fragment,{children:"\ud83d\udfe2 Connected"}):(0,r.jsx)(r.Fragment,{children:"\u26aa\ufe0f Disconnected"})})},Ce=function(){var e=Y.wallets,t=Y.useCurrentWallet,n=Y.setCurrentWallet,i=Y.useConnect,s=Y.useDisconnect,c=Y.useAutoConnectOnce,a=Y.useIsConnecting,u=Y.useIsConnected,d=Y.useAccounts,h=Y.useChainId,l=Y.useENSNames,p=Y.useProvider,v=t(),f=i(),m=c(),x=s(),w=a(),y=u(),g=h(),b=d(),j=p(),I=l(j);return(0,C.useEffect)((function(){m()}),[m]),(0,r.jsx)(ve,{children:(0,r.jsxs)(me,{style:{minWidth:"280px",maxWidth:"420px",width:"100%"},children:[(0,r.jsx)(xe,{wallets:e,selectedWalletName:v.name,setSelectedWallet:n}),(0,r.jsxs)(me,{children:[(0,r.jsx)(o.xv,{fontWeight:"bold",children:v.name}),(0,r.jsx)(we,{isConnecting:w,isConnected:y}),(0,r.jsx)(se,{chainId:g}),(0,r.jsx)(oe,{accounts:b,provider:j,ENSNames:I}),(0,r.jsx)(pe,{connect:f,disconnect:x,chainId:g,isConnecting:w,isConnected:y})]})]})})},ye=n(370),ge=n.n(ye),be=n(3675);function je(){return(0,r.jsxs)(a.A,{children:[(0,r.jsx)(ge(),{children:(0,r.jsx)("title",{children:"Home | Web3 Wallet "})}),(0,r.jsx)(o.LZ,{my:12}),(0,r.jsxs)(o.kC,{flexDirection:"column",gap:12,children:[(0,r.jsxs)(o.X6,{as:"h1",textAlign:"center",m:"0 auto",width:{base:"100",lg:"80%"},children:["A"," ",(0,r.jsx)(o.xv,{as:"span",color:"yellow.500",children:"Modular"}),","," ",(0,r.jsx)(o.xv,{as:"span",color:"green.500",children:"Extensible"})," ","and"," ",(0,r.jsx)(o.xv,{as:"span",color:"red.500",children:"Flexible"})," ","web3 wallet framework for building dApps"]}),(0,r.jsx)(o.kC,{justifyContent:"center",children:(0,r.jsx)(Ce,{})}),(0,r.jsxs)(o.kC,{gap:{base:4,lg:6},justifyContent:"center",children:[(0,r.jsx)(s.zx,{rightIcon:(0,r.jsx)(i.mr,{}),colorScheme:"blue",children:"Get Started"}),(0,r.jsx)(o.rU,{display:"flex",justifySelf:"end",_hover:{textDecoration:"none"},href:"https://github.com/web3-wallet/web3-wallet",target:"_blank",children:(0,r.jsx)(s.zx,{leftIcon:(0,r.jsx)(c.JO,{as:be.idJ}),variant:"outline",children:"Github"})})]})]})]})}},4712:function(){}},function(e){e.O(0,[613,268,295,774,888,179],(function(){return t=2761,e(e.s=t);var t}));var t=e.O();_N_E=t}]);