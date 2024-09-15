import{a as tt}from"./chunk-XBXIGZ2B.js";import{G as we,k as _e}from"./chunk-R5DLBX2B.js";import{Vb as et,a as He,b as Je,c as oe,e as ar,g as ir,ga as ee,h as V,ha as Xe,ib as Ze,la as be,lb as qe,n as Ke,o as Qe,pa as Ge,qa as ke}from"./chunk-YLQD6FUN.js";var nt=ar((rt,Ee)=>{(function(D){if(typeof rt=="object"&&typeof Ee<"u")Ee.exports=D();else if(typeof define=="function"&&define.amd)define([],D);else{var y;typeof window<"u"?y=window:typeof global<"u"?y=global:typeof self<"u"?y=self:y=this,y.localforage=D()}})(function(){var D,y,fr;return function c(d,_,w){function C(A,U){if(!_[A]){if(!d[A]){var h=typeof oe=="function"&&oe;if(!U&&h)return h(A,!0);if(R)return R(A,!0);var g=new Error("Cannot find module '"+A+"'");throw g.code="MODULE_NOT_FOUND",g}var x=_[A]={exports:{}};d[A][0].call(x.exports,function(O){var z=d[A][1][O];return C(z||O)},x,x.exports,c,d,_,w)}return _[A].exports}for(var R=typeof oe=="function"&&oe,L=0;L<w.length;L++)C(w[L]);return C}({1:[function(c,d,_){(function(w){"use strict";var C=w.MutationObserver||w.WebKitMutationObserver,R;if(C){var L=0,A=new C(O),U=w.document.createTextNode("");A.observe(U,{characterData:!0}),R=function(){U.data=L=++L%2}}else if(!w.setImmediate&&typeof w.MessageChannel<"u"){var h=new w.MessageChannel;h.port1.onmessage=O,R=function(){h.port2.postMessage(0)}}else"document"in w&&"onreadystatechange"in w.document.createElement("script")?R=function(){var P=w.document.createElement("script");P.onreadystatechange=function(){O(),P.onreadystatechange=null,P.parentNode.removeChild(P),P=null},w.document.documentElement.appendChild(P)}:R=function(){setTimeout(O,0)};var g,x=[];function O(){g=!0;for(var P,H,M=x.length;M;){for(H=x,x=[],P=-1;++P<M;)H[P]();M=x.length}g=!1}d.exports=z;function z(P){x.push(P)===1&&!g&&R()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(c,d,_){"use strict";var w=c(1);function C(){}var R={},L=["REJECTED"],A=["FULFILLED"],U=["PENDING"];d.exports=h;function h(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=U,this.queue=[],this.outcome=void 0,v!==C&&z(this,v)}h.prototype.catch=function(v){return this.then(null,v)},h.prototype.then=function(v,S){if(typeof v!="function"&&this.state===A||typeof S!="function"&&this.state===L)return this;var b=new this.constructor(C);if(this.state!==U){var T=this.state===A?v:S;x(b,T,this.outcome)}else this.queue.push(new g(b,v,S));return b};function g(v,S,b){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof b=="function"&&(this.onRejected=b,this.callRejected=this.otherCallRejected)}g.prototype.callFulfilled=function(v){R.resolve(this.promise,v)},g.prototype.otherCallFulfilled=function(v){x(this.promise,this.onFulfilled,v)},g.prototype.callRejected=function(v){R.reject(this.promise,v)},g.prototype.otherCallRejected=function(v){x(this.promise,this.onRejected,v)};function x(v,S,b){w(function(){var T;try{T=S(b)}catch(F){return R.reject(v,F)}T===v?R.reject(v,new TypeError("Cannot resolve promise with itself")):R.resolve(v,T)})}R.resolve=function(v,S){var b=P(O,S);if(b.status==="error")return R.reject(v,b.value);var T=b.value;if(T)z(v,T);else{v.state=A,v.outcome=S;for(var F=-1,Y=v.queue.length;++F<Y;)v.queue[F].callFulfilled(S)}return v},R.reject=function(v,S){v.state=L,v.outcome=S;for(var b=-1,T=v.queue.length;++b<T;)v.queue[b].callRejected(S);return v};function O(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function z(v,S){var b=!1;function T(W){b||(b=!0,R.reject(v,W))}function F(W){b||(b=!0,R.resolve(v,W))}function Y(){S(F,T)}var $=P(Y);$.status==="error"&&T($.value)}function P(v,S){var b={};try{b.value=v(S),b.status="success"}catch(T){b.status="error",b.value=T}return b}h.resolve=H;function H(v){return v instanceof this?v:R.resolve(new this(C),v)}h.reject=M;function M(v){var S=new this(C);return R.reject(S,v)}h.all=ce;function ce(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,T=!1;if(!b)return this.resolve([]);for(var F=new Array(b),Y=0,$=-1,W=new this(C);++$<b;)J(v[$],$);return W;function J(te,ae){S.resolve(te).then(fe,function(Z){T||(T=!0,R.reject(W,Z))});function fe(Z){F[ae]=Z,++Y===b&&!T&&(T=!0,R.resolve(W,F))}}}h.race=G;function G(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,T=!1;if(!b)return this.resolve([]);for(var F=-1,Y=new this(C);++F<b;)$(v[F]);return Y;function $(W){S.resolve(W).then(function(J){T||(T=!0,R.resolve(Y,J))},function(J){T||(T=!0,R.reject(Y,J))})}}},{1:1}],3:[function(c,d,_){(function(w){"use strict";typeof w.Promise!="function"&&(w.Promise=c(2))}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(c,d,_){"use strict";var w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function C(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function R(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var L=R();function A(){try{if(!L||!L.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),r=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||r)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function U(e,r){e=e||[],r=r||{};try{return new Blob(e,r)}catch(n){if(n.name!=="TypeError")throw n;for(var t=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new t,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(r.type)}}typeof Promise>"u"&&c(3);var h=Promise;function g(e,r){r&&e.then(function(t){r(null,t)},function(t){r(t)})}function x(e,r,t){typeof r=="function"&&e.then(r),typeof t=="function"&&e.catch(t)}function O(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function z(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var P="local-forage-detect-blob-support",H=void 0,M={},ce=Object.prototype.toString,G="readonly",v="readwrite";function S(e){for(var r=e.length,t=new ArrayBuffer(r),o=new Uint8Array(t),a=0;a<r;a++)o[a]=e.charCodeAt(a);return t}function b(e){return new h(function(r){var t=e.transaction(P,v),o=U([""]);t.objectStore(P).put(o,"key"),t.onabort=function(a){a.preventDefault(),a.stopPropagation(),r(!1)},t.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);r(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function T(e){return typeof H=="boolean"?h.resolve(H):b(e).then(function(r){return H=r,H})}function F(e){var r=M[e.name],t={};t.promise=new h(function(o,a){t.resolve=o,t.reject=a}),r.deferredOperations.push(t),r.dbReady?r.dbReady=r.dbReady.then(function(){return t.promise}):r.dbReady=t.promise}function Y(e){var r=M[e.name],t=r.deferredOperations.pop();if(t)return t.resolve(),t.promise}function $(e,r){var t=M[e.name],o=t.deferredOperations.pop();if(o)return o.reject(r),o.promise}function W(e,r){return new h(function(t,o){if(M[e.name]=M[e.name]||Re(),e.db)if(r)F(e),e.db.close();else return t(e.db);var a=[e.name];r&&a.push(e.version);var n=L.open.apply(L,a);r&&(n.onupgradeneeded=function(i){var s=n.result;try{s.createObjectStore(e.storeName),i.oldVersion<=1&&s.createObjectStore(P)}catch(f){if(f.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw f}}),n.onerror=function(i){i.preventDefault(),o(n.error)},n.onsuccess=function(){var i=n.result;i.onversionchange=function(s){s.target.close()},t(i),Y(e)}})}function J(e){return W(e,!1)}function te(e){return W(e,!0)}function ae(e,r){if(!e.db)return!0;var t=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==r&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||t){if(t){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function fe(e){return new h(function(r,t){var o=new FileReader;o.onerror=t,o.onloadend=function(a){var n=btoa(a.target.result||"");r({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function Z(e){var r=S(atob(e.data));return U([r],{type:e.type})}function Ie(e){return e&&e.__local_forage_encoded_blob}function it(e){var r=this,t=r._initReady().then(function(){var o=M[r._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return x(t,e,e),t}function st(e){F(e);for(var r=M[e.name],t=r.forages,o=0;o<t.length;o++){var a=t[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,J(e).then(function(n){return e.db=n,ae(e)?te(e):n}).then(function(n){e.db=r.db=n;for(var i=0;i<t.length;i++)t[i]._dbInfo.db=n}).catch(function(n){throw $(e,n),n})}function K(e,r,t,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,r);t(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return h.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),te(e)}).then(function(){return st(e).then(function(){K(e,r,t,o-1)})}).catch(t);t(n)}}function Re(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function ct(e){var r=this,t={db:null};if(e)for(var o in e)t[o]=e[o];var a=M[t.name];a||(a=Re(),M[t.name]=a),a.forages.push(r),r._initReady||(r._initReady=r.ready,r.ready=it);var n=[];function i(){return h.resolve()}for(var s=0;s<a.forages.length;s++){var f=a.forages[s];f!==r&&n.push(f._initReady().catch(i))}var u=a.forages.slice(0);return h.all(n).then(function(){return t.db=a.db,J(t)}).then(function(l){return t.db=l,ae(t,r._defaultConfig.version)?te(t):l}).then(function(l){t.db=a.db=l,r._dbInfo=t;for(var m=0;m<u.length;m++){var p=u[m];p!==r&&(p._dbInfo.db=t.db,p._dbInfo.version=t.version)}})}function ft(e,r){var t=this;e=O(e);var o=new h(function(a,n){t.ready().then(function(){K(t._dbInfo,G,function(i,s){if(i)return n(i);try{var f=s.objectStore(t._dbInfo.storeName),u=f.get(e);u.onsuccess=function(){var l=u.result;l===void 0&&(l=null),Ie(l)&&(l=Z(l)),a(l)},u.onerror=function(){n(u.error)}}catch(l){n(l)}})}).catch(n)});return g(o,r),o}function ut(e,r){var t=this,o=new h(function(a,n){t.ready().then(function(){K(t._dbInfo,G,function(i,s){if(i)return n(i);try{var f=s.objectStore(t._dbInfo.storeName),u=f.openCursor(),l=1;u.onsuccess=function(){var m=u.result;if(m){var p=m.value;Ie(p)&&(p=Z(p));var E=e(p,m.key,l++);E!==void 0?a(E):m.continue()}else a()},u.onerror=function(){n(u.error)}}catch(m){n(m)}})}).catch(n)});return g(o,r),o}function lt(e,r,t){var o=this;e=O(e);var a=new h(function(n,i){var s;o.ready().then(function(){return s=o._dbInfo,ce.call(r)==="[object Blob]"?T(s.db).then(function(f){return f?r:fe(r)}):r}).then(function(f){K(o._dbInfo,v,function(u,l){if(u)return i(u);try{var m=l.objectStore(o._dbInfo.storeName);f===null&&(f=void 0);var p=m.put(f,e);l.oncomplete=function(){f===void 0&&(f=null),n(f)},l.onabort=l.onerror=function(){var E=p.error?p.error:p.transaction.error;i(E)}}catch(E){i(E)}})}).catch(i)});return g(a,t),a}function dt(e,r){var t=this;e=O(e);var o=new h(function(a,n){t.ready().then(function(){K(t._dbInfo,v,function(i,s){if(i)return n(i);try{var f=s.objectStore(t._dbInfo.storeName),u=f.delete(e);s.oncomplete=function(){a()},s.onerror=function(){n(u.error)},s.onabort=function(){var l=u.error?u.error:u.transaction.error;n(l)}}catch(l){n(l)}})}).catch(n)});return g(o,r),o}function vt(e){var r=this,t=new h(function(o,a){r.ready().then(function(){K(r._dbInfo,v,function(n,i){if(n)return a(n);try{var s=i.objectStore(r._dbInfo.storeName),f=s.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var u=f.error?f.error:f.transaction.error;a(u)}}catch(u){a(u)}})}).catch(a)});return g(t,e),t}function ht(e){var r=this,t=new h(function(o,a){r.ready().then(function(){K(r._dbInfo,G,function(n,i){if(n)return a(n);try{var s=i.objectStore(r._dbInfo.storeName),f=s.count();f.onsuccess=function(){o(f.result)},f.onerror=function(){a(f.error)}}catch(u){a(u)}})}).catch(a)});return g(t,e),t}function mt(e,r){var t=this,o=new h(function(a,n){if(e<0){a(null);return}t.ready().then(function(){K(t._dbInfo,G,function(i,s){if(i)return n(i);try{var f=s.objectStore(t._dbInfo.storeName),u=!1,l=f.openKeyCursor();l.onsuccess=function(){var m=l.result;if(!m){a(null);return}e===0||u?a(m.key):(u=!0,m.advance(e))},l.onerror=function(){n(l.error)}}catch(m){n(m)}})}).catch(n)});return g(o,r),o}function yt(e){var r=this,t=new h(function(o,a){r.ready().then(function(){K(r._dbInfo,G,function(n,i){if(n)return a(n);try{var s=i.objectStore(r._dbInfo.storeName),f=s.openKeyCursor(),u=[];f.onsuccess=function(){var l=f.result;if(!l){o(u);return}u.push(l.key),l.continue()},f.onerror=function(){a(f.error)}}catch(l){a(l)}})}).catch(a)});return g(t,e),t}function gt(e,r){r=z.apply(this,arguments);var t=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||t.name,e.storeName=e.storeName||t.storeName);var o=this,a;if(!e.name)a=h.reject("Invalid arguments");else{var n=e.name===t.name&&o._dbInfo.db,i=n?h.resolve(o._dbInfo.db):J(e).then(function(s){var f=M[e.name],u=f.forages;f.db=s;for(var l=0;l<u.length;l++)u[l]._dbInfo.db=s;return s});e.storeName?a=i.then(function(s){if(s.objectStoreNames.contains(e.storeName)){var f=s.version+1;F(e);var u=M[e.name],l=u.forages;s.close();for(var m=0;m<l.length;m++){var p=l[m];p._dbInfo.db=null,p._dbInfo.version=f}var E=new h(function(I,B){var N=L.open(e.name,f);N.onerror=function(j){var ne=N.result;ne.close(),B(j)},N.onupgradeneeded=function(){var j=N.result;j.deleteObjectStore(e.storeName)},N.onsuccess=function(){var j=N.result;j.close(),I(j)}});return E.then(function(I){u.db=I;for(var B=0;B<l.length;B++){var N=l[B];N._dbInfo.db=I,Y(N._dbInfo)}}).catch(function(I){throw($(e,I)||h.resolve()).catch(function(){}),I})}}):a=i.then(function(s){F(e);var f=M[e.name],u=f.forages;s.close();for(var l=0;l<u.length;l++){var m=u[l];m._dbInfo.db=null}var p=new h(function(E,I){var B=L.deleteDatabase(e.name);B.onerror=function(){var N=B.result;N&&N.close(),I(B.error)},B.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},B.onsuccess=function(){var N=B.result;N&&N.close(),E(N)}});return p.then(function(E){f.db=E;for(var I=0;I<u.length;I++){var B=u[I];Y(B._dbInfo)}}).catch(function(E){throw($(e,E)||h.resolve()).catch(function(){}),E})})}return g(a,r),a}var pt={_driver:"asyncStorage",_initStorage:ct,_support:A(),iterate:ut,getItem:ft,setItem:lt,removeItem:dt,clear:vt,length:ht,key:mt,keys:yt,dropInstance:gt};function bt(){return typeof openDatabase=="function"}var Q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_t="~~local_forage_type~",Te=/^~~local_forage_type~([^~]+)~/,ie="__lfsc__:",ue=ie.length,le="arbf",de="blob",De="si08",Ae="ui08",Ne="uic8",xe="si16",Be="si32",Ce="ur16",Le="ui32",Oe="fl32",Pe="fl64",Me=ue+le.length,Fe=Object.prototype.toString;function Ue(e){var r=e.length*.75,t=e.length,o,a=0,n,i,s,f;e[e.length-1]==="="&&(r--,e[e.length-2]==="="&&r--);var u=new ArrayBuffer(r),l=new Uint8Array(u);for(o=0;o<t;o+=4)n=Q.indexOf(e[o]),i=Q.indexOf(e[o+1]),s=Q.indexOf(e[o+2]),f=Q.indexOf(e[o+3]),l[a++]=n<<2|i>>4,l[a++]=(i&15)<<4|s>>2,l[a++]=(s&3)<<6|f&63;return u}function ve(e){var r=new Uint8Array(e),t="",o;for(o=0;o<r.length;o+=3)t+=Q[r[o]>>2],t+=Q[(r[o]&3)<<4|r[o+1]>>4],t+=Q[(r[o+1]&15)<<2|r[o+2]>>6],t+=Q[r[o+2]&63];return r.length%3===2?t=t.substring(0,t.length-1)+"=":r.length%3===1&&(t=t.substring(0,t.length-2)+"=="),t}function wt(e,r){var t="";if(e&&(t=Fe.call(e)),e&&(t==="[object ArrayBuffer]"||e.buffer&&Fe.call(e.buffer)==="[object ArrayBuffer]")){var o,a=ie;e instanceof ArrayBuffer?(o=e,a+=le):(o=e.buffer,t==="[object Int8Array]"?a+=De:t==="[object Uint8Array]"?a+=Ae:t==="[object Uint8ClampedArray]"?a+=Ne:t==="[object Int16Array]"?a+=xe:t==="[object Uint16Array]"?a+=Ce:t==="[object Int32Array]"?a+=Be:t==="[object Uint32Array]"?a+=Le:t==="[object Float32Array]"?a+=Oe:t==="[object Float64Array]"?a+=Pe:r(new Error("Failed to get type for BinaryArray"))),r(a+ve(o))}else if(t==="[object Blob]"){var n=new FileReader;n.onload=function(){var i=_t+e.type+"~"+ve(this.result);r(ie+de+i)},n.readAsArrayBuffer(e)}else try{r(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),r(null,i)}}function St(e){if(e.substring(0,ue)!==ie)return JSON.parse(e);var r=e.substring(Me),t=e.substring(ue,Me),o;if(t===de&&Te.test(r)){var a=r.match(Te);o=a[1],r=r.substring(a[0].length)}var n=Ue(r);switch(t){case le:return n;case de:return U([n],{type:o});case De:return new Int8Array(n);case Ae:return new Uint8Array(n);case Ne:return new Uint8ClampedArray(n);case xe:return new Int16Array(n);case Ce:return new Uint16Array(n);case Be:return new Int32Array(n);case Le:return new Uint32Array(n);case Oe:return new Float32Array(n);case Pe:return new Float64Array(n);default:throw new Error("Unkown type: "+t)}}var he={serialize:wt,deserialize:St,stringToBuffer:Ue,bufferToString:ve};function Ye(e,r,t,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+r.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],t,o)}function Et(e){var r=this,t={db:null};if(e)for(var o in e)t[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new h(function(n,i){try{t.db=openDatabase(t.name,String(t.version),t.description,t.size)}catch(s){return i(s)}t.db.transaction(function(s){Ye(s,t,function(){r._dbInfo=t,n()},function(f,u){i(u)})},i)});return t.serializer=he,a}function X(e,r,t,o,a,n){e.executeSql(t,o,a,function(i,s){s.code===s.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[r.storeName],function(f,u){u.rows.length?n(f,s):Ye(f,r,function(){f.executeSql(t,o,a,n)},n)},n):n(i,s)},n)}function It(e,r){var t=this;e=O(e);var o=new h(function(a,n){t.ready().then(function(){var i=t._dbInfo;i.db.transaction(function(s){X(s,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(f,u){var l=u.rows.length?u.rows.item(0).value:null;l&&(l=i.serializer.deserialize(l)),a(l)},function(f,u){n(u)})})}).catch(n)});return g(o,r),o}function Rt(e,r){var t=this,o=new h(function(a,n){t.ready().then(function(){var i=t._dbInfo;i.db.transaction(function(s){X(s,i,"SELECT * FROM "+i.storeName,[],function(f,u){for(var l=u.rows,m=l.length,p=0;p<m;p++){var E=l.item(p),I=E.value;if(I&&(I=i.serializer.deserialize(I)),I=e(I,E.key,p+1),I!==void 0){a(I);return}}a()},function(f,u){n(u)})})}).catch(n)});return g(o,r),o}function $e(e,r,t,o){var a=this;e=O(e);var n=new h(function(i,s){a.ready().then(function(){r===void 0&&(r=null);var f=r,u=a._dbInfo;u.serializer.serialize(r,function(l,m){m?s(m):u.db.transaction(function(p){X(p,u,"INSERT OR REPLACE INTO "+u.storeName+" (key, value) VALUES (?, ?)",[e,l],function(){i(f)},function(E,I){s(I)})},function(p){if(p.code===p.QUOTA_ERR){if(o>0){i($e.apply(a,[e,f,t,o-1]));return}s(p)}})})}).catch(s)});return g(n,t),n}function Tt(e,r,t){return $e.apply(this,[e,r,t,1])}function Dt(e,r){var t=this;e=O(e);var o=new h(function(a,n){t.ready().then(function(){var i=t._dbInfo;i.db.transaction(function(s){X(s,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(f,u){n(u)})})}).catch(n)});return g(o,r),o}function At(e){var r=this,t=new h(function(o,a){r.ready().then(function(){var n=r._dbInfo;n.db.transaction(function(i){X(i,n,"DELETE FROM "+n.storeName,[],function(){o()},function(s,f){a(f)})})}).catch(a)});return g(t,e),t}function Nt(e){var r=this,t=new h(function(o,a){r.ready().then(function(){var n=r._dbInfo;n.db.transaction(function(i){X(i,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(s,f){var u=f.rows.item(0).c;o(u)},function(s,f){a(f)})})}).catch(a)});return g(t,e),t}function xt(e,r){var t=this,o=new h(function(a,n){t.ready().then(function(){var i=t._dbInfo;i.db.transaction(function(s){X(s,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(f,u){var l=u.rows.length?u.rows.item(0).key:null;a(l)},function(f,u){n(u)})})}).catch(n)});return g(o,r),o}function Bt(e){var r=this,t=new h(function(o,a){r.ready().then(function(){var n=r._dbInfo;n.db.transaction(function(i){X(i,n,"SELECT key FROM "+n.storeName,[],function(s,f){for(var u=[],l=0;l<f.rows.length;l++)u.push(f.rows.item(l).key);o(u)},function(s,f){a(f)})})}).catch(a)});return g(t,e),t}function Ct(e){return new h(function(r,t){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var i=[],s=0;s<n.rows.length;s++)i.push(n.rows.item(s).name);r({db:e,storeNames:i})},function(a,n){t(n)})},function(o){t(o)})})}function Lt(e,r){r=z.apply(this,arguments);var t=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||t.name,e.storeName=e.storeName||t.storeName);var o=this,a;return e.name?a=new h(function(n){var i;e.name===t.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?n({db:i,storeNames:[e.storeName]}):n(Ct(i))}).then(function(n){return new h(function(i,s){n.db.transaction(function(f){function u(E){return new h(function(I,B){f.executeSql("DROP TABLE IF EXISTS "+E,[],function(){I()},function(N,j){B(j)})})}for(var l=[],m=0,p=n.storeNames.length;m<p;m++)l.push(u(n.storeNames[m]));h.all(l).then(function(){i()}).catch(function(E){s(E)})},function(f){s(f)})})}):a=h.reject("Invalid arguments"),g(a,r),a}var Ot={_driver:"webSQLStorage",_initStorage:Et,_support:bt(),iterate:Rt,getItem:It,setItem:Tt,removeItem:Dt,clear:At,length:Nt,key:xt,keys:Bt,dropInstance:Lt};function Pt(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function We(e,r){var t=e.name+"/";return e.storeName!==r.storeName&&(t+=e.storeName+"/"),t}function Mt(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}function Ft(){return!Mt()||localStorage.length>0}function Ut(e){var r=this,t={};if(e)for(var o in e)t[o]=e[o];return t.keyPrefix=We(e,r._defaultConfig),Ft()?(r._dbInfo=t,t.serializer=he,h.resolve()):h.reject()}function Yt(e){var r=this,t=r.ready().then(function(){for(var o=r._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return g(t,e),t}function $t(e,r){var t=this;e=O(e);var o=t.ready().then(function(){var a=t._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return g(o,r),o}function Wt(e,r){var t=this,o=t.ready().then(function(){for(var a=t._dbInfo,n=a.keyPrefix,i=n.length,s=localStorage.length,f=1,u=0;u<s;u++){var l=localStorage.key(u);if(l.indexOf(n)===0){var m=localStorage.getItem(l);if(m&&(m=a.serializer.deserialize(m)),m=e(m,l.substring(i),f++),m!==void 0)return m}}});return g(o,r),o}function jt(e,r){var t=this,o=t.ready().then(function(){var a=t._dbInfo,n;try{n=localStorage.key(e)}catch{n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return g(o,r),o}function zt(e){var r=this,t=r.ready().then(function(){for(var o=r._dbInfo,a=localStorage.length,n=[],i=0;i<a;i++){var s=localStorage.key(i);s.indexOf(o.keyPrefix)===0&&n.push(s.substring(o.keyPrefix.length))}return n});return g(t,e),t}function Vt(e){var r=this,t=r.keys().then(function(o){return o.length});return g(t,e),t}function Ht(e,r){var t=this;e=O(e);var o=t.ready().then(function(){var a=t._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return g(o,r),o}function Jt(e,r,t){var o=this;e=O(e);var a=o.ready().then(function(){r===void 0&&(r=null);var n=r;return new h(function(i,s){var f=o._dbInfo;f.serializer.serialize(r,function(u,l){if(l)s(l);else try{localStorage.setItem(f.keyPrefix+e,u),i(n)}catch(m){(m.name==="QuotaExceededError"||m.name==="NS_ERROR_DOM_QUOTA_REACHED")&&s(m),s(m)}})})});return g(a,t),a}function Kt(e,r){if(r=z.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var t=this.config();e.name=e.name||t.name,e.storeName=e.storeName||t.storeName}var o=this,a;return e.name?a=new h(function(n){e.storeName?n(We(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var i=localStorage.length-1;i>=0;i--){var s=localStorage.key(i);s.indexOf(n)===0&&localStorage.removeItem(s)}}):a=h.reject("Invalid arguments"),g(a,r),a}var Qt={_driver:"localStorageWrapper",_initStorage:Ut,_support:Pt(),iterate:Wt,getItem:$t,setItem:Jt,removeItem:Ht,clear:Yt,length:Vt,key:jt,keys:zt,dropInstance:Kt},Xt=function(r,t){return r===t||typeof r=="number"&&typeof t=="number"&&isNaN(r)&&isNaN(t)},Gt=function(r,t){for(var o=r.length,a=0;a<o;){if(Xt(r[a],t))return!0;a++}return!1},je=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},re={},ze={},q={INDEXEDDB:pt,WEBSQL:Ot,LOCALSTORAGE:Qt},kt=[q.INDEXEDDB._driver,q.WEBSQL._driver,q.LOCALSTORAGE._driver],se=["dropInstance"],me=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(se),Zt={description:"",driver:kt.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function qt(e,r){e[r]=function(){var t=arguments;return e.ready().then(function(){return e[r].apply(e,t)})}}function ye(){for(var e=1;e<arguments.length;e++){var r=arguments[e];if(r)for(var t in r)r.hasOwnProperty(t)&&(je(r[t])?arguments[0][t]=r[t].slice():arguments[0][t]=r[t])}return arguments[0]}var er=function(){function e(r){C(this,e);for(var t in q)if(q.hasOwnProperty(t)){var o=q[t],a=o._driver;this[t]=a,re[a]||this.defineDriver(o)}this._defaultConfig=ye({},Zt),this._config=ye({},this._defaultConfig,r),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(t){if((typeof t>"u"?"undefined":w(t))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in t){if(o==="storeName"&&(t[o]=t[o].replace(/\W/g,"_")),o==="version"&&typeof t[o]!="number")return new Error("Database version must be a number.");this._config[o]=t[o]}return"driver"in t&&t.driver?this.setDriver(this._config.driver):!0}else return typeof t=="string"?this._config[t]:this._config},e.prototype.defineDriver=function(t,o,a){var n=new h(function(i,s){try{var f=t._driver,u=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!t._driver){s(u);return}for(var l=me.concat("_initStorage"),m=0,p=l.length;m<p;m++){var E=l[m],I=!Gt(se,E);if((I||t[E])&&typeof t[E]!="function"){s(u);return}}var B=function(){for(var ne=function(nr){return function(){var or=new Error("Method "+nr+" is not implemented by the current driver"),Ve=h.reject(or);return g(Ve,arguments[arguments.length-1]),Ve}},ge=0,rr=se.length;ge<rr;ge++){var pe=se[ge];t[pe]||(t[pe]=ne(pe))}};B();var N=function(ne){re[f]&&console.info("Redefining LocalForage driver: "+f),re[f]=t,ze[f]=ne,i()};"_support"in t?t._support&&typeof t._support=="function"?t._support().then(N,s):N(!!t._support):N(!0)}catch(j){s(j)}});return x(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(t,o,a){var n=re[t]?h.resolve(re[t]):h.reject(new Error("Driver not found."));return x(n,o,a),n},e.prototype.getSerializer=function(t){var o=h.resolve(he);return x(o,t),o},e.prototype.ready=function(t){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return x(a,t,t),a},e.prototype.setDriver=function(t,o,a){var n=this;je(t)||(t=[t]);var i=this._getSupportedDrivers(t);function s(){n._config.driver=n.driver()}function f(m){return n._extend(m),s(),n._ready=n._initStorage(n._config),n._ready}function u(m){return function(){var p=0;function E(){for(;p<m.length;){var I=m[p];return p++,n._dbInfo=null,n._ready=null,n.getDriver(I).then(f).catch(E)}s();var B=new Error("No available storage method found.");return n._driverSet=h.reject(B),n._driverSet}return E()}}var l=this._driverSet!==null?this._driverSet.catch(function(){return h.resolve()}):h.resolve();return this._driverSet=l.then(function(){var m=i[0];return n._dbInfo=null,n._ready=null,n.getDriver(m).then(function(p){n._driver=p._driver,s(),n._wrapLibraryMethodsWithReady(),n._initDriver=u(i)})}).catch(function(){s();var m=new Error("No available storage method found.");return n._driverSet=h.reject(m),n._driverSet}),x(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(t){return!!ze[t]},e.prototype._extend=function(t){ye(this,t)},e.prototype._getSupportedDrivers=function(t){for(var o=[],a=0,n=t.length;a<n;a++){var i=t[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var t=0,o=me.length;t<o;t++)qt(this,me[t])},e.prototype.createInstance=function(t){return new e(t)},e}(),tr=new er;d.exports=tr},{3:3}]},{},[4])(4)})});var vr=(()=>{let y=class y{constructor(){this._vertical=!1,this._inset=!1}get vertical(){return this._vertical}set vertical(c){this._vertical=_e(c)}get inset(){return this._inset}set inset(c){this._inset=_e(c)}};y.\u0275fac=function(d){return new(d||y)},y.\u0275cmp=Ge({type:y,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(d,_){d&2&&(Ze("aria-orientation",_.vertical?"vertical":"horizontal"),qe("mat-divider-vertical",_.vertical)("mat-divider-horizontal",!_.vertical)("mat-divider-inset",_.inset))},inputs:{vertical:"vertical",inset:"inset"},standalone:!0,features:[et],decls:0,vars:0,template:function(d,_){},styles:[".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],encapsulation:2,changeDetection:0});let D=y;return D})(),hr=(()=>{let y=class y{};y.\u0275fac=function(d){return new(d||y)},y.\u0275mod=ke({type:y}),y.\u0275inj=Xe({imports:[we,we]});let D=y;return D})();var k=ir(nt());var ot=(()=>{let y=class y{constructor(){k.default.config({driver:k.default.INDEXEDDB,name:"user-database",version:1,storeName:"users",description:"Store for user metadata"})}getUserMetadata(c){return V(this,null,function*(){try{return yield k.default.getItem(c)}catch(d){return console.error("Error getting metadata from IndexedDB:",d),null}})}saveUserMetadata(c,d){return V(this,null,function*(){try{yield k.default.setItem(c,d),console.log("Metadata saved successfully!")}catch(_){console.error("Error saving metadata to IndexedDB:",_)}})}removeUserMetadata(c){return V(this,null,function*(){try{yield k.default.removeItem(c),console.log(`Metadata for pubkey ${c} removed successfully!`)}catch(d){console.error("Error removing metadata from IndexedDB:",d)}})}clearAllMetadata(){return V(this,null,function*(){try{yield k.default.clear(),console.log("All metadata cleared successfully!")}catch(c){console.error("Error clearing all metadata:",c)}})}};y.\u0275fac=function(d){return new(d||y)},y.\u0275prov=ee({token:y,factory:y.\u0275fac,providedIn:"root"});let D=y;return D})();var at=(()=>{let y=class y{constructor(){this.relays=[],this.maxRetries=10,this.retryDelay=15e3,this.eventSubject=new Ke,this.pool=new tt,this.relays=this.loadRelaysFromLocalStorage(),this.connectToRelays(),this.setupVisibilityChangeHandling()}loadRelaysFromLocalStorage(){let c=[{url:"wss://relay.angor.io",connected:!1,retries:0,retryTimeout:null,ws:void 0},{url:"wss://relay2.angor.io",connected:!1,retries:0,retryTimeout:null,ws:void 0}],d=JSON.parse(localStorage.getItem("nostrRelays")||"[]").map(_=>Je(He({},_),{connected:!1,retries:0,retryTimeout:null,ws:void 0}));return[...c,...d]}connectToRelay(c){c.connected||(c.ws=new WebSocket(c.url),c.ws.onopen=()=>{c.connected=!0,c.retries=0,clearTimeout(c.retryTimeout),console.log(`Connected to relay: ${c.url}`),this.saveRelaysToLocalStorage()},c.ws.onerror=d=>{console.error(`Failed to connect to relay: ${c.url}`,d),this.handleRelayError(c)},c.ws.onclose=()=>{c.connected=!1,console.log(`Disconnected from relay: ${c.url}`),this.handleRelayError(c)},c.ws.onmessage=d=>{try{let _=typeof d.data=="string"?d.data:d.data.toString("utf-8"),w=JSON.parse(_);this.eventSubject.next(w)}catch(_){console.error("Error parsing WebSocket message:",_)}})}handleRelayError(c){if(c.retries>=this.maxRetries){console.error(`Max retries reached for relay: ${c.url}. No further attempts will be made.`);return}let d=this.retryDelay*c.retries;c.retries++,c.retryTimeout=setTimeout(()=>{this.connectToRelay(c),console.log(`Retrying connection to relay: ${c.url} (Attempt ${c.retries})`)},d)}connectToRelays(){this.relays.forEach(c=>this.connectToRelay(c))}ensureConnectedRelays(){return V(this,null,function*(){return this.connectToRelays(),new Promise(c=>{let d=()=>{this.getConnectedRelays().length>0?c():setTimeout(d,1e3)};d()})})}setupVisibilityChangeHandling(){document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&this.connectToRelays()}),window.addEventListener("beforeunload",()=>{this.relays.forEach(c=>{c.ws&&c.ws.close()})})}getConnectedRelays(){return this.relays.filter(c=>c.connected).map(c=>c.url)}saveRelaysToLocalStorage(){let c=this.relays.filter(d=>!["wss://relay.angor.io","wss://relay2.angor.io"].includes(d.url));localStorage.setItem("nostrRelays",JSON.stringify(c))}getEventStream(){return this.eventSubject.asObservable()}addRelay(c){if(!this.relays.some(d=>d.url===c)){let d={url:c,connected:!1,retries:0,retryTimeout:null,ws:void 0};this.relays.push(d),this.connectToRelay(d),this.saveRelaysToLocalStorage()}}removeRelay(c){this.relays=this.relays.filter(d=>d.url!==c),this.saveRelaysToLocalStorage()}removeAllCustomRelays(){let c=["wss://relay.angor.io","wss://relay2.angor.io"];this.relays=this.relays.filter(d=>c.includes(d.url)),this.saveRelaysToLocalStorage()}subscribeToFilter(c){let d=this.getConnectedRelays();this.pool.subscribeMany(d,[c],{onevent:_=>{this.eventSubject.next(_)}})}getPool(){return this.pool}getRelays(){return this.relays}};y.\u0275fac=function(d){return new(d||y)},y.\u0275prov=ee({token:y,factory:y.\u0275fac,providedIn:"root"});let D=y;return D})();var Sr=(()=>{let y=class y{constructor(c,d){this.indexedDBService=c,this.relayService=d,this.metadataSubject=new Qe(null)}getMetadataStream(){return this.metadataSubject.asObservable()}fetchMetadataWithCache(c){return V(this,null,function*(){let d=yield this.indexedDBService.getUserMetadata(c);return d?(this.metadataSubject.next(d),console.log("Metadata loaded from localForage (IndexedDB)"),d):(d=yield this.fetchMetadataRealtime(c),console.log("Metadata fetched from relays"),d&&(yield this.indexedDBService.saveUserMetadata(c,d),console.log("Metadata saved to localForage (IndexedDB)")),d)})}subscribeToMetadataUpdates(c){this.relayService.ensureConnectedRelays().then(()=>{let d={authors:[c],kinds:[0]};this.relayService.getPool().subscribeMany(this.relayService.getConnectedRelays(),[d],{onevent:_=>V(this,null,function*(){if(_.pubkey===c&&_.kind===0)try{let w=JSON.parse(_.content);this.metadataSubject.next(w),yield this.indexedDBService.saveUserMetadata(c,w),console.log("Real-time metadata update saved to localForage (IndexedDB)")}catch(w){console.error("Error parsing updated metadata:",w)}}),oneose(){console.log("Real-time metadata subscription closed.")}})})}fetchMetadataRealtime(c){return V(this,null,function*(){yield this.relayService.ensureConnectedRelays();let d=this.relayService.getPool(),_=this.relayService.getConnectedRelays();if(_.length===0)throw new Error("No connected relays");let w=new Promise((C,R)=>{let L=d.subscribeMany(_,[{authors:[c],kinds:[0]}],{onevent:A=>{if(A.pubkey===c&&A.kind===0)try{let U=JSON.parse(A.content);C(U),this.metadataSubject.next(U)}catch(U){console.error("Error parsing event content:",U),C(null)}finally{L.close()}},oneose(){L.close(),C(null)}})});return this.subscribeToMetadataUpdates(c),w})}};y.\u0275fac=function(d){return new(d||y)(be(ot),be(at))},y.\u0275prov=ee({token:y,factory:y.\u0275fac,providedIn:"root"});let D=y;return D})();export{vr as a,hr as b,Sr as c};
