import{b as Me,c as F,d as Fe,e as Y}from"./chunk-UWWD6MFE.js";import{c as Se,d as Z,g as L,h as U,j as q}from"./chunk-D2DYHX5U.js";import{C as De,E as xe,H as G,a as be,j as Ce,k as m,x as ke,y as ye}from"./chunk-FJKCM5SV.js";import{$ as A,Db as fe,Ea as O,F as J,Fb as _e,Ga as b,Gb as ge,H as X,Ha as C,Hb as we,I as l,Ib as Q,Ja as k,Jb as S,Ka as de,Kb as p,M as ee,Mb as W,Na as ce,Nb as N,O as te,Ob as f,P as T,Pb as _,R as ie,Ta as he,Ua as a,Zb as H,_b as M,ba as c,db as le,ga as re,hb as P,ia as ne,ib as pe,ka as R,kb as V,lb as me,n as h,na as w,nb as ue,ob as y,qa as v,qc as g,ra as ae,tb as z,xb as D,xc as ve,y as j,ya as oe,yb as x,za as se}from"./chunk-MRO7MB7O.js";var Ee=["*"],Te=["content"],Ae=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],Re=["mat-drawer","mat-drawer-content","*"];function Oe(o,r){if(o&1){let E=fe();D(0,"div",1),ge("click",function(){oe(E);let t=Q();return se(t._onBackdropClicked())}),x()}if(o&2){let E=Q();y("mat-drawer-shown",E._isShowingBackdrop())}}function Pe(o,r){o&1&&(D(0,"mat-drawer-content"),p(1,2),x())}var Ve={transformDrawer:Se("transform",[U("open, open-instant",L({transform:"none",visibility:"visible"})),U("void",L({"box-shadow":"none",visibility:"hidden"})),q("void => open-instant",Z("0ms")),q("void <=> open, open-instant => void",Z("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))])};var ze=new R("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:Qe}),Ie=new R("MAT_DRAWER_CONTAINER");function Qe(){return!1}var K=(()=>{let r=class r extends F{constructor(e,t,i,s,d){super(i,s,d),this._changeDetectorRef=e,this._container=t}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}};r.\u0275fac=function(t){return new(t||r)(a(g),a(re(()=>Ne)),a(k),a(Me),a(C))},r.\u0275cmp=v({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:4,hostBindings:function(t,i){t&2&&ue("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px")},standalone:!0,features:[H([{provide:F,useExisting:r}]),le,M],ngContentSelectors:Ee,decls:1,vars:0,template:function(t,i){t&1&&(S(),p(0))},encapsulation:2,changeDetection:0});let o=r;return o})(),We=(()=>{let r=class r{get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=m(e)}get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=m(e)),this._autoFocus=e}get opened(){return this._opened}set opened(e){this.toggle(m(e))}constructor(e,t,i,s,d,I,B,Be){this._elementRef=e,this._focusTrapFactory=t,this._focusMonitor=i,this._platform=s,this._ngZone=d,this._interactivityChecker=I,this._doc=B,this._container=Be,this._focusTrap=null,this._elementFocusedBeforeDrawerWasOpened=null,this._enableAnimations=!1,this._position="start",this._mode="over",this._disableClose=!1,this._opened=!1,this._animationStarted=new h,this._animationEnd=new h,this._animationState="void",this.openedChange=new b(!0),this._openedStream=this.openedChange.pipe(l(n=>n),j(()=>{})),this.openedStart=this._animationStarted.pipe(l(n=>n.fromState!==n.toState&&n.toState.indexOf("open")===0),T(void 0)),this._closedStream=this.openedChange.pipe(l(n=>!n),j(()=>{})),this.closedStart=this._animationStarted.pipe(l(n=>n.fromState!==n.toState&&n.toState==="void"),T(void 0)),this._destroyed=new h,this.onPositionChanged=new b,this._modeChanged=new h,this._injector=w(O),this._changeDetectorRef=w(g),this.openedChange.pipe(c(this._destroyed)).subscribe(n=>{n?(this._doc&&(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement),this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._ngZone.runOutsideAngular(()=>{J(this._elementRef.nativeElement,"keydown").pipe(l(n=>n.keyCode===27&&!this.disableClose&&!Ce(n)),c(this._destroyed)).subscribe(n=>this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()}))}),this._animationEnd.pipe(ie((n,u)=>n.fromState===u.fromState&&n.toState===u.toState)).subscribe(n=>{let{fromState:u,toState:$}=n;($.indexOf("open")===0&&u==="void"||$==="void"&&u.indexOf("open")===0)&&this.openedChange.emit(this._opened)})}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{e.removeEventListener("blur",i),e.removeEventListener("mousedown",i),e.removeAttribute("tabindex")};e.addEventListener("blur",i),e.addEventListener("mousedown",i)})),e.focus(t)}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":V(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngAfterContentChecked(){this._platform.isBrowser&&(this._enableAnimations=!0)}ngOnDestroy(){this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,t,i){return this._opened=e,e?this._animationState=this._enableAnimations?"open":"open-instant":(this._animationState="void",t&&this._restoreFocus(i)),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(s=>{this.openedChange.pipe(te(1)).subscribe(d=>s(d?"open":"close"))})}_getWidth(){return this._elementRef.nativeElement&&this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=!!this._container?.hasBackdrop&&this.opened)}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,i=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,t)),i.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}};r.\u0275fac=function(t){return new(t||r)(a(k),a(ye),a(De),a(be),a(C),a(ke),a(ve,8),a(Ie,8))},r.\u0275cmp=v({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,i){if(t&1&&N(Te,5),t&2){let s;f(s=_())&&(i._content=s.first)}},hostAttrs:["tabIndex","-1",1,"mat-drawer"],hostVars:12,hostBindings:function(t,i){t&1&&we("@transform.start",function(d){return i._animationStarted.next(d)})("@transform.done",function(d){return i._animationEnd.next(d)}),t&2&&(_e("@transform",i._animationState),me("align",null),y("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side")("mat-drawer-opened",i.opened))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],standalone:!0,features:[M],ngContentSelectors:Ee,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,i){t&1&&(S(),D(0,"div",1,0),p(2),x())},dependencies:[F],encapsulation:2,data:{animation:[Ve.transformDrawer]},changeDetection:0});let o=r;return o})(),Ne=(()=>{let r=class r{get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=m(e)}get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:m(e)}get scrollable(){return this._userContent||this._content}constructor(e,t,i,s,d,I=!1,B){this._dir=e,this._element=t,this._ngZone=i,this._changeDetectorRef=s,this._animationMode=B,this._drawers=new de,this.backdropClick=new b,this._destroyed=new h,this._doCheckSubject=new h,this._contentMargins={left:null,right:null},this._contentMarginChanges=new h,this._injector=w(O),e&&e.change.pipe(c(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),d.change().pipe(c(this._destroyed)).subscribe(()=>this.updateContentMargins()),this._autosize=I}ngAfterContentInit(){this._allDrawers.changes.pipe(A(this._allDrawers),c(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(A(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(ee(10),c(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,t-=i}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();t+=i,e-=i}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(l(t=>t.fromState!==t.toState),c(this._drawers.changes)).subscribe(t=>{t.toState!=="open-instant"&&this._animationMode!=="NoopAnimations"&&this._element.nativeElement.classList.add("mat-drawer-transition"),this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(c(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e&&e.onPositionChanged.pipe(c(this._drawers.changes)).subscribe(()=>{V(()=>{this._validateDrawers()},{injector:this._injector,phase:pe.Read})})}_watchDrawerMode(e){e&&e._modeChanged.pipe(c(X(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?t.add(i):t.remove(i)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}};r.\u0275fac=function(t){return new(t||r)(a(xe,8),a(k),a(C),a(g),a(Fe),a(ze),a(ce,8))},r.\u0275cmp=v({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,i,s){if(t&1&&(W(s,K,5),W(s,We,5)),t&2){let d;f(d=_())&&(i._content=d.first),f(d=_())&&(i._allDrawers=d)}},viewQuery:function(t,i){if(t&1&&N(K,5),t&2){let s;f(s=_())&&(i._userContent=s.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,i){t&2&&y("mat-drawer-container-explicit-backdrop",i._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],standalone:!0,features:[H([{provide:Ie,useExisting:r}]),M],ngContentSelectors:Re,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,i){t&1&&(S(Ae),P(0,Oe,1,2,"div",0),p(1),p(2,1),P(3,Pe,2,0,"mat-drawer-content")),t&2&&(z(i.hasBackdrop?0:-1),he(3),z(i._content?-1:3))},dependencies:[K],styles:['.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color, var(--mat-app-on-background));background-color:var(--mat-sidenav-content-background-color, var(--mat-app-background));box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;color:var(--mat-sidenav-container-text-color, var(--mat-app-on-surface-variant));box-shadow:var(--mat-sidenav-container-elevation-shadow);background-color:var(--mat-sidenav-container-background-color, var(--mat-app-surface));border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));width:var(--mat-sidenav-container-width);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}'],encapsulation:2,changeDetection:0});let o=r;return o})();var _t=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=ae({type:r}),r.\u0275inj=ne({imports:[G,Y,Y,G]});let o=r;return o})();export{K as a,We as b,Ne as c,_t as d};
