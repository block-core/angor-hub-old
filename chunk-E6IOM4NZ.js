import{a as me,b as de,c as pe,d as ue}from"./chunk-ON6SO2QP.js";import{a as he,b as fe,c as ge,d as ve}from"./chunk-K7XPURVS.js";import{h as Ge}from"./chunk-3Q7ZV3LD.js";import{b as rt}from"./chunk-MYVAGBPZ.js";import{t as it,u as at,v as ot}from"./chunk-6S6AYVUH.js";import{A as Je,B as qe,D as Xe,H as Ye,L as et,T as tt,V as Z,W as G,q as Ke,t as se,y as K,z as Q}from"./chunk-4AZPYN7Q.js";import{d as nt,j as Me}from"./chunk-BLRJMPLX.js";import{$ as P,X as Qe,Z as R,_ as Ze,ba as E,ca as T}from"./chunk-MH4Z64LL.js";import{$a as h,Aa as F,Ab as je,Ba as r,Bb as _,Ca as k,D as q,Db as ie,Eb as ne,F as be,Fb as ae,Hb as w,Ib as Oe,Jb as Ne,Kb as j,Mb as Ve,Ob as Y,P as ye,Pa as v,Q as b,Qb as ee,Rb as ze,Ua as s,W as Te,Wa as we,Wb as oe,Z as z,_ as $,_a as U,a as J,ab as H,ba as y,bb as W,cb as c,db as l,dc as re,eb as d,gc as $e,h as D,hb as Be,ia as S,ib as X,ic as Ue,j as Ie,ja as I,k as B,ka as De,l as N,lb as x,nb as u,p as ke,q as Ce,qa as Fe,r as V,t as Ee,tb as Re,tc as He,ub as Pe,vb as Le,wc as ce,xc as We,yb as L,yc as le,za as Ae,zb as p}from"./chunk-LP5NDBXI.js";var ct=(()=>{let a=class a{constructor(){}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=y({type:a,selectors:[["chat"]],standalone:!0,features:[w],decls:3,vars:0,consts:[[1,"absolute","inset-0","flex","min-w-0","flex-col","overflow-hidden"],[1,"flex","flex-auto","overflow-hidden"]],template:function(i,o){i&1&&(c(0,"div",0)(1,"div",1),d(2,"router-outlet"),l()())},dependencies:[ce],encapsulation:2,changeDetection:0});let t=a;return t})();var Se=4;var M=(()=>{let a=class a{constructor(e,i,o,m,g){this._metadataService=e,this._signerService=i,this._indexedDBService=o,this._relayService=m,this._sanitizer=g,this.chatList=[],this.latestMessageTimestamps={},this.messageQueue=[],this.isDecrypting=!1,this._chat=new N(null),this._chats=new N(null),this._contact=new N(null),this._contacts=new N(null),this._profile=new N(null),this._unsubscribeAll=new B}get chat$(){return this._chat.asObservable()}get chats$(){return this._chats.asObservable()}get contact$(){return this._contact.asObservable()}get contacts$(){return this._contacts.asObservable()}get profile$(){return this._profile.asObservable()}getContact(e){return D(this,null,function*(){try{let i=yield this._metadataService.fetchMetadataWithCache(e);if(i){let o={pubKey:e,displayName:i.name,picture:i.picture,about:i.about};this._contact.next(o),this._indexedDBService.getMetadataStream().pipe(b(this._unsubscribeAll)).subscribe(m=>{if(m&&m.pubkey===e){let g={pubKey:e,displayName:m.metadata.name,picture:m.metadata.picture,about:m.metadata.about};this._contact.next(g)}})}}catch(i){console.error("Error fetching contact metadata:",i)}})}getContacts(){return new Ie(e=>(this._indexedDBService.getAllUsers().then(i=>{i.length>0&&(this._contacts.next(i),e.next(i));let o=i.map(m=>m.pubKey);o.length>0&&this.subscribeToRealTimeContacts(o,e)}).catch(i=>{console.error("Error loading cached contacts from IndexedDB:",i),e.error(i)}),()=>{console.log("Unsubscribing from contacts updates.")}))}subscribeToRealTimeContacts(e,i){this._metadataService.fetchMetadataForMultipleKeys(e).then(o=>{let m=[...this._contacts.value||[]];o.forEach(g=>{let f=m.findIndex(A=>A.pubKey===g.pubkey),C={pubKey:g.pubkey,displayName:g.name,picture:g.picture,about:g.about};f!==-1?m[f]=J(J({},m[f]),C):m.push(C)}),this._contacts.next(m),i.next(m)}).catch(o=>{console.error("Error fetching metadata for contacts:",o),i.error(o)})}getProfile(){return D(this,null,function*(){try{let e=this._signerService.getPublicKey(),i=yield this._metadataService.fetchMetadataWithCache(e);i&&(this._profile.next(i),this._indexedDBService.getMetadataStream().pipe(b(this._unsubscribeAll)).subscribe(o=>{o&&o.pubkey===e&&this._profile.next(o.metadata)}))}catch(e){console.error("Error fetching profile metadata:",e)}})}getChats(){return D(this,null,function*(){let e=this._signerService.getPublicKey(),i=yield this._signerService.isUsingExtension(),o=yield this._signerService.getSecretKey("123");return this.subscribeToChatList(e,i,o),this.getChatListStream()})}subscribeToChatList(e,i,o){return this._relayService.ensureConnectedRelays().then(()=>{let m=[{kinds:[Se],authors:[e]},{kinds:[Se],"#p":[e]}];this._relayService.getPool().subscribeMany(this._relayService.getConnectedRelays(),m,{onevent:g=>D(this,null,function*(){let f=g.pubkey===e?g.tags.find(A=>A[0]==="p")?.[1]||"":g.pubkey;if(!f)return;let C=this.latestMessageTimestamps[f]||0;g.created_at>C&&(this.latestMessageTimestamps[f]=g.created_at,this.messageQueue.push(g),this.processNextMessage(e,i,o))}),oneose:()=>{console.log("Subscription closed"),this._chats.next(this.chatList)}})}),this.getChatListStream()}processNextMessage(e,i,o){return D(this,null,function*(){if(this.isDecrypting||this.messageQueue.length===0)return;this.isDecrypting=!0;let m=this.messageQueue.shift();if(!m){this.isDecrypting=!1;return}let f=m.pubkey===e?m.tags.find(C=>C[0]==="p")?.[1]||"":m.pubkey;if(!f){this.isDecrypting=!1;return}try{let C=yield this.decryptReceivedMessage(m,i,o,f);if(C){let A=m.created_at*1e3;this.addOrUpdateChatList(f,C,A)}}catch(C){console.error("Failed to decrypt message:",C)}finally{this.isDecrypting=!1,this.processNextMessage(e,i,o)}})}addOrUpdateChatList(e,i,o){let m=this.chatList.find(g=>g.contact?.pubKey===e);if(m)m.lastMessageAt&&new Date(m.lastMessageAt).getTime()<o&&(m.lastMessage=i,m.lastMessageAt=new Date(o).toISOString());else{let g={id:e,contact:{pubKey:e},lastMessage:i,lastMessageAt:new Date(o).toISOString(),messages:[{id:e,chatId:e,contactId:e,isMine:!0,value:i,createdAt:new Date(o).toISOString()}]};this.chatList.push(g),this.fetchMetadataForPubKey(e)}this.chatList.sort((g,f)=>new Date(f.lastMessageAt).getTime()-new Date(g.lastMessageAt).getTime()),this._chats.next(this.chatList)}fetchMetadataForPubKey(e){this._metadataService.fetchMetadataWithCache(e).then(i=>{let o=this.chatList.find(m=>m.contact?.pubKey===e);o&&i&&(o.contact=J(J({},o.contact),i),this._chats.next(this.chatList))}).catch(i=>{console.error(`Failed to fetch metadata for pubKey: ${e}`,i)})}getChatListStream(){return this._chats.asObservable()}decryptReceivedMessage(e,i,o,m){return D(this,null,function*(){return i?yield this.decryptMessageWithExtension(e.content,m):yield this.decryptMessage(o,m,e.content)})}decryptMessageWithExtension(e,i){return D(this,null,function*(){try{return yield globalThis.nostr.nip04.decrypt(i,e)}catch(o){throw console.error("Error decrypting message with extension:",o),new Error("Failed to decrypt message with Nostr extension.")}})}encryptMessageWithExtension(e,i){return D(this,null,function*(){return yield globalThis.nostr.nip04.encrypt(i,e)})}encryptMessage(e,i,o){return D(this,null,function*(){console.log(o);try{return yield Me.encrypt(e,i,o)}catch(m){throw console.error("Error encrypting message:",m),m}})}decryptMessage(e,i,o){return D(this,null,function*(){try{return yield Me.decrypt(e,i,o)}catch(m){throw console.error("Error decrypting message:",m),m}})}updateChat(e,i){return this.chats$.pipe(be(1),ye(o=>{let m=i.contact?.pubKey;if(!m)return V("No public key found for this chat");let g={kind:4,pubkey:m,content:JSON.stringify(i),created_at:Math.floor(Date.now()/1e3),tags:[["p",m]]};return g.id=nt(g),ke(this._relayService.publishEventToRelays(g)).pipe(Ee(()=>{if(o){let f=o.findIndex(C=>C.id===e);f!==-1&&(o[f]=i,this._chats.next(o))}return i}),q(f=>(console.error("Failed to update chat via Nostr:",f),V(f))))}))}getChatById(e){let i=e,o=this._signerService.getPublicKey(),m=this._signerService.isUsingExtension(),g=this._signerService.getSecretKey("123");return this.chats$.pipe(be(1),ye(f=>{let C=f?.find(vt=>vt.id===e);if(C)return this._chat.next(C),Ce(C);let A={id:i,contact:{pubKey:i,picture:"/images/avatars/avatar-placeholder.png"},lastMessage:"",lastMessageAt:new Date().toISOString(),messages:[]},gt=f?[...f,A]:[A];return this._chats.next(gt),this._chat.next(A),Ce(A)}),q(f=>(console.error("Error fetching chat by id from Nostr:",f),V(f))))}resetChat(){this._chat.next(null)}ngOnDestroy(){this._unsubscribeAll.next(),this._unsubscribeAll.complete()}};a.\u0275fac=function(i){return new(i||a)(z(ot),z(rt),z(it),z(at),z(He))},a.\u0275prov=Te({token:a,factory:a.\u0275fac,providedIn:"root"});let t=a;return t})();function _t(t,a){if(t&1&&(c(0,"div",8),p(1),l()),t&2){let n,e=u().$implicit;r(),_(" ",(n=e==null||e.name==null?null:e.name.charAt(0))!==null&&n!==void 0?n:""," ")}}function xt(t,a){if(t&1&&d(0,"img",10),t&2){let n=u().$implicit;s("src",n.picture||"/images/avatars/avatar-placeholder.png",F)}}function Ct(t,a){if(t&1&&(c(0,"div",11),p(1),l()),t&2){let n,e=u().$implicit;r(),_(" ",(n=e==null||e.name==null?null:e.name.charAt(0))!==null&&n!==void 0?n:""," ")}}function bt(t,a){if(t&1&&(v(0,_t,2,1,"div",8),c(1,"div",7)(2,"div",9),v(3,xt,1,1,"img",10)(4,Ct,2,1,"div",11),l(),c(5,"div",12)(6,"div",13),p(7),l(),c(8,"div",14),p(9),l()()()),t&2){let n,e=a.$implicit,i=a.$index,o=u(2);h(i===0||((n=e==null||e.name==null?null:e.name.charAt(0))!==null&&n!==void 0?n:"")!==((n=o.contacts[i-1]==null||o.contacts[i-1].name==null?null:o.contacts[i-1].name.charAt(0))!==null&&n!==void 0?n:"")?0:-1),r(3),h(e.picture?3:-1),r(),h(e.picture?-1:4),r(3),_(" ",e.name," "),r(2),_(" ",e.about," ")}}function yt(t,a){if(t&1&&H(0,bt,10,5,"div",7,U().trackByFn,!0),t&2){let n=u();W(n.contacts)}}function wt(t,a){t&1&&(c(0,"div",6),p(1," There are no contacts! "),l())}var lt=(()=>{let a=class a{constructor(e){this._chatService=e,this.contacts=[],this._unsubscribeAll=new B}ngOnInit(){this._chatService.contacts$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.contacts=e})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}trackByFn(e,i){return i.id||e}};a.\u0275fac=function(i){return new(i||a)(k(M))},a.\u0275cmp=y({type:a,selectors:[["chat-new-chat"]],inputs:{drawer:"drawer"},standalone:!0,features:[w],decls:9,vars:2,consts:[[1,"bg-card","flex","h-full","flex-auto","flex-col","overflow-hidden","dark:bg-default"],[1,"-mb-px","flex","h-18","flex-0","items-center","bg-gray-50","px-6","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-2xl","font-semibold"],[1,"relative","overflow-y-auto"],[1,"border-t","p-8","text-center","text-4xl","font-semibold","tracking-tight","sm:p-16"],[1,"z-20","flex","cursor-pointer","items-center","border-b","px-6","py-4","dark:hover:bg-hover","hover:bg-gray-100","md:px-8"],[1,"text-secondary","sticky","top-0","z-10","-mt-px","border-b","border-t","bg-gray-100","px-6","py-1","font-medium","uppercase","dark:bg-gray-900","md:px-8"],[1,"flex","h-10","w-10","flex-0","items-center","justify-center","overflow-hidden","rounded-full"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Contact picture",1,"h-full","w-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","min-w-0"],[1,"truncate","font-medium","leading-5"],[1,"text-secondary","truncate","leading-5"]],template:function(i,o){i&1&&(c(0,"div",0)(1,"div",1)(2,"button",2),x("click",function(){return o.drawer.close()}),d(3,"mat-icon",3),l(),c(4,"div",4),p(5,"New chat"),l()(),c(6,"div",5),v(7,yt,2,0)(8,wt,2,0,"div",6),l()()),i&2&&(r(3),s("svgIcon","heroicons_outline:arrow-long-left"),r(4),h(o.contacts.length?7:8))},dependencies:[P,R,T,E],encapsulation:2,changeDetection:0});let t=a;return t})();function Mt(t,a){if(t&1&&d(0,"img",10),t&2){let n=u();s("src",n.profile.picture||"/images/avatars/avatar-placeholder.png",F)("alt","Profile picture")}}function St(t,a){if(t&1&&(c(0,"div",11),p(1),l()),t&2){let n=u();r(),_(" ",n.profile.name.charAt(0)," ")}}var dt=(()=>{let a=class a{constructor(e){this._chatService=e,this._unsubscribeAll=new B}ngOnInit(){this._chatService.profile$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.profile=e})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}};a.\u0275fac=function(i){return new(i||a)(k(M))},a.\u0275cmp=y({type:a,selectors:[["chat-profile"]],inputs:{drawer:"drawer"},standalone:!0,features:[w],decls:35,vars:11,consts:[[1,"bg-card","flex","flex-auto","flex-col","dark:bg-default"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-6","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-2xl","font-semibold"],[1,"px-6"],[1,"group","relative","mx-auto","mt-8","flex","h-40","w-40","flex-0","rounded-full"],[1,"absolute","inset-0","hidden","cursor-pointer","flex-col","items-center","justify-center","rounded-full","bg-gray-800","bg-opacity-80","backdrop-blur","backdrop-filter","group-hover:flex"],[1,"text-white",3,"svgIcon"],[1,"mx-6","mt-2","text-center","font-medium","text-white"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"h-full","w-full","rounded-full","object-cover",3,"src","alt"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-8xl","font-semibold","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"mx-2","mt-8","flex","flex-col"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"ngModel"],[1,"mt-4","flex","items-center","justify-end"],["mat-button","",3,"click"],["mat-flat-button","",1,"ml-2",3,"color"]],template:function(i,o){i&1&&(c(0,"div",0)(1,"div",1)(2,"button",2),x("click",function(){return o.drawer.close()}),d(3,"mat-icon",3),l(),c(4,"div",4),p(5,"Profile"),l()(),c(6,"div",5)(7,"div",6)(8,"div",7),d(9,"mat-icon",8),c(10,"div",9),p(11," Change Profile Photo "),l()(),v(12,Mt,1,2,"img",10)(13,St,2,1,"div",11),l(),c(14,"div",12)(15,"mat-form-field")(16,"mat-label"),p(17,"Name"),l(),d(18,"mat-icon",13)(19,"input",14),l(),c(20,"mat-form-field")(21,"mat-label"),p(22,"Username"),l(),d(23,"mat-icon",13)(24,"input",14),l(),c(25,"mat-form-field")(26,"mat-label"),p(27,"About"),l(),d(28,"mat-icon",13)(29,"input",14),l(),c(30,"div",15)(31,"button",16),x("click",function(){return o.drawer.close()}),p(32,"Cancel"),l(),c(33,"button",17),p(34," Save "),l()()()()()),i&2&&(r(3),s("svgIcon","heroicons_outline:arrow-long-left"),r(6),s("svgIcon","heroicons_outline:camera"),r(3),h(o.profile.picture?12:-1),r(),h(o.profile.picture?-1:13),r(5),s("svgIcon","heroicons_solid:user-circle"),r(),s("ngModel",o.profile.name),r(4),s("svgIcon","heroicons_solid:at-symbol"),r(),s("ngModel",o.profile.username),r(4),s("svgIcon","heroicons_solid:identification"),r(),s("ngModel",o.profile.about),r(4),s("color","primary"))},dependencies:[P,Qe,R,T,E,Q,K,Ke,se,G,Z,tt,Xe,Ye,et],encapsulation:2,changeDetection:0});let t=a;return t})();var Et=(t,a)=>({"dark:hover:bg-hover hover:bg-gray-100":t,"bg-primary-50 dark:bg-hover":a}),Tt=t=>[t],Dt=(t,a)=>({"absolute inset-0 z-20 flex lg:static lg:inset-auto":t,"hidden lg:flex":a});function Ft(t,a){if(t&1&&d(0,"chat-new-chat",6),t&2){u();let n=L(3);s("drawer",n)}}function At(t,a){if(t&1&&d(0,"chat-profile",6),t&2){u();let n=L(3);s("drawer",n)}}function Bt(t,a){if(t&1&&d(0,"img",15),t&2){let n=u(2);s("src",n.profile.picture||"/images/avatars/avatar-placeholder.png",F)}}function Rt(t,a){if(t&1&&(c(0,"div",16),p(1),l()),t&2){let n=u(2);r(),_(" ",n.profile.name?n.profile.name.charAt(0):""," ")}}function Pt(t,a){if(t&1&&d(0,"div",38),t&2){let n=u().$implicit,e=u(3);we("ring-primary-50",e.selectedChat&&e.selectedChat.id===n.id)}}function Lt(t,a){if(t&1&&d(0,"img",31),t&2){let n=u().$implicit;s("src",n.contact.picture||"/images/avatars/avatar-placeholder.png",F)}}function jt(t,a){if(t&1&&(c(0,"div",16),p(1),l()),t&2){let n=u().$implicit;r(),_(" ",!(n==null||n.contact==null)&&n.contact.name?n.contact.name.charAt(0):""," ")}}function Ot(t,a){t&1&&d(0,"mat-icon",37),t&2&&s("svgIcon","heroicons_solid:speaker-x-mark")}function Nt(t,a){if(t&1&&(c(0,"a",28)(1,"div",29),v(2,Pt,1,2,"div",30)(3,Lt,1,1,"img",31)(4,jt,2,1,"div",16),l(),c(5,"div",32)(6,"div",33),p(7),l(),c(8,"div",34),p(9),l()(),c(10,"div",35)(11,"div",36),p(12),l(),v(13,Ot,1,1,"mat-icon",37),l()()),t&2){let n=a.$implicit,e=u(3);s("ngClass",j(13,Et,!e.selectedChat||e.selectedChat.id!==n.id,e.selectedChat&&e.selectedChat.id===n.id))("routerLink",Ne(16,Tt,n.id)),r(2),h(n.unreadCount>0?2:-1),r(),h(n.contact.picture?3:-1),r(),h(n.contact.picture?-1:4),r(3),_(" ",n.contact.name," "),r(),we("text-primary",n.unreadCount>0)("dark:text-primary-500",n.unreadCount>0),r(),_(" ",n.lastMessage," "),r(3),_(" ",n.lastMessageAt," "),r(),h(n.muted?13:-1)}}function Vt(t,a){if(t&1&&H(0,Nt,14,18,"a",28,U().trackByFn,!0),t&2){let n=u(2);W(n.filteredChats)}}function zt(t,a){t&1&&(c(0,"div",9),d(1,"mat-icon",39),c(2,"div",40),p(3," No chats "),l()()),t&2&&(r(),s("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function $t(t,a){if(t&1){let n=X();c(0,"div",8)(1,"div",11)(2,"div",12)(3,"div",13),x("click",function(){S(n);let i=u();return I(i.openProfile())}),c(4,"div",14),v(5,Bt,1,1,"img",15)(6,Rt,2,1,"div",16),l(),c(7,"div",17),p(8),l()(),c(9,"button",18),x("click",function(){S(n);let i=u();return I(i.openNewChat())}),d(10,"mat-icon",19),l(),c(11,"button",20),d(12,"mat-icon",19),c(13,"mat-menu",null,1)(15,"button",21),d(16,"mat-icon",19),p(17," New group "),l(),c(18,"button",21),d(19,"mat-icon",19),p(20," Create a room "),l(),c(21,"button",22),x("click",function(){S(n);let i=u();return I(i.openProfile())}),d(22,"mat-icon",19),p(23," Profile "),l(),c(24,"button",21),d(25,"mat-icon",19),p(26," Archived "),l(),c(27,"button",21),d(28,"mat-icon",19),p(29," Starred "),l(),c(30,"button",21),d(31,"mat-icon",19),p(32," Settings "),l()()()(),c(33,"div",23)(34,"mat-form-field",24),d(35,"mat-icon",25),c(36,"input",26,2),x("input",function(){S(n);let i=L(37),o=u();return I(o.filterChats(i.value))}),l()()()(),c(38,"div",27),v(39,Vt,2,0)(40,zt,4,1,"div",9),l()()}if(t&2){let n=L(14),e=u();r(5),h(e.profile.picture?5:-1),r(),h(e.profile.picture?-1:6),r(2),_(" ",e.profile.name," "),r(2),s("svgIcon","heroicons_outline:plus-circle"),r(),s("matMenuTriggerFor",n),r(),s("svgIcon","heroicons_outline:ellipsis-vertical"),r(4),s("svgIcon","heroicons_outline:user-group"),r(3),s("svgIcon","heroicons_outline:chat-bubble-left-right"),r(3),s("svgIcon","heroicons_outline:user-circle"),r(3),s("svgIcon","heroicons_outline:archive-box"),r(3),s("svgIcon","heroicons_outline:star"),r(3),s("svgIcon","heroicons_outline:cog-8-tooth"),r(3),s("subscriptSizing","dynamic"),r(),s("svgIcon","heroicons_solid:magnifying-glass"),r(),s("autocomplete","off")("placeholder","Search or start new chat"),r(3),h(e.filteredChats.length>0?39:40)}}function Ut(t,a){t&1&&(c(0,"div",9),d(1,"mat-icon",39),c(2,"div",40),p(3," No chats "),l()()),t&2&&(r(),s("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function Ht(t,a){if(t&1&&(c(0,"div",10),d(1,"router-outlet"),l()),t&2){let n=u();s("ngClass",j(1,Dt,n.selectedChat&&n.selectedChat.id,!n.selectedChat||!n.selectedChat.id))}}var pt=(()=>{let a=class a{constructor(e,i){this._chatService=e,this._changeDetectorRef=i,this.drawerOpened=!1,this._unsubscribeAll=new B}ngOnInit(){this._chatService.chats$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.chats=this.filteredChats=e,this._changeDetectorRef.markForCheck()}),this._chatService.profile$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.profile=e,this._changeDetectorRef.markForCheck()}),this._chatService.chat$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.selectedChat=e,this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete(),this._chatService.resetChat()}filterChats(e){if(!e){this.filteredChats=this.chats;return}this.filteredChats=this.chats.filter(i=>(i.contact.name?i.contact.name.toLowerCase():"").includes(e.toLowerCase()))}openNewChat(){this.drawerComponent="new-chat",this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}openProfile(){this.drawerComponent="profile",this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}trackByFn(e,i){return i.id||e}};a.\u0275fac=function(i){return new(i||a)(k(M),k(oe))},a.\u0275cmp=y({type:a,selectors:[["chat-chats"]],standalone:!0,features:[w],decls:10,vars:7,consts:[["drawer",""],["chatsHeaderMenu",""],["searchField",""],[1,"bg-card","relative","flex","w-full","flex-auto","dark:bg-transparent"],[1,"h-full","flex-auto",3,"hasBackdrop"],[1,"w-full","dark:bg-gray-900","sm:w-100","lg:border-r","lg:shadow-none",3,"openedChange","autoFocus","opened"],[3,"drawer"],[1,"flex","overflow-hidden"],[1,"bg-card","relative","flex","w-full","min-w-0","flex-auto","flex-col","dark:bg-transparent","lg:min-w-100","lg:max-w-100"],[1,"flex","h-full","flex-auto","flex-col","items-center","justify-center"],[1,"flex-auto","border-l",3,"ngClass"],[1,"flex","flex-0","flex-col","border-b","bg-gray-50","px-8","py-4","dark:bg-transparent"],[1,"flex","items-center"],[1,"mr-1","flex","cursor-pointer","items-center",3,"click"],[1,"h-10","w-10"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Profile picture",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","truncate","font-medium"],["mat-icon-button","",1,"ml-auto",3,"click"],[3,"svgIcon"],["mat-icon-button","",1,"-mr-4","ml-1",3,"matMenuTriggerFor"],["mat-menu-item",""],["mat-menu-item","",3,"click"],[1,"mt-4"],[1,"angor-mat-rounded","angor-mat-dense","w-full",3,"subscriptSizing"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"input","autocomplete","placeholder"],[1,"flex-auto","overflow-y-auto"],[1,"z-20","flex","cursor-pointer","items-center","border-b","px-8","py-5",3,"ngClass","routerLink"],[1,"relative","flex","h-10","w-10","flex-0","items-center","justify-center"],[1,"ring-bg-card","absolute","bottom-0","right-0","-ml-0.5","h-2","w-2","flex-0","rounded-full","bg-primary","text-on-primary","ring-2","dark:bg-primary-500","dark:ring-gray-900",3,"ring-primary-50"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Contact picture",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"ml-4","min-w-0"],[1,"truncate","font-medium","leading-5"],[1,"text-secondary","truncate","leading-5"],[1,"ml-auto","flex","flex-col","items-end","self-start","pl-2"],[1,"text-secondary","text-sm","leading-5"],[1,"text-hint","icon-size-5",3,"svgIcon"],[1,"ring-bg-card","absolute","bottom-0","right-0","-ml-0.5","h-2","w-2","flex-0","rounded-full","bg-primary","text-on-primary","ring-2","dark:bg-primary-500","dark:ring-gray-900"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"]],template:function(i,o){if(i&1){let m=X();c(0,"div",3)(1,"mat-drawer-container",4)(2,"mat-drawer",5,0),ae("openedChange",function(f){return S(m),ne(o.drawerOpened,f)||(o.drawerOpened=f),I(f)}),v(4,Ft,1,1,"chat-new-chat",6)(5,At,1,1,"chat-profile",6),l(),c(6,"mat-drawer-content",7),v(7,$t,41,17,"div",8)(8,Ut,4,1,"div",9)(9,Ht,2,4,"div",10),l()()()}i&2&&(r(),s("hasBackdrop",!1),r(),s("autoFocus",!1),ie("opened",o.drawerOpened),r(2),h(o.drawerComponent==="new-chat"?4:-1),r(),h(o.drawerComponent==="profile"?5:-1),r(2),h(o.chats&&o.chats.length>0?7:8),r(2),h(o.chats&&o.chats.length>0?9:-1))},dependencies:[ve,fe,ge,he,lt,dt,P,R,T,E,ue,de,me,pe,Q,K,se,G,Z,re,le,ce],encapsulation:2,changeDetection:0});let t=a;return t})();function Wt(t,a){if(t&1&&d(0,"img",8),t&2){let n=u();s("src",n.chat.contact.picture||"/images/avatars/avatar-placeholder.png",F)("alt","Contact picture")}}function Kt(t,a){if(t&1&&(c(0,"div",9),p(1),l()),t&2){let n=u();r(),_(" ",!(n.chat==null||n.chat.contact==null)&&n.chat.contact.name?n.chat.contact.name.charAt(0):""," ")}}var ut=(()=>{let a=class a{constructor(){}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=y({type:a,selectors:[["chat-contact-info"]],inputs:{chat:"chat",drawer:"drawer"},standalone:!0,features:[w],decls:15,vars:5,consts:[[1,"bg-card","flex","h-full","flex-auto","flex-col","dark:bg-default"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-4","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-lg","font-medium"],[1,"overflow-y-auto"],[1,"mt-8","flex","flex-col","items-center"],[1,"h-40","w-40","rounded-full"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"h-full","w-full","rounded-full","object-cover",3,"src","alt"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-8xl","font-semibold","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"mt-4","text-lg","font-medium"],[1,"text-secondary","mt-0.5","text-md"]],template:function(i,o){i&1&&(c(0,"div",0)(1,"div",1)(2,"button",2),x("click",function(){return o.drawer.close()}),d(3,"mat-icon",3),l(),c(4,"div",4),p(5,"Contact info"),l()(),c(6,"div",5)(7,"div",6)(8,"div",7),v(9,Wt,1,2,"img",8)(10,Kt,2,1,"div",9),l(),c(11,"div",10),p(12),l(),c(13,"div",11),p(14),l()()()()),i&2&&(r(3),s("svgIcon","heroicons_outline:x-mark"),r(6),h(o.chat.contact.picture?9:-1),r(),h(o.chat.contact.picture?-1:10),r(2),je(o.chat.contact.name),r(2),_(" ",o.chat.contact.about," "))},dependencies:[P,R,T,E],encapsulation:2,changeDetection:0});let t=a;return t})();var Qt=["messageInput"],Zt=()=>["./"],Gt=(t,a,n,e)=>({"items-end":t,"items-start":a,"mt-0.5":n,"mt-3":e}),Jt=(t,a)=>({"bg-blue-500 text-blue-50":t,"bg-gray-500 text-gray-50":a}),qt=(t,a)=>({"-right-1 -mr-px mb-px text-blue-500":t,"-left-1 -ml-px mb-px -scale-x-1 text-gray-500":a}),Xt=(t,a)=>({"mr-3":t,"ml-3":a});function Yt(t,a){if(t&1&&d(0,"img",15),t&2){let n=u(2);s("src",n.chat.contact.picture||"/images/avatars/avatar-placeholder.png",F)}}function ei(t,a){if(t&1&&(c(0,"div",16),p(1),l()),t&2){let n,e=u(2);r(),_(" ",(n=e.chat==null||e.chat.contact==null||e.chat.contact.name==null?null:e.chat.contact.name.charAt(0))!==null&&n!==void 0?n:""," ")}}function ti(t,a){t&1&&(d(0,"mat-icon",12),p(1," Mute notifications ")),t&2&&s("svgIcon","heroicons_outline:speaker-x-mark")}function ii(t,a){t&1&&(d(0,"mat-icon",12),p(1," Unmute notifications ")),t&2&&s("svgIcon","heroicons_outline:speaker-wave")}function ni(t,a){if(t&1&&(c(0,"div",31),d(1,"div",36),c(2,"div",37),p(3),Y(4,"date"),l(),d(5,"div",36),l()),t&2){let n=u().$implicit;r(3),_(" ",ee(4,1,n.createdAt,"longDate")," ")}}function ai(t,a){t&1&&Be(0)}function oi(t,a){if(t&1&&(c(0,"div",33),v(1,ai,1,0,"ng-container",38),l()),t&2){let n=u().$implicit;u(2);let e=L(4);s("ngClass",j(2,qt,n.isMine,!n.isMine)),r(),s("ngTemplateOutlet",e)}}function ri(t,a){if(t&1&&(c(0,"div",35),p(1),Y(2,"date"),l()),t&2){let n=u().$implicit;s("ngClass",j(5,Xt,n.isMine,!n.isMine)),r(),_(" ",ee(2,2,n.createdAt,"HH:mm")," ")}}function ci(t,a){if(t&1&&(v(0,ni,6,4,"div",31),Y(1,"date"),Y(2,"date"),c(3,"div",23)(4,"div",32),v(5,oi,2,5,"div",33),d(6,"div",34),l(),v(7,ri,3,8,"div",35),l()),t&2){let n=a.$implicit,e=a.$index,i=a.$count,o=u(2);h(e===0||ee(1,6,o.chat.messages[e-1].createdAt,"d")!==ee(2,9,n.createdAt,"d")?0:-1),r(3),s("ngClass",Ve(12,Gt,n.isMine,!n.isMine,e>0&&o.chat.messages[e-1].isMine===n.isMine,e>0&&o.chat.messages[e-1].isMine!==n.isMine)),r(),s("ngClass",j(17,Jt,n.isMine,!n.isMine)),r(),h(e===i-1||o.chat.messages[e+1].isMine!==n.isMine?5:-1),r(),s("innerHTML",n.value,Ae),r(),h(e===0||e===i-1||o.chat.messages[e+1].isMine!==n.isMine||o.chat.messages[e+1].createdAt!==n.createdAt?7:-1)}}function li(t,a){if(t&1){let n=X();c(0,"mat-drawer-container",5)(1,"mat-drawer",7,1),ae("openedChange",function(i){S(n);let o=u();return ne(o.drawerOpened,i)||(o.drawerOpened=i),I(i)}),d(3,"chat-contact-info",8),l(),c(4,"mat-drawer-content",9)(5,"div",10)(6,"a",11),x("click",function(){S(n);let i=u();return I(i.resetChat())}),d(7,"mat-icon",12),l(),c(8,"div",13),x("click",function(){S(n);let i=u();return I(i.openContactInfo())}),c(9,"div",14),v(10,Yt,1,1,"img",15)(11,ei,2,1,"div",16),l(),c(12,"div",17),p(13),l()(),c(14,"button",18),d(15,"mat-icon",12),c(16,"mat-menu",null,2)(18,"button",19),x("click",function(){S(n);let i=u();return I(i.openContactInfo())}),d(19,"mat-icon",12),p(20," Contact info "),l(),c(21,"button",20),d(22,"mat-icon",12),p(23," Select messages "),l(),c(24,"button",19),x("click",function(){S(n);let i=u();return I(i.toggleMuteNotifications())}),v(25,ti,2,1)(26,ii,2,1),l(),c(27,"button",20),d(28,"mat-icon",12),p(29," Clear messages "),l(),c(30,"button",20),d(31,"mat-icon",12),p(32," Delete chat "),l()()()(),c(33,"div",21)(34,"div",22),H(35,ci,8,20,"div",23,U().trackByFn,!0),l()(),c(37,"div",24)(38,"div",25)(39,"button",26),d(40,"mat-icon",12),l(),c(41,"button",27),d(42,"mat-icon",12),l()(),c(43,"mat-form-field",28),d(44,"textarea",29,3),l(),c(46,"div",30)(47,"button",26),d(48,"mat-icon",12),l()()()()()}if(t&2){let n=L(2),e=L(17),i=u();s("hasBackdrop",!1),r(),s("autoFocus",!1)("mode",i.drawerMode)("position","end"),ie("opened",i.drawerOpened),r(2),s("drawer",n)("chat",i.chat),r(3),s("routerLink",Oe(23,Zt)),r(),s("svgIcon","heroicons_outline:arrow-long-left"),r(3),h(i.chat.contact.picture?10:-1),r(),h(i.chat.contact.picture?-1:11),r(2),_(" ",i.chat.contact.name," "),r(),s("matMenuTriggerFor",e),r(),s("svgIcon","heroicons_outline:ellipsis-vertical"),r(4),s("svgIcon","heroicons_outline:user-circle"),r(3),s("svgIcon","heroicons_outline:check-circle"),r(3),h(i.chat.muted?-1:25),r(),h(i.chat.muted?26:-1),r(2),s("svgIcon","heroicons_outline:backspace"),r(3),s("svgIcon","heroicons_outline:trash"),r(4),W(i.chat.messages),r(5),s("svgIcon","heroicons_outline:face-smile"),r(2),s("svgIcon","heroicons_outline:paper-clip"),r(6),s("svgIcon","heroicons_outline:paper-airplane")}}function si(t,a){t&1&&(c(0,"div",6),d(1,"mat-icon",39),c(2,"div",40),p(3," Select a conversation or start a new chat "),l()()),t&2&&(r(),s("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function mi(t,a){t&1&&(De(),c(0,"svg",41)(1,"g",42),d(2,"path",43),l()())}var ht=(()=>{let a=class a{constructor(e,i,o,m){this._changeDetectorRef=e,this._chatService=i,this._angorMediaWatcherService=o,this._ngZone=m,this.drawerMode="side",this.drawerOpened=!1,this._unsubscribeAll=new B}_resizeMessageInput(){this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this.messageInput.nativeElement.style.height="auto",this._changeDetectorRef.detectChanges(),this.messageInput.nativeElement.style.height=`${this.messageInput.nativeElement.scrollHeight}px`,this._changeDetectorRef.detectChanges()})})}ngOnInit(){this._chatService.chat$.pipe(b(this._unsubscribeAll)).subscribe(e=>{this.chat=e,this._changeDetectorRef.markForCheck()}),this._angorMediaWatcherService.onMediaChange$.pipe(b(this._unsubscribeAll)).subscribe(({matchingAliases:e})=>{e.includes("lg")?this.drawerMode="side":this.drawerMode="over",this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}openContactInfo(){this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}resetChat(){this._chatService.resetChat(),this.drawerOpened=!1,this._changeDetectorRef.markForCheck()}toggleMuteNotifications(){this.chat.muted=!this.chat.muted,this._chatService.updateChat(this.chat.id,this.chat).subscribe()}trackByFn(e,i){return i.id||e}};a.\u0275fac=function(i){return new(i||a)(k(oe),k(M),k(Ge),k(Fe))},a.\u0275cmp=y({type:a,selectors:[["chat-conversation"]],viewQuery:function(i,o){if(i&1&&Re(Qt,5),i&2){let m;Pe(m=Le())&&(o.messageInput=m.first)}},hostBindings:function(i,o){i&1&&x("input",function(){return o._resizeMessageInput()})("ngModelChange",function(){return o._resizeMessageInput()})},standalone:!0,features:[w],decls:5,vars:1,consts:[["speechBubbleExtension",""],["drawer",""],["conversationHeaderMenu",""],["messageInput",""],[1,"bg-card","flex","flex-auto","flex-col","overflow-y-auto","dark:bg-default","lg:overflow-hidden"],[1,"h-full","flex-auto",3,"hasBackdrop"],[1,"flex","flex-auto","flex-col","items-center","justify-center","bg-gray-100","dark:bg-transparent"],[1,"w-full","dark:bg-gray-900","sm:w-100","lg:border-l","lg:shadow-none",3,"openedChange","autoFocus","mode","position","opened"],[3,"drawer","chat"],[1,"flex","flex-col","overflow-hidden"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-4","dark:bg-transparent","md:px-6"],["mat-icon-button","",1,"md:-ml-2","lg:hidden",3,"click","routerLink"],[3,"svgIcon"],[1,"ml-2","mr-2","flex","cursor-pointer","items-center","lg:ml-0",3,"click"],[1,"relative","flex","h-10","w-10","flex-0","items-center","justify-center"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Contact picture",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","truncate","text-lg","font-medium","leading-5"],["mat-icon-button","",1,"ml-auto",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click"],["mat-menu-item",""],[1,"flex","flex-col-reverse","overflow-y-auto","h-full"],[1,"bg-card","flex","flex-auto","shrink","flex-col","p-6","dark:bg-transparent"],[1,"flex","flex-col",3,"ngClass"],[1,"flex","items-end","border-t","bg-gray-50","p-4","dark:bg-transparent"],[1,"my-px","flex","h-11","items-center"],["mat-icon-button",""],["mat-icon-button","",1,"ml-0.5"],["subscriptSizing","dynamic",1,"angor-mat-dense","angor-mat-rounded","angor-mat-bold","ml-4","w-full"],["matInput","","cdkTextareaAutosize",""],[1,"my-px","ml-4","flex","h-11","items-center"],[1,"-mx-6","my-3","flex","items-center","justify-center"],[1,"relative","max-w-3/4","rounded-lg","px-3","py-2",3,"ngClass"],[1,"absolute","bottom-0","w-3",3,"ngClass"],[1,"min-w-4","leading-5",3,"innerHTML"],[1,"text-secondary","my-0.5","text-sm","font-medium",3,"ngClass"],[1,"flex-auto","border-b"],[1,"text-secondary","mx-4","flex-0","text-sm","font-medium","leading-5"],[4,"ngTemplateOutlet"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"],["width","100%","height","100%","viewBox","0 0 66 66","xmlns","http://www.w3.org/2000/svg"],["id","Page-1","stroke","none","stroke-width","1","fill","none","fill-rule","evenodd"],["d","M1.01522827,0.516204834 C-8.83532715,54.3062744 61.7609863,70.5215302 64.8009949,64.3061218 C68.8074951,54.8859711 30.1663208,52.9997559 37.5036011,0.516204834 L1.01522827,0.516204834 Z","fill","currentColor","fill-rule","nonzero"]],template:function(i,o){i&1&&(c(0,"div",4),v(1,li,49,24,"mat-drawer-container",5)(2,si,4,1,"div",6)(3,mi,3,0,"ng-template",null,0,ze),l()),i&2&&(r(),h(o.chat?1:2))},dependencies:[ve,fe,ge,he,ut,P,Ze,R,le,T,E,ue,de,me,pe,re,$e,Q,K,G,Z,Je,qe,Ue],encapsulation:2,changeDetection:0});let t=a;return t})();var ft=(()=>{let a=class a{constructor(){}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=y({type:a,selectors:[["chat-empty-conversation"]],standalone:!0,features:[w],decls:5,vars:1,consts:[[1,"bg-card","flex","flex-auto","flex-col","overflow-y-auto","dark:bg-default","lg:overflow-hidden"],[1,"flex","flex-auto","flex-col","items-center","justify-center","bg-gray-100","dark:bg-transparent"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"]],template:function(i,o){i&1&&(c(0,"div",0)(1,"div",1),d(2,"mat-icon",2),c(3,"div",3),p(4," Select a conversation or start a new chat "),l()()()),i&2&&(r(2),s("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))},dependencies:[T,E],encapsulation:2,changeDetection:0});let t=a;return t})();var di=(t,a)=>{let n=$(M),e=$(We);return n.getChatById(t.paramMap.get("id")).pipe(q(i=>{console.error(i);let o=a.url.split("/").slice(0,-1).join("/");return e.navigateByUrl(o),V(i)}))},Mn=[{path:"",component:ct,resolve:{chats:()=>$(M).getChats(),contacts:()=>$(M).getContacts(),profile:()=>$(M).getProfile()},children:[{path:"",component:pt,children:[{path:"",pathMatch:"full",component:ft},{path:":id",component:ht,resolve:{conversation:di}}]}]}];export{Mn as default};
