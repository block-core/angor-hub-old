import{q as Qt}from"./chunk-MH4Z64LL.js";import{P as Jt,W as mt,Y as Zt,_ as ot,l as Yt,m as Xt,t as Ut}from"./chunk-LP5NDBXI.js";var tr=new Zt("ANGOR_APP_CONFIG");var io=typeof global=="object"&&global&&global.Object===Object&&global,ut=io;var po=typeof self=="object"&&self&&self.Object===Object&&self,so=ut||po||Function("return this")(),l=so;var mo=l.Symbol,h=mo;var rr=Object.prototype,uo=rr.hasOwnProperty,lo=rr.toString,at=h?h.toStringTag:void 0;function co(t){var r=uo.call(t,at),e=t[at];try{t[at]=void 0;var o=!0}catch{}var a=lo.call(t);return o&&(r?t[at]=e:delete t[at]),a}var er=co;var xo=Object.prototype,go=xo.toString;function ho(t){return go.call(t)}var or=ho;var yo="[object Null]",bo="[object Undefined]",ar=h?h.toStringTag:void 0;function vo(t){return t==null?t===void 0?bo:yo:ar&&ar in Object(t)?er(t):or(t)}var O=vo;function Oo(t){return t!=null&&typeof t=="object"}var x=Oo;var To="[object Symbol]";function Ao(t){return typeof t=="symbol"||x(t)&&O(t)==To}var U=Ao;function _o(t,r){for(var e=-1,o=t==null?0:t.length,a=Array(o);++e<o;)a[e]=r(t[e],e,t);return a}var lt=_o;var jo=Array.isArray,c=jo;var So=1/0,fr=h?h.prototype:void 0,nr=fr?fr.toString:void 0;function ir(t){if(typeof t=="string")return t;if(c(t))return lt(t,ir)+"";if(U(t))return nr?nr.call(t):"";var r=t+"";return r=="0"&&1/t==-So?"-0":r}var pr=ir;function wo(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var g=wo;function Co(t){return t}var dt=Co;var Io="[object AsyncFunction]",Po="[object Function]",Mo="[object GeneratorFunction]",Eo="[object Proxy]";function Lo(t){if(!g(t))return!1;var r=O(t);return r==Po||r==Mo||r==Io||r==Eo}var K=Lo;var Fo=l["__core-js_shared__"],ct=Fo;var sr=function(){var t=/[^.]+$/.exec(ct&&ct.keys&&ct.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Bo(t){return!!sr&&sr in t}var mr=Bo;var No=Function.prototype,Do=No.toString;function Go(t){if(t!=null){try{return Do.call(t)}catch{}try{return t+""}catch{}}return""}var _=Go;var Ro=/[\\^$.*+?()[\]{}|]/g,Uo=/^\[object .+?Constructor\]$/,Ko=Function.prototype,Wo=Object.prototype,zo=Ko.toString,ko=Wo.hasOwnProperty,Vo=RegExp("^"+zo.call(ko).replace(Ro,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function qo(t){if(!g(t)||mr(t))return!1;var r=K(t)?Vo:Uo;return r.test(_(t))}var ur=qo;function Ho(t,r){return t?.[r]}var lr=Ho;function $o(t,r){var e=lr(t,r);return ur(e)?e:void 0}var b=$o;var Yo=b(l,"WeakMap"),xt=Yo;var dr=Object.create,Xo=function(){function t(){}return function(r){if(!g(r))return{};if(dr)return dr(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}(),cr=Xo;function Jo(t,r,e){switch(e.length){case 0:return t.call(r);case 1:return t.call(r,e[0]);case 2:return t.call(r,e[0],e[1]);case 3:return t.call(r,e[0],e[1],e[2])}return t.apply(r,e)}var xr=Jo;function Zo(t,r){var e=-1,o=t.length;for(r||(r=Array(o));++e<o;)r[e]=t[e];return r}var gt=Zo;var Qo=800,ta=16,ra=Date.now;function ea(t){var r=0,e=0;return function(){var o=ra(),a=ta-(o-e);if(e=o,a>0){if(++r>=Qo)return arguments[0]}else r=0;return t.apply(void 0,arguments)}}var gr=ea;function oa(t){return function(){return t}}var hr=oa;var aa=function(){try{var t=b(Object,"defineProperty");return t({},"",{}),t}catch{}}(),W=aa;var fa=W?function(t,r){return W(t,"toString",{configurable:!0,enumerable:!1,value:hr(r),writable:!0})}:dt,yr=fa;var na=gr(yr),ht=na;function ia(t,r){for(var e=-1,o=t==null?0:t.length;++e<o&&r(t[e],e,t)!==!1;);return t}var br=ia;var pa=9007199254740991,sa=/^(?:0|[1-9]\d*)$/;function ma(t,r){var e=typeof t;return r=r??pa,!!r&&(e=="number"||e!="symbol"&&sa.test(t))&&t>-1&&t%1==0&&t<r}var yt=ma;function ua(t,r,e){r=="__proto__"&&W?W(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}var z=ua;function la(t,r){return t===r||t!==t&&r!==r}var C=la;var da=Object.prototype,ca=da.hasOwnProperty;function xa(t,r,e){var o=t[r];(!(ca.call(t,r)&&C(o,e))||e===void 0&&!(r in t))&&z(t,r,e)}var k=xa;function ga(t,r,e,o){var a=!e;e||(e={});for(var f=-1,n=r.length;++f<n;){var i=r[f],p=o?o(e[i],t[i],i,e,t):void 0;p===void 0&&(p=t[i]),a?z(e,i,p):k(e,i,p)}return e}var v=ga;var vr=Math.max;function ha(t,r,e){return r=vr(r===void 0?t.length-1:r,0),function(){for(var o=arguments,a=-1,f=vr(o.length-r,0),n=Array(f);++a<f;)n[a]=o[r+a];a=-1;for(var i=Array(r+1);++a<r;)i[a]=o[a];return i[r]=e(n),xr(t,this,i)}}var bt=ha;function ya(t,r){return ht(bt(t,r,dt),t+"")}var Or=ya;var ba=9007199254740991;function va(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=ba}var vt=va;function Oa(t){return t!=null&&vt(t.length)&&!K(t)}var T=Oa;function Ta(t,r,e){if(!g(e))return!1;var o=typeof r;return(o=="number"?T(e)&&yt(r,e.length):o=="string"&&r in e)?C(e[r],t):!1}var Tr=Ta;function Aa(t){return Or(function(r,e){var o=-1,a=e.length,f=a>1?e[a-1]:void 0,n=a>2?e[2]:void 0;for(f=t.length>3&&typeof f=="function"?(a--,f):void 0,n&&Tr(e[0],e[1],n)&&(f=a<3?void 0:f,a=1),r=Object(r);++o<a;){var i=e[o];i&&t(r,i,o,f)}return r})}var Ot=Aa;var _a=Object.prototype;function ja(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||_a;return t===e}var I=ja;function Sa(t,r){for(var e=-1,o=Array(t);++e<t;)o[e]=r(e);return o}var Ar=Sa;var wa="[object Arguments]";function Ca(t){return x(t)&&O(t)==wa}var Kt=Ca;var _r=Object.prototype,Ia=_r.hasOwnProperty,Pa=_r.propertyIsEnumerable,Ma=Kt(function(){return arguments}())?Kt:function(t){return x(t)&&Ia.call(t,"callee")&&!Pa.call(t,"callee")},N=Ma;function Ea(){return!1}var jr=Ea;var Cr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Sr=Cr&&typeof module=="object"&&module&&!module.nodeType&&module,La=Sr&&Sr.exports===Cr,wr=La?l.Buffer:void 0,Fa=wr?wr.isBuffer:void 0,Ba=Fa||jr,V=Ba;var Na="[object Arguments]",Da="[object Array]",Ga="[object Boolean]",Ra="[object Date]",Ua="[object Error]",Ka="[object Function]",Wa="[object Map]",za="[object Number]",ka="[object Object]",Va="[object RegExp]",qa="[object Set]",Ha="[object String]",$a="[object WeakMap]",Ya="[object ArrayBuffer]",Xa="[object DataView]",Ja="[object Float32Array]",Za="[object Float64Array]",Qa="[object Int8Array]",tf="[object Int16Array]",rf="[object Int32Array]",ef="[object Uint8Array]",of="[object Uint8ClampedArray]",af="[object Uint16Array]",ff="[object Uint32Array]",m={};m[Ja]=m[Za]=m[Qa]=m[tf]=m[rf]=m[ef]=m[of]=m[af]=m[ff]=!0;m[Na]=m[Da]=m[Ya]=m[Ga]=m[Xa]=m[Ra]=m[Ua]=m[Ka]=m[Wa]=m[za]=m[ka]=m[Va]=m[qa]=m[Ha]=m[$a]=!1;function nf(t){return x(t)&&vt(t.length)&&!!m[O(t)]}var Ir=nf;function pf(t){return function(r){return t(r)}}var q=pf;var Pr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ft=Pr&&typeof module=="object"&&module&&!module.nodeType&&module,sf=ft&&ft.exports===Pr,Wt=sf&&ut.process,mf=function(){try{var t=ft&&ft.require&&ft.require("util").types;return t||Wt&&Wt.binding&&Wt.binding("util")}catch{}}(),j=mf;var Mr=j&&j.isTypedArray,uf=Mr?q(Mr):Ir,Tt=uf;var lf=Object.prototype,df=lf.hasOwnProperty;function cf(t,r){var e=c(t),o=!e&&N(t),a=!e&&!o&&V(t),f=!e&&!o&&!a&&Tt(t),n=e||o||a||f,i=n?Ar(t.length,String):[],p=i.length;for(var u in t)(r||df.call(t,u))&&!(n&&(u=="length"||a&&(u=="offset"||u=="parent")||f&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||yt(u,p)))&&i.push(u);return i}var At=cf;function xf(t,r){return function(e){return t(r(e))}}var _t=xf;var gf=_t(Object.keys,Object),Er=gf;var hf=Object.prototype,yf=hf.hasOwnProperty;function bf(t){if(!I(t))return Er(t);var r=[];for(var e in Object(t))yf.call(t,e)&&e!="constructor"&&r.push(e);return r}var Lr=bf;function vf(t){return T(t)?At(t):Lr(t)}var P=vf;var Of=Object.prototype,Tf=Of.hasOwnProperty,Af=Ot(function(t,r){if(I(r)||T(r)){v(r,P(r),t);return}for(var e in r)Tf.call(r,e)&&k(t,e,r[e])}),_f=Af;function jf(t){var r=[];if(t!=null)for(var e in Object(t))r.push(e);return r}var Fr=jf;var Sf=Object.prototype,wf=Sf.hasOwnProperty;function Cf(t){if(!g(t))return Fr(t);var r=I(t),e=[];for(var o in t)o=="constructor"&&(r||!wf.call(t,o))||e.push(o);return e}var Br=Cf;function If(t){return T(t)?At(t,!0):Br(t)}var A=If;var Pf=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Mf=/^\w*$/;function Ef(t,r){if(c(t))return!1;var e=typeof t;return e=="number"||e=="symbol"||e=="boolean"||t==null||U(t)?!0:Mf.test(t)||!Pf.test(t)||r!=null&&t in Object(r)}var Nr=Ef;var Lf=b(Object,"create"),S=Lf;function Ff(){this.__data__=S?S(null):{},this.size=0}var Dr=Ff;function Bf(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}var Gr=Bf;var Nf="__lodash_hash_undefined__",Df=Object.prototype,Gf=Df.hasOwnProperty;function Rf(t){var r=this.__data__;if(S){var e=r[t];return e===Nf?void 0:e}return Gf.call(r,t)?r[t]:void 0}var Rr=Rf;var Uf=Object.prototype,Kf=Uf.hasOwnProperty;function Wf(t){var r=this.__data__;return S?r[t]!==void 0:Kf.call(r,t)}var Ur=Wf;var zf="__lodash_hash_undefined__";function kf(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=S&&r===void 0?zf:r,this}var Kr=kf;function H(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}H.prototype.clear=Dr;H.prototype.delete=Gr;H.prototype.get=Rr;H.prototype.has=Ur;H.prototype.set=Kr;var zt=H;function Vf(){this.__data__=[],this.size=0}var Wr=Vf;function qf(t,r){for(var e=t.length;e--;)if(C(t[e][0],r))return e;return-1}var M=qf;var Hf=Array.prototype,$f=Hf.splice;function Yf(t){var r=this.__data__,e=M(r,t);if(e<0)return!1;var o=r.length-1;return e==o?r.pop():$f.call(r,e,1),--this.size,!0}var zr=Yf;function Xf(t){var r=this.__data__,e=M(r,t);return e<0?void 0:r[e][1]}var kr=Xf;function Jf(t){return M(this.__data__,t)>-1}var Vr=Jf;function Zf(t,r){var e=this.__data__,o=M(e,t);return o<0?(++this.size,e.push([t,r])):e[o][1]=r,this}var qr=Zf;function $(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}$.prototype.clear=Wr;$.prototype.delete=zr;$.prototype.get=kr;$.prototype.has=Vr;$.prototype.set=qr;var E=$;var Qf=b(l,"Map"),L=Qf;function tn(){this.size=0,this.__data__={hash:new zt,map:new(L||E),string:new zt}}var Hr=tn;function rn(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}var $r=rn;function en(t,r){var e=t.__data__;return $r(r)?e[typeof r=="string"?"string":"hash"]:e.map}var F=en;function on(t){var r=F(this,t).delete(t);return this.size-=r?1:0,r}var Yr=on;function an(t){return F(this,t).get(t)}var Xr=an;function fn(t){return F(this,t).has(t)}var Jr=fn;function nn(t,r){var e=F(this,t),o=e.size;return e.set(t,r),this.size+=e.size==o?0:1,this}var Zr=nn;function Y(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}Y.prototype.clear=Hr;Y.prototype.delete=Yr;Y.prototype.get=Xr;Y.prototype.has=Jr;Y.prototype.set=Zr;var nt=Y;var pn="Expected a function";function kt(t,r){if(typeof t!="function"||r!=null&&typeof r!="function")throw new TypeError(pn);var e=function(){var o=arguments,a=r?r.apply(this,o):o[0],f=e.cache;if(f.has(a))return f.get(a);var n=t.apply(this,o);return e.cache=f.set(a,n)||f,n};return e.cache=new(kt.Cache||nt),e}kt.Cache=nt;var Qr=kt;var sn=500;function mn(t){var r=Qr(t,function(o){return e.size===sn&&e.clear(),o}),e=r.cache;return r}var te=mn;var un=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ln=/\\(\\)?/g,dn=te(function(t){var r=[];return t.charCodeAt(0)===46&&r.push(""),t.replace(un,function(e,o,a,f){r.push(a?f.replace(ln,"$1"):o||e)}),r}),re=dn;function cn(t){return t==null?"":pr(t)}var ee=cn;function xn(t,r){return c(t)?t:Nr(t,r)?[t]:re(ee(t))}var X=xn;var gn=1/0;function hn(t){if(typeof t=="string"||U(t))return t;var r=t+"";return r=="0"&&1/t==-gn?"-0":r}var jt=hn;function yn(t,r){r=X(r,t);for(var e=0,o=r.length;t!=null&&e<o;)t=t[jt(r[e++])];return e&&e==o?t:void 0}var oe=yn;function bn(t,r){for(var e=-1,o=r.length,a=t.length;++e<o;)t[a+e]=r[e];return t}var J=bn;var ae=h?h.isConcatSpreadable:void 0;function vn(t){return c(t)||N(t)||!!(ae&&t&&t[ae])}var fe=vn;function ne(t,r,e,o,a){var f=-1,n=t.length;for(e||(e=fe),a||(a=[]);++f<n;){var i=t[f];r>0&&e(i)?r>1?ne(i,r-1,e,o,a):J(a,i):o||(a[a.length]=i)}return a}var ie=ne;function On(t){var r=t==null?0:t.length;return r?ie(t,1):[]}var pe=On;function Tn(t){return ht(bt(t,void 0,pe),t+"")}var se=Tn;var An=_t(Object.getPrototypeOf,Object),Z=An;var _n="[object Object]",jn=Function.prototype,Sn=Object.prototype,me=jn.toString,wn=Sn.hasOwnProperty,Cn=me.call(Object);function In(t){if(!x(t)||O(t)!=_n)return!1;var r=Z(t);if(r===null)return!0;var e=wn.call(r,"constructor")&&r.constructor;return typeof e=="function"&&e instanceof e&&me.call(e)==Cn}var St=In;function Pn(t,r,e){var o=-1,a=t.length;r<0&&(r=-r>a?0:a+r),e=e>a?a:e,e<0&&(e+=a),a=r>e?0:e-r>>>0,r>>>=0;for(var f=Array(a);++o<a;)f[o]=t[o+r];return f}var ue=Pn;function Mn(){this.__data__=new E,this.size=0}var le=Mn;function En(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e}var de=En;function Ln(t){return this.__data__.get(t)}var ce=Ln;function Fn(t){return this.__data__.has(t)}var xe=Fn;var Bn=200;function Nn(t,r){var e=this.__data__;if(e instanceof E){var o=e.__data__;if(!L||o.length<Bn-1)return o.push([t,r]),this.size=++e.size,this;e=this.__data__=new nt(o)}return e.set(t,r),this.size=e.size,this}var ge=Nn;function Q(t){var r=this.__data__=new E(t);this.size=r.size}Q.prototype.clear=le;Q.prototype.delete=de;Q.prototype.get=ce;Q.prototype.has=xe;Q.prototype.set=ge;var wt=Q;function Dn(t,r){return t&&v(r,P(r),t)}var he=Dn;function Gn(t,r){return t&&v(r,A(r),t)}var ye=Gn;var Te=typeof exports=="object"&&exports&&!exports.nodeType&&exports,be=Te&&typeof module=="object"&&module&&!module.nodeType&&module,Rn=be&&be.exports===Te,ve=Rn?l.Buffer:void 0,Oe=ve?ve.allocUnsafe:void 0;function Un(t,r){if(r)return t.slice();var e=t.length,o=Oe?Oe(e):new t.constructor(e);return t.copy(o),o}var Ct=Un;function Kn(t,r){for(var e=-1,o=t==null?0:t.length,a=0,f=[];++e<o;){var n=t[e];r(n,e,t)&&(f[a++]=n)}return f}var Ae=Kn;function Wn(){return[]}var It=Wn;var zn=Object.prototype,kn=zn.propertyIsEnumerable,_e=Object.getOwnPropertySymbols,Vn=_e?function(t){return t==null?[]:(t=Object(t),Ae(_e(t),function(r){return kn.call(t,r)}))}:It,tt=Vn;function qn(t,r){return v(t,tt(t),r)}var je=qn;var Hn=Object.getOwnPropertySymbols,$n=Hn?function(t){for(var r=[];t;)J(r,tt(t)),t=Z(t);return r}:It,Pt=$n;function Yn(t,r){return v(t,Pt(t),r)}var Se=Yn;function Xn(t,r,e){var o=r(t);return c(t)?o:J(o,e(t))}var Mt=Xn;function Jn(t){return Mt(t,P,tt)}var we=Jn;function Zn(t){return Mt(t,A,Pt)}var Et=Zn;var Qn=b(l,"DataView"),Lt=Qn;var ti=b(l,"Promise"),Ft=ti;var ri=b(l,"Set"),Bt=ri;var Ce="[object Map]",ei="[object Object]",Ie="[object Promise]",Pe="[object Set]",Me="[object WeakMap]",Ee="[object DataView]",oi=_(Lt),ai=_(L),fi=_(Ft),ni=_(Bt),ii=_(xt),D=O;(Lt&&D(new Lt(new ArrayBuffer(1)))!=Ee||L&&D(new L)!=Ce||Ft&&D(Ft.resolve())!=Ie||Bt&&D(new Bt)!=Pe||xt&&D(new xt)!=Me)&&(D=function(t){var r=O(t),e=r==ei?t.constructor:void 0,o=e?_(e):"";if(o)switch(o){case oi:return Ee;case ai:return Ce;case fi:return Ie;case ni:return Pe;case ii:return Me}return r});var rt=D;var pi=Object.prototype,si=pi.hasOwnProperty;function mi(t){var r=t.length,e=new t.constructor(r);return r&&typeof t[0]=="string"&&si.call(t,"index")&&(e.index=t.index,e.input=t.input),e}var Le=mi;var ui=l.Uint8Array,Vt=ui;function li(t){var r=new t.constructor(t.byteLength);return new Vt(r).set(new Vt(t)),r}var et=li;function di(t,r){var e=r?et(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}var Fe=di;var ci=/\w*$/;function xi(t){var r=new t.constructor(t.source,ci.exec(t));return r.lastIndex=t.lastIndex,r}var Be=xi;var Ne=h?h.prototype:void 0,De=Ne?Ne.valueOf:void 0;function gi(t){return De?Object(De.call(t)):{}}var Ge=gi;function hi(t,r){var e=r?et(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}var Nt=hi;var yi="[object Boolean]",bi="[object Date]",vi="[object Map]",Oi="[object Number]",Ti="[object RegExp]",Ai="[object Set]",_i="[object String]",ji="[object Symbol]",Si="[object ArrayBuffer]",wi="[object DataView]",Ci="[object Float32Array]",Ii="[object Float64Array]",Pi="[object Int8Array]",Mi="[object Int16Array]",Ei="[object Int32Array]",Li="[object Uint8Array]",Fi="[object Uint8ClampedArray]",Bi="[object Uint16Array]",Ni="[object Uint32Array]";function Di(t,r,e){var o=t.constructor;switch(r){case Si:return et(t);case yi:case bi:return new o(+t);case wi:return Fe(t,e);case Ci:case Ii:case Pi:case Mi:case Ei:case Li:case Fi:case Bi:case Ni:return Nt(t,e);case vi:return new o;case Oi:case _i:return new o(t);case Ti:return Be(t);case Ai:return new o;case ji:return Ge(t)}}var Re=Di;function Gi(t){return typeof t.constructor=="function"&&!I(t)?cr(Z(t)):{}}var Dt=Gi;var Ri="[object Map]";function Ui(t){return x(t)&&rt(t)==Ri}var Ue=Ui;var Ke=j&&j.isMap,Ki=Ke?q(Ke):Ue,We=Ki;var Wi="[object Set]";function zi(t){return x(t)&&rt(t)==Wi}var ze=zi;var ke=j&&j.isSet,ki=ke?q(ke):ze,Ve=ki;var Vi=1,qi=2,Hi=4,qe="[object Arguments]",$i="[object Array]",Yi="[object Boolean]",Xi="[object Date]",Ji="[object Error]",He="[object Function]",Zi="[object GeneratorFunction]",Qi="[object Map]",tp="[object Number]",$e="[object Object]",rp="[object RegExp]",ep="[object Set]",op="[object String]",ap="[object Symbol]",fp="[object WeakMap]",np="[object ArrayBuffer]",ip="[object DataView]",pp="[object Float32Array]",sp="[object Float64Array]",mp="[object Int8Array]",up="[object Int16Array]",lp="[object Int32Array]",dp="[object Uint8Array]",cp="[object Uint8ClampedArray]",xp="[object Uint16Array]",gp="[object Uint32Array]",s={};s[qe]=s[$i]=s[np]=s[ip]=s[Yi]=s[Xi]=s[pp]=s[sp]=s[mp]=s[up]=s[lp]=s[Qi]=s[tp]=s[$e]=s[rp]=s[ep]=s[op]=s[ap]=s[dp]=s[cp]=s[xp]=s[gp]=!0;s[Ji]=s[He]=s[fp]=!1;function Gt(t,r,e,o,a,f){var n,i=r&Vi,p=r&qi,u=r&Hi;if(e&&(n=a?e(t,o,a,f):e(t)),n!==void 0)return n;if(!g(t))return t;var d=c(t);if(d){if(n=Le(t),!i)return gt(t,n)}else{var y=rt(t),G=y==He||y==Zi;if(V(t))return Ct(t,i);if(y==$e||y==qe||G&&!a){if(n=p||G?{}:Dt(t),!i)return p?Se(t,ye(n,t)):je(t,he(n,t))}else{if(!s[y])return a?t:{};n=Re(t,y,i)}}f||(f=new wt);var R=f.get(t);if(R)return R;f.set(t,n),Ve(t)?t.forEach(function(w){n.add(Gt(w,r,e,w,t,f))}):We(t)&&t.forEach(function(w,B){n.set(B,Gt(w,r,e,B,t,f))});var st=u?p?Et:we:p?A:P,$t=d?void 0:st(t);return br($t||t,function(w,B){$t&&(B=w,w=t[B]),k(n,B,Gt(w,r,e,B,t,f))}),n}var Rt=Gt;var hp=1,yp=4;function bp(t){return Rt(t,hp|yp)}var vp=bp;function Op(t){return function(r,e,o){for(var a=-1,f=Object(r),n=o(r),i=n.length;i--;){var p=n[t?i:++a];if(e(f[p],p,f)===!1)break}return r}}var Ye=Op;var Tp=Ye(),Xe=Tp;function Ap(t,r,e){(e!==void 0&&!C(t[r],e)||e===void 0&&!(r in t))&&z(t,r,e)}var it=Ap;function _p(t){return x(t)&&T(t)}var Je=_p;function jp(t,r){if(!(r==="constructor"&&typeof t[r]=="function")&&r!="__proto__")return t[r]}var pt=jp;function Sp(t){return v(t,A(t))}var Ze=Sp;function wp(t,r,e,o,a,f,n){var i=pt(t,e),p=pt(r,e),u=n.get(p);if(u){it(t,e,u);return}var d=f?f(i,p,e+"",t,r,n):void 0,y=d===void 0;if(y){var G=c(p),R=!G&&V(p),st=!G&&!R&&Tt(p);d=p,G||R||st?c(i)?d=i:Je(i)?d=gt(i):R?(y=!1,d=Ct(p,!0)):st?(y=!1,d=Nt(p,!0)):d=[]:St(p)||N(p)?(d=i,N(i)?d=Ze(i):(!g(i)||K(i))&&(d=Dt(p))):y=!1}y&&(n.set(p,d),a(d,p,o,f,n),n.delete(p)),it(t,e,d)}var Qe=wp;function to(t,r,e,o,a){t!==r&&Xe(r,function(f,n){if(a||(a=new wt),g(f))Qe(t,r,n,e,to,o,a);else{var i=o?o(pt(t,n),f,n+"",t,r,a):void 0;i===void 0&&(i=f),it(t,n,i)}},A)}var ro=to;function Cp(t){var r=t==null?0:t.length;return r?t[r-1]:void 0}var eo=Cp;function Ip(t){for(var r=-1,e=t==null?0:t.length,o={};++r<e;){var a=t[r];o[a[0]]=a[1]}return o}var qt=Ip;function Pp(t,r){return r.length<2?t:oe(t,ue(r,0,-1))}var oo=Pp;var Mp=Ot(function(t,r,e){ro(t,r,e)}),Ht=Mp;function Ep(t,r){return r=X(r,t),t=oo(t,r),t==null||delete t[jt(eo(r))]}var ao=Ep;function Lp(t){return St(t)?void 0:t}var fo=Lp;var Fp=1,Bp=2,Np=4,Dp=se(function(t,r){var e={};if(t==null)return e;var o=!1;r=lt(r,function(f){return f=X(f,t),o||(o=f.length>1),f}),v(t,Et(t),e),o&&(e=Rt(e,Fp|Bp|Np,fo));for(var a=r.length;a--;)ao(e,r[a]);return e}),Gp=Dp;var no=(()=>{let r=class r{constructor(){this._defaultConfig=ot(tr),this._configSubject=new Yt(this._defaultConfig)}get config$(){return this._configSubject.asObservable()}set config(o){let a=Ht({},this._configSubject.getValue(),o);this._configSubject.next(a)}reset(){this._configSubject.next(this._defaultConfig)}};r.\u0275fac=function(a){return new(a||r)},r.\u0275prov=mt({token:r,factory:r.\u0275fac,providedIn:"root"});let t=r;return t})();var ch=(()=>{let r=class r{constructor(){this._breakpointObserver=ot(Qt),this._angorConfigService=ot(no),this._onMediaChange=new Xt(1),this._angorConfigService.config$.pipe(Ut(o=>qt(Object.entries(o.screens).map(([a,f])=>[a,`(min-width: ${f})`]))),Jt(o=>this._breakpointObserver.observe(Object.values(o)).pipe(Ut(a=>{let f=[],n={},i=Object.entries(a.breakpoints).filter(([p,u])=>u)??[];for(let[p]of i){let u=Object.entries(o).find(([d,y])=>y===p)[0];u&&(f.push(u),n[u]=p)}this._onMediaChange.next({matchingAliases:f,matchingQueries:n})})))).subscribe()}get onMediaChange$(){return this._onMediaChange.asObservable()}onMediaQueryChange$(o){return this._breakpointObserver.observe(o)}};r.\u0275fac=function(a){return new(a||r)},r.\u0275prov=mt({token:r,factory:r.\u0275fac,providedIn:"root"});let t=r;return t})();export{_f as a,vp as b,qt as c,Ht as d,Gp as e,tr as f,no as g,ch as h};