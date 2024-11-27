"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[394],{5394:(Ue,h,r)=>{r.r(h),r.d(h,{default:()=>ve});var c=r(3014),y=r(7785),v=r(708),m=r(4460),j=r(936),d=r(9471),b=r(7702),k=r(6071),x=r(3904),_=r(6389),p=r(7818),P=r(1054),I=r(1371),U=r(7712),f=r(8716),F=r(1556),E=r(9363),R=r(8447),G=r(2835),$=r(5785),C=r(1211),S=r(5727),e=r(3107),w=r(8078),Y=r(3149),T=r(6388),B=r(7859),M=r(7544),X=r(1109),A=r(7153),N=r(5616),V=r(5506),L=r(4160),D=r(9207),z=r(7112);const K=["eventInput"],Z=["commentInput"],O=()=>["hex","npub"],W=(i,a)=>({height:i,overflow:a}),J=(i,a)=>({"white-space":i,"max-height":a,overflow:"hidden"}),H=i=>({"large-font":i});function Q(i,a){if(1&i&&(e.qex(0),e.nrm(1,"img",33),e.bVm()),2&i){const t=e.XpG();e.R7$(),e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.Y8G("src",t.getSafeUrl(null==t.profileUser?null:t.profileUser.picture),e.B4B)}}function q(i,a){if(1&i&&e.nrm(0,"img",34),2&i){const t=e.XpG();e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||"")}}function ee(i,a){if(1&i){const t=e.RV6();e.j41(0,"button",35),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.openZapDialog())}),e.j41(1,"span",36),e.nrm(2,"mat-icon",37),e.j41(3,"span"),e.EFF(4),e.k0s()()()}if(2&i){const t=e.XpG();e.R7$(2),e.Y8G("svgIcon",t.isCurrentUserProfile?"heroicons_outline:qr-code":"feather:zap"),e.R7$(2),e.JRh(t.isCurrentUserProfile?"Receive Zap":"Send Zap")}}function te(i,a){if(1&i){const t=e.RV6();e.qex(0),e.j41(1,"button",35),e.bIt("click",function(){const o=e.eBV(t).$implicit,s=e.XpG();return e.Njj(s.copyKey(o))}),e.j41(2,"span",36),e.nrm(3,"mat-icon",37),e.j41(4,"span"),e.EFF(5),e.k0s()()(),e.bVm()}if(2&i){const t=a.$implicit;e.R7$(3),e.Y8G("svgIcon","heroicons_outline:clipboard-document"),e.R7$(2),e.SpI("Copy Public key (",t,")")}}function oe(i,a){1&i&&(e.j41(0,"button",38)(1,"span",36),e.nrm(2,"mat-icon",37),e.j41(3,"span"),e.EFF(4,"Edit your profile"),e.k0s()()()),2&i&&(e.Y8G("routerLink","/settings/profile"),e.R7$(2),e.Y8G("svgIcon","heroicons_outline:pencil-square"))}function ne(i,a){1&i&&(e.qex(0),e.j41(1,"button",39)(2,"span",36),e.nrm(3,"mat-icon",37),e.j41(4,"span"),e.EFF(5,"Report"),e.k0s()()(),e.j41(6,"button",39)(7,"span",36),e.nrm(8,"mat-icon",37),e.j41(9,"span"),e.EFF(10,"Turn on notifications"),e.k0s()()(),e.bVm()),2&i&&(e.R7$(3),e.Y8G("svgIcon","heroicons_solid:exclamation-triangle"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:bell"))}function ie(i,a){1&i&&(e.j41(0,"span",47),e.EFF(1,"..."),e.k0s())}function re(i,a){if(1&i){const t=e.RV6();e.j41(0,"angor-card",40)(1,"div",41)(2,"div",42),e.EFF(3," About "),e.k0s(),e.j41(4,"button",43),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.toggleAbout())}),e.nrm(5,"mat-icon",44),e.k0s()(),e.j41(6,"div",45),e.EFF(7),e.DNE(8,ie,2,0,"span",46),e.k0s()()}if(2&i){const t=e.XpG();e.Y8G("ngStyle",e.l_i(5,W,t.aboutExpanded?"auto":"80px",t.aboutExpanded?"visible":"hidden")),e.R7$(5),e.Y8G("svgIcon",t.aboutExpanded?"heroicons_outline:chevron-up":"heroicons_outline:chevron-down"),e.R7$(),e.Y8G("ngStyle",e.l_i(8,J,t.aboutExpanded?"normal":"nowrap",t.aboutExpanded?"none":"1.5em")),e.R7$(),e.SpI(" ",(null==t.profileUser?null:t.profileUser.about)||""," "),e.R7$(),e.Y8G("ngIf",!t.aboutExpanded)}}function se(i,a){if(1&i){const t=e.RV6();e.j41(0,"div",63)(1,"emoji-mart",64),e.bIt("emojiClick",function(o){e.eBV(t);const s=e.XpG(2);return e.Njj(s.addEmoji(o))}),e.k0s()()}if(2&i){const t=e.XpG(2);e.R7$(),e.Y8G("darkMode",t.darkMode)}}function ae(i,a){if(1&i){const t=e.RV6();e.j41(0,"angor-card",48)(1,"div",49)(2,"div",50),e.EFF(3,"Create Post"),e.k0s(),e.j41(4,"mat-slide-toggle",51),e.bIt("change",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.togglePreview())}),e.EFF(5," Preview "),e.k0s()(),e.j41(6,"div",52)(7,"mat-form-field",53),e.nrm(8,"textarea",54,2),e.k0s()(),e.j41(10,"div",55)(11,"div",36)(12,"button",56),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.toggleEmojiPicker())}),e.nrm(13,"mat-icon",18),e.j41(14,"span",57),e.EFF(15,"Feeling"),e.k0s()(),e.DNE(16,se,2,1,"div",58),e.j41(17,"button",59),e.nrm(18,"mat-icon",18),e.j41(19,"span",57),e.EFF(20,"Media"),e.k0s()(),e.j41(21,"button",59),e.nrm(22,"mat-icon",18),e.j41(23,"span",57),e.EFF(24,"Tag"),e.k0s()(),e.j41(25,"button",60),e.nrm(26,"mat-icon",18),e.k0s(),e.j41(27,"mat-menu",null,3)(29,"button",61)(30,"span",36),e.nrm(31,"mat-icon",37),e.j41(32,"span"),e.EFF(33,"Tag"),e.k0s()()(),e.j41(34,"button",61)(35,"span",36),e.nrm(36,"mat-icon",37),e.j41(37,"span"),e.EFF(38,"Feeling"),e.k0s()()(),e.j41(39,"button",39)(40,"span",36),e.nrm(41,"mat-icon",37),e.j41(42,"span"),e.EFF(43,"Live"),e.k0s()()(),e.j41(44,"button",39)(45,"span",36),e.nrm(46,"mat-icon",37),e.j41(47,"span"),e.EFF(48,"Gif"),e.k0s()()(),e.j41(49,"button",39)(50,"span",36),e.nrm(51,"mat-icon",37),e.j41(52,"span"),e.EFF(53,"Check in"),e.k0s()()()()(),e.j41(54,"button",62),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.sendEvent())}),e.nrm(55,"mat-icon",18),e.j41(56,"span",57),e.EFF(57,"Send"),e.k0s()()()()}if(2&i){const t=e.sdS(28),n=e.XpG();e.R7$(4),e.Y8G("color","primary"),e.R7$(3),e.Y8G("subscriptSizing","dynamic"),e.R7$(),e.Y8G("placeholder","What's on your mind?")("rows",3),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:face-smile"),e.R7$(3),e.Y8G("ngIf",n.showEmojiPicker),e.R7$(2),e.Y8G("svgIcon","heroicons_solid:photo"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:user-circle"),e.R7$(3),e.Y8G("matMenuTriggerFor",t),e.R7$(),e.Y8G("svgIcon","heroicons_solid:ellipsis-horizontal"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:user-circle"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:face-smile"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:play"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:sparkles"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:map-pin"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:paper-airplane")}}function le(i,a){if(1&i&&(e.qex(0),e.j41(1,"div",87),e.nrm(2,"img",88),e.k0s(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(2),e.Y8G("src",t.safeWord,e.B4B)}}function ce(i,a){if(1&i&&(e.qex(0),e.j41(1,"div",87)(2,"video",89),e.nrm(3,"source",90),e.EFF(4," Your browser does not support the video tag. "),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(3),e.Y8G("src",t.safeWord,e.B4B)}}function me(i,a){if(1&i&&(e.qex(0),e.j41(1,"div",87)(2,"audio",91),e.nrm(3,"source",92),e.EFF(4," Your browser does not support the audio element. "),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(3),e.Y8G("src",t.safeWord,e.B4B)}}function ue(i,a){if(1&i&&(e.qex(0),e.j41(1,"div",93)(2,"a",94)(3,"span",95),e.EFF(4),e.k0s()()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(2),e.Y8G("href",t.word,e.B4B),e.R7$(2),e.JRh(t.word)}}function pe(i,a){if(1&i&&(e.qex(0),e.j41(1,"div",93)(2,"span",96),e.EFF(3),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit,n=e.XpG(2);e.R7$(2),e.Y8G("ngClass",e.eq3(2,H,n.isSingleEmojiOrWord(t))),e.R7$(),e.SpI(" ",t.trim()," ")}}function de(i,a){if(1&i&&(e.j41(0,"div",86),e.DNE(1,le,3,1,"ng-container",25)(2,ce,5,1,"ng-container",25)(3,me,5,1,"ng-container",25)(4,ue,5,2,"ng-container",25)(5,pe,4,4,"ng-container",25),e.k0s()),2&i){const t=a.$implicit;e.R7$(),e.Y8G("ngIf","image"===t.token),e.R7$(),e.Y8G("ngIf","video"===t.token),e.R7$(),e.Y8G("ngIf","audio"===t.token),e.R7$(),e.Y8G("ngIf","link"===t.token),e.R7$(),e.Y8G("ngIf",!t.token)}}function fe(i,a){if(1&i&&(e.j41(0,"angor-card",65,4)(2,"div",66),e.nrm(3,"img",67),e.j41(4,"div",68)(5,"span",69),e.EFF(6),e.k0s(),e.j41(7,"span",70),e.EFF(8,"1 minutes ago"),e.k0s()()(),e.DNE(9,de,6,5,"div",71),e.j41(10,"div",72)(11,"button",73),e.nrm(12,"mat-icon",74),e.j41(13,"span",57),e.EFF(14,"Unlike"),e.k0s()(),e.j41(15,"button",73),e.nrm(16,"mat-icon",75),e.j41(17,"span",57),e.EFF(18,"Comment"),e.k0s()(),e.j41(19,"button",73),e.nrm(20,"mat-icon",76),e.j41(21,"span",57),e.EFF(22,"Share"),e.k0s()(),e.j41(23,"button",73),e.nrm(24,"mat-icon",77),e.j41(25,"span",57),e.EFF(26,"Zap"),e.k0s()()(),e.nrm(27,"hr",78),e.j41(28,"div",79)(29,"div",36)(30,"div",80),e.EFF(31,"0 Zap"),e.k0s()(),e.nrm(32,"div",81),e.j41(33,"div",82)(34,"button",83),e.EFF(35," 0 Like "),e.k0s(),e.j41(36,"button",83),e.EFF(37," 0 shares "),e.k0s(),e.j41(38,"button",84)(39,"span",85),e.EFF(40,"0 Comments"),e.k0s()()()()()),2&i){const t=e.XpG();e.R7$(3),e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.Y8G("src",t.getSafeUrl(null==t.profileUser?null:t.profileUser.picture),e.B4B),e.R7$(3),e.JRh((null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.R7$(3),e.Y8G("ngForOf",t.parseContent.parseContent(t.eventInput.nativeElement.value))("ngForTrackBy",t.trackByFn),e.R7$(3),e.Y8G("svgIcon","heroicons_solid:heart"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:chat-bubble-left-ellipsis"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:share"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:bolt")}}function ge(i,a){1&i&&e.nrm(0,"app-post",31),2&i&&e.Y8G("item",a.$implicit)}function he(i,a){if(1&i){const t=e.RV6();e.j41(0,"div",32)(1,"button",97),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.loadNextPage())}),e.EFF(2),e.k0s()()}if(2&i){const t=e.XpG();e.R7$(),e.Y8G("disabled",t.loading),e.R7$(),e.SpI(" ",t.loading?"Loading...":"Load More Posts"," ")}}const ve=[{path:"",component:(()=>{class i{constructor(t,n,o,s,l,u,g,be,ke,xe,_e,ye,je,Pe,Ie){this._changeDetectorRef=t,this._signerService=n,this._storageService=o,this._sanitizer=s,this._route=l,this._router=u,this._snackBar=g,this._dialog=be,this._angorConfigService=ke,this._angorConfirmationService=xe,this._eventService=_e,this._subscriptionService=ye,this._clipboard=je,this.parseContent=Pe,this._bookmarkService=Ie,this.darkMode=!1,this.isLoading=!0,this.errorMessage=null,this._unsubscribeAll=new R.B,this.allPublicKeys=[],this.isCurrentUserProfile=!1,this.isFollowing=!1,this.showEmojiPicker=!1,this.showCommentEmojiPicker=!1,this.paymentInvoice="",this.invoiceAmount="?",this.isLiked=!1,this.isPreview=!1,this.posts=[],this.currentPage=1,this.loading=!1,this.myLikes=[],this.myLikedNoteIds=[],this.isLoadingPosts=!0,this.noEventsMessage="",this.hasMorePosts=!0,this.followersList=[],this.followingList=[],this.aboutExpanded=!0,this.bookmarkedProjectNpubs=[],this.bookmarks$=this._bookmarkService.bookmarks$}ngOnInit(){var t=this;return(0,c.A)(function*(){t.initializeTheme(),t.processRouteParams(),t.loadInitialPosts(),t.subscribeToNewPosts()})()}initializeTheme(){this._angorConfigService.config$.subscribe(t=>{"auto"===t.scheme?this.detectSystemTheme():this.darkMode="dark"===t.scheme})}checkIfRoutePubKeyIsFollowing(){this.isFollowing=!(!this.routePubKey||!this.followersList)&&this.followersList.some(t=>t.pubkey===this.routePubKey)}processRouteParams(){this._route.paramMap.subscribe(t=>{const n=t.get("pubkey")||"";if(n){const o=this._signerService.processKey(n);o?(this.routePubKey=o,this.isCurrentUserProfile=!1):(this.errorMessage="Public key is invalid. Please check your input.",this.setCurrentUserProfile())}else this.setCurrentUserProfile();this.loadUserProfileData(this.routePubKey)})}setCurrentUserProfile(){this.isCurrentUserProfile=!0,this.routePubKey=this._signerService.getPublicKey()}loadUserProfileData(t){this.loadUserProfile(t)}isValidHexPubkey(t){return/^[a-fA-F0-9]{64}$/.test(t)}loadInitialPosts(){var t=this;return(0,c.A)(function*(){t.loading=!0;let n=0;try{for(;n<5;){const l=yield t._storageService.getPostsByPubKeysWithPagination([t.routePubKey],t.currentPage,10);if(l.length>0){t.posts=[...t.posts,...l],t.posts.sort((u,g)=>g.created_at-u.created_at);break}n++,n<5&&(yield t.delay(3e3))}t.hasMorePosts=t.posts.length>0,t.hasMorePosts||console.log("This user has no posts.")}catch(l){console.error("Error loading posts:",l)}finally{t.loading=!1}t.refreshUI()})()}delay(t){return new Promise(n=>setTimeout(n,t))}subscribeToNewPosts(){var t=this;this.isCurrentUserProfile?this._storageService.posts$.subscribe(n=>{n&&n.pubkey===this.routePubKey&&(this.posts.unshift(n),this.posts.sort((o,s)=>s.created_at-o.created_at),this.refreshUI())}):this.postsSubscriptionId=this._subscriptionService.addSubscriptions([{authors:[this.routePubKey],kinds:[1]}],function(){var o=(0,c.A)(function*(s){t.isReply(s)||t._storageService.savePost(s)});return function(s){return o.apply(this,arguments)}}())}isReply(t){return t.tags.filter(o=>"e"===o[0]||"p"===o[0]).length>0}loadNextPage(){this.loading||(this.currentPage++,this.loadInitialPosts())}toggleAbout(){this.aboutExpanded=!this.aboutExpanded}ngOnDestroy(){this.subscriptionId&&this._subscriptionService.removeSubscriptionById(this.subscriptionId),this.postsSubscriptionId&&this._subscriptionService.removeSubscriptionById(this.postsSubscriptionId),this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}loadUserProfile(t){var n=this;return(0,c.A)(function*(){if(n.isLoading=!0,n.errorMessage=null,n.profileUser=null,n.refreshUI(),!t)return n.errorMessage="No public key found. Please log in again.",n.isLoading=!1,void n.refreshUI();try{const o=yield n._storageService.getProfile(t);o&&(n.profileUser=o,n.refreshUI()),n.subscribeToUserProfileAndContacts(t)}catch(o){console.error("Error loading user profile:",o)}})()}subscribeToUserProfileAndContacts(t){var n=this;return(0,c.A)(function*(){n.subscriptionId=n._subscriptionService.addSubscriptions([{authors:[t],kinds:[0],limit:1}],function(){var s=(0,c.A)(function*(l){yield n.processProfileMetadata(l,t)});return function(l){return s.apply(this,arguments)}}())})()}processProfileMetadata(t,n){var o=this;return(0,c.A)(function*(){try{const s=JSON.parse(t.content);o.profileUser=s,yield o._storageService.saveProfile(n,s),o._changeDetectorRef.markForCheck()}catch(s){console.error("Error processing metadata event:",s)}})()}getSafeUrl(t){return this._sanitizer.bypassSecurityTrustUrl(t)}refreshUI(){this._changeDetectorRef.detectChanges()}openSnackBar(t,n="dismiss"){this._snackBar.open(t,n,{duration:3e3})}canUseZap(){var t=this;return(0,c.A)(function*(){return!(!t.profileUser||!t.profileUser.lud06&&!t.profileUser.lud16)||(t.openSnackBar("Using Zap is not possible. Please complete your profile to include lud06 or lud16."),!1)})()}openZapDialog(t=""){var n=this;return(0,c.A)(function*(){(yield n.canUseZap())&&n._dialog.open(C.r,{width:"405px",maxHeight:"90vh",data:{lud16:n.profileUser.lud16,lud06:n.profileUser.lud06,pubkey:n.profileUser.pubkey,eventId:t}})})()}toggleLike(){this.isLiked=!this.isLiked,this.isLiked&&setTimeout(()=>{this.isLiked=!1,this.isLiked=!0},300)}addEmoji(t){this.eventInput.nativeElement.value+=t.emoji.native,this.showEmojiPicker=!1}toggleEmojiPicker(){this.showCommentEmojiPicker=!1,this.showEmojiPicker=!this.showEmojiPicker}addEmojiTocomment(t){this.commentInput.nativeElement.value+=t.emoji.native,this.showCommentEmojiPicker=!1}detectSystemTheme(){const t=window.matchMedia("(prefers-color-scheme: dark)");this.darkMode=t.matches,t.addEventListener("change",n=>{this.darkMode=n.matches})}togglePreview(){this.isPreview=!this.isPreview}sendEvent(){""!=this.eventInput.nativeElement.value&&this._eventService.sendTextEvent(this.eventInput.nativeElement.value).then(()=>{this.eventInput.nativeElement.value="",this._changeDetectorRef.markForCheck()}).catch(t=>{console.error("Failed to send Event:",t)})}copyHex(){this._clipboard.copy(this.routePubKey),this.openSnackBar("hex public key copied","dismiss")}copyNpub(){var t=this._signerService.getNpubFromPubkey(this.routePubKey);this._clipboard.copy(t),this.openSnackBar("npub public key copied","dismiss")}copyKey(t){if("hex"===t)this._clipboard.copy(this.routePubKey),this.openSnackBar("hex public key copied","dismiss");else if("npub"===t){const n=this._signerService.getNpubFromPubkey(this.routePubKey);this._clipboard.copy(n),this.openSnackBar("npub public key copied","dismiss")}}isSingleEmojiOrWord(t){const n=t.trim(),o=/^\w+$/.test(n),s=/^[\p{Emoji}]+$/u.test(n);return o||s}openPost(t){this._router.navigate(["/post",t])}toggleBookmark(t){var n=this;return(0,c.A)(function*(){(yield n._bookmarkService.isBookmarked(t))?yield n._bookmarkService.removeBookmark(t):yield n._bookmarkService.addBookmark(t)})()}isProjectBookmarked(t){var n=this;return(0,c.A)(function*(){return yield n._bookmarkService.isBookmarked(t)})()}static{this.\u0275fac=function(n){return new(n||i)(e.rXU(e.gRc),e.rXU(w.A),e.rXU(Y.n),e.rXU(T.up),e.rXU(f.nX),e.rXU(f.Ix),e.rXU(B.UG),e.rXU(M.bZ),e.rXU(X.P),e.rXU(A.m),e.rXU(N.U),e.rXU(V.n),e.rXU(L.B0),e.rXU(D.m),e.rXU(z.U))}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["profile"]],viewQuery:function(n,o){if(1&n&&(e.GBs(K,5),e.GBs(Z,5)),2&n){let s;e.mGM(s=e.lsd())&&(o.eventInput=s.first),e.mGM(s=e.lsd())&&(o.commentInput=s.first)}},decls:41,vars:21,consts:[["defaultAvatar",""],["profileMenu","matMenu"],["eventInput",""],["postCardMenu01","matMenu"],["expandableComments","angorCard"],[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-col","shadow"],["onerror","this.onerror=null; this.src='/images/pages/profile/cover.jpg';",1,"h-40","object-cover","lg:h-80",3,"src","alt"],[1,"bg-card","mx-auto","flex","w-full","max-w-5xl","flex-0","flex-col","items-center","px-8","lg:h-18","lg:flex-row"],[1,"-mt-26","flex-shrink-0","rounded-full","lg:-mt-22"],[4,"ngIf","ngIfElse"],[1,"mt-4","flex","flex-grow","flex-col","items-center","lg:ml-8","lg:mt-0","lg:items-start"],[1,"max-w-full","truncate","text-lg","font-bold","leading-tight","lg:max-w-[25rem]",2,"white-space","nowrap","overflow","hidden","text-overflow","ellipsis"],[1,"text-secondary","max-w-full","truncate","leading-tight","lg:max-w-[25rem]",2,"white-space","nowrap","overflow","hidden","text-overflow","ellipsis"],[1,"flex","flex-shrink-0","items-center","space-x-6","lg:mt-0"],[1,"mb-4","mt-8","flex","flex-shrink-0","items-center","space-x-6","lg:m-0","lg:ml-auto"],[1,"flex","h-10","w-10","items-center","justify-center","rounded-full","border","bg-white","shadow-md"],["mat-icon-button",""],[1,"icon-size-5",3,"svgIcon"],["mat-icon-button","",3,"click"],["mat-icon-button","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"my-2"],["mat-menu-item","",3,"routerLink",4,"ngIf"],[4,"ngIf"],[1,"mx-auto","w-full","max-w-5xl","p-6","sm:p-8"],[1,"m-auto","flex","w-full","max-w-140","flex-col","items-start"],["class","about-section mb-8 flex w-full flex-col items-start p-6 pb-6 transition-all duration-300 sm:p-8","style","position: relative",3,"ngStyle",4,"ngIf"],["class","mb-8 flex w-full flex-col p-6 pb-6 sm:p-8",4,"ngIf"],["class","mb-8 flex w-full flex-col bg-primary-50 dark:bg-primary-800",4,"ngIf"],[1,"mb-8","flex","w-full","flex-col",3,"item"],[1,"m-auto","mt-4","flex","justify-center"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"ring-bg-card","h-32","min-h-32","w-32","min-w-32","max-w-fit","rounded-full","object-cover","ring-4",3,"src","alt"],["src","/images/avatars/avatar-placeholder.png","onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"ring-bg-card","h-32","min-h-32","w-32","min-w-32","rounded-full","object-cover","ring-4",3,"alt"],["mat-menu-item","",3,"click"],[1,"flex","items-center"],[1,"mr-3","icon-size-5",3,"svgIcon"],["mat-menu-item","",3,"routerLink"],["mat-menu-item",""],[1,"about-section","mb-8","flex","w-full","flex-col","items-start","p-6","pb-6","transition-all","duration-300","sm:p-8",2,"position","relative",3,"ngStyle"],[1,"mb-2","flex","w-full","items-center","justify-between"],[1,"text-2xl","font-semibold","leading-tight"],["mat-icon-button","","color","primary","aria-label","Toggle about section",2,"position","absolute","top","16px","right","16px",3,"click"],[3,"svgIcon"],[1,"about-content","text-base","text-gray-700","dark:text-gray-50","transition-all","duration-300",3,"ngStyle"],["class","text-gray-500",4,"ngIf"],[1,"text-gray-500"],[1,"mb-8","flex","w-full","flex-col","p-6","pb-6","sm:p-8"],[1,"flex","justify-between"],[1,"text-xl","font-semibold"],[1,"-mr-4","ml-auto",3,"change","color"],[1,"mt-8","flex","flex-col","items-start","sm:flex-row"],[1,"w-full",3,"subscriptSizing"],["matInput","","cdkTextareaAutosize","",3,"placeholder","rows"],[1,"-mx-3","mt-6","flex","items-center","justify-between","sm:mt-8"],["mat-button","",1,"mr-1","px-3",3,"click"],[1,"ml-2"],["class","emoji-picker-container-global",4,"ngIf"],["mat-button","",1,"mr-1","hidden","px-3","sm:inline-flex"],["mat-button","",1,"px-3",3,"matMenuTriggerFor"],["mat-menu-item","",1,"sm:hidden"],["mat-button","",1,"mr-1","flex","px-3",3,"click"],[1,"emoji-picker-container-global"],[3,"emojiClick","darkMode"],[1,"mb-8","flex","w-full","flex-col","bg-primary-50","dark:bg-primary-800"],[1,"mx-6","mb-4","mt-6","flex","items-center","sm:mx-8"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"mr-4","h-10","w-10","rounded-full","object-cover",3,"src","alt"],[1,"flex","flex-col"],[1,"font-semibold","leading-none"],[1,"text-secondary","mt-1","text-sm","leading-none"],["class","inline-block whitespace-pre-wrap break-words",4,"ngFor","ngForOf","ngForTrackBy"],[1,"mx-3","flex","items-center","sm:mx-5"],["mat-button","",1,"mr-1","px-3"],[1,"text-red-500","icon-size-5",3,"svgIcon"],[1,"text-blue-500","icon-size-5",3,"svgIcon"],[1,"text-green-500","icon-size-5",3,"svgIcon"],[1,"text-orange-500","icon-size-5",3,"svgIcon"],[1,"mx-6","mb-6","mt-4","border-b","sm:mx-8"],[1,"mx-6","mb-4","flex","flex-col","sm:mx-8","sm:mb-6","sm:flex-row","sm:items-center"],[1,"ml-3","text-md","tracking-tight"],[1,"hidden","flex-auto","sm:flex"],[1,"mt-4","flex","items-center","sm:mt-0"],["mat-button","",1,"-ml-2","mr-1","px-3","sm:ml-0"],["mat-button","",1,"px-3","sm:-mr-4"],[1,"mr-1"],[1,"inline-block","whitespace-pre-wrap","break-words"],[1,"relative","mb-4","block"],["alt","Embedded Image",1,"max-h-140","object-cover",2,"width","100%",3,"src"],["controls","",2,"width","100%"],["type","video/mp4",3,"src"],["controls",""],["type","audio/mpeg",3,"src"],[1,"mx-6","mb-6","mt-2","sm:mx-8"],["target","_blank",1,"inline-block","break-words","text-blue-500","underline",3,"href"],[1,"inline-block","break-words"],[1,"inline-block","break-words",3,"ngClass"],["mat-raised-button","","color","primary",1,"bg-card","text-gray-700","hover:bg-gray-200","dark:text-gray-300","dark:hover:bg-gray-700",3,"click","disabled"]],template:function(n,o){if(1&n){const s=e.RV6();e.j41(0,"div",5)(1,"div",6)(2,"div"),e.nrm(3,"img",7),e.k0s(),e.j41(4,"div",8)(5,"div",9),e.DNE(6,Q,2,2,"ng-container",10)(7,q,1,1,"ng-template",null,0,e.C5r),e.k0s(),e.j41(9,"div",11)(10,"div",12),e.EFF(11),e.k0s(),e.j41(12,"div",13),e.EFF(13),e.k0s()(),e.j41(14,"div",14)(15,"div",15)(16,"div",16)(17,"button",17),e.nrm(18,"mat-icon",18),e.k0s()(),e.j41(19,"div",16)(20,"button",19),e.bIt("click",function(){return e.eBV(s),e.Njj(o.toggleBookmark(o.routePubKey))}),e.nrm(21,"mat-icon",18),e.nI1(22,"async"),e.k0s()(),e.j41(23,"div")(24,"button",20),e.nrm(25,"mat-icon",18),e.k0s(),e.j41(26,"mat-menu",null,1),e.DNE(28,ee,5,2,"button",21)(29,te,6,2,"ng-container",22),e.nrm(30,"mat-divider",23),e.DNE(31,oe,5,2,"button",24)(32,ne,11,2,"ng-container",25),e.k0s()()()()()(),e.j41(33,"div",26)(34,"div",27),e.DNE(35,re,9,11,"angor-card",28)(36,ae,58,16,"angor-card",29)(37,fe,41,9,"angor-card",30),e.Z7z(38,ge,1,1,"app-post",31,e.Vm6),e.DNE(40,he,3,2,"div",32),e.k0s()()()}if(2&n){let s;const l=e.sdS(8),u=e.sdS(27);e.R7$(3),e.FS9("alt",(null==o.profileUser?null:o.profileUser.display_name)||(null==o.profileUser?null:o.profileUser.name)||"Banner"),e.Y8G("src",(null==o.profileUser?null:o.profileUser.banner)||"/images/pages/profile/cover.jpg",e.B4B),e.R7$(3),e.Y8G("ngIf",null==o.profileUser?null:o.profileUser.picture)("ngIfElse",l),e.R7$(5),e.SpI(" ",(null==o.profileUser?null:o.profileUser.display_name)||(null==o.profileUser?null:o.profileUser.name)||"Unknown User"," "),e.R7$(2),e.SpI(" ",(null==o.profileUser?null:o.profileUser.username)||(null==o.profileUser?null:o.profileUser.name)," "),e.R7$(5),e.Y8G("svgIcon","heroicons_outline:chat-bubble-left-right"),e.R7$(3),e.Y8G("svgIcon",null!=(s=e.bMT(22,18,o.bookmarks$))&&s.includes(o.routePubKey)?"heroicons_solid:bookmark":"heroicons_outline:bookmark"),e.R7$(3),e.Y8G("matMenuTriggerFor",u),e.R7$(),e.Y8G("svgIcon","heroicons_solid:ellipsis-vertical"),e.R7$(3),e.Y8G("ngIf",!o.isCurrentUserProfile||o.isCurrentUserProfile),e.R7$(),e.Y8G("ngForOf",e.lJ4(20,O)),e.R7$(2),e.Y8G("ngIf",o.isCurrentUserProfile),e.R7$(),e.Y8G("ngIf",!o.isCurrentUserProfile),e.R7$(3),e.Y8G("ngIf",(null==o.profileUser?null:o.profileUser.about)&&""!==o.profileUser.about.trim()),e.R7$(),e.Y8G("ngIf",o.isCurrentUserProfile),e.R7$(),e.Y8G("ngIf",o.isPreview),e.R7$(),e.Dyx(o.posts),e.R7$(2),e.vxM(o.hasMorePosts?40:-1)}},dependencies:[f.Wk,y.n,x.m_,x.An,d.Hl,d.$z,d.iY,p.Cn,p.kk,p.fb,p.Cp,k.RG,k.rl,_.fS,_.fg,v.xb,v.EE,b.w,b.q,U.uc,m.YU,m.MD,m.Sq,m.bT,m.B3,m.Jj,j.YN,F.Ic,I.sG,P.D6,E.e,G.MY,$.vg,S.q],styles:[".emoji-picker-container-global{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;width:350px;max-width:100%}.heart-beat{animation:heartBeatAnimation .3s ease-in-out}@keyframes heartBeatAnimation{0%{transform:scale(1)}30%{transform:scale(2)}60%{transform:scale(1)}to{transform:scale(1)}}.loading-spinner{display:flex;justify-content:center;align-items:center;margin:20px 0}.loading-spinner .spinner{border:4px solid rgba(0,0,0,.1);border-left-color:#009fb5;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.about-section{overflow:hidden;transition:height .3s ease}.c-img,.c-video{max-width:100%;border-radius:10px}\n"],encapsulation:2,changeDetection:0})}}return i})()}]}}]);