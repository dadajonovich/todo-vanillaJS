(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();let a=JSON.parse(localStorage.getItem("tasks"))||[];const i=document.querySelector(".list"),c=document.forms.addTask,d=c.elements.taskText,g=document.querySelector(".list__counter"),f=document.querySelector(".input__text"),v=window.matchMedia("(max-width: 640px)"),y=t=>{t.matches?f.placeholder="???":f.placeholder="Что делать будем?"};v.addEventListener("change",y);const p=()=>{document.activeElement===d?c.classList.add("input__highlight"):c.classList.remove("input__highlight")};d.addEventListener("focus",p);d.addEventListener("blur",p);const h=t=>{t.target.classList.add("list__item-dragging")},L=t=>{t.target.classList.remove("list__item-dragging")},b=t=>{t.preventDefault();const e=i.querySelector(".list__item-dragging"),r=t.target;if(!(e!==r&&r.classList.contains("list__item")))return;const n=r===e.nextElementSibling?r.nextElementSibling:r;i.insertBefore(e,n)},w=()=>{const t=[];i.querySelectorAll(".list__item").forEach(r=>{const o=r.getAttribute("data-task-id"),n=a.find(s=>s._id===o);t.push(n)}),a=[...t],u(a)};i.addEventListener("dragover",b);i.addEventListener("dragend",w);const k=(t,e)=>{try{if(!t)throw new Error("Нет задач!");const r=document.createDocumentFragment();return Object.values(t).forEach(o=>{const n=e(o);n.addEventListener("dragstart",s=>h(s)),n.addEventListener("dragend",s=>L(s)),r.append(n)}),i.append(r),!0}catch(r){return console.log(r.message),r}},_=({_id:t,body:e}={})=>{const r=document.createElement("li");r.classList.add("list__item"),r.setAttribute("data-task-id",t),r.setAttribute("draggable",!0);const o=document.createElement("div");o.classList.add("list__task");const n=document.createElement("p");n.classList.add("list__text"),n.textContent=e;const s=document.createElement("span");return s.classList.add("list__delete-btn"),s.insertAdjacentHTML("afterbegin","&#10006;"),o.append(n,s),r.append(o),r};k(a,_);const S=t=>{try{const{value:e}=t;if(!e)throw Error;return c.reset(),e}catch(e){throw Swal.fire("Нет дел - нет проблем!"),e("Пустой input - код остановлен!")}},O=t=>e=>{const r={body:e,completed:!1,_id:`task-${Math.random()}`},o=t(r);return o.addEventListener("dragstart",n=>h(n)),o.addEventListener("dragend",n=>L(n)),i.prepend(o),r},T=t=>{const e=[t,...a];return a=[...e],e},u=t=>{try{return localStorage.setItem("tasks",JSON.stringify(t)),t}catch(e){throw e("Произошла ошибка в changeLocalStorage")}},m=t=>{const e=Object.keys(t).length;e!==0?g.textContent=`${e} items`:g.textContent="Безделье это игрушка дьявола..."};document.addEventListener("DOMContentLoaded",t=>m(a));const E=(...t)=>e=>t.reduce((r,o)=>o(r),e),I=E(S,O(_),T,u,m),x=t=>(t.preventDefault(),I(d));c.addEventListener("submit",x);const C=({target:t})=>{try{if(!t.classList.contains("list__delete-btn"))throw Error;const e=t.closest("[data-task-id]");return{id:e.dataset.taskId,parent:e}}catch(e){throw e("Событие не на кнопке удаления!")}},M=({id:t,parent:e})=>{try{if(!confirm("С глаз долой?"))throw Error;const o=a.filter(n=>n._id!==t);return e.remove(),a=[...o],o}catch(r){throw r("Удаление не было подтверждено в delTask")}},j=E(C,M,u,m);i.addEventListener("click",j);
