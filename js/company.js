/* ---------- Карточка компании: навигация по разделам, контакты, избранное, отзывы, мобильная панель ---------- */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var nav=$('#cpNav');if(!nav)return;
var root=document.documentElement,hdr=$('#hdr');

/* липкая навигация держится сразу под шапкой, высота которой меняется при прокрутке */
function setTop(){if(hdr)root.style.setProperty('--cpt',Math.round(hdr.getBoundingClientRect().bottom-4)+'px')}

/* подсветка текущего раздела */
var links=$$('a',nav),lock=null,lockT;
function mark(cur){
 if(cur.classList.contains('on'))return;
 links.forEach(function(a){a.classList.toggle('on',a===cur);if(a===cur)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
 nav.scrollTo({left:cur.offsetLeft-nav.clientWidth/2+cur.offsetWidth/2,behavior:'smooth'});
}
function spy(){
 if(lock)return;
 var line=nav.getBoundingClientRect().bottom+40,cur=links[0];
 links.forEach(function(a){if(!a.offsetParent)return;var s=$(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<line)cur=a});
 if((window.innerHeight+window.scrollY)>=document.documentElement.scrollHeight-4){
  /* у самого низа страницы последний раздел может не дойти до линии — тогда активен последний видимый */
  var vis=links.filter(function(a){var s=$(a.getAttribute('href'));return a.offsetParent&&s&&s.getBoundingClientRect().top<window.innerHeight});if(vis.length)cur=vis[vis.length-1];
 }
 mark(cur);
}

/* высота шапки сайта зависит от направления прокрутки: вниз — компактная, вверх — полная.
   Поэтому отступ считаем для того состояния шапки, которое будет в конце прокрутки */
var hFull=0,hCompact=0;
/* полную высоту main.js кладёт в --hh, когда шапка не сжата; сжатая = без строки курсов (40 + 10 px) и с карточкой 62 px вместо 72.
   Замер во время анимации шапки дал бы промежуточную высоту, поэтому считаем из стабильных значений */
function measure(){
 hFull=parseFloat(getComputedStyle(root).getPropertyValue('--hh'))||(hdr?hdr.offsetHeight:80);
 hCompact=hFull-50-(hdr&&hdr.classList.contains('collapsed')?0:10);
}
links.forEach(function(a){a.addEventListener('click',function(e){
 var s=$(a.getAttribute('href'));if(!s)return;e.preventDefault();
 measure();
 var abs=s.getBoundingClientRect().top+window.scrollY;
 var y=Math.max(0,Math.round(abs-(hCompact-4+nav.offsetHeight+16))),compact=y>200;
 if(!compact)y=Math.max(0,Math.round(abs-(hFull-4+nav.offsetHeight+16)));
 /* на время прокрутки шапка не меняется: сжата, если раздел ниже первого экрана */
 root.setAttribute('data-hdr-lock','');if(hdr)hdr.classList.toggle('compact',compact);
 lock=a;mark(a);
 window.scrollTo({top:y,behavior:'smooth'});
 history.replaceState(null,'',a.getAttribute('href'));
 clearTimeout(lockT);lockT=setTimeout(unlock,1200);
})});
function unlock(){lock=null;root.removeAttribute('data-hdr-lock');setTop();spy();setTimeout(function(){if(!lock){setTop();spy()}},300)}
var tick=false;
function onScroll(){
 if(lock){clearTimeout(lockT);lockT=setTimeout(unlock,180)}
 if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;measure();setTop();spy()})}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll);
measure();setTop();spy();setTimeout(setTop,300);

/* телефон открывается по клику: так компания видит, сколько раз его смотрели */
$$('.cp-show').forEach(function(b){b.addEventListener('click',function(){
 var a=document.createElement('a');a.href='tel:'+b.dataset.tel;a.textContent=b.dataset.label;
 var box=b.parentNode;box.innerHTML='';box.appendChild(a);a.focus();
})});

/* избранное — только в этом браузере */
var save=$('#cpSave'),KEY='b24-fav-hashpark';
function paintSave(on){save.setAttribute('aria-pressed',String(on));save.setAttribute('aria-label',on?'Убрать из избранного':'Сохранить в избранное')}
try{paintSave(localStorage.getItem(KEY)==='1')}catch(e){}
save.addEventListener('click',function(){var on=save.getAttribute('aria-pressed')!=='true';paintSave(on);try{on?localStorage.setItem(KEY,'1'):localStorage.removeItem(KEY)}catch(e){}});

/* поделиться: системное меню на телефоне, иначе — копирование ссылки */
var share=$('#cpShare');
share.addEventListener('click',function(){
 if(navigator.share){navigator.share({title:document.title,url:location.href}).catch(function(){});return}
 var done=function(){share.classList.add('done');setTimeout(function(){share.classList.remove('done')},1800)};
 if(navigator.clipboard)navigator.clipboard.writeText(location.href).then(done,function(){});
});

/* открыт ли офис сейчас — по иркутскому времени (UTC+8) */
var op=$('#cpOpen');
if(op){
 var t=new Date(Date.now()+8*36e5),d=t.getUTCDay(),h=t.getUTCHours()+t.getUTCMinutes()/60,work=d>=1&&d<=5;
 var open=work&&h>=9&&h<19;
 op.classList.toggle('on',open);
 op.textContent=open?'Сейчас открыто · до 19:00':'Сейчас закрыто · откроется '+(work&&h<9?'сегодня':d>=1&&d<=4?'завтра':'в понедельник')+' в 9:00';
}

/* остальные отзывы: на проде — подгрузка следующей страницы */
var more=$('#rvMore');
if(more)more.addEventListener('click',function(){$$('#rvList .rv[hidden]').forEach(function(r){r.hidden=false});more.hidden=true});

/* мобильная панель «Позвонить / Написать»: видна, когда кнопки шапки и блок контактов вне экрана */
var bar=$('#cpBar');
if(bar&&'IntersectionObserver' in window){
 var seen={};
 var io=new IntersectionObserver(function(es){
  es.forEach(function(e){seen[e.target.id]=e.isIntersecting});
  var on=!seen.cpActs&&!seen.contacts&&!seen.subscribe;
  bar.classList.toggle('on',on);bar.setAttribute('aria-hidden',String(!on));
  $$('a,button',bar).forEach(function(x){x.tabIndex=on?0:-1});
 });
 ['cpActs','contacts','subscribe'].forEach(function(id){var el=document.getElementById(id);if(el){seen[id]=false;io.observe(el)}});
 seen.cpActs=true;
}
})();
