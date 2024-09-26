"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[907],{5907:(W,x,n)=>{n.r(x),n.d(x,{default:()=>L});var l=n(467),m=n(8834),$=n(6600),j=n(2102),P=n(9213),y=n(9042),I=n(7575),C=n(2798),b=n(450),w=n(4823),D=n(5167),p=n(177),A=n(1413),S=n(6977),e=n(3953),F=n(9437),E=n(7673),B=n(1626),R=n(833),M=n(4224);let N=(()=>{class s{constructor(t,r,o){this.http=t,this.indexerService=r,this.indexedDBService=o,this.offset=0,this.limit=20,this.totalProjects=0,this.loading=!1,this.projects=[],this.noMoreProjects=!1,this.totalProjectsFetched=!1,this.selectedNetwork="testnet",this.loadNetwork()}loadNetwork(){this.selectedNetwork=this.indexerService.getNetwork()}fetchProjects(){var t=this;return(0,l.A)(function*(){if(t.loading||t.noMoreProjects)return[];t.loading=!0;const r=t.indexerService.getPrimaryIndexer(t.selectedNetwork),o=t.totalProjectsFetched?`${r}api/query/Angor/projects?offset=${t.offset}&limit=${t.limit}`:`${r}api/query/Angor/projects?limit=${t.limit}`;try{const i=yield t.http.get(o,{observe:"response"}).toPromise();if(!t.totalProjectsFetched&&i&&i.headers){const u=i.headers.get("pagination-total");t.totalProjects=u?+u:0,t.totalProjectsFetched=!0,t.offset=Math.max(t.totalProjects-t.limit,0)}const c=i?.body||[];if(!c.length)return t.noMoreProjects=!0,[];const a=c.filter(u=>!t.projects.some(f=>f.projectIdentifier===u.projectIdentifier));if(!a.length)return t.noMoreProjects=!0,[];const d=a.map(function(){var u=(0,l.A)(function*(f){yield t.indexedDBService.saveProject(f)});return function(f){return u.apply(this,arguments)}}()),h=a.map(function(){var u=(0,l.A)(function*(f){try{const v=yield t.indexedDBService.getProjectStats(f.projectIdentifier);return f.totalInvestmentsCount=v?.investorCount??0,f}catch(v){return console.error(`Error fetching details for project ${f.projectIdentifier}:`,v),f}});return function(f){return u.apply(this,arguments)}}());return yield Promise.all([...d,...h]),t.projects=[...t.projects,...a],t.offset=Math.max(t.offset-t.limit,0),a}catch(i){return console.error("Error fetching projects:",i),[]}finally{t.loading=!1}})()}fetchProjectStats(t){const o=`${this.indexerService.getPrimaryIndexer(this.selectedNetwork)}api/query/Angor/projects/${t}/stats`;return this.http.get(o).pipe((0,F.W)(i=>(console.error(`Error fetching stats for project ${t}:`,i),(0,E.of)({}))))}fetchAndSaveProjectStats(t){var r=this;return(0,l.A)(function*(){try{const o=yield r.fetchProjectStats(t).toPromise();return o&&(yield r.indexedDBService.saveProjectStats(t,o)),o}catch(o){return console.error(`Error fetching and saving stats for project ${t}:`,o),null}})()}fetchProjectDetails(t){const o=`${this.indexerService.getPrimaryIndexer(this.selectedNetwork)}api/query/Angor/projects/${t}`;return this.http.get(o).pipe((0,F.W)(i=>(console.error(`Error fetching details for project ${t}:`,i),(0,E.of)({}))))}fetchAndSaveProjectDetails(t){var r=this;return(0,l.A)(function*(){try{const o=yield r.fetchProjectDetails(t).toPromise();return o&&(yield r.indexedDBService.saveProject(o)),o}catch(o){return console.error(`Error fetching and saving details for project ${t}:`,o),null}})()}getAllProjectsFromDB(){var t=this;return(0,l.A)(function*(){return t.indexedDBService.getAllProjects()})()}getProjectStatsFromDB(t){var r=this;return(0,l.A)(function*(){return r.indexedDBService.getProjectStats(t)})()}getProjects(){return this.projects}resetProjects(){this.projects=[],this.noMoreProjects=!1,this.offset=0,this.totalProjectsFetched=!1}static#t=this.\u0275fac=function(r){return new(r||s)(e.KVO(B.Qq),e.KVO(R.F),e.KVO(M.n))};static#e=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var U=n(33),k=n(4412);let T=(()=>{class s{constructor(){this.projects=[],this.projectsSubject=new k.t([])}getProjectsObservable(){return this.projectsSubject.asObservable()}setProjects(t){this.projects=t,this.projectsSubject.next(this.projects)}getProjects(){return this.projects}hasProjects(){return this.projects.length>0}updateProject(t){const r=this.projects.findIndex(o=>o.nostrPubKey===t.nostrPubKey);r>-1?this.projects[r]=t:this.projects.push(t),this.projectsSubject.next(this.projects)}getProjectByPubKey(t){return this.projects.find(r=>r.nostrPubKey===t)}static#t=this.\u0275fac=function(r){return new(r||s)};static#e=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var K=n(1553),G=n(345);const Y=()=>[],V=s=>({"-ml-3":s});function O(s,g){if(1&s&&(e.qex(0),e.nrm(1,"img",41),e.bVm()),2&s){const t=g.index,r=e.XpG().$implicit;e.R7$(),e.Mz_("alt","Investor avatar ",t+1,""),e.Y8G("ngClass",e.eq3(4,V,r.totalInvestmentsCount>1&&t>0))("src","images/avatars/avatar-placeholder.png",e.B4B)}}function z(s,g){if(1&s&&(e.qex(0),e.j41(1,"angor-card",24)(2,"div",25),e.nrm(3,"img",26),e.k0s(),e.j41(4,"div",27)(5,"div",28),e.nrm(6,"img",29),e.k0s()(),e.j41(7,"div",30)(8,"div",31)(9,"div",32)(10,"div",33),e.EFF(11),e.k0s(),e.j41(12,"div",34),e.EFF(13),e.k0s()(),e.j41(14,"div",35)(15,"button",36),e.nrm(16,"mat-icon",37),e.k0s()()(),e.nrm(17,"hr",38),e.j41(18,"div",31)(19,"div",39),e.EFF(20),e.k0s(),e.j41(21,"div",40),e.DNE(22,O,2,6,"ng-container",20),e.k0s()()()(),e.bVm()),2&s){const t=g.$implicit,r=e.XpG();e.R7$(3),e.Y8G("src",r.getSafeUrl(null==t?null:t.banner,!0)||"images/pages/profile/cover.jpg",e.B4B),e.R7$(3),e.Y8G("src",r.getSafeUrl(null==t?null:t.picture,!1)||"images/avatars/avatar-placeholder.png",e.B4B),e.R7$(5),e.SpI(" ",t.displayName||t.nostrPubKey," "),e.R7$(2),e.SpI(" ",t.about||"No description available"," "),e.R7$(3),e.Y8G("svgIcon","heroicons_solid:user-plus"),e.R7$(4),e.SpI(" ",t.totalInvestmentsCount||0," investors "),e.R7$(2),e.Y8G("ngForOf",e.lJ4(7,Y).constructor(t.totalInvestmentsCount||0))}}function X(s,g){if(1&s&&(e.j41(0,"div",42),e.EFF(1),e.k0s()),2&s){const t=e.XpG();e.R7$(),e.SpI(" ",t.errorMessage," ")}}const L=[{path:"",component:(()=>{class s{constructor(t,r,o,i,c,a,d){this.projectService=t,this.router=r,this.stateService=o,this.metadataService=i,this.indexedDBService=c,this.changeDetectorRef=a,this.sanitizer=d,this.projects=[],this.errorMessage="",this.loading=!1,this.metadataLoadLimit=5,this._unsubscribeAll=new A.B,this.filteredProjects=[]}ngOnInit(){var t=this;return(0,l.A)(function*(){t.loadInitialProjects(),t.subscribeToMetadataUpdates()})()}loadInitialProjects(){var t=this;return(0,l.A)(function*(){try{if(t.loading=!0,t.projects=t.stateService.getProjects(),0===t.projects.length)yield t.loadProjectsFromService();else{t.filteredProjects=[...t.projects];const r=t.getProjectsWithoutMetadata();r.length>0&&(yield t.loadMetadataForProjects(r))}}catch{t.handleError("Error loading initial projects")}finally{t.loading=!1,t.changeDetectorRef.detectChanges()}})()}loadProjectsFromService(){var t=this;return(0,l.A)(function*(){try{const r=yield t.projectService.fetchProjects();if(0===r.length)return void(t.errorMessage="No projects found");t.projects=r,t.filteredProjects=[...t.projects],t.stateService.setProjects(t.projects);const o=r.map(i=>i.nostrPubKey);yield t.loadMetadataForProjects(o)}catch{t.handleError("Error fetching projects from service")}})()}subscribeToMetadataUpdates(){this.indexedDBService.getMetadataStream().pipe((0,S.Q)(this._unsubscribeAll)).subscribe(t=>{if(t){const r=this.projects.find(o=>o.nostrPubKey===t.pubkey);r&&this.updateProjectMetadata(r,t.metadata)}})}getProjectsWithoutMetadata(){return this.projects.filter(t=>!t.displayName||!t.about).map(t=>t.nostrPubKey)}loadMetadataForProjects(t){var r=this;return(0,l.A)(function*(){const o=t.map(function(){var a=(0,l.A)(function*(d){const h=yield r.indexedDBService.getUserMetadata(d);return h?{pubkey:d,metadata:h}:null});return function(d){return a.apply(this,arguments)}}()),i=yield Promise.all(o),c=i.filter(a=>null===a).map((a,d)=>t[d]);i.forEach(a=>{if(a&&a.metadata){const d=r.projects.find(h=>h.nostrPubKey===a.pubkey);d&&r.updateProjectMetadata(d,a.metadata)}}),c.length>0&&(yield r.metadataService.fetchMetadataForMultipleKeys(c).then(a=>{a.forEach(d=>{const h=r.projects.find(u=>u.nostrPubKey===d.pubkey);h&&r.updateProjectMetadata(h,d)}),r.changeDetectorRef.detectChanges()}).catch(a=>{console.error("Error fetching metadata for projects:",a)}))})()}loadProjects(){var t=this;return(0,l.A)(function*(){t.loading||"No more projects found"===t.errorMessage||(t.loading=!0,t.projectService.fetchProjects().then(function(){var r=(0,l.A)(function*(o){if(0===o.length&&0===t.projects.length)t.errorMessage="No projects found";else if(0===o.length)t.errorMessage="No more projects found";else{t.projects=[...t.projects,...o],t.filteredProjects=[...t.projects];const i=o.map(c=>c.nostrPubKey);yield t.loadMetadataForProjects(i),t.stateService.setProjects(t.projects),t.projects.forEach(c=>t.subscribeToProjectMetadata(c))}t.loading=!1,t.changeDetectorRef.detectChanges()});return function(o){return r.apply(this,arguments)}}()).catch(r=>{console.error("Error fetching projects:",r),t.errorMessage="Error fetching projects. Please try again later.",t.loading=!1,t.changeDetectorRef.detectChanges()}))})()}loadMetadataForProject(t){var r=this;return(0,l.A)(function*(){try{const o=yield r.metadataService.fetchMetadataWithCache(t.nostrPubKey);o?r.updateProjectMetadata(t,o):console.warn(`No metadata found for project ${t.nostrPubKey}`)}catch(o){console.error(`Error fetching metadata for project ${t.nostrPubKey}:`,o)}})()}updateProjectMetadata(t,r){const o={...t,displayName:r.name||"",about:r.about?r.about.replace(/<\/?[^>]+(>|$)/g,""):"",picture:r.picture||"",banner:r.banner||""},i=this.projects.findIndex(c=>c.projectIdentifier===t.projectIdentifier);-1!==i&&(this.projects[i]=o,this.projects=[...this.projects]),this.filteredProjects=[...this.projects],this.changeDetectorRef.detectChanges()}subscribeToProjectMetadata(t){this.metadataService.getMetadataStream().pipe((0,S.Q)(this._unsubscribeAll)).subscribe(r=>{r&&r.pubkey===t.nostrPubKey&&this.updateProjectMetadata(t,r.metadata)})}goToProjectDetails(t){this.router.navigate(["/projects",t.projectIdentifier])}filterByQuery(t){this.filteredProjects=t?this.projects.filter(r=>r.displayName?.toLowerCase().includes(t.toLowerCase())||r.about?.toLowerCase().includes(t.toLowerCase())):[...this.projects]}toggleCompleted(t){}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}handleError(t){console.error(t),this.errorMessage=t,this.loading=!1,this.changeDetectorRef.detectChanges()}getSafeUrl(t,r){return t&&"string"==typeof t&&this.isImageUrl(t)?this.sanitizer.bypassSecurityTrustUrl(t):this.sanitizer.bypassSecurityTrustUrl(r?"/images/pages/profile/cover.jpg":"images/avatars/avatar-placeholder.png")}isImageUrl(t){return/\.(jpeg|jpg|gif|png|svg|bmp|webp|tiff|ico)$/i.test(t)}static#t=this.\u0275fac=function(r){return new(r||s)(e.rXU(N),e.rXU(U.Ix),e.rXU(T),e.rXU(K.T),e.rXU(M.n),e.rXU(e.gRc),e.rXU(G.up))};static#e=this.\u0275cmp=e.VBU({type:s,selectors:[["explore"]],standalone:!0,features:[e.aNF],decls:29,vars:7,consts:[["query",""],[1,"absolute","inset-0","flex","min-w-0","flex-col","overflow-y-auto"],[1,"dark","relative","flex-0","overflow-hidden","bg-gray-800","px-4","py-8","sm:p-16"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],[1,"relative","z-10","flex","flex-col","items-center"],[1,"text-xl","font-semibold"],[1,"mt-1","text-center","text-4xl","font-extrabold","leading-tight","tracking-tight","sm:text-7xl"],[1,"text-secondary","mt-6","max-w-2xl","text-center","tracking-tight","sm:text-2xl"],[1,"p-6","sm:p-10"],[1,"mx-auto","flex","w-full","max-w-xs","flex-auto","flex-col","sm:max-w-5xl"],[1,"flex","w-full","max-w-xs","flex-col","items-center","justify-between","sm:max-w-none","sm:flex-row"],[1,"mt-4","w-full","sm:mt-0","sm:w-72",3,"subscriptSizing"],["matPrefix","",1,"icon-size-5",3,"svgIcon"],["placeholder","Search ...","matInput","",3,"input"],[1,"mt-8","sm:ml-auto","sm:mt-0",3,"change","color"],[1,"mx-auto","flex","w-full","flex-auto","flex-col","sm:max-w-5xl"],[1,"grid","w-full","min-w-0","grid-cols-1","gap-6","sm:grid-cols-1","md:grid-cols-1","lg:grid-cols-2","mt-10"],[4,"ngFor","ngForOf"],[1,"flex","justify-center","mt-10"],["mat-raised-button","","color","primary",3,"click","disabled"],["class","error-message",4,"ngIf"],[1,"filter-info","flex","w-full","flex-col"],[1,"flex","h-32"],["onerror","this.onerror=null; this.src='/images/pages/profile/cover.jpg';","alt","Card cover image",1,"object-cover",3,"src"],[1,"flex","px-8"],[1,"bg-card","-mt-12","rounded-full","p-1"],["onerror","this.onerror=null; this.src='/images/avatars/avatar-placeholder.png';","alt","Project logo",1,"h-24","w-24","rounded-full","object-cover",3,"src"],[1,"flex","flex-col","px-8","pb-6","pt-4"],[1,"flex","items-center","justify-between"],[1,"mr-4","flex-1","min-w-0"],[1,"text-2xl","font-semibold","leading-tight","truncate"],[1,"text-secondary","mt-1","leading-tight","truncate"],[1,"flex","h-10","w-10","items-center","justify-center","rounded-full","border"],["mat-icon-button",""],[1,"icon-size-5",3,"svgIcon"],[1,"my-6","w-full","border-t"],[1,"text-secondary","mr-3","text-md","font-medium"],[1,"flex","items-center"],[1,"text-card","ring-bg-card","m-0.5","h-6","w-6","rounded-full","ring-2",3,"ngClass","src","alt"],[1,"error-message"]],template:function(r,o){if(1&r){const i=e.RV6();e.j41(0,"div",1)(1,"div",2),e.qSk(),e.j41(2,"svg",3)(3,"g",4),e.nrm(4,"circle",5)(5,"circle",6),e.k0s()(),e.joV(),e.j41(6,"div",7)(7,"h2",8),e.EFF(8,"Explore Projects"),e.k0s(),e.j41(9,"div",9),e.EFF(10," What\u2019s your next investment? "),e.k0s(),e.j41(11,"div",10),e.EFF(12," Check out our projects and find your next investment opportunity. "),e.k0s()()(),e.j41(13,"div",11)(14,"div",12)(15,"div",13)(16,"mat-form-field",14),e.nrm(17,"mat-icon",15),e.j41(18,"input",16,0),e.bIt("input",function(){e.eBV(i);const a=e.sdS(19);return e.Njj(o.filterByQuery(a.value))}),e.k0s()(),e.j41(20,"mat-slide-toggle",17),e.bIt("change",function(a){return e.eBV(i),e.Njj(o.toggleCompleted(a))}),e.EFF(21," Hide completed "),e.k0s()()(),e.j41(22,"div",18)(23,"div",19),e.DNE(24,z,23,8,"ng-container",20),e.k0s(),e.j41(25,"div",21)(26,"button",22),e.bIt("click",function(){return e.eBV(i),e.Njj(o.loadProjects())}),e.EFF(27),e.k0s()(),e.DNE(28,X,2,1,"div",23),e.k0s()()()}2&r&&(e.R7$(16),e.Y8G("subscriptSizing","dynamic"),e.R7$(),e.Y8G("svgIcon","heroicons_solid:magnifying-glass"),e.R7$(3),e.Y8G("color","primary"),e.R7$(4),e.Y8G("ngForOf",o.projects),e.R7$(2),e.Y8G("disabled",o.loading),e.R7$(),e.SpI(" ",o.loading?"Loading...":"Load More Projects"," "),e.R7$(),e.Y8G("ngIf",!o.loading&&o.errorMessage))},dependencies:[m.Hl,m.$z,m.iY,P.m_,P.An,D.n,j.RG,j.rl,j.JW,C.Ve,$.Sy,y.fS,y.fg,b.mV,b.sG,p.YU,w.uc,I.PO,p.MD,p.Sq,p.bT],encapsulation:2})}return s})()}]}}]);