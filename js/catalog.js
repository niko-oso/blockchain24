/* ---------- Каталог компаний: поиск, категории, город, «только проверенные», сортировка ---------- */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var list=$('#ctList');if(!list)return;
var cards=$$('.co',list),cta=$('.ct-cta',list),cat='',sort='rate';
var low=function(s){return String(s).toLowerCase().replace(/ё/g,'е')};
var plural=function(n,a,b,c){var m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c};

function apply(){
 var q=low($('#ctQ').value.trim()),city=$('#ctCity').value,ver=$('#ctVer').checked,shown=0;
 cards.forEach(function(c){
  var on=(!cat||(' '+c.dataset.cat+' ').indexOf(' '+cat+' ')>-1)&&(!city||c.dataset.city===city)&&(!ver||c.dataset.ver==='1')&&(!q||low(c.textContent).indexOf(q)>-1);
  c.hidden=!on;if(on)shown++;
 });
 cta.hidden=shown<4;
 $('#ctEmpty').hidden=shown>0;
 $('#ctFound').innerHTML=shown?'Найдено <b>'+shown+'</b> '+plural(shown,'компания','компании','компаний'):'';
}

/* платная карточка всегда первой; вставка «Добавить компанию» — после четвёртой видимой */
function order(){
 var sorted=cards.slice().sort(function(a,b){
  var pa=a.classList.contains('promo'),pb=b.classList.contains('promo');if(pa!==pb)return pa?-1:1;
  if(sort==='new')return a.dataset.date<b.dataset.date?1:-1;
  if(sort==='name')return a.dataset.name.localeCompare(b.dataset.name,'ru');
  return b.dataset.rate-a.dataset.rate;
 });
 var n=0;sorted.forEach(function(c){list.appendChild(c);if(!c.hidden&&++n===4)list.appendChild(cta)});
 if(n<4)list.appendChild(cta);
}
function run(){apply();order()}

$$('.ct-cat').forEach(function(b){b.addEventListener('click',function(){
 cat=cat===b.dataset.cat?'':b.dataset.cat;
 $$('.ct-cat').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.cat===cat))});run();
})});
$$('[data-sort]').forEach(function(b){b.addEventListener('click',function(){
 sort=b.dataset.sort;$$('[data-sort]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});run();
})});
$('#ctSearch').addEventListener('submit',function(e){e.preventDefault();run()});
var qt;$('#ctQ').addEventListener('input',function(){clearTimeout(qt);qt=setTimeout(run,200)});
$('#ctCity').addEventListener('change',run);
$('#ctVer').addEventListener('change',run);
$('[data-reset]').addEventListener('click',function(){cat='';$('#ctQ').value='';$('#ctCity').value='';$('#ctVer').checked=false;$$('.ct-cat').forEach(function(x){x.setAttribute('aria-pressed','false')});run()});

/* «Показать ещё»: на проде — запрос следующей страницы каталога */
var mb=$('.ls-more-b');
mb.addEventListener('click',function(){mb.classList.add('busy');setTimeout(function(){mb.classList.remove('busy');mb.hidden=true},500)});

/* SEO-текст */
var seo=$('#lsSeo'),sb=$('.ls-seo-b');
sb.addEventListener('click',function(){var on=!seo.classList.contains('open');seo.classList.toggle('open',on);sb.setAttribute('aria-expanded',String(on));sb.textContent=on?'Свернуть':'Читать полностью'});

run();
})();
