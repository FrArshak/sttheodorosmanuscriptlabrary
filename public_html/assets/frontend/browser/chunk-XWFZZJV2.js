import{c as W}from"./chunk-CA4GJWWZ.js";import{a as ct}from"./chunk-4JJ6EDAR.js";import{a as Z}from"./chunk-4GPGGGDQ.js";import{a as F}from"./chunk-URFG7TEC.js";import{f as j,h as D}from"./chunk-JWRPVHHQ.js";import{J as A,L as z,N as R,O as K,P as G,R as w,g as J}from"./chunk-CK5DGHQM.js";import{Ba as v,Bb as x,Eb as _,Ec as Q,Fc as L,Gb as m,Gc as V,Jc as N,Pb as T,Qb as g,Sb as f,Ta as I,Y as k,Ya as c,Yb as Y,Za as l,Zb as E,fa as P,fb as X,ga as S,pa as h,qa as u,qb as C,ra as M,sa as q,sb as d,tb as B,wb as a,xb as s,yb as p}from"./chunk-HD5U724E.js";import{g as st}from"./chunk-UGUGGRN7.js";var nt=st(ct());var lt=i=>["/news",i];function mt(i,n){if(i&1){let r=x();a(0,"div",12),_("click",function(){h(r);let t=m();return u(t.editCard(t.post.id))}),M(),a(1,"svg",13),p(2,"path",14)(3,"path",15),s()()}}function gt(i,n){if(i&1){let r=x();a(0,"div",16),_("click",function(){h(r);let t=m();return u(t.deleteCard(t.post.id))}),M(),a(1,"svg",17),p(2,"g",18)(3,"g",19),a(4,"g",20)(5,"g",21)(6,"g",22),p(7,"path",23),s(),a(8,"g",24),p(9,"path",25),s(),a(10,"g",26),p(11,"path",27),s()()()()()}}var O=(()=>{let n=class n{constructor(e,t,o,y,b){this.sanitizer=e,this.truncatePipe=t,this._snackBar=o,this.postService=y,this.authService=b,this.postItem=new v,this.activeCalled=new v,this.activeLocalEmitter=new v,this.idEmitter=new v,this.isLogged=!1,this.activeLocal=!0,this.formattedDate="",this.active=!1,this.isLogged=this.authService.getIsLoggedIn()}ngOnInit(){let e=this.post.created_at;this.formattedDate=(0,nt.default)(e).format("DD MMMM YYYY"),this.truncatedText=this.sanitizer.bypassSecurityTrustHtml(this.truncatePipe.transform(this.post.post_en.paragraph,200))}editCard(e){this.activeCalled.emit(this.active);try{this.postService.getPost(e).subscribe({next:t=>{this.postCard=t,this.postItem.emit(this.postCard)},error:t=>{this._snackBar.open(t.message)}})}catch(t){console.log(t)}}deleteCard(e){this.activeLocalEmitter.emit(this.activeLocal),this.idEmitter.emit(e)}};n.\u0275fac=function(t){return new(t||n)(l(J),l(Z),l(A),l(w),l(j))},n.\u0275cmp=P({type:n,selectors:[["app-card"]],inputs:{post:"post"},outputs:{postItem:"postItem",activeCalled:"activeCalled",activeLocalEmitter:"activeLocalEmitter",idEmitter:"idEmitter"},standalone:!0,features:[Y],decls:15,vars:11,consts:[[1,"card"],["class","btn edit-btn",3,"click",4,"ngIf"],["class","btn delete-btn",3,"click",4,"ngIf"],[1,"card-img",3,"routerLink"],[1,"card-info"],[1,"card-title"],[1,"card-text",3,"innerHTML"],[1,"card-admin-info"],[1,"card-admin-detail"],[1,"card-admin-img",2,"background-image","url('/storage/admin-img.png')"],[1,"card-admin-name"],[1,"card-admin-date"],[1,"btn","edit-btn",3,"click"],["fill","none","height","24","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","viewBox","0 0 24 24","width","24","xmlns","http://www.w3.org/2000/svg",1,"feather","feather-edit"],["d","M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"],["d","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],[1,"btn","delete-btn",3,"click"],["fill","#000000","height","200px","width","200px","version","1.1","id","Layer_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 330 330",0,"xml","space","preserve"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["id","XMLID_6_"],["id","XMLID_11_"],["d","M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"],["id","XMLID_18_"],["d","M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"],["id","XMLID_23_"],["d","M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"]],template:function(t,o){t&1&&(a(0,"div",0),C(1,mt,4,0,"div",1)(2,gt,12,0,"div",2),p(3,"a",3),a(4,"div",4)(5,"div",5),g(6),s(),p(7,"div",6),a(8,"div",7)(9,"div",8),p(10,"div",9),a(11,"div",10),g(12,"Arshak Khaxarian"),s()(),a(13,"div",11),g(14),s()()()()),t&2&&(c(),d("ngIf",o.isLogged),c(),d("ngIf",o.isLogged),c(),T("background-image: url('/storage/",o.post.image,"')"),d("routerLink",E(9,lt,o.post.id)),c(3),f(" ",o.post.post_en.title," "),c(),d("innerHTML",o.truncatedText,I),c(7),f(" ",o.formattedDate," "))},dependencies:[N,V,K],styles:[".card[_ngcontent-%COMP%]{max-width:365px;max-height:453px;border-radius:8px;position:relative;text-decoration:none;color:#000}.card[_ngcontent-%COMP%]:hover{box-shadow:0 4px 8px #0000001a}.card[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:25px;height:25px;z-index:999;position:absolute;padding:15px;border-radius:50%;background:#fff;cursor:pointer;transition:all .3s}.card[_ngcontent-%COMP%]   .btn.edit-btn[_ngcontent-%COMP%]{top:10px;left:10px}.card[_ngcontent-%COMP%]   .btn.edit-btn[_ngcontent-%COMP%]:hover{background:#2153b6}.card[_ngcontent-%COMP%]   .btn.edit-btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]{fill:#fff}.card[_ngcontent-%COMP%]   .btn.delete-btn[_ngcontent-%COMP%]{top:10px;right:10px}.card[_ngcontent-%COMP%]   .btn.delete-btn[_ngcontent-%COMP%]:hover{background:red}.card[_ngcontent-%COMP%]   .btn.delete-btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]{fill:#fff}.card[_ngcontent-%COMP%]   .btn.delete-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:red}.card[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:100%;height:100%;fill:#fff;stroke:#2153b6}.card[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%]{display:block;width:100%;height:205px;border-top-left-radius:8px;border-top-right-radius:8px;background-position:center;background-size:cover}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;min-height:248px;padding:20px;box-sizing:border-box;background-color:#fff;border-bottom-left-radius:8px;border-bottom-right-radius:8px}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{font-size:24px;font-weight:400}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]{font-size:14px;font-weight:500}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-admin-info[_ngcontent-%COMP%]{display:flex;align-items:center}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-admin-info[_ngcontent-%COMP%]   .card-admin-detail[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;column-gap:5px;align-items:center;border-right:1px solid gray;padding-right:10px}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-admin-info[_ngcontent-%COMP%]   .card-admin-detail[_ngcontent-%COMP%]   .card-admin-img[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-position:center;background-size:cover}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-admin-info[_ngcontent-%COMP%]   .card-admin-detail[_ngcontent-%COMP%]   .card-admin-name[_ngcontent-%COMP%]{font-size:14px;font-weight:400;color:#767676}.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-admin-info[_ngcontent-%COMP%]   .card-admin-date[_ngcontent-%COMP%]{font-size:14px;font-weight:400;color:#767676;margin-left:15px}"]});let i=n;return i})();var ut=i=>({active:i});function _t(i,n){if(i&1){let r=x();a(0,"span",9),_("click",function(){h(r);let t=m();return u(t.toggleActive(!1))}),g(1,"Add a news article"),s()}}function ft(i,n){if(i&1){let r=x();a(0,"app-card",12),_("postItem",function(t){h(r);let o=m(2);return u(o.getPostItem(t))})("activeLocalEmitter",function(){h(r);let t=m(2);return u(t.toggleActiveLocal())})("idEmitter",function(t){h(r);let o=m(2);return u(o.getId(t))})("activeCalled",function(){h(r);let t=m(2);return u(t.toggleActive(!0))}),s()}if(i&2){let r=n.$implicit;d("post",r)}}function vt(i,n){if(i&1&&(a(0,"div",10),C(1,ft,1,1,"app-card",11),s()),i&2){let r=m();c(),d("ngForOf",r.news)}}function Ct(i,n){if(i&1){let r=x();a(0,"div",24),_("click",function(){let t=h(r).$implicit,o=m(2);return u(o.changePage(t))}),g(1),s()}if(i&2){let r=n.$implicit,e=m(2);d("ngClass",E(2,ut,r===e.activePage)),c(),f(" ",r," ")}}function xt(i,n){if(i&1){let r=x();a(0,"div",13)(1,"button",14),_("click",function(){h(r);let t=m();return u(t.goToPrev())}),M(),a(2,"svg",15),p(3,"g",16)(4,"g",17),a(5,"g",18)(6,"g")(7,"g"),p(8,"polygon",19),s()()()()(),q(),a(9,"div",20),C(10,Ct,2,4,"div",21),s(),a(11,"button",22),_("click",function(){h(r);let t=m();return u(t.goToNext())}),M(),a(12,"svg",23),p(13,"g",16)(14,"g",17),a(15,"g",18)(16,"g")(17,"g"),p(18,"polygon",19),s()()()()()()}if(i&2){let r=m();B("disabled",r.activePage?r.activePage===1:!0),c(10),d("ngForOf",r.getPagesArray()),c(),B("disabled",r.activePage?r.activePage===r.postsTotal:r.activePage===1)}}var $=(()=>{let n=class n{constructor(e,t,o,y,b,at){this.authService=e,this.postService=t,this._snackBar=o,this.router=y,this.activatedRoute=b,this.zone=at,this.activeLocalEmitter=new v,this.idEmitter=new v,this.activeLocal=!1,this.isLogged=!1,this.title="",this.subtitle="",this.active=!1,this.news=[],this.pagesCount=0,this.postsTotal=0,this.activeParams={postType:"",skip:0,take:9},this.activePage=1,this.updateModalFlag=!1,this.currentRoute="",this.id=0,this.isLogged=this.authService.getIsLoggedIn(),this.checkTheRoute(),this.postService.data$.subscribe(rt=>{this.updateModalFlag=rt})}ngOnInit(){this.authService.isLogged$.subscribe(e=>{this.isLogged=e}),this.checkTheRoute(),this.activatedRoute.queryParams.subscribe(e=>{if(e.hasOwnProperty("take")){let t=e.take;this.activePage=t/9,this.changePage(this.activePage)}})}checkTheRoute(){this.currentRoute=this.router.url,this.router.events.subscribe(()=>{this.currentRoute=this.router.url,this.currentRoute.includes("news")?(this.activeParams.postType="news",this.title="News",this.subtitle="Fresh Discoveries and News on Armenian Manuscripts",this.loadPosts()):this.currentRoute.includes("articles")&&(this.title="Articles",this.subtitle="Fresh Discoveries and News on Armenian Manuscripts",this.activeParams.postType="articles",this.loadPosts())})}loadPosts(){this.postService.getPosts(this.activeParams).subscribe({next:e=>{if(e.message){this._snackBar.open(e.message);return}this.news=e.posts,this.postsTotal=e.totalPost,this.pagesCount=Math.ceil(this.postsTotal/9)}})}goToPrev(){this.activePage!==1&&(this.activePage--,this.changePage(this.activePage))}goToNext(){this.activePage>=this.pagesCount||(this.activePage++,this.changePage(this.activePage))}updateQueryParams(){this.router.navigate(["/news"],{queryParams:{skip:this.activeParams.skip,take:this.activeParams.take}}),this.loadPosts()}toggleActive(e){this.active=!this.active,this.postService.updateData(e)}getPagesArray(){return Array(this.pagesCount).fill(0).map((e,t)=>t+1)}changePage(e){this.activeParams.skip=(e-1)*9,this.activeParams.take=e*9,this.activePage=e,this.updateQueryParams()}getPostItem(e){this.postItem=e,console.log(this.postItem)}getUpdatedPost(e){let t=this.news?.find(o=>o.id===e.id);t&&(t.post_en.title=e.post_en.title,t.post_en.paragraph=e.post_en.paragraph,t.post_am.title=e.post_am.title,t.post_am.paragraph=e.post_am.paragraph)}getId(e){this.id=e}toggleActiveLocal(){this.activeLocal=!this.activeLocal}};n.\u0275fac=function(t){return new(t||n)(l(j),l(w),l(A),l(R),l(z),l(X))},n.\u0275cmp=P({type:n,selectors:[["news"]],outputs:{activeLocalEmitter:"activeLocalEmitter",idEmitter:"idEmitter"},decls:11,vars:11,consts:[[1,"news"],[1,"container"],[1,"title","news-title"],[1,"subhead","news-subhead"],["class","btn add-news-btn",3,"click",4,"ngIf"],["class","cards",4,"ngIf"],["class","pagination",3,"disabled",4,"ngIf"],[3,"postUpdated","postItem","update","active"],[3,"id","active","post"],[1,"btn","add-news-btn",3,"click"],[1,"cards"],[3,"post","postItem","activeLocalEmitter","idEmitter","activeCalled",4,"ngFor","ngForOf"],[3,"postItem","activeLocalEmitter","idEmitter","activeCalled","post"],[1,"pagination"],[1,"pagination-arrow","prev",3,"click"],["height","200px","width","200px","version","1.1","id","Capa_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 227.096 227.096",0,"xml","space","preserve","fill","#000000","transform","rotate(180)"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["points","152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723 146.933,181.902 152.835,187.811 227.096,113.55 ",2,"fill","#ffffff"],[1,"pagination-items"],["class","pagination-item",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"pagination-arrow","next",3,"click"],["height","200px","width","200px","version","1.1","id","Capa_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 227.096 227.096",0,"xml","space","preserve","fill","#000000","transform","rotate(0)"],[1,"pagination-item",3,"click","ngClass"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"div",1)(2,"div",2),g(3),s(),a(4,"div",3),g(5),s(),C(6,_t,2,0,"span",4)(7,vt,2,1,"div",5)(8,xt,19,5,"div",6),s(),a(9,"admin-modal",7),_("postUpdated",function(b){return o.getUpdatedPost(b)}),s(),p(10,"app-modal",8),s()),t&2&&(c(3),f(" ",o.title," "),c(2),f(" ",o.subtitle," "),c(),d("ngIf",o.isLogged),c(),d("ngIf",o.news&&o.news.length>0),c(),d("ngIf",o.postsTotal>9),c(),d("postItem",o.postItem)("update",o.updateModalFlag)("active",o.active),c(),d("id",o.id)("active",o.activeLocal)("post",!0))},dependencies:[Q,L,V,O,D,F],styles:[".news[_ngcontent-%COMP%]{background:#1f222e;padding-top:190px;padding-bottom:275px;margin-top:-106px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title.news-title[_ngcontent-%COMP%]{margin-bottom:30px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .subhead.news-subhead[_ngcontent-%COMP%]{margin-bottom:50px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(365px,1fr));grid-auto-rows:453px;grid-gap:30px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .btn.add-news-btn[_ngcontent-%COMP%]{cursor:pointer;display:inline-block;text-align:center;padding:20px;width:130px;background:#2153b6;color:#fff;font-size:16px;border-radius:8px;margin-bottom:30px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]{margin-top:50px;width:100%;display:flex;justify-content:center;align-items:center}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-items[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:10px;margin:0 10px}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-items[_ngcontent-%COMP%]   .pagination-item[_ngcontent-%COMP%]{cursor:pointer;font-size:20px;padding:6px;box-sizing:border-box;width:35px;text-align:center;height:35px;border-radius:50%;background:#1f222e;color:#fff}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-items[_ngcontent-%COMP%]   .pagination-item.active[_ngcontent-%COMP%]{background:#fff;color:#2153b6}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-arrow[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;cursor:pointer}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-arrow[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:25px;height:25px;stroke:#fff}@media screen and (max-width: 1200px){.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,365px);grid-template-rows:repeat(4,453px);grid-gap:30px}}@media screen and (max-width: 470px){.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;justify-content:center}.news[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(1,310px);grid-template-rows:repeat(3,453px);grid-gap:30px}}"]});let i=n;return i})();function Pt(i,n){if(i&1&&p(0,"app-card",14),i&2){let r=n.$implicit;d("post",r)}}var U=(()=>{let n=class n{constructor(e,t,o){this.router=e,this.postService=t,this.activatedRoute=o,this.posts=[],this.params={postType:"",take:3,skip:0},this.currentRoute="",this.text=`<h1>Treasures of Armenian Manuscripts
Dive into the world of Armenian manuscripts, where history and art intertwine. These ancient documents preserve the rich cultural heritage and literary accomplishments of the Armenian people. Spanning centuries, they include religious texts, historical chronicles, and literary works that reflect the intellectual and artistic achievements of Armenia. Each manuscript offers a unique glimpse into the past, showcasing the vibrant traditions and enduring spirit of the Armenian civilization.

Historical Significance
Armenian manuscripts are not just books; they are vital pieces of history that document the evolution of Armenian culture and identity. These manuscripts date back to as early as the 5th century, a period that marks the creation of the Armenian alphabet by Saint Mesrop Mashtots. This invention was a pivotal moment in Armenian history, allowing for the transcription of oral traditions, religious texts, and scholarly works.

Religious Texts
One of the most significant categories of Armenian manuscripts is religious texts. These include beautifully illuminated Bibles, prayer books, and theological writings. The intricate illustrations and calligraphy in these texts not only serve a decorative purpose but also convey theological and moral lessons. The Armenian Church played a crucial role in preserving these manuscripts, which are considered sacred and are still used in liturgical practices today.

Historical Chronicles
Armenian historical chronicles are invaluable resources that provide detailed accounts of the country's history, including its interactions with neighboring nations, internal conflicts, and significant events. These chronicles were often written by monks and scholars who meticulously recorded events as they unfolded. They offer a unique perspective on historical events from an Armenian viewpoint, making them essential for understanding the broader history of the region.</h1>`}ngOnInit(){this.currentRoute=this.router.url,this.router.events.subscribe(()=>{this.currentRoute=this.router.url,this.currentRoute.includes("news")?this.params.postType="news":this.currentRoute.includes("article")&&(this.params.postType="articles")}),this.activatedRoute.params.subscribe(e=>{this.postService.getPost(e.id).subscribe({next:t=>{if(t.success===0)throw new Error(t.message);this.post=t.post,console.log(this.post),this.postService.getPosts(this.params).subscribe({next:o=>{if(o.success===0)throw new Error(o.message);this.posts=o.posts},error:o=>{}})},error:t=>{throw new Error(t.message)}})})}};n.\u0275fac=function(t){return new(t||n)(l(R),l(w),l(z))},n.\u0275cmp=P({type:n,selectors:[["news-detail"]],decls:18,vars:6,consts:[[1,"detail"],[1,"container"],[1,"title","detail-title"],[1,"detail-admin-info"],[1,"detail-admin-details"],[1,"detail-admin-img"],[1,"detail-admin-name"],[1,"detail-admin-date"],[1,"detail-img"],[1,"detail-text",3,"innerHTML"],[1,"detail-explore-more"],[1,"detail-explore-more-title"],[1,"detail-explore-more-cards"],[3,"post",4,"ngFor","ngForOf"],[3,"post"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"div",1)(2,"div",2),g(3),s(),a(4,"div",3)(5,"div",4),p(6,"div",5),a(7,"div",6),g(8," Rafael Ghazarian "),s()(),a(9,"div",7),g(10," 06 June 2024 "),s()(),p(11,"div",8)(12,"div",9),a(13,"div",10)(14,"div",11),g(15," Explore More News "),s(),a(16,"div",12),C(17,Pt,1,1,"app-card",13),s()()()()),t&2&&(c(3),f(" ",o.post.post_en.title," "),c(8),T("background-image: url('/storage/",o.post.image,"')"),c(),d("innerHTML",o.post.post_en.paragraph,I),c(5),d("ngForOf",o.posts))},dependencies:[L,O],styles:[".detail[_ngcontent-%COMP%]{background:#1f222e;padding-top:190px;padding-bottom:275px;margin-top:-106px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{max-width:700px;margin-left:100px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-admin-info[_ngcontent-%COMP%]{margin:35px auto 51px 100px;display:flex;max-width:320px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-admin-info[_ngcontent-%COMP%]   .detail-admin-details[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;color:#fff}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-admin-info[_ngcontent-%COMP%]   .detail-admin-details[_ngcontent-%COMP%]   .detail-admin-img[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-image:url(/assets/images/admin-img.png);background-size:cover;background-position:center;margin-right:15px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-admin-info[_ngcontent-%COMP%]   .detail-admin-details[_ngcontent-%COMP%]   .detail-admin-name[_ngcontent-%COMP%]{font-size:14px;font-weight:500;padding-right:30px;box-sizing:border-box;border-right:1px solid rgb(187,200,212)}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-admin-info[_ngcontent-%COMP%]   .detail-admin-date[_ngcontent-%COMP%]{font-weight:500;margin-left:30px;text-align:center;height:17px;align-self:center;color:#fff;font-size:14px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-img[_ngcontent-%COMP%]{width:1100px;height:450px;margin:0 auto;background-size:cover;background-position:center;background-repeat:no-repeat}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-text[_ngcontent-%COMP%]{max-width:900px;margin:0 auto;padding-bottom:50px;border-bottom:1px solid gray;color:#fff}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-explore-more[_ngcontent-%COMP%]   .detail-explore-more-title[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#fff;margin-top:150px;margin-bottom:30px}.detail[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .detail-explore-more[_ngcontent-%COMP%]   .detail-explore-more-cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap:15px}"]});let i=n;return i})();var Mt=[{path:"articles/:id",component:U,data:{animation:"ArticleDetailComponent"}},{path:"articles",component:$,data:{animation:"ArticleCatalogComponent"}},{path:"news",component:$,data:{animation:"NewsComponent"}},{path:"news/:id",component:U,data:{animation:"NewsDetailComponent"}}],ot=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=S({type:n}),n.\u0275inj=k({imports:[G.forChild(Mt),G]});let i=n;return i})();var ne=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=S({type:n}),n.\u0275inj=k({imports:[N,O,W,D,ot,F]});let i=n;return i})();export{ne as a};