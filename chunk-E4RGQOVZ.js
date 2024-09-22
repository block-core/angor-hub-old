import{g as tt,h as It,i as xt,j as O,k as T,m as wt,n as q,o as y,p as f,s as Y}from"./chunk-GNRKVAXP.js";import{C as $,D as Tt,E as X,H as J,a as Ot,g as V,j as z,l as K,x as G,y as H}from"./chunk-WAJLGJ7N.js";import{$ as _,A as lt,B as C,Da as c,Fa as mt,G as k,Ib as B,Oa as P,P as E,Qa as M,Ta as ut,Ua as A,X as R,Xa as pt,Xb as Dt,Y as F,Z as p,_ as d,a as m,b as st,ca as L,cc as N,da as S,db as gt,dc as At,ea as ct,eb as ft,ia as dt,k as u,kb as _t,mb as vt,pa as g,q as rt,qa as ht,ra as j,ta as D,ub as yt,vb as bt,w,wb as Ct,xa as Z}from"./chunk-JPYWSOXJ.js";function Vt(n,i){}var v=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}};var at=(()=>{let i=class i extends xt{constructor(t,e,a,o,l,r,h,b){super(),this._elementRef=t,this._focusTrapFactory=e,this._config=o,this._interactivityChecker=l,this._ngZone=r,this._overlayRef=h,this._focusMonitor=b,this._platform=_(Ot),this._focusTrap=null,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this._changeDetectorRef=_(Dt),this._injector=_(g),this._isDestroyed=!1,this.attachDomPortal=U=>{this._portalOutlet.hasAttached();let Pt=this._portalOutlet.attachDomPortal(U);return this._contentAttached(),Pt},this._document=a,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(t){this._ariaLabelledByQueue.push(t),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(t){let e=this._ariaLabelledByQueue.indexOf(t);e>-1&&(this._ariaLabelledByQueue.splice(e,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),e}attachTemplatePortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),e}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let a=()=>{t.removeEventListener("blur",a),t.removeEventListener("mousedown",a),t.removeAttribute("tabindex")};t.addEventListener("blur",a),t.addEventListener("mousedown",a)})),t.focus(e)}_focusByCssSelector(t,e){let a=this._elementRef.nativeElement.querySelector(t);a&&this._forceFocus(a,e)}_trapFocus(){this._isDestroyed||ut(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let t=this._config.restoreFocus,e=null;if(typeof t=="string"?e=this._document.querySelector(t):typeof t=="boolean"?e=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(e=t),this._config.restoreFocus&&e&&typeof e.focus=="function"){let a=V(),o=this._elementRef.nativeElement;(!a||a===this._document.body||a===o||o.contains(a))&&(this._focusMonitor?(this._focusMonitor.focusVia(e,this._closeInteractionType),this._closeInteractionType=null):e.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let t=this._elementRef.nativeElement,e=V();return t===e||t.contains(e)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=V()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}};i.\u0275fac=function(e){return new(e||i)(c(D),c(H),c(N,8),c(v),c(G),c(j),c(y),c($))},i.\u0275cmp=L({type:i,selectors:[["cdk-dialog-container"]],viewQuery:function(e,a){if(e&1&&yt(O,7),e&2){let o;bt(o=Ct())&&(a._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(e,a){e&2&&A("id",a._config.id||null)("role",a._config.role)("aria-modal",a._config.ariaModal)("aria-labelledby",a._config.ariaLabel?null:a._ariaLabelledByQueue[0])("aria-label",a._config.ariaLabel)("aria-describedby",a._config.ariaDescribedBy||null)},standalone:!0,features:[P,B],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(e,a){e&1&&M(0,Vt,0,0,"ng-template",0)},dependencies:[O],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2});let n=i;return n})(),I=class{constructor(i,s){this.overlayRef=i,this.config=s,this.closed=new u,this.disableClose=s.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=s.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!z(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=i.detachments().subscribe(()=>{s.closeOnOverlayDetachments!==!1&&this.close()})}close(i,s){if(this.containerInstance){let t=this.closed;this.containerInstance._closeInteractionType=s?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(i),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i="",s=""){return this.overlayRef.updateSize({width:i,height:s}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}},zt=new p("DialogScrollStrategy",{providedIn:"root",factory:()=>{let n=_(f);return()=>n.scrollStrategies.block()}}),Gt=new p("DialogData"),Ht=new p("DefaultDialogConfig");var $t=0,nt=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(t,e,a,o,l,r){this._overlay=t,this._injector=e,this._defaultOptions=a,this._parentDialog=o,this._overlayContainer=l,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new u,this._afterOpenedAtThisLevel=new u,this._ariaHiddenElements=new Map,this.afterAllClosed=w(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(E(void 0))),this._scrollStrategy=r}open(t,e){let a=this._defaultOptions||new v;e=m(m({},a),e),e.id=e.id||`cdk-dialog-${$t++}`,e.id&&this.getDialogById(e.id);let o=this._getOverlayConfig(e),l=this._overlay.create(o),r=new I(l,e),h=this._attachContainer(l,r,e);return r.containerInstance=h,this._attachDialogContent(t,r,h,e),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(r),r.closed.subscribe(()=>this._removeOpenDialog(r,!0)),this.afterOpened.next(r),r}closeAll(){et(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){et(this._openDialogsAtThisLevel,t=>{t.config.closeOnDestroy===!1&&this._removeOpenDialog(t,!1)}),et(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){let e=new wt({positionStrategy:t.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachContainer(t,e,a){let o=a.injector||a.viewContainerRef?.injector,l=[{provide:v,useValue:a},{provide:I,useValue:e},{provide:y,useValue:t}],r;a.container?typeof a.container=="function"?r=a.container:(r=a.container.type,l.push(...a.container.providers(a))):r=at;let h=new tt(r,a.viewContainerRef,g.create({parent:o||this._injector,providers:l}),a.componentFactoryResolver);return t.attach(h).instance}_attachDialogContent(t,e,a,o){if(t instanceof mt){let l=this._createInjector(o,e,a,void 0),r={$implicit:o.data,dialogRef:e};o.templateContext&&(r=m(m({},r),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),a.attachTemplatePortal(new It(t,null,r,l))}else{let l=this._createInjector(o,e,a,this._injector),r=a.attachComponentPortal(new tt(t,o.viewContainerRef,l,o.componentFactoryResolver));e.componentRef=r,e.componentInstance=r.instance}}_createInjector(t,e,a,o){let l=t.injector||t.viewContainerRef?.injector,r=[{provide:Gt,useValue:t.data},{provide:I,useValue:e}];return t.providers&&(typeof t.providers=="function"?r.push(...t.providers(e,t,a)):r.push(...t.providers)),t.direction&&(!l||!l.get(X,null,{optional:!0}))&&r.push({provide:X,useValue:{value:t.direction,change:rt()}}),g.create({parent:l||o,providers:r})}_removeOpenDialog(t,e){let a=this.openDialogs.indexOf(t);a>-1&&(this.openDialogs.splice(a,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,l)=>{o?l.setAttribute("aria-hidden",o):l.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),e&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let t=this._overlayContainer.getContainerElement();if(t.parentElement){let e=t.parentElement.children;for(let a=e.length-1;a>-1;a--){let o=e[a];o!==t&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}};i.\u0275fac=function(e){return new(e||i)(d(f),d(g),d(Ht,8),d(i,12),d(q),d(zt))},i.\u0275prov=R({token:i,factory:i.\u0275fac,providedIn:"root"});let n=i;return n})();function et(n,i){let s=n.length;for(;s--;)i(n[s])}var kt=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=S({type:i}),i.\u0275inj=F({providers:[nt],imports:[Y,T,Tt,T]});let n=i;return n})();function qt(n,i){}var x=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0}},ot="mdc-dialog--open",Et="mdc-dialog--opening",Rt="mdc-dialog--closing",Yt=150,Qt=75,Wt=(()=>{let i=class i extends at{constructor(t,e,a,o,l,r,h,b,U){super(t,e,a,o,l,r,h,U),this._animationMode=b,this._animationStateChanged=new ht,this._animationsEnabled=this._animationMode!=="NoopAnimations",this._actionSectionCount=0,this._hostElement=this._elementRef.nativeElement,this._enterAnimationDuration=this._animationsEnabled?Lt(this._config.enterAnimationDuration)??Yt:0,this._exitAnimationDuration=this._animationsEnabled?Lt(this._config.exitAnimationDuration)??Qt:0,this._animationTimer=null,this._finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)},this._finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})}}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Ft,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Et,ot)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(ot),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(ot),this._animationsEnabled?(this._hostElement.style.setProperty(Ft,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Rt)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck()}_clearAnimationClasses(){this._hostElement.classList.remove(Et,Rt)}_waitForAnimationToComplete(t,e){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(e,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(t):t()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(t){let e=super.attachComponentPortal(t);return e.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),e}};i.\u0275fac=function(e){return new(e||i)(c(D),c(H),c(N,8),c(x),c(G),c(j),c(y),c(Z,8),c($))},i.\u0275cmp=L({type:i,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(e,a){e&2&&(_t("id",a._config.id),A("aria-modal",a._config.ariaModal)("role",a._config.role)("aria-labelledby",a._config.ariaLabel?null:a._ariaLabelledByQueue[0])("aria-label",a._config.ariaLabel)("aria-describedby",a._config.ariaDescribedBy||null),pt("_mat-animation-noopable",!a._animationsEnabled)("mat-mdc-dialog-container-with-actions",a._actionSectionCount>0))},standalone:!0,features:[P,B],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(e,a){e&1&&(gt(0,"div",0)(1,"div",1),M(2,qt,0,0,"ng-template",2),ft()())},dependencies:[O],styles:['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 80vw);min-width:var(--mat-dialog-container-min-width, 0)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, 80vw)}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12));border-radius:var(--mdc-dialog-container-shape, var(--mat-app-corner-extra-large, 4px));background-color:var(--mdc-dialog-container-color, var(--mat-app-surface, white))}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 0 24px 9px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, var(--mat-app-on-surface, rgba(0, 0, 0, 0.87)));font-family:var(--mdc-dialog-subhead-font, var(--mat-app-headline-small-font, inherit));line-height:var(--mdc-dialog-subhead-line-height, var(--mat-app-headline-small-line-height, 1.5rem));font-size:var(--mdc-dialog-subhead-size, var(--mat-app-headline-small-size, 1rem));font-weight:var(--mdc-dialog-subhead-weight, var(--mat-app-headline-small-weight, 400));letter-spacing:var(--mdc-dialog-subhead-tracking, var(--mat-app-headline-small-tracking, 0.03125em))}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, var(--mat-app-on-surface-variant, rgba(0, 0, 0, 0.6)));font-family:var(--mdc-dialog-supporting-text-font, var(--mat-app-body-medium-font, inherit));line-height:var(--mdc-dialog-supporting-text-line-height, var(--mat-app-body-medium-line-height, 1.5rem));font-size:var(--mdc-dialog-supporting-text-size, var(--mat-app-body-medium-size, 1rem));font-weight:var(--mdc-dialog-supporting-text-weight, var(--mat-app-body-medium-weight, 400));letter-spacing:var(--mdc-dialog-supporting-text-tracking, var(--mat-app-body-medium-tracking, 0.03125em))}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 8px);justify-content:var(--mat-dialog-actions-alignment, start)}.cdk-high-contrast-active .mat-mdc-dialog-actions{border-top-color:CanvasText}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}'],encapsulation:2});let n=i;return n})(),Ft="--mat-dialog-transition-duration";function Lt(n){return n==null?null:typeof n=="number"?n:n.endsWith("ms")?K(n.substring(0,n.length-2)):n.endsWith("s")?K(n.substring(0,n.length-1))*1e3:n==="0"?0:null}var Q=function(n){return n[n.OPEN=0]="OPEN",n[n.CLOSING=1]="CLOSING",n[n.CLOSED=2]="CLOSED",n}(Q||{}),W=class{constructor(i,s,t){this._ref=i,this._containerInstance=t,this._afterOpened=new u,this._beforeClosed=new u,this._state=Q.OPEN,this.disableClose=s.disableClose,this.id=i.id,i.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(C(e=>e.state==="opened"),k(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(C(e=>e.state==="closed"),k(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),lt(this.backdropClick(),this.keydownEvents().pipe(C(e=>e.keyCode===27&&!this.disableClose&&!z(e)))).subscribe(e=>{this.disableClose||(e.preventDefault(),St(this,e.type==="keydown"?"keyboard":"mouse"))})}close(i){this._result=i,this._containerInstance._animationStateChanged.pipe(C(s=>s.state==="closing"),k(1)).subscribe(s=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),s.totalTime+100)}),this._state=Q.CLOSING,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let s=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?s.left(i.left):s.right(i.right):s.centerHorizontally(),i&&(i.top||i.bottom)?i.top?s.top(i.top):s.bottom(i.bottom):s.centerVertically(),this._ref.updatePosition(),this}updateSize(i="",s=""){return this._ref.updateSize(i,s),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=Q.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function St(n,i,s){return n._closeInteractionType=i,n.close(s)}var Ut=new p("MatMdcDialogData"),Zt=new p("mat-mdc-dialog-default-options"),Kt=new p("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let n=_(f);return()=>n.scrollStrategies.block()}});var Xt=0,jt=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(t,e,a,o,l,r,h,b){this._overlay=t,this._defaultOptions=o,this._scrollStrategy=l,this._parentDialog=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new u,this._afterOpenedAtThisLevel=new u,this.dialogConfigClass=x,this.afterAllClosed=w(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(E(void 0))),this._dialog=e.get(nt),this._dialogRefConstructor=W,this._dialogContainerType=Wt,this._dialogDataToken=Ut}open(t,e){let a;e=m(m({},this._defaultOptions||new x),e),e.id=e.id||`mat-mdc-dialog-${Xt++}`,e.scrollStrategy=e.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(t,st(m({},e),{positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:e},{provide:v,useValue:e}]},templateContext:()=>({dialogRef:a}),providers:(l,r,h)=>(a=new this._dialogRefConstructor(l,e,h),a.updatePosition(e?.position),[{provide:this._dialogContainerType,useValue:h},{provide:this._dialogDataToken,useValue:r.data},{provide:this._dialogRefConstructor,useValue:a}])}));return a.componentRef=o.componentRef,a.componentInstance=o.componentInstance,this.openDialogs.push(a),this.afterOpened.next(a),a.afterClosed().subscribe(()=>{let l=this.openDialogs.indexOf(a);l>-1&&(this.openDialogs.splice(l,1),this.openDialogs.length||this._getAfterAllClosed().next())}),a}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}};i.\u0275fac=function(e){return new(e||i)(d(f),d(g),d(At,8),d(Zt,8),d(Kt),d(i,12),d(q),d(Z,8))},i.\u0275prov=R({token:i,factory:i.\u0275fac,providedIn:"root"});let n=i;return n})();var $e=(()=>{let i=class i{constructor(t,e,a){this.dialogRef=t,this._elementRef=e,this._dialog=a,this.type="button"}ngOnInit(){this.dialogRef||(this.dialogRef=Jt(this._elementRef,this._dialog.openDialogs))}ngOnChanges(t){let e=t._matDialogClose||t._matDialogCloseResult;e&&(this.dialogResult=e.currentValue)}_onButtonClick(t){St(this.dialogRef,t.screenX===0&&t.screenY===0?"keyboard":"mouse",this.dialogResult)}};i.\u0275fac=function(e){return new(e||i)(c(W,8),c(D),c(jt))},i.\u0275dir=ct({type:i,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(e,a){e&1&&vt("click",function(l){return a._onButtonClick(l)}),e&2&&A("aria-label",a.ariaLabel||null)("type",a.type)},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],standalone:!0,features:[dt]});let n=i;return n})();function Jt(n,i){let s=n.nativeElement.parentElement;for(;s&&!s.classList.contains("mat-mdc-dialog-container");)s=s.parentElement;return s?i.find(t=>t.id===s.id):null}var qe=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=S({type:i}),i.\u0275inj=F({providers:[jt],imports:[kt,Y,T,J,J]});let n=i;return n})();export{W as a,Ut as b,jt as c,$e as d,qe as e};
