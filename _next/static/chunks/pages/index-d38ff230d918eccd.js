(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2761:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4494)}])},4494:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return q}});var n=r(5250),i=r(7264);function o(t,e){return e=null!=e?e:{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):function(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))})),t}function s(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}var a=function(t){return(0,n.jsx)("div",(0,i.Z)({},t))},l=function(t){var e=t.children,r=t.style,l=s(t,["children","style"]);return(0,n.jsx)(a,o((0,i.Z)({style:(0,i.Z)({margin:"1em"},r)},l),{children:e}))},c=r(6858),u=r(79),d=r(6801),f=r(3330),m=r(3216),h=r(4815);const v=new f.Yd(m.i),g={},x=h.O$.from(0),p=h.O$.from(-1);function w(t,e,r,n){const i={fault:e,operation:r};return void 0!==n&&(i.value=n),v.throwError(t,f.Yd.errors.NUMERIC_FAULT,i)}let b="0";for(;b.length<256;)b+=b;function j(t){if("number"!==typeof t)try{t=h.O$.from(t).toNumber()}catch(e){}return"number"===typeof t&&t>=0&&t<=256&&!(t%1)?"1"+b.substring(0,t):v.throwArgumentError("invalid decimal size","decimals",t)}function y(t,e){null==e&&(e=0);const r=j(e),n=(t=h.O$.from(t)).lt(x);n&&(t=t.mul(p));let i=t.mod(r).toString();for(;i.length<r.length-1;)i="0"+i;i=i.match(/^([0-9]*[1-9]|0)(0*)/)[1];const o=t.div(r).toString();return t=1===r.length?o:o+"."+i,n&&(t="-"+t),t}function O(t,e){null==e&&(e=0);const r=j(e);"string"===typeof t&&t.match(/^-?[0-9.]+$/)||v.throwArgumentError("invalid decimal value","value",t);const n="-"===t.substring(0,1);n&&(t=t.substring(1)),"."===t&&v.throwArgumentError("missing value","value",t);const i=t.split(".");i.length>2&&v.throwArgumentError("too many decimal points","value",t);let o=i[0],s=i[1];for(o||(o="0"),s||(s="0");"0"===s[s.length-1];)s=s.substring(0,s.length-1);for(s.length>r.length-1&&w("fractional component exceeds decimals","underflow","parseFixed"),""===s&&(s="0");s.length<r.length-1;)s+="0";const a=h.O$.from(o),l=h.O$.from(s);let c=a.mul(r).add(l);return n&&(c=c.mul(p)),c}class _{constructor(t,e,r,n){t!==g&&v.throwError("cannot use FixedFormat constructor; use FixedFormat.from",f.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.signed=e,this.width=r,this.decimals=n,this.name=(e?"":"u")+"fixed"+String(r)+"x"+String(n),this._multiplier=j(n),Object.freeze(this)}static from(t){if(t instanceof _)return t;"number"===typeof t&&(t=`fixed128x${t}`);let e=!0,r=128,n=18;if("string"===typeof t)if("fixed"===t);else if("ufixed"===t)e=!1;else{const i=t.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);i||v.throwArgumentError("invalid fixed format","format",t),e="u"!==i[1],r=parseInt(i[2]),n=parseInt(i[3])}else if(t){const i=(e,r,n)=>null==t[e]?n:(typeof t[e]!==r&&v.throwArgumentError("invalid fixed format ("+e+" not "+r+")","format."+e,t[e]),t[e]);e=i("signed","boolean",e),r=i("width","number",r),n=i("decimals","number",n)}return r%8&&v.throwArgumentError("invalid fixed format width (not byte aligned)","format.width",r),n>80&&v.throwArgumentError("invalid fixed format (decimals too large)","format.decimals",n),new _(g,e,r,n)}}class E{constructor(t,e,r,n){t!==g&&v.throwError("cannot use FixedNumber constructor; use FixedNumber.from",f.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.format=n,this._hex=e,this._value=r,this._isFixedNumber=!0,Object.freeze(this)}_checkFormat(t){this.format.name!==t.format.name&&v.throwArgumentError("incompatible format; use fixedNumber.toFormat","other",t)}addUnsafe(t){this._checkFormat(t);const e=O(this._value,this.format.decimals),r=O(t._value,t.format.decimals);return E.fromValue(e.add(r),this.format.decimals,this.format)}subUnsafe(t){this._checkFormat(t);const e=O(this._value,this.format.decimals),r=O(t._value,t.format.decimals);return E.fromValue(e.sub(r),this.format.decimals,this.format)}mulUnsafe(t){this._checkFormat(t);const e=O(this._value,this.format.decimals),r=O(t._value,t.format.decimals);return E.fromValue(e.mul(r).div(this.format._multiplier),this.format.decimals,this.format)}divUnsafe(t){this._checkFormat(t);const e=O(this._value,this.format.decimals),r=O(t._value,t.format.decimals);return E.fromValue(e.mul(this.format._multiplier).div(r),this.format.decimals,this.format)}floor(){const t=this.toString().split(".");1===t.length&&t.push("0");let e=E.from(t[0],this.format);const r=!t[1].match(/^(0*)$/);return this.isNegative()&&r&&(e=e.subUnsafe(F.toFormat(e.format))),e}ceiling(){const t=this.toString().split(".");1===t.length&&t.push("0");let e=E.from(t[0],this.format);const r=!t[1].match(/^(0*)$/);return!this.isNegative()&&r&&(e=e.addUnsafe(F.toFormat(e.format))),e}round(t){null==t&&(t=0);const e=this.toString().split(".");if(1===e.length&&e.push("0"),(t<0||t>80||t%1)&&v.throwArgumentError("invalid decimal count","decimals",t),e[1].length<=t)return this;const r=E.from("1"+b.substring(0,t),this.format),n=N.toFormat(this.format);return this.mulUnsafe(r).addUnsafe(n).floor().divUnsafe(r)}isZero(){return"0.0"===this._value||"0"===this._value}isNegative(){return"-"===this._value[0]}toString(){return this._value}toHexString(t){if(null==t)return this._hex;t%8&&v.throwArgumentError("invalid byte width","width",t);const e=h.O$.from(this._hex).fromTwos(this.format.width).toTwos(t).toHexString();return(0,d.$m)(e,t/8)}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(t){return E.fromString(this._value,t)}static fromValue(t,e,r){return null!=r||null==e||(0,h.Zm)(e)||(r=e,e=null),null==e&&(e=0),null==r&&(r="fixed"),E.fromString(y(t,e),_.from(r))}static fromString(t,e){null==e&&(e="fixed");const r=_.from(e),n=O(t,r.decimals);!r.signed&&n.lt(x)&&w("unsigned value cannot be negative","overflow","value",t);let i=null;r.signed?i=n.toTwos(r.width).toHexString():(i=n.toHexString(),i=(0,d.$m)(i,r.width/8));const o=y(n,r.decimals);return new E(g,i,o,r)}static fromBytes(t,e){null==e&&(e="fixed");const r=_.from(e);if((0,d.lE)(t).length>r.width/8)throw new Error("overflow");let n=h.O$.from(t);r.signed&&(n=n.fromTwos(r.width));const i=n.toTwos((r.signed?0:1)+r.width).toHexString(),o=y(n,r.decimals);return new E(g,i,o,r)}static from(t,e){if("string"===typeof t)return E.fromString(t,e);if((0,d._t)(t))return E.fromBytes(t,e);try{return E.fromValue(t,0,e)}catch(r){if(r.code!==f.Yd.errors.INVALID_ARGUMENT)throw r}return v.throwArgumentError("invalid FixedNumber value","value",t)}static isFixedNumber(t){return!(!t||!t._isFixedNumber)}}const F=E.from(1),N=E.from("0.5"),A=(new f.Yd("units/5.7.0"),["wei","kwei","mwei","gwei","szabo","finney","ether"]);function S(t){return function(t,e){if("string"===typeof e){const t=A.indexOf(e);-1!==t&&(e=3*t)}return y(t,null!=e?e:18)}(t,18)}var P=function(t){var e=t.account,r=t.leadingChars,i=void 0===r?4:r,o=t.tailingChars,s=void 0===o?4:o;return e?(0,n.jsxs)("span",{children:[e.slice(0,i),"...",e.slice(-s)]}):null},C=function(t){var e=t.accounts,r=t.provider,i=t.ENSNames,o=function(t,e){var r=(0,u.useState)(),n=r[0],i=r[1];return(0,u.useEffect)((function(){if(t&&(null===e||void 0===e?void 0:e.length)){var r=!1;return Promise.all(e.map((function(e){return t.getBalance(e)}))).then((function(t){r||i(t)})),function(){r=!0,i(void 0)}}}),[t,e]),n}(r,e);return void 0===e?null:0===e.length?(0,n.jsxs)("div",{children:["Accounts: ",(0,n.jsx)("b",{children:"None"})]}):(0,n.jsxs)("div",{children:["Accounts:"," ",(0,n.jsx)("b",{children:e.map((function(t,e){return(null===i||void 0===i?void 0:i[e])?null===i||void 0===i?void 0:i[e]:(0,n.jsxs)("div",{style:{display:"flex"},children:[(0,n.jsx)(P,{account:t}),(0,n.jsx)("div",{children:!!(null===o||void 0===o?void 0:o[e])&&" (\u039e".concat(Number(S(o[e])).toFixed(4),")")})]},t)}))})]})},k=function(t){var e=t.style,r=s(t,["style"]);return(0,n.jsx)(a,(0,i.Z)({style:(0,i.Z)({display:"flex",flexDirection:"column",gap:"1rem",justifyContent:"space-between",padding:"1rem",overflow:"auto",border:"1px solid #999",borderRadius:"0.5rem"},e)},r))},I=r(3626),D=function(t){var e,r=t.chainId;if(void 0===r)return null;var i=r?null===(e=I.zG[r])||void 0===e?void 0:e.name:void 0;return i?(0,n.jsxs)("div",{children:["Chain:"," ",(0,n.jsxs)("b",{children:[i," (",r,")"]})]}):(0,n.jsxs)("div",{children:["Chain Id: ",(0,n.jsx)("b",{children:r})]})};function U(t,e,r,n,i,o,s){try{var a=t[o](s),l=a.value}catch(c){return void r(c)}a.done?e(l):Promise.resolve(l).then(n,i)}var $=r(5354),T=r.n($),Z=function(t){var e,r=t.chainId,i=t.switchChain,o=t.displayDefault,s=t.chainIds;return(0,n.jsxs)("select",{value:r,onChange:function(t){null===i||void 0===i||i(Number(t.target.value))},style:{height:"32px",padding:"2px 10px",cursor:"pointer"},disabled:void 0===i,children:[o?(0,n.jsx)("option",{value:-1,children:"Default Chain"}):null,s.map((function(t){var r;return(0,n.jsx)("option",{value:t,children:null!==(e=null===(r=I.zG[t])||void 0===r?void 0:r.name)&&void 0!==e?e:t},t)}))]})},R=function(t){var e,r=t.connector,i=t.chainId,o=t.isActivating,s=t.isActive,a=r,l=!a,c=(a?Object.keys(I.Mi):Object.keys(I.zG)).map((function(t){return Number(t)})),d=(0,u.useState)(a?1:-1),f=d[0],m=d[1],h=(0,u.useCallback)((function(t){m(t),r.activate(-1===t?void 0:(0,I.RP)(t))}),[r]);return s?(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,n.jsx)(Z,{chainId:-1===f?-1:i||1,switchChain:h,displayDefault:l,chainIds:c}),(0,n.jsx)("button",{style:{height:"32px",cursor:"pointer"},onClick:(e=T().mark((function t(){return T().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(null===r||void 0===r?void 0:r.deactivate)){t.next=11;break}return t.prev=1,t.next=4,r.deactivate();case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.warn("activate error: ",t.t0);case 9:t.next=12;break;case 11:r.resetState();case 12:case"end":return t.stop()}}),t,null,[[1,6]])})),function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function s(t){U(o,n,i,s,a,"next",t)}function a(t){U(o,n,i,s,a,"throw",t)}s(void 0)}))}),children:"Disconnect"})]}):(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,n.jsx)(Z,{chainId:f,switchChain:o?void 0:h,displayDefault:l,chainIds:c}),(0,n.jsx)("button",{style:{height:"32px",cursor:"pointer"},onClick:function(){o||r.activate(-1===f?void 0:(0,I.RP)(f))},disabled:o,children:"Connect"})]})},z=function(t){var e=t.isActivating,r=t.isActive;return(0,n.jsx)("div",{children:e?(0,n.jsx)(n.Fragment,{children:"\ud83d\udfe1 Connecting"}):r?(0,n.jsx)(n.Fragment,{children:"\ud83d\udfe2 Connected"}):(0,n.jsx)(n.Fragment,{children:"\u26aa\ufe0f Disconnected"})})},V=function(t){var e=t.wallet,r=e.connector,i=e.hooks,o=i.useChainId,s=i.useAccounts,a=i.useIsActivating,l=i.useIsActive,c=i.useProvider,d=i.useENSNames,f=o(),m=s(),h=a(),v=l(),g=c(),x=d(g);return(0,u.useEffect)((function(){var t;null===(t=r.connectEagerly())||void 0===t||t.catch((function(t){console.debug("Failed to connect eagerly",t)}))}),[r]),(0,n.jsxs)(k,{children:[(0,n.jsx)("b",{children:e.name}),(0,n.jsx)("div",{children:"Category: Ethereum"}),(0,n.jsx)(z,{isActivating:h,isActive:v}),(0,n.jsx)(D,{chainId:f}),(0,n.jsx)(C,{accounts:m,provider:g,ENSNames:x}),(0,n.jsx)(R,{connector:r,chainId:f,isActivating:h,isActive:v})]})},W=r(574),Y=r(758),H=Object.values(c),G=Object.values(c),M=function(){var t=(0,W.P)(),e=t.currentWallet,r=t.switchCurrentWallet;return(0,n.jsx)("select",{value:e,onChange:function(t){r(t.target.value)},style:{height:"32px",padding:"2px 10px",cursor:"pointer"},children:G.map((function(t){return(0,n.jsx)("option",{value:t.name,children:t.name},t.name)}))})},B=function(){var t=function(){var t=(0,W.P)().currentWallet;return(0,Y.Zq)(t,H)}();return(0,n.jsxs)(k,{children:[(0,n.jsx)(M,{}),(0,n.jsx)(V,{wallet:t})]})},L=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(B,{}),(0,n.jsx)(V,{wallet:c.metaMask}),(0,n.jsx)(V,{wallet:c.defiWallet}),(0,n.jsx)(V,{wallet:c.walletConnect}),(0,n.jsx)(V,{wallet:c.coinbaseWallet})]})},X=function(t){var e=t.style,r=s(t,["style"]);return(0,n.jsx)(a,(0,i.Z)({style:(0,i.Z)({display:"grid",alignItems:"start",flexDirection:"column",flexWrap:"wrap",gap:"1rem",margin:"2rem 0",gridTemplateColumns:"repeat(auto-fill, minmax(15rem, 1fr))"},e)},r))};function q(){return(0,n.jsx)(l,{children:(0,n.jsx)(X,{children:(0,n.jsx)(L,{})})})}}},function(t){t.O(0,[774,888,179],(function(){return e=2761,t(t.s=e);var e}));var e=t.O();_N_E=e}]);