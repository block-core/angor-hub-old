"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[218],{2218:(ut,f,i)=>{i.r(f),i.d(f,{default:()=>dt});var d=i(467),c=i(177),G=i(1413),E=i(6977),j=i(9345),g=i(7403),u=i(8834),h=i(1997),I=i(9454),_=i(2102),x=i(9213),p=i(9115),b=i(9183),F=i(9417),y=i(5398),Y=i(7540),C=i(8703),k=i(9042),T=i(882),P=i(4823),t=i(4438),R=i(7291);let S=(()=>{class e{constructor(n,o){this._changeDetectorRef=n,this._storageService=o}ngOnInit(){this.loadUserProfile(),this.subscription=this._storageService.profile$.subscribe(n=>{n&&n.pubKey===this.pubkey&&(this.user=n.metadata,this._changeDetectorRef.detectChanges())})}loadUserProfile(){var n=this;return(0,d.A)(function*(){const o=yield n._storageService.getProfile(n.pubkey);n.user=o||{},n._changeDetectorRef.detectChanges()})()}get displayName(){return this.user?.display_name||this.user?.name||this.shortenPubkey(this.pubkey)}get displayAvatar(){return this.user?.picture||this.avatarUrl||"/images/avatars/avatar-placeholder.png"}shortenPubkey(n){return n?`${n.slice(0,8)}...${n.slice(-8)}`:""}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}static{this.\u0275fac=function(o){return new(o||e)(t.rXU(t.gRc),t.rXU(R.n))}}static{this.\u0275cmp=t.VBU({type:e,selectors:[["app-replay-profile"]],inputs:{pubkey:"pubkey",avatarUrl:"avatarUrl"},standalone:!0,features:[t.aNF],decls:5,vars:4,consts:[[1,"flex","items-center"],[1,"flex","items-center","group",3,"href"],[1,"mr-4","h-10","w-10","rounded-full","border","border-gray-300","group-hover:shadow-md","object-cover",3,"src","alt"],[1,"font-bold","text-gray-800","group-hover:text-blue-500"]],template:function(o,s){1&o&&(t.j41(0,"div",0)(1,"a",1),t.nrm(2,"img",2),t.j41(3,"span",3),t.EFF(4),t.k0s()()()),2&o&&(t.R7$(),t.Y8G("href","/profile/"+s.pubkey,t.B4B),t.R7$(),t.Y8G("src",s.displayAvatar,t.B4B)("alt",s.displayName),t.R7$(2),t.SpI(" ",s.displayName," "))},dependencies:[c.MD]})}}return e})();var $=i(5245),X=i(5645),B=i(2827),U=i(413),D=i(345);const w=e=>({"large-font":e}),N=e=>({"rotate-180":e}),V=()=>[];function z(e,r){1&e&&(t.j41(0,"div",6),t.nrm(1,"mat-progress-spinner",7),t.k0s())}function A(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44),t.nrm(2,"iframe",45),t.k0s(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("src",n.safeWord,t.f$h)}}function W(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44),t.nrm(2,"img",46),t.k0s(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("src",n.safeWord,t.B4B)}}function M(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44)(2,"video",47),t.nrm(3,"source",48),t.EFF(4," Your browser does not support the video tag. "),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(3),t.Y8G("src",n.safeWord,t.B4B)}}function O(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44)(2,"audio",49),t.nrm(3,"source",50),t.EFF(4," Your browser does not support the audio element. "),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(3),t.Y8G("src",n.safeWord,t.B4B)}}function J(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",51)(2,"a",52)(3,"span",53),t.EFF(4),t.k0s()()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("href",n.word,t.B4B),t.R7$(2),t.JRh(n.word)}}function H(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",51)(2,"span",54),t.EFF(3),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit,o=t.XpG(2);t.R7$(2),t.Y8G("ngClass",t.eq3(2,w,o.isSingleEmojiOrWord(n))),t.R7$(),t.SpI(" ",n.trim()," ")}}function K(e,r){if(1&e&&(t.j41(0,"div",43),t.DNE(1,A,3,1,"ng-container",5)(2,W,3,1,"ng-container",5)(3,M,5,1,"ng-container",5)(4,O,5,1,"ng-container",5)(5,J,5,2,"ng-container",5)(6,H,4,4,"ng-container",5),t.k0s()),2&e){const n=r.$implicit;t.R7$(),t.Y8G("ngIf","youtube"===n.token),t.R7$(),t.Y8G("ngIf","image"===n.token),t.R7$(),t.Y8G("ngIf","video"===n.token),t.R7$(),t.Y8G("ngIf","audio"===n.token),t.R7$(),t.Y8G("ngIf","link"===n.token),t.R7$(),t.Y8G("ngIf",!n.token)}}function L(e,r){1&e&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function Q(e,r){1&e&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function Z(e,r){1&e&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function q(e,r){if(1&e){const n=t.RV6();t.j41(0,"div",55)(1,"div",18)(2,"div",56),t.EFF(3),t.DNE(4,L,2,0,"span",5),t.k0s()(),t.nrm(5,"div",57),t.j41(6,"div",58)(7,"button",59),t.EFF(8),t.DNE(9,Q,2,0,"span",5),t.k0s(),t.j41(10,"button",59),t.EFF(11),t.DNE(12,Z,2,0,"span",5),t.k0s(),t.j41(13,"button",60),t.bIt("click",function(){t.eBV(n),t.XpG();const s=t.sdS(48);return t.Njj(s.expanded=!s.expanded)}),t.j41(14,"span",61),t.EFF(15),t.k0s(),t.nrm(16,"mat-icon",62),t.k0s()()()}if(2&e){t.XpG();const n=t.sdS(48),o=t.XpG();t.R7$(3),t.SpI(" ",o.zaps.length," Zap"),t.R7$(),t.Y8G("ngIf",o.zaps.length>1),t.R7$(4),t.SpI(" ",o.likes.length," Like"),t.R7$(),t.Y8G("ngIf",o.likes.length>1),t.R7$(2),t.SpI(" ",o.reposts.length," Share"),t.R7$(),t.Y8G("ngIf",o.reposts.length>1),t.R7$(3),t.SpI("",o.replies.length," Comments"),t.R7$(),t.Y8G("ngClass",t.eq3(9,N,n.expanded))("svgIcon","heroicons_mini:chevron-down")}}function tt(e,r){1&e&&(t.j41(0,"div",63),t.nrm(1,"mat-progress-spinner",64),t.k0s()),2&e&&(t.R7$(),t.Y8G("diameter",40))}function nt(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44),t.nrm(2,"iframe",45),t.k0s(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==n?null:n.safeWord,t.f$h)}}function et(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44),t.nrm(2,"img",46),t.k0s(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==n?null:n.safeWord,t.B4B)}}function ot(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44)(2,"video",47),t.nrm(3,"source",48),t.EFF(4," Your browser does not support the video tag. "),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==n?null:n.safeWord,t.B4B)}}function st(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",44)(2,"audio",49),t.nrm(3,"source",50),t.EFF(4," Your browser does not support the audio element. "),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==n?null:n.safeWord,t.B4B)}}function it(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",73)(2,"a",52)(3,"span",53),t.EFF(4),t.k0s()()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(2),t.Y8G("href",null==n?null:n.word,t.B4B),t.R7$(2),t.SpI(" ",null==n?null:n.word," ")}}function rt(e,r){if(1&e&&(t.qex(0),t.j41(1,"div",74)(2,"span",53),t.EFF(3),t.k0s()(),t.bVm()),2&e){const n=t.XpG().$implicit;t.R7$(3),t.SpI(" ",null==n?null:n.trim()," ")}}function at(e,r){if(1&e&&(t.j41(0,"div",43),t.DNE(1,nt,3,1,"ng-container",5)(2,et,3,1,"ng-container",5)(3,ot,5,1,"ng-container",5)(4,st,5,1,"ng-container",5)(5,it,5,2,"ng-container",5)(6,rt,4,1,"ng-container",5),t.k0s()),2&e){const n=r.$implicit;t.R7$(),t.Y8G("ngIf","youtube"===(null==n?null:n.token)),t.R7$(),t.Y8G("ngIf","image"===(null==n?null:n.token)),t.R7$(),t.Y8G("ngIf","video"===(null==n?null:n.token)),t.R7$(),t.Y8G("ngIf","audio"===(null==n?null:n.token)),t.R7$(),t.Y8G("ngIf","link"===(null==n?null:n.token)),t.R7$(),t.Y8G("ngIf",!(null!=n&&n.token))}}function lt(e,r){if(1&e&&(t.j41(0,"div",69),t.nrm(1,"app-replay-profile",70),t.j41(2,"div",71)(3,"span"),t.DNE(4,at,7,6,"div",21),t.k0s(),t.j41(5,"div",72)(6,"span"),t.EFF(7),t.nI1(8,"ago"),t.k0s()()()()),2&e){const n=r.$implicit,o=t.XpG(3);t.R7$(),t.Y8G("pubkey",null==n?null:n.pubkey)("avatarUrl","/images/avatars/avatar-placeholder.png"),t.R7$(3),t.Y8G("ngForOf",o.parseContent.parseContent(null==n?null:n.content)||t.lJ4(6,V)),t.R7$(3),t.JRh(t.bMT(8,4,null==n?null:n.created_at))}}function ct(e,r){if(1&e&&(t.j41(0,"div"),t.nrm(1,"hr",65),t.j41(2,"div",66)(3,"div",67),t.DNE(4,lt,9,7,"div",68),t.k0s()()()),2&e){const n=t.XpG(2);t.R7$(4),t.Y8G("ngForOf",n.replies)}}function mt(e,r){if(1&e){const n=t.RV6();t.j41(0,"div")(1,"div",8)(2,"angor-card",9)(3,"div",10),t.nrm(4,"img",11),t.j41(5,"div",12)(6,"span",13),t.EFF(7),t.k0s(),t.j41(8,"span",14),t.EFF(9),t.nI1(10,"ago"),t.k0s()(),t.j41(11,"button",15),t.nrm(12,"mat-icon",16),t.k0s(),t.j41(13,"mat-menu",null,0)(15,"button",17)(16,"span",18),t.nrm(17,"mat-icon",19),t.j41(18,"span"),t.EFF(19,"Save post"),t.k0s()()(),t.j41(20,"button",17)(21,"span",18),t.nrm(22,"mat-icon",19),t.j41(23,"span"),t.EFF(24,"Hide post"),t.k0s()()(),t.j41(25,"button",17)(26,"span",18),t.nrm(27,"mat-icon",19),t.j41(28,"span"),t.EFF(29,"Snooze for 30 days"),t.k0s()()(),t.j41(30,"button",17)(31,"span",18),t.nrm(32,"mat-icon",19),t.j41(33,"span"),t.EFF(34,"Hide all"),t.k0s()()(),t.nrm(35,"mat-divider",20),t.j41(36,"button",17)(37,"span",18),t.nrm(38,"mat-icon",19),t.j41(39,"span"),t.EFF(40,"Report post"),t.k0s()()(),t.j41(41,"button",17)(42,"span",18),t.nrm(43,"mat-icon",19),t.j41(44,"span"),t.EFF(45,"Turn on notifications for this post"),t.k0s()()()()(),t.DNE(46,K,7,6,"div",21),t.k0s(),t.j41(47,"angor-card",22,1)(49,"div",23)(50,"button",24),t.nrm(51,"mat-icon",25),t.j41(52,"span",26),t.EFF(53,"Unlike"),t.k0s()(),t.j41(54,"button",27),t.bIt("click",function(){t.eBV(n);const s=t.sdS(48);return t.Njj(s.expanded=!s.expanded)}),t.nrm(55,"mat-icon",28),t.j41(56,"span",26),t.EFF(57,"Comment"),t.k0s()(),t.j41(58,"button",24),t.nrm(59,"mat-icon",29),t.j41(60,"span",26),t.EFF(61,"Share"),t.k0s()(),t.j41(62,"button",24),t.nrm(63,"mat-icon",30),t.j41(64,"span",26),t.EFF(65,"Zap"),t.k0s()()(),t.nrm(66,"hr",31),t.DNE(67,q,17,11,"div",32)(68,tt,2,1,"div",33),t.qex(69,34),t.nrm(70,"hr",35),t.j41(71,"div",36)(72,"div",37),t.nrm(73,"img",38),t.j41(74,"mat-form-field",39),t.nrm(75,"textarea",40),t.k0s()(),t.j41(76,"div",41)(77,"button",42),t.nrm(78,"mat-icon",16),t.k0s(),t.j41(79,"button",42),t.nrm(80,"mat-icon",16),t.k0s(),t.j41(81,"button",42),t.nrm(82,"mat-icon",16),t.k0s()()(),t.DNE(83,ct,5,1,"div",5),t.bVm(),t.k0s()()()}if(2&e){const n=t.sdS(14),o=t.XpG();t.R7$(4),t.FS9("alt",(null==o.user?null:o.user.display_name)||(null==o.user?null:o.user.name)||""),t.Y8G("src",null==o.user?null:o.user.picture,t.B4B),t.R7$(3),t.JRh((null==o.user?null:o.user.display_name)||(null==o.user?null:o.user.name)||""),t.R7$(2),t.JRh(t.bMT(10,26,o.post.created_at)),t.R7$(2),t.Y8G("matMenuTriggerFor",n),t.R7$(),t.Y8G("svgIcon","heroicons_solid:ellipsis-vertical"),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:arrow-up-tray"),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:eye-slash"),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:clock"),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:minus-circle"),t.R7$(6),t.Y8G("svgIcon","heroicons_solid:exclamation-triangle"),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:bell"),t.R7$(3),t.Y8G("ngForOf",o.parseContent.parseContent(o.post.content)),t.R7$(5),t.Y8G("svgIcon","heroicons_solid:heart"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:chat-bubble-left-ellipsis"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:share"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:bolt"),t.R7$(4),t.Y8G("ngIf",!o.loadingReactions),t.R7$(),t.Y8G("ngIf",o.loadingReactions),t.R7$(6),t.Y8G("subscriptSizing","dynamic"),t.R7$(),t.Y8G("placeholder","Write a comment...")("rows",3),t.R7$(3),t.Y8G("svgIcon","heroicons_solid:sparkles"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:face-smile"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:photo"),t.R7$(),t.Y8G("ngIf",o.replies.length>0)}}const dt=[{path:"",component:(()=>{class e{constructor(n,o,s,l,m,a,v,pt){this._route=n,this._router=o,this._storageService=s,this.subscriptionService=l,this.metadataQueueService=m,this._changeDetectorRef=a,this.parseContent=v,this._sanitizer=pt,this.postId=null,this.post=null,this.user=null,this.loading=!0,this.loadingReactions=!0,this._unsubscribeAll=new G.B,this.likes=[],this.reposts=[],this.zaps=[],this.replies=[]}ngOnInit(){this._route.paramMap.pipe((0,E.Q)(this._unsubscribeAll)).subscribe(n=>{this.postId=n.get("id"),this.postId&&(this.loadPost(this.postId),this.subscribeToReactions(this.postId))})}loadUserProfile(){var n=this;return(0,d.A)(function*(){n._storageService.getProfile(n.post.pubkey).then(o=>{n.user=o,console.log(n.user),n._changeDetectorRef.detectChanges()})})()}loadPost(n){var o=this;return(0,d.A)(function*(){try{o.loading=!0,o.post=yield o._storageService.getPostById(n),o.loadUserProfile(),o._storageService.profile$.subscribe(s=>{s&&s.pubKey===o.post.pubkey&&(o.user=s.metadata,o._changeDetectorRef.detectChanges())}),o.loading=!1}catch(s){console.error("Error loading post:",s),o._router.navigate(["/404"])}})()}getSafeUrl(n){return this._sanitizer.bypassSecurityTrustUrl(n)}subscribeToReactions(n){var o=this;let s;this.loadingReactions=!0,s=setTimeout(()=>{this.loadingReactions=!1},3e3),this.subscriptionId=this.subscriptionService.addSubscriptions([{"#e":[n],kinds:[1,7,9735,6]}],function(){var m=(0,d.A)(function*(a){o.loadingReactions&&(o.loadingReactions=!1,clearTimeout(s)),o.addReaction(n,a.kind,{pubkey:a.pubkey,created_at:a.created_at,content:1===a.kind?a.content:void 0})});return function(a){return m.apply(this,arguments)}}())}addReaction(n,o,s){switch(o){case 1:this.replies.push(s),this.replies.sort((l,m)=>m.created_at-l.created_at);break;case 7:this.likes.push(s);break;case 9735:this.zaps.push(s);break;case 6:this.reposts.push(s)}this._changeDetectorRef.detectChanges()}isSingleEmojiOrWord(n){const o=n.trim(),s=/^\w+$/.test(o),l=/^[\p{Emoji}]+$/u.test(o);return s||l}ngOnDestroy(){this.subscriptionId&&this.subscriptionService.removeSubscriptionById(this.subscriptionId),this._unsubscribeAll.next(),this._unsubscribeAll.complete()}static{this.\u0275fac=function(o){return new(o||e)(t.rXU($.nX),t.rXU($.Ix),t.rXU(R.n),t.rXU(X.n),t.rXU(B.T),t.rXU(t.gRc),t.rXU(U.m),t.rXU(D.up))}}static{this.\u0275cmp=t.VBU({type:e,selectors:[["app-post-event"]],standalone:!0,features:[t.aNF],decls:4,vars:2,consts:[["postCardMenu02","matMenu"],["expandableReplay","angorCard"],[1,"mx-auto","w-full","max-w-5xl","px-6","sm:px-8"],[1,"flex","min-w-0","flex-auto","flex-col"],["class","loading-spinner",4,"ngIf"],[4,"ngIf"],[1,"loading-spinner"],["mode","indeterminate"],[1,"m-auto","flex","w-full","max-w-140","flex-col","items-start"],[1,"mt-8","flex","w-full","flex-col"],[1,"mx-6","mb-4","mt-6","flex","items-center","sm:mx-8"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"mr-4","h-10","w-10","rounded-full","object-cover",3,"src","alt"],[1,"flex","flex-col"],[1,"font-semibold","leading-none"],[1,"text-secondary","mt-1","text-sm","leading-none"],["mat-icon-button","",1,"-mr-4","ml-auto",3,"matMenuTriggerFor"],[1,"icon-size-5",3,"svgIcon"],["mat-menu-item",""],[1,"flex","items-center"],[1,"mr-3","icon-size-5",3,"svgIcon"],[1,"my-2"],["class","inline-block whitespace-pre-wrap break-words",4,"ngFor","ngForOf"],[1,"mb-8","mt-1","flex","w-full","flex-col","pt-4"],[1,"mx-3","flex","items-center","sm:mx-5"],["mat-button","",1,"mr-1","px-3"],[1,"text-red-500","icon-size-5",3,"svgIcon"],[1,"ml-2"],["mat-button","",1,"mr-1","px-3",3,"click"],[1,"text-blue-500","icon-size-5",3,"svgIcon"],[1,"text-green-500","icon-size-5",3,"svgIcon"],[1,"text-orange-500","icon-size-5",3,"svgIcon"],[1,"mx-6","mb-6","mt-4","border-b","sm:mx-8"],["class","mx-6 mb-4 flex flex-col sm:mx-8 sm:mb-6 sm:flex-row sm:items-center",4,"ngIf"],["class","flex mx-auto justify-center items-center mb-4",4,"ngIf"],["angorCardExpansion",""],[1,"m-0","border-b"],[1,"mx-4","mb-3","mt-6","flex","flex-col","sm:mx-8"],[1,"flex","items-start"],["src","/images/avatars/avatar-placeholder.png","alt","Card cover image",1,"mr-5","h-12","w-12","rounded-full"],[1,"w-full",3,"subscriptSizing"],["matInput","","cdkTextareaAutosize","",3,"placeholder","rows"],[1,"-mr-3","ml-auto","mt-3","flex","items-center"],["mat-icon-button",""],[1,"inline-block","whitespace-pre-wrap","break-words"],[1,"relative","mb-4","block"],["width","560","height","315","frameborder","0","allowfullscreen","",3,"src"],["alt","Embedded Image",1,"max-h-140","object-cover",2,"width","100%",3,"src"],["controls","",2,"width","100%"],["type","video/mp4",3,"src"],["controls",""],["type","audio/mpeg",3,"src"],[1,"mx-6","mb-6","mt-2","sm:mx-8"],["target","_blank",1,"inline-block","break-words","break-all","text-blue-500","underline",3,"href"],[1,"inline-block","break-words","break-all"],[1,"inline-block","break-words","break-all",3,"ngClass"],[1,"mx-6","mb-4","flex","flex-col","sm:mx-8","sm:mb-6","sm:flex-row","sm:items-center"],[1,"ml-3","text-md","tracking-tight"],[1,"hidden","flex-auto","sm:flex"],[1,"mt-4","flex","items-center","justify-end","sm:mt-0"],["mat-button","",1,"-ml-2","mr-1","px-3","sm:ml-0"],["mat-button","",1,"px-3","sm:-mr-4",3,"click"],[1,"mr-1"],[1,"rotate-0","transition-transform","duration-150","ease-in-out","icon-size-5",3,"ngClass","svgIcon"],[1,"flex","mx-auto","justify-center","items-center","mb-4"],["mode","indeterminate",3,"diameter"],[1,"mx-4","my-0","border-b","sm:mx-8"],[1,"max-h-120","overflow-y-auto"],[1,"relative","mx-4","my-6","flex","flex-col","sm:mx-8"],["class","mb-6 flex flex-col items-start",4,"ngFor","ngForOf"],[1,"mb-6","flex","flex-col","items-start"],[3,"pubkey","avatarUrl"],[1,"mt-0.5","flex","flex-col"],[1,"text-secondary","mt-2","flex","items-center","text-sm"],[1,"mx-6","mb-6","mt-2","sm:mx-1"],[1,"mt-2","sm:mx-1"]],template:function(o,s){1&o&&(t.j41(0,"div",2)(1,"div",3),t.DNE(2,z,2,0,"div",4)(3,mt,84,28,"div",5),t.k0s()()),2&o&&(t.R7$(2),t.Y8G("ngIf",s.loading),t.R7$(),t.Y8G("ngIf",!s.loading&&s.post))},dependencies:[j.n,x.m_,x.An,u.Hl,u.$z,u.iY,p.Cn,p.kk,p.fb,p.Cp,_.RG,_.rl,k.fS,k.fg,g.xb,g.EE,h.w,h.q,P.uc,c.MD,c.YU,c.Sq,c.bT,F.YN,y.f,b.D6,b.LG,Y.e,I.MY,T.vg,C.g,S]})}}return e})()}]}}]);