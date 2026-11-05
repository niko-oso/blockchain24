/* ---------- Листинг рубрики: темы, сортировка, «Показать ещё», SEO-текст, курсы в боковой колонке ---------- */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var list=$('#lsList');if(!list)return;
var eye='<svg class="ic" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
var topic='all',sort='new';

/* фильтр по теме: карточка может относиться к нескольким темам */
function apply(){
 var shown=0;
 $$('.nc',list).forEach(function(c){var on=topic==='all'||(' '+c.dataset.topic+' ').indexOf(' '+topic+' ')>-1;c.hidden=!on;if(on)shown++});
 $('.ls-ins',list).hidden=topic!=='all';
 $('#lsEmpty').hidden=shown>0;
}
$$('.ls-topics .tp').forEach(function(b){b.addEventListener('click',function(){
 topic=b.dataset.topic;$$('.tp').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.topic===topic))});apply();
})});
$('[data-reset]').addEventListener('click',function(){$('.tp[data-topic=all]').click()});

/* сортировка: по дате или по просмотрам. Вставка с Telegram — после шестой карточки */
function order(){
 var ins=$('.ls-ins',list),cards=$$('.nc',list);
 cards.sort(function(a,b){return sort==='pop'?b.dataset.views-a.dataset.views:(a.dataset.date<b.dataset.date?1:a.dataset.date>b.dataset.date?-1:0)});
 var at=6;
 cards.forEach(function(c,i){list.appendChild(c);if(i===at-1)list.appendChild(ins)});
 if(cards.length<at)list.appendChild(ins);
}

/* темы: стрелки, колесо и перетаскивание мышью; затухание и стрелка показывают, в какую сторону есть ещё */
var tw=$('.ls-topics-w'),tl=$('.ls-topics');
function edges(){var m=tl.scrollWidth-tl.clientWidth;tw.classList.toggle('sl',tl.scrollLeft>4);tw.classList.toggle('more',m>4&&tl.scrollLeft<m-4)}
$('.tw-l').addEventListener('click',function(){tl.scrollBy({left:-tl.clientWidth*.7,behavior:'smooth'})});
$('.tw-r').addEventListener('click',function(){tl.scrollBy({left:tl.clientWidth*.7,behavior:'smooth'})});

/* все темы списком — на случай, если тем много; выбор прокручивает строку к теме */
var pop=$('#twPop'),pb=$('#twAll'),chips=$$('.tp',tl);
$('.tw-pop-l',pop).innerHTML=chips.map(function(c){return '<button type="button" class="tp" aria-pressed="'+c.getAttribute('aria-pressed')+'" data-topic="'+c.dataset.topic+'">'+c.textContent+'</button>'}).join('');
$('#twCount').textContent=(chips.length-1)+' тем';
function openPop(on){pop.hidden=!on;pb.setAttribute('aria-expanded',String(on))}
pb.addEventListener('click',function(){openPop(pop.hidden)});
pop.addEventListener('click',function(e){var b=e.target.closest('.tp');if(!b)return;var c=$('.tp[data-topic="'+b.dataset.topic+'"]',tl);c.click();openPop(false);
 tl.scrollTo({left:c.offsetLeft-tl.offsetLeft-tl.clientWidth/2+c.offsetWidth/2,behavior:'smooth'})});
