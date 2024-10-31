"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[770],{770:(z,d,i)=>{i.r(d),i.d(d,{default:()=>U});var u=i(467),x=i(3830),h=i(177),a=i(9417),g=i(8834),w=i(2765),p=i(2102),f=i(9213),v=i(9042),y=i(9183),F=i(5245),e=i(4438),L=i(4930),_=i(2083),k=i(2332);const b=()=>["/create"];function j(t,s){if(1&t&&(e.j41(0,"angor-alert",40),e.EFF(1),e.k0s()),2&t){const n=e.XpG();e.Y8G("appearance","outline")("showIcon",!1)("type",n.secAlert.type)("@shake","error"===n.secAlert.type),e.R7$(),e.SpI(" ",n.secAlert.message," ")}}function S(t,s){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Secret key is required "),e.k0s())}function E(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye")}function I(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye-slash")}function C(t,s){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Password is required "),e.k0s())}function G(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Login"),e.k0s())}function A(t,s){1&t&&e.nrm(0,"mat-progress-spinner",41)}function N(t,s){if(1&t&&(e.j41(0,"angor-alert",40),e.EFF(1),e.k0s()),2&t){const n=e.XpG();e.Y8G("appearance","outline")("showIcon",!1)("type",n.menemonicAlert.type)("@shake","error"===n.menemonicAlert.type),e.R7$(),e.SpI(" ",n.menemonicAlert.message," ")}}function Y(t,s){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Menemonic is required "),e.k0s())}function R(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye")}function T(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye-slash")}function $(t,s){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Passphrase is required "),e.k0s())}function K(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye")}function M(t,s){1&t&&e.nrm(0,"mat-icon",15),2&t&&e.Y8G("svgIcon","heroicons_solid:eye-slash")}function B(t,s){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Password is required "),e.k0s())}function D(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Login"),e.k0s())}function P(t,s){1&t&&e.nrm(0,"mat-progress-spinner",41)}const U=[{path:"",component:(()=>{class t{constructor(n,r,o,c,l){this._formBuilder=n,this._router=r,this._signerService=o,this._stateService=c,this._nostrLoginService=l,this.secAlert={type:"error",message:""},this.showSecAlert=!1,this.menemonicAlert={type:"error",message:""},this.showMenemonicAlert=!1,this.loading=!1,this.isInstalledExtension=!1,this.privateKey=new Uint8Array,this.publicKey="",this.npub="",this.nsec="",this.useNostrLogin=!0}ngOnInit(){this.subscription=this._nostrLoginService.getPublicKeyObservable().subscribe({next:n=>{this.publicKey=n,this._signerService.setPublicKey(n),this.initializeAppState(),this._router.navigateByUrl("/home")},error:n=>console.error("Error receiving public key:",n)}),this.initializeForms(),this.checkNostrExtensionAvailability()}login(){this._nostrLoginService.launchLoginScreen()}signup(){this._nostrLoginService.launchSignupScreen()}initializeAppState(){var n=this;return(0,u.A)(function*(){const r=n._signerService.getPublicKey();r&&(yield n._stateService.loadUserProfile(r),console.log("User profile loaded with public key:",r))})()}initializeForms(){this.SecretKeyLoginForm=this._formBuilder.group({secretKey:["",[a.k0.required,a.k0.minLength(3)]],password:["",a.k0.required]}),this.MenemonicLoginForm=this._formBuilder.group({menemonic:["",[a.k0.required,a.k0.minLength(3)]],passphrase:[""],password:["",a.k0.required]})}checkNostrExtensionAvailability(){const n=globalThis;this.isInstalledExtension=!(!n.nostr||"function"!=typeof n.nostr.signEvent)}loginWithSecretKey(){if(this.SecretKeyLoginForm.invalid)return;const n=this.SecretKeyLoginForm.get("secretKey")?.value,r=this.SecretKeyLoginForm.get("password")?.value;this.loading=!0,this.showSecAlert=!1;try{if(!this._signerService.handleLoginWithKey(n,r))throw new Error("Secret key is missing or invalid.");this.initializeAppState(),this._router.navigateByUrl("/home")}catch(o){this.loading=!1,this.secAlert.message=o instanceof Error?o.message:"An unexpected error occurred.",this.showSecAlert=!0,console.error("Login error: ",o)}}loginWithMenemonic(){if(this.MenemonicLoginForm.invalid)return;const n=this.MenemonicLoginForm.get("menemonic")?.value,r=this.MenemonicLoginForm.get("passphrase")?.value||"",o=this.MenemonicLoginForm.get("password")?.value;this.loading=!0,this.showMenemonicAlert=!1,this._signerService.handleLoginWithMnemonic(n,r,o)?(this.initializeAppState(),this._router.navigateByUrl("/home")):(this.loading=!1,this.menemonicAlert.message="Menemonic is missing or invalid.",this.showMenemonicAlert=!0)}loginWithNostrExtension(){var n=this;return(0,u.A)(function*(){try{(yield n._signerService.handleLoginWithExtension())?(n.initializeAppState(),n._router.navigateByUrl("/home")):console.error("Failed to log in using Nostr extension")}catch(r){console.error("An error occurred during login with Nostr extension",r)}})()}static{this.\u0275fac=function(r){return new(r||t)(e.rXU(a.ok),e.rXU(F.Ix),e.rXU(L.A),e.rXU(_.d),e.rXU(k.v))}}static{this.\u0275cmp=e.VBU({type:t,selectors:[["auth-sign-in"]],standalone:!0,features:[e.aNF],decls:94,vars:27,consts:[["secretPasswordField",""],["passphraseField",""],["menemonicPasswordField",""],[1,"flex","min-w-0","flex-auto","flex-col","items-center","sm:flex-row","sm:justify-center","md:items-start","md:justify-start"],[1,"w-full","px-4","py-8","sm:bg-card","sm:w-auto","sm:rounded-2xl","sm:p-12","sm:shadow","md:flex","md:h-full","md:w-1/2","md:items-center","md:justify-end","md:rounded-none","md:p-16","md:shadow-none"],[1,"mx-auto","w-full","max-w-80","sm:mx-0","sm:w-80"],[1,"mt-8","text-4xl","font-extrabold","leading-tight","tracking-tight"],[1,"mt-0.5","flex","items-baseline","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8","flex","items-center"],[1,"mt-px","flex-auto","border-t"],[1,"text-secondary","mx-2"],[1,"mt-8","flex","items-center","space-x-4"],["type","button","mat-stroked-button","",1,"flex-auto","space-x-2",3,"click"],[1,"icon-size-5",3,"svgIcon"],[1,"mt-8",3,"ngSubmit","formGroup"],[1,"w-full"],["matInput","","formControlName","secretKey","autocomplete","secretKey"],["matInput","","type","password","autocomplete","current-password-seckey",3,"formControlName"],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[4,"ngIf"],["mat-flat-button","","color","primary",1,"angor-mat-button-large","mt-6","w-full",3,"disabled"],["diameter","24","mode","indeterminate",4,"ngIf"],["matInput","","formControlName","menemonic","autocomplete","menemonic"],["matInput","","type","password","autocomplete","current-passphrase-menemonic",3,"formControlName"],["matInput","","type","password","autocomplete","current-password-menemonic",3,"formControlName"],[1,"relative","hidden","h-full","w-1/2","flex-auto","items-center","justify-center","overflow-hidden","bg-gray-800","p-16","dark:border-l","md:flex","lg:px-28"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"pointer-events-none","absolute","inset-0"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-right-16","-top-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"relative","z-10","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","leading-6","tracking-tight","text-gray-400"],[1,"mt-8",3,"appearance","showIcon","type"],["diameter","24","mode","indeterminate"]],template:function(r,o){if(1&r){const c=e.RV6();e.j41(0,"div",3)(1,"div",4)(2,"div",5)(3,"div",6),e.EFF(4," Login "),e.k0s(),e.j41(5,"div")(6,"div",7)(7,"div"),e.EFF(8,"Don't have an account?"),e.k0s(),e.j41(9,"a",8),e.EFF(10,"Create account"),e.k0s()(),e.DNE(11,j,2,5,"angor-alert",9),e.j41(12,"div",10),e.nrm(13,"div",11),e.j41(14,"div",12),e.EFF(15," Login with extension "),e.k0s(),e.nrm(16,"div",11),e.k0s(),e.j41(17,"div",13)(18,"button",14),e.bIt("click",function(){return e.eBV(c),e.Njj(o.login())}),e.nrm(19,"mat-icon",15),e.j41(20,"span"),e.EFF(21,"Login with Nostr Extension"),e.k0s()()(),e.j41(22,"form",16),e.bIt("ngSubmit",function(){return e.eBV(c),e.Njj(o.loginWithSecretKey())}),e.j41(23,"div",10),e.nrm(24,"div",11),e.j41(25,"div",12),e.EFF(26,"Or enter secret key"),e.k0s(),e.nrm(27,"div",11),e.k0s(),e.j41(28,"mat-form-field",17)(29,"mat-label"),e.EFF(30,"Secret Key"),e.k0s(),e.nrm(31,"input",18),e.DNE(32,S,2,0,"mat-error"),e.k0s(),e.j41(33,"mat-form-field",17)(34,"mat-label"),e.EFF(35,"Password"),e.k0s(),e.nrm(36,"input",19,0),e.j41(38,"button",20),e.bIt("click",function(){e.eBV(c);const m=e.sdS(37);return e.Njj(m.type="password"===m.type?"text":"password")}),e.DNE(39,E,1,1,"mat-icon",21)(40,I,1,1,"mat-icon",21),e.k0s(),e.DNE(41,C,2,0,"mat-error",22),e.k0s(),e.j41(42,"button",23),e.DNE(43,G,2,0,"span",22)(44,A,1,0,"mat-progress-spinner",24),e.k0s()(),e.j41(45,"div",10),e.nrm(46,"div",11),e.j41(47,"div",12),e.EFF(48,"Or enter menemonic"),e.k0s(),e.nrm(49,"div",11),e.k0s(),e.DNE(50,N,2,5,"angor-alert",9),e.j41(51,"form",16),e.bIt("ngSubmit",function(){return e.eBV(c),e.Njj(o.loginWithMenemonic())}),e.j41(52,"mat-form-field",17)(53,"mat-label"),e.EFF(54,"Menemonic"),e.k0s(),e.nrm(55,"input",25),e.DNE(56,Y,2,0,"mat-error"),e.k0s(),e.j41(57,"mat-form-field",17)(58,"mat-label"),e.EFF(59,"Passphrase (Optional)"),e.k0s(),e.nrm(60,"input",26,1),e.j41(62,"button",20),e.bIt("click",function(){e.eBV(c);const m=e.sdS(61);return e.Njj(m.type="password"===m.type?"text":"password")}),e.DNE(63,R,1,1,"mat-icon",21)(64,T,1,1,"mat-icon",21),e.k0s(),e.DNE(65,$,2,0,"mat-error",22),e.k0s(),e.j41(66,"mat-form-field",17)(67,"mat-label"),e.EFF(68,"Password"),e.k0s(),e.nrm(69,"input",27,2),e.j41(71,"button",20),e.bIt("click",function(){e.eBV(c);const m=e.sdS(70);return e.Njj(m.type="password"===m.type?"text":"password")}),e.DNE(72,K,1,1,"mat-icon",21)(73,M,1,1,"mat-icon",21),e.k0s(),e.DNE(74,B,2,0,"mat-error",22),e.k0s(),e.j41(75,"button",23),e.DNE(76,D,2,0,"span",22)(77,P,1,0,"mat-progress-spinner",24),e.k0s()()()()(),e.j41(78,"div",28),e.qSk(),e.j41(79,"svg",29)(80,"g",30),e.nrm(81,"circle",31)(82,"circle",32),e.k0s()(),e.j41(83,"svg",33)(84,"defs")(85,"pattern",34),e.nrm(86,"rect",35),e.k0s()(),e.nrm(87,"rect",36),e.k0s(),e.joV(),e.j41(88,"div",37)(89,"div",38)(90,"div"),e.EFF(91,"Angor Hub"),e.k0s()(),e.j41(92,"div",39),e.EFF(93," Angor Hub is a Nostr client customized around the Angor protocol, a decentralized crowdfunding platform. "),e.k0s()()()()}if(2&r){const c=e.sdS(37),l=e.sdS(61),m=e.sdS(70);e.R7$(9),e.Y8G("routerLink",e.lJ4(26,b)),e.R7$(2),e.Y8G("ngIf",o.showSecAlert),e.R7$(8),e.Y8G("svgIcon","feather:zap"),e.R7$(3),e.Y8G("formGroup",o.SecretKeyLoginForm),e.R7$(10),e.vxM(o.SecretKeyLoginForm.get("secretKey").hasError("required")?32:-1),e.R7$(4),e.Y8G("formControlName","password"),e.R7$(3),e.Y8G("ngIf","password"===c.type),e.R7$(),e.Y8G("ngIf","text"===c.type),e.R7$(),e.Y8G("ngIf",o.SecretKeyLoginForm.get("password").hasError("required")),e.R7$(),e.Y8G("disabled",o.SecretKeyLoginForm.invalid),e.R7$(),e.Y8G("ngIf",!o.loading),e.R7$(),e.Y8G("ngIf",o.loading),e.R7$(6),e.Y8G("ngIf",o.showMenemonicAlert),e.R7$(),e.Y8G("formGroup",o.MenemonicLoginForm),e.R7$(5),e.vxM(o.MenemonicLoginForm.get("menemonic").hasError("required")?56:-1),e.R7$(4),e.Y8G("formControlName","passphrase"),e.R7$(3),e.Y8G("ngIf","password"===l.type),e.R7$(),e.Y8G("ngIf","text"===l.type),e.R7$(),e.Y8G("ngIf",o.MenemonicLoginForm.get("passphrase").hasError("required")),e.R7$(4),e.Y8G("formControlName","password"),e.R7$(3),e.Y8G("ngIf","password"===m.type),e.R7$(),e.Y8G("ngIf","text"===m.type),e.R7$(),e.Y8G("ngIf",o.MenemonicLoginForm.get("password").hasError("required")),e.R7$(),e.Y8G("disabled",o.MenemonicLoginForm.invalid),e.R7$(),e.Y8G("ngIf",!o.loading),e.R7$(),e.Y8G("ngIf",o.loading)}},dependencies:[F.Wk,x.h,a.YN,a.qT,a.me,a.BC,a.cb,a.X1,a.j4,a.JD,p.RG,p.rl,p.nJ,p.TL,p.yw,v.fS,v.fg,g.Hl,g.$z,g.iY,f.m_,f.An,w.g7,y.D6,y.LG,h.MD,h.bT],encapsulation:2})}}return t})()}]}}]);