"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[735],{2747:(w,l,s)=>{s.d(l,{n:()=>v});var r=s(3365),m=s(4085),e=s(4438);const _=[[["","angorCardFront",""]],[["","angorCardBack",""]],"*",[["","angorCardExpansion",""]]],u=["[angorCardFront]","[angorCardBack]","*","[angorCardExpansion]"];function f(n,b){1&n&&(e.j41(0,"div",0),e.SdG(1),e.k0s(),e.j41(2,"div",1),e.SdG(3,1),e.k0s())}function h(n,b){1&n&&(e.j41(0,"div",2),e.SdG(1,3),e.k0s()),2&n&&e.Y8G("@expandCollapse",void 0)}function g(n,b){if(1&n&&(e.SdG(0,2),e.DNE(1,h,2,1,"div",2)),2&n){const c=e.XpG();e.R7$(),e.vxM(c.expanded?1:-1)}}let v=(()=>{class n{constructor(){this.expanded=!1,this.face="front",this.flippable=!1}get classList(){return{"angor-card-expanded":this.expanded,"angor-card-face-back":this.flippable&&"back"===this.face,"angor-card-face-front":this.flippable&&"front"===this.face,"angor-card-flippable":this.flippable}}ngOnChanges(c){"expanded"in c&&(this.expanded=(0,m.he)(c.expanded.currentValue)),"flippable"in c&&(this.flippable=(0,m.he)(c.flippable.currentValue))}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=e.VBU({type:n,selectors:[["angor-card"]],hostVars:2,hostBindings:function(i,p){2&i&&e.HbH(p.classList)},inputs:{expanded:"expanded",face:"face",flippable:"flippable"},exportAs:["angorCard"],features:[e.OA$],ngContentSelectors:u,decls:2,vars:2,consts:[[1,"angor-card-front"],[1,"angor-card-back"],[1,"angor-card-expansion"]],template:function(i,p){1&i&&(e.NAR(_),e.DNE(0,f,4,0)(1,g,2,1)),2&i&&(e.vxM(p.flippable?0:-1),e.R7$(),e.vxM(p.flippable?-1:1))},styles:["angor-card{position:relative;display:flex;overflow:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--angor-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}angor-card.angor-card-flippable{border-radius:0;overflow:visible;transform-style:preserve-3d;transition:transform 1s;perspective:600px;background:transparent;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}angor-card.angor-card-flippable.angor-card-face-back .angor-card-front{visibility:hidden;opacity:0;transform:rotateY(180deg)}angor-card.angor-card-flippable.angor-card-face-back .angor-card-back{visibility:visible;opacity:1;transform:rotateY(360deg)}angor-card.angor-card-flippable .angor-card-front,angor-card.angor-card-flippable .angor-card-back{display:flex;flex-direction:column;flex:1 1 auto;z-index:10;transition:transform .5s ease-out 0s,visibility 0s ease-in .2s,opacity 0s ease-in .2s;backface-visibility:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--angor-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}angor-card.angor-card-flippable .angor-card-front{position:relative;opacity:1;visibility:visible;transform:rotateY(0);overflow:hidden}angor-card.angor-card-flippable .angor-card-back{position:absolute;inset:0;opacity:0;visibility:hidden;transform:rotateY(180deg);overflow:hidden auto}\n"],encapsulation:2,data:{animation:r.F}})}}return n})()},9345:(w,l,s)=>{s.d(l,{n:()=>r.n});var r=s(2747)},9183:(w,l,s)=>{s.d(l,{D6:()=>c,LG:()=>n});var r=s(4438),m=s(177),e=s(3);const _=["determinateSpinner"];function u(i,p){if(1&i&&(r.qSk(),r.j41(0,"svg",11),r.nrm(1,"circle",12),r.k0s()),2&i){const a=r.XpG();r.BMQ("viewBox",a._viewBox()),r.R7$(),r.xc7("stroke-dasharray",a._strokeCircumference(),"px")("stroke-dashoffset",a._strokeCircumference()/2,"px")("stroke-width",a._circleStrokeWidth(),"%"),r.BMQ("r",a._circleRadius())}}const f=new r.nKC("mat-progress-spinner-default-options",{providedIn:"root",factory:function h(){return{diameter:g}}}),g=100;let n=(()=>{class i{_elementRef=(0,r.WQX)(r.aKT);_noopAnimations;get color(){return this._color||this._defaultColor}set color(a){this._color=a}_color;_defaultColor="primary";_determinateCircle;constructor(){const a=(0,r.WQX)(r.bc$,{optional:!0}),t=(0,r.WQX)(f);this._noopAnimations="NoopAnimations"===a&&!!t&&!t._forceAnimations,this.mode="mat-spinner"===this._elementRef.nativeElement.nodeName.toLowerCase()?"indeterminate":"determinate",t&&(t.color&&(this.color=this._defaultColor=t.color),t.diameter&&(this.diameter=t.diameter),t.strokeWidth&&(this.strokeWidth=t.strokeWidth))}mode;get value(){return"determinate"===this.mode?this._value:0}set value(a){this._value=Math.max(0,Math.min(100,a||0))}_value=0;get diameter(){return this._diameter}set diameter(a){this._diameter=a||0}_diameter=g;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(a){this._strokeWidth=a||0}_strokeWidth;_circleRadius(){return(this.diameter-10)/2}_viewBox(){const a=2*this._circleRadius()+this.strokeWidth;return`0 0 ${a} ${a}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return"determinate"===this.mode?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=r.VBU({type:i,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(t,o){if(1&t&&r.GBs(_,5),2&t){let d;r.mGM(d=r.lsd())&&(o._determinateCircle=d.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(t,o){2&t&&(r.BMQ("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow","determinate"===o.mode?o.value:null)("mode",o.mode),r.HbH("mat-"+o.color),r.xc7("width",o.diameter,"px")("height",o.diameter,"px")("--mdc-circular-progress-size",o.diameter+"px")("--mdc-circular-progress-active-indicator-width",o.diameter+"px"),r.AVh("_mat-animation-noopable",o._noopAnimations)("mdc-circular-progress--indeterminate","indeterminate"===o.mode))},inputs:{color:"color",mode:"mode",value:[2,"value","value",r.Udg],diameter:[2,"diameter","diameter",r.Udg],strokeWidth:[2,"strokeWidth","strokeWidth",r.Udg]},exportAs:["matProgressSpinner"],features:[r.GFd],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(t,o){if(1&t&&(r.DNE(0,u,2,8,"ng-template",null,0,r.C5r),r.j41(2,"div",2,1),r.qSk(),r.j41(4,"svg",3),r.nrm(5,"circle",4),r.k0s()(),r.joV(),r.j41(6,"div",5)(7,"div",6)(8,"div",7),r.eu8(9,8),r.k0s(),r.j41(10,"div",9),r.eu8(11,8),r.k0s(),r.j41(12,"div",10),r.eu8(13,8),r.k0s()()()),2&t){const d=r.sdS(1);r.R7$(4),r.BMQ("viewBox",o._viewBox()),r.R7$(),r.xc7("stroke-dasharray",o._strokeCircumference(),"px")("stroke-dashoffset",o._strokeDashOffset(),"px")("stroke-width",o._circleStrokeWidth(),"%"),r.BMQ("r",o._circleRadius()),r.R7$(4),r.Y8G("ngTemplateOutlet",d),r.R7$(2),r.Y8G("ngTemplateOutlet",d),r.R7$(2),r.Y8G("ngTemplateOutlet",d)}},dependencies:[m.T3],styles:[".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"],encapsulation:2,changeDetection:0})}return i})(),c=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=r.$C({type:i});static \u0275inj=r.G2t({imports:[e.yE]})}return i})()}}]);