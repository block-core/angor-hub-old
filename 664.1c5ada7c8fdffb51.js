"use strict";(self.webpackChunkangor=self.webpackChunkangor||[]).push([[664],{9664:(I,d,s)=>{s.r(d),s.d(d,{default:()=>G});var v=s(6146),b=s(6903),g=s(4460),i=s(936),c=s(9471),u=s(2992),a=s(6071),p=s(3904),f=s(6389),h=s(1054),y=s(8716),e=s(3107),x=s(8078);const k=["registerNgForm"],j=()=>["/login"];function F(o,m){if(1&o&&(e.j41(0,"angor-alert",24),e.EFF(1),e.k0s()),2&o){const t=e.XpG();e.Y8G("appearance","outline")("showIcon",!1)("type",t.alert.type)("@shake","error"===t.alert.type),e.R7$(),e.SpI(" ",t.alert.message," ")}}function w(o,m){if(1&o){const t=e.RV6();e.j41(0,"div",25)(1,"mat-form-field",26)(2,"mat-label"),e.EFF(3,"Secret Key"),e.k0s(),e.nrm(4,"input",27),e.j41(5,"button",28),e.bIt("click",function(){e.eBV(t);const r=e.XpG();return e.Njj(r.copyToClipboard(r.generatedKeys.secretKey))}),e.nrm(6,"mat-icon",29),e.k0s()(),e.j41(7,"mat-form-field",26)(8,"mat-label"),e.EFF(9,"Public Key"),e.k0s(),e.nrm(10,"input",27),e.j41(11,"button",28),e.bIt("click",function(){e.eBV(t);const r=e.XpG();return e.Njj(r.copyToClipboard(r.generatedKeys.pubkey))}),e.nrm(12,"mat-icon",29),e.k0s()(),e.j41(13,"mat-form-field",26)(14,"mat-label"),e.EFF(15,"NPUB"),e.k0s(),e.nrm(16,"input",27),e.j41(17,"button",28),e.bIt("click",function(){e.eBV(t);const r=e.XpG();return e.Njj(r.copyToClipboard(r.generatedKeys.npub))}),e.nrm(18,"mat-icon",29),e.k0s()(),e.j41(19,"mat-form-field",26)(20,"mat-label"),e.EFF(21,"NSEC"),e.k0s(),e.nrm(22,"input",27),e.j41(23,"button",28),e.bIt("click",function(){e.eBV(t);const r=e.XpG();return e.Njj(r.copyToClipboard(r.generatedKeys.nsec))}),e.nrm(24,"mat-icon",29),e.k0s()()()}if(2&o){const t=e.XpG();e.R7$(4),e.Y8G("value",t.generatedKeys.secretKey),e.R7$(6),e.Y8G("value",t.generatedKeys.pubkey),e.R7$(6),e.Y8G("value",t.generatedKeys.npub),e.R7$(6),e.Y8G("value",t.generatedKeys.nsec)}}function R(o,m){1&o&&e.nrm(0,"mat-progress-spinner",33),2&o&&e.Y8G("diameter",24)("mode","indeterminate")}function C(o,m){if(1&o){const t=e.RV6();e.j41(0,"div")(1,"mat-checkbox",30),e.EFF(2," I confirm I have copied the keys "),e.k0s(),e.j41(3,"button",31),e.bIt("click",function(){e.eBV(t);const r=e.XpG();return e.Njj(r.register())}),e.j41(4,"span"),e.EFF(5,"Create account"),e.k0s(),e.DNE(6,R,1,2,"mat-progress-spinner",32),e.k0s()()}if(2&o){const t=e.XpG();e.R7$(),e.Y8G("formControlName","confirmation"),e.R7$(2),e.Y8G("color","primary")("disabled",!t.registerForm.valid||!t.generatedKeys),e.R7$(3),e.Y8G("ngIf",t.registerForm.disabled)}}const G=[{path:"",component:(()=>{class o{constructor(t,n,r){this._formBuilder=t,this._router=n,this._signerService=r,this.alert={type:"success",message:""},this.showAlert=!1,this.generatedKeys=null}ngOnInit(){this.registerForm=this._formBuilder.group({confirmation:[!1,i.k0.requiredTrue]})}generateKeys(){const t=this.registerForm.get("password")?.value,n=this._signerService.generateAndStoreKeys(t);n?(this.generatedKeys=n,this.alert={type:"success",message:"Keys generated and stored successfully!"}):this.alert={type:"error",message:"Error generating keys. Please try again."},this.showAlert=!0}register(){if(this.registerForm.invalid||!this.generatedKeys)return;this.registerForm.disable(),this.showAlert=!1;const t={...this.generatedKeys,password:this.registerForm.get("password")?.value};console.log("User Metadata:",t),this.alert={type:"success",message:"Account created successfully!"},this.showAlert=!0,this._router.navigateByUrl("/home")}copyToClipboard(t){navigator.clipboard.writeText(t).then(()=>{console.log("Copied to clipboard successfully!")},n=>{console.error("Could not copy text: ",n)})}static{this.\u0275fac=function(n){return new(n||o)(e.rXU(i.ze),e.rXU(y.Ix),e.rXU(x.A))}}static{this.\u0275cmp=e.VBU({type:o,selectors:[["auth-create"]],viewQuery:function(n,r){if(1&n&&e.GBs(k,5),2&n){let l;e.mGM(l=e.lsd())&&(r.registerNgForm=l.first)}},decls:33,vars:7,consts:[["registerNgForm","ngForm"],[1,"flex","min-w-0","flex-auto","flex-col","items-center","sm:flex-row","sm:justify-center","md:items-start","md:justify-start"],[1,"w-full","px-4","py-8","sm:bg-card","sm:w-auto","sm:rounded-2xl","sm:p-12","sm:shadow","md:flex","md:h-full","md:w-1/2","md:items-center","md:justify-end","md:rounded-none","md:p-16","md:shadow-none"],[1,"mx-auto","w-full","max-w-80","sm:mx-0","sm:w-80"],[1,"mt-8","text-4xl","font-extrabold","leading-tight","tracking-tight"],[1,"mt-0.5","flex","items-baseline","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],["class","mt-8",3,"appearance","showIcon","type",4,"ngIf"],["mat-flat-button","",1,"mt-6","w-full","angor-mat-button-large",3,"click","color"],["class","mt-4 space-y-2",4,"ngIf"],[1,"mt-8",3,"formGroup"],[4,"ngIf"],[1,"relative","hidden","h-full","w-1/2","flex-auto","items-center","justify-center","overflow-hidden","bg-gray-800","p-16","dark:border-l","md:flex","lg:px-28"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"pointer-events-none","absolute","inset-0"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-right-16","-top-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"relative","z-10","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","leading-6","tracking-tight","text-gray-400"],[1,"mt-8",3,"appearance","showIcon","type"],[1,"mt-4","space-y-2"],["appearance","outline",1,"w-full"],["matInput","","readonly","",3,"value"],["mat-icon-button","","matSuffix","",3,"click"],["svgIcon","heroicons_outline:clipboard-document"],[1,"mt-4",3,"formControlName"],["mat-flat-button","",1,"angor-mat-button-large","mt-6","w-full",3,"click","color","disabled"],[3,"diameter","mode",4,"ngIf"],[3,"diameter","mode"]],template:function(n,r){if(1&n){const l=e.RV6();e.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),e.EFF(4," Create account "),e.k0s(),e.j41(5,"div",5)(6,"div"),e.EFF(7,"Already have an account?"),e.k0s(),e.j41(8,"a",6),e.EFF(9,"Login "),e.k0s()(),e.DNE(10,F,2,5,"angor-alert",7),e.j41(11,"button",8),e.bIt("click",function(){return e.eBV(l),e.Njj(r.generateKeys())}),e.EFF(12," Generate and Store Keys "),e.k0s(),e.DNE(13,w,25,4,"div",9),e.j41(14,"form",10,0),e.DNE(16,C,7,4,"div",11),e.k0s()()(),e.j41(17,"div",12),e.qSk(),e.j41(18,"svg",13)(19,"g",14),e.nrm(20,"circle",15)(21,"circle",16),e.k0s()(),e.j41(22,"svg",17)(23,"defs")(24,"pattern",18),e.nrm(25,"rect",19),e.k0s()(),e.nrm(26,"rect",20),e.k0s(),e.joV(),e.j41(27,"div",21)(28,"div",22)(29,"div"),e.EFF(30,"Angor Hub"),e.k0s()(),e.j41(31,"div",23),e.EFF(32," Angor Hub is a Nostr client that is customized around the Angor protocol, a decentralized crowdfunding platform. "),e.k0s()()()()}2&n&&(e.R7$(8),e.Y8G("routerLink",e.lJ4(6,j)),e.R7$(2),e.Y8G("ngIf",r.showAlert),e.R7$(),e.Y8G("color","primary"),e.R7$(2),e.Y8G("ngIf",r.generatedKeys),e.R7$(),e.Y8G("formGroup",r.registerForm),e.R7$(2),e.Y8G("ngIf",r.generatedKeys))},dependencies:[y.Wk,b.h,i.YN,i.qT,i.BC,i.cb,i.X1,i.j4,i.JD,a.RG,a.rl,a.nJ,a.yw,f.fS,f.fg,c.Hl,c.$z,c.iY,p.m_,p.An,u.g7,u.So,h.D6,h.LG,g.MD,g.bT],encapsulation:2,data:{animation:v.F}})}}return o})()}]}}]);