document.addEventListener('click',function(e){if(!pop.hidden&&!e.target.closest('#twPop,#twAll'))openPop(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pop.hidden){openPop(false);pb.focus()}});
tl.addEventListener('scroll',edges,{passive:true});window.addEventListener('resize',edges);
tl.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&tl.scrollWidth>tl.clientWidth){e.preventDefault();tl.scrollLeft+=e.deltaY}},{passive:false});
var dr=null,moved=false;
tl.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;dr={x:e.clientX,s:tl.scrollLeft};moved=false});
window.addEventListener('pointermove',function(e){if(!dr)return;var dx=e.clientX-dr.x;if(!moved&&Math.abs(dx)>5){moved=true;tl.classList.add('drag')}if(moved)tl.scrollLeft=dr.s-dx});
window.addEventListener('pointerup',function(){if(!dr)return;dr=null;tl.classList.remove('drag');setTimeout(function(){moved=false},0)});
tl.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation()}},true);
edges();order();apply();
$$('[data-sort]').forEach(function(b){b.addEventListener('click',function(){
 sort=b.dataset.sort;$$('[data-sort]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});order();apply();
})});

/* «Показать ещё»: на проде — запрос следующей страницы рубрики, здесь — демо-порция */
var MORE=[
 {u:'https://blockchain24.pro/web3-igry-v-tretyem-kvartale-privlekli-boleye-600-mln-dollarov-investitsy',img:'important-4.jpg',tag:'Технологии',topic:'tech web3 nft',t:'Web3-игры привлекли более 600 млн долларов за третий квартал',e:'Инвестиции в блокчейн-игры за квартал превысили 600 млн долларов.',r:'3 мин',v:9600,d:'2023-10-13'},
 {u:'https://blockchain24.pro/sber-prisoyedinyayetsya-k-testirovaniyu-tsifrovogo-rublya-s-realnymi-kliyentami',img:'important-1.jpg',tag:'Цифровой рубль',topic:'law rub',t:'Сбер начал тестировать цифровой рубль с реальными клиентами',e:'Банк присоединился к тестированию цифрового рубля с реальными клиентами.',r:'2 мин',v:27100,d:'2023-10-12'},
 {u:'https://blockchain24.pro/protiv-benkmana-frida-dayut-pokazaniya-kollegi-podtverzhdaya-rastratu-sredstv-kliyentov-ftx',img:'important-3.jpg',tag:'Биржи',topic:'ex law',t:'Коллеги Бэнкмана-Фрида подтвердили растрату средств клиентов FTX',e:'Бывшие коллеги основателя FTX дали показания о растрате средств клиентов.',r:'3 мин',v:20500,d:'2023-10-10'},
 {u:'https://blockchain24.pro/ethereum-foundation-prodala-chast-eth-i-tem-samym-uronila-stoimost-efira',img:'rubric-2.jpg',tag:'Рынок',topic:'market',t:'Ethereum Foundation продала часть ETH и уронила стоимость эфира',e:'Продажа монет фондом совпала со снижением курса второй криптовалюты.',r:'3 мин',v:14200,d:'2023-10-08'},
 {u:'https://blockchain24.pro/v-rossii-teper-dostupen-servis-dlya-transgranichnykh-raschetov-v-kriptovalyute',img:'pick-1.jpg',tag:'Регулирование',topic:'law',t:'В России заработал сервис для трансграничных расчётов в криптовалюте',e:'Как устроен сервис и кому он доступен.',r:'4 мин',v:25800,d:'2023-10-07'},
 {u:'https://blockchain24.pro/kak-nachat-mayning-kriptovalyuty-poshagovaya-instruktsiya',img:'rubric-3.jpg',tag:'Майнинг',topic:'mining',t:'Как начать майнинг криптовалюты: пошаговая инструкция',e:'Оборудование, пулы и расходы — с чего начать.',r:'6 мин',v:19900,d:'2023-10-06'}
];
var nf=function(x){return x>=1000?(x/1000).toLocaleString('ru-RU',{maximumFractionDigits:1})+' тыс.':String(x)};
var mb=$('#lsMore');
mb.addEventListener('click',function(){
 if(mb.classList.contains('busy'))return;mb.classList.add('busy');mb.setAttribute('aria-busy','true');
 setTimeout(function(){
  MORE.forEach(function(m){
   var a=document.createElement('a');a.className='card nc hov new';a.href=m.u;a.dataset.topic=m.topic;a.dataset.date=m.d;a.dataset.views=m.v;
   a.innerHTML='<span class="media"><img src="img/'+m.img+'" alt="" loading="lazy" onerror="this.remove()"></span><span class="b"><span class="meta"><span class="tag">'+m.tag+'</span></span><span class="hl cl t-card">'+m.t+'</span><span class="cl ls-ex">'+m.e+'</span><span class="nc-f"><span>'+m.r+'</span><span>'+eye+nf(m.v)+'</span></span></span>';
   list.appendChild(a);
  });
  MORE=[];mb.classList.remove('busy');mb.removeAttribute('aria-busy');mb.hidden=true;
  order();apply();
 },500);
});

/* SEO-текст */
var seo=$('#lsSeo'),sb=$('.ls-seo-b');
sb.addEventListener('click',function(){var on=!seo.classList.contains('open');seo.classList.toggle('open',on);sb.setAttribute('aria-expanded',String(on));sb.textContent=on?'Свернуть':'Читать полностью'});

/* курсы в боковой колонке: CoinGecko, при ошибке — данные на момент вёрстки */
var R=[{t:'BTC',n:'Bitcoin',bg:'#F7931A',s:'₿',p:77818.51,c:-0.03},{t:'ETH',n:'Ethereum',bg:'#5468D4',s:'Ξ',p:2262.9,c:-0.04},{t:'BNB',n:'BNB',bg:'#B98900',s:'B',p:707.59,c:-0.06},{t:'XRP',n:'XRP',bg:'#23292F',s:'X',p:1.25,c:0.05},{t:'SOL',n:'Solana',bg:'#7A3FE4',s:'S',p:94.32,c:0.05}];
var money=function(x){var d=x>=0.1?2:x>=0.001?4:6;return x.toLocaleString('ru-RU',{minimumFractionDigits:d,maximumFractionDigits:d})};
function paint(){
 $('#sideRates').innerHTML=R.map(function(c){
  return '<a class="sr-row" href="https://blockchain24.pro/coins"><span class="sq" style="background:'+c.bg+'">'+c.s+(c.img?'<img src="'+c.img+'" alt="" loading="lazy" onerror="this.remove()">':'')+'</span><span class="n">'+c.t+'<small>'+c.n+'</small></span><span class="p">'+money(c.p)+' $<small class="'+(c.c>=0?'up':'down')+'">'+(c.c>=0?'▲':'▼')+Math.abs(c.c).toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2})+'%</small></span></a>'}).join('');
}
paint();
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,ripple,solana&order=market_cap_desc',{headers:{accept:'application/json'}})
 .then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
 .then(function(l){var by={};l.forEach(function(x){by[x.symbol.toUpperCase()]=x});R.forEach(function(c){var x=by[c.t];if(!x)return;c.p=x.current_price;c.c=x.price_change_percentage_24h||0;c.img=x.image});paint()})
 .catch(function(){});
})();
