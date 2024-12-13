"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[218],{2218:(vt,f,o)=>{o.r(f),o.d(f,{default:()=>mt});var m=o(467),d=o(177),R=o(1413),y=o(8359),E=o(6977),I=o(9345),h=o(7403),u=o(8834),C=o(1997),G=o(9454),g=o(2408),_=o(9213),$=o(9115),b=o(9183),p=o(9417),S=o(7540),P=o(8703),x=o(9042),F=o(882),Y=o(4823),t=o(4438),k=o(7291),T=o(2827);let X=(()=>{class i{constructor(){this.user=(0,t.vPA)(null),this._changeDetectorRef=(0,t.WQX)(t.gRc),this._storageService=(0,t.WQX)(k.n),this._metadatasService=(0,t.WQX)(T.T)}ngOnInit(){this.loadUserProfile(),this._metadatasService.addPublicKey(this.pubkey),this.subscription=this._storageService.profile$.subscribe(e=>{e&&e.pubKey===this.pubkey&&(this.user.set(e.metadata),console.log(this.user()),this._changeDetectorRef.detectChanges())})}loadUserProfile(){var e=this;return(0,m.A)(function*(){const n=yield e._storageService.getProfile(e.pubkey);e.user.set(n||{}),e._changeDetectorRef.detectChanges()})()}get displayName(){return this.user()?.display_name||this.user()?.name||this.shortenPubkey(this.pubkey)}get displayAvatar(){return this.user()?.picture||this.avatarUrl||"/images/avatars/avatar-placeholder.png"}shortenPubkey(e){return e?`${e.slice(0,8)}...${e.slice(-8)}`:""}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=t.VBU({type:i,selectors:[["app-replay-profile"]],inputs:{pubkey:"pubkey",avatarUrl:"avatarUrl"},decls:5,vars:4,consts:[[1,"flex","items-center"],[1,"flex","items-center","group",3,"href"],[1,"mr-4","h-10","w-10","rounded-full","border","border-gray-300","group-hover:shadow-md","object-cover",3,"src","alt"],[1,"font-bold","text-gray-800","group-hover:text-blue-500"]],template:function(n,s){1&n&&(t.j41(0,"div",0)(1,"a",1),t.nrm(2,"img",2),t.j41(3,"span",3),t.EFF(4),t.k0s()()()),2&n&&(t.R7$(),t.Y8G("href","/profile/"+s.pubkey,t.B4B),t.R7$(),t.Y8G("src",s.displayAvatar,t.B4B)("alt",s.displayName),t.R7$(2),t.SpI(" ",s.displayName," "))},dependencies:[d.MD],encapsulation:2})}}return i})();var D=o(4496),B=o(8865),j=o(5245),U=o(5645),N=o(413),V=o(345),w=o(2022),z=o(9979),L=o(3105);const A=i=>({"heart-beat":i}),M=i=>({"rotate-180":i}),O=()=>[];function W(i,r){1&i&&(t.j41(0,"div",5),t.nrm(1,"mat-progress-spinner",6),t.k0s()),2&i&&(t.R7$(),t.Y8G("diameter",50))}function Z(i,r){1&i&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function Q(i,r){1&i&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function H(i,r){1&i&&(t.j41(0,"span"),t.EFF(1,"s"),t.k0s())}function J(i,r){if(1&i){const e=t.RV6();t.j41(0,"div",34)(1,"div",27)(2,"div",35),t.EFF(3),t.DNE(4,Z,2,0,"span",4),t.k0s()(),t.nrm(5,"div",36),t.j41(6,"div",37)(7,"button",38),t.EFF(8),t.DNE(9,Q,2,0,"span",4),t.k0s(),t.j41(10,"button",38),t.EFF(11),t.DNE(12,H,2,0,"span",4),t.k0s(),t.j41(13,"button",39),t.bIt("click",function(){t.eBV(e),t.XpG();const s=t.sdS(4);return t.Njj(s.expanded=!s.expanded)}),t.j41(14,"span",40),t.EFF(15),t.k0s(),t.nrm(16,"mat-icon",41),t.k0s()()()}if(2&i){t.XpG();const e=t.sdS(4),n=t.XpG();t.R7$(3),t.SpI(" ",n.zaps.length," Zap"),t.R7$(),t.Y8G("ngIf",n.zaps.length>1),t.R7$(4),t.SpI(" ",n.likes.length," Like"),t.R7$(),t.Y8G("ngIf",n.likes.length>1),t.R7$(2),t.SpI(" ",n.reposts.length," Share"),t.R7$(),t.Y8G("ngIf",n.reposts.length>1),t.R7$(3),t.SpI("",n.replies.length," Comments"),t.R7$(),t.Y8G("ngClass",t.eq3(9,M,e.expanded))("svgIcon","heroicons_mini:chevron-down")}}function K(i,r){1&i&&(t.j41(0,"div",42),t.nrm(1,"mat-progress-spinner",6),t.k0s()),2&i&&(t.R7$(),t.Y8G("diameter",40))}function q(i,r){if(1&i){const e=t.RV6();t.j41(0,"div",43)(1,"emoji-mart",44),t.bIt("emojiClick",function(s){t.eBV(e);const a=t.XpG(2);return t.Njj(a.addEmoji(s))}),t.k0s()()}if(2&i){const e=t.XpG(2);t.R7$(),t.Y8G("darkMode",e.darkMode)}}function tt(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",55),t.nrm(2,"iframe",56),t.k0s(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==e?null:e.safeWord,t.f$h)}}function et(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",55),t.nrm(2,"img",57),t.k0s(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function nt(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",55)(2,"video",58),t.nrm(3,"source",59),t.EFF(4," Your browser does not support the video tag. "),t.k0s()(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function it(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",55)(2,"audio",60),t.nrm(3,"source",61),t.EFF(4," Your browser does not support the audio element. "),t.k0s()(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(3),t.Y8G("src",null==e?null:e.safeWord,t.B4B)}}function st(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",62)(2,"a",63)(3,"span",64),t.EFF(4),t.k0s()()(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(2),t.Y8G("href",null==e?null:e.word,t.B4B),t.R7$(2),t.SpI(" ",null==e?null:e.word," ")}}function ot(i,r){if(1&i&&(t.qex(0),t.j41(1,"div",65)(2,"span",64),t.EFF(3),t.k0s()(),t.bVm()),2&i){const e=t.XpG().$implicit;t.R7$(3),t.SpI(" ",null==e?null:e.trim()," ")}}function rt(i,r){if(1&i&&(t.j41(0,"div",54),t.DNE(1,tt,3,1,"ng-container",4)(2,et,3,1,"ng-container",4)(3,nt,5,1,"ng-container",4)(4,it,5,1,"ng-container",4)(5,st,5,2,"ng-container",4)(6,ot,4,1,"ng-container",4),t.k0s()),2&i){const e=r.$implicit;t.R7$(),t.Y8G("ngIf","youtube"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","image"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","video"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","audio"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf","link"===(null==e?null:e.token)),t.R7$(),t.Y8G("ngIf",!(null!=e&&e.token))}}function at(i,r){if(1&i&&(t.j41(0,"div",49),t.nrm(1,"app-replay-profile",50),t.j41(2,"div",51)(3,"span"),t.DNE(4,rt,7,6,"div",52),t.k0s(),t.j41(5,"div",53)(6,"span"),t.EFF(7),t.nI1(8,"ago"),t.k0s()()()()),2&i){const e=r.$implicit,n=t.XpG(3);t.R7$(),t.Y8G("pubkey",null==e?null:e.pubkey)("avatarUrl","/images/avatars/avatar-placeholder.png"),t.R7$(3),t.Y8G("ngForOf",n._parseContent.parseContent(null==e?null:e.content)||t.lJ4(6,O)),t.R7$(3),t.JRh(t.bMT(8,4,null==e?null:e.created_at))}}function ct(i,r){if(1&i&&(t.j41(0,"div"),t.nrm(1,"hr",45),t.j41(2,"div",46)(3,"div",47),t.DNE(4,at,9,7,"div",48),t.k0s()()()),2&i){const e=t.XpG(2);t.R7$(4),t.Y8G("ngForOf",e.replies)}}function lt(i,r){if(1&i){const e=t.RV6();t.j41(0,"div")(1,"div",7),t.nrm(2,"app-post",8),t.j41(3,"angor-card",9,0)(5,"div",10)(6,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.toggleLike(s.post))}),t.nrm(7,"mat-icon",12),t.j41(8,"span",13),t.EFF(9),t.k0s()(),t.j41(10,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.sdS(4);return t.Njj(s.expanded=!s.expanded)}),t.nrm(11,"mat-icon",14),t.j41(12,"span",13),t.EFF(13,"Comment"),t.k0s()(),t.j41(14,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.onShare(s.post))}),t.nrm(15,"mat-icon",15),t.j41(16,"span",13),t.EFF(17,"Share"),t.k0s()(),t.j41(18,"button",11),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.openZapDialog())}),t.nrm(19,"mat-icon",16),t.j41(20,"span",13),t.EFF(21,"Zap"),t.k0s()()(),t.nrm(22,"hr",17),t.DNE(23,J,17,11,"div",18)(24,K,2,1,"div",19),t.qex(25,20),t.nrm(26,"hr",21),t.j41(27,"div",22)(28,"div",23)(29,"mat-form-field",24)(30,"textarea",25),t.mxI("ngModelChange",function(s){t.eBV(e);const a=t.XpG();return t.DH7(a.comment,s)||(a.comment=s),t.Njj(s)}),t.k0s()()(),t.j41(31,"div",26)(32,"div",27)(33,"button",28),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.toggleEmojiPicker())}),t.nrm(34,"mat-icon",29),t.k0s(),t.DNE(35,q,2,1,"div",30),t.j41(36,"button",31),t.nrm(37,"mat-icon",29),t.k0s(),t.j41(38,"button",31),t.nrm(39,"mat-icon",29),t.k0s()(),t.j41(40,"button",32),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.sendComment(s.post))}),t.nrm(41,"mat-icon",33),t.j41(42,"span",13),t.EFF(43,"Send"),t.k0s()()()(),t.DNE(44,ct,5,1,"div",4),t.bVm(),t.k0s()()()}if(2&i){const e=t.XpG();t.R7$(2),t.Y8G("item",e.post)("more",!1)("actions",!1),t.R7$(5),t.Y8G("ngClass",t.eq3(21,A,e.isLiked))("svgIcon",e.isLiked?"heroicons_solid:heart":"heroicons_outline:heart"),t.R7$(2),t.SpI("",e.isLiked?"Liked":"Like"," "),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:chat-bubble-left-ellipsis"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:share"),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:bolt"),t.R7$(4),t.Y8G("ngIf",!e.loadingReactions),t.R7$(),t.Y8G("ngIf",e.loadingReactions),t.R7$(5),t.Y8G("subscriptSizing","dynamic"),t.R7$(),t.Y8G("placeholder","Write a comment...")("rows",3),t.R50("ngModel",e.comment),t.R7$(4),t.Y8G("svgIcon","heroicons_solid:face-smile"),t.R7$(),t.Y8G("ngIf",e.showEmojiPicker),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:photo"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:sparkles"),t.R7$(2),t.Y8G("svgIcon","heroicons_solid:paper-airplane"),t.R7$(3),t.Y8G("ngIf",e.replies.length>0)}}const mt=[{path:"",component:(()=>{class i{constructor(e,n,s,a,l,c,v,dt,pt,ut){this._route=e,this._router=n,this._storageService=s,this._subscriptionService=a,this._changeDetectorRef=l,this._parseContent=c,this._sanitizer=v,this._eventService=dt,this._angorConfirmationService=pt,this._zapService=ut,this.postId=null,this.post=null,this.user=null,this.loading=!0,this.loadingReactions=!0,this._unsubscribeAll=new R.B,this.subscription=new y.yU,this.darkMode=!1,this.likes=[],this.reposts=[],this.zaps=[],this.replies=[],this.isLiked=!1}ngOnInit(){this._route.paramMap.pipe((0,E.Q)(this._unsubscribeAll)).subscribe(e=>{this.postId=e.get("id"),this.postId&&(this.loadPost(this.postId),this.subscribeToReactions(this.postId))}),this.subscription=this._storageService.myLikes$.subscribe(e=>{e&&e.includes(this.postId)?(this.isLiked=!0,this._changeDetectorRef.detectChanges()):this.isLiked=!1})}loadUserProfile(){var e=this;return(0,m.A)(function*(){e._storageService.getProfile(e.post.pubkey).then(n=>{e.user=n,e._changeDetectorRef.detectChanges()})})()}loadPost(e){var n=this;return(0,m.A)(function*(){try{if(n.loading=!0,n.post=yield n._storageService.getPostById(e),n.post)n.loading=!1,yield n.loadUserProfile();else{const a=n._subscriptionService.addSubscriptions([{ids:[e],kinds:[1],limit:1}],function(){var l=(0,m.A)(function*(c){n.post=c,console.log(n.post),n._changeDetectorRef.detectChanges(),yield n._storageService.savePost(c),n._changeDetectorRef.detectChanges(),a&&n._subscriptionService.removeSubscriptionById(a),n.loading=!1});return function(c){return l.apply(this,arguments)}}())}}catch(s){console.error("Error loading post:",s),n._router.navigate(["/404"])}})()}getSafeUrl(e){return this._sanitizer.bypassSecurityTrustUrl(e)}subscribeToReactions(e){var n=this;let s;this.loadingReactions=!0,s=setTimeout(()=>{this.loadingReactions=!1},3e3),this.subscriptionId=this._subscriptionService.addSubscriptions([{"#e":[e],kinds:[1,7,9735,6]}],function(){var l=(0,m.A)(function*(c){n.loadingReactions&&(n.loadingReactions=!1,clearTimeout(s)),n.addReaction(e,c.kind,{pubkey:c.pubkey,created_at:c.created_at,content:1===c.kind?c.content:void 0})});return function(c){return l.apply(this,arguments)}}())}addReaction(e,n,s){switch(n){case 1:this.replies.push(s),this.replies.sort((a,l)=>l.created_at-a.created_at);break;case 7:this.likes.push(s);break;case 9735:this.zaps.push(s);break;case 6:this.reposts.push(s)}this._changeDetectorRef.detectChanges()}isSingleEmojiOrWord(e){const n=e.trim(),s=/^\w+$/.test(n),a=/^[\p{Emoji}]+$/u.test(n);return s||a}sendLike(e){this.isLiked||this._eventService.sendLikeEvent(e).then(()=>{this.isLiked=!0,this._changeDetectorRef.detectChanges()}).catch(n=>console.error("Failed to send like:",n))}toggleLike(e){this.sendLike(e)}onShare(e){this._angorConfirmationService.open({title:"Share",message:'Are you sure you want to share this post on your profile? <span class="font-medium">This action is permanent and cannot be undone.</span>',icon:{show:!0,name:"heroicons_solid:share",color:"primary"},actions:{confirm:{show:!0,label:"Yes, Share",color:"primary"},cancel:{show:!0,label:"Cancel"}},dismissible:!0}).afterClosed().subscribe(s=>{console.log(s),"confirmed"===s&&this._eventService.shareEvent(e).then(()=>{this._changeDetectorRef.detectChanges()}).catch(a=>console.error("Failed to share post",a))})}openZapDialog(){this._zapService.openZapDialog(this.postId,this.user)}sendComment(e){""!==this.comment.trim()&&this._eventService.sendReplyEvent(e,this.comment).then(()=>{this.comment="",this._changeDetectorRef.markForCheck()})}toggleEmojiPicker(){this.showEmojiPicker=!this.showEmojiPicker}addEmoji(e){e&&e.emoji&&e.emoji.native&&(this.comment=(this.comment||"")+e.emoji.native),this.showEmojiPicker=!1}ngOnDestroy(){this.subscriptionId&&this._subscriptionService.removeSubscriptionById(this.subscriptionId),this.subscription&&this.subscription.unsubscribe(),this._unsubscribeAll.next(),this._unsubscribeAll.complete()}static{this.\u0275fac=function(n){return new(n||i)(t.rXU(j.nX),t.rXU(j.Ix),t.rXU(k.n),t.rXU(U.n),t.rXU(t.gRc),t.rXU(N.m),t.rXU(V.up),t.rXU(w.U),t.rXU(z.m),t.rXU(L.D))}}static{this.\u0275cmp=t.VBU({type:i,selectors:[["app-post-event"]],decls:4,vars:2,consts:[["expandableReplay","angorCard"],[1,"mx-auto","w-full","max-w-5xl","px-6","sm:px-8"],[1,"flex","min-w-0","flex-auto","flex-col"],["class","flex justify-center items-center py-8",4,"ngIf"],[4,"ngIf"],[1,"flex","justify-center","items-center","py-8"],["mode","indeterminate",3,"diameter"],[1,"m-auto","flex","w-full","max-w-140","flex-col","items-start"],[1,"mb-1","mt-8","flex","w-full","flex-col",3,"item","more","actions"],[1,"mb-8","mt-1","flex","w-full","flex-col","pt-4"],[1,"mx-3","flex","items-center","sm:mx-5"],["mat-button","",1,"mr-1","px-3",3,"click"],[1,"text-red-500","icon-size-5",3,"ngClass","svgIcon"],[1,"ml-2"],[1,"text-blue-500","icon-size-5",3,"svgIcon"],[1,"text-green-500","icon-size-5",3,"svgIcon"],[1,"text-orange-500","icon-size-5",3,"svgIcon"],[1,"mx-6","mb-6","mt-4","border-b","sm:mx-8"],["class","mx-6 mb-4 flex flex-col sm:mx-8 sm:mb-6 sm:flex-row sm:items-center",4,"ngIf"],["class","flex mx-auto justify-center items-center mb-4",4,"ngIf"],["angorCardExpansion",""],[1,"m-0","border-b"],[1,"mx-4","mb-3","mt-6","flex","flex-col","sm:mx-8"],[1,"flex","items-start"],[1,"w-full",3,"subscriptSizing"],["matInput","","cdkTextareaAutosize","",3,"ngModelChange","placeholder","rows","ngModel"],[1,"mt-3","flex","items-center","justify-between"],[1,"flex","items-center"],["mat-icon-button","",3,"click"],[1,"icon-size-5",3,"svgIcon"],["class","emoji-picker-container-global",4,"ngIf"],["mat-icon-button",""],["mat-button","",3,"click"],[3,"svgIcon"],[1,"mx-6","mb-4","flex","flex-col","sm:mx-8","sm:mb-6","sm:flex-row","sm:items-center"],[1,"ml-3","text-md","tracking-tight"],[1,"hidden","flex-auto","sm:flex"],[1,"mt-4","flex","items-center","justify-end","sm:mt-0"],["mat-button","",1,"-ml-2","mr-1","px-3","sm:ml-0"],["mat-button","",1,"px-3","sm:-mr-4",3,"click"],[1,"mr-1"],[1,"rotate-0","transition-transform","duration-150","ease-in-out","icon-size-5",3,"ngClass","svgIcon"],[1,"flex","mx-auto","justify-center","items-center","mb-4"],[1,"emoji-picker-container-global"],[3,"emojiClick","darkMode"],[1,"mx-4","my-0","border-b","sm:mx-8"],[1,"max-h-120","overflow-y-auto"],[1,"relative","mx-4","my-6","flex","flex-col","sm:mx-8"],["class","mb-6 flex flex-col items-start",4,"ngFor","ngForOf"],[1,"mb-6","flex","flex-col","items-start"],[3,"pubkey","avatarUrl"],[1,"mt-0.5","flex","flex-col"],["class","inline-block whitespace-pre-wrap break-words",4,"ngFor","ngForOf"],[1,"text-secondary","mt-2","flex","items-center","text-sm"],[1,"inline-block","whitespace-pre-wrap","break-words"],[1,"relative","mb-4","block"],["width","560","height","315","frameborder","0","allowfullscreen","",3,"src"],["alt","Embedded Image",1,"max-h-140","object-cover",2,"width","100%",3,"src"],["controls","",2,"width","100%"],["type","video/mp4",3,"src"],["controls",""],["type","audio/mpeg",3,"src"],[1,"mx-6","mb-6","mt-2","sm:mx-1"],["target","_blank",1,"inline-block","break-words","text-blue-500","underline",3,"href"],[1,"inline-block","break-words"],[1,"mt-2","sm:mx-1"]],template:function(n,s){1&n&&(t.j41(0,"div",1)(1,"div",2),t.DNE(2,W,2,1,"div",3)(3,lt,45,23,"div",4),t.k0s()()),2&n&&(t.R7$(2),t.Y8G("ngIf",s.loading),t.R7$(),t.Y8G("ngIf",!s.loading&&s.post))},dependencies:[I.n,_.m_,_.An,u.Hl,u.$z,u.iY,$.Cn,g.RG,g.rl,x.fS,x.fg,h.xb,h.EE,C.w,Y.uc,d.MD,d.YU,d.Sq,d.bT,p.YN,p.me,p.BC,p.vS,b.D6,b.LG,S.e,G.MY,F.vg,P.g,X,D.q,B.Ic],styles:[".emoji-picker-container-global[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;width:350px;max-width:100%}"]})}}return i})()}]}}]);