"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[859],{7859:(Q,y,r)=>{r.d(y,{UG:()=>W});var a=r(3107),S=r(9471),m=r(8447),E=r(4460),l=r(1204),_=r(6192),p=r(8559),C=r(2147),k=r(6520),v=r(9666),x=r(5424);function D(i,d){if(1&i){const t=a.RV6();a.j41(0,"div",1)(1,"button",2),a.bIt("click",function(){a.eBV(t);const n=a.XpG();return a.Njj(n.action())}),a.EFF(2),a.k0s()()}if(2&i){const t=a.XpG();a.R7$(2),a.SpI(" ",t.data.action," ")}}const R=["label"];function T(i,d){}const O=Math.pow(2,31)-1;class f{_overlayRef;instance;containerInstance;_afterDismissed=new m.B;_afterOpened=new m.B;_onAction=new m.B;_durationTimeoutId;_dismissedByAction=!1;constructor(d,t){this._overlayRef=t,this.containerInstance=d,d._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(d){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(d,O))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}}const b=new a.nKC("MatSnackBarData");class u{politeness="assertive";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"}let g=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=a.FsC({type:i,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return i})(),B=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=a.FsC({type:i,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return i})(),A=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=a.FsC({type:i,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return i})(),w=(()=>{class i{snackBarRef=(0,a.WQX)(f);data=(0,a.WQX)(b);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=a.VBU({type:i,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(e,n){1&e&&(a.j41(0,"div",0),a.EFF(1),a.k0s(),a.DNE(2,D,3,1,"div",1)),2&e&&(a.R7$(),a.SpI(" ",n.data.message,"\n"),a.R7$(),a.vxM(n.hasAction?2:-1))},dependencies:[S.$z,g,B,A],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0})}return i})();const P={snackBarState:(0,l.hZ)("state",[(0,l.wk)("void, hidden",(0,l.iF)({transform:"scale(0.8)",opacity:0})),(0,l.wk)("visible",(0,l.iF)({transform:"scale(1)",opacity:1})),(0,l.kY)("* => visible",(0,l.i0)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,l.kY)("* => void, * => hidden",(0,l.i0)("75ms cubic-bezier(0.4, 0.0, 1, 1)",(0,l.iF)({opacity:0})))])};let M=(()=>{class i extends _.lb{_ngZone=(0,a.WQX)(a.SKi);_elementRef=(0,a.WQX)(a.aKT);_changeDetectorRef=(0,a.WQX)(a.gRc);_platform=(0,a.WQX)(C.OD);snackBarConfig=(0,a.WQX)(u);_document=(0,a.WQX)(E.qQ);_trackedModals=new Set;_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new m.B;_onExit=new m.B;_onEnter=new m.B;_animationState="void";_live;_label;_role;_liveElementId=(0,a.WQX)(p.g7).getId("mat-snack-bar-container-live-");constructor(){super();const t=this.snackBarConfig;this._live="assertive"!==t.politeness||t.announcementMessage?"off"===t.politeness?"off":"polite":"assertive",this._platform.FIREFOX&&("polite"===this._live&&(this._role="status"),"assertive"===this._live&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();const e=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),e}attachTemplatePortal(t){this._assertNotAttached();const e=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),e}attachDomPortal=t=>{this._assertNotAttached();const e=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),e};onAnimationEnd(t){const{fromState:e,toState:n}=t;if(("void"===n&&"void"!==e||"hidden"===n)&&this._completeExit(),"visible"===n){const s=this._onEnter;this._ngZone.run(()=>{s.next(),s.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){const t=this._elementRef.nativeElement,e=this.snackBarConfig.panelClass;e&&(Array.isArray(e)?e.forEach(o=>t.classList.add(o)):t.classList.add(e)),this._exposeToModals();const n=this._label.nativeElement,s="mdc-snackbar__label";n.classList.toggle(s,!n.querySelector(`.${s}`))}_exposeToModals(){const t=this._liveElementId,e=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let n=0;n<e.length;n++){const s=e[n],o=s.getAttribute("aria-owns");this._trackedModals.add(s),o?-1===o.indexOf(t)&&s.setAttribute("aria-owns",o+" "+t):s.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{const e=t.getAttribute("aria-owns");if(e){const n=e.replace(this._liveElementId,"").trim();n.length>0?t.setAttribute("aria-owns",n):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{const t=this._elementRef.nativeElement.querySelector("[aria-hidden]"),e=this._elementRef.nativeElement.querySelector("[aria-live]");if(t&&e){let n=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(n=document.activeElement),t.removeAttribute("aria-hidden"),e.appendChild(t),n?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=a.VBU({type:i,selectors:[["mat-snack-bar-container"]],viewQuery:function(e,n){if(1&e&&(a.GBs(_.I3,7),a.GBs(R,7)),2&e){let s;a.mGM(s=a.lsd())&&(n._portalOutlet=s.first),a.mGM(s=a.lsd())&&(n._label=s.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:1,hostBindings:function(e,n){1&e&&a.Kam("@state.done",function(o){return n.onAnimationEnd(o)}),2&e&&a.zvX("@state",n._animationState)},features:[a.Vt3],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(e,n){1&e&&(a.j41(0,"div",1)(1,"div",2,0)(3,"div",3),a.DNE(4,T,0,0,"ng-template",4),a.k0s(),a.nrm(5,"div"),a.k0s()()),2&e&&(a.R7$(5),a.BMQ("aria-live",n._live)("role",n._role)("id",n._liveElementId))},dependencies:[_.I3],styles:[".mat-mdc-snack-bar-container{display:flex;align-items:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);margin:8px}.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container{width:100vw}.mat-mdc-snackbar-surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;padding-left:0;padding-right:8px}[dir=rtl] .mat-mdc-snackbar-surface{padding-right:0;padding-left:8px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{min-width:344px;max-width:672px}.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface{width:100%;min-width:0}@media(forced-colors: active){.mat-mdc-snackbar-surface{outline:solid 1px}}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{color:var(--mdc-snackbar-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mdc-snackbar-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--mdc-snackbar-container-color, var(--mat-sys-inverse-surface))}.mdc-snackbar__label{width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding:14px 8px 14px 16px}[dir=rtl] .mdc-snackbar__label{padding-left:8px;padding-right:16px}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-family:var(--mdc-snackbar-supporting-text-font, var(--mat-sys-body-medium-font));font-size:var(--mdc-snackbar-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mdc-snackbar-supporting-text-weight, var(--mat-sys-body-medium-weight));line-height:var(--mdc-snackbar-supporting-text-line-height, var(--mat-sys-body-medium-line-height))}.mat-mdc-snack-bar-actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed{color:var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary))}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}"],encapsulation:2,data:{animation:[P.snackBarState]}})}return i})();const F=new a.nKC("mat-snack-bar-default-options",{providedIn:"root",factory:function I(){return new u}});let W=(()=>{class i{_overlay=(0,a.WQX)(v.hJ);_live=(0,a.WQX)(p.Ai);_injector=(0,a.WQX)(a.zZn);_breakpointObserver=(0,a.WQX)(k.QP);_parentSnackBar=(0,a.WQX)(i,{optional:!0,skipSelf:!0});_defaultConfig=(0,a.WQX)(F);_snackBarRefAtThisLevel=null;simpleSnackBarComponent=w;snackBarContainerComponent=M;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){const t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(){}openFromComponent(t,e){return this._attach(t,e)}openFromTemplate(t,e){return this._attach(t,e)}open(t,e="",n){const s={...this._defaultConfig,...n};return s.data={message:t,action:e},s.announcementMessage===t&&(s.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,s)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,e){const s=a.zZn.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:u,useValue:e}]}),o=new _.A8(this.snackBarContainerComponent,e.viewContainerRef,s),c=t.attach(o);return c.instance.snackBarConfig=e,c.instance}_attach(t,e){const n={...new u,...this._defaultConfig,...e},s=this._createOverlay(n),o=this._attachSnackBarContainer(s,n),c=new f(o,s);if(t instanceof a.C4Q){const h=new _.VA(t,null,{$implicit:n.data,snackBarRef:c});c.instance=o.attachTemplatePortal(h)}else{const h=this._createInjector(n,c),L=new _.A8(t,void 0,h),j=o.attachComponentPortal(L);c.instance=j.instance}return this._breakpointObserver.observe(k.Rp.HandsetPortrait).pipe((0,x.Q)(s.detachments())).subscribe(h=>{s.overlayElement.classList.toggle(this.handsetCssClass,h.matches)}),n.announcementMessage&&o._onAnnounce.subscribe(()=>{this._live.announce(n.announcementMessage,n.politeness)}),this._animateSnackBar(c,n),this._openedSnackBarRef=c,this._openedSnackBarRef}_animateSnackBar(t,e){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),e.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter(),e.duration&&e.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(e.duration))}_createOverlay(t){const e=new v.rR;e.direction=t.direction;let n=this._overlay.position().global();const s="rtl"===t.direction,o="left"===t.horizontalPosition||"start"===t.horizontalPosition&&!s||"end"===t.horizontalPosition&&s,c=!o&&"center"!==t.horizontalPosition;return o?n.left("0"):c?n.right("0"):n.centerHorizontally(),"top"===t.verticalPosition?n.top("0"):n.bottom("0"),e.positionStrategy=n,this._overlay.create(e)}_createInjector(t,e){return a.zZn.create({parent:t&&t.viewContainerRef&&t.viewContainerRef.injector||this._injector,providers:[{provide:f,useValue:e},{provide:b,useValue:t.data}]})}static \u0275fac=function(e){return new(e||i)};static \u0275prov=a.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})()}}]);