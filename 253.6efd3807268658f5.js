"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[253],{7253:($e,_,r)=>{r.r(_),r.d(_,{default:()=>Re});var u=r(467),S=r(9345),k=r(7403),p=r(177),I=r(9417),v=r(8834),y=r(1997),F=r(2102),j=r(9213),w=r(9042),g=r(9115),U=r(9183),G=r(450),P=r(4823),b=r(5245),$=r(8865),T=r(5398),Y=r(7540),h=r(1413),B=r(9454),L=r(882),M=r(2690),x=r(8418),X=r(4496),e=r(4438),E=r(6324),A=r(7291),D=r(345),R=r(6231);let N=(()=>{class i{constructor(t){this.relayService=t,this.requestQueue=[],this.isProcessingQueue=!1,this.maxConcurrentRequests=2,this.currentRequestCount=0}addRequestToQueue(t){const n=new h.B;return this.requestQueue.push({filters:t,subject:n}),this.processQueue(),n.asObservable()}processQueue(){var t=this;return(0,u.A)(function*(){if(!t.isProcessingQueue){for(t.isProcessingQueue=!0;t.requestQueue.length>0&&t.currentRequestCount<t.maxConcurrentRequests;){const n=t.requestQueue.shift();if(!n)break;try{t.currentRequestCount++,yield t.handleRequest(n)}catch(o){n.subject.error(o)}finally{t.currentRequestCount--}}t.isProcessingQueue=!1,t.requestQueue.length>0&&t.processQueue()}})()}handleRequest(t){var n=this;return(0,u.A)(function*(){try{yield n.relayService.ensureConnectedRelays();const o=n.relayService.getConnectedRelays();if(0===o.length)throw new Error("No connected relays available");yield n.fetchEvents(o,t.filters,t.subject)}catch(o){t.subject.error(o)}})()}fetchEvents(t,n,o){var s=this;return(0,u.A)(function*(){const c=s.relayService.getPool().subscribeMany(t,n,{onevent:f=>{o.next(f)},oneose:()=>{c.close(),o.complete()}});setTimeout(()=>{c.close||(c.close(),o.complete())},5e3)})()}static{this.\u0275fac=function(n){return new(n||i)(e.KVO(R.b))}}static{this.\u0275prov=e.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})(),V=(()=>{class i{constructor(t,n,o){this.relayService=t,this.signerService=n,this.queueService=o,this.followersSubject=new h.B,this.followingSubject=new h.B}getFollowersObservable(){return this.followersSubject.asObservable()}getFollowingObservable(){return this.followingSubject.asObservable()}getFollowers(t){var n=this;return(0,u.A)(function*(){const o=[{kinds:[3],"#p":[t]}],s=[];return new Promise((a,c)=>{n.queueService.addRequestToQueue(o).subscribe({next:m=>{s.push(m),n.followersSubject.next(m)},error:m=>{console.error("Error fetching followers:",m),c(m)},complete:()=>{a(s)}})})})()}getFollowing(t){var n=this;return(0,u.A)(function*(){const o=[{kinds:[3],authors:[t]}],s=[];return new Promise((a,c)=>{n.queueService.addRequestToQueue(o).subscribe({next:m=>{m.tags.filter(d=>"p"===d[0]).forEach(d=>{s.push(d[1]),n.followingSubject.next(m)})},error:m=>{console.error("Error fetching following:",m),c(m)},complete:()=>{a(s)}})})})()}follow(t){var n=this;return(0,u.A)(function*(){const o=n.getFollowingList();if(o.includes(t))return void console.log(`Already following ${t}`);const s=[...o,t];n.setFollowingList(s);const a=n.signerService.getUnsignedEvent(3,s.map(c=>["p",c]),"");yield n.publishSignedEvent(a),console.log(`Now following ${t}`)})()}unfollow(t){var n=this;return(0,u.A)(function*(){const o=n.getFollowingList();if(!o.includes(t))return void console.log(`Not following ${t}`);const s=o.filter(c=>c!==t);n.setFollowingList(s);const a=n.signerService.getUnsignedEvent(3,s.map(c=>["p",c]),"");yield n.publishSignedEvent(a),console.log(`Unfollowed ${t}`)})()}publishSignedEvent(t){var n=this;return(0,u.A)(function*(){let s;if(yield n.signerService.isUsingExtension())s=yield n.signerService.signEventWithExtension(t);else{const a=yield n.signerService.getDecryptedSecretKey();if(!a)throw new Error("Secret key is missing. Unable to sign event.");s=n.signerService.getSignedEvent(t,a)}n.relayService.publishEventToWriteRelays(s)})()}getFollowingListAsTags(){const t=this.getFollowingList(),n=[],o=this.relayService.getConnectedRelays();return t.forEach(s=>{o.forEach(a=>{n.push(["p",s,a,localStorage.getItem(`${s}`)||""])})}),n}setFollowingListFromTags(t){const n=[];t.forEach(o=>{n.push(o[1])}),this.setFollowingList(n)}setFollowingList(t){const o=Array.from(new Set(t)).filter(s=>s).join(",");localStorage.setItem("following",o)}getFollowingList(){const t=localStorage.getItem("following");return null===t||""===t?[]:t.split(",").filter(o=>/[a-f0-9]{64}/.test(o))}static{this.\u0275fac=function(n){return new(n||i)(e.KVO(R.b),e.KVO(E.A),e.KVO(N))}}static{this.\u0275prov=e.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var O=r(5416),z=r(5351),K=r(881),Q=r(9979),W=r(2022),Z=r(5645),J=r(6182),H=r(413);const q=["eventInput"],ee=["commentInput"],te=()=>["hex","npub"],ne=(i,l)=>({height:i,overflow:l}),oe=(i,l)=>({"white-space":i,"max-height":l,overflow:"hidden"}),ie=i=>({"large-font":i});function se(i,l){if(1&i&&(e.qex(0),e.nrm(1,"img",33),e.bVm()),2&i){const t=e.XpG();e.R7$(),e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.Y8G("src",t.getSafeUrl(null==t.profileUser?null:t.profileUser.picture),e.B4B)}}function re(i,l){if(1&i&&e.nrm(0,"img",34),2&i){const t=e.XpG();e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||"")}}function le(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",36)(2,"span",37),e.EFF(3),e.k0s(),e.j41(4,"span",38),e.EFF(5,"FOLLOWERS"),e.k0s()(),e.j41(6,"div",36)(7,"span",39),e.EFF(8),e.k0s(),e.j41(9,"span",40),e.EFF(10," FOLLOWING "),e.k0s()(),e.bVm()),2&i){const t=l.ngIf;e.R7$(2),e.Y8G("matTooltip","Total contact: "+t.totalContacts),e.R7$(),e.SpI(" ",t.followersCount," "),e.R7$(5),e.JRh(t.followingCount),e.R7$(),e.Y8G("matTooltip","Total contact: "+t.totalContacts)}}function ae(i,l){if(1&i&&(e.j41(0,"div",35),e.DNE(1,le,11,4,"ng-container",19),e.nI1(2,"async"),e.k0s()),2&i){const t=e.XpG();e.R7$(),e.Y8G("ngIf",e.bMT(2,1,t.stats$))}}function ce(i,l){if(1&i&&(e.j41(0,"div",35)(1,"div",36)(2,"span",37),e.EFF(3),e.k0s(),e.j41(4,"span",38),e.EFF(5,"FOLLOWERS"),e.k0s()(),e.j41(6,"div",36)(7,"span",39),e.EFF(8),e.k0s(),e.j41(9,"span",40),e.EFF(10," FOLLOWING "),e.k0s()()()),2&i){const t=e.XpG();e.R7$(2),e.Y8G("matTooltip","Total contact: "+t.totalContacts),e.R7$(),e.SpI(" ",t.followersCount," "),e.R7$(5),e.JRh(t.followingCount),e.R7$(),e.Y8G("matTooltip","Total contact: "+t.totalContacts)}}function ue(i,l){if(1&i){const t=e.RV6();e.j41(0,"div")(1,"button",41),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.toggleFollow())}),e.nrm(2,"mat-icon",42),e.k0s()()}if(2&i){const t=e.XpG();e.R7$(),e.Y8G("matTooltip",t.isFollowing?"Unfollow":"Follow"),e.R7$(),e.Y8G("svgIcon",t.isFollowing?"heroicons_outline:user-minus":"heroicons_outline:user-plus")}}function me(i,l){if(1&i){const t=e.RV6();e.j41(0,"button",43),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.openZapDialog())}),e.j41(1,"span",44),e.nrm(2,"mat-icon",45),e.j41(3,"span"),e.EFF(4),e.k0s()()()}if(2&i){const t=e.XpG();e.R7$(2),e.Y8G("svgIcon",t.isCurrentUserProfile?"heroicons_outline:qr-code":"feather:zap"),e.R7$(2),e.JRh(t.isCurrentUserProfile?"Receive Zap":"Send Zap")}}function fe(i,l){if(1&i){const t=e.RV6();e.qex(0),e.j41(1,"button",43),e.bIt("click",function(){const o=e.eBV(t).$implicit,s=e.XpG();return e.Njj(s.copyKey(o))}),e.j41(2,"span",44),e.nrm(3,"mat-icon",45),e.j41(4,"span"),e.EFF(5),e.k0s()()(),e.bVm()}if(2&i){const t=l.$implicit;e.R7$(3),e.Y8G("svgIcon","heroicons_outline:clipboard-document"),e.R7$(2),e.SpI("Copy Public key (",t,")")}}function pe(i,l){1&i&&(e.j41(0,"button",46)(1,"span",44),e.nrm(2,"mat-icon",45),e.j41(3,"span"),e.EFF(4,"Edit your profile"),e.k0s()()()),2&i&&(e.Y8G("routerLink","/settings/profile"),e.R7$(2),e.Y8G("svgIcon","heroicons_outline:pencil-square"))}function de(i,l){1&i&&(e.qex(0),e.j41(1,"button",47)(2,"span",44),e.nrm(3,"mat-icon",45),e.j41(4,"span"),e.EFF(5,"Report"),e.k0s()()(),e.j41(6,"button",47)(7,"span",44),e.nrm(8,"mat-icon",45),e.j41(9,"span"),e.EFF(10,"Turn on notifications"),e.k0s()()(),e.bVm()),2&i&&(e.R7$(3),e.Y8G("svgIcon","heroicons_solid:exclamation-triangle"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:bell"))}function ge(i,l){1&i&&(e.j41(0,"span",54),e.EFF(1,"..."),e.k0s())}function he(i,l){if(1&i){const t=e.RV6();e.j41(0,"angor-card",48)(1,"div",49)(2,"div",50),e.EFF(3," About "),e.k0s(),e.j41(4,"button",51),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.toggleAbout())}),e.j41(5,"mat-icon"),e.EFF(6),e.k0s()()(),e.j41(7,"div",52),e.EFF(8),e.DNE(9,ge,2,0,"span",53),e.k0s()()}if(2&i){const t=e.XpG();e.Y8G("ngStyle",e.l_i(5,ne,t.aboutExpanded?"auto":"80px",t.aboutExpanded?"visible":"hidden")),e.R7$(6),e.JRh(t.aboutExpanded?"expand_less":"expand_more"),e.R7$(),e.Y8G("ngStyle",e.l_i(8,oe,t.aboutExpanded?"normal":"nowrap",t.aboutExpanded?"none":"1.5em")),e.R7$(),e.SpI(" ",(null==t.profileUser?null:t.profileUser.about)||""," "),e.R7$(),e.Y8G("ngIf",!t.aboutExpanded)}}function ve(i,l){if(1&i){const t=e.RV6();e.j41(0,"div",73)(1,"emoji-mart",74),e.bIt("emojiClick",function(o){e.eBV(t);const s=e.XpG(2);return e.Njj(s.addEmoji(o))}),e.k0s()()}if(2&i){const t=e.XpG(2);e.R7$(),e.Y8G("darkMode",t.darkMode)}}function be(i,l){if(1&i){const t=e.RV6();e.j41(0,"angor-card",55)(1,"div",56)(2,"div",57),e.EFF(3,"Create Post"),e.k0s(),e.j41(4,"mat-slide-toggle",58),e.bIt("change",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.togglePreview())}),e.EFF(5," Preview "),e.k0s()(),e.j41(6,"div",59)(7,"div",60),e.nrm(8,"img",61),e.j41(9,"div",62),e.EFF(10),e.k0s()(),e.j41(11,"mat-form-field",63),e.nrm(12,"textarea",64,3),e.k0s()(),e.j41(14,"div",65)(15,"div",44)(16,"button",66),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.toggleEmojiPicker())}),e.nrm(17,"mat-icon",21),e.j41(18,"span",67),e.EFF(19,"Feeling"),e.k0s()(),e.DNE(20,ve,2,1,"div",68),e.j41(21,"button",69),e.nrm(22,"mat-icon",21),e.j41(23,"span",67),e.EFF(24,"Media"),e.k0s()(),e.j41(25,"button",69),e.nrm(26,"mat-icon",21),e.j41(27,"span",67),e.EFF(28,"Tag"),e.k0s()(),e.j41(29,"button",70),e.nrm(30,"mat-icon",21),e.k0s(),e.j41(31,"mat-menu",null,4)(33,"button",71)(34,"span",44),e.nrm(35,"mat-icon",45),e.j41(36,"span"),e.EFF(37,"Tag"),e.k0s()()(),e.j41(38,"button",71)(39,"span",44),e.nrm(40,"mat-icon",45),e.j41(41,"span"),e.EFF(42,"Feeling"),e.k0s()()(),e.j41(43,"button",47)(44,"span",44),e.nrm(45,"mat-icon",45),e.j41(46,"span"),e.EFF(47,"Live"),e.k0s()()(),e.j41(48,"button",47)(49,"span",44),e.nrm(50,"mat-icon",45),e.j41(51,"span"),e.EFF(52,"Gif"),e.k0s()()(),e.j41(53,"button",47)(54,"span",44),e.nrm(55,"mat-icon",45),e.j41(56,"span"),e.EFF(57,"Check in"),e.k0s()()()()(),e.j41(58,"button",72),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.sendEvent())}),e.nrm(59,"mat-icon",21),e.j41(60,"span",67),e.EFF(61,"Send"),e.k0s()()()()}if(2&i){const t=e.sdS(32),n=e.XpG();e.R7$(4),e.Y8G("color","primary"),e.R7$(4),e.FS9("alt",(null==n.profileUser?null:n.profileUser.display_name)||(null==n.profileUser?null:n.profileUser.name)||""),e.Y8G("src",null==n.profileUser?null:n.profileUser.picture,e.B4B),e.R7$(2),e.SpI(" ",(null==n.profileUser?null:n.profileUser.display_name)||(null==n.profileUser?null:n.profileUser.name)||""," "),e.R7$(),e.Y8G("subscriptSizing","dynamic"),e.R7$(),e.Y8G("placeholder","What's on your mind?")("rows",3),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:face-smile"),e.R7$(3),e.Y8G("ngIf",n.showEmojiPicker),e.R7$(2),e.Y8G("svgIcon","heroicons_solid:photo"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:user-circle"),e.R7$(3),e.Y8G("matMenuTriggerFor",t),e.R7$(),e.Y8G("svgIcon","heroicons_solid:ellipsis-horizontal"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:user-circle"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:face-smile"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:play"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:sparkles"),e.R7$(5),e.Y8G("svgIcon","heroicons_solid:map-pin"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:paper-airplane")}}function xe(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",97),e.nrm(2,"img",98),e.k0s(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(2),e.Y8G("src",t.safeWord,e.B4B)}}function _e(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",97)(2,"video",99),e.nrm(3,"source",100),e.EFF(4," Your browser does not support the video tag. "),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(3),e.Y8G("src",t.safeWord,e.B4B)}}function ke(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",97)(2,"audio",101),e.nrm(3,"source",102),e.EFF(4," Your browser does not support the audio element. "),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(3),e.Y8G("src",t.safeWord,e.B4B)}}function ye(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",103)(2,"a",104)(3,"span",105),e.EFF(4),e.k0s()()(),e.bVm()),2&i){const t=e.XpG().$implicit;e.R7$(2),e.Y8G("href",t.word,e.B4B),e.R7$(2),e.JRh(t.word)}}function Fe(i,l){if(1&i&&(e.qex(0),e.j41(1,"div",103)(2,"span",106),e.EFF(3),e.k0s()(),e.bVm()),2&i){const t=e.XpG().$implicit,n=e.XpG(2);e.R7$(2),e.Y8G("ngClass",e.eq3(2,ie,n.isSingleEmojiOrWord(t))),e.R7$(),e.SpI(" ",t.trim()," ")}}function je(i,l){if(1&i&&(e.j41(0,"div",96),e.DNE(1,xe,3,1,"ng-container",19)(2,_e,5,1,"ng-container",19)(3,ke,5,1,"ng-container",19)(4,ye,5,2,"ng-container",19)(5,Fe,4,4,"ng-container",19),e.k0s()),2&i){const t=l.$implicit;e.R7$(),e.Y8G("ngIf","image"===t.token),e.R7$(),e.Y8G("ngIf","video"===t.token),e.R7$(),e.Y8G("ngIf","audio"===t.token),e.R7$(),e.Y8G("ngIf","link"===t.token),e.R7$(),e.Y8G("ngIf",!t.token)}}function we(i,l){if(1&i&&(e.j41(0,"angor-card",75,5)(2,"div",76),e.nrm(3,"img",77),e.j41(4,"div",78)(5,"span",79),e.EFF(6),e.k0s(),e.j41(7,"span",80),e.EFF(8,"1 minutes ago"),e.k0s()()(),e.DNE(9,je,6,5,"div",81),e.j41(10,"div",82)(11,"button",83),e.nrm(12,"mat-icon",84),e.j41(13,"span",67),e.EFF(14,"Unlike"),e.k0s()(),e.j41(15,"button",83),e.nrm(16,"mat-icon",85),e.j41(17,"span",67),e.EFF(18,"Comment"),e.k0s()(),e.j41(19,"button",83),e.nrm(20,"mat-icon",86),e.j41(21,"span",67),e.EFF(22,"Share"),e.k0s()(),e.j41(23,"button",83),e.nrm(24,"mat-icon",87),e.j41(25,"span",67),e.EFF(26,"Zap"),e.k0s()()(),e.nrm(27,"hr",88),e.j41(28,"div",89)(29,"div",44)(30,"div",90),e.EFF(31,"0 Zap"),e.k0s()(),e.nrm(32,"div",91),e.j41(33,"div",92)(34,"button",93),e.EFF(35," 0 Like "),e.k0s(),e.j41(36,"button",93),e.EFF(37," 0 shares "),e.k0s(),e.j41(38,"button",94)(39,"span",95),e.EFF(40,"0 Comments"),e.k0s()()()()()),2&i){const t=e.XpG();e.R7$(3),e.FS9("alt",(null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.Y8G("src",t.getSafeUrl(null==t.profileUser?null:t.profileUser.picture),e.B4B),e.R7$(3),e.JRh((null==t.profileUser?null:t.profileUser.display_name)||(null==t.profileUser?null:t.profileUser.name)||""),e.R7$(3),e.Y8G("ngForOf",t.parseContent.parseContent(t.eventInput.nativeElement.value))("ngForTrackBy",t.trackByFn),e.R7$(3),e.Y8G("svgIcon","heroicons_solid:heart"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:chat-bubble-left-ellipsis"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:share"),e.R7$(4),e.Y8G("svgIcon","heroicons_solid:bolt")}}function Pe(i,l){1&i&&e.nrm(0,"app-post",31),2&i&&e.Y8G("item",l.$implicit)}function Ee(i,l){if(1&i){const t=e.RV6();e.j41(0,"div",32)(1,"button",107),e.bIt("click",function(){e.eBV(t);const o=e.XpG();return e.Njj(o.loadNextPage())}),e.EFF(2),e.k0s()()}if(2&i){const t=e.XpG();e.R7$(),e.Y8G("disabled",t.loading),e.R7$(),e.SpI(" ",t.loading?"Loading...":"Load More Posts"," ")}}const Re=[{path:"",component:(()=>{class i{constructor(t,n,o,s,a,c,f,m,C,d,Ce,Se,Ie,Ue,Ge){this._changeDetectorRef=t,this._signerService=n,this._storageService=o,this._sanitizer=s,this._route=a,this._router=c,this._socialService=f,this._snackBar=m,this._dialog=C,this._angorConfigService=d,this._angorConfirmationService=Ce,this._eventService=Se,this._subscriptionService=Ie,this._clipboard=Ue,this.parseContent=Ge,this.darkMode=!1,this.isLoading=!0,this.errorMessage=null,this._unsubscribeAll=new h.B,this.allPublicKeys=[],this.isCurrentUserProfile=!1,this.isFollowing=!1,this.showEmojiPicker=!1,this.showCommentEmojiPicker=!1,this.paymentInvoice="",this.invoiceAmount="?",this.isLiked=!1,this.isPreview=!1,this.posts=[],this.currentPage=1,this.loading=!1,this.myLikes=[],this.myLikedNoteIds=[],this.isLoadingPosts=!0,this.noEventsMessage="",this.hasMorePosts=!0,this.followersList=[],this.followingList=[],this.aboutExpanded=!0,this.totalContacts=0,this.followersCount=0,this.followingCount=0}ngOnInit(){var t=this;return(0,u.A)(function*(){t.initializeTheme(),t.processRouteParams(),t.loadInitialPosts(),t.subscribeToNewPosts()})()}initializeTheme(){this._angorConfigService.config$.subscribe(t=>{"auto"===t.scheme?this.detectSystemTheme():this.darkMode="dark"===t.scheme})}processRouteParams(){this._route.paramMap.subscribe(t=>{const n=t.get("pubkey")||"";n?this.isValidHexPubkey(n)?(this.routePubKey=n,this.isCurrentUserProfile=!1):(this.errorMessage="Public key is invalid. Please check your input.",this.setCurrentUserProfile()):this.setCurrentUserProfile(),this.loadUserProfileData(this.routePubKey)})}setCurrentUserProfile(){this.isCurrentUserProfile=!0,this.routePubKey=this._signerService.getPublicKey()}loadUserProfileData(t){this.loadUserProfile(t),this.stats$=this._storageService.getContactStats$(t)}isValidHexPubkey(t){return/^[a-fA-F0-9]{64}$/.test(t)}loadInitialPosts(){var t=this;return(0,u.A)(function*(){t.loading=!0;let n=0;try{for(;n<5;){const a=yield t._storageService.getPostsByPubKeysWithPagination([t.routePubKey],t.currentPage,10);if(a.length>0){t.posts=[...t.posts,...a],t.posts.sort((c,f)=>f.created_at-c.created_at);break}n++,n<5&&(yield t.delay(3e3))}t.hasMorePosts=t.posts.length>0,t.hasMorePosts||console.log("This user has no posts.")}catch(a){console.error("Error loading posts:",a)}finally{t.loading=!1}t._changeDetectorRef.detectChanges()})()}delay(t){return new Promise(n=>setTimeout(n,t))}subscribeToNewPosts(){var t=this;this.isCurrentUserProfile?this._storageService.posts$.subscribe(n=>{n&&n.pubkey===this.routePubKey&&(this.posts.unshift(n),this.posts.sort((o,s)=>s.created_at-o.created_at),this._changeDetectorRef.detectChanges())}):this.postsSubscriptionId=this._subscriptionService.addSubscriptions([{authors:[this.routePubKey],kinds:[1]}],function(){var o=(0,u.A)(function*(s){t.isReply(s)||t._storageService.savePost(s)});return function(s){return o.apply(this,arguments)}}())}isReply(t){return t.tags.filter(o=>"e"===o[0]||"p"===o[0]).length>0}loadNextPage(){this.loading||(this.currentPage++,this.loadInitialPosts())}toggleAbout(){this.aboutExpanded=!this.aboutExpanded}ngOnDestroy(){this.subscriptionId&&this._subscriptionService.removeSubscriptionById(this.subscriptionId),this.postsSubscriptionId&&this._subscriptionService.removeSubscriptionById(this.postsSubscriptionId),this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}loadUserProfile(t){var n=this;return(0,u.A)(function*(){if(n.isLoading=!0,n.errorMessage=null,n.profileUser=null,n._changeDetectorRef.detectChanges(),!t)return n.errorMessage="No public key found. Please log in again.",n.isLoading=!1,void n._changeDetectorRef.detectChanges();try{const o=yield n._storageService.getProfile(t);o&&(n.profileUser=o,n._changeDetectorRef.detectChanges()),n.subscribeToUserProfileAndContacts(t)}catch(o){console.error("Error loading user profile:",o)}})()}subscribeToUserProfileAndContacts(t){var n=this;return(0,u.A)(function*(){n.subscriptionId=n._subscriptionService.addSubscriptions([{authors:[t],kinds:[0],limit:1},{kinds:[x.In],authors:[t]},{kinds:[x.In],"#p":[t]}],function(){var s=(0,u.A)(function*(a){switch(a.kind){case 0:yield n.processProfileMetadata(a,t);break;case x.In:n.processContactData(a,t)}});return function(a){return s.apply(this,arguments)}}())})()}processProfileMetadata(t,n){var o=this;return(0,u.A)(function*(){try{const s=JSON.parse(t.content);o.profileUser=s,yield o._storageService.saveProfile(n,s),o._changeDetectorRef.markForCheck()}catch(s){console.error("Error processing metadata event:",s)}})()}processContactData(t,n){const o=t.pubkey===n,s={id:t.id,pubkey:t.pubkey,created_at:t.created_at,tags:t.tags,isFollower:o};o?(this.followersList.push(s),this.followersCount++,this.totalContacts++,this._changeDetectorRef.detectChanges()):(this.followingList.push(s),this.followingCount++,this.totalContacts++,this._changeDetectorRef.detectChanges())}getSafeUrl(t){return this._sanitizer.bypassSecurityTrustUrl(t)}toggleFollow(){var t=this;return(0,u.A)(function*(){try{const n=t._signerService.getPublicKey(),o=t.routePubKey||t.currentUserPubKey;if(!o||!n)return void console.error("Public key missing. Unable to toggle follow.");t.isFollowing?yield t._socialService.unfollow(o):yield t._socialService.follow(o),t.isFollowing=!t.isFollowing,t._changeDetectorRef.detectChanges()}catch(n){console.error("Failed to toggle follow:",n)}})()}openSnackBar(t,n="dismiss"){this._snackBar.open(t,n,{duration:3e3})}canUseZap(){var t=this;return(0,u.A)(function*(){return!(!t.profileUser||!t.profileUser.lud06&&!t.profileUser.lud16)||(t.openSnackBar("Using Zap is not possible. Please complete your profile to include lud06 or lud16."),!1)})()}openZapDialog(t=""){var n=this;return(0,u.A)(function*(){(yield n.canUseZap())&&n._dialog.open(M.r,{width:"405px",maxHeight:"90vh",data:{lud16:n.profileUser.lud16,lud06:n.profileUser.lud06,pubkey:n.profileUser.pubkey,eventId:t}})})()}toggleLike(){this.isLiked=!this.isLiked,this.isLiked&&setTimeout(()=>{this.isLiked=!1,this.isLiked=!0},300)}addEmoji(t){this.eventInput.nativeElement.value+=t.emoji.native,this.showEmojiPicker=!1}toggleEmojiPicker(){this.showCommentEmojiPicker=!1,this.showEmojiPicker=!this.showEmojiPicker}addEmojiTocomment(t){this.commentInput.nativeElement.value+=t.emoji.native,this.showCommentEmojiPicker=!1}detectSystemTheme(){const t=window.matchMedia("(prefers-color-scheme: dark)");this.darkMode=t.matches,t.addEventListener("change",n=>{this.darkMode=n.matches})}togglePreview(){this.isPreview=!this.isPreview}sendEvent(){""!=this.eventInput.nativeElement.value&&this._eventService.sendTextEvent(this.eventInput.nativeElement.value).then(()=>{this.eventInput.nativeElement.value="",this._changeDetectorRef.markForCheck()}).catch(t=>{console.error("Failed to send Event:",t)})}copyHex(){this._clipboard.copy(this.routePubKey),this.openSnackBar("hex public key copied","dismiss")}copyNpub(){var t=this._signerService.getNpubFromPubkey(this.routePubKey);this._clipboard.copy(t),this.openSnackBar("npub public key copied","dismiss")}copyKey(t){if("hex"===t)this._clipboard.copy(this.routePubKey),this.openSnackBar("hex public key copied","dismiss");else if("npub"===t){const n=this._signerService.getNpubFromPubkey(this.routePubKey);this._clipboard.copy(n),this.openSnackBar("npub public key copied","dismiss")}}isSingleEmojiOrWord(t){const n=t.trim(),o=/^\w+$/.test(n),s=/^[\p{Emoji}]+$/u.test(n);return o||s}openPost(t){this._router.navigate(["/post",t])}static{this.\u0275fac=function(n){return new(n||i)(e.rXU(e.gRc),e.rXU(E.A),e.rXU(A.n),e.rXU(D.up),e.rXU(b.nX),e.rXU(b.Ix),e.rXU(V),e.rXU(O.UG),e.rXU(z.bZ),e.rXU(K.P),e.rXU(Q.m),e.rXU(W.U),e.rXU(Z.n),e.rXU(J.B0),e.rXU(H.m))}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["profile"]],viewQuery:function(n,o){if(1&n&&(e.GBs(q,5),e.GBs(ee,5)),2&n){let s;e.mGM(s=e.lsd())&&(o.eventInput=s.first),e.mGM(s=e.lsd())&&(o.commentInput=s.first)}},standalone:!0,features:[e.aNF],decls:40,vars:20,consts:[["defaultAvatar",""],["otherUserStats",""],["profileMenu","matMenu"],["eventInput",""],["postCardMenu01","matMenu"],["expandableComments","angorCard"],[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-col","shadow"],["onerror","this.onerror=null; this.src='/images/pages/profile/cover.jpg';",1,"h-40","object-cover","lg:h-80",3,"src","alt"],[1,"bg-card","mx-auto","flex","w-full","max-w-5xl","flex-0","flex-col","items-center","px-8","lg:h-18","lg:flex-row"],[1,"-mt-26","flex-shrink-0","rounded-full","lg:-mt-22"],[4,"ngIf","ngIfElse"],[1,"mt-4","flex","flex-grow","flex-col","items-center","lg:ml-8","lg:mt-0","lg:items-start"],[1,"max-w-full","truncate","text-lg","font-bold","leading-tight","lg:max-w-[25rem]",2,"white-space","nowrap","overflow","hidden","text-overflow","ellipsis"],[1,"text-secondary","max-w-full","truncate","leading-tight","lg:max-w-[25rem]",2,"white-space","nowrap","overflow","hidden","text-overflow","ellipsis"],[1,"mx-8","hidden","h-8","flex-shrink-0","border-l-2","lg:flex"],[1,"flex","flex-shrink-0","items-center","space-x-6","lg:mt-0"],["class","mt-6 flex flex-shrink-0 items-center space-x-6 lg:mt-0",4,"ngIf","ngIfElse"],[1,"mb-4","mt-8","flex","flex-shrink-0","items-center","space-x-6","lg:m-0","lg:ml-auto"],[4,"ngIf"],["mat-icon-button","",3,"matMenuTriggerFor"],[1,"icon-size-5",3,"svgIcon"],["mat-menu-item","",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"my-2"],["mat-menu-item","",3,"routerLink",4,"ngIf"],[1,"mx-auto","w-full","max-w-5xl","p-6","sm:p-8"],[1,"m-auto","flex","w-full","max-w-140","flex-col","items-start"],["class","about-section mb-8 flex w-full flex-col items-start p-6 pb-6 transition-all duration-300 sm:p-8","style","position: relative",3,"ngStyle",4,"ngIf"],["class","mb-8 flex w-full flex-col p-6 pb-6 sm:p-8",4,"ngIf"],["class","mb-8 flex w-full flex-col bg-primary-50 dark:bg-primary-800",4,"ngIf"],[1,"mb-8","flex","w-full","flex-col",3,"item"],[1,"m-auto","mt-4","flex","justify-center"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"ring-bg-card","h-32","min-h-32","w-32","min-w-32","max-w-fit","rounded-full","object-cover","ring-4",3,"src","alt"],["src","/images/avatars/avatar-placeholder.png","onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"ring-bg-card","h-32","min-h-32","w-32","min-w-32","rounded-full","object-cover","ring-4",3,"alt"],[1,"mt-6","flex","flex-shrink-0","items-center","space-x-6","lg:mt-0"],[1,"flex","flex-col","items-center"],[1,"font-bold",3,"matTooltip"],[1,"text-secondary","text-sm","font-medium"],[1,"font-bold"],[1,"text-secondary","text-sm","font-medium",3,"matTooltip"],["mat-icon-button","",3,"click","matTooltip"],[3,"svgIcon"],["mat-menu-item","",3,"click"],[1,"flex","items-center"],[1,"mr-3","icon-size-5",3,"svgIcon"],["mat-menu-item","",3,"routerLink"],["mat-menu-item",""],[1,"about-section","mb-8","flex","w-full","flex-col","items-start","p-6","pb-6","transition-all","duration-300","sm:p-8",2,"position","relative",3,"ngStyle"],[1,"mb-2","flex","w-full","items-center","justify-between"],[1,"text-2xl","font-semibold","leading-tight"],["mat-icon-button","","color","primary","aria-label","Toggle about section",2,"position","absolute","top","16px","right","16px",3,"click"],[1,"about-content","text-base","text-gray-700","transition-all","duration-300",3,"ngStyle"],["class","text-gray-500",4,"ngIf"],[1,"text-gray-500"],[1,"mb-8","flex","w-full","flex-col","p-6","pb-6","sm:p-8"],[1,"flex","justify-between"],[1,"text-xl","font-semibold"],[1,"-mr-4","ml-auto",3,"change","color"],[1,"mt-8","flex","flex-col","items-start","sm:flex-row"],[1,"mb-6","flex","items-center","sm:mb-0"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"mr-4","h-12","w-12","min-w-12","rounded-full","object-cover",3,"src","alt"],[1,"sm:hidden"],[1,"w-full",3,"subscriptSizing"],["matInput","","cdkTextareaAutosize","",3,"placeholder","rows"],[1,"-mx-3","mt-6","flex","items-center","justify-between","sm:mt-8"],["mat-button","",1,"mr-1","px-3",3,"click"],[1,"ml-2"],["class","emoji-picker-container-global",4,"ngIf"],["mat-button","",1,"mr-1","hidden","px-3","sm:inline-flex"],["mat-button","",1,"px-3",3,"matMenuTriggerFor"],["mat-menu-item","",1,"sm:hidden"],["mat-button","",1,"mr-1","flex","px-3",3,"click"],[1,"emoji-picker-container-global"],[3,"emojiClick","darkMode"],[1,"mb-8","flex","w-full","flex-col","bg-primary-50","dark:bg-primary-800"],[1,"mx-6","mb-4","mt-6","flex","items-center","sm:mx-8"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';",1,"mr-4","h-10","w-10","rounded-full","object-cover",3,"src","alt"],[1,"flex","flex-col"],[1,"font-semibold","leading-none"],[1,"text-secondary","mt-1","text-sm","leading-none"],["class","inline-block whitespace-pre-wrap break-words",4,"ngFor","ngForOf","ngForTrackBy"],[1,"mx-3","flex","items-center","sm:mx-5"],["mat-button","",1,"mr-1","px-3"],[1,"text-red-500","icon-size-5",3,"svgIcon"],[1,"text-blue-500","icon-size-5",3,"svgIcon"],[1,"text-green-500","icon-size-5",3,"svgIcon"],[1,"text-orange-500","icon-size-5",3,"svgIcon"],[1,"mx-6","mb-6","mt-4","border-b","sm:mx-8"],[1,"mx-6","mb-4","flex","flex-col","sm:mx-8","sm:mb-6","sm:flex-row","sm:items-center"],[1,"ml-3","text-md","tracking-tight"],[1,"hidden","flex-auto","sm:flex"],[1,"mt-4","flex","items-center","sm:mt-0"],["mat-button","",1,"-ml-2","mr-1","px-3","sm:ml-0"],["mat-button","",1,"px-3","sm:-mr-4"],[1,"mr-1"],[1,"inline-block","whitespace-pre-wrap","break-words"],[1,"relative","mb-4","block"],["alt","Embedded Image",1,"max-h-140","object-cover",2,"width","100%",3,"src"],["controls","",2,"width","100%"],["type","video/mp4",3,"src"],["controls",""],["type","audio/mpeg",3,"src"],[1,"mx-6","mb-6","mt-2","sm:mx-8"],["target","_blank",1,"inline-block","break-words","text-blue-500","underline",3,"href"],[1,"inline-block","break-words"],[1,"inline-block","break-words",3,"ngClass"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(n,o){if(1&n&&(e.j41(0,"div",6)(1,"div",7)(2,"div"),e.nrm(3,"img",8),e.k0s(),e.j41(4,"div",9)(5,"div",10),e.DNE(6,se,2,2,"ng-container",11)(7,re,1,1,"ng-template",null,0,e.C5r),e.k0s(),e.j41(9,"div",12)(10,"div",13),e.EFF(11),e.k0s(),e.j41(12,"div",14),e.EFF(13),e.k0s()(),e.nrm(14,"div",15),e.j41(15,"div",16),e.DNE(16,ae,3,3,"div",17)(17,ce,11,4,"ng-template",null,1,e.C5r),e.nrm(19,"div",15),e.j41(20,"div",18),e.DNE(21,ue,3,2,"div",19),e.j41(22,"div")(23,"button",20),e.nrm(24,"mat-icon",21),e.k0s(),e.j41(25,"mat-menu",null,2),e.DNE(27,me,5,2,"button",22)(28,fe,6,2,"ng-container",23),e.nrm(29,"mat-divider",24),e.DNE(30,pe,5,2,"button",25)(31,de,11,2,"ng-container",19),e.k0s()()()()()(),e.j41(32,"div",26)(33,"div",27),e.DNE(34,he,10,11,"angor-card",28)(35,be,62,19,"angor-card",29)(36,we,41,9,"angor-card",30),e.Z7z(37,Pe,1,1,"app-post",31,e.Vm6),e.DNE(39,Ee,3,2,"div",32),e.k0s()()()),2&n){const s=e.sdS(8),a=e.sdS(18),c=e.sdS(26);e.R7$(3),e.FS9("alt",(null==o.profileUser?null:o.profileUser.display_name)||(null==o.profileUser?null:o.profileUser.name)||"Banner"),e.Y8G("src",(null==o.profileUser?null:o.profileUser.banner)||"/images/pages/profile/cover.jpg",e.B4B),e.R7$(3),e.Y8G("ngIf",null==o.profileUser?null:o.profileUser.picture)("ngIfElse",s),e.R7$(5),e.SpI(" ",(null==o.profileUser?null:o.profileUser.display_name)||(null==o.profileUser?null:o.profileUser.name)||"Unknown User"," "),e.R7$(2),e.SpI(" ",(null==o.profileUser?null:o.profileUser.username)||(null==o.profileUser?null:o.profileUser.name)," "),e.R7$(3),e.Y8G("ngIf",o.isCurrentUserProfile)("ngIfElse",a),e.R7$(5),e.Y8G("ngIf",!o.isCurrentUserProfile),e.R7$(2),e.Y8G("matMenuTriggerFor",c),e.R7$(),e.Y8G("svgIcon","heroicons_solid:ellipsis-vertical"),e.R7$(3),e.Y8G("ngIf",!o.isCurrentUserProfile||o.isCurrentUserProfile),e.R7$(),e.Y8G("ngForOf",e.lJ4(19,te)),e.R7$(2),e.Y8G("ngIf",o.isCurrentUserProfile),e.R7$(),e.Y8G("ngIf",!o.isCurrentUserProfile),e.R7$(3),e.Y8G("ngIf",(null==o.profileUser?null:o.profileUser.about)&&""!==o.profileUser.about.trim()),e.R7$(),e.Y8G("ngIf",o.isCurrentUserProfile),e.R7$(),e.Y8G("ngIf",o.isPreview),e.R7$(),e.Dyx(o.posts),e.R7$(2),e.vxM(o.hasMorePosts?39:-1)}},dependencies:[b.Wk,S.n,j.m_,j.An,v.Hl,v.$z,v.iY,g.Cn,g.kk,g.fb,g.Cp,F.RG,F.rl,w.fS,w.fg,k.xb,k.EE,y.w,y.q,P.uc,P.oV,p.YU,p.MD,p.Sq,p.bT,p.B3,p.Jj,I.YN,T.f,$.Ic,G.sG,U.D6,Y.e,B.MY,L.vg,X.q],styles:[".emoji-picker-container-global{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;width:350px;max-width:100%}.heart-beat{animation:heartBeatAnimation .3s ease-in-out}@keyframes heartBeatAnimation{0%{transform:scale(1)}30%{transform:scale(2)}60%{transform:scale(1)}to{transform:scale(1)}}.loading-spinner{display:flex;justify-content:center;align-items:center;margin:20px 0}.loading-spinner .spinner{border:4px solid rgba(0,0,0,.1);border-left-color:#009fb5;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.about-section{overflow:hidden;transition:height .3s ease}.c-img,.c-video{max-width:100%;border-radius:10px}\n"],encapsulation:2,changeDetection:0})}}return i})()}]}}]);