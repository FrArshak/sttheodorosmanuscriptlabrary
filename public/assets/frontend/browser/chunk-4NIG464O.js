import{c as T}from"./chunk-ZN5VQ4IA.js";import"./chunk-4GPGGGDQ.js";import{f as C}from"./chunk-JWRPVHHQ.js";import"./chunk-AOEDNFZC.js";import{$ as A,J as k,L as S,N as M,P as s,T as z,U as j,W as d,X as F,Y as I,_ as E,ba as N,da as R}from"./chunk-CK5DGHQM.js";import{Eb as w,Jc as y,Qb as r,X as u,Y as m,Ya as v,Za as l,aa as P,fa as h,ga as p,ra as x,sa as b,sb as O,wb as g,xb as c,yb as a}from"./chunk-HD5U724E.js";import"./chunk-UGUGGRN7.js";var B=(()=>{let n=class n{constructor(o,t,i,f,G,D){this.activatedRoute=o,this.authService=t,this.fb=i,this._snackBar=f,this.AuthService=G,this.router=D,this.showHeader=!0,this.isLoggedIn=!1,this.loginForm=this.fb.group({email:["",[d.required,d.email]],password:["",[d.required]],rememberMe:[!1]})}ngOnInit(){}login(){this.loginForm.valid&&this.loginForm.value.email&&this.loginForm.value.password&&this.AuthService.login(this.loginForm.value.email,this.loginForm.value.password,!!this.loginForm.value.rememberMe).subscribe({next:o=>{let t;if(o.success===0){t=o.message,this._snackBar.open("Incorrect email or password");return}let i=o;(!i.authToken||!i.authUser.id)&&(t="Error during authorization"),i.authToken?this.authService.setTokens(i.authToken,i.authUser.id):(this._snackBar.open("There was an error during the authentication please try again"),this.authService.clearTokens(),this.router.navigate(["/"])),this.router.navigate(["/"])},error:o=>{o.error&&o.error.message?this._snackBar.open(o.error.message):this._snackBar.open("Error during the authorization")}})}};n.\u0275fac=function(t){return new(t||n)(l(S),l(C),l(N),l(k),l(C),l(M))},n.\u0275cmp=h({type:n,selectors:[["app-admin-login"]],decls:30,vars:2,consts:[[1,"login",3,"formGroup"],[1,"container"],[1,"login-content"],[1,"login-logo"],[1,"logo"],["width","80","height","69","viewBox","0 0 80 69","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M30.9328 4.601C24.932 1.63735 16.5444 0.185593 5.31493 0.134052C4.25588 0.119168 3.21761 0.438609 2.33857 1.04978C1.61705 1.55425 1.02643 2.23439 0.618647 3.03038C0.210866 3.82637 -0.00157515 4.71381 8.79264e-06 5.61465V54.7683C8.79264e-06 58.091 2.28542 60.5976 5.31493 60.5976C17.119 60.5976 28.9597 61.7384 36.0518 68.6725C36.1488 68.7678 36.2707 68.8315 36.4025 68.8557C36.5342 68.8799 36.6699 68.8635 36.7927 68.8086C36.9155 68.7537 37.02 68.6627 37.0932 68.5468C37.1664 68.431 37.2051 68.2955 37.2044 68.1571V10.2397C37.2046 9.84892 37.1238 9.46268 36.9673 9.10702C36.8109 8.75136 36.5825 8.43456 36.2976 8.178C34.6731 6.74142 32.8685 5.53822 30.9328 4.601ZM77.3852 1.04462C76.5058 0.434976 75.4674 0.117318 74.4089 0.134052C63.1795 0.185593 54.7918 1.63048 48.791 4.601C46.8554 5.53651 45.0504 6.73733 43.4246 8.17112C43.1402 8.42806 42.9123 8.74498 42.7562 9.10058C42.6 9.45618 42.5193 9.84223 42.5194 10.2328V68.1537C42.5193 68.2866 42.5572 68.4167 42.6283 68.5275C42.6994 68.6383 42.8005 68.7249 42.919 68.7765C43.0375 68.828 43.1681 68.8422 43.2944 68.8173C43.4207 68.7924 43.537 68.7295 43.6289 68.6364C47.8924 64.2554 55.3748 60.5925 74.4155 60.5942C75.8251 60.5942 77.177 60.015 78.1737 58.9839C79.1705 57.9529 79.7304 56.5545 79.7304 55.0964V5.61637C79.7324 4.71375 79.5194 3.82451 79.1104 3.02719C78.7014 2.22986 78.1089 1.54896 77.3852 1.04462Z","fill","white"],[1,"logo-text"],[1,"login-form"],[1,"login-form-title"],[1,"login-form-subtitle"],[1,"login-inputs"],[1,"login-input","email"],["type","text","name","email","formControlName","email",1,"input","email"],[1,"login-input","password"],[1,"password-label"],["type","password","name","password","formControlName","password",1,"input","password"],[1,"checkbox"],["type","checkbox","formControlName","rememberMe","id","remember"],["for","remember"],[1,"login-btn"],[1,"btn",3,"click","disabled"]],template:function(t,i){t&1&&(g(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),x(),g(5,"svg",5),a(6,"path",6),c()(),b(),g(7,"div",7),r(8,"Manuscripts"),c()(),g(9,"div",8)(10,"div",9),r(11,"Login to Account"),c(),g(12,"div",10),r(13,"Please enter your email and password to continue"),c(),g(14,"div",11)(15,"div",12)(16,"label"),r(17,"Email address:"),c(),a(18,"input",13),c(),g(19,"div",14)(20,"label",15),r(21,"Password"),c(),a(22,"input",16),c(),g(23,"div",17),a(24,"input",18),g(25,"label",19),r(26,"Remember Password"),c()()(),g(27,"div",20)(28,"btn",21),w("click",function(){return i.login()}),r(29,"Sign in"),c()()()()()()),t&2&&(O("formGroup",i.loginForm),v(28),O("disabled",i.loginForm.invalid))},dependencies:[j,z,F,I,E,A],styles:[".login[_ngcontent-%COMP%]{padding:167px 163px;background:linear-gradient(270deg,#001c51 -5.208%,#38526a 103.152%)}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{max-width:1115px;height:735px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]{width:100%;height:100%;display:flex}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-logo[_ngcontent-%COMP%]{padding-right:54px;padding-left:86px;background-image:url(/storage/login-bg.webp);width:484px;height:100%;display:flex;justify-content:center;align-items:center;column-gap:20px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]{font-family:Lato,sans-serif;font-weight:500;font-size:44px;color:#fff}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{padding:110px 57px;border:.3px solid rgb(185,185,185);border-radius:0 24px 0 0;-webkit-backdrop-filter:blur(34px);backdrop-filter:blur(34px);background:#ffffff30}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-title[_ngcontent-%COMP%]{font-family:Lato,sans-serif;font-size:32px;font-weight:700;color:#fff;text-align:center;margin-bottom:25px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-subtitle[_ngcontent-%COMP%]{text-align:center;font-weight:600;color:#d4d4d4;font-size:18px;margin-bottom:45px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:40px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:18px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   .password.labels[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:600;color:#d4d4d4;font-size:18px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   .password.labels[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{padding:16px;width:516px;outline:none;border:none;border-radius:8px;font-size:20px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]{display:flex;align-items:center}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:18px;height:18px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-weight:600;font-size:18px;color:#d4d4d4;display:inline-block;margin-left:12px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%]{margin-top:60px;display:flex;width:100%;justify-content:center}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{text-align:center;border:none;width:418px;padding:16px;box-sizing:border-box;color:#fff;font-size:20px;font-weight:600;border-radius:8px;background:#2153b6;transition:all .3s ease-in;cursor:pointer}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{background:#03369c}@media screen and (max-width: 1350px){.login[_ngcontent-%COMP%]{padding-left:0;padding-right:0}}@media screen and (max-width: 1200px){.login[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-logo[_ngcontent-%COMP%]{display:none}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{border-radius:24px}}@media screen and (max-width: 660px){.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{max-width:410px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-title[_ngcontent-%COMP%]{font-size:26px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-subtitle[_ngcontent-%COMP%]{font-size:16px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:18px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%], .login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{max-width:350px}}@media screen and (max-width: 440px){.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{width:350px;display:flex;justify-content:center;align-items:center;flex-direction:column}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-title[_ngcontent-%COMP%]{font-size:24px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-form-subtitle[_ngcontent-%COMP%]{font-size:16px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:14px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{max-width:310px;box-sizing:border-box;padding:5px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-inputs[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:16px}.login[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .login-content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{max-width:310px!important;max-height:40px!important;box-sizing:border-box;padding:5px!important;font-size:16px!important}}"]});let e=n;return e})();var V=(()=>{let n=class n{constructor(o,t){this.authService=o,this.router=t}canActivate(o,t){return this.authService.getIsLoggedIn()?(this.router.navigate(["/"]),!1):!0}};n.\u0275fac=function(t){return new(t||n)(P(C),P(M))},n.\u0275prov=u({token:n,factory:n.\u0275fac,providedIn:"root"});let e=n;return e})();var U=[{path:"login",component:B,data:{animation:"AdminLoginPage"},canActivate:[V]}],L=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=p({type:n}),n.\u0275inj=m({imports:[s.forChild(U),s]});let e=n;return e})();var an=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=p({type:n}),n.\u0275inj=m({imports:[y,T,s,R,L]});let e=n;return e})();export{an as AdminLoginModule};