"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[218],{2218:(ut,v,o)=>{o.r(v),o.d(v,{default:()=>ct});var d=o(467),c=o(177),R=o(1413),j=o(8359),E=o(6977),I=o(9345),f=o(7403),p=o(8834),y=o(1997),$=o(9454),h=o(2102),g=o(9213),C=o(9115),_=o(9183),G=o(9417),S=o(5398),F=o(7540),Y=o(8703),b=o(9042),P=o(882),T=o(4823),t=o(4438),x=o(7291);let X=(()=>{class n{constructor(e,i){this._changeDetectorRef=e,this._storageService=i}ngOnInit(){this.loadUserProfile(),this.subscription=this._storageService.profile$.subscribe(e=>{e&&e.pubKey===this.pubkey&&(this.user=e.metadata,this._changeDetectorRef.detectChanges())})}loadUserProfile(){var e=this;return(0,d.A)(function*(){const i=yield e._storageService.getProfile(e.pubkey);e.user=i||{},e._changeDetectorRef.detectChanges()})()}get displayName(){return this.user?.display_name||this.user?.name||this.shortenPubkey(this.pubkey)}get displayAvatar(){return this.user?.picture||this.avatarUrl||"/images/avatars/avatar-placeholder.png"}shortenPubkey(e){return e?`${e.slice(0,8)}...${e.slice(-8)}`:""}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}static{this.\u0275fac=function(i){return new(i||n)(t.rXU(t.gRc),t.rXU(x.n))}}static{this.\u0275cmp=t.VBU({type:n,selectors:[["app-replay-profile"]],inputs:{pubkey:"pubkey",avatarUrl:"avatarUrl"},standalone:!0,features:[t.aNF],decls:5,vars:4,consts:[[1,"flex","items-center"],[1,"flex","items-center","group",3,"href"],[1,"mr-4","h-10","w-10","rounded-full","border","border-gray-300","group-hover:shadow-md","object-cover",3,"src","alt"],[1,"font-bold","text-gray-800","group-hover:text-blue-500"]],template:function(i,s){1&i&&(t.j41(0,"div",0)(1,"a",1),t.nrm(2,"img",2),t.j41(3,"span",3),t.EFF(4),t.k0s()()()),2&i&&(t.R7$(),t.Y8G("href","/profile/"+s.pubkey,t.B4B),t.R7$(),t.Y8G("src",s.displayAvatar,t.B4B)("alt",s.displayName),t.R7$(2),t.SpI(" ",s.displayName," "))},dependencies:[c.MD]})}}return n})();var D=o(4496),k=o(5245),U=o(5645),B=o(413),N=o(345),z=o(2022),V=o(9979),L=o(3105);const w=n=>({"heart-beat":n}),A=n=>({"rotate-180":n}),O=()=>[];function M(n,r){1&n&&(t.j41(0,"div",5),t.nrm(1,"mat-progress-spinner",6),t.k0s())}function W(n,r){1&n&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function Z(n,r){1&n&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function J(n,r){1&n&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function K(n,r){if(1&n){const e=t.RV6();t.j41(0,"div",35)(1,"div",27)(2,"div",36),t.EFF(3),t.DNE(4,W,2,0,"span",4),t.k0s()(),t.nrm(5,"div",37),t.j41(6,"div",38)(7,"button",39),t.EFF(8),t.DNE(9,Z,2,0,"span",4),t.k0s(),t.j41(10,"button",39),t.EFF(11),t.DNE(12,J,2,0,"span",4),t.k0s(),t.j41(13,"button",40),t.bIt("click",function(){t.eBV(e),t.XpG();const s=t.sdS(4);return t.Njj(s.expanded=!s.expanded)}),t.j41(14,"span",41),t.EFF(15),t.k0s(),t.nrm(16,"mat-icon",42),t.k0s()()()}if(2&n){t.XpG();const e=t.sdS(4),i=t.XpG();t.R7$(3),t.SpI(" ",i.zaps.length," Zap"),t.R7$(),t.Y8G("ngIf",i.zaps.length>1),t.R7$(4),t.SpI(" ",i.likes.length," Like"),t.R7$(),t.Y8G("ngIf",i.likes.length>1),t.R7$(2),t.SpI(" ",i.reposts.length," Share"),t.R7$(),t.Y8G("ngIf",i.reposts.length>1),t.R7$(3),t.SpI("",i.replies.length," Comments"),t.R7$(),t.Y8G("ngClass",t.eq3(9,A,e.expanded))("svgIcon","heroicons_mini:chevron-down")}}function H(n,r){1&n&&(t.j41(0,"div",43),t.nrm(1,"mat-progress-spinner",44),t.k0s()),2&n&&(t.R7$(),t.Y8G("diameter",40))}function Q(n,r){if(1&n){const e=t.RV6();t.j41(0,"div",45)(1,"emoji-mart",46),t.bIt("emojiClick",function(){t.eBV(e);const s=t.XpG(2);return t.Njj(s.addEmoji())}),t.k0s()()}if(2&n){const e=t.XpG(2);t.R7$(),t.Y8G("darkMode",e.darkMode)}}function q(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",57),t.nrm(2,"iframe",58),t.k0s(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==e?null:e.safeWord,t.f$h)}}function tt(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",57),t.nrm(2,"img",59),t.k0s(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function et(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",57)(2,"video",60),t.nrm(3,"source",61),t.EFF(4," Your browser does not support the video tag. "),t.k0s()(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function nt(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",57)(2,"audio",62),t.nrm(3,"source",63),t.EFF(4," Your browser does not support the audio element. "),t.k0s()(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function it(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",64)(2,"a",65)(3,"span",66),t.EFF(4),t.k0s()()(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("href",null==e?null:e.word,t.B4B),t.R7$(2),t.SpI(" ",null==e?null:e.word," ")}}function st(n,r){if(1&n&&(t.qex(0),t.j41(1,"div",67)(2,"span",66),t.EFF(3),t.k0s()(),t.bVm()),2&n){const e=t.XpG().$implicit;t.R7$(3),t.SpI(" ",null==e?null:e.trim()," ")}}function ot(n,r){if(1&n&&(t.j41(0,"div",56),t.DNE(1,q,3,1,"ng-container",4)(2,tt,3,1,"ng-container",4)(3,et,5,1,"ng-container",4)(4,nt,5,1,"ng-container",4)(5,it,5,2,"ng-container",4)(6,st,4,1,"ng-container",4),t.k0s()),2&n){const e=r.$implicit;t.R7$(),t.Y8G("ngIf","youtube"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","image"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","video"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","audio"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","link"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf",!(null!=e&&e.token))}}function rt(n,r){if(1&n&&(t.j41(0,"div",51),t.nrm(1,"app-replay-profile",52),t.j41(2,"div",53)(3,"span"),t.DNE(4,ot,7,6,"div",54),t.k0s(),t.j41(5,"div",55)(6,"span"),t.EFF(7),t.nI1(8,"ago"),t.k0s()()()()),2&n){const e=r.$implicit,i=t.XpG(3);t.R7$(),t.Y8G("pubkey",null==e?null:e.pubkey)("avatarUrl","/images/avatars/avatar-placeholder.png"),t.R7$(3),t.Y8G("ngForOf",i._parseContent.parseContent(null==e?null:e.content)||t.lJ4(6,O)),t.R7$(3),t.JRh(t.bMT(8,4,null==e?null:e.created_at))}}function at(n,r){if(1&n&&(t.j41(0,"div"),t.nrm(1,"hr",47),t.j41(2,"div",48)(3,"div",49),t.DNE(4,rt,9,7,"div",50),t.k0s()()()),2&n){const e=t.XpG(2);t.R7$(4),t.Y8G("ngForOf",e.replies)}}function lt(n,r){if(1&n){const e=t.RV6();t.j41(0,"div")(1,"div",7),t.nrm(2,"app-post",8),t.j41(3,"angor-card",9,0)(5,"div",10)(6,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.toggleLike(s.post))}),t.nrm(7,"mat-icon",12),t.j41(8,"span",13),t.EFF(9),t.k0s()(),t.j41(10,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.sdS(4);return t.Njj(s.expanded=!s.expanded)}),t.nrm(11,"mat-icon",14),t.j41(12,"span",13),t.EFF(13,"Comment"),t.k0s()(),t.j41(14,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.onShare(s.post))}),t.nrm(15,"mat-icon",15),t.j41(16,"span",13),t.EFF(17,"Share"),t.k0s()(),t.j41(18,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.openZapDialog())}),t.nrm(19,"mat-icon",16),t.j41(20,"span",13),t.EFF(21,"Zap"),t.k0s()()(),t.nrm(22,"hr",17),t.DNE(23,K,17,11,"div",18)(24,H,2,1,"div",19),t.qex(25,20),t.nrm(26,"hr",21),t.j41(27,"div",22)(28,"div",23)(29,"mat-form-field",24),t.nrm(30,"textarea",25),t.k0s()(),t.j41(31,"div",26)(32,"div",27)(33,"button",28),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.toggleEmojiPicker())}),t.nrm(34,"mat-icon",29),t.k0s(),t.DNE(35,Q,2,1,"div",30),t.j41(36,"button",31),t.nrm(37,"mat-icon",29),t.k0s(),t.j41(38,"button",31),t.nrm(39,"mat-icon",29),t.k0s()(),t.j41(40,"button",32),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.sendComment())}),t.nrm(41,"mat-icon",33),t.j41(42,"span",34),t.EFF(43,"Send"),t.k0s()()()(),t.DNE(44,at,5,1,"div",4),t.bVm(),t.k0s()()()}if(2&n){const e=t.XpG();t.R7$(2),t.Y8G("item",e.post)("more",!1)("actions",!1),t.R7$(5),t.Y8G("ngClass",t.eq3(20,w,e.isLiked))("svgIcon",e.isLiked?"heroicons_solid:heart":"heroicons_outline:heart"),t.R7$(2),t.SpI("",e.isLiked?"Liked":"Like"," "),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:chat-bubble-left-ellipsis"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:share"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:bolt"),t.R7$(4),t.Y8G("ngIf",!e.loadingReactions),t.R7$(),t.Y8G("ngIf",e.loadingReactions),t.R7$(5),t.Y8G("subscriptSizing","dynamic"),t.R7$(),t.Y8G("placeholder","Write a comment...")("rows",3),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:face-smile"),t.R7$(),t.Y8G("ngIf",e.showEmojiPicker),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:photo"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:sparkles"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:paper-airplane"),t.R7$(3),t.Y8G("ngIf",e.replies.length>0)}}const ct=[{path:"",component:(()=>{class n{constructor(e,i,s,a,m,l,u,mt,dt,pt){this._route=e,this._router=i,this._storageService=s,this._subscriptionService=a,this._changeDetectorRef=m,this._parseContent=l,this._sanitizer=u,this._eventService=mt,this._angorConfirmationService=dt,this._zapService=pt,this.postId=null,this.post=null,this.user=null,this.loading=!0,this.loadingReactions=!0,this._unsubscribeAll=new R.B,this.subscription=new j.yU,this.likes=[],this.reposts=[],this.zaps=[],this.replies=[],this.isLiked=!1}ngOnInit(){this._route.paramMap.pipe((0,E.Q)(this._unsubscribeAll)).subscribe(e=>{this.postId=e.get("id"),this.postId&&(this.loadPost(this.postId),this.subscribeToReactions(this.postId))}),this.subscription=this._storageService.myLikes$.subscribe(e=>{e&&e.includes(this.postId)?(this.isLiked=!0,this._changeDetectorRef.detectChanges()):this.isLiked=!1})}loadUserProfile(){var e=this;return(0,d.A)(function*(){e._storageService.getProfile(e.post.pubkey).then(i=>{e.user=i,e._changeDetectorRef.detectChanges()})})()}loadPost(e){var i=this;return(0,d.A)(function*(){try{i.loading=!0,i.post=yield i._storageService.getPostById(e),i.loadUserProfile(),i._storageService.profile$.subscribe(s=>{s&&s.pubKey===i.post.pubkey&&(i.user=s.metadata,i._changeDetectorRef.detectChanges())}),i.loading=!1}catch(s){console.error("Error loading post:",s),i._router.navigate(["/404"])}})()}getSafeUrl(e){return this._sanitizer.bypassSecurityTrustUrl(e)}subscribeToReactions(e){var i=this;let s;this.loadingReactions=!0,s=setTimeout(()=>{this.loadingReactions=!1},3e3),this.subscriptionId=this._subscriptionService.addSubscriptions([{"#e":[e],kinds:[1,7,9735,6]}],function(){var m=(0,d.A)(function*(l){i.loadingReactions&&(i.loadingReactions=!1,clearTimeout(s)),i.addReaction(e,l.kind,{pubkey:l.pubkey,created_at:l.created_at,content:1===l.kind?l.content:void 0})});return function(l){return m.apply(this,arguments)}}())}addReaction(e,i,s){switch(i){case 1:this.replies.push(s),this.replies.sort((a,m)=>m.created_at-a.created_at);break;case 7:this.likes.push(s);break;case 9735:this.zaps.push(s);break;case 6:this.reposts.push(s)}this._changeDetectorRef.detectChanges()}isSingleEmojiOrWord(e){const i=e.trim(),s=/^\w+$/.test(i),a=/^[\p{Emoji}]+$/u.test(i);return s||a}sendLike(e){this.isLiked||this._eventService.sendLikeEvent(e).then(()=>{this.isLiked=!0,this._changeDetectorRef.detectChanges()}).catch(i=>console.error("Failed to send like:",i))}toggleLike(e){this.sendLike(e)}onShare(e){this._angorConfirmationService.open({title:"Share",message:'Are you sure you want to share this post on your profile? <span class="font-medium">This action is permanent and cannot be undone.</span>',icon:{show:!0,name:"heroicons_solid:share",color:"primary"},actions:{confirm:{show:!0,label:"Yes, Share",color:"primary"},cancel:{show:!0,label:"Cancel"}},dismissible:!0}).afterClosed().subscribe(s=>{console.log(s),"confirmed"===s&&this._eventService.shareEvent(e).then(()=>{this._changeDetectorRef.detectChanges()}).catch(a=>console.error("Failed to share post",a))})}openZapDialog(){this._zapService.openZapDialog(this.postId,this.user)}sendComment(){}addEmoji(){}toggleEmojiPicker(){}ngOnDestroy(){this.subscriptionId&&this._subscriptionService.removeSubscriptionById(this.subscriptionId),this.subscription&&this.subscription.unsubscribe(),this._unsubscribeAll.next(),this._unsubscribeAll.complete()}static{this.\u0275fac=function(i){return new(i||n)(t.rXU(k.nX),t.rXU(k.Ix),t.rXU(x.n),t.rXU(U.n),t.rXU(t.gRc),t.rXU(B.m),t.rXU(N.up),t.rXU(z.U),t.rXU(V.m),t.rXU(L.D))}}static{this.\u0275cmp=t.VBU({type:n,selectors:[["app-post-event"]],standalone:!0,features:[t.aNF],decls:4,vars:2,consts:[["expandableReplay","angorCard"],[1,"mx-auto","w-full","max-w-5xl","px-6","sm:px-8"],[1,"flex","min-w-0","flex-auto","flex-col"],["class","fixed inset-0 flex items-center justify-center z-50",4,"ngIf"],[4,"ngIf"],[1,"fixed","inset-0","flex","items-center","justify-center","z-50"],["mode","indeterminate"],[1,"m-auto","flex","w-full","max-w-140","flex-col","items-start"],[1,"mb-1","mt-8","flex","w-full","flex-col",3,"item","more","actions"],[1,"mb-8","mt-1","flex","w-full","flex-col","pt-4"],[1,"mx-3","flex","items-center","sm:mx-5"],["mat-button","",1,"mr-1","px-3",3,"click"],[1,"text-red-500","icon-size-5",3,"ngClass","svgIcon"],[1,"ml-2"],[1,"text-blue-500","icon-size-5",3,"svgIcon"],[1,"text-green-500","icon-size-5",3,"svgIcon"],[1,"text-orange-500","icon-size-5",3,"svgIcon"],[1,"mx-6","mb-6","mt-4","border-b","sm:mx-8"],["class","mx-6 mb-4 flex flex-col sm:mx-8 sm:mb-6 sm:flex-row sm:items-center",4,"ngIf"],["class","flex mx-auto justify-center items-center mb-4",4,"ngIf"],["angorCardExpansion",""],[1,"m-0","border-b"],[1,"mx-4","mb-3","mt-6","flex","flex-col","sm:mx-8"],[1,"flex","items-start"],[1,"w-full",3,"subscriptSizing"],["matInput","","cdkTextareaAutosize","",3,"placeholder","rows"],[1,"mt-3","flex","items-center","justify-between"],[1,"flex","items-center"],["mat-icon-button","",3,"click"],[1,"icon-size-5",3,"svgIcon"],["class","emoji-picker-container-global",4,"ngIf"],["mat-icon-button",""],["mat-button","",3,"click"],[3,"svgIcon"],[1,"ml-4"],[1,"mx-6","mb-4","flex","flex-col","sm:mx-8","sm:mb-6","sm:flex-row","sm:items-center"],[1,"ml-3","text-md","tracking-tight"],[1,"hidden","flex-auto","sm:flex"],[1,"mt-4","flex","items-center","justify-end","sm:mt-0"],["mat-button","",1,"-ml-2","mr-1","px-3","sm:ml-0"],["mat-button","",1,"px-3","sm:-mr-4",3,"click"],[1,"mr-1"],[1,"rotate-0","transition-transform","duration-150","ease-in-out","icon-size-5",3,"ngClass","svgIcon"],[1,"flex","mx-auto","justify-center","items-center","mb-4"],["mode","indeterminate",3,"diameter"],[1,"emoji-picker-container-global"],[3,"emojiClick","darkMode"],[1,"mx-4","my-0","border-b","sm:mx-8"],[1,"max-h-120","overflow-y-auto"],[1,"relative","mx-4","my-6","flex","flex-col","sm:mx-8"],["class","mb-6 flex flex-col items-start",4,"ngFor","ngForOf"],[1,"mb-6","flex","flex-col","items-start"],[3,"pubkey","avatarUrl"],[1,"mt-0.5","flex","flex-col"],["class","inline-block whitespace-pre-wrap break-words",4,"ngFor","ngForOf"],[1,"text-secondary","mt-2","flex","items-center","text-sm"],[1,"inline-block","whitespace-pre-wrap","break-words"],[1,"relative","mb-4","block"],["width","560","height","315","frameborder","0","allowfullscreen","",3,"src"],["alt","Embedded Image",1,"max-h-140","object-cover",2,"width","100%",3,"src"],["controls","",2,"width","100%"],["type","video/mp4",3,"src"],["controls",""],["type","audio/mpeg",3,"src"],[1,"mx-6","mb-6","mt-2","sm:mx-1"],["target","_blank",1,"inline-block","break-words","text-blue-500","underline",3,"href"],[1,"inline-block","break-words"],[1,"mt-2","sm:mx-1"]],template:function(i,s){1&i&&(t.j41(0,"div",1)(1,"div",2),t.DNE(2,M,2,0,"div",3)(3,lt,45,22,"div",4),t.k0s()()),2&i&&(t.R7$(2),t.Y8G("ngIf",s.loading),t.R7$(),t.Y8G("ngIf",!s.loading&&s.post))},dependencies:[I.n,g.m_,g.An,p.Hl,p.$z,p.iY,C.Cn,h.RG,h.rl,b.fS,b.fg,f.xb,f.EE,y.w,T.uc,c.MD,c.YU,c.Sq,c.bT,G.YN,S.f,_.D6,_.LG,F.e,$.MY,P.vg,Y.g,X,D.q]})}}return n})()}]}}]);