/* ---------- Страница статьи: содержание, прогресс чтения, закладки, реакции, курс монеты ---------- */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var prose=$('#prose'),art=$('#art');if(!prose||!art)return;

/* содержание собирается из подзаголовков текста: блок в начале статьи и плавающая плашка */
var hs=$$('h2[id]',prose);
var items=hs.map(function(h){return '<li><a href="#'+h.id+'">'+h.textContent+'</a></li>'}).join('');
/* блок «Содержание» необязателен: без него плашка не показывается */
var tocIn=$('#tocIn'),fl=$('#tocFl'),pill=$('#tocPill'),pop=$('#tocPop');
if(!tocIn||!hs.length){if(tocIn)tocIn.remove();if(fl)fl.remove();fl=null}
else{$('#toc').innerHTML=items;$('ol',pop).innerHTML=items}
var links=$$('#toc a,#tocPop a');
function openPop(on){if(!fl)return;pop.hidden=!on;pill.setAttribute('aria-expanded',String(on))}
if(fl){pill.addEventListener('click',function(){openPop(pop.hidden)});
pop.addEventListener('click',function(e){if(e.target.closest('a'))openPop(false)});
document.addEventListener('click',function(e){if(!pop.hidden&&!e.target.closest('#tocFl'))openPop(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden){openPop(false);pill.focus()}});}

/* прогресс: полоса сверху и в плашке; плашка видна, пока оглавление выше экрана, а статья ещё не дочитана */
var bar=$('#artProgress'),tbar=$('#tocBar'),tk=false;
function upd(){
 tk=false;
 var r=art.getBoundingClientRect(),vh=window.innerHeight,total=r.height-vh*.6,p=Math.max(0,Math.min(1,-r.top/(total>0?total:1)));
 bar.style.transform='scaleX('+p.toFixed(4)+')';
 if(!fl)return;
 tbar.style.width=(p*100).toFixed(1)+'%';
 var cur=0;hs.forEach(function(h,i){if(h.getBoundingClientRect().top<vh*.35)cur=i});
 links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+hs[cur].id)});
 $('#tocN').textContent=(cur+1)+'/'+hs.length;$('#tocC').textContent=hs[cur].textContent;
 var show=tocIn.getBoundingClientRect().bottom<0&&prose.getBoundingClientRect().bottom>vh*.4;
 fl.classList.toggle('on',show);if(!show)openPop(false);
}
window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
window.addEventListener('resize',upd);upd();

/* закладка и реакции — пока локально, на проде сохранять на сервере */
var KEY='b24-art-'+location.pathname;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var st=load(),sv=$('[data-save]');
function paintSave(){sv.setAttribute('aria-pressed',String(!!st.saved));$('span',sv).textContent=st.saved?'В закладках':'В закладки'}
sv.addEventListener('click',function(){st.saved=!st.saved;save(st);paintSave()});paintSave();
var votes=$$('[data-vote]');votes.forEach(function(b){b.dataset.n=$('b',b).textContent});
function paintVote(){votes.forEach(function(b){var on=st.vote===b.dataset.vote;b.setAttribute('aria-pressed',String(on));$('b',b).textContent=+b.dataset.n+(on?1:0)})}
votes.forEach(function(b){b.addEventListener('click',function(){st.vote=st.vote===b.dataset.vote?null:b.dataset.vote;save(st);paintVote()})});paintVote();

/* копирование ссылки */
$$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
 var url='https://blockchain24.pro/everscale-ever-za-sutki-poteryal-20-protsentov-stoimosti-na-novosti-o-krazhe-tokenov';
 var done=function(){b.classList.add('done');setTimeout(function(){b.classList.remove('done')},1600)};
 if(navigator.clipboard)navigator.clipboard.writeText(url).then(done,done);else done();
})});

/* курс монеты из статьи: CoinGecko, при ошибке остаются данные на дату публикации */
var nf=function(x,d){return x.toLocaleString('ru-RU',{minimumFractionDigits:d,maximumFractionDigits:d})};
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=everscale',{headers:{accept:'application/json'}})
 .then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
 .then(function(l){
  var x=l&&l[0];if(!x||x.current_price==null)return;
  var p=x.current_price,c=x.price_change_percentage_24h||0,d=p>=1?2:p>=0.01?4:6;
  $('#everP').textContent=nf(p,d)+' $';
  var e=$('#everC');e.className='chg '+(c>=0?'up':'down');e.textContent=(c>=0?'▲':'▼')+nf(Math.abs(c),2)+'%';
  var t=new Date();$('#everS').textContent='за 24 часа · CoinGecko, '+String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');
  if(x.image){var ic=$('.coin-ic');ic.innerHTML='<img src="'+x.image+'" alt="" onerror="this.remove()">'}
 }).catch(function(){});
})();
