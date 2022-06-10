import{_ as U,d as h,e as k,x as J,r as f,o as c,c as p,a as A,t as o,f as t,w as e,C as s,g as l,p as v,q as S}from"./index.c9a087b9.js";import{u as i}from"./user.b7317845.js";var b="data:image/png;base64,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",F="data:image/png;base64,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",K="data:image/png;base64,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";const B=I=>(v("data-v-420ed771"),I=I(),S(),I),m={class:"h-full flex flex-col items-center gap-16"},x={class:"heading1-mobile sm:heading1 text-center"},P={class:"flex flex-col gap-16 sm:flex-row"},G={class:"text-center"},w=B(()=>A("label",{for:"layout-1",class:"cursor-pointer"},[A("img",{src:b})],-1)),V={class:"text-center"},X=B(()=>A("label",{for:"layout-2",class:"cursor-pointer"},[A("img",{src:F})],-1)),q={class:"text-center"},N=B(()=>A("label",{for:"layout-3",class:"cursor-pointer"},[A("img",{src:K})],-1)),Y={class:"flex flex-col gap-8 sm:flex-row fix-padding-bottom"},W={class:"w-[294px] btn-secondary"},T=B(()=>A("span",{class:"i-custom:add w-6 h-6 text-blacks-70"},null,-1)),L={class:"subleading vertical-middle ml-2"},y=B(()=>A("span",{class:"i-custom:collapse w-6 h-6"},null,-1)),z={class:"subleading vertical-middle ml-2"},n=h({setup(I){const a=i(),{t:E}=k(),u=J(),C=f(a.layout||1),r=()=>{a.$patch(d=>{d.layout=C.value}),u.push("/template")};return(d,Q)=>(c(),p("div",m,[A("h1",x,o(t(E)("layout.title")),1),A("div",P,[A("div",G,[w,e(A("input",{id:"layout-1","onUpdate:modelValue":Q[0]||(Q[0]=g=>C.value=g),class:"btn-radio mt-8",type:"radio",name:"layout",value:1},null,512),[[s,C.value]])]),A("div",V,[X,e(A("input",{id:"layout-2","onUpdate:modelValue":Q[1]||(Q[1]=g=>C.value=g),class:"btn-radio mt-8",type:"radio",name:"layout",value:2},null,512),[[s,C.value]])]),A("div",q,[N,e(A("input",{id:"layout-3","onUpdate:modelValue":Q[2]||(Q[2]=g=>C.value=g),class:"btn-radio mt-8",type:"radio",name:"layout",value:3},null,512),[[s,C.value]])])]),A("div",Y,[A("button",W,[T,A("span",L,o(t(E)("layout.button.upload_cv")),1)]),A("button",{class:"w-[294px] btn-primary",onClick:r},[y,A("span",z,o(t(E)("layout.button.next_step")),1)])])]))}});typeof l=="function"&&l(n);var D=U(n,[["__scopeId","data-v-420ed771"]]);export{D as default};
