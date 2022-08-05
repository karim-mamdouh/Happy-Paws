"use strict";(self.webpackChunkHappy_Paws=self.webpackChunkHappy_Paws||[]).push([[592],{5054:(b,d,r)=>{r.d(d,{$:()=>I,E:()=>y});var e=r(4650),l=r(6895),p=r(805),c=r(7340),m=r(9592),_=r(982);const g=["mask"];function h(t,o){1&t&&e.GkF(0)}function u(t,o){if(1&t&&(e.ynx(0),e.YNc(1,h,1,0,"ng-container",7),e.BQk()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",i.indicatorTemplate)}}function v(t,o){1&t&&e._UZ(0,"i",8)}function f(t,o){if(1&t){const i=e.EpF();e.TgZ(0,"div",4),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.onImageClick())}),e.YNc(1,u,2,1,"ng-container",5),e.YNc(2,v,1,0,"ng-template",null,6,e.W1O),e.qZA()}if(2&t){const i=e.MAs(3),n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.indicatorTemplate)("ngIfElse",i)}}const w=function(t,o){return{showTransitionParams:t,hideTransitionParams:o}},k=function(t){return{value:"visible",params:t}};function T(t,o){if(1&t){const i=e.EpF();e.TgZ(0,"div"),e.NdJ("@animation.start",function(a){e.CHM(i);const s=e.oxw(2);return e.KtG(s.onAnimationStart(a))})("@animation.done",function(a){e.CHM(i);const s=e.oxw(2);return e.KtG(s.onAnimationEnd(a))}),e.TgZ(1,"img",20),e.NdJ("click",function(){e.CHM(i);const a=e.oxw(2);return e.KtG(a.onPreviewImageClick())}),e.qZA()()}if(2&t){const i=e.oxw(2);e.Q6J("@animation",e.VKq(6,k,e.WLB(3,w,i.showTransitionOptions,i.hideTransitionOptions))),e.xp6(1),e.Q6J("ngStyle",i.imagePreviewStyle()),e.uIk("src",i.src,e.LSH)}}function C(t,o){if(1&t){const i=e.EpF();e.TgZ(0,"div",9,10),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.onMaskClick())}),e.TgZ(2,"div",11),e.NdJ("click",function(a){e.CHM(i);const s=e.oxw();return e.KtG(s.handleToolbarClick(a))}),e.TgZ(3,"button",12),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.rotateRight())}),e._UZ(4,"i",13),e.qZA(),e.TgZ(5,"button",12),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.rotateLeft())}),e._UZ(6,"i",14),e.qZA(),e.TgZ(7,"button",15),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.zoomOut())}),e._UZ(8,"i",16),e.qZA(),e.TgZ(9,"button",15),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.zoomIn())}),e._UZ(10,"i",17),e.qZA(),e.TgZ(11,"button",12),e.NdJ("click",function(){e.CHM(i);const a=e.oxw();return e.KtG(a.closePreview())}),e._UZ(12,"i",18),e.qZA()(),e.YNc(13,T,2,8,"div",19),e.qZA()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("disabled",i.isZoomOutDisabled),e.xp6(2),e.Q6J("disabled",i.isZoomInDisabled),e.xp6(4),e.Q6J("ngIf",i.previewVisible)}}let y=(()=>{class t{constructor(i,n){this.config=i,this.cd=n,this.preview=!1,this.showTransitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)",this.hideTransitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)",this.onShow=new e.vpe,this.onHide=new e.vpe,this.maskVisible=!1,this.previewVisible=!1,this.rotate=0,this.scale=1,this.previewClick=!1,this.zoomSettings={default:1,step:.1,max:1.5,min:.5}}get isZoomOutDisabled(){return this.scale-this.zoomSettings.step<=this.zoomSettings.min}get isZoomInDisabled(){return this.scale+this.zoomSettings.step>=this.zoomSettings.max}ngAfterContentInit(){this.templates.forEach(i=>{i.getType(),this.indicatorTemplate=i.template})}onImageClick(){this.preview&&(this.maskVisible=!0,this.previewVisible=!0)}onMaskClick(){this.previewClick||this.closePreview(),this.previewClick=!1}onPreviewImageClick(){this.previewClick=!0}rotateRight(){this.rotate+=90,this.previewClick=!0}rotateLeft(){this.rotate-=90,this.previewClick=!0}zoomIn(){this.scale=this.scale+this.zoomSettings.step,this.previewClick=!0}zoomOut(){this.scale=this.scale-this.zoomSettings.step,this.previewClick=!0}onAnimationStart(i){switch(i.toState){case"visible":this.container=i.element,this.wrapper=this.container.parentElement,this.appendContainer(),this.moveOnTop();break;case"void":m.p.addClass(this.wrapper,"p-component-overlay-leave")}}onAnimationEnd(i){switch(i.toState){case"void":_.P9.clear(this.wrapper),this.maskVisible=!1,this.container=null,this.wrapper=null,this.cd.markForCheck(),this.onHide.emit({});break;case"visible":this.onShow.emit({})}}moveOnTop(){_.P9.set("modal",this.wrapper,this.config.zIndex.modal)}appendContainer(){this.appendTo&&("body"===this.appendTo?document.body.appendChild(this.wrapper):m.p.appendChild(this.wrapper,this.appendTo))}imagePreviewStyle(){return{transform:"rotate("+this.rotate+"deg) scale("+this.scale+")"}}containerClass(){return{"p-image p-component":!0,"p-image-preview-container":this.preview}}handleToolbarClick(i){i.stopPropagation()}closePreview(){this.previewVisible=!1,this.rotate=0,this.scale=this.zoomSettings.default}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(p.b4),e.Y36(e.sBO))},t.\u0275cmp=e.Xpm({type:t,selectors:[["p-image"]],contentQueries:function(i,n,a){if(1&i&&e.Suo(a,p.jx,4),2&i){let s;e.iGM(s=e.CRH())&&(n.templates=s)}},viewQuery:function(i,n){if(1&i&&e.Gf(g,5),2&i){let a;e.iGM(a=e.CRH())&&(n.mask=a.first)}},hostAttrs:[1,"p-element"],inputs:{imageClass:"imageClass",imageStyle:"imageStyle",styleClass:"styleClass",style:"style",src:"src",alt:"alt",width:"width",height:"height",appendTo:"appendTo",preview:"preview",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onShow:"onShow",onHide:"onHide"},decls:4,vars:13,consts:[[3,"ngClass","ngStyle"],[3,"ngStyle"],["class","p-image-preview-indicator",3,"click",4,"ngIf"],["class","p-image-mask p-component-overlay p-component-overlay-enter",3,"click",4,"ngIf"],[1,"p-image-preview-indicator",3,"click"],[4,"ngIf","ngIfElse"],["defaultTemplate",""],[4,"ngTemplateOutlet"],[1,"p-image-preview-icon","pi","pi-eye"],[1,"p-image-mask","p-component-overlay","p-component-overlay-enter",3,"click"],["mask",""],[1,"p-image-toolbar",3,"click"],["type","button",1,"p-image-action","p-link",3,"click"],[1,"pi","pi-refresh"],[1,"pi","pi-undo"],["type","button",1,"p-image-action","p-link",3,"disabled","click"],[1,"pi","pi-search-minus"],[1,"pi","pi-search-plus"],[1,"pi","pi-times"],[4,"ngIf"],[1,"p-image-preview",3,"ngStyle","click"]],template:function(i,n){1&i&&(e.TgZ(0,"span",0),e._UZ(1,"img",1),e.YNc(2,f,4,2,"div",2),e.YNc(3,C,14,3,"div",3),e.qZA()),2&i&&(e.Tol(n.styleClass),e.Q6J("ngClass",n.containerClass())("ngStyle",n.style),e.xp6(1),e.Tol(n.imageClass),e.Q6J("ngStyle",n.imageStyle),e.uIk("src",n.src,e.LSH)("alt",n.alt)("width",n.width)("height",n.height),e.xp6(1),e.Q6J("ngIf",n.preview),e.xp6(1),e.Q6J("ngIf",n.maskVisible))},dependencies:[l.mk,l.O5,l.tP,l.PC],styles:[".p-image-mask{display:flex;align-items:center;justify-content:center}.p-image-preview-container{position:relative;display:inline-block}.p-image-preview-indicator{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}.p-image-preview-icon{font-size:1.5rem}.p-image-preview-container:hover>.p-image-preview-indicator{opacity:1;cursor:pointer}.p-image-preview-container>img{cursor:pointer}.p-image-toolbar{position:absolute;top:0;right:0;display:flex;z-index:1}.p-image-action.p-link{display:flex;justify-content:center;align-items:center}.p-image-action.p-link[disabled]{opacity:.5}.p-image-preview{transition:transform .15s;max-width:100vw;max-height:100vh}\n"],encapsulation:2,data:{animation:[(0,c.X$)("animation",[(0,c.eR)("void => visible",[(0,c.oB)({transform:"scale(0.7)",opacity:0}),(0,c.jt)("{{showTransitionParams}}")]),(0,c.eR)("visible => void",[(0,c.jt)("{{hideTransitionParams}}",(0,c.oB)({transform:"scale(0.7)",opacity:0}))])])]},changeDetection:0}),t})(),I=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,p.m8]}),t})()}}]);