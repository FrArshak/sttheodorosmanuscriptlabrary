import{R as e,a as u}from"./chunk-J22VFXW5.js";import{X as g,aa as p,g as o}from"./chunk-HD5U724E.js";var j=(()=>{let n=class n{constructor(t){this.http=t,this.langSubject=new o(!1),this.lang$=this.langSubject.asObservable()}changeLang(t){this.langSubject.next(t)}sendUploadedLogo(t){return this.http.post(e.api+"upload-logo",t)}deleteUploadedLogo(t){return this.http.delete(e.api+"delete-logo/"+t)}updateSettings(t,i,a,r,l,h,c,d,m,_,v){return this.http.post(e.api+"update-general-settings",[{setting_key:"logo",setting_value:t},{setting_key:"companyName",setting_value:i},{setting_key:"address",setting_value:a},{setting_key:"phone",setting_value:r},{setting_key:"email",setting_value:l},{setting_key:"fax",setting_value:h},{setting_key:"businessHours",setting_value:c},{setting_key:"metaTitle",setting_value:d},{setting_key:"metaDesc",setting_value:m},{setting_key:"addressOnMap",setting_value:_},{setting_key:"donationLink",setting_value:v}])}getSettings(){return this.http.get(e.api+"get-general-settings")}getUserInfo(){return this.http.get(e.api+"check-auth")}updateAdminsInfo(t,i){return this.http.put(e.api+"change-current-user-data/"+i,t)}createNewAdmin(t,i,a,r){return this.http.post(e.api+"create-user",{name:t,email:i,password:a,passwordConfirm:r})}};n.\u0275fac=function(i){return new(i||n)(p(u))},n.\u0275prov=g({token:n,factory:n.\u0275fac,providedIn:"root"});let s=n;return s})();export{j as a};