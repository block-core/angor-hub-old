"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[767],{6767:(U,m,r)=>{r.r(m),r.d(m,{default:()=>K});var l=r(3014),k=r(7785),c=r(4460),d=r(9471),p=r(2902),x=r(6071),g=r(3904),h=r(6389),b=r(2322),v=r(1054),j=r(4375),y=r(1371),B=r(7712),f=r(8716),F=r(8447),P=r(5424),u=r(2040),$=r(7178),C=r(3016),t=r(3107),I=r(7112),G=r(3149),S=r(9528);const R=()=>[],E=n=>["/chat",n],T=n=>({"-ml-3":n});function N(n,s){if(1&n){const o=t.RV6();t.j41(0,"div",32),t.bIt("click",function(){t.eBV(o);const i=t.XpG().$implicit,a=t.XpG();return t.Njj(a.goToProjectDetails(i))}),t.EFF(1),t.k0s()}if(2&n){const o=t.XpG().$implicit;t.R7$(),t.SpI(" ",o.displayName||o.nostrPubKey," ")}}function Y(n,s){if(1&n&&(t.j41(0,"div",25),t.EFF(1),t.k0s()),2&n){const o=t.XpG().$implicit;t.R7$(),t.SpI(" ",o.displayName||o.nostrPubKey," ")}}function L(n,s){if(1&n){const o=t.RV6();t.j41(0,"div",27)(1,"div",33)(2,"button",34),t.nrm(3,"mat-icon",35),t.k0s()(),t.j41(4,"div",33)(5,"button",36),t.bIt("click",function(){t.eBV(o);const i=t.XpG().$implicit,a=t.XpG();return t.Njj(a.toggleBookmark(i.nostrPubKey))}),t.nrm(6,"mat-icon",35),t.nI1(7,"async"),t.k0s()()()}if(2&n){let o;const e=t.XpG().$implicit,i=t.XpG();t.R7$(2),t.Y8G("routerLink",t.eq3(5,E,e.nostrPubKey)),t.R7$(),t.Y8G("svgIcon","heroicons_outline:chat-bubble-left-right"),t.R7$(3),t.Y8G("svgIcon",null!=(o=t.bMT(7,3,i.bookmarks$))&&o.includes(e.nostrPubKey)?"heroicons_solid:bookmark":"heroicons_outline:bookmark")}}function X(n,s){if(1&n&&(t.qex(0),t.nrm(1,"img",37),t.bVm()),2&n){const o=t.XpG().index,e=t.XpG().$implicit;t.R7$(),t.Mz_("alt","Investor avatar ",o+1,""),t.Y8G("ngClass",t.eq3(4,T,e.totalInvestmentsCount>1&&o>0))("src","images/avatars/avatar-placeholder.png",t.B4B)}}function M(n,s){if(1&n&&(t.qex(0),t.DNE(1,X,2,6,"ng-container",14),t.bVm()),2&n){const o=s.index;t.R7$(),t.Y8G("ngIf",o<10)}}function V(n,s){if(1&n&&(t.qex(0),t.j41(1,"angor-card",15)(2,"div",16),t.nrm(3,"img",17),t.k0s(),t.j41(4,"div",18)(5,"div",19),t.nrm(6,"img",20),t.k0s()(),t.j41(7,"div",21)(8,"div",22)(9,"div",23),t.DNE(10,N,2,1,"div",24)(11,Y,2,1,"div",25),t.j41(12,"div",26),t.EFF(13),t.k0s()(),t.DNE(14,L,8,7,"div",27),t.k0s(),t.nrm(15,"hr",28),t.j41(16,"div",22)(17,"div",29),t.EFF(18),t.k0s(),t.j41(19,"div",30),t.DNE(20,M,2,1,"ng-container",31),t.k0s()()()(),t.bVm()),2&n){const o=s.$implicit;t.R7$(3),t.Y8G("src",o.banner||"/images/pages/profile/cover.jpg",t.B4B),t.R7$(3),t.Y8G("src",o.picture||"images/avatars/avatar-placeholder.png",t.B4B),t.R7$(4),t.vxM(o.displayName||o.name?10:-1),t.R7$(),t.vxM(o.name||o.displayName?-1:11),t.R7$(2),t.SpI(" ",o.about||"No description available"," "),t.R7$(),t.vxM(o.displayName||o.name?14:-1),t.R7$(4),t.SpI(" ",o.totalInvestmentsCount||0," investors "),t.R7$(2),t.Y8G("ngForOf",t.lJ4(8,R).constructor(o.totalInvestmentsCount||0))}}function D(n,s){1&n&&(t.qex(0),t.j41(1,"div",38),t.nrm(2,"mat-spinner",39),t.j41(3,"div",40),t.EFF(4,"Loading projects..."),t.k0s()(),t.bVm()),2&n&&(t.R7$(2),t.Y8G("diameter",40))}function A(n,s){1&n&&(t.qex(0),t.j41(1,"div",41),t.nrm(2,"mat-icon",42),t.j41(3,"div",43),t.EFF(4," No projects "),t.k0s()(),t.bVm()),2&n&&(t.R7$(2),t.Y8G("svgIcon","heroicons_outline:archive-box-x-mark"))}const K=[{path:"",component:(()=>{class n{constructor(o,e,i,a){this._bookmarkService=o,this._storageService=e,this._router=i,this._projectsService=a,this.savedProjects=[],this.isLoading=!0,this._unsubscribeAll=new F.B,this.bookmarks$=this._bookmarkService.bookmarks$}ngOnInit(){var o=this;return(0,l.A)(function*(){try{yield o._bookmarkService.initializeForCurrentUser(),yield o.loadBookmarkedProjects(),o.subscribeToBookmarkChanges(),o.isLoading=!1}catch(e){console.error("Error during initialization:",e),o.isLoading=!1}})()}trackByFn(o,e){return e.nostrPubKey||o}loadBookmarkedProjects(){var o=this;return(0,l.A)(function*(){o.isLoading=!0;try{const e=yield o._bookmarkService.getBookmarks(),i=yield o._storageService.getProjectsByNostrPubKeys(e);o.savedProjects=i,o.isLoading=!1}catch(e){console.error("Error loading bookmarked projects:",e),o.isLoading=!1}})()}subscribeToBookmarkChanges(){var o=this;this.bookmarks$.pipe((0,P.Q)(this._unsubscribeAll)).subscribe(function(){var e=(0,l.A)(function*(i){try{const a=yield o._storageService.getProjectsByNostrPubKeys(i);o.savedProjects=a,o.fetchMetadataForProjects(o.savedProjects),o.isLoading=!1}catch(a){console.error("Error updating bookmarks:",a),o.isLoading=!1}});return function(i){return e.apply(this,arguments)}}())}fetchMetadataForProjects(o){o.forEach(e=>{this._storageService.getProfile(e.nostrPubKey).then(i=>{i&&this.updateProjectMetadata(e,i)})})}updateProjectMetadata(o,e){o.displayName=e.name||o.displayName,o.about=e.about||o.about,o.picture=e.picture||o.picture,o.banner=e.banner||o.banner}toggleBookmark(o){var e=this;return(0,l.A)(function*(){(yield e._bookmarkService.isBookmarked(o))?yield e._bookmarkService.removeBookmark(o):yield e._bookmarkService.addBookmark(o)})()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}goToProjectDetails(o){this._projectsService.fetchProjectStats(o.projectIdentifier).pipe((0,u.M)(e=>{this._storageService.saveProjectStats(o.projectIdentifier,e)}),(0,u.M)(()=>{this._router.navigate(["/profile",o.nostrPubKey,o.projectIdentifier])}),(0,$.W)(e=>(console.error(`Failed to navigate to project details for ${o.projectIdentifier}:`,e),(0,C.of)(null)))).subscribe()}static{this.\u0275fac=function(e){return new(e||n)(t.rXU(I.U),t.rXU(G.n),t.rXU(f.Ix),t.rXU(S.i))}}static{this.\u0275cmp=t.VBU({type:n,selectors:[["app-bookmark"]],decls:19,vars:4,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"dark","relative","flex-0","overflow-hidden","bg-gray-800","px-4","py-8","sm:p-16"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"pointer-events-none","absolute","inset-0"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],[1,"relative","z-10","flex","flex-col","items-center"],[1,"text-xl","font-semibold"],[1,"mt-1","text-center","text-4xl","font-extrabold","leading-tight","tracking-tight","sm:text-7xl"],[1,"text-secondary","mt-6","max-w-2xl","text-center","tracking-tight","sm:text-2xl"],[1,"p-6","sm:p-10"],[1,"mx-auto","flex","w-full","flex-auto","flex-col","sm:max-w-5xl"],[1,"mt-10","grid","w-full","min-w-0","grid-cols-1","gap-6","sm:grid-cols-1","md:grid-cols-1","lg:grid-cols-2"],[4,"ngFor","ngForOf","ngForTrackBy"],[4,"ngIf"],[1,"filter-info","flex","w-full","flex-col"],[1,"flex","h-32"],["alt","Card cover image","onerror","this.onerror=null; this.src='/images/pages/profile/cover.jpg';","alt","Card cover image",1,"object-cover",3,"src"],[1,"flex","px-8"],[1,"bg-card","-mt-12","rounded-full","p-1"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Project logo",1,"h-24","w-24","rounded-full","object-cover",3,"src"],[1,"flex","flex-col","px-8","pb-6","pt-4"],[1,"flex","items-center","justify-between"],[1,"min-w-0","flex-1"],["role","button",1,"truncate","text-2xl","font-semibold","leading-tight"],[1,"truncate","text-2xl","font-semibold","leading-tight"],[1,"text-secondary","mt-1","truncate","leading-tight"],[1,"absolute","top-2","right-2","flex","space-x-2"],[1,"my-6","w-full","border-t"],[1,"text-secondary","mr-3","text-md","font-medium"],[1,"flex","items-center"],[4,"ngFor","ngForOf"],["role","button",1,"truncate","text-2xl","font-semibold","leading-tight",3,"click"],[1,"flex","h-10","w-10","items-center","justify-center","rounded-full","border","bg-white","shadow-md"],["mat-icon-button","",3,"routerLink"],[1,"icon-size-5",3,"svgIcon"],["mat-icon-button","",3,"click"],[1,"text-card","ring-bg-card","m-0.5","h-6","w-6","rounded-full","ring-2",3,"ngClass","src","alt"],[1,"flex","flex-auto","flex-col","items-center","justify-center"],[3,"diameter"],[1,"text-secondary","mt-4","text-lg"],[1,"flex","flex-auto","flex-col","items-center","justify-center","bg-gray-100","dark:bg-transparent"],[1,"icon-size-24",3,"svgIcon"],[1,"text-secondary","mt-4","text-2xl","font-semibold","tracking-tight"]],template:function(e,i){1&e&&(t.j41(0,"div",0)(1,"div",1),t.qSk(),t.j41(2,"svg",2)(3,"g",3),t.nrm(4,"circle",4)(5,"circle",5),t.k0s()(),t.joV(),t.j41(6,"div",6)(7,"h2",7),t.EFF(8,"Bookmark"),t.k0s(),t.j41(9,"div",8),t.EFF(10," Explore Your Saved Projects "),t.k0s(),t.j41(11,"div",9),t.EFF(12," Review and manage your bookmarked projects below. "),t.k0s()()(),t.j41(13,"div",10)(14,"div",11)(15,"div",12),t.DNE(16,V,21,9,"ng-container",13),t.k0s(),t.DNE(17,D,5,1,"ng-container",14)(18,A,5,1,"ng-container",14),t.k0s()()()),2&e&&(t.R7$(16),t.Y8G("ngForOf",i.savedProjects)("ngForTrackBy",i.trackByFn),t.R7$(),t.Y8G("ngIf",i.isLoading),t.R7$(),t.Y8G("ngIf",!i.isLoading&&0===i.savedProjects.length))},dependencies:[f.Wk,d.Hl,d.iY,g.m_,g.An,k.n,x.RG,j.Ve,p.Sy,h.fS,y.mV,c.YU,B.uc,b.PO,c.MD,c.Sq,c.bT,c.Jj,v.D6,v.LG],encapsulation:2})}}return n})()}]}}]);