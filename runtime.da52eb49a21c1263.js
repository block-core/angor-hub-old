(()=>{"use strict";var e,v={},g={};function r(e){var n=g[e];if(void 0!==n)return n.exports;var a=g[e]={id:e,loaded:!1,exports:{}};return v[e].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=v,e=[],r.O=(n,a,i,o)=>{if(!a){var t=1/0;for(f=0;f<e.length;f++){for(var[a,i,o]=e[f],c=!0,d=0;d<a.length;d++)(!1&o||t>=o)&&Object.keys(r.O).every(p=>r.O[p](a[d]))?a.splice(d--,1):(c=!1,o<t&&(t=o));if(c){e.splice(f--,1);var u=i();void 0!==u&&(n=u)}}return n}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[a,i,o]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var a in n)r.o(n,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((n,a)=>(r.f[a](e,n),n),[])),r.u=e=>(76===e?"common":e)+"."+{19:"70079242a76e5ac9",76:"16b503bbb1f6c7c9",78:"5caf1509a6050d9a",167:"d80a72fb04bbd8cb",218:"64f3a2b859958849",253:"ffa684c738a488e0",258:"44b3c86409f113ab",514:"0a3b7bd602857188",541:"75cbb990decb0405",588:"d580e43517efd360",770:"22c4f416c88fadd5",907:"74a943e4303c7347",963:"7b583874ed92bb4d"}[e]+".js",r.miniCssF=e=>{},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="angor:";r.l=(a,i,o,f)=>{if(e[a])e[a].push(i);else{var t,c;if(void 0!==o)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var l=d[u];if(l.getAttribute("src")==a||l.getAttribute("data-webpack")==n+o){t=l;break}}t||(c=!0,(t=document.createElement("script")).type="module",t.charset="utf-8",t.timeout=120,r.nc&&t.setAttribute("nonce",r.nc),t.setAttribute("data-webpack",n+o),t.src=r.tu(a)),e[a]=[i];var s=(m,p)=>{t.onerror=t.onload=null,clearTimeout(b);var h=e[a];if(delete e[a],t.parentNode&&t.parentNode.removeChild(t),h&&h.forEach(_=>_(p)),m)return m(p)},b=setTimeout(s.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=s.bind(null,t.onerror),t.onload=s.bind(null,t.onload),c&&document.head.appendChild(t)}}})(),r.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tt=()=>(void 0===e&&(e={createScriptURL:n=>n},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),r.tu=e=>r.tt().createScriptURL(e),r.p="",(()=>{var e={121:0};r.f.j=(i,o)=>{var f=r.o(e,i)?e[i]:void 0;if(0!==f)if(f)o.push(f[2]);else if(121!=i){var t=new Promise((l,s)=>f=e[i]=[l,s]);o.push(f[2]=t);var c=r.p+r.u(i),d=new Error;r.l(c,l=>{if(r.o(e,i)&&(0!==(f=e[i])&&(e[i]=void 0),f)){var s=l&&("load"===l.type?"missing":l.type),b=l&&l.target&&l.target.src;d.message="Loading chunk "+i+" failed.\n("+s+": "+b+")",d.name="ChunkLoadError",d.type=s,d.request=b,f[1](d)}},"chunk-"+i,i)}else e[i]=0},r.O.j=i=>0===e[i];var n=(i,o)=>{var d,u,[f,t,c]=o,l=0;if(f.some(b=>0!==e[b])){for(d in t)r.o(t,d)&&(r.m[d]=t[d]);if(c)var s=c(r)}for(i&&i(o);l<f.length;l++)r.o(e,u=f[l])&&e[u]&&e[u][0](),e[u]=0;return r.O(s)},a=self.webpackChunkangor=self.webpackChunkangor||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))})()})();