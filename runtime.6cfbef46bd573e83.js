(()=>{"use strict";var e,v={},g={};function r(e){var n=g[e];if(void 0!==n)return n.exports;var a=g[e]={id:e,loaded:!1,exports:{}};return v[e].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=v,e=[],r.O=(n,a,d,i)=>{if(!a){var t=1/0;for(f=0;f<e.length;f++){for(var[a,d,i]=e[f],c=!0,o=0;o<a.length;o++)(!1&i||t>=i)&&Object.keys(r.O).every(p=>r.O[p](a[o]))?a.splice(o--,1):(c=!1,i<t&&(t=i));if(c){e.splice(f--,1);var u=d();void 0!==u&&(n=u)}}return n}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[a,d,i]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var a in n)r.o(n,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((n,a)=>(r.f[a](e,n),n),[])),r.u=e=>(76===e?"common":e)+"."+{45:"f9622467136b8dbc",76:"6ad480d0e9aeb8cb",87:"89382f6778c57112",232:"e86c6a10c949ded0",256:"0e13c4fd2d85a687",318:"afda1c4d799c528b",371:"1350987134a35fcd",394:"1387a9799f07f379",512:"385c30caa64e99b0",523:"1d564178fdfd679e",544:"eda92231287fa498",556:"14e4bee993e6d7c2",664:"8a10de4594052b2f",767:"50dd038de7823a73",785:"c49546197fdfc756",824:"6e75a4f11fee28b5",836:"dbe90a7b5bc003c1",859:"5c6e13c9e52b4d5a",863:"9049fc70a830e027",957:"5e3037fca5fc8f88"}[e]+".js",r.miniCssF=e=>{},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="angor:";r.l=(a,d,i,f)=>{if(e[a])e[a].push(d);else{var t,c;if(void 0!==i)for(var o=document.getElementsByTagName("script"),u=0;u<o.length;u++){var l=o[u];if(l.getAttribute("src")==a||l.getAttribute("data-webpack")==n+i){t=l;break}}t||(c=!0,(t=document.createElement("script")).type="module",t.charset="utf-8",t.timeout=120,r.nc&&t.setAttribute("nonce",r.nc),t.setAttribute("data-webpack",n+i),t.src=r.tu(a)),e[a]=[d];var s=(m,p)=>{t.onerror=t.onload=null,clearTimeout(b);var h=e[a];if(delete e[a],t.parentNode&&t.parentNode.removeChild(t),h&&h.forEach(_=>_(p)),m)return m(p)},b=setTimeout(s.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=s.bind(null,t.onerror),t.onload=s.bind(null,t.onload),c&&document.head.appendChild(t)}}})(),r.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tt=()=>(void 0===e&&(e={createScriptURL:n=>n},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),r.tu=e=>r.tt().createScriptURL(e),r.p="",(()=>{var e={121:0};r.f.j=(d,i)=>{var f=r.o(e,d)?e[d]:void 0;if(0!==f)if(f)i.push(f[2]);else if(121!=d){var t=new Promise((l,s)=>f=e[d]=[l,s]);i.push(f[2]=t);var c=r.p+r.u(d),o=new Error;r.l(c,l=>{if(r.o(e,d)&&(0!==(f=e[d])&&(e[d]=void 0),f)){var s=l&&("load"===l.type?"missing":l.type),b=l&&l.target&&l.target.src;o.message="Loading chunk "+d+" failed.\n("+s+": "+b+")",o.name="ChunkLoadError",o.type=s,o.request=b,f[1](o)}},"chunk-"+d,d)}else e[d]=0},r.O.j=d=>0===e[d];var n=(d,i)=>{var o,u,[f,t,c]=i,l=0;if(f.some(b=>0!==e[b])){for(o in t)r.o(t,o)&&(r.m[o]=t[o]);if(c)var s=c(r)}for(d&&d(i);l<f.length;l++)r.o(e,u=f[l])&&e[u]&&e[u][0](),e[u]=0;return r.O(s)},a=self.webpackChunkangor=self.webpackChunkangor||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))})()})();