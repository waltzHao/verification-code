import{d as h,c as f,a as m,F as v,r as b,u as d,o as p,w as E,v as w,b as x,e as A}from"./vendor.7efa87f6.js";const P=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};P();const k=m("h2",{class:"title"},"Verification Code",-1),D=m("span",null,"Please enter the code that we sent to your mobile number ***-*****.",-1),L=["id","onUpdate:modelValue","onKeydown"],S=h({setup(g){let i=Array(6),s;const u=["0","1","2","3","4","5","6","7","8","9"];function e(n){n.target.value="";const r=n.key;u.includes(r)||n.preventDefault()}function t(n){var l,c;console.log("trigger onInput Event");const r=n.inputType;let o=n.target;if(r==="insertText"&&((l=o.nextElementSibling)==null||l.focus()),r==="insertFromPaste"&&s)for(const _ of s)o.value=_,o.nextElementSibling&&(o=o.nextElementSibling,(c=o.nextElementSibling)==null||c.focus());console.log(i)}function a(n){var l;let r=n.target.value,o=n.target;r||(l=o.previousElementSibling)==null||l.focus()}function y(n){var r;if(s=(r=n.clipboardData)==null?void 0:r.getData("text").trim().split(""),s)for(const o of s)u.includes(o)||n.preventDefault()}return(n,r)=>(p(),f("div",null,[k,D,m("form",null,[(p(!0),f(v,null,b(d(i),(o,l)=>E((p(),f("input",{key:l,type:"text",pattern:"\\d*",id:"input_"+l,maxlength:"1","onUpdate:modelValue":c=>d(i)[l]=c,onInput:t,onKeypress:e,onKeydown:x(a,["delete"]),onPaste:y},null,40,L)),[[w,d(i)[l]]])),128))])]))}});A(S).mount("#app");
