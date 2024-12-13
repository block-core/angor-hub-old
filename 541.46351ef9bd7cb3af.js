"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[541],{5541:(D,l,e)=>{e.r(l),e.d(l,{default:()=>S});var h=e(467),f=e(177),v=e(9417),d=e(8834),x=e(1997),u=e(9454),a=e(2408),c=e(9213),m=e(9042),y=e(9115),j=e(9183),b=e(4823),k=e(7540),P=e(4496),F=e(5245),t=e(4438),w=e(7291),C=e(345),E=e(413);const R=()=>["/bookmark"];function $(r,g){1&r&&t.nrm(0,"app-post",24),2&r&&t.Y8G("item",g.$implicit)}function L(r,g){if(1&r){const s=t.RV6();t.j41(0,"div",25)(1,"button",26),t.bIt("click",function(){t.eBV(s);const n=t.XpG();return t.Njj(n.loadNextPage())}),t.EFF(2),t.k0s()()}if(2&r){const s=t.XpG();t.R7$(),t.Y8G("disabled",s.loading),t.R7$(),t.SpI(" ",s.loading?"Loading...":"Load More Posts"," ")}}const S=[{path:"",component:(()=>{class r{constructor(s,o,n,i){this._changeDetectorRef=s,this._storageService=o,this._sanitizer=n,this.parseContent=i,this.posts=[],this.likes=[],this.hasMorePosts=!0,this.currentPage=1,this.loading=!1,this.myLikes=[],this.subscriptions=[]}ngOnInit(){this.loadInitialPosts(),this.subscribeToNewPosts()}loadInitialPosts(){var s=this;return(0,h.A)(function*(){s.loading=!0;try{for(let i=0;i<5;i++){const p=yield s._storageService.getAllPostsWithPagination(s.currentPage,10);if(p.length>0){const G=[...s.posts,...p].sort((T,M)=>M.created_at-T.created_at);s.posts=G;break}i<4&&(console.warn(`Attempt ${i+1} failed, retrying in 3s.`),yield s.delay(3e3))}s.hasMorePosts=s.posts.length>0,s.hasMorePosts||console.log("This user has no posts.")}catch(i){console.error("Error loading posts:",i)}finally{s.loading=!1,s._changeDetectorRef.detectChanges()}})()}delay(s){return new Promise(o=>setTimeout(o,s))}getSafeUrl(s){return this._sanitizer.bypassSecurityTrustUrl(s)}isSingleEmojiOrWord(s){const o=s.trim(),n=/^\w+$/.test(o),i=/^[\p{Emoji}]+$/u.test(o);return n||i}subscribeToNewPosts(){const s=this._storageService.posts$.subscribe(o=>{o&&(this.posts.unshift(o),this.posts.sort((n,i)=>i.created_at-n.created_at),this._changeDetectorRef.detectChanges())});this.subscriptions.push(s)}loadNextPage(){this.loading||(this.currentPage++,this.loadInitialPosts())}ngOnDestroy(){this.subscriptions.forEach(s=>s.unsubscribe())}trackByFn(s,o){return o.id||s}static{this.\u0275fac=function(o){return new(o||r)(t.rXU(t.gRc),t.rXU(w.n),t.rXU(C.up),t.rXU(E.m))}}static{this.\u0275cmp=t.VBU({type:r,selectors:[["help-center"]],decls:49,vars:6,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"dark","relative","overflow-hidden","bg-gray-800","px-4","pb-28","pt-8","dark:bg-gray-900","sm:px-16","sm:pb-48","sm:pt-20"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"pointer-events-none","absolute","inset-0"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],[1,"relative","z-10","flex","flex-col","items-center"],[1,"text-xl","font-semibold"],[1,"mt-1","text-center","text-4xl","font-extrabold","leading-tight","tracking-tight","sm:text-7xl"],[1,"text-secondary","mt-3","text-center","tracking-tight","sm:text-2xl"],[1,"angor-mat-rounded","angor-mat-bold","mt-10","w-full","max-w-80","sm:mt-20","sm:max-w-120",3,"subscriptSizing"],["matInput","",3,"placeholder"],["matPrefix","",3,"svgIcon"],[1,"flex","flex-col","items-center","px-6","pb-6","sm:px-10","sm:pb-10"],[1,"-mt-16","grid","w-full","max-w-sm","grid-cols-1","gap-y-8","sm:-mt-24","md:max-w-4xl","md:grid-cols-3","md:gap-x-6","md:gap-y-0"],[1,"bg-card","relative","flex","flex-col","overflow-hidden","rounded-2xl","shadow","transition-shadow","duration-150","ease-in-out","hover:shadow-lg"],[1,"flex","flex-auto","flex-col","items-center","p-8","text-center"],[1,"text-2xl","font-semibold"],[1,"flex","items-center","justify-center","bg-gray-50","px-8","py-4","text-primary-500","dark:border-t","dark:bg-transparent","dark:text-primary-400"],["role","button",1,"flex","items-center"],[1,"absolute","inset-0"],[1,"font-medium"],[1,"bg-card","relative","flex","flex-col","overflow-hidden","rounded-2xl","shadow","transition-shadow","duration-150","ease-in-out","hover:shadow-lg",3,"routerLink"],[1,"m-auto","mt-10","flex","w-full","max-w-140","flex-col","items-start"],[1,"mb-8","flex","w-full","flex-col",3,"item"],[1,"m-auto","mt-4","flex","justify-center"],["mat-raised-button","","color","primary",1,"bg-card","text-gray-700","hover:bg-gray-200","dark:text-gray-300","dark:hover:bg-gray-700",3,"click","disabled"]],template:function(o,n){1&o&&(t.j41(0,"div",0)(1,"div",1),t.qSk(),t.j41(2,"svg",2)(3,"g",3),t.nrm(4,"circle",4)(5,"circle",5),t.k0s()(),t.joV(),t.j41(6,"div",6)(7,"h2",7),t.EFF(8,"ANGOR HUB"),t.k0s(),t.j41(9,"div",8),t.EFF(10," Discover the Latest Project Updates "),t.k0s(),t.j41(11,"div",9),t.EFF(12," Browse through real-time events, insights, and updates from projects you follow or bookmark. "),t.k0s(),t.j41(13,"mat-form-field",10),t.nrm(14,"input",11)(15,"mat-icon",12),t.k0s()()(),t.j41(16,"div",13)(17,"div",14)(18,"div",15)(19,"div",16)(20,"div",17),t.EFF(21,"Latest Posts"),t.k0s()(),t.j41(22,"div",18)(23,"span",19),t.nrm(24,"span",20),t.j41(25,"span",21),t.EFF(26,"View Latest Posts"),t.k0s()()()(),t.j41(27,"div",15)(28,"div",16)(29,"div",17),t.EFF(30,"Followed Projects"),t.k0s()(),t.j41(31,"div",18)(32,"span",19),t.nrm(33,"span",20),t.j41(34,"span",21),t.EFF(35,"View Followed Projects"),t.k0s()()()(),t.j41(36,"div",22)(37,"div",16)(38,"div",17),t.EFF(39," Bookmarked Projects "),t.k0s()(),t.j41(40,"div",18)(41,"span",19),t.nrm(42,"span",20),t.j41(43,"span",21),t.EFF(44,"View Bookmarked Projects"),t.k0s()()()()(),t.j41(45,"div",23),t.Z7z(46,$,1,1,"app-post",24,t.Vm6),t.DNE(48,L,3,2,"div",25),t.k0s()()()),2&o&&(t.R7$(13),t.Y8G("subscriptSizing","dynamic"),t.R7$(),t.Y8G("placeholder","Search projects, events, or keywords"),t.R7$(),t.Y8G("svgIcon","heroicons_outline:magnifying-glass"),t.R7$(21),t.Y8G("routerLink",t.lJ4(5,R)),t.R7$(10),t.Dyx(n.posts),t.R7$(2),t.vxM(n.hasMorePosts?48:-1))},dependencies:[F.Wk,f.MD,v.YN,d.Hl,d.$z,x.w,u.MY,a.RG,a.rl,a.JW,m.fS,m.fg,c.m_,c.An,y.Cn,j.D6,b.uc,k.e,P.q],encapsulation:2})}}return r})()}]}}]);