import{a as me,b as le,c as se,d as de,e as pe}from"./chunk-SLR7WOOC.js";import"./chunk-EER6G5AH.js";import{b as ae}from"./chunk-XBXIGZ2B.js";import{a as Y}from"./chunk-S2XJCJ4Q.js";import{d as V,e as B}from"./chunk-YPIMMY4P.js";import{C as J,E as f,G as W,H as X,L as Z,N as $,O as ee,Q as te,R as re,S as ie,T as oe,U as ne,q as L,r as j,t as P,x as z,y as G}from"./chunk-KKXJEM3A.js";import{$ as H,X as D,Z as Q,ba as K,ca as O}from"./chunk-R5DLBX2B.js";import{Aa as F,Ab as M,Ac as q,Db as _,Fb as I,Kb as k,Lb as N,Mb as A,Nb as b,Ob as n,Qa as o,Qb as R,Ra as v,Vb as U,Wb as h,hb as p,jb as r,pa as C,qb as E,ub as t,vb as e,vc as T,wb as l,xa as x,ya as w,za as S}from"./chunk-YLQD6FUN.js";var ye=["registerNgForm"],xe=()=>["/login"],ce=()=>["./"];function we(i,m){if(i&1&&(t(0,"angor-alert",10),n(1),e()),i&2){let y=I();r("appearance","outline")("showIcon",!1)("type",y.alert.type)("@shake",y.alert.type==="error"),o(),R(" ",y.alert.message," ")}}function _e(i,m){i&1&&(t(0,"mat-error"),n(1," Full name is required "),e())}function be(i,m){i&1&&(t(0,"mat-error"),n(1," Username is required "),e())}function Ce(i,m){i&1&&l(0,"mat-icon",37),i&2&&r("svgIcon","heroicons_solid:eye")}function Se(i,m){i&1&&l(0,"mat-icon",37),i&2&&r("svgIcon","heroicons_solid:eye-slash")}function Fe(i,m){i&1&&(t(0,"mat-error"),n(1," Password is required "),e())}function Ee(i,m){i&1&&l(0,"mat-progress-spinner",38),i&2&&r("diameter",24)("mode","indeterminate")}var ue=(()=>{let m=class m{constructor(c,s,a){this._formBuilder=c,this._router=s,this._signerService=a,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.registerForm=this._formBuilder.group({name:["",f.required],username:["",f.required],about:[""],avatarUrl:[""],password:["",f.required],agreements:["",f.requiredTrue]})}register(){if(this.registerForm.invalid)return;this.registerForm.disable(),this.showAlert=!1;let c=this.registerForm.get("name")?.value,s=this.registerForm.get("username")?.value,a=this.registerForm.get("about")?.value,d=this.registerForm.get("avatarUrl")?.value,g=this.registerForm.get("password")?.value,u=this._signerService.generateAndStoreKeys(g);if(!u){this.registerForm.enable(),this.alert={type:"error",message:"Error generating keys. Please try again."},this.showAlert=!0;return}let{secretKey:fe,pubkey:ge,npub:ve,nsec:he}=u;console.log("User Metadata:",{secretKey:fe,name:c,username:s,about:a,avatarUrl:d,password:g,pubkey:ge,npub:ve,nsec:he}),this.alert={type:"success",message:"Account created successfully!"},this.showAlert=!0,this._router.navigateByUrl("/home")}};m.\u0275fac=function(s){return new(s||m)(v(te),v(V),v(ae))},m.\u0275cmp=C({type:m,selectors:[["auth-register"]],viewQuery:function(s,a){if(s&1&&k(ye,5),s&2){let d;N(d=A())&&(a.registerNgForm=d.first)}},standalone:!0,features:[U],decls:72,vars:23,consts:[["registerNgForm","ngForm"],["passwordField",""],[1,"flex","min-w-0","flex-auto","flex-col","items-center","sm:flex-row","sm:justify-center","md:items-start","md:justify-start"],[1,"w-full","px-4","py-8","sm:bg-card","sm:w-auto","sm:rounded-2xl","sm:p-12","sm:shadow","md:flex","md:h-full","md:w-1/2","md:items-center","md:justify-end","md:rounded-none","md:p-16","md:shadow-none"],[1,"mx-auto","w-full","max-w-80","sm:mx-0","sm:w-80"],[1,"w-12"],["src","images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","leading-tight","tracking-tight"],[1,"mt-0.5","flex","items-baseline","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"mt-8",3,"appearance","showIcon","type"],[1,"mt-8",3,"formGroup"],[1,"w-full"],["id","name","matInput","","autocomplete","name",3,"formControlName"],[4,"ngIf"],["id","username","matInput","","autocomplete","username",3,"formControlName"],["id","about","matInput","",3,"formControlName"],["id","avatarUrl","matInput","","autocomplete","avatarUrl",3,"formControlName"],["id","password","matInput","","type","password","autocomplete","password",3,"formControlName"],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"mt-1.5","inline-flex","w-full","items-end"],[1,"-ml-2",3,"color","formControlName"],["mat-flat-button","",1,"angor-mat-button-large","mt-6","w-full",3,"click","color","disabled"],[3,"diameter","mode",4,"ngIf"],[1,"relative","hidden","h-full","w-1/2","flex-auto","items-center","justify-center","overflow-hidden","bg-gray-800","p-16","dark:border-l","md:flex","lg:px-28"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"relative","z-10","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","leading-6","tracking-tight","text-gray-400"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(s,a){if(s&1){let d=M();t(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),l(4,"img",6),e(),t(5,"div",7),n(6," Register "),e(),t(7,"div",8)(8,"div"),n(9,"Already have an account?"),e(),t(10,"a",9),n(11,"Login "),e()(),p(12,we,2,5,"angor-alert",10),t(13,"form",11,0)(15,"mat-form-field",12)(16,"mat-label"),n(17,"Full name"),e(),l(18,"input",13),p(19,_e,2,0,"mat-error",14),e(),t(20,"mat-form-field",12)(21,"mat-label"),n(22,"Username"),e(),l(23,"input",15),p(24,be,2,0,"mat-error",14),e(),t(25,"mat-form-field",12)(26,"mat-label"),n(27,"About"),e(),l(28,"textarea",16),e(),t(29,"mat-form-field",12)(30,"mat-label"),n(31,"Avatar URL"),e(),l(32,"input",17),e(),t(33,"mat-form-field",12)(34,"mat-label"),n(35,"Password"),e(),l(36,"input",18,1),t(38,"button",19),_("click",function(){x(d);let u=b(37);return w(u.type==="password"?u.type="text":u.type="password")}),p(39,Ce,1,1,"mat-icon",20)(40,Se,1,1,"mat-icon",20),e(),p(41,Fe,2,0,"mat-error",14),e(),t(42,"div",21)(43,"mat-checkbox",22)(44,"span"),n(45,"I agree with"),e(),t(46,"a",9),n(47,"Terms"),e(),t(48,"span"),n(49,"and"),e(),t(50,"a",9),n(51,"Privacy Policy"),e()()(),t(52,"button",23),_("click",function(){return x(d),w(a.register())}),t(53,"span"),n(54,"Create your account"),e(),p(55,Ee,1,2,"mat-progress-spinner",24),e()()()(),t(56,"div",25),S(),t(57,"svg",26)(58,"g",27),l(59,"circle",28)(60,"circle",29),e()(),t(61,"svg",30)(62,"defs")(63,"pattern",31),l(64,"rect",32),e()(),l(65,"rect",33),e(),F(),t(66,"div",34)(67,"div",35)(68,"div"),n(69,"Angor Hub"),e()(),t(70,"div",36),n(71," Angor Hub is a Nostr client that is customized around the Angor protocol, a decentralized crowdfunding platform. "),e()()()()}if(s&2){let d=b(37);o(10),r("routerLink",h(20,xe)),o(2),E(a.showAlert?12:-1),o(),r("formGroup",a.registerForm),o(5),r("formControlName","name"),o(),r("ngIf",a.registerForm.get("name").hasError("required")),o(4),r("formControlName","username"),o(),r("ngIf",a.registerForm.get("username").hasError("required")),o(4),r("formControlName","about"),o(4),r("formControlName","avatarUrl"),o(4),r("formControlName","password"),o(3),r("ngIf",d.type==="password"),o(),r("ngIf",d.type==="text"),o(),r("ngIf",a.registerForm.get("password").hasError("required")),o(2),r("color","primary")("formControlName","agreements"),o(3),r("routerLink",h(21,ce)),o(4),r("routerLink",h(22,ce)),o(2),r("color","primary")("disabled",a.registerForm.invalid),o(3),r("ngIf",a.registerForm.disabled)}},dependencies:[B,me,re,Z,J,W,X,ie,$,ee,G,z,L,j,P,ne,oe,H,D,Q,O,K,se,le,pe,de,q,T],encapsulation:2,data:{animation:Y}});let i=m;return i})();var Ze=[{path:"",component:ue}];export{Ze as default};
