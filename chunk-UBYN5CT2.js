import{a as ce,b as le,c as se,d as me}from"./chunk-UXPD7VCT.js";import{a as de,b as pe,c as ue,d as fe}from"./chunk-VSFECHAA.js";import{h as Ue}from"./chunk-KF72X2I6.js";import"./chunk-NO6YX2BS.js";import{A as Qe,C as Ze,G as Ge,K as qe,S as Je,U as L,V as U,q as Re,s as re,x as R,y as H,z as We}from"./chunk-Q2LE7SOT.js";import{$ as T,X as He,Z as E,_ as Le,ba as S,ca as I}from"./chunk-WKHOS5S7.js";import{$a as u,Aa as w,Ab as s,B as be,Ba as o,Bb as N,Ca as M,Cb as h,D as ye,Eb as Y,F as xe,Fb as ee,Gb as te,Ib as g,Jb as Be,Kb as je,Lb as j,Nb as Ve,P as X,Pa as f,Pb as G,Q as k,Rb as q,S as $,Sb as Oe,Ua as l,W as we,Wa as ge,Xb as ie,Z as Me,_ as z,_a as P,ab as Ee,ba as x,bb as A,cb as B,db as a,eb as c,ec as ne,fb as d,hc as $e,ia as b,ib as Te,ja as y,jb as Z,jc as ze,k as D,ka as Se,l as O,mb as v,ob as p,pc as Pe,q as Ce,qa as Ie,r as K,t as ve,ub as Fe,vb as De,wb as Ae,xc as oe,yc as Ne,za as ke,zb as F,zc as ae}from"./chunk-IRG7MLS7.js";var Ke=(()=>{let t=class t{constructor(){}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["chat"]],standalone:!0,features:[g],decls:3,vars:0,consts:[[1,"absolute","inset-0","flex","min-w-0","flex-col","overflow-hidden"],[1,"flex","flex-auto","overflow-hidden"]],template:function(r,m){r&1&&(a(0,"div",0)(1,"div",1),d(2,"router-outlet"),c()())},dependencies:[oe],encapsulation:2,changeDetection:0});let e=t;return e})();var C=(()=>{let t=class t{constructor(n){this._httpClient=n,this._chat=new O(null),this._chats=new O(null),this._contact=new O(null),this._contacts=new O(null),this._profile=new O(null)}get chat$(){return this._chat.asObservable()}get chats$(){return this._chats.asObservable()}get contact$(){return this._contact.asObservable()}get contacts$(){return this._contacts.asObservable()}get profile$(){return this._profile.asObservable()}getChats(){return this._httpClient.get("api/apps/chat/chats").pipe($(n=>{this._chats.next(n)}))}getContact(n){return this._httpClient.get("api/apps/chat/contacts",{params:{id:n}}).pipe($(r=>{this._contact.next(r)}))}getContacts(){return this._httpClient.get("api/apps/chat/contacts").pipe($(n=>{this._contacts.next(n)}))}getProfile(){return this._httpClient.get("api/apps/chat/profile").pipe($(n=>{this._profile.next(n)}))}getChatById(n){return this._httpClient.get("api/apps/chat/chat",{params:{id:n}}).pipe(ve(r=>(this._chat.next(r),r)),X(r=>r?Ce(r):K("Could not found chat with id of "+n+"!")))}updateChat(n,r){return this.chats$.pipe(xe(1),X(m=>this._httpClient.patch("api/apps/chat/chat",{id:n,chat:r}).pipe(ve(_=>{let W=m.findIndex(Q=>Q.id===n);return m[W]=_,this._chats.next(m),_}),X(_=>this.chat$.pipe(xe(1),be(W=>W&&W.id===n),$(()=>(this._chat.next(_),_)))))))}resetChat(){this._chat.next(null)}};t.\u0275fac=function(r){return new(r||t)(Me(Pe))},t.\u0275prov=we({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function rt(e,t){if(e&1&&(a(0,"div",8),s(1),c()),e&2){let i=p().$implicit;o(),h(" ",i.name.charAt(0)," ")}}function ct(e,t){if(e&1&&d(0,"img",10),e&2){let i=p().$implicit;l("src",i.avatar,w)}}function lt(e,t){if(e&1&&(a(0,"div",11),s(1),c()),e&2){let i=p().$implicit;o(),h(" ",i.name.charAt(0)," ")}}function st(e,t){if(e&1&&(f(0,rt,2,1,"div",8),a(1,"div",7)(2,"div",9),f(3,ct,1,1,"img",10)(4,lt,2,1,"div",11),c(),a(5,"div",12)(6,"div",13),s(7),c(),a(8,"div",14),s(9),c()()()),e&2){let i=t.$implicit,n=t.$index,r=p(2);u(n===0||i.name.charAt(0)!==r.contacts[n-1].name.charAt(0)?0:-1),o(3),u(i.avatar?3:-1),o(),u(i.avatar?-1:4),o(3),h(" ",i.name," "),o(2),h(" ",i.about," ")}}function mt(e,t){if(e&1&&A(0,st,10,5,"div",7,P().trackByFn,!0),e&2){let i=p();B(i.contacts)}}function dt(e,t){e&1&&(a(0,"div",6),s(1," There are no contacts! "),c())}var Xe=(()=>{let t=class t{constructor(n){this._chatService=n,this.contacts=[],this._unsubscribeAll=new D}ngOnInit(){this._chatService.contacts$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.contacts=n})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}trackByFn(n,r){return r.id||n}};t.\u0275fac=function(r){return new(r||t)(M(C))},t.\u0275cmp=x({type:t,selectors:[["chat-new-chat"]],inputs:{drawer:"drawer"},standalone:!0,features:[g],decls:9,vars:2,consts:[[1,"bg-card","flex","h-full","flex-auto","flex-col","overflow-hidden","dark:bg-default"],[1,"-mb-px","flex","h-18","flex-0","items-center","bg-gray-50","px-6","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-2xl","font-semibold"],[1,"relative","overflow-y-auto"],[1,"border-t","p-8","text-center","text-4xl","font-semibold","tracking-tight","sm:p-16"],[1,"z-20","flex","cursor-pointer","items-center","border-b","px-6","py-4","dark:hover:bg-hover","hover:bg-gray-100","md:px-8"],[1,"text-secondary","sticky","top-0","z-10","-mt-px","border-b","border-t","bg-gray-100","px-6","py-1","font-medium","uppercase","dark:bg-gray-900","md:px-8"],[1,"flex","h-10","w-10","flex-0","items-center","justify-center","overflow-hidden","rounded-full"],["alt","Contact avatar",1,"h-full","w-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","min-w-0"],[1,"truncate","font-medium","leading-5"],[1,"text-secondary","truncate","leading-5"]],template:function(r,m){r&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),v("click",function(){return m.drawer.close()}),d(3,"mat-icon",3),c(),a(4,"div",4),s(5,"New chat"),c()(),a(6,"div",5),f(7,mt,2,0)(8,dt,2,0,"div",6),c()()),r&2&&(o(3),l("svgIcon","heroicons_outline:arrow-long-left"),o(4),u(m.contacts.length?7:8))},dependencies:[T,E,I,S],encapsulation:2,changeDetection:0});let e=t;return e})();function pt(e,t){if(e&1&&d(0,"img",10),e&2){let i=p();l("src",i.profile.avatar,w)("alt","Profile avatar")}}function ut(e,t){if(e&1&&(a(0,"div",11),s(1),c()),e&2){let i=p();o(),h(" ",i.profile.name.charAt(0)," ")}}var tt=(()=>{let t=class t{constructor(n){this._chatService=n,this._unsubscribeAll=new D}ngOnInit(){this._chatService.profile$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.profile=n})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}};t.\u0275fac=function(r){return new(r||t)(M(C))},t.\u0275cmp=x({type:t,selectors:[["chat-profile"]],inputs:{drawer:"drawer"},standalone:!0,features:[g],decls:35,vars:11,consts:[[1,"bg-card","flex","flex-auto","flex-col","overflow-y-auto","dark:bg-default"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-6","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-2xl","font-semibold"],[1,"px-6"],[1,"group","relative","mx-auto","mt-8","flex","h-40","w-40","flex-0","rounded-full"],[1,"absolute","inset-0","hidden","cursor-pointer","flex-col","items-center","justify-center","rounded-full","bg-gray-800","bg-opacity-80","backdrop-blur","backdrop-filter","group-hover:flex"],[1,"text-white",3,"svgIcon"],[1,"mx-6","mt-2","text-center","font-medium","text-white"],[1,"h-full","w-full","rounded-full","object-cover",3,"src","alt"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-8xl","font-semibold","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"mx-2","mt-8","flex","flex-col"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"ngModel"],[1,"mt-4","flex","items-center","justify-end"],["mat-button","",3,"click"],["mat-flat-button","",1,"ml-2",3,"color"]],template:function(r,m){r&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),v("click",function(){return m.drawer.close()}),d(3,"mat-icon",3),c(),a(4,"div",4),s(5,"Profile"),c()(),a(6,"div",5)(7,"div",6)(8,"div",7),d(9,"mat-icon",8),a(10,"div",9),s(11," Change Profile Photo "),c()(),f(12,pt,1,2,"img",10)(13,ut,2,1,"div",11),c(),a(14,"div",12)(15,"mat-form-field")(16,"mat-label"),s(17,"Name"),c(),d(18,"mat-icon",13)(19,"input",14),c(),a(20,"mat-form-field")(21,"mat-label"),s(22,"Email"),c(),d(23,"mat-icon",13)(24,"input",14),c(),a(25,"mat-form-field")(26,"mat-label"),s(27,"About"),c(),d(28,"mat-icon",13)(29,"input",14),c(),a(30,"div",15)(31,"button",16),v("click",function(){return m.drawer.close()}),s(32,"Cancel"),c(),a(33,"button",17),s(34," Save "),c()()()()()),r&2&&(o(3),l("svgIcon","heroicons_outline:arrow-long-left"),o(6),l("svgIcon","heroicons_outline:camera"),o(3),u(m.profile.avatar?12:-1),o(),u(m.profile.avatar?-1:13),o(5),l("svgIcon","heroicons_solid:user-circle"),o(),l("ngModel",m.profile.name),o(4),l("svgIcon","heroicons_solid:envelope"),o(),l("ngModel",m.profile.email),o(4),l("svgIcon","heroicons_solid:identification"),o(),l("ngModel",m.profile.about),o(4),l("color","primary"))},dependencies:[T,He,E,I,S,H,R,Re,re,U,L,Je,Ze,Ge,qe],encapsulation:2,changeDetection:0});let e=t;return e})();var _t=(e,t)=>({"dark:hover:bg-hover hover:bg-gray-100":e,"bg-primary-50 dark:bg-hover":t}),vt=e=>[e],xt=(e,t)=>({"absolute inset-0 z-20 flex lg:static lg:inset-auto":e,"hidden lg:flex":t});function gt(e,t){if(e&1&&d(0,"chat-new-chat",6),e&2){p();let i=F(3);l("drawer",i)}}function Ct(e,t){if(e&1&&d(0,"chat-profile",6),e&2){p();let i=F(3);l("drawer",i)}}function bt(e,t){if(e&1&&d(0,"img",15),e&2){let i=p(2);l("src",i.profile.avatar,w)}}function yt(e,t){if(e&1&&(a(0,"div",16),s(1),c()),e&2){let i=p(2);o(),h(" ",i.profile.name.charAt(0)," ")}}function wt(e,t){if(e&1&&d(0,"div",38),e&2){let i=p().$implicit,n=p(3);ge("ring-primary-50",n.selectedChat&&n.selectedChat.id===i.id)}}function Mt(e,t){if(e&1&&d(0,"img",31),e&2){let i=p().$implicit;l("src",i.contact.avatar,w)}}function St(e,t){if(e&1&&(a(0,"div",16),s(1),c()),e&2){let i=p().$implicit;o(),h(" ",i.contact.name.charAt(0)," ")}}function It(e,t){e&1&&d(0,"mat-icon",37),e&2&&l("svgIcon","heroicons_solid:speaker-x-mark")}function kt(e,t){if(e&1&&(a(0,"a",28)(1,"div",29),f(2,wt,1,2,"div",30)(3,Mt,1,1,"img",31)(4,St,2,1,"div",16),c(),a(5,"div",32)(6,"div",33),s(7),c(),a(8,"div",34),s(9),c()(),a(10,"div",35)(11,"div",36),s(12),c(),f(13,It,1,1,"mat-icon",37),c()()),e&2){let i=t.$implicit,n=p(3);l("ngClass",j(13,_t,!n.selectedChat||n.selectedChat.id!==i.id,n.selectedChat&&n.selectedChat.id===i.id))("routerLink",je(16,vt,i.id)),o(2),u(i.unreadCount>0?2:-1),o(),u(i.contact.avatar?3:-1),o(),u(i.contact.avatar?-1:4),o(3),h(" ",i.contact.name," "),o(),ge("text-primary",i.unreadCount>0)("dark:text-primary-500",i.unreadCount>0),o(),h(" ",i.lastMessage," "),o(3),h(" ",i.lastMessageAt," "),o(),u(i.muted?13:-1)}}function Et(e,t){if(e&1&&A(0,kt,14,18,"a",28,P().trackByFn,!0),e&2){let i=p(2);B(i.filteredChats)}}function Tt(e,t){e&1&&(a(0,"div",9),d(1,"mat-icon",39),a(2,"div",40),s(3," No chats "),c()()),e&2&&(o(),l("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function Ft(e,t){if(e&1){let i=Z();a(0,"div",8)(1,"div",11)(2,"div",12)(3,"div",13),v("click",function(){b(i);let r=p();return y(r.openProfile())}),a(4,"div",14),f(5,bt,1,1,"img",15)(6,yt,2,1,"div",16),c(),a(7,"div",17),s(8),c()(),a(9,"button",18),v("click",function(){b(i);let r=p();return y(r.openNewChat())}),d(10,"mat-icon",19),c(),a(11,"button",20),d(12,"mat-icon",19),a(13,"mat-menu",null,1)(15,"button",21),d(16,"mat-icon",19),s(17," New group "),c(),a(18,"button",21),d(19,"mat-icon",19),s(20," Create a room "),c(),a(21,"button",22),v("click",function(){b(i);let r=p();return y(r.openProfile())}),d(22,"mat-icon",19),s(23," Profile "),c(),a(24,"button",21),d(25,"mat-icon",19),s(26," Archived "),c(),a(27,"button",21),d(28,"mat-icon",19),s(29," Starred "),c(),a(30,"button",21),d(31,"mat-icon",19),s(32," Settings "),c()()()(),a(33,"div",23)(34,"mat-form-field",24),d(35,"mat-icon",25),a(36,"input",26,2),v("input",function(){b(i);let r=F(37),m=p();return y(m.filterChats(r.value))}),c()()()(),a(38,"div",27),f(39,Et,2,0)(40,Tt,4,1,"div",9),c()()}if(e&2){let i=F(14),n=p();o(5),u(n.profile.avatar?5:-1),o(),u(n.profile.avatar?-1:6),o(2),h(" ",n.profile.name," "),o(2),l("svgIcon","heroicons_outline:plus-circle"),o(),l("matMenuTriggerFor",i),o(),l("svgIcon","heroicons_outline:ellipsis-vertical"),o(4),l("svgIcon","heroicons_outline:user-group"),o(3),l("svgIcon","heroicons_outline:chat-bubble-left-right"),o(3),l("svgIcon","heroicons_outline:user-circle"),o(3),l("svgIcon","heroicons_outline:archive-box"),o(3),l("svgIcon","heroicons_outline:star"),o(3),l("svgIcon","heroicons_outline:cog-8-tooth"),o(3),l("subscriptSizing","dynamic"),o(),l("svgIcon","heroicons_solid:magnifying-glass"),o(),l("autocomplete","off")("placeholder","Search or start new chat"),o(3),u(n.filteredChats.length>0?39:40)}}function Dt(e,t){e&1&&(a(0,"div",9),d(1,"mat-icon",39),a(2,"div",40),s(3," No chats "),c()()),e&2&&(o(),l("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function At(e,t){if(e&1&&(a(0,"div",10),d(1,"router-outlet"),c()),e&2){let i=p();l("ngClass",j(1,xt,i.selectedChat&&i.selectedChat.id,!i.selectedChat||!i.selectedChat.id))}}var it=(()=>{let t=class t{constructor(n,r){this._chatService=n,this._changeDetectorRef=r,this.drawerOpened=!1,this._unsubscribeAll=new D}ngOnInit(){this._chatService.chats$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.chats=this.filteredChats=n,this._changeDetectorRef.markForCheck()}),this._chatService.profile$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.profile=n,this._changeDetectorRef.markForCheck()}),this._chatService.chat$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.selectedChat=n,this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete(),this._chatService.resetChat()}filterChats(n){if(!n){this.filteredChats=this.chats;return}this.filteredChats=this.chats.filter(r=>r.contact.name.toLowerCase().includes(n.toLowerCase()))}openNewChat(){this.drawerComponent="new-chat",this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}openProfile(){this.drawerComponent="profile",this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}trackByFn(n,r){return r.id||n}};t.\u0275fac=function(r){return new(r||t)(M(C),M(ie))},t.\u0275cmp=x({type:t,selectors:[["chat-chats"]],standalone:!0,features:[g],decls:10,vars:7,consts:[["drawer",""],["chatsHeaderMenu",""],["searchField",""],[1,"bg-card","relative","flex","w-full","flex-auto","dark:bg-transparent"],[1,"h-full","flex-auto",3,"hasBackdrop"],[1,"w-full","dark:bg-gray-900","sm:w-100","lg:border-r","lg:shadow-none",3,"openedChange","autoFocus","opened"],[3,"drawer"],[1,"flex","overflow-hidden"],[1,"bg-card","relative","flex","w-full","min-w-0","flex-auto","flex-col","dark:bg-transparent","lg:min-w-100","lg:max-w-100"],[1,"flex","h-full","flex-auto","flex-col","items-center","justify-center"],[1,"flex-auto","border-l",3,"ngClass"],[1,"flex","flex-0","flex-col","border-b","bg-gray-50","px-8","py-4","dark:bg-transparent"],[1,"flex","items-center"],[1,"mr-1","flex","cursor-pointer","items-center",3,"click"],[1,"h-10","w-10"],["alt","Profile avatar",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","truncate","font-medium"],["mat-icon-button","",1,"ml-auto",3,"click"],[3,"svgIcon"],["mat-icon-button","",1,"-mr-4","ml-1",3,"matMenuTriggerFor"],["mat-menu-item",""],["mat-menu-item","",3,"click"],[1,"mt-4"],[1,"angor-mat-rounded","angor-mat-dense","w-full",3,"subscriptSizing"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["matInput","",3,"input","autocomplete","placeholder"],[1,"flex-auto","overflow-y-auto"],[1,"z-20","flex","cursor-pointer","items-center","border-b","px-8","py-5",3,"ngClass","routerLink"],[1,"relative","flex","h-10","w-10","flex-0","items-center","justify-center"],[1,"ring-bg-card","absolute","bottom-0","right-0","-ml-0.5","h-2","w-2","flex-0","rounded-full","bg-primary","text-on-primary","ring-2","dark:bg-primary-500","dark:ring-gray-900",3,"ring-primary-50"],["alt","Contact avatar",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"ml-4","min-w-0"],[1,"truncate","font-medium","leading-5"],[1,"text-secondary","truncate","leading-5"],[1,"ml-auto","flex","flex-col","items-end","self-start","pl-2"],[1,"text-secondary","text-sm","leading-5"],[1,"text-hint","icon-size-5",3,"svgIcon"],[1,"ring-bg-card","absolute","bottom-0","right-0","-ml-0.5","h-2","w-2","flex-0","rounded-full","bg-primary","text-on-primary","ring-2","dark:bg-primary-500","dark:ring-gray-900"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"]],template:function(r,m){if(r&1){let _=Z();a(0,"div",3)(1,"mat-drawer-container",4)(2,"mat-drawer",5,0),te("openedChange",function(Q){return b(_),ee(m.drawerOpened,Q)||(m.drawerOpened=Q),y(Q)}),f(4,gt,1,1,"chat-new-chat",6)(5,Ct,1,1,"chat-profile",6),c(),a(6,"mat-drawer-content",7),f(7,Ft,41,17,"div",8)(8,Dt,4,1,"div",9)(9,At,2,4,"div",10),c()()()}r&2&&(o(),l("hasBackdrop",!1),o(),l("autoFocus",!1),Y("opened",m.drawerOpened),o(2),u(m.drawerComponent==="new-chat"?4:-1),o(),u(m.drawerComponent==="profile"?5:-1),o(2),u(m.chats&&m.chats.length>0?7:8),o(2),u(m.chats&&m.chats.length>0?9:-1))},dependencies:[fe,pe,ue,de,Xe,tt,T,E,I,S,me,le,ce,se,H,R,re,U,L,ne,ae,oe],encapsulation:2,changeDetection:0});let e=t;return e})();function Bt(e,t){if(e&1&&d(0,"img",8),e&2){let i=p();l("src",i.chat.contact.avatar,w)("alt","Contact avatar")}}function jt(e,t){if(e&1&&(a(0,"div",9),s(1),c()),e&2){let i=p();o(),h(" ",i.chat.contact.name.charAt(0)," ")}}function Vt(e,t){if(e&1&&d(0,"img",15),e&2){let i=t.$implicit;l("src",i,w)}}function Ot(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2,"Email"),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),h(" ",i.chat.contact.details.emails[0].email," ")}}function $t(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2," Phone number "),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),h(" ",i.chat.contact.details.phoneNumbers[0].phoneNumber," ")}}function zt(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2,"Title"),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),N(i.chat.contact.details.title)}}function Pt(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2,"Company"),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),N(i.chat.contact.details.company)}}function Nt(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2,"Birthday"),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),N(i.chat.contact.details.birthday)}}function Rt(e,t){if(e&1&&(a(0,"div")(1,"div",18),s(2,"Address"),c(),a(3,"div",19),s(4),c()()),e&2){let i=p();o(4),N(i.chat.contact.details.address)}}var nt=(()=>{let t=class t{constructor(){}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["chat-contact-info"]],inputs:{chat:"chat",drawer:"drawer"},standalone:!0,features:[g],decls:30,vars:11,consts:[[1,"bg-card","flex","h-full","flex-auto","flex-col","dark:bg-default"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-4","dark:bg-transparent"],["mat-icon-button","",3,"click"],[3,"svgIcon"],[1,"ml-2","text-lg","font-medium"],[1,"overflow-y-auto"],[1,"mt-8","flex","flex-col","items-center"],[1,"h-40","w-40","rounded-full"],[1,"h-full","w-full","rounded-full","object-cover",3,"src","alt"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-8xl","font-semibold","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"mt-4","text-lg","font-medium"],[1,"text-secondary","mt-0.5","text-md"],[1,"px-7","py-10"],[1,"text-lg","font-medium"],[1,"mt-4","grid","grid-cols-4","gap-1"],[1,"h-20","rounded","object-cover",3,"src"],[1,"mt-10","space-y-4"],[1,"mb-3","text-lg","font-medium"],[1,"text-secondary","font-medium"],[1,""]],template:function(r,m){r&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),v("click",function(){return m.drawer.close()}),d(3,"mat-icon",3),c(),a(4,"div",4),s(5,"Contact info"),c()(),a(6,"div",5)(7,"div",6)(8,"div",7),f(9,Bt,1,2,"img",8)(10,jt,2,1,"div",9),c(),a(11,"div",10),s(12),c(),a(13,"div",11),s(14),c()(),a(15,"div",12)(16,"div",13),s(17,"Media"),c(),a(18,"div",14),A(19,Vt,1,1,"img",15,Ee),c(),a(21,"div",16)(22,"div",17),s(23,"Details"),c(),f(24,Ot,5,1,"div")(25,$t,5,1,"div")(26,zt,5,1,"div")(27,Pt,5,1,"div")(28,Nt,5,1,"div")(29,Rt,5,1,"div"),c()()()()),r&2&&(o(3),l("svgIcon","heroicons_outline:x-mark"),o(6),u(m.chat.contact.avatar?9:-1),o(),u(m.chat.contact.avatar?-1:10),o(2),N(m.chat.contact.name),o(2),h(" ",m.chat.contact.about," "),o(5),B(m.chat.contact.attachments.media),o(5),u(m.chat.contact.details.emails.length?24:-1),o(),u(m.chat.contact.details.phoneNumbers.length?25:-1),o(),u(m.chat.contact.details.title?26:-1),o(),u(m.chat.contact.details.company?27:-1),o(),u(m.chat.contact.details.birthday?28:-1),o(),u(m.chat.contact.details.address?29:-1))},dependencies:[T,E,I,S],encapsulation:2,changeDetection:0});let e=t;return e})();var Ht=["messageInput"],Lt=()=>["./"],Ut=(e,t,i,n)=>({"items-end":e,"items-start":t,"mt-0.5":i,"mt-3":n}),Wt=(e,t)=>({"bg-blue-500 text-blue-50":e,"bg-gray-500 text-gray-50":t}),Qt=(e,t)=>({"-right-1 -mr-px mb-px text-blue-500":e,"-left-1 -ml-px mb-px -scale-x-1 text-gray-500":t}),Zt=(e,t)=>({"mr-3":e,"ml-3":t});function Gt(e,t){if(e&1&&d(0,"img",15),e&2){let i=p(2);l("src",i.chat.contact.avatar,w)}}function qt(e,t){if(e&1&&(a(0,"div",16),s(1),c()),e&2){let i=p(2);o(),h(" ",i.chat.contact.name.charAt(0)," ")}}function Jt(e,t){e&1&&(d(0,"mat-icon",12),s(1," Mute notifications ")),e&2&&l("svgIcon","heroicons_outline:speaker-x-mark")}function Kt(e,t){e&1&&(d(0,"mat-icon",12),s(1," Unmute notifications ")),e&2&&l("svgIcon","heroicons_outline:speaker-wave")}function Xt(e,t){if(e&1&&(a(0,"div",31),d(1,"div",36),a(2,"div",37),s(3),G(4,"date"),c(),d(5,"div",36),c()),e&2){let i=p().$implicit;o(3),h(" ",q(4,1,i.createdAt,"longDate")," ")}}function Yt(e,t){e&1&&Te(0)}function ei(e,t){if(e&1&&(a(0,"div",33),f(1,Yt,1,0,"ng-container",38),c()),e&2){let i=p().$implicit;p(2);let n=F(4);l("ngClass",j(2,Qt,i.isMine,!i.isMine)),o(),l("ngTemplateOutlet",n)}}function ti(e,t){if(e&1&&(a(0,"div",35),s(1),G(2,"date"),c()),e&2){let i=p().$implicit;l("ngClass",j(5,Zt,i.isMine,!i.isMine)),o(),h(" ",q(2,2,i.createdAt,"HH:mm")," ")}}function ii(e,t){if(e&1&&(f(0,Xt,6,4,"div",31),G(1,"date"),G(2,"date"),a(3,"div",23)(4,"div",32),f(5,ei,2,5,"div",33),d(6,"div",34),c(),f(7,ti,3,8,"div",35),c()),e&2){let i=t.$implicit,n=t.$index,r=t.$count,m=p(2);u(n===0||q(1,6,m.chat.messages[n-1].createdAt,"d")!==q(2,9,i.createdAt,"d")?0:-1),o(3),l("ngClass",Ve(12,Ut,i.isMine,!i.isMine,n>0&&m.chat.messages[n-1].isMine===i.isMine,n>0&&m.chat.messages[n-1].isMine!==i.isMine)),o(),l("ngClass",j(17,Wt,i.isMine,!i.isMine)),o(),u(n===r-1||m.chat.messages[n+1].isMine!==i.isMine?5:-1),o(),l("innerHTML",i.value,ke),o(),u(n===0||n===r-1||m.chat.messages[n+1].isMine!==i.isMine||m.chat.messages[n+1].createdAt!==i.createdAt?7:-1)}}function ni(e,t){if(e&1){let i=Z();a(0,"mat-drawer-container",5)(1,"mat-drawer",7,1),te("openedChange",function(r){b(i);let m=p();return ee(m.drawerOpened,r)||(m.drawerOpened=r),y(r)}),d(3,"chat-contact-info",8),c(),a(4,"mat-drawer-content",9)(5,"div",10)(6,"a",11),v("click",function(){b(i);let r=p();return y(r.resetChat())}),d(7,"mat-icon",12),c(),a(8,"div",13),v("click",function(){b(i);let r=p();return y(r.openContactInfo())}),a(9,"div",14),f(10,Gt,1,1,"img",15)(11,qt,2,1,"div",16),c(),a(12,"div",17),s(13),c()(),a(14,"button",18),d(15,"mat-icon",12),a(16,"mat-menu",null,2)(18,"button",19),v("click",function(){b(i);let r=p();return y(r.openContactInfo())}),d(19,"mat-icon",12),s(20," Contact info "),c(),a(21,"button",20),d(22,"mat-icon",12),s(23," Select messages "),c(),a(24,"button",19),v("click",function(){b(i);let r=p();return y(r.toggleMuteNotifications())}),f(25,Jt,2,1)(26,Kt,2,1),c(),a(27,"button",20),d(28,"mat-icon",12),s(29," Clear messages "),c(),a(30,"button",20),d(31,"mat-icon",12),s(32," Delete chat "),c()()()(),a(33,"div",21)(34,"div",22),A(35,ii,8,20,"div",23,P().trackByFn,!0),c()(),a(37,"div",24)(38,"div",25)(39,"button",26),d(40,"mat-icon",12),c(),a(41,"button",27),d(42,"mat-icon",12),c()(),a(43,"mat-form-field",28),d(44,"textarea",29,3),c(),a(46,"div",30)(47,"button",26),d(48,"mat-icon",12),c()()()()()}if(e&2){let i=F(2),n=F(17),r=p();l("hasBackdrop",!1),o(),l("autoFocus",!1)("mode",r.drawerMode)("position","end"),Y("opened",r.drawerOpened),o(2),l("drawer",i)("chat",r.chat),o(3),l("routerLink",Be(23,Lt)),o(),l("svgIcon","heroicons_outline:arrow-long-left"),o(3),u(r.chat.contact.avatar?10:-1),o(),u(r.chat.contact.avatar?-1:11),o(2),h(" ",r.chat.contact.name," "),o(),l("matMenuTriggerFor",n),o(),l("svgIcon","heroicons_outline:ellipsis-vertical"),o(4),l("svgIcon","heroicons_outline:user-circle"),o(3),l("svgIcon","heroicons_outline:check-circle"),o(3),u(r.chat.muted?-1:25),o(),u(r.chat.muted?26:-1),o(2),l("svgIcon","heroicons_outline:backspace"),o(3),l("svgIcon","heroicons_outline:trash"),o(4),B(r.chat.messages),o(5),l("svgIcon","heroicons_outline:face-smile"),o(2),l("svgIcon","heroicons_outline:paper-clip"),o(6),l("svgIcon","heroicons_outline:paper-airplane")}}function oi(e,t){e&1&&(a(0,"div",6),d(1,"mat-icon",39),a(2,"div",40),s(3," Select a conversation or start a new chat "),c()()),e&2&&(o(),l("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))}function ai(e,t){e&1&&(Se(),a(0,"svg",41)(1,"g",42),d(2,"path",43),c()())}var ot=(()=>{let t=class t{constructor(n,r,m,_){this._changeDetectorRef=n,this._chatService=r,this._angorMediaWatcherService=m,this._ngZone=_,this.drawerMode="side",this.drawerOpened=!1,this._unsubscribeAll=new D}_resizeMessageInput(){this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this.messageInput.nativeElement.style.height="auto",this._changeDetectorRef.detectChanges(),this.messageInput.nativeElement.style.height=`${this.messageInput.nativeElement.scrollHeight}px`,this._changeDetectorRef.detectChanges()})})}ngOnInit(){this._chatService.chat$.pipe(k(this._unsubscribeAll)).subscribe(n=>{this.chat=n,this._changeDetectorRef.markForCheck()}),this._angorMediaWatcherService.onMediaChange$.pipe(k(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{n.includes("lg")?this.drawerMode="side":this.drawerMode="over",this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}openContactInfo(){this.drawerOpened=!0,this._changeDetectorRef.markForCheck()}resetChat(){this._chatService.resetChat(),this.drawerOpened=!1,this._changeDetectorRef.markForCheck()}toggleMuteNotifications(){this.chat.muted=!this.chat.muted,this._chatService.updateChat(this.chat.id,this.chat).subscribe()}trackByFn(n,r){return r.id||n}};t.\u0275fac=function(r){return new(r||t)(M(ie),M(C),M(Ue),M(Ie))},t.\u0275cmp=x({type:t,selectors:[["chat-conversation"]],viewQuery:function(r,m){if(r&1&&Fe(Ht,5),r&2){let _;De(_=Ae())&&(m.messageInput=_.first)}},hostBindings:function(r,m){r&1&&v("input",function(){return m._resizeMessageInput()})("ngModelChange",function(){return m._resizeMessageInput()})},standalone:!0,features:[g],decls:5,vars:1,consts:[["speechBubbleExtension",""],["drawer",""],["conversationHeaderMenu",""],["messageInput",""],[1,"bg-card","flex","flex-auto","flex-col","overflow-y-auto","dark:bg-default","lg:overflow-hidden"],[1,"h-full","flex-auto",3,"hasBackdrop"],[1,"flex","flex-auto","flex-col","items-center","justify-center","bg-gray-100","dark:bg-transparent"],[1,"w-full","dark:bg-gray-900","sm:w-100","lg:border-l","lg:shadow-none",3,"openedChange","autoFocus","mode","position","opened"],[3,"drawer","chat"],[1,"flex","flex-col","overflow-hidden"],[1,"flex","h-18","flex-0","items-center","border-b","bg-gray-50","px-4","dark:bg-transparent","md:px-6"],["mat-icon-button","",1,"md:-ml-2","lg:hidden",3,"click","routerLink"],[3,"svgIcon"],[1,"ml-2","mr-2","flex","cursor-pointer","items-center","lg:ml-0",3,"click"],[1,"relative","flex","h-10","w-10","flex-0","items-center","justify-center"],["alt","Contact avatar",1,"h-full","w-full","rounded-full","object-cover",3,"src"],[1,"flex","h-full","w-full","items-center","justify-center","rounded-full","bg-gray-200","text-lg","uppercase","text-gray-600","dark:bg-gray-700","dark:text-gray-200"],[1,"ml-4","truncate","text-lg","font-medium","leading-5"],["mat-icon-button","",1,"ml-auto",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click"],["mat-menu-item",""],[1,"flex","flex-col-reverse","overflow-y-auto"],[1,"bg-card","flex","flex-auto","shrink","flex-col","p-6","dark:bg-transparent"],[1,"flex","flex-col",3,"ngClass"],[1,"flex","items-end","border-t","bg-gray-50","p-4","dark:bg-transparent"],[1,"my-px","flex","h-11","items-center"],["mat-icon-button",""],["mat-icon-button","",1,"ml-0.5"],["subscriptSizing","dynamic",1,"angor-mat-dense","angor-mat-rounded","angor-mat-bold","ml-4","w-full"],["matInput","","cdkTextareaAutosize",""],[1,"my-px","ml-4","flex","h-11","items-center"],[1,"-mx-6","my-3","flex","items-center","justify-center"],[1,"relative","max-w-3/4","rounded-lg","px-3","py-2",3,"ngClass"],[1,"absolute","bottom-0","w-3",3,"ngClass"],[1,"min-w-4","leading-5",3,"innerHTML"],[1,"text-secondary","my-0.5","text-sm","font-medium",3,"ngClass"],[1,"flex-auto","border-b"],[1,"text-secondary","mx-4","flex-0","text-sm","font-medium","leading-5"],[4,"ngTemplateOutlet"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"],["width","100%","height","100%","viewBox","0 0 66 66","xmlns","http://www.w3.org/2000/svg"],["id","Page-1","stroke","none","stroke-width","1","fill","none","fill-rule","evenodd"],["d","M1.01522827,0.516204834 C-8.83532715,54.3062744 61.7609863,70.5215302 64.8009949,64.3061218 C68.8074951,54.8859711 30.1663208,52.9997559 37.5036011,0.516204834 L1.01522827,0.516204834 Z","fill","currentColor","fill-rule","nonzero"]],template:function(r,m){r&1&&(a(0,"div",4),f(1,ni,49,24,"mat-drawer-container",5)(2,oi,4,1,"div",6)(3,ai,3,0,"ng-template",null,0,Oe),c()),r&2&&(o(),u(m.chat?1:2))},dependencies:[fe,pe,ue,de,nt,T,Le,E,ae,I,S,me,le,ce,se,ne,$e,H,R,U,L,We,Qe,ze],encapsulation:2,changeDetection:0});let e=t;return e})();var at=(()=>{let t=class t{constructor(){}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["chat-empty-conversation"]],standalone:!0,features:[g],decls:5,vars:1,consts:[[1,"bg-card","flex","flex-auto","flex-col","overflow-y-auto","dark:bg-default","lg:overflow-hidden"],[1,"flex","flex-auto","flex-col","items-center","justify-center","bg-gray-100","dark:bg-transparent"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"]],template:function(r,m){r&1&&(a(0,"div",0)(1,"div",1),d(2,"mat-icon",2),a(3,"div",3),s(4," Select a conversation or start a new chat "),c()()()),r&2&&(o(2),l("svgIcon","heroicons_outline:chat-bubble-oval-left-ellipsis"))},dependencies:[I,S],encapsulation:2,changeDetection:0});let e=t;return e})();var ri=(e,t)=>{let i=z(C),n=z(Ne);return i.getChatById(e.paramMap.get("id")).pipe(ye(r=>{console.error(r);let m=t.url.split("/").slice(0,-1).join("/");return n.navigateByUrl(m),K(r)}))},sn=[{path:"",component:Ke,resolve:{chats:()=>z(C).getChats(),contacts:()=>z(C).getContacts(),profile:()=>z(C).getProfile()},children:[{path:"",component:it,children:[{path:"",pathMatch:"full",component:at},{path:":id",component:ot,resolve:{conversation:ri}}]}]}];export{sn as default};
