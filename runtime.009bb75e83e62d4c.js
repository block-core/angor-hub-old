(()=>{"use strict";var e,v={},g={};function a(e){var n=g[e];if(void 0!==n)return n.exports;var r=g[e]={id:e,loaded:!1,exports:{}};return v[e].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=v,e=[],a.O=(n,r,i,o)=>{if(!r){var t=1/0;for(f=0;f<e.length;f++){for(var[r,i,o]=e[f],u=!0,d=0;d<r.length;d++)(!1&o||t>=o)&&Object.keys(a.O).every(b=>a.O[b](r[d]))?r.splice(d--,1):(u=!1,o<t&&(t=o));if(u){e.splice(f--,1);var l=i();void 0!==l&&(n=l)}}return n}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[r,i,o]},a.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return a.d(n,{a:n}),n},a.d=(e,n)=>{for(var r in n)a.o(n,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce((n,r)=>(a.f[r](e,n),n),[])),a.u=e=>(76===e?"common":e)+"."+{19:"70079242a76e5ac9",76:"16b503bbb1f6c7c9",78:"5caf1509a6050d9a",218:"64f3a2b859958849",253:"ffa684c738a488e0",258:"44b3c86409f113ab",514:"0a3b7bd602857188",541:"75cbb990decb0405",588:"d580e43517efd360",770:"22c4f416c88fadd5",790:"5ffd55c7d91035ec",907:"74a943e4303c7347",963:"7b583874ed92bb4d"}[e]+".js",a.miniCssF=e=>{},a.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="angor:";a.l=(r,i,o,f)=>{if(e[r])e[r].push(i);else{var t,u;if(void 0!==o)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var c=d[l];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==n+o){t=c;break}}t||(u=!0,(t=document.createElement("script")).type="module",t.charset="utf-8",t.timeout=120,a.nc&&t.setAttribute("nonce",a.nc),t.setAttribute("data-webpack",n+o),t.src=a.tu(r)),e[r]=[i];var s=(m,b)=>{t.onerror=t.onload=null,clearTimeout(p);var h=e[r];if(delete e[r],t.parentNode&&t.parentNode.removeChild(t),h&&h.forEach(_=>_(b)),m)return m(b)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=s.bind(null,t.onerror),t.onload=s.bind(null,t.onload),u&&document.head.appendChild(t)}}})(),a.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;a.tt=()=>(void 0===e&&(e={createScriptURL:n=>n},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),a.tu=e=>a.tt().createScriptURL(e),a.p="",(()=>{var e={121:0};a.f.j=(i,o)=>{var f=a.o(e,i)?e[i]:void 0;if(0!==f)if(f)o.push(f[2]);else if(121!=i){var t=new Promise((c,s)=>f=e[i]=[c,s]);o.push(f[2]=t);var u=a.p+a.u(i),d=new Error;a.l(u,c=>{if(a.o(e,i)&&(0!==(f=e[i])&&(e[i]=void 0),f)){var s=c&&("load"===c.type?"missing":c.type),p=c&&c.target&&c.target.src;d.message="Loading chunk "+i+" failed.\n("+s+": "+p+")",d.name="ChunkLoadError",d.type=s,d.request=p,f[1](d)}},"chunk-"+i,i)}else e[i]=0},a.O.j=i=>0===e[i];var n=(i,o)=>{var d,l,[f,t,u]=o,c=0;if(f.some(p=>0!==e[p])){for(d in t)a.o(t,d)&&(a.m[d]=t[d]);if(u)var s=u(a)}for(i&&i(o);c<f.length;c++)a.o(e,l=f[c])&&e[l]&&e[l][0](),e[l]=0;return a.O(s)},r=self.webpackChunkangor=self.webpackChunkangor||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))})()})